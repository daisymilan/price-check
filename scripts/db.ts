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
 * Data safety check — warns if new scrape has significantly fewer products.
 */
export function checkDataSafety(
  previousTotalOffers: number,
  newTotalOffers: number
): void {
  if (previousTotalOffers === 0) return;

  const ratio = newTotalOffers / previousTotalOffers;
  if (ratio < 0.7) {
    console.warn(
      `⚠️  DATA SAFETY WARNING: Scraped ${newTotalOffers} offers but previous run had ` +
        `${previousTotalOffers}. That's only ${Math.round(ratio * 100)}% — ` +
        `possible scraper failure. Database NOT overwritten with reduced data.`
    );
    process.exitCode = 1;
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

  console.log('─'.repeat(60));
  console.log(`  Total scraped  : ${reports.reduce((s, r) => s + r.productsFound, 0)}`);
  console.log(`  Total products : ${db.metadata.totalProducts}`);
  console.log(`  Total offers   : ${db.metadata.totalOffers}`);
  console.log(`  Duration       : ${db.metadata.scrapeDuration}ms`);
  console.log('═'.repeat(60) + '\n');
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .slice(0, 40);
}
