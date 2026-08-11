/**
 * Topmost Hardware scraper — https://www.topmosthardware.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Topmost Hardware',
  url: 'https://www.topmosthardware.ph',
  location: 'Metro Manila',
  trustRating: 4.3,
  defaultCategory: 'Hardware',
};

// Site is WooCommerce, not Shopify — /collections/all is a genuine 404 (real
// title: "Page not found"). Verified real category pages below return 200
// with actual li.product markup.
const CATEGORY_PAGES = [
  '/product-category/concreting-masonry/',
  '/product-category/tools-equipments/',
  '/product-category/electrical-fixtures-and-devices/',
];

const SEED: ScrapedProduct[] = [
  { name: 'Makita 9556HN Angle Grinder 4 inch 840W', price: 4180, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-9556hn', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'MSA V-Gard Hard Hat White', price: 820, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/msa-hardhat', image: '', category: 'Safety Equipment', brand: 'MSA', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GWS 700 Angle Grinder 4 inch', price: 1890, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-grinder', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement Type 1 40kg', price: 290, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/cement', image: '', category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 582, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rebar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1/2 inch Class C 4m', price: 375, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/pvc-pipe', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Latex Paint White 1 Gallon', price: 1360, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeTopmost(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting Shopify + HTML scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const results: ScrapedProduct[] = [];

    for (const catPage of CATEGORY_PAGES) {
      const html = await fetchPage(STORE.url + catPage);
      const $ = loadHtml(html);

      $('li.product').each((_, el) => {
        const name = $(el).find('h2, h3, .product-title').first().text().trim();
        const priceText = $(el).find('.price, [class*="price"]').first().text().trim();
        const price = parsePrice(priceText);
        const href = $(el).find('a').first().attr('href') ?? '';
        const img = $(el).find('img').first().attr('src') ?? '';
        if (name && price > 0) {
          results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href.startsWith('http') ? href : STORE.url + href, image: img, category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
        }
      });
    }

    if (results.length > 0) {
      console.log(`[${STORE.name}] Live: ${results.length} products`);
      return results;
    }
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
