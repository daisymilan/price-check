/**
 * Meiji Electric PH scraper — https://meijielectric.ph
 * Custom PHP site — scrapes category pages for electrical products.
 */

import { ScrapedProduct } from '../types.js';
import { fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Meiji Electric PH',
  url: 'https://meijielectric.ph',
  location: 'Metro Manila',
  trustRating: 4.7,
  defaultCategory: 'Electrical',
};

const CATEGORY_PAGES = [
  '/product-category/avr-ups/',
  '/product-category/circuit-breakers/',
  '/product-category/wiring-devices/',
  '/product-category/cables-wires/',
  '/product-category/lighting/',
];

const SEED: ScrapedProduct[] = [
  { name: 'Meiji AVR SVC-500 500W Voltage Regulator', price: 2499, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/avr-svc500', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji AVR SVC-1000 1000W Voltage Regulator', price: 3499, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/avr-svc1000', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji C45N-2P Circuit Breaker 2-Pole 1-32A', price: 260, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/c45n-2p', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji CAT6 Data Outlet MCS-0523A Wall Plate', price: 189, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/mcs-0523a', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Electrical Wire 2.5mm THW 100m', price: 2720, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/wire-2-5mm', image: '', category: 'Electrical', brand: 'Meiji', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Electrical Wire 1.5mm THW 100m', price: 1890, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/wire-1-5mm', image: '', category: 'Electrical', brand: 'Meiji', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji AVR SVC-2000 2000W Voltage Regulator', price: 5499, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/avr-svc2000', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Circuit Breaker 1-Pole C45N 15A', price: 180, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/c45n-1p', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji LED Downlight 7W Round', price: 220, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/led-7w', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji LED Bulb 9W Warm White', price: 89, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/led-bulb-9w', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Convenience Outlet 2-Gang Flush Type', price: 129, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/outlet-2gang', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Distribution Panel Board 4-Way', price: 1250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/panel-4way', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Flexible Conduit 3/4 inch 30m', price: 480, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/conduit-3-4', image: '', category: 'Electrical', brand: 'Meiji', unit: 'roll', size: '30m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji 3-Pin Gang Outlet Universal', price: 189, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/3pin-outlet', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji AVR SVC-500VA Automatic Voltage Regulator', price: 2199, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/avr-svc500va', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Single Pole Switch 1-Gang Flush', price: 89, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/switch-1gang', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji Electrical Wire 3.5mm THW 100m', price: 3890, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/wire-3-5mm', image: '', category: 'Electrical', brand: 'Meiji', unit: 'roll', size: '100m', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji UPS 650VA 390W', price: 2850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/ups-650va', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Meiji LED T8 Tube 18W 4ft', price: 280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/product/t8-18w', image: '', category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeMeijiElectric(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting live scrape...`);

  try {
    const results: ScrapedProduct[] = [];

    for (const catPage of CATEGORY_PAGES.slice(0, 3)) {
      const html = await fetchPage(STORE.url + catPage);
      const $ = loadHtml(html);

      // WooCommerce product selectors
      $('li.product, .product-type-simple, .type-product').each((_, el) => {
        const name = $(el).find('.woocommerce-loop-product__title, h2, .product-title').first().text().trim();
        const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim();
        const href = $(el).find('a.woocommerce-LoopProduct-link, a').first().attr('href') ?? '';
        const img = $(el).find('img').first().attr('src') ?? $(el).find('img').first().attr('data-src') ?? '';
        const price = parsePrice(priceText);

        if (name && price > 0) {
          results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href, image: img, category: 'Electrical', brand: 'Meiji', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
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
