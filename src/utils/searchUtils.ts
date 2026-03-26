/**
 * Search and filtering utilities
 */

import { ProductPrice, SearchFilters, SearchResult } from '../types';

/**
 * Normalize product name for comparison
 * Removes extra spaces, converts to lowercase, removes special characters
 */
export const normalizeProductName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '');
};

/**
 * Search products by query and filters
 */
export const searchProducts = (
  products: ProductPrice[],
  filters: SearchFilters
): SearchResult => {
  let results = [...products];

  // Search by query
  if (filters.query && filters.query.trim()) {
    const normalizedQuery = normalizeProductName(filters.query);
    results = results.filter((product) => {
      const productName = normalizeProductName(product.productName);
      const normalizedName = normalizeProductName(product.normalizedProductName);
      const brand = normalizeProductName(product.brand);
      const category = normalizeProductName(product.category);

      return (
        productName.includes(normalizedQuery) ||
        normalizedName.includes(normalizedQuery) ||
        brand.includes(normalizedQuery) ||
        category.includes(normalizedQuery)
      );
    });
  }

  // Filter by category
  if (filters.category) {
    results = results.filter(
      (product) =>
        product.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }

  // Filter by brand
  if (filters.brand) {
    results = results.filter(
      (product) =>
        product.brand.toLowerCase() === filters.brand!.toLowerCase()
    );
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    results = results.filter((product) => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((product) => product.price <= filters.maxPrice!);
  }

  // Filter by source
  if (filters.source) {
    results = results.filter(
      (product) =>
        product.sourceName.toLowerCase() === filters.source!.toLowerCase()
    );
  }

  // Filter by location
  if (filters.location) {
    results = results.filter(
      (product) =>
        product.location.toLowerCase() === filters.location!.toLowerCase()
    );
  }

  // Filter by unit
  if (filters.unit) {
    results = results.filter(
      (product) =>
        product.unit.toLowerCase() === filters.unit!.toLowerCase()
    );
  }

  // Sort results
  const sortBy = filters.sortBy || 'most_relevant';
  switch (sortBy) {
    case 'lowest_price':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'highest_price':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      results.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() -
          new Date(a.lastUpdated).getTime()
      );
      break;
    case 'most_relevant':
    default:
      // Already in default order, but could be improved with relevance scoring
      break;
  }

  // Find cheapest
  const cheapest =
    results.length > 0
      ? results.reduce((min, product) =>
          product.price < min.price ? product : min
        )
      : null;

  return {
    products: results,
    total: results.length,
    cheapest,
  };
};

/**
 * Group products by normalized name for comparison
 */
export const groupProductsByNormalizedName = (
  products: ProductPrice[]
): Map<string, ProductPrice[]> => {
  const grouped = new Map<string, ProductPrice[]>();

  products.forEach((product) => {
    const key = normalizeProductName(product.normalizedProductName);
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(product);
  });

  return grouped;
};

/**
 * Get unique brands from products
 */
export const getUniqueBrands = (products: ProductPrice[]): string[] => {
  const brands = new Set(products.map((p) => p.brand));
  return Array.from(brands).sort();
};

/**
 * Get unique categories from products
 */
export const getUniqueCategories = (products: ProductPrice[]): string[] => {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
};

/**
 * Get unique sources from products
 */
export const getUniqueSources = (products: ProductPrice[]): string[] => {
  const sources = new Set(products.map((p) => p.sourceName));
  return Array.from(sources).sort();
};

/**
 * Get unique locations from products
 */
export const getUniqueLocations = (products: ProductPrice[]): string[] => {
  const locations = new Set(products.map((p) => p.location));
  return Array.from(locations).sort();
};

/**
 * Get price statistics
 */
export const getPriceStats = (
  products: ProductPrice[]
): { min: number; max: number; avg: number } => {
  if (products.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  const prices = products.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  return { min, max, avg: Math.round(avg) };
};
