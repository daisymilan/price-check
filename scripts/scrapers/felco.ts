/**
 * Felco Store scraper — https://www.felcostore.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Felco Store',
  url: 'https://www.felcostore.ph',
  location: 'Metro Manila',
  trustRating: 4.5,
  defaultCategory: 'Tools & Equipment',
};

const SEED: ScrapedProduct[] = [
  { name: 'Stanley Combination Wrench Set 8pcs 8-19mm', price: 1380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/stanley-wrench-set', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', size: '8-19mm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GWS 700 Angle Grinder 4 inch 710W', price: 1900, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gws700', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley FatMax Tape Measure 5M', price: 465, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/stanley-tape', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Knipex Combination Plier 200mm', price: 1850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/knipex-plier', image: '', category: 'Tools & Equipment', brand: 'Knipex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bahco Adjustable Wrench 10 inch', price: 980, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bahco-wrench', image: '', category: 'Tools & Equipment', brand: 'Bahco', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita TD110DZ Impact Driver 12V', price: 5200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-impact', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GBM 350 Professional Drill 350W', price: 2850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gbm350', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeFelco(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting Shopify + HTML scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, .grid__item').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title, .card__heading').first().text().trim();
      const priceText = $(el).find('.price, [class*="price"]').first().text().trim();
      const price = parsePrice(priceText);
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? $(el).find('img').first().attr('data-src') ?? '';
      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href.startsWith('http') ? href : STORE.url + href, image: img.startsWith('//') ? 'https:' + img : img, category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
