/**
 * const.ph scraper — https://const.ph
 * Online construction marketplace
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'const.ph',
  url: 'https://const.ph',
  location: 'Online',
  trustRating: 4.3,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Portland Cement Type 1 40kg', price: 282, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/cement', image: '', category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', size: '40 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 572, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rebar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Sand Fill per Cubic Meter', price: 620, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/sand', image: '', category: 'Aggregates', brand: 'Local', unit: 'cu.m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Gravel 3/4 inch per Cubic Meter', price: 740, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/gravel', image: '', category: 'Aggregates', brand: 'Local', unit: 'cu.m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 4 inch', price: 21, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/chb', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'GI Corrugated Roofing Sheet 10ft Gauge 26', price: 1260, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/roofing', image: '', category: 'Roofing & Cladding', brand: 'Local', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Marine Plywood 18mm 4x8', price: 3750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/plywood', image: '', category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Electrical Wire 2.5mm THW 100m', price: 2680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/wire', image: '', category: 'Electrical', brand: 'Magellan', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeConstPh(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/shop/');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('li.product').each((_, el) => {
      const name = $(el).find('.woocommerce-loop-product__title, h2, h3').first().text().trim();
      const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim();
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
