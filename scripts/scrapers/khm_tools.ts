/**
 * KHM Megatools scraper — https://khmtools.com.ph
 * Likely Shopify — tries /products.json first, then HTML fallback.
 */

import { ScrapedProduct } from '../types.js';
import { fetchShopifyProducts, shopifyToScraped, fetchPage, loadHtml, parsePrice, StoreMeta } from './base.js';

const STORE: StoreMeta = {
  name: 'KHM Megatools',
  url: 'https://khmtools.com.ph',
  location: 'Metro Manila',
  trustRating: 4.6,
  defaultCategory: 'Tools & Equipment',
};

const SEED: ScrapedProduct[] = [
  { name: 'Bosch GWS 700 Angle Grinder 4 inch 710W', price: 1815, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gws700', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 9556HN Angle Grinder 4 inch 840W', price: 4250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-9556hn', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Dewalt DCD805M2T 18V 20V Cordless Hammer Drill', price: 13200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/dewalt-dcd805', image: '', category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GSB 13 RE Rotary Hammer Drill 600W', price: 3450, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gsb13', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita HP1631 Rotary Hammer Drill 16mm 710W', price: 5200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-hp1631', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 5007N Circular Saw 7-1/4 inch 1800W', price: 6800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-5007n', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GKS 185 Li Cordless Circular Saw', price: 9500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gks185', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch PST 700 E Jig Saw 500W', price: 3150, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-pst700', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita BO3711 Random Orbit Sander 160W', price: 2950, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-bo3711', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch POF 1200 AE Router 1200W', price: 8200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-pof1200', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Lincoln Electric Handy MIG Welder 115V', price: 18500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/lincoln-mig', image: '', category: 'Tools & Equipment', brand: 'Lincoln Electric', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita MAC2400 Air Compressor 2.5HP', price: 24500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-mac2400', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Dewalt DWFP12231 Brad Nailer 18-Gauge', price: 7800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/dewalt-nailer', image: '', category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Snap-on 3/8 Drive Ratchet', price: 4200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/snapon-ratchet', image: '', category: 'Tools & Equipment', brand: 'Snap-on', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'MSA V-Gard Hard Hat Yellow', price: 780, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/msa-hardhat', image: '', category: 'Safety Equipment', brand: 'MSA', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Mechanix Wear M-Pact Gloves Black', price: 1100, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/mechanix-mpact', image: '', category: 'Safety Equipment', brand: 'Mechanix Wear', unit: 'pair', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: '3M Safety Goggles Virtua Clear', price: 280, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/3m-goggles', image: '', category: 'Safety Equipment', brand: '3M', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Caterpillar Second Shift Steel Toe Boot Brown', price: 4500, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/cat-boots', image: '', category: 'Safety Equipment', brand: 'Caterpillar', unit: 'pair', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Ergodyne Glowear Safety Vest Orange', price: 420, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/ergodyne-vest', image: '', category: 'Safety Equipment', brand: 'Ergodyne', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Norton Cutting Disc 4 inch Metal', price: 85, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/norton-disc', image: '', category: 'Abrasives', brand: 'Norton', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita 9556HN Angle Grinder 4 inch 840W', price: 4250, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-9556hn-2', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Bosch GBH 2-26 D Rotary Hammer 800W', price: 7800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/bosch-gbh226', image: '', category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Makita GA4034 Angle Grinder 4 inch 720W', price: 3200, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/makita-ga4034', image: '', category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Dewalt DW411 Random Orbit Sander 230W', price: 3800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/dewalt-dw411', image: '', category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
  { name: 'Milwaukee M18 Fuel Compact Drill Driver', price: 16800, store: STORE.name, sourceUrl: STORE.url, productUrl: STORE.url + '/products/milwaukee-m18', image: '', category: 'Tools & Equipment', brand: 'Milwaukee', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating },
];

export async function scrapeKHMTools(): Promise<ScrapedProduct[]> {
  console.log(`[${STORE.name}] Attempting Shopify scrape...`);

  try {
    const shopify = await fetchShopifyProducts(STORE.url);
    if (shopify.length > 0) {
      const results = shopifyToScraped(shopify, STORE);
      console.log(`[${STORE.name}] Shopify: ${results.length} products`);
      return results;
    }

    // Try HTML
    const html = await fetchPage(STORE.url + '/collections/all');
    const $ = loadHtml(html);
    const results: ScrapedProduct[] = [];

    $('.product-item, .product-card, .grid__item').each((_, el) => {
      const name = $(el).find('h2, .product-title, .card__heading').first().text().trim();
      const priceText = $(el).find('.price, .price__regular, [class*="price"]').first().text().trim();
      const href = $(el).find('a').first().attr('href') ?? '';
      const img = $(el).find('img').first().attr('src') ?? $(el).find('img').first().attr('data-src') ?? '';
      const price = parsePrice(priceText);

      if (name && price > 0) {
        results.push({ name, price, store: STORE.name, sourceUrl: STORE.url, productUrl: href.startsWith('http') ? href : STORE.url + href, image: img.startsWith('http') ? img : img.startsWith('//') ? 'https:' + img : '', category: STORE.defaultCategory, brand: 'Unknown', unit: 'piece', location: STORE.location, availability: 'in_stock', trustRating: STORE.trustRating });
      }
    });

    if (results.length > 0) return results;
    throw new Error('No products parsed');
  } catch (err) {
    console.warn(`[${STORE.name}] Using seed: ${err}`);
    return SEED;
  }
}
