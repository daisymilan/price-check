/**
 * Database utilities — bridges the scraper database.json and the React UI.
 *
 * If database.json has products, they take priority.
 * Otherwise falls back to the static mockData for uninterrupted display.
 */

import rawDb from '../data/database.json';
import { mockProducts, categories as mockCategories } from '../data/mockData';
import type { ProductPrice, Category } from '../types';

// ─── Internal DB types ────────────────────────────────────────────────────────

interface DBProduct {
  id: string;
  name: string;
  normalizedName: string;
  category: string;
  brand: string;
  unit: string;
  imageUrl: string;
}

interface DBOffer {
  id: string;
  productId: string;
  storeName: string;
  price: number;
  productUrl: string;
  sourceUrl: string;
  imageUrl: string;
  location: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  lastUpdated: string;
  trustRating: number;
  variant?: string;
  size?: string;
}

interface ScrapeReport {
  store: string;
  productsFound: number;
  source: 'live' | 'seed';
  durationMs: number;
  error?: string;
  timestamp: string;
}

interface DBMetadata {
  totalProducts: number;
  totalOffers: number;
  storeStats: Record<string, number>;
  scrapeDuration: number;
  scrapeReports: ScrapeReport[];
}

interface ProductDB {
  version: number;
  lastScraped: string;
  products: DBProduct[];
  offers: DBOffer[];
  metadata: DBMetadata;
}

const db = rawDb as unknown as ProductDB;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the full product list for the UI.
 * Prefers database.json; falls back to mockData when DB is empty.
 */
export function getAllProducts(): ProductPrice[] {
  if (db.products.length > 0 && db.offers.length > 0) {
    return dbToProductPrices(db);
  }
  return mockProducts;
}

/**
 * Returns category list with live counts when DB is available.
 */
export function getCategories(): Category[] {
  if (db.offers.length === 0) return mockCategories;

  const countMap: Record<string, number> = {};
  for (const offer of db.offers) {
    const product = db.products.find((p) => p.id === offer.productId);
    if (product) {
      countMap[product.category] = (countMap[product.category] ?? 0) + 1;
    }
  }

  return mockCategories.map((cat) => ({
    ...cat,
    count: countMap[cat.name] ?? cat.count,
  }));
}

/**
 * Returns database metadata for the admin dashboard.
 */
export function getDbMetadata(): DBMetadata | null {
  return db.metadata ?? null;
}

export function getDbLastScraped(): string {
  return db.lastScraped ?? '';
}

export function isDbPopulated(): boolean {
  return db.products.length > 0;
}

// ─── Conversion ───────────────────────────────────────────────────────────────

function dbToProductPrices(database: ProductDB): ProductPrice[] {
  const productMap = new Map<string, DBProduct>(
    database.products.map((p) => [p.id, p])
  );

  return database.offers.map((offer): ProductPrice => {
    const product = productMap.get(offer.productId);

    return {
      id: offer.id,
      productName: product?.name ?? offer.id,
      normalizedProductName: product?.normalizedName ?? offer.id,
      category: product?.category ?? 'Hardware',
      brand: product?.brand ?? 'Unknown',
      unit: product?.unit ?? 'piece',
      variant: offer.variant,
      size: offer.size,
      price: offer.price,
      currency: 'PHP',
      sourceName: offer.storeName,
      sourceUrl: offer.productUrl || offer.sourceUrl,
      imageUrl: offer.imageUrl || product?.imageUrl || '',
      location: offer.location,
      availability: offer.availability,
      lastUpdated: offer.lastUpdated,
      trustRating: offer.trustRating,
    };
  });
}
