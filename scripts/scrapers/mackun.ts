/**
 * Mackun Hardware scraper — https://mackunhardware.com
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Mackun Hardware',
  url: 'https://mackunhardware.com',
  location: 'Metro Manila',
  trustRating: 4.4,
  defaultCategory: 'Tools & Equipment',
};

const SEED: ScrapedProduct[] = [
  { name: 'Lotus Wire Stripper 6 inch LTHT600WSX', price: 180, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-wire-stripper', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Steel Tape 5M LTHT510STX', price: 115, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-tape', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', size: '5M', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Combination Plier 8 inch LTHT200CPX', price: 195, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-plier', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Long Nose Plier 6 inch', price: 155, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-longnose', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Claw Hammer 16oz Fiberglass Handle', price: 380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-hammer', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Adjustable Wrench 10 inch', price: 280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-wrench', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Krisbow Digital Multimeter 2000 Count', price: 950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/krisbow-multimeter', image: '', category: 'Tools & Equipment', brand: 'Krisbow', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Hacksaw Frame Adjustable 12 inch', price: 145, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lotus-hacksaw', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeMackun(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, li.product').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title, .woocommerce-loop-product__title').first().text().trim();
      const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim();
      const price = parsePrice(priceText);
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href, image: img, category: STORE.defaultCategory, brand: 'Lotus', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
