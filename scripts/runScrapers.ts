/**
 * Scraper Orchestrator — runs all 19 store scrapers in sequence,
 * normalizes results, merges into database.json, and validates data safety.
 *
 * Usage:
 *   npm run scrape              — full scrape
 *   npm run scrape -- --dry-run — show counts without writing
 */

import { ScrapedProduct, ScrapeReport } from './types.js';
import { loadDB, saveDB, mergeScrapedProducts, checkDataSafety, printReport, printHealthReport } from './db.js';
import { sleep } from './scrapers/base.js';

// Import all scrapers
import { scrapeWilcon } from './scrapers/wilcon.js';
import { scrapeCWHomeDepot } from './scrapers/cw_home_depot.js';
import { scrapeAceHardware } from './scrapers/ace_hardware.js';
import { scrapeAllHome } from './scrapers/allhome.js';
import { scrapeHandyman } from './scrapers/handyman.js';
import { scrapeKHMTools } from './scrapers/khm_tools.js';
import { scrapeMeijiElectric } from './scrapers/meiji_electric.js';
import { scrapeBQBuilderware } from './scrapers/bq_builderware.js';
import { scrapeMackun } from './scrapers/mackun.js';
import { scrapeBasaColors } from './scrapers/baesa_colors.js';
import { scrapeCitiHardware } from './scrapers/citihardware.js';
import { scrapeMrDiy } from './scrapers/mrdiy.js';
import { scrapeFelco } from './scrapers/felco.js';
import { scrapeTopmost } from './scrapers/topmost.js';
import { scrapeCebuHome } from './scrapers/cebu_home.js';
import { scrapeHardwareZone } from './scrapers/hardware_zone.js';
import { scrapeShoppable } from './scrapers/shoppable.js';
import { scrapeConstPh } from './scrapers/const_ph.js';

type ScraperFn = () => Promise<ScrapedProduct[]>;

interface ScraperDef {
  fn: ScraperFn;
  name: string;
}

const SCRAPERS: ScraperDef[] = [
  { fn: scrapeWilcon, name: 'Wilcon Depot' },
  { fn: scrapeCWHomeDepot, name: 'CW Home Depot' },
  { fn: scrapeAceHardware, name: 'Ace Hardware Philippines' },
  { fn: scrapeAllHome, name: 'AllHome' },
  { fn: scrapeHandyman, name: 'Handyman' },
  { fn: scrapeKHMTools, name: 'KHM Megatools' },
  { fn: scrapeMeijiElectric, name: 'Meiji Electric PH' },
  { fn: scrapeBQBuilderware, name: 'BQ Builderware' },
  { fn: scrapeMackun, name: 'Mackun Hardware' },
  { fn: scrapeBasaColors, name: 'Baesa Colors Paint Center' },
  { fn: scrapeCitiHardware, name: 'CitiHardware' },
  { fn: scrapeMrDiy, name: 'MR. DIY Philippines' },
  { fn: scrapeFelco, name: 'Felco Store' },
  { fn: scrapeTopmost, name: 'Topmost Hardware' },
  { fn: scrapeCebuHome, name: 'Cebu Home Builders' },
  { fn: scrapeHardwareZone, name: 'Hardware Zone PH' },
  { fn: scrapeShoppable, name: 'Shoppable PH' },
  { fn: scrapeConstPh, name: 'const.ph' },
];

const isDryRun = process.argv.includes('--dry-run');

/**
 * Every scraper catches its own errors internally and logs them via
 * console.warn before returning seed data — so the real failure reason
 * (HTTP 403, 500, "No products parsed", ...) never reaches this
 * orchestrator's own try/catch, and ScrapeReport.error was always empty.
 * Capturing console.warn for the duration of one scraper's run recovers
 * that reason without touching any of the 18 scraper files. Scrapers run
 * sequentially (awaited one at a time), so there's no cross-store overlap.
 */
async function runWithCapturedWarnings<T>(fn: () => Promise<T>): Promise<{ result: T; lastWarning?: string }> {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(' '));
    originalWarn(...args);
  };
  try {
    const result = await fn();
    return { result, lastWarning: warnings.at(-1) };
  } finally {
    console.warn = originalWarn;
  }
}

async function runScrapers(): Promise<void> {
  const startTime = Date.now();
  const allProducts: ScrapedProduct[] = [];
  const reports: ScrapeReport[] = [];

  console.log('\n🔍  Philippine Construction Materials — Scraper Pipeline');
  console.log(`    Mode: ${isDryRun ? 'DRY RUN (no write)' : 'LIVE'}`);
  console.log(`    Stores: ${SCRAPERS.length}`);
  console.log(`    Started: ${new Date().toLocaleString()}\n`);

  // Load existing DB to get previous counts for safety check
  const existingDB = loadDB();

  for (const scraper of SCRAPERS) {
    const t0 = Date.now();
    let products: ScrapedProduct[] = [];
    let source: 'live' | 'seed' = 'seed';
    let error: string | undefined;

    try {
      const { result, lastWarning } = await runWithCapturedWarnings(scraper.fn);
      products = result;
      // Heuristic: if ALL products have empty images, it's likely seed data
      const hasRealImages = products.some((p) => p.image.startsWith('http'));
      source = hasRealImages ? 'live' : 'seed';
      if (source === 'seed') error = lastWarning;
    } catch (err) {
      error = String(err);
      products = [];
    }

    const durationMs = Date.now() - t0;
    const status: ScrapeReport['status'] =
      products.length === 0 ? 'FAILED' : source === 'live' ? 'LIVE_SUCCESS' : 'FALLBACK';
    reports.push({
      store: scraper.name,
      productsFound: products.length,
      source,
      durationMs,
      error,
      timestamp: new Date().toISOString(),
      status,
      liveProducts: source === 'live' ? products.length : 0,
      fallbackProducts: source === 'seed' ? products.length : 0,
    });

    allProducts.push(...products);

    // Polite delay between scrapers
    await sleep(500);
  }

  const totalDuration = Date.now() - startTime;

  console.log(`\n✅  Scraping complete. ${allProducts.length} products collected in ${totalDuration}ms.`);

  if (isDryRun) {
    console.log('\n[DRY RUN] Database NOT updated.');
    for (const r of reports) {
      console.log(`  ${r.store}: ${r.productsFound} (${r.source})`);
    }
    printHealthReport(reports);
    return;
  }

  // Data safety check
  const prevTotal = existingDB.metadata?.totalOffers ?? 0;
  if (prevTotal > 0 && allProducts.length < prevTotal * 0.7) {
    checkDataSafety(prevTotal, allProducts.length);
    // Still save if we have at least some products — seed data always gives us something
    if (allProducts.length === 0) {
      console.error('❌ No products collected at all. Aborting save.');
      process.exit(1);
    }
  }

  // Merge and save
  const newDB = mergeScrapedProducts(existingDB, allProducts, reports, totalDuration);
  saveDB(newDB);

  printReport(newDB, reports);
  printHealthReport(reports);
  console.log(`💾  Database saved to src/data/database.json`);
}

runScrapers().catch((err) => {
  console.error('Fatal scraper error:', err);
  process.exit(1);
});
