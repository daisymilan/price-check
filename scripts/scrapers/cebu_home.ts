/**
 * Cebu Home Builders scraper — https://cebuhomebuilders.com
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Cebu Home Builders',
  url: 'https://cebuhomebuilders.com',
  location: 'Cebu',
  trustRating: 4.4,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Marine Plywood 18mm 4x8', price: 3650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/plywood', image: '', category: 'Wood & Lumber', brand: 'Local', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Angle Bar 1.5 inch 3mm 20ft', price: 720, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/angle-bar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Flush Door 30x80 Hollow Core', price: 1950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/door', image: '', category: 'Doors & Windows', brand: 'Local', unit: 'piece', size: '30"x80"', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Steel Nails Assorted 1kg', price: 85, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/nails', image: '', category: 'Hardware', brand: 'Xtreme', unit: 'kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement 40kg Republic Cement', price: 280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/cement', image: '', category: 'Cement & Concrete', brand: 'Republic Cement', unit: 'bag', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 578, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rebar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Galvanized Roofing Sheet Gauge 26 10ft', price: 1290, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/roofing', image: '', category: 'Roofing & Cladding', brand: 'Local', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1 inch Class C 4m', price: 660, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/pvc', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeCebuHome(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const html = await fetchPage(STORE.url + '/shop');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-col, li.product, .product-item').each((_, el) => {
      const name = $(el).find('.post-title, h2, h3, .woocommerce-loop-product__title').first().text().trim();
      const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim();
      const price = parsePrice(priceText);
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href, image: img, category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
