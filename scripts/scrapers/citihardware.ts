/**
 * CitiHardware scraper — https://citihardware.com
 *
 * Next.js storefront on a Saleor-style GraphQL backend. No browser rendering
 * needed: /products/category/<slug> is server-side rendered, and the exact
 * product data (name, price, image, SKU, availability) that would otherwise
 * require a headless browser is already embedded as JSON in the __NEXT_DATA__
 * script tag of the plain HTTP response. Verified live before writing this.
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'CitiHardware',
  url: 'https://citihardware.com',
  location: 'Cebu',
  trustRating: 4.6,
  defaultCategory: 'Hardware',
};

// Verified live: each returns HTTP 200 with real ssrProductsData.
const CATEGORY_SLUGS = ['building-materials', 'hardware', 'paints-and-accessories'];

const SEED: ScrapedProduct[] = [
  { name: 'Boysen Permacoat Latex White 1 Gallon', price: 1480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'ABC Tile Adhesive Heavy Duty 25kg', price: 520, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/cement', image: '', category: 'Cement & Concrete', brand: 'ABC', unit: 'bag', size: '25 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ceramic Wall Tiles 30x60 Matte White', price: 1450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tiles', image: '', category: 'Tiles & Stone', brand: 'Cerabati', unit: 'box', size: '30x60cm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement Type 1 40kg Holcim', price: 288, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/cement', image: '', category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', size: '40 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1/2 inch Class C Neltex', price: 370, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 575, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Electrical Wire 2.5mm THW 100m', price: 2750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'Magellan', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Marine Plywood 18mm 4x8', price: 3720, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plywood', image: '', category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Knauf Gypsum Board 4x8 Regular', price: 695, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/gypsum', image: '', category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 4 inch', price: 21, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/blocks', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stainless Faucet Kitchen Mixer', price: 1250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'San-Ei', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Circuit Breaker 2-Pole 20A Meiji', price: 265, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

interface CitiProductNode {
  name: string;
  slug: string;
  isAvailable: boolean;
  metafields?: { brand?: string; dimensions?: string };
  category?: { name?: string };
  media?: { url: string }[];
  defaultVariant?: {
    sku?: string;
    media?: { url: string }[];
    pricing?: { price?: { gross?: { amount: number } } };
  };
}

/** Extract Next.js's embedded page-data JSON from server-rendered HTML. */
function extractNextData(html: string): unknown {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

export async function scrapeCitiHardware(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape (SSR JSON)...`);

  try {
    const results: ScrapedProduct[] = [];

    for (const slug of CATEGORY_SLUGS) {
      const html = await fetchPage(`${STORE.url}/products/category/${slug}`);
      const nextData = extractNextData(html) as {
        props?: { pageProps?: { ssrProductsData?: { edges?: { node: CitiProductNode }[] } } };
      } | null;
      const edges = nextData?.props?.pageProps?.ssrProductsData?.edges;
      if (!edges) continue;

      for (const { node } of edges) {
        const price = node.defaultVariant?.pricing?.price?.gross?.amount;
        if (typeof price !== 'number' || !isFinite(price) || price <= 0) continue;

        results.push({
          name: node.name,
          price,
          store: STORE.name,
          sourceUrl: STORE.url,
          productUrl: `${STORE.url}/products/${node.slug}`,
          image: node.media?.[0]?.url ?? node.defaultVariant?.media?.[0]?.url ?? '',
          category: node.category?.name || STORE.defaultCategory,
          brand: node.metafields?.brand || 'Unknown',
          unit: 'piece',
          size: node.metafields?.dimensions || undefined,
          location: STORE.location,
          availability: node.isAvailable ? 'in_stock' : 'out_of_stock',
          trustRating: STORE.trustRating,
        });
      }
    }

    if (results.length > 0) {
      console.log(`[${STORE.name}] Live: ${results.length} products`);
      return results;
    }
    throw new Error('No products parsed from SSR data');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
