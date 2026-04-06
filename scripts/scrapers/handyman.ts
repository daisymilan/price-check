/**
 * Handyman PH scraper — https://handyman.com.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Handyman',
  url: 'https://handyman.com.ph',
  location: 'Metro Manila',
  trustRating: 4.5,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Wood Framing Lumber 2x4 8ft', price: 285, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/lumber', image: '', category: 'Wood & Lumber', brand: 'Local Lumber', unit: 'piece', size: '8ft', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Davies Titanium Flat Latex White 1 Gallon', price: 1650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Davies', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley 16oz Claw Hammer', price: 650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Fujimoto Aluminum Stepladder 4-Step', price: 2150, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch PST 700 E Jig Saw 500W', price: 3380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GWS 700 Angle Grinder 4 inch 710W', price: 1850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Norton Cutting Disc 4 inch Metal', price: 90, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/abrasives', image: '', category: 'Abrasives', brand: 'Norton', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 2 inch Class C 4m', price: 580, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Acrytex Primer 1 Gallon Gray', price: 990, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Steel Nails Common Wire 2 inch 1kg', price: 88, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Local', unit: 'kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeHandyman(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting Shopify + HTML scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) {
      const results = shopifyToScraped(shopify, STORE);
      console.log(`[${STORE.name}] Shopify: ${results.length} products`);
      return results;
    }
    throw new Error('No Shopify products found');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
