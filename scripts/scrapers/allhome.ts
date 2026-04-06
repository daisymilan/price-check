/**
 * AllHome scraper — https://corporate.allhome.com.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'AllHome',
  url: 'https://corporate.allhome.com.ph',
  location: 'Metro Manila',
  trustRating: 4.6,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Boysen Latex Flat Paint White 1 Gallon', price: 1380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement Type 1 40kg Republic Cement', price: 278, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/cement', image: '', category: 'Cement & Concrete', brand: 'Republic Cement', unit: 'bag', size: '40 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ceramic Floor Tiles 60x60 Glossy White', price: 1850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tiles', image: '', category: 'Tiles & Stone', brand: 'Local Brand', unit: 'box', size: '60x60cm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 595, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Ryerson Steel', unit: 'piece', size: '10mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Marine Plywood 18mm 4x8', price: 3950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plywood', image: '', category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1/2 inch Class B 4m', price: 320, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Amaquest', unit: 'piece', size: '1/2"x4m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Knauf Gypsum Board 4x8 5/8 inch', price: 680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/gypsum', image: '', category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Aluminum Sliding Window 4x4 Feet', price: 8200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/windows', image: '', category: 'Doors & Windows', brand: 'Almet', unit: 'piece', size: '4\'x4\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Steel Nails Assorted 1kg', price: 95, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Xtreme', unit: 'kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Circuit Breaker 2-Pole Schneider 15A', price: 295, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'Schneider', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita HP1631 Rotary Hammer Drill 710W', price: 5450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeAllHome(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url);
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, [class*="product"]').each((_, el) => {
      const name = $(el).find('h2, h3, .product-name, .product-title').first().text().trim();
      const priceText = $(el).find('.price, [class*="price"]').first().text().trim();
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      const price = parsePrice(priceText);
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
