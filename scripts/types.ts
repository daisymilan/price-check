/**
 * Types for the scraper pipeline
 */

// Raw output from each store scraper
export interface ScrapedProduct {
  name: string;
  price: number;
  store: string;
  sourceUrl: string;    // store homepage
  productUrl: string;   // direct product page
  image: string;
  category: string;
  brand: string;
  unit: string;
  variant?: string;
  size?: string;
  location: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  trustRating: number;
}

// Normalized product (deduplicated across stores)
export interface DBProduct {
  id: string;
  name: string;
  normalizedName: string;
  category: string;
  brand: string;
  unit: string;
  imageUrl: string;
}

// One price offer per store per product
export interface DBOffer {
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

// Per-store scrape result
export interface ScrapeReport {
  store: string;
  productsFound: number;
  source: 'live' | 'seed';
  durationMs: number;
  error?: string;
  timestamp: string;
}

// Database metadata
export interface DBMetadata {
  totalProducts: number;
  totalOffers: number;
  storeStats: Record<string, number>;
  scrapeDuration: number;
  scrapeReports: ScrapeReport[];
  previousTotalOffers?: number;
}

// Full database file structure
export interface ProductDB {
  version: number;
  lastScraped: string;
  products: DBProduct[];
  offers: DBOffer[];
  metadata: DBMetadata;
}
