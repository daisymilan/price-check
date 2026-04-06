/**
 * CitiHardware scraper — https://citihardware.com
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'CitiHardware',
  url: 'https://citihardware.com',
  location: 'Cebu',
  trustRating: 4.6,
  defaultCategory: 'Hardware',
};

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

export async function scrapeCitiHardware(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/shop');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('li.product, .product-item, .product-card').each((_, el) => {
      const name = $(el).find('.woocommerce-loop-product__title, h2, .product-title').first().text().trim();
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
