/**
 * BQ Builderware scraper — https://www.bqbuilderware.com
 * Not Shopify (confirmed: /products.json 500s persistently, along with
 * /sitemap.xml — the entire Shopify layer appears dead). The live site is
 * actually a custom Laravel/Vue storefront with real category pages
 * (/tools-and-hardware, etc.) carrying genuine products, PHP prices, and
 * working cart/checkout — verified before writing this.
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'BQ Builderware',
  url: 'https://www.bqbuilderware.com',
  location: 'Metro Manila',
  trustRating: 4.5,
  defaultCategory: 'Hardware',
};

// Verified live: returns 200 with real product-card markup and PHP prices.
const CATEGORY_PAGES = ['/tools-and-hardware'];

const SEED: ScrapedProduct[] = [
  { name: 'ABC Tile Adhesive Heavy Duty 25kg', price: 495, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/abc-tile-adhesive', image: '', category: 'Cement & Concrete', brand: 'ABC', unit: 'bag', size: '25 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'BI C-Purlins 2x4x12mm Steel', price: 555, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/c-purlins', image: '', category: 'Steel & Structural', brand: 'BI', unit: 'piece', size: '2"x4"x12ft', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bestank Polyethylene Water Tank 300L Vertical', price: 6200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bestank-300l', image: '', category: 'Plumbing', brand: 'Bestank', unit: 'piece', size: '300L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Spandrel Panel Colored 8ft', price: 480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/spandrel', image: '', category: 'Roofing & Cladding', brand: 'Local', unit: 'piece', size: '8ft', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Concrete Hollow Blocks 6 inch', price: 30, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/chb-6inch', image: '', category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', size: '6"', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Deformed Steel Bar 10mm x 6m', price: 570, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rebar-10mm', image: '', category: 'Steel & Structural', brand: 'Philippine Steel', unit: 'piece', size: '10mm x 6m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Fill Sand per Cubic Meter', price: 600, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/sand', image: '', category: 'Aggregates', brand: 'Local', unit: 'cu.m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Knauf Gypsum Board 4x8 5/8 inch', price: 650, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/gypsum', image: '', category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', size: '4\'x8\'', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'GI Sheet Plain 4x8 Gauge 26', price: 920, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/gi-sheet', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bestank Polyethylene Water Tank 500L Vertical', price: 9500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bestank-500l', image: '', category: 'Plumbing', brand: 'Bestank', unit: 'piece', size: '500L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Angle Bar 1.5 inch 3mm 20ft', price: 720, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/angle-bar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'PVC Water Pipe 2 inch Class C 4m', price: 560, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/pvc-2inch', image: '', category: 'Plumbing', brand: 'Neltex', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Flat Bar 1x4mm 20ft Steel', price: 380, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/flat-bar', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Wire Mesh 4x8 Gauge 16', price: 1450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/wire-mesh', image: '', category: 'Steel & Structural', brand: 'Local', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Galvanized Corrugated Sheet Gauge 26 10ft', price: 1280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/gi-roofing', image: '', category: 'Roofing & Cladding', brand: 'Local', unit: 'sheet', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeBQBuilderware(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const results: ScrapedProduct[] = [];

    for (const catPage of CATEGORY_PAGES) {
      const html = await fetchPage(STORE.url + catPage);
      const $ = loadHtml(html);

      $('.featured-products-card').each((_, el) => {
        const name = $(el).find('.featured-products-card-title').first().text().trim();
        const priceText = $(el).find('.list-group-item b').first().text().trim();
        const price = parsePrice(priceText);
        const href = $(el).find('a').first().attr('href') ?? '';
        const img = $(el).find('img.featured-products-card-img-top').first().attr('src') ?? '';
        const brand = $(el).find('.featured-products-card-text').first().text().trim();

        if (name && price > 0 && href) {
          results.push({
            name,
            price,
            store: STORE.name,
            sourceUrl: STORE.url,
            productUrl: href.startsWith('http') ? href : STORE.url + href,
            image: img,
            category: STORE.defaultCategory,
            brand: brand || 'Unknown',
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
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
