/**
 * Database builder — merges ScrapedProducts into the products + offers structure.
 * Detects failures, deduplicates products, and validates data safety.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ScrapedProduct,
  DBProduct,
  DBOffer,
  ProductDB,
  ScrapeReport,
} from './types.js';
import {
  normalizeProductName,
  generateProductKey,
  inferCategory,
  inferBrand,
} from './normalize.js';

const DB_PATH = resolve('src/data/database.json');

const EMPTY_DB: ProductDB = {
  version: 1,
  lastScraped: '',
  products: [],
  offers: [],
  metadata: {
    totalProducts: 0,
    totalOffers: 0,
    storeStats: {},
    scrapeDuration: 0,
    scrapeReports: [],
  },
};

export function loadDB(): ProductDB {
  if (!existsSync(DB_PATH)) return { ...EMPTY_DB };
  try {
    const raw = readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw) as ProductDB;
  } catch {
    console.warn('[DB] Could not read database.json, starting fresh.');
    return { ...EMPTY_DB };
  }
}

export function saveDB(db: ProductDB): void {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

/**
 * Merge new scraped products into the existing database.
 * - Creates a new DBProduct entry for each unique product (keyed by normalizedName + brand + size)
 * - Upserts DBOffer entries (updates price + lastUpdated if offer exists)
 * - Never deletes existing products (marks as out_of_stock instead)
 */
export function mergeScrapedProducts(
  existing: ProductDB,
  scraped: ScrapedProduct[],
  reports: ScrapeReport[],
  totalDurationMs: number
): ProductDB {
  const now = new Date().toISOString();

  // Build lookup maps from existing data
  const productByKey = new Map<string, DBProduct>(
    existing.products.map((p) => [p.normalizedName, p])
  );
  const offerById = new Map<string, DBOffer>(
    existing.offers.map((o) => [o.id, o])
  );
  // offer lookup: productId + storeName → offerId
  const offerByStoreProduct = new Map<string, string>();
  for (const o of existing.offers) {
    offerByStoreProduct.set(`${o.productId}::${o.storeName}`, o.id);
  }

  const newProducts = new Map<string, DBProduct>(productByKey);
  const newOffers = new Map<string, DBOffer>(offerById);
  const storeStats: Record<string, number> = {};

  for (const item of scraped) {
    const category = item.category || inferCategory(item.name);
    const brand = item.brand || inferBrand(item.name);
    const normalizedName = normalizeProductName(
      `${brand} ${item.name} ${item.size ?? ''}`
    );
    const productKey = generateProductKey(
      item.name,
      brand,
      item.size ?? '',
      item.unit
    );

    // Upsert product
    let product = newProducts.get(normalizedName);
    if (!product) {
      // Try partial match via productKey
      for (const [, p] of newProducts) {
        if (p.normalizedName === productKey) {
          product = p;
          break;
        }
      }
    }

    if (!product) {
      product = {
        id: `prod-${slugify(normalizedName)}-${newProducts.size}`,
        name: item.name,
        normalizedName,
        category,
        brand,
        unit: item.unit,
        imageUrl: item.image,
      };
      newProducts.set(normalizedName, product);
    }

    // Upsert offer
    const storeProductKey = `${product.id}::${item.store}`;
    const existingOfferId = offerByStoreProduct.get(storeProductKey);
    const offerId =
      existingOfferId ??
      `offer-${slugify(item.store)}-${slugify(normalizedName)}-${newOffers.size}`;

    const offer: DBOffer = {
      id: offerId,
      productId: product.id,
      storeName: item.store,
      price: item.price,
      productUrl: item.productUrl,
      sourceUrl: item.sourceUrl,
      imageUrl: item.image || product.imageUrl,
      location: item.location,
      availability: item.availability,
      lastUpdated: now,
      trustRating: item.trustRating,
      variant: item.variant,
      size: item.size,
    };

    newOffers.set(offerId, offer);
    offerByStoreProduct.set(storeProductKey, offerId);

    // Count per store
    storeStats[item.store] = (storeStats[item.store] ?? 0) + 1;
  }

  // Mark offers not in this scrape run as potentially stale (don't delete)
  // Products that were in DB before but not scraped now keep their last data

  return {
    version: existing.version,
    lastScraped: now,
    products: Array.from(newProducts.values()),
    offers: Array.from(newOffers.values()),
    metadata: {
      totalProducts: newProducts.size,
      totalOffers: newOffers.size,
      storeStats,
      scrapeDuration: totalDurationMs,
      scrapeReports: reports,
      previousTotalOffers: existing.metadata?.totalOffers,
    },
  };
}

/**
 * Data safety check — warns when a run's raw scrape count is far below the
 * database's current size. This is informational only: mergeScrapedProducts
 * never deletes existing offers, so a low-coverage run (some stores blocked
 * or returning seed fallback) can't actually shrink the database. It must not
 * fail the pipeline — with cumulative totals growing daily while only a
 * handful of stores scrape live on any given run, that ratio will almost
 * always read low, which previously caused every run to fail CI.
 */
