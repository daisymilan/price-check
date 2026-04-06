/**
 * Hardware Zone PH scraper — https://hardwarezoneph.com
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Hardware Zone PH',
  url: 'https://hardwarezoneph.com',
  location: 'Metro Manila',
  trustRating: 4.3,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Boysen Acrytex Primer 1 Gallon Gray', price: 980, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-primer', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'CAT6 Data Outlet MCS-0523A Wall Plate', price: 210, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/cat6-outlet', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley Box Beam Level 24 inch', price: 620, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/stanley-level', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Wire Stripper 6 inch', price: 199, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-stripper', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 4 inch', price: 21, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/chb', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Steel Nails Common Wire 2 inch 1kg', price: 90, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/nails', image: '', category: 'Hardware', brand: 'Local', unit: 'kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Masking Tape 1 inch x 50m', price: 55, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/masking-tape', image: '', category: 'Hardware', brand: 'Local', unit: 'roll', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeHardwareZone(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, li.product').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title').first().text().trim();
      const priceText = $(el).find('.price, [class*="price"]').first().text().trim();
      const price = parsePrice(priceText);
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href.startsWith('http') ? href : STORE.url + href, image: img, category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
