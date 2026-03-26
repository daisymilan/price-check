/**
 * Types and interfaces for the price comparison app
 */

export interface ProductPrice {
  id: string;
  productName: string;
  normalizedProductName: string;
  category: string;
  brand: string;
  unit: string;
  variant?: string;
  size?: string;
  price: number;
  currency: string; // PHP
  sourceName: string;
  sourceUrl: string;
  imageUrl: string;
  location: string; // e.g., "Metro Manila", "Cebu", "Davao"
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  lastUpdated: string;
  sku?: string;
  trustRating?: number; // 0-5
}

export interface SearchFilters {
  query: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  source?: string;
  location?: string;
  unit?: string;
  sortBy?: 'lowest_price' | 'highest_price' | 'newest' | 'most_relevant';
}

export interface SearchResult {
  products: ProductPrice[];
  total: number;
  cheapest: ProductPrice | null;
}

export interface FavoriteItem {
  id: string;
  productName: string;
  imageUrl: string;
  brand: string;
  category: string;
  price: number;
  source: string;
  savedAt: string;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Store {
  name: string;
  location: string;
  trustRating: number;
}