export function checkDataSafety(
  previousTotalOffers: number,
  newTotalOffers: number
): void {
  if (previousTotalOffers === 0) return;

  const ratio = newTotalOffers / previousTotalOffers;
  if (ratio < 0.7) {
    console.warn(
      `⚠️  DATA SAFETY WARNING: This run scraped ${newTotalOffers} raw offers vs. ` +
        `${previousTotalOffers} currently in the database (${Math.round(ratio * 100)}%). ` +
        `Likely some stores failed live scraping and fell back to seed data. ` +
        `Existing offers are preserved by the merge either way — proceeding.`
    );
  }
}

/**
 * Print a summary report to console.
 */
export function printReport(db: ProductDB, reports: ScrapeReport[]): void {
  console.log('\n' + '═'.repeat(60));
  console.log('  SCRAPE SUMMARY');
  console.log('═'.repeat(60));

  for (const r of reports) {
    const badge = r.source === 'live' ? '✅ live' : '⚠️  seed';
    const err = r.error ? `  ← ${r.error}` : '';
    console.log(
      `  ${badge}  ${r.store.padEnd(30)} ${String(r.productsFound).padStart(4)} products  (${r.durationMs}ms)${err}`
    );
  }

  const liveCount = reports.filter((r) => r.status === 'LIVE_SUCCESS').length;
  const failedCount = reports.filter((r) => r.status === 'FAILED').length;

  console.log('─'.repeat(60));
  console.log(`  Total scraped  : ${reports.reduce((s, r) => s + r.productsFound, 0)}`);
  console.log(`  Total products : ${db.metadata.totalProducts}`);
  console.log(`  Total offers   : ${db.metadata.totalOffers}`);
  console.log(`  Duration       : ${db.metadata.scrapeDuration}ms`);
  console.log(
    `  Live coverage  : ${liveCount}/${reports.length} stores live` +
      (failedCount > 0 ? `, ${failedCount} completely failed` : '')
  );
  console.log('═'.repeat(60) + '\n');
}

/**
 * Manually-maintained investigation notes — NOT auto-detected. Each entry
 * reflects a specific human investigation (checking sitemaps, nav links,
 * catalog identity, WAF fingerprints, etc.) into why a store is currently
 * non-live. There is no reliable way to infer ACCESS_BLOCKED vs
 * WRONG_CATALOG vs NO_PUBLIC_CATALOG vs EXTERNAL_FAILURE from an HTTP
 * status code alone, so this is deliberately a static lookup, not runtime
 * logic. It affects display only — never live/fallback/safety decisions.
 * Update it (or remove an entry) when a store's real-world status changes.
 */
const KNOWN_STORE_ISSUES: Record<string, string> = {
  'CW Home Depot': 'ACCESS_BLOCKED',
  'Ace Hardware Philippines': 'WRONG_CATALOG',
  AllHome: 'ACCESS_BLOCKED',
  Handyman: 'EXTERNAL_FAILURE',
  'MR. DIY Philippines': 'NO_PUBLIC_CATALOG',
  'Shoppable PH': 'WRONG_CATALOG',
};

/**
 * Print a concise LIVE/NOT-LIVE health summary — the goal is that tomorrow's
 * automated run is understandable without reading raw logs. Known-issue
 * labels come from KNOWN_STORE_ISSUES (see above); anything not in that
 * table falls back to its live-detected status/error, so a newly-broken
 * store still shows *something* useful instead of silently having no label.
 */
export function printHealthReport(reports: ScrapeReport[]): void {
  const live = reports.filter((r) => r.status === 'LIVE_SUCCESS');
  const notLive = reports.filter((r) => r.status !== 'LIVE_SUCCESS');
  const pct = reports.length > 0 ? Math.round((live.length / reports.length) * 100) : 0;

  console.log('\nPHILIPPINE HARDWARE SCRAPER HEALTH');
  console.log('='.repeat(50));
  console.log(`\nLIVE: ${live.length}/${reports.length} (${pct}%)\n`);

  console.log('LIVE');
  for (const r of live) {
    console.log(`✓ ${r.store.padEnd(26)} ${r.liveProducts.toLocaleString().padStart(8)}`);
  }

  console.log('\nNOT LIVE');
  for (const r of notLive) {
    const label = KNOWN_STORE_ISSUES[r.store] ?? (r.status === 'FAILED' ? 'FAILED' : r.error ?? 'FALLBACK');
    console.log(`! ${r.store.padEnd(26)} ${label}`);
  }

  console.log(`\nCoverage: ${live.length}/${reports.length} (${pct}%)\n`);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .slice(0, 40);
}
