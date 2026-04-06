/**
 * Seed script — converts mockData.ts products into database.json format.
 * Run once to bootstrap the database from existing mock data:
 *   npm run scrape:seed
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ProductDB, DBProduct, DBOffer } from './types.js';
import { normalizeProductName } from './normalize.js';

// Import mock data directly (we replicate the structure here to avoid
// Vite-specific imports and keep scripts self-contained)

interface MockProduct {
  id: string;
  productName: string;
  normalizedProductName: string;
  category: string;
  brand: string;
  unit: string;
  variant?: string;
  size?: string;
  price: number;
  sourceName: string;
  sourceUrl: string;
  imageUrl: string;
  location: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  lastUpdated: string;
  trustRating?: number;
}

// Dynamically load from the compiled mockData (we use a JSON snapshot approach)
// Since we can't import .ts files in scripts directly, read the data inline:
const MOCK_PRODUCTS_PATH = resolve('src/data/mockData.ts');

async function seed(): Promise<void> {
  console.log('🌱  Seeding database from mockData.ts...');

  // Read and eval the mockData file to extract products
  // We use a simple regex approach to avoid full TypeScript compilation
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(MOCK_PRODUCTS_PATH, 'utf-8');

  // Extract the mockProducts array via dynamic import using tsx
  // Since tsx can run .ts files, we can use a workaround:
  // Write a tiny helper and import it
  const helperPath = resolve('scripts/_seed_helper_tmp.ts');
  writeFileSync(helperPath, `
    import { mockProducts } from '../src/data/mockData.ts';
    import { writeFileSync } from 'node:fs';
    import { resolve } from 'node:path';

    const out = JSON.stringify(mockProducts, null, 0);
    writeFileSync(resolve('scripts/_mock_products.json'), out);
    console.log('Helper: wrote', mockProducts.length, 'products');
  `);

  // Run the helper
  const { execSync } = await import('node:child_process');
  try {
    execSync('npx tsx scripts/_seed_helper_tmp.ts', { stdio: 'inherit' });
  } finally {
    // Clean up helper files
    try {
      const { unlinkSync, existsSync } = await import('node:fs');
      if (existsSync(helperPath)) unlinkSync(helperPath);
    } catch { /* ignore */ }
  }

  // Read the extracted products
  const { existsSync, unlinkSync } = await import('node:fs');
  const mockPath = resolve('scripts/_mock_products.json');
  if (!existsSync(mockPath)) {
    console.error('Failed to extract mock products');
    process.exit(1);
  }

  const raw = readFileSync(mockPath, 'utf-8');
  const mockProducts: MockProduct[] = JSON.parse(raw);
  unlinkSync(mockPath);

  console.log(`  Found ${mockProducts.length} mock products.`);

  // Convert to DB format
  const productMap = new Map<string, DBProduct>();
  const offers: DBOffer[] = [];

  for (const p of mockProducts) {
    const normName = normalizeProductName(`${p.brand} ${p.normalizedProductName}`);
    const existingProd = productMap.get(normName) ?? productMap.get(normalizeProductName(p.normalizedProductName));

    let product: DBProduct;
    if (existingProd) {
      product = existingProd;
    } else {
      product = {
        id: `prod-${p.id.split('-').slice(0, 2).join('-')}`,
        name: p.productName,
        normalizedName: normName,
        category: p.category,
        brand: p.brand,
        unit: p.unit,
        imageUrl: p.imageUrl,
      };
      productMap.set(normName, product);
    }

    const offer: DBOffer = {
      id: p.id,
      productId: product.id,
      storeName: p.sourceName,
      price: p.price,
      productUrl: p.sourceUrl,
      sourceUrl: p.sourceUrl,
      imageUrl: p.imageUrl,
      location: p.location,
      availability: p.availability,
      lastUpdated: p.lastUpdated,
      trustRating: p.trustRating ?? 4.0,
      variant: p.variant,
      size: p.size,
    };

    offers.push(offer);
  }

  const storeStats: Record<string, number> = {};
  for (const o of offers) {
    storeStats[o.storeName] = (storeStats[o.storeName] ?? 0) + 1;
  }

  const db: ProductDB = {
    version: 1,
    lastScraped: new Date().toISOString(),
    products: Array.from(productMap.values()),
    offers,
    metadata: {
      totalProducts: productMap.size,
      totalOffers: offers.length,
      storeStats,
      scrapeDuration: 0,
      scrapeReports: [],
    },
  };

  const dbPath = resolve('src/data/database.json');
  writeFileSync(dbPath, JSON.stringify(db, null, 2));

  console.log(`\n✅  Seed complete:`);
  console.log(`    Products : ${db.metadata.totalProducts}`);
  console.log(`    Offers   : ${db.metadata.totalOffers}`);
  console.log(`    Saved to : ${dbPath}`);
  console.log('\n  Store breakdown:');
  for (const [store, count] of Object.entries(storeStats).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${store.padEnd(35)} ${count}`);
  }

  void src; // avoid unused warning
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
