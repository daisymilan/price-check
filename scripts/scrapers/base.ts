/**
 * Base scraper utilities — shared fetch logic, HTML helpers, Shopify API support
 */

import * as cheerio from 'cheerio';
import { ScrapedProduct } from '../types.js';

const DEFAULT_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

const FETCH_TIMEOUT_MS = 15_000;

/**
 * Fetch HTML from a URL with browser-like headers and timeout.
 */
export async function fetchPage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch Shopify store's /products.json with pagination.
 * Returns raw Shopify product objects or empty array if not a Shopify store.
 */
export async function fetchShopifyProducts(
  baseUrl: string
): Promise<ShopifyProduct[]> {
  const all: ShopifyProduct[] = [];
  let page = 1;

  while (true) {
    const url = `${baseUrl}/products.json?limit=250&page=${page}`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const res = await fetch(url, {
        headers: { ...DEFAULT_HEADERS, Accept: 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) break;

      const data = (await res.json()) as { products: ShopifyProduct[] };
      if (!data.products || data.products.length === 0) break;

      all.push(...data.products);
      if (data.products.length < 250) break;
      page++;
    } catch {
      break;
    }
  }

  return all;
}

interface ShopifyVariant {
  price: string;
  title: string;
}

interface ShopifyImage {
  src: string;
}

interface ShopifyProduct {
  title: string;
  handle: string;
  product_type: string;
  vendor: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
}

// Some Shopify catalogs use a repeating-9s value (999999, 99999999, ...) as a
// "price not set" placeholder instead of leaving the field blank — Shopify's
// `available: true` does NOT distinguish these from real prices (confirmed
// against khmtools.com.ph's live feed, where both share available: true).
// Matched only at 6+ digits: shorter repunits like 999 or 9999 are common
// legitimate charm pricing (e.g. felcostore.ph genuinely sells a ₱999 fan),
// but no real product is priced at exactly ₱999,999.00 to the peso.
const SENTINEL_PRICE_PATTERN = /^9{6,}$/;

function isSentinelPrice(price: number): boolean {
  return SENTINEL_PRICE_PATTERN.test(String(Math.trunc(price)));
}

/**
 * Convert Shopify product objects to ScrapedProduct format.
 */
export function shopifyToScraped(
  products: ShopifyProduct[],
  storeMeta: StoreMeta
): ScrapedProduct[] {
  const result: ScrapedProduct[] = [];

  for (const p of products) {
    const variant = p.variants?.[0];
    if (!variant) continue;

    const price = parseFloat(variant.price);
    // Excluded, not repriced: a placeholder is not a real offer, and we'd
    // rather drop it from price comparison than show a fabricated number.
    if (isNaN(price) || price <= 0 || isSentinelPrice(price)) continue;

    result.push({
      name: p.title,
      price,
      store: storeMeta.name,
      sourceUrl: storeMeta.url,
      productUrl: `${storeMeta.url}/products/${p.handle}`,
      image: p.images?.[0]?.src ?? '',
      category: p.product_type || storeMeta.defaultCategory,
      brand: p.vendor || 'Unknown',
      unit: 'piece',
      variant: variant.title !== 'Default Title' ? variant.title : undefined,
      location: storeMeta.location,
      availability: 'in_stock',
      trustRating: storeMeta.trustRating,
    });
  }

  return result;
}

/**
 * Load a cheerio instance from HTML string.
 */
export function loadHtml(html: string): cheerio.CheerioAPI {
  return cheerio.load(html);
}

/**
 * Parse a Philippine price string to a number.
 * Handles "₱ 1,350.00", "PHP 1350", "1,350", etc.
 */
export function parsePrice(raw: string): number {
  const cleaned = raw.replace(/[₱PHP\s,]/gi, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Sleep for a given number of milliseconds (rate limiting).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface StoreMeta {
  name: string;
  url: string;
  location: string;
  trustRating: number;
  defaultCategory: string;
}
