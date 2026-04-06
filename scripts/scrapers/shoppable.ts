/**
 * Shoppable PH scraper — https://business.shoppable.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Shoppable PH',
  url: 'https://business.shoppable.ph',
  location: 'Online',
  trustRating: 4.2,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Steel Nails Assorted 1kg', price: 79, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/nails', image: '', category: 'Hardware', brand: 'Local', unit: 'kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Latex Flat Paint White 1 Gallon', price: 1299, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-latex', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji AVR SVC-500 500W', price: 2350, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/avr', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ceramic Floor Tiles 60x60 Glossy White', price: 1850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/tiles', image: '', category: 'Tiles & Stone', brand: 'Local Brand', unit: 'box', size: '60x60cm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Panasonic Electric Shower DH-3JP2', price: 12999, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/shower', image: '', category: 'Plumbing', brand: 'Panasonic', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Electrical Wire 2.5mm THW 100m', price: 2650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/wire', image: '', category: 'Electrical', brand: 'Omega', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M N95 Respirator 8210', price: 99, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/mask', image: '', category: 'Safety Equipment', brand: '3M', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Norton Cutting Disc 4 inch Metal', price: 75, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/disc', image: '', category: 'Abrasives', brand: 'Norton', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeShoppable(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/collections');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('[class*="product"], .item-card, .product-card').each((_, el) => {
      const name = $(el).find('[class*="name"], [class*="title"], h2, h3').first().text().trim();
      const priceText = $(el).find('[class*="price"]').first().text().trim();
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
