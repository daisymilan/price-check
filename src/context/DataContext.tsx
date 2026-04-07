/**
 * DataContext — loads database.json from /public asynchronously.
 * Pages start with mockData immediately, then upgrade to live DB once fetched.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockProducts, categories as mockCategories } from '../data/mockData';
import type { ProductPrice, Category } from '../types';

// ─── DB types ─────────────────────────────────────────────────────────────────

interface DBProduct {
  id: string; name: string; normalizedName: string;
  category: string; brand: string; unit: string; imageUrl: string;
}
interface DBOffer {
  id: string; productId: string; storeName: string; price: number;
  productUrl: string; sourceUrl: string; imageUrl: string; location: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  lastUpdated: string; trustRating: number; variant?: string; size?: string;
}
export interface ScrapeReport {
  store: string; productsFound: number; source: 'live' | 'seed';
  durationMs: number; error?: string; timestamp: string;
}
export interface DBMetadata {
  totalProducts: number; totalOffers: number;
  storeStats: Record<string, number>; scrapeDuration: number;
  scrapeReports: ScrapeReport[];
}
interface ProductDB {
  version: number; lastScraped: string;
  products: DBProduct[]; offers: DBOffer[]; metadata: DBMetadata;
}

// ─── Category fallback images ─────────────────────────────────────────────────

const CATEGORY_IMAGES: Record<string, string> = {
  'Paint & Coating':      'https://images.unsplash.com/photo-1578700494142-246e61417603?w=300&h=300&fit=crop',
  'Cement & Concrete':    'https://images.unsplash.com/photo-1580409823253-2b27b47b1e5b?w=300&h=300&fit=crop',
  'Tiles & Stone':        'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=300&h=300&fit=crop',
  'Steel & Structural':   'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
  'Wood & Lumber':        'https://images.unsplash.com/photo-1567521464027-f127ff2b3dba?w=300&h=300&fit=crop',
  'Roofing & Cladding':   'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=300&fit=crop',
  'Plumbing':             'https://images.unsplash.com/photo-1580978519578-d657abce7a20?w=300&h=300&fit=crop',
  'Electrical':           'https://images.unsplash.com/photo-1517328304819-92343e3f5d07?w=300&h=300&fit=crop',
  'Tools & Equipment':    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop',
  'Hardware':             'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop',
  'Wall & Ceiling':       'https://images.unsplash.com/photo-1588195538326-c5b1e62f0fa9?w=300&h=300&fit=crop',
  'Doors & Windows':      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=300&fit=crop',
  'Masonry & Blocks':     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  'Aggregates':           'https://images.unsplash.com/photo-1581092911360-773af822fab3?w=300&h=300&fit=crop',
  'Safety & PPE':         'https://images.unsplash.com/photo-1618090584176-7132b9911657?w=300&h=300&fit=crop',
  'Adhesives & Sealants': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop',
};
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop';

function dbToProductPrices(database: ProductDB): ProductPrice[] {
  const productMap = new Map<string, DBProduct>(database.products.map((p) => [p.id, p]));
  return database.offers.map((offer): ProductPrice => {
    const product = productMap.get(offer.productId);
    const category = product?.category ?? 'Hardware';
    const imageUrl = offer.imageUrl || product?.imageUrl || CATEGORY_IMAGES[category] || FALLBACK_IMAGE;
    return {
      id: offer.id,
      productName: product?.name ?? offer.id,
      normalizedProductName: product?.normalizedName ?? offer.id,
      category,
      brand: product?.brand ?? 'Unknown',
      unit: product?.unit ?? 'piece',
      variant: offer.variant,
      size: offer.size,
      price: offer.price,
      currency: 'PHP',
      sourceName: offer.storeName,
      sourceUrl: offer.productUrl || offer.sourceUrl,
      imageUrl,
      location: offer.location,
      availability: offer.availability,
      lastUpdated: offer.lastUpdated,
      trustRating: offer.trustRating,
    };
  });
}

function buildCategories(database: ProductDB): Category[] {
  const productCategoryMap = new Map<string, string>(database.products.map((p) => [p.id, p.category]));
  const countMap: Record<string, number> = {};
  for (const offer of database.offers) {
    const cat = productCategoryMap.get(offer.productId);
    if (cat) countMap[cat] = (countMap[cat] ?? 0) + 1;
  }
  return mockCategories.map((cat) => ({ ...cat, count: countMap[cat.name] ?? cat.count }));
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface DataContextValue {
  products: ProductPrice[];
  categories: Category[];
  metadata: DBMetadata | null;
  lastScraped: string;
  isDbLoaded: boolean;
}

const DataContext = createContext<DataContextValue>({
  products: mockProducts,
  categories: mockCategories,
  metadata: null,
  lastScraped: '',
  isDbLoaded: false,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<DataContextValue>({
    products: mockProducts,
    categories: mockCategories,
    metadata: null,
    lastScraped: '',
    isDbLoaded: false,
  });

  useEffect(() => {
    fetch('/database.json')
      .then((r) => r.json())
      .then((db: ProductDB) => {
        if (db.products.length > 0 && db.offers.length > 0) {
          setValue({
            products: dbToProductPrices(db),
            categories: buildCategories(db),
            metadata: db.metadata ?? null,
            lastScraped: db.lastScraped ?? '',
            isDbLoaded: true,
          });
        }
      })
      .catch(() => { /* keep mock data on failure */ });
  }, []);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
