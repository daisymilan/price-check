/**
 * ACE Hardware Philippines scraper — https://www.acehardware.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Ace Hardware Philippines',
  url: 'https://www.acehardware.ph',
  location: 'Metro Manila',
  trustRating: 4.7,
  defaultCategory: 'Hardware',
};

const SEED: ScrapedProduct[] = [
  { name: 'Rosco Top Mount Brass Kitchen Faucet Chrome', price: 819, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Rosco', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Panasonic Electric Home Shower DH-3JP2', price: 13499, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Panasonic', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Yale 60mm Hardened Brass Padlock', price: 4199, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Yale', unit: 'piece', size: '60mm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 5007N Circular Saw 7-1/4 inch 1800W', price: 7200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley 16oz Claw Hammer', price: 680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley Ratcheting Screwdriver Set 6pc', price: 850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley 5M Tape Measure FatMax', price: 480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley Box Beam Level 24 inch', price: 680, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley 19 inch Metal Toolbox', price: 1850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Stanley Combination Wrench Set 8pcs', price: 1450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', size: '8-19mm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Fujimoto Aluminum Stepladder 4-Step', price: 2200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Garant Wheelbarrow 6 Cubic Feet', price: 3500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Garant', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'MSA V-Gard Hard Hat White', price: 850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: 'MSA', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Mechanix Wear M-Pact Gloves Black', price: 1250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: 'Mechanix Wear', unit: 'pair', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M Safety Goggles Virtua Clear', price: 320, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: '3M', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Caterpillar Second Shift Steel Toe Boot Brown', price: 4800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: 'Caterpillar', unit: 'pair', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ergodyne Glowear 8006 Safety Vest Orange', price: 480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: 'Ergodyne', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M N95 Respirator 8210', price: 120, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/safety', image: '', category: 'Safety Equipment', brand: '3M', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Dewalt DCD805M2T 18V 20V Cordless Hammer Drill', price: 13950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M Sandpaper Assorted 10pc', price: 280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/abrasives', image: '', category: 'Abrasives', brand: '3M', unit: 'pack', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Circuit Breaker 2-Pole ABB 20A', price: 420, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'ABB', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Corona Paint Roller Set 9 inch 3pc', price: 450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Corona', unit: 'set', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Purdy 3 inch Nylon Polyester Paint Brush', price: 580, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Purdy', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Nippon Paint Weatherbond Flex 1 Gallon White', price: 1750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Nippon', unit: 'gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Snap-on 3/8 Drive Ratchet', price: 4200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Snap-on', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Elco Hex Washer Head Screw 10 x 3 inch 1lb', price: 310, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Elco', unit: 'pack', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeAceHardware(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, .grid-item').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title, .item-title').first().text().trim();
      const priceText = $(el).find('.price, .regular-price, [class*="price"]').first().text().trim();
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
