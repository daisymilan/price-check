/**
 * CW Home Depot scraper — https://www.cwhomedepot.com
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'CW Home Depot',
  url: 'https://www.cwhomedepot.com',
  location: 'Metro Manila',
  trustRating: 4.7,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Boysen Latex Flat Paint White 1 Gallon', price: 1420, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement Type 1 40kg', price: 295, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/cement', image: '', category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', size: '40 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ceramic Floor Tiles 60x60 Glossy White', price: 3200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tiles', image: '', category: 'Tiles & Stone', brand: 'Porcelanosa', unit: 'box', size: '60x60cm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 4 inch', price: 20, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/blocks', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', size: '4"', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 12mm x 6m', price: 825, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', size: '12mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Galvanized Corrugated Sheet Gauge 20 10ft', price: 1325, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/roofing', image: '', category: 'Roofing & Cladding', brand: 'Local', unit: 'sheet', size: '10ft', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1 inch Class C 4m', price: 680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', size: '1"x4m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Gravel 3/4 inch per Cubic Meter', price: 750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/aggregates', image: '', category: 'Aggregates', brand: 'Local', unit: 'cu.m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Aluminum Sliding Window 4x4 Feet Anodized', price: 8500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/windows', image: '', category: 'Doors & Windows', brand: 'Almet', unit: 'piece', size: '4\'x4\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GSB 13 RE Rotary Hammer Drill 600W', price: 3680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Yale 60mm Hardened Brass Padlock', price: 4050, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Yale', unit: 'piece', size: '60mm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Rosco Top Mount Brass Kitchen Faucet Chrome', price: 899, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Rosco', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 585, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', size: '10mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 5007N Circular Saw 7-1/4 inch 1800W', price: 7200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Davies Titanium Flat Latex White 1 Gallon', price: 1620, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Davies', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeCWHomeDepot(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, .product').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title, .name').first().text().trim();
      const priceText = $(el).find('.price, [class*="price"]').first().text().trim();
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      const price = parsePrice(priceText);

      if (name && price > 0) {
        results.push({
          name, price, store: STORE.name, sourceUrl: STORE.url,
          productUrl: href.startsWith('http') ? href : STORE.url + href,
          image: img.startsWith('http') ? img : '',
          category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece',
          location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating,
        });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
