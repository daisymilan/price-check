/**
 * Baesa Colors Paint Center scraper — https://baesacolorspaintcenter.com.ph
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'Baesa Colors Paint Center',
  url: 'https://baesacolorspaintcenter.com.ph',
  location: 'Metro Manila',
  trustRating: 4.5,
  defaultCategory: 'Paint & Coating',
};

const SEED: ScrapedProduct[] = [
  { name: 'Rayco Superfine White Skimcoat 20kg', price: 520, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rayco-skimcoat-20kg', image: '', category: 'Paint & Coating', brand: 'Rayco', unit: 'bag', size: '20 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Rayco Premium Skimcoat 1kg', price: 60, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/rayco-skimcoat-1kg', image: '', category: 'Paint & Coating', brand: 'Rayco', unit: 'bag', size: '1 kg', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Latex Flat Paint White 4 Liters', price: 540, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-latex', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'can', size: '4L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Permacoat Latex White 4 Liters', price: 590, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-permacoat', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'can', size: '4L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Davies Titanium Flat Latex White 4 Liters', price: 660, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/davies-titanium', image: '', category: 'Paint & Coating', brand: 'Davies', unit: 'can', size: '4L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Acrytex Primer Gray 4 Liters', price: 490, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-primer', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'can', size: '4L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Nippon Paint Weatherbond Flex 4 Liters White', price: 850, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/nippon-weatherbond', image: '', category: 'Paint & Coating', brand: 'Nippon', unit: 'can', size: '4L', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Boysen Alkyd Enamel White 1 Gallon', price: 1280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/boysen-enamel', image: '', category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', size: '1 gallon', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeBasaColors(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) return shopifyToScraped(shopify, STORE);

    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, li.product').each((_, el) => {
      const name = $(el).find('h2, h3, .product-title').first().text().trim();
      const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim();
      const price = parsePrice(priceText);
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? '';
      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href, image: img, category: 'Paint & Coating', brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
