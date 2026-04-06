/**
 * MR. DIY Philippines scraper — https://www.mrdiy.com/ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'MR. DIY Philippines',
  url: 'https://www.mrdiy.com/ph',
  location: 'Metro Manila',
  trustRating: 4.4,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Stanley 16oz Claw Hammer', price: 620, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita BO3711 Random Orbit Sander 160W', price: 3100, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Fujimoto Aluminum Stepladder 4-Step', price: 2050, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lotus Steel Tape 5M', price: 130, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', size: '5M', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley 19 inch Metal Toolbox', price: 1690, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley Ratcheting Screwdriver Set 6pc', price: 790, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Corona Paint Roller Set 9 inch 3pc', price: 390, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Tools & Equipment', brand: 'Corona', unit: 'set', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M Sandpaper Assorted 10pc', price: 240, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/abrasives', image: '', category: 'Abrasives', brand: '3M', unit: 'pack', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Electrical Tape PVC Black 10m', price: 35, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'Local', unit: 'roll', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Wall Anchor Plastic 6mm 100pc', price: 45, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Local', unit: 'pack', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Silicon Sealant Neutral Cure Clear 300ml', price: 120, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/sealants', image: '', category: 'Hardware', brand: 'Local', unit: 'tube', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Paintbrush Set 5pc Assorted', price: 180, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Tools & Equipment', brand: 'Local', unit: 'set', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeMrDiy(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/tools-hardware');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('[class*="product"], .item-card').each((_, el) => {
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
