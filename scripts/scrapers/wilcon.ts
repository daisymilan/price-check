/**
 * Wilcon Depot scraper — https://www.wilcon.com.ph
 * Strategy: HTML scraping of category pages. Falls back to seed on failure.
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Wilcon Depot',
  url: 'https://www.wilcon.com.ph',
  location: 'Metro Manila',
  trustRating: 4.8,
  defaultCategory: 'Hardware',
};

const CATEGORY_SLUGS = [
  '/category/construction-materials',
  '/category/plumbing',
  '/category/electrical',
  '/category/paint',
  '/category/tools',
];

const SEED: ScrapedProduct[] = [
  { name: 'Boysen Latex Flat Paint White 1 Gallon', price: 1350, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Permacoat Latex White 1 Gallon', price: 1480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Portland Cement Type 1 40kg Holcim', price: 285, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/cement', image: '', category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', size: '40 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Mapei Kerabond Tile Adhesive 25kg', price: 750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/adhesive', image: '', category: 'Cement & Concrete', brand: 'Mapei', unit: 'bag', size: '25 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ceramic Floor Tiles 60x60 Glossy White', price: 2400, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tiles', image: '', category: 'Tiles & Stone', brand: 'Emser', unit: 'box', size: '60x60cm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 4 inch', price: 22, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/blocks', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', size: '4"', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 580, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', size: '10mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Marine Plywood 18mm 4x8', price: 3800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plywood', image: '', category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Galvanized Corrugated Sheet Gauge 20 10ft', price: 1450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/roofing', image: '', category: 'Roofing & Cladding', brand: 'Dongkuk', unit: 'sheet', size: '10ft', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Pipe 1/2 inch Class C 4m Neltex', price: 380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/plumbing', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', size: '1/2"x4m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Electrical Wire 2.5mm THW 100m Magellan', price: 2800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/electrical', image: '', category: 'Electrical', brand: 'Magellan', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Knauf Gypsum Board 4x8 5/8 inch', price: 720, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/gypsum', image: '', category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Flush Door 30x80 Hollow Core', price: 2200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/doors', image: '', category: 'Doors & Windows', brand: 'Wilcon', unit: 'piece', size: '30"x80"', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bestank Water Tank 300L Vertical', price: 6500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/water-tanks', image: '', category: 'Plumbing', brand: 'Bestank', unit: 'piece', size: '300L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Fill Sand per Cubic Meter', price: 650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/aggregates', image: '', category: 'Aggregates', brand: 'Local', unit: 'cu.m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Yale 60mm Hardened Brass Padlock', price: 3950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/hardware', image: '', category: 'Hardware', brand: 'Yale', unit: 'piece', size: '60mm', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 9556HN Angle Grinder 4 inch 840W', price: 4490, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Garant Wheelbarrow 6 Cubic Feet', price: 3250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/tools', image: '', category: 'Tools & Equipment', brand: 'Garant', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Nippon Paint Weatherbond Flex 1 Gallon White', price: 1750, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/paint', image: '', category: 'Paint & Coating', brand: 'Nippon', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 12mm x 6m', price: 830, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/steel', image: '', category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', size: '12mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeWilcon(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const results: ScrapedProduct[] = [];

    for (const slug of CATEGORY_SLUGS.slice(0, 2)) {
      const html = await fetchPage(STORE.url + slug);
      const $ = loadHtml(html);

      // Common Wilcon product card selectors — update if site changes
      $('.product-item, .product-card, [class*="product"]').each((_, el) => {
        const name = $(el).find('h2, h3, .product-title, .product-name').first().text().trim();
        const priceText = $(el).find('.price, .product-price, [class*="price"]').first().text().trim();
        const href = $(el).find('a').first().attr('href') ?? '';
        const img = $(el).find('img').first().attr('src') ?? '';

        const price = parsePrice(priceText);
        if (name && price > 0) {
          results.push({
            name,
            price,
            store: STORE.name,
            sourceUrl: STORE.url,
            productUrl: href.startsWith('http') ? href : STORE.url + href,
            image: img.startsWith('http') ? img : img ? STORE.url + img : '',
            category: STORE.defaultCategory,
            brand: 'Unknown',
            unit: 'piece',
            location: STORE.location,
            availability: 'in_stock',
            trustRating: STORE.trustRating,
          });
        }
      });
    }

    if (results.length > 0) {
      console.log(`[${STORE.name}] Live: ${results.length} products`);
      return results;
    }

    throw new Error('No products parsed from HTML');
  } catch (err) {
    console.warn(`[${STORE.name}] Falling back to seed: ${err}`);
    return SEED;
  }
}
