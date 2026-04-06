/**
 * Philippine construction materials price comparison data
 * Products sourced from 19 Philippine hardware stores
 */

import { ProductPrice } from '../types';

export const philippineStores = [
  { name: 'Wilcon Depot', location: 'Metro Manila', trustRating: 4.8 },
  { name: 'CW Home Depot', location: 'Metro Manila', trustRating: 4.7 },
  { name: 'AllHome', location: 'Metro Manila', trustRating: 4.6 },
  { name: 'Handyman', location: 'Metro Manila', trustRating: 4.5 },
  { name: 'Ace Hardware Philippines', location: 'Metro Manila', trustRating: 4.7 },
  { name: 'Shopee Philippines', location: 'Online', trustRating: 4.3 },
  { name: 'Lazada Philippines', location: 'Online', trustRating: 4.2 },
  { name: 'KHM Megatools', location: 'Metro Manila', trustRating: 4.6 },
  { name: 'BQ Builderware', location: 'Metro Manila', trustRating: 4.5 },
  { name: 'Meiji Electric PH', location: 'Metro Manila', trustRating: 4.7 },
  { name: 'Mackun Hardware', location: 'Metro Manila', trustRating: 4.4 },
  { name: 'Baesa Colors Paint Center', location: 'Metro Manila', trustRating: 4.5 },
  { name: 'CitiHardware', location: 'Cebu', trustRating: 4.6 },
  { name: 'MR. DIY Philippines', location: 'Metro Manila', trustRating: 4.4 },
  { name: 'Felco Store', location: 'Metro Manila', trustRating: 4.5 },
  { name: 'Topmost Hardware', location: 'Metro Manila', trustRating: 4.3 },
  { name: 'Cebu Home Builders', location: 'Cebu', trustRating: 4.4 },
  { name: 'Hardware Zone PH', location: 'Metro Manila', trustRating: 4.3 },
  { name: 'Shoppable PH', location: 'Online', trustRating: 4.2 },
];

// Image URLs by category for thumbnails
const IMG = {
  anglegrinder: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop',
  drill: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=300&fit=crop',
  handtool: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop',
  wrench: 'https://images.unsplash.com/photo-1558618047-f4e9b0ee7948?w=300&h=300&fit=crop',
  saw: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?w=300&h=300&fit=crop',
  hammer: 'https://images.unsplash.com/photo-1589792923361-a9e3cc0a23bc?w=300&h=300&fit=crop',
  screwdriver: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&h=300&fit=crop',
  tape: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&h=300&fit=crop',
  level: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&h=300&fit=crop',
  paint: 'https://images.unsplash.com/photo-1578700494142-246e61417603?w=300&h=300&fit=crop',
  paintbrush: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=300&h=300&fit=crop',
  cement: 'https://images.unsplash.com/photo-1580409823253-2b27b47b1e5b?w=300&h=300&fit=crop',
  tiles: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=300&h=300&fit=crop',
  steel: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
  plywood: 'https://images.unsplash.com/photo-1567521464027-f127ff2b3dba?w=300&h=300&fit=crop',
  roofing: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=300&fit=crop',
  pipe: 'https://images.unsplash.com/photo-1580978519578-d657abce7a20?w=300&h=300&fit=crop',
  wire: 'https://images.unsplash.com/photo-1517328304819-92343e3f5d07?w=300&h=300&fit=crop',
  breaker: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop',
  faucet: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop',
  padlock: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  safety: 'https://images.unsplash.com/photo-1618090584176-7132b9911657?w=300&h=300&fit=crop',
  ladder: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&h=300&fit=crop',
  wheelbarrow: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=300&h=300&fit=crop',
  blocks: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  sand: 'https://images.unsplash.com/photo-1581092911360-773af822fab3?w=300&h=300&fit=crop',
  door: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=300&fit=crop',
  gypsum: 'https://images.unsplash.com/photo-1588195538326-c5b1e62f0fa9?w=300&h=300&fit=crop',
  waterheater: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop',
  tank: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=300&h=300&fit=crop',
  adhesive: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop',
  nails: 'https://images.unsplash.com/photo-1517433456452-f06b51e04a72?w=300&h=300&fit=crop',
  powertools: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop',
  avr: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop',
  network: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop',
};

export const mockProducts: ProductPrice[] = [

  // ─── PAINT & COATING ───────────────────────────────────────────────────────

  {
    id: 'paint-001', productName: 'Boysen Latex Flat Paint', normalizedProductName: 'boysen latex flat paint 1 gallon white',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1350, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'paint-002', productName: 'Boysen Latex Flat Paint', normalizedProductName: 'boysen latex flat paint 1 gallon white',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1420, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'paint-003', productName: 'Boysen Latex Flat Paint', normalizedProductName: 'boysen latex flat paint 1 gallon white',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1380, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.6,
  },
  {
    id: 'paint-004', productName: 'Boysen Latex Flat Paint', normalizedProductName: 'boysen latex flat paint 1 gallon white',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1299, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.paint, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
  {
    id: 'paint-005', productName: 'Rayco Superfine White Skimcoat 20KG', normalizedProductName: 'rayco skimcoat 20kg',
    category: 'Paint & Coating', brand: 'Rayco', unit: 'bag', variant: 'Superfine White', size: '20 kg',
    price: 520, currency: 'PHP', sourceName: 'Baesa Colors Paint Center', sourceUrl: 'https://baesacolorspaintcenter.com.ph',
    imageUrl: IMG.cement, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.5,
  },
  {
    id: 'paint-006', productName: 'Rayco Premium Skimcoat 1KG', normalizedProductName: 'rayco skimcoat 1kg',
    category: 'Paint & Coating', brand: 'Rayco', unit: 'bag', variant: 'Premium', size: '1 kg',
    price: 60, currency: 'PHP', sourceName: 'Baesa Colors Paint Center', sourceUrl: 'https://baesacolorspaintcenter.com.ph',
    imageUrl: IMG.cement, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.5,
  },
  {
    id: 'paint-007', productName: 'Boysen Permacoat Latex Paint', normalizedProductName: 'boysen permacoat latex white 1 gallon',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1480, currency: 'PHP', sourceName: 'CitiHardware', sourceUrl: 'https://citihardware.com',
    imageUrl: IMG.paint, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-19', trustRating: 4.6,
  },
  {
    id: 'paint-008', productName: 'Davies Titanium Paint Flat Latex', normalizedProductName: 'davies titanium flat latex 1 gallon',
    category: 'Paint & Coating', brand: 'Davies', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1650, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'paint-009', productName: 'Boysen Acrytex Primer', normalizedProductName: 'boysen acrytex primer 1 gallon',
    category: 'Paint & Coating', brand: 'Boysen', unit: 'gallon', variant: 'Gray', size: '1 gallon',
    price: 980, currency: 'PHP', sourceName: 'Hardware Zone PH', sourceUrl: 'https://hardwarezoneph.com',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-15', trustRating: 4.3,
  },
  {
    id: 'paint-010', productName: 'Nippon Paint Weatherbond Flex', normalizedProductName: 'nippon weatherbond flex 1 gallon white',
    category: 'Paint & Coating', brand: 'Nippon', unit: 'gallon', variant: 'White', size: '1 gallon',
    price: 1750, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.paint, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },

  // ─── CEMENT & CONCRETE ──────────────────────────────────────────────────────

  {
    id: 'cement-001', productName: 'Portland Cement Type 1 (Holcim)', normalizedProductName: 'portland cement type 1 40kg bag',
    category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', variant: 'Type 1', size: '40 kg',
    price: 285, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.cement, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.8,
  },
  {
    id: 'cement-002', productName: 'Portland Cement Type 1 (Holcim)', normalizedProductName: 'portland cement type 1 40kg bag',
    category: 'Cement & Concrete', brand: 'Holcim', unit: 'bag', variant: 'Type 1', size: '40 kg',
    price: 295, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.cement, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'cement-003', productName: 'Portland Cement Type 1 (Holcim)', normalizedProductName: 'portland cement type 1 40kg bag',
    category: 'Cement & Concrete', brand: 'Republic Cement', unit: 'bag', variant: 'Type 1', size: '40 kg',
    price: 278, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.cement, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'cement-004', productName: 'ABC Tile Adhesive Heavy Duty', normalizedProductName: 'abc tile adhesive heavy duty 25kg',
    category: 'Cement & Concrete', brand: 'ABC', unit: 'bag', variant: 'Heavy Duty', size: '25 kg',
    price: 495, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.adhesive, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },
  {
    id: 'cement-005', productName: 'ABC Tile Adhesive Heavy Duty', normalizedProductName: 'abc tile adhesive heavy duty 25kg',
    category: 'Cement & Concrete', brand: 'ABC', unit: 'bag', variant: 'Heavy Duty', size: '25 kg',
    price: 520, currency: 'PHP', sourceName: 'CitiHardware', sourceUrl: 'https://citihardware.com',
    imageUrl: IMG.adhesive, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-19', trustRating: 4.6,
  },
  {
    id: 'cement-006', productName: 'Mapei Kerabond Tile Adhesive', normalizedProductName: 'mapei kerabond tile adhesive 25kg',
    category: 'Cement & Concrete', brand: 'Mapei', unit: 'bag', variant: 'Standard', size: '25 kg',
    price: 750, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.adhesive, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },

  // ─── TILES & STONE ──────────────────────────────────────────────────────────

  {
    id: 'tiles-001', productName: 'Ceramic Floor Tiles 60x60', normalizedProductName: 'ceramic floor tiles 60x60 glossy white',
    category: 'Tiles & Stone', brand: 'Emser', unit: 'box', variant: 'Glossy White', size: '60x60cm',
    price: 2400, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.tiles, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'tiles-002', productName: 'Ceramic Floor Tiles 60x60', normalizedProductName: 'ceramic floor tiles 60x60 glossy white',
    category: 'Tiles & Stone', brand: 'Porcelanosa', unit: 'box', variant: 'Glossy White', size: '60x60cm',
    price: 3200, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.tiles, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'tiles-003', productName: 'Ceramic Floor Tiles 60x60', normalizedProductName: 'ceramic floor tiles 60x60 glossy white',
    category: 'Tiles & Stone', brand: 'Local Brand', unit: 'box', variant: 'High Gloss', size: '60x60cm',
    price: 1850, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.tiles, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
  {
    id: 'tiles-004', productName: 'Ceramic Wall Tiles 30x60', normalizedProductName: 'ceramic wall tiles 30x60',
    category: 'Tiles & Stone', brand: 'Cerabati', unit: 'box', variant: 'Matte White', size: '30x60cm',
    price: 1450, currency: 'PHP', sourceName: 'CitiHardware', sourceUrl: 'https://citihardware.com',
    imageUrl: IMG.tiles, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.6,
  },

  // ─── MASONRY & BLOCKS ───────────────────────────────────────────────────────

  {
    id: 'chb-001', productName: 'Concrete Hollow Blocks 4"', normalizedProductName: 'concrete hollow blocks 4 inches',
    category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', variant: '4 inch', size: '4"',
    price: 22, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.blocks, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.8,
  },
  {
    id: 'chb-002', productName: 'Concrete Hollow Blocks 4"', normalizedProductName: 'concrete hollow blocks 4 inches',
    category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', variant: '4 inch', size: '4"',
    price: 20, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.blocks, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.7,
  },
  {
    id: 'chb-003', productName: 'Concrete Hollow Blocks 6"', normalizedProductName: 'concrete hollow blocks 6 inches',
    category: 'Masonry & Blocks', brand: 'Local', unit: 'piece', variant: '6 inch', size: '6"',
    price: 30, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.blocks, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },

  // ─── STEEL & STRUCTURAL ─────────────────────────────────────────────────────

  {
    id: 'steel-001', productName: 'Deformed Steel Bar 10mm', normalizedProductName: 'deformed steel bar 10mm 6m',
    category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', variant: '10mm', size: '10mm x 6m',
    price: 580, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.steel, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'steel-002', productName: 'Deformed Steel Bar 10mm', normalizedProductName: 'deformed steel bar 10mm 6m',
    category: 'Steel & Structural', brand: 'Philippine Steel', unit: 'piece', variant: '10mm', size: '10mm x 6m',
    price: 570, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.steel, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },
  {
    id: 'steel-003', productName: 'Deformed Steel Bar 12mm', normalizedProductName: 'deformed steel bar 12mm 6m',
    category: 'Steel & Structural', brand: 'Ste-Steel', unit: 'piece', variant: '12mm', size: '12mm x 6m',
    price: 825, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.steel, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'steel-004', productName: 'C-Purlins 2x4x12mm', normalizedProductName: 'c purlins 2x4x12mm',
    category: 'Steel & Structural', brand: 'BI', unit: 'piece', variant: '2x4x12mm', size: '2"x4"x12ft',
    price: 555, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.steel, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },
  {
    id: 'steel-005', productName: 'Angle Bar 1-1/2" x 1-1/2" x 3mm', normalizedProductName: 'angle bar 1.5 inch 3mm',
    category: 'Steel & Structural', brand: 'Local', unit: 'piece', variant: '3mm thick', size: '1.5"x1.5"x20ft',
    price: 720, currency: 'PHP', sourceName: 'Cebu Home Builders', sourceUrl: 'https://cebuhomebuilders.com',
    imageUrl: IMG.steel, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },

  // ─── WOOD & LUMBER ──────────────────────────────────────────────────────────

  {
    id: 'plywood-001', productName: 'Marine Plywood 18mm', normalizedProductName: 'marine plywood 4x8 18mm',
    category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', variant: '18mm Marine Grade', size: '4\'x8\'',
    price: 3800, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.plywood, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.8,
  },
  {
    id: 'plywood-002', productName: 'Marine Plywood 18mm', normalizedProductName: 'marine plywood 4x8 18mm',
    category: 'Wood & Lumber', brand: 'Hap Seng', unit: 'sheet', variant: '18mm Marine Grade', size: '4\'x8\'',
    price: 3950, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.plywood, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.6,
  },
  {
    id: 'plywood-003', productName: 'Marine Plywood 18mm', normalizedProductName: 'marine plywood 4x8 18mm',
    category: 'Wood & Lumber', brand: 'Local', unit: 'sheet', variant: '18mm Marine Grade', size: '4\'x8\'',
    price: 3650, currency: 'PHP', sourceName: 'Cebu Home Builders', sourceUrl: 'https://cebuhomebuilders.com',
    imageUrl: IMG.plywood, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },
  {
    id: 'wood-001', productName: 'Wood Framing Lumber 2x4', normalizedProductName: 'wood framing lumber 2x4 8 feet',
    category: 'Wood & Lumber', brand: 'Local Lumber', unit: 'piece', variant: '2"x4"', size: '8ft',
    price: 285, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.plywood, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.5,
  },

  // ─── ROOFING & CLADDING ─────────────────────────────────────────────────────

  {
    id: 'roofing-001', productName: 'Galvanized Corrugated Sheet Gauge 20', normalizedProductName: 'galvanized corrugated sheet 10ft gauge 20',
    category: 'Roofing & Cladding', brand: 'Dongkuk', unit: 'sheet', variant: 'Gauge 20', size: '10ft',
    price: 1450, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.roofing, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'roofing-002', productName: 'Galvanized Corrugated Sheet Gauge 20', normalizedProductName: 'galvanized corrugated sheet 10ft gauge 20',
    category: 'Roofing & Cladding', brand: 'Local', unit: 'sheet', variant: 'Gauge 20', size: '10ft',
    price: 1325, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.roofing, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'roofing-003', productName: 'Spandrel Panel (Colored)', normalizedProductName: 'spandrel panel colored 8ft',
    category: 'Roofing & Cladding', brand: 'Local', unit: 'piece', variant: 'Colored', size: '8ft',
    price: 480, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.roofing, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },

  // ─── PLUMBING ───────────────────────────────────────────────────────────────

  {
    id: 'pvc-001', productName: 'PVC Pipe 1/2" Class C', normalizedProductName: 'pvc pipe 1/2 inch class c 4m',
    category: 'Plumbing', brand: 'Neltex', unit: 'piece', variant: 'Class C', size: '1/2"x4m',
    price: 380, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.pipe, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'pvc-002', productName: 'PVC Pipe 1/2" Class C', normalizedProductName: 'pvc pipe 1/2 inch class c 4m',
    category: 'Plumbing', brand: 'Amaquest', unit: 'piece', variant: 'Class B', size: '1/2"x4m',
    price: 320, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.pipe, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.6,
  },
  {
    id: 'pvc-003', productName: 'PVC Pipe 1" Class C', normalizedProductName: 'pvc pipe 1 inch class c 4m',
    category: 'Plumbing', brand: 'Neltex', unit: 'piece', variant: 'Class C', size: '1"x4m',
    price: 680, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.pipe, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.7,
  },
  {
    id: 'faucet-001', productName: 'Rosco Top Mount Brass Kitchen Faucet', normalizedProductName: 'rosco brass kitchen faucet',
    category: 'Plumbing', brand: 'Rosco', unit: 'piece', variant: 'Chrome', size: 'Standard',
    price: 819, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.faucet, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'faucet-002', productName: 'Rosco Top Mount Brass Kitchen Faucet', normalizedProductName: 'rosco brass kitchen faucet',
    category: 'Plumbing', brand: 'Rosco', unit: 'piece', variant: 'Chrome', size: 'Standard',
    price: 850, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.faucet, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'faucet-003', productName: 'Rosco Top Mount Brass Kitchen Faucet', normalizedProductName: 'rosco brass kitchen faucet',
    category: 'Plumbing', brand: 'Rosco', unit: 'piece', variant: 'Chrome', size: 'Standard',
    price: 899, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.faucet, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-19', trustRating: 4.7,
  },
  {
    id: 'shower-001', productName: 'Panasonic Electric Home Shower DH-3JP2', normalizedProductName: 'panasonic electric shower dh-3jp2',
    category: 'Plumbing', brand: 'Panasonic', unit: 'piece', variant: 'White', size: 'Standard',
    price: 13499, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.waterheater, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'shower-002', productName: 'Panasonic Electric Home Shower DH-3JP2', normalizedProductName: 'panasonic electric shower dh-3jp2',
    category: 'Plumbing', brand: 'Panasonic', unit: 'piece', variant: 'White', size: 'Standard',
    price: 12999, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.waterheater, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
  {
    id: 'tank-001', productName: 'Bestank Polyethylene Water Tank 300L', normalizedProductName: 'bestank water tank 300 liters vertical',
    category: 'Plumbing', brand: 'Bestank', unit: 'piece', variant: 'Vertical', size: '300L',
    price: 6200, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.tank, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },
  {
    id: 'tank-002', productName: 'Bestank Polyethylene Water Tank 300L', normalizedProductName: 'bestank water tank 300 liters vertical',
    category: 'Plumbing', brand: 'Bestank', unit: 'piece', variant: 'Vertical', size: '300L',
    price: 6500, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.tank, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },

  // ─── ELECTRICAL ─────────────────────────────────────────────────────────────

  {
    id: 'wire-001', productName: 'Electrical Wire 2.5mm THW 100m', normalizedProductName: 'electrical wire 2.5mm thw 100m',
    category: 'Electrical', brand: 'Magellan', unit: 'roll', variant: '2.5mm THW', size: '100m',
    price: 2800, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.wire, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.8,
  },
  {
    id: 'wire-002', productName: 'Electrical Wire 2.5mm THW 100m', normalizedProductName: 'electrical wire 2.5mm thw 100m',
    category: 'Electrical', brand: 'Omega', unit: 'roll', variant: '2.5mm THW', size: '100m',
    price: 2650, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.wire, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
  {
    id: 'wire-003', productName: 'Electrical Wire 2.5mm THW 100m', normalizedProductName: 'electrical wire 2.5mm thw 100m',
    category: 'Electrical', brand: 'Magellan', unit: 'roll', variant: '2.5mm THW', size: '100m',
    price: 2720, currency: 'PHP', sourceName: 'Meiji Electric PH', sourceUrl: 'https://meijielectric.ph',
    imageUrl: IMG.wire, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'breaker-001', productName: 'Circuit Breaker 2-Pole C45N', normalizedProductName: 'circuit breaker 2 pole c45n',
    category: 'Electrical', brand: 'Meiji', unit: 'piece', variant: '2-Pole', size: '1–32A',
    price: 259, currency: 'PHP', sourceName: 'Meiji Electric PH', sourceUrl: 'https://meijielectric.ph',
    imageUrl: IMG.breaker, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'breaker-002', productName: 'Circuit Breaker 2-Pole C45N', normalizedProductName: 'circuit breaker 2 pole c45n',
    category: 'Electrical', brand: 'Schneider', unit: 'piece', variant: '2-Pole', size: '15A',
    price: 295, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.breaker, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'breaker-003', productName: 'Circuit Breaker 2-Pole C45N', normalizedProductName: 'circuit breaker 2 pole c45n',
    category: 'Electrical', brand: 'ABB', unit: 'piece', variant: '2-Pole', size: '20A',
    price: 420, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.breaker, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'avr-001', productName: 'Meiji AVR SVC-500 500W', normalizedProductName: 'meiji avr svc 500 500w voltage regulator',
    category: 'Electrical', brand: 'Meiji', unit: 'piece', variant: '500W', size: 'Standard',
    price: 2499, currency: 'PHP', sourceName: 'Meiji Electric PH', sourceUrl: 'https://meijielectric.ph',
    imageUrl: IMG.avr, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'avr-002', productName: 'Meiji AVR SVC-500 500W', normalizedProductName: 'meiji avr svc 500 500w voltage regulator',
    category: 'Electrical', brand: 'Meiji', unit: 'piece', variant: '500W', size: 'Standard',
    price: 2350, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.avr, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
  {
    id: 'outlet-001', productName: 'CAT6 Data Outlet MCS-0523A', normalizedProductName: 'cat6 data outlet wall plate',
    category: 'Electrical', brand: 'Meiji', unit: 'piece', variant: 'CAT6', size: 'Standard',
    price: 189, currency: 'PHP', sourceName: 'Meiji Electric PH', sourceUrl: 'https://meijielectric.ph',
    imageUrl: IMG.network, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.7,
  },
  {
    id: 'outlet-002', productName: 'CAT6 Data Outlet MCS-0523A', normalizedProductName: 'cat6 data outlet wall plate',
    category: 'Electrical', brand: 'Meiji', unit: 'piece', variant: 'CAT6', size: 'Standard',
    price: 210, currency: 'PHP', sourceName: 'Hardware Zone PH', sourceUrl: 'https://hardwarezoneph.com',
    imageUrl: IMG.network, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-15', trustRating: 4.3,
  },

  // ─── TOOLS & EQUIPMENT ──────────────────────────────────────────────────────

  {
    id: 'ag-001', productName: 'Bosch GWS 700 Angle Grinder 4" 710W', normalizedProductName: 'bosch gws700 angle grinder 4 inch 710w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '710W', size: '4"',
    price: 1815, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'ag-002', productName: 'Bosch GWS 700 Angle Grinder 4" 710W', normalizedProductName: 'bosch gws700 angle grinder 4 inch 710w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '710W', size: '4"',
    price: 1980, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'ag-003', productName: 'Bosch GWS 700 Angle Grinder 4" 710W', normalizedProductName: 'bosch gws700 angle grinder 4 inch 710w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '710W', size: '4"',
    price: 1850, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'ag-004', productName: 'Makita 9556HN Angle Grinder 4" 840W', normalizedProductName: 'makita 9556hn angle grinder 4 inch 840w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '840W', size: '4"',
    price: 4250, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'ag-005', productName: 'Makita 9556HN Angle Grinder 4" 840W', normalizedProductName: 'makita 9556hn angle grinder 4 inch 840w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '840W', size: '4"',
    price: 4490, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'ag-006', productName: 'Makita 9556HN Angle Grinder 4" 840W', normalizedProductName: 'makita 9556hn angle grinder 4 inch 840w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '840W', size: '4"',
    price: 4180, currency: 'PHP', sourceName: 'Topmost Hardware', sourceUrl: 'https://www.topmosthardware.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-14', trustRating: 4.3,
  },
  {
    id: 'drill-001', productName: 'Dewalt DCD805M2T 18V/20V Cordless Hammer Drill', normalizedProductName: 'dewalt dcd805 cordless hammer drill 20v',
    category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', variant: '20V Max', size: 'Standard',
    price: 13200, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'drill-002', productName: 'Dewalt DCD805M2T 18V/20V Cordless Hammer Drill', normalizedProductName: 'dewalt dcd805 cordless hammer drill 20v',
    category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', variant: '20V Max', size: 'Standard',
    price: 13950, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'drill-003', productName: 'Bosch GSB 13 RE Rotary Hammer Drill 600W', normalizedProductName: 'bosch gsb 13 re rotary hammer drill 600w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '600W', size: '13mm',
    price: 3450, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'drill-004', productName: 'Bosch GSB 13 RE Rotary Hammer Drill 600W', normalizedProductName: 'bosch gsb 13 re rotary hammer drill 600w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '600W', size: '13mm',
    price: 3680, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-19', trustRating: 4.7,
  },
  {
    id: 'drill-005', productName: 'Makita HP1631 Rotary Hammer Drill 16mm 710W', normalizedProductName: 'makita hp1631 rotary hammer drill 710w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '710W', size: '16mm',
    price: 5200, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'drill-006', productName: 'Makita HP1631 Rotary Hammer Drill 16mm 710W', normalizedProductName: 'makita hp1631 rotary hammer drill 710w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '710W', size: '16mm',
    price: 5450, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.drill, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.6,
  },
  {
    id: 'saw-001', productName: 'Makita 5007N Circular Saw 7-1/4" 1800W', normalizedProductName: 'makita 5007n circular saw 7.25 inch 1800w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '1800W', size: '7-1/4"',
    price: 6800, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.saw, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'saw-002', productName: 'Makita 5007N Circular Saw 7-1/4" 1800W', normalizedProductName: 'makita 5007n circular saw 7.25 inch 1800w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '1800W', size: '7-1/4"',
    price: 7200, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.saw, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'saw-003', productName: 'Bosch GKS 185 Li Cordless Circular Saw', normalizedProductName: 'bosch gks 185 li cordless circular saw',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: 'Cordless', size: '7-1/4"',
    price: 9500, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.saw, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'jigsaw-001', productName: 'Bosch PST 700 E Jig Saw 500W', normalizedProductName: 'bosch pst700e jig saw 500w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '500W', size: 'Standard',
    price: 3150, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.saw, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'jigsaw-002', productName: 'Bosch PST 700 E Jig Saw 500W', normalizedProductName: 'bosch pst700e jig saw 500w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '500W', size: 'Standard',
    price: 3380, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.saw, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'sander-001', productName: 'Makita BO3711 Random Orbit Sander 160W', normalizedProductName: 'makita bo3711 orbital sander 160w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '160W', size: 'Standard',
    price: 2950, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'sander-002', productName: 'Makita BO3711 Random Orbit Sander 160W', normalizedProductName: 'makita bo3711 orbital sander 160w',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '160W', size: 'Standard',
    price: 3100, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'router-001', productName: 'Bosch POF 1200 AE Router 1200W', normalizedProductName: 'bosch pof1200ae router 1200w',
    category: 'Tools & Equipment', brand: 'Bosch', unit: 'piece', variant: '1200W', size: 'Standard',
    price: 8200, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'welding-001', productName: 'Lincoln Electric Handy MIG Welder 115V', normalizedProductName: 'lincoln electric mig welder 115v',
    category: 'Tools & Equipment', brand: 'Lincoln Electric', unit: 'piece', variant: '115V', size: 'Standard',
    price: 18500, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'compressor-001', productName: 'Makita MAC2400 Air Compressor 2.5HP', normalizedProductName: 'makita mac2400 air compressor 2.5hp',
    category: 'Tools & Equipment', brand: 'Makita', unit: 'piece', variant: '2.5HP', size: '4.2 Gal',
    price: 24500, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'nailergun-001', productName: 'Dewalt DWFP12231 Brad Nailer 18-Gauge', normalizedProductName: 'dewalt brad nailer 18 gauge pneumatic',
    category: 'Tools & Equipment', brand: 'Dewalt', unit: 'piece', variant: '18-Gauge', size: 'Standard',
    price: 7800, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.powertools, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'hammer-001', productName: 'Stanley 16oz Claw Hammer', normalizedProductName: 'stanley claw hammer 16oz',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '16oz', size: 'Standard',
    price: 680, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.hammer, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'hammer-002', productName: 'Stanley 16oz Claw Hammer', normalizedProductName: 'stanley claw hammer 16oz',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '16oz', size: 'Standard',
    price: 620, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.hammer, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'hammer-003', productName: 'Stanley 16oz Claw Hammer', normalizedProductName: 'stanley claw hammer 16oz',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '16oz', size: 'Standard',
    price: 650, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.hammer, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'screwdriver-001', productName: 'Stanley Ratcheting Screwdriver Set 6pc', normalizedProductName: 'stanley ratcheting screwdriver set 6 piece',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', variant: '6-piece', size: 'Standard',
    price: 850, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.screwdriver, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'screwdriver-002', productName: 'Stanley Ratcheting Screwdriver Set 6pc', normalizedProductName: 'stanley ratcheting screwdriver set 6 piece',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', variant: '6-piece', size: 'Standard',
    price: 790, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.screwdriver, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'wrench-001', productName: 'Lotus Wire Stripper 6" LTHT600WSX', normalizedProductName: 'lotus wire stripper 6 inch',
    category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', variant: '6"', size: 'Standard',
    price: 180, currency: 'PHP', sourceName: 'Mackun Hardware', sourceUrl: 'https://mackunhardware.com',
    imageUrl: IMG.wrench, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },
  {
    id: 'wrench-002', productName: 'Lotus Wire Stripper 6" LTHT600WSX', normalizedProductName: 'lotus wire stripper 6 inch',
    category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', variant: '6"', size: 'Standard',
    price: 199, currency: 'PHP', sourceName: 'Hardware Zone PH', sourceUrl: 'https://hardwarezoneph.com',
    imageUrl: IMG.wrench, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-15', trustRating: 4.3,
  },
  {
    id: 'wrench-003', productName: 'Snap-on 3/8" Drive Ratchet', normalizedProductName: 'snap-on 3/8 drive ratchet wrench',
    category: 'Tools & Equipment', brand: 'Snap-on', unit: 'piece', variant: '3/8"', size: 'Standard',
    price: 4200, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.wrench, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'wrench-004', productName: 'Stanley Combination Wrench Set 8pcs', normalizedProductName: 'stanley combination wrench set 8 piece',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', variant: '8-piece', size: '8-19mm',
    price: 1450, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.wrench, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'wrench-005', productName: 'Stanley Combination Wrench Set 8pcs', normalizedProductName: 'stanley combination wrench set 8 piece',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'set', variant: '8-piece', size: '8-19mm',
    price: 1380, currency: 'PHP', sourceName: 'Felco Store', sourceUrl: 'https://www.felcostore.ph',
    imageUrl: IMG.wrench, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.5,
  },
  {
    id: 'tape-001', productName: 'Lotus Steel Tape 5M', normalizedProductName: 'lotus steel tape measure 5m',
    category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', variant: '5M', size: '5M',
    price: 115, currency: 'PHP', sourceName: 'Mackun Hardware', sourceUrl: 'https://mackunhardware.com',
    imageUrl: IMG.tape, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },
  {
    id: 'tape-002', productName: 'Lotus Steel Tape 5M', normalizedProductName: 'lotus steel tape measure 5m',
    category: 'Tools & Equipment', brand: 'Lotus', unit: 'piece', variant: '5M', size: '5M',
    price: 130, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.tape, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'tape-003', productName: 'Stanley 5M Tape Measure FatMax', normalizedProductName: 'stanley 5m tape measure fatmax',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: 'FatMax', size: '5M',
    price: 480, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.tape, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'level-001', productName: 'Stanley Box Beam Level 24"', normalizedProductName: 'stanley box beam level 24 inch',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '24"', size: '24"',
    price: 680, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.level, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'level-002', productName: 'Stanley Box Beam Level 24"', normalizedProductName: 'stanley box beam level 24 inch',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '24"', size: '24"',
    price: 620, currency: 'PHP', sourceName: 'Hardware Zone PH', sourceUrl: 'https://hardwarezoneph.com',
    imageUrl: IMG.level, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-15', trustRating: 4.3,
  },
  {
    id: 'ladder-001', productName: 'Fujimoto Aluminum Stepladder 4-Step', normalizedProductName: 'fujimoto aluminum stepladder 4 step',
    category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', variant: '4-Step', size: '4 ft',
    price: 2200, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.ladder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'ladder-002', productName: 'Fujimoto Aluminum Stepladder 4-Step', normalizedProductName: 'fujimoto aluminum stepladder 4 step',
    category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', variant: '4-Step', size: '4 ft',
    price: 2050, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.ladder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'ladder-003', productName: 'Fujimoto Aluminum Stepladder 4-Step', normalizedProductName: 'fujimoto aluminum stepladder 4 step',
    category: 'Tools & Equipment', brand: 'Fujimoto', unit: 'piece', variant: '4-Step', size: '4 ft',
    price: 2150, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.ladder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'wheelbarrow-001', productName: 'Garant 6 Cu Ft Wheelbarrow', normalizedProductName: 'garant 6 cubic feet wheelbarrow',
    category: 'Tools & Equipment', brand: 'Garant', unit: 'piece', variant: '6 cu ft', size: 'Standard',
    price: 3500, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.wheelbarrow, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'wheelbarrow-002', productName: 'Garant 6 Cu Ft Wheelbarrow', normalizedProductName: 'garant 6 cubic feet wheelbarrow',
    category: 'Tools & Equipment', brand: 'Garant', unit: 'piece', variant: '6 cu ft', size: 'Standard',
    price: 3250, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.wheelbarrow, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'toolbox-001', productName: 'Stanley 19" Metal Toolbox', normalizedProductName: 'stanley 19 inch metal toolbox',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '19"', size: '19"',
    price: 1850, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.handtool, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'toolbox-002', productName: 'Stanley 19" Metal Toolbox', normalizedProductName: 'stanley 19 inch metal toolbox',
    category: 'Tools & Equipment', brand: 'Stanley', unit: 'piece', variant: '19"', size: '19"',
    price: 1690, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.handtool, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'paintroller-001', productName: 'Corona Paint Roller Set 9" 3pc', normalizedProductName: 'corona paint roller set 9 inch 3pc',
    category: 'Tools & Equipment', brand: 'Corona', unit: 'set', variant: '9"', size: '3-piece',
    price: 450, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.paintbrush, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'paintroller-002', productName: 'Corona Paint Roller Set 9" 3pc', normalizedProductName: 'corona paint roller set 9 inch 3pc',
    category: 'Tools & Equipment', brand: 'Corona', unit: 'set', variant: '9"', size: '3-piece',
    price: 390, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.paintbrush, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'paintbrush-001', productName: 'Purdy 3" Nylon/Polyester Brush', normalizedProductName: 'purdy 3 inch nylon polyester paint brush',
    category: 'Tools & Equipment', brand: 'Purdy', unit: 'piece', variant: '3"', size: '3"',
    price: 580, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.paintbrush, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },

  // ─── SAFETY EQUIPMENT ───────────────────────────────────────────────────────

  {
    id: 'helmet-001', productName: 'MSA V-Gard Hard Hat', normalizedProductName: 'msa v-gard hard hat safety helmet',
    category: 'Safety Equipment', brand: 'MSA', unit: 'piece', variant: 'White', size: 'One Size',
    price: 850, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'helmet-002', productName: 'MSA V-Gard Hard Hat', normalizedProductName: 'msa v-gard hard hat safety helmet',
    category: 'Safety Equipment', brand: 'MSA', unit: 'piece', variant: 'Yellow', size: 'One Size',
    price: 780, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'helmet-003', productName: 'MSA V-Gard Hard Hat', normalizedProductName: 'msa v-gard hard hat safety helmet',
    category: 'Safety Equipment', brand: 'MSA', unit: 'piece', variant: 'White', size: 'One Size',
    price: 820, currency: 'PHP', sourceName: 'Topmost Hardware', sourceUrl: 'https://www.topmosthardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-14', trustRating: 4.3,
  },
  {
    id: 'gloves-001', productName: 'Mechanix Wear M-Pact Gloves', normalizedProductName: 'mechanix wear m-pact work gloves',
    category: 'Safety Equipment', brand: 'Mechanix Wear', unit: 'pair', variant: 'Black', size: 'M/L/XL',
    price: 1250, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'gloves-002', productName: 'Mechanix Wear M-Pact Gloves', normalizedProductName: 'mechanix wear m-pact work gloves',
    category: 'Safety Equipment', brand: 'Mechanix Wear', unit: 'pair', variant: 'Black', size: 'M/L/XL',
    price: 1100, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'goggles-001', productName: '3M Safety Goggles Virtua', normalizedProductName: '3m virtua safety goggles clear',
    category: 'Safety Equipment', brand: '3M', unit: 'piece', variant: 'Clear', size: 'One Size',
    price: 320, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'goggles-002', productName: '3M Safety Goggles Virtua', normalizedProductName: '3m virtua safety goggles clear',
    category: 'Safety Equipment', brand: '3M', unit: 'piece', variant: 'Clear', size: 'One Size',
    price: 280, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'boots-001', productName: 'Caterpillar Second Shift Steel Toe Boot', normalizedProductName: 'caterpillar steel toe safety boot',
    category: 'Safety Equipment', brand: 'Caterpillar', unit: 'pair', variant: 'Brown', size: '7-12',
    price: 4800, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'boots-002', productName: 'Caterpillar Second Shift Steel Toe Boot', normalizedProductName: 'caterpillar steel toe safety boot',
    category: 'Safety Equipment', brand: 'Caterpillar', unit: 'pair', variant: 'Brown', size: '7-12',
    price: 4500, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'vest-001', productName: 'Ergodyne Glowear 8006 Safety Vest', normalizedProductName: 'ergodyne safety vest high vis orange',
    category: 'Safety Equipment', brand: 'Ergodyne', unit: 'piece', variant: 'Orange', size: 'One Size',
    price: 480, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'vest-002', productName: 'Ergodyne Glowear 8006 Safety Vest', normalizedProductName: 'ergodyne safety vest high vis orange',
    category: 'Safety Equipment', brand: 'Ergodyne', unit: 'piece', variant: 'Orange', size: 'One Size',
    price: 420, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'mask-001', productName: '3M N95 Respirator 8210', normalizedProductName: '3m n95 respirator mask 8210',
    category: 'Safety Equipment', brand: '3M', unit: 'piece', variant: 'N95', size: 'One Size',
    price: 120, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.safety, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'mask-002', productName: '3M N95 Respirator 8210', normalizedProductName: '3m n95 respirator mask 8210',
    category: 'Safety Equipment', brand: '3M', unit: 'piece', variant: 'N95', size: 'One Size',
    price: 99, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.safety, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },

  // ─── HARDWARE & FASTENERS ───────────────────────────────────────────────────

  {
    id: 'padlock-001', productName: 'Yale 60mm Hardened Brass Padlock', normalizedProductName: 'yale 60mm hardened brass padlock',
    category: 'Hardware', brand: 'Yale', unit: 'piece', variant: '60mm', size: '60mm',
    price: 4199, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.padlock, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'padlock-002', productName: 'Yale 60mm Hardened Brass Padlock', normalizedProductName: 'yale 60mm hardened brass padlock',
    category: 'Hardware', brand: 'Yale', unit: 'piece', variant: '60mm', size: '60mm',
    price: 3950, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.padlock, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'padlock-003', productName: 'Yale 60mm Hardened Brass Padlock', normalizedProductName: 'yale 60mm hardened brass padlock',
    category: 'Hardware', brand: 'Yale', unit: 'piece', variant: '60mm', size: '60mm',
    price: 4050, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.padlock, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-19', trustRating: 4.7,
  },
  {
    id: 'nails-001', productName: 'Steel Nails Assorted 1kg', normalizedProductName: 'steel nails assorted 1kg',
    category: 'Hardware', brand: 'Xtreme', unit: 'kg', variant: 'Mixed', size: '1 kg',
    price: 95, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.nails, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'nails-002', productName: 'Steel Nails Assorted 1kg', normalizedProductName: 'steel nails assorted 1kg',
    category: 'Hardware', brand: 'Xtreme', unit: 'kg', variant: 'Mixed', size: '1 kg',
    price: 85, currency: 'PHP', sourceName: 'Cebu Home Builders', sourceUrl: 'https://cebuhomebuilders.com',
    imageUrl: IMG.nails, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },
  {
    id: 'nails-003', productName: 'Steel Nails Assorted 1kg', normalizedProductName: 'steel nails assorted 1kg',
    category: 'Hardware', brand: 'Local', unit: 'kg', variant: 'Mixed', size: '1 kg',
    price: 79, currency: 'PHP', sourceName: 'Shoppable PH', sourceUrl: 'https://business.shoppable.ph',
    imageUrl: IMG.nails, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-14', trustRating: 4.2,
  },
  {
    id: 'screw-001', productName: 'Elco Hex Washer Head Screw #10 1lb', normalizedProductName: 'elco hex washer head screw no10 1lb',
    category: 'Hardware', brand: 'Elco', unit: 'pack', variant: '#10 x 3"', size: '1 lb',
    price: 310, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.nails, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },

  // ─── DOORS & WINDOWS ────────────────────────────────────────────────────────

  {
    id: 'door-001', productName: 'Flush Door 30"x80" Hollow Core', normalizedProductName: 'flush door 30 inch 80 inch hollow core',
    category: 'Doors & Windows', brand: 'Wilcon', unit: 'piece', variant: 'Hollow Core', size: '30"x80"',
    price: 2200, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.door, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'door-002', productName: 'Flush Door 30"x80" Hollow Core', normalizedProductName: 'flush door 30 inch 80 inch hollow core',
    category: 'Doors & Windows', brand: 'Local', unit: 'piece', variant: 'Hollow Core', size: '30"x80"',
    price: 1950, currency: 'PHP', sourceName: 'Cebu Home Builders', sourceUrl: 'https://cebuhomebuilders.com',
    imageUrl: IMG.door, location: 'Cebu', availability: 'in_stock', lastUpdated: '2025-03-16', trustRating: 4.4,
  },
  {
    id: 'window-001', productName: 'Aluminum Sliding Window 4\'x4\'', normalizedProductName: 'aluminum sliding window 4x4 feet',
    category: 'Doors & Windows', brand: 'Almet', unit: 'piece', variant: 'Anodized', size: '4\'x4\'',
    price: 8500, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.door, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'window-002', productName: 'Aluminum Sliding Window 4\'x4\'', normalizedProductName: 'aluminum sliding window 4x4 feet',
    category: 'Doors & Windows', brand: 'Almet', unit: 'piece', variant: 'Anodized', size: '4\'x4\'',
    price: 8200, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.door, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.6,
  },

  // ─── WALL & CEILING ─────────────────────────────────────────────────────────

  {
    id: 'gypsum-001', productName: 'Knauf Gypsum Board 4\'x8\'', normalizedProductName: 'knauf gypsum board 4x8 5/8 inch',
    category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', variant: '5/8" Regular', size: '4\'x8\'',
    price: 680, currency: 'PHP', sourceName: 'AllHome', sourceUrl: 'https://corporate.allhome.com.ph',
    imageUrl: IMG.gypsum, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'gypsum-002', productName: 'Knauf Gypsum Board 4\'x8\'', normalizedProductName: 'knauf gypsum board 4x8 5/8 inch',
    category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', variant: '5/8" Regular', size: '4\'x8\'',
    price: 720, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.gypsum, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'gypsum-003', productName: 'Knauf Gypsum Board 4\'x8\'', normalizedProductName: 'knauf gypsum board 4x8 5/8 inch',
    category: 'Wall & Ceiling', brand: 'Knauf', unit: 'sheet', variant: '5/8" Regular', size: '4\'x8\'',
    price: 650, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.gypsum, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },

  // ─── AGGREGATES ─────────────────────────────────────────────────────────────

  {
    id: 'sand-001', productName: 'Fill Sand per Cubic Meter', normalizedProductName: 'fill sand per cubic meter',
    category: 'Aggregates', brand: 'Local', unit: 'cu.m', variant: 'Standard', size: '1 cu.m',
    price: 650, currency: 'PHP', sourceName: 'Wilcon Depot', sourceUrl: 'https://www.wilcon.com.ph',
    imageUrl: IMG.sand, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-20', trustRating: 4.8,
  },
  {
    id: 'sand-002', productName: 'Fill Sand per Cubic Meter', normalizedProductName: 'fill sand per cubic meter',
    category: 'Aggregates', brand: 'Local', unit: 'cu.m', variant: 'Standard', size: '1 cu.m',
    price: 600, currency: 'PHP', sourceName: 'BQ Builderware', sourceUrl: 'https://www.bqbuilderware.com',
    imageUrl: IMG.sand, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-17', trustRating: 4.5,
  },
  {
    id: 'gravel-001', productName: 'Gravel 3/4" per Cubic Meter', normalizedProductName: 'gravel 3/4 inch per cubic meter',
    category: 'Aggregates', brand: 'Local', unit: 'cu.m', variant: '3/4"', size: '1 cu.m',
    price: 750, currency: 'PHP', sourceName: 'CW Home Depot', sourceUrl: 'https://www.cwhomedepot.com',
    imageUrl: IMG.sand, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },

  // ─── ABRASIVES ──────────────────────────────────────────────────────────────

  {
    id: 'sandpaper-001', productName: '3M Sandpaper Assorted 10pc', normalizedProductName: '3m sandpaper assorted pack 10pc',
    category: 'Abrasives', brand: '3M', unit: 'pack', variant: 'Assorted', size: '10-piece',
    price: 280, currency: 'PHP', sourceName: 'Ace Hardware Philippines', sourceUrl: 'https://www.acehardware.ph',
    imageUrl: IMG.handtool, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-21', trustRating: 4.7,
  },
  {
    id: 'sandpaper-002', productName: '3M Sandpaper Assorted 10pc', normalizedProductName: '3m sandpaper assorted pack 10pc',
    category: 'Abrasives', brand: '3M', unit: 'pack', variant: 'Assorted', size: '10-piece',
    price: 240, currency: 'PHP', sourceName: 'MR. DIY Philippines', sourceUrl: 'https://www.mrdiy.com/ph',
    imageUrl: IMG.handtool, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-18', trustRating: 4.4,
  },
  {
    id: 'disccut-001', productName: 'Norton Cutting Disc 4" for Metal', normalizedProductName: 'norton cutting disc 4 inch metal',
    category: 'Abrasives', brand: 'Norton', unit: 'piece', variant: '4"', size: '4"',
    price: 85, currency: 'PHP', sourceName: 'KHM Megatools', sourceUrl: 'https://khmtools.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.6,
  },
  {
    id: 'disccut-002', productName: 'Norton Cutting Disc 4" for Metal', normalizedProductName: 'norton cutting disc 4 inch metal',
    category: 'Abrasives', brand: 'Norton', unit: 'piece', variant: '4"', size: '4"',
    price: 90, currency: 'PHP', sourceName: 'Handyman', sourceUrl: 'https://handyman.com.ph',
    imageUrl: IMG.anglegrinder, location: 'Metro Manila', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.5,
  },
  {
    id: 'disccut-003', productName: 'Norton Cutting Disc 4" for Metal', normalizedProductName: 'norton cutting disc 4 inch metal',
    category: 'Abrasives', brand: 'Norton', unit: 'piece', variant: '4"', size: '4"',
    price: 75, currency: 'PHP', sourceName: 'Shopee Philippines', sourceUrl: 'https://www.shoppable.ph',
    imageUrl: IMG.anglegrinder, location: 'Online', availability: 'in_stock', lastUpdated: '2025-03-22', trustRating: 4.3,
  },
];

export const categories = [
  { id: 'paint', name: 'Paint & Coating', icon: '🎨', count: 10 },
  { id: 'tools', name: 'Tools & Equipment', icon: '🔧', count: 38 },
  { id: 'electrical', name: 'Electrical', icon: '⚡', count: 10 },
  { id: 'safety', name: 'Safety Equipment', icon: '🦺', count: 12 },
  { id: 'plumbing', name: 'Plumbing', icon: '🚿', count: 10 },
  { id: 'steel', name: 'Steel & Structural', icon: '🔩', count: 5 },
  { id: 'cement', name: 'Cement & Concrete', icon: '🏗️', count: 6 },
  { id: 'tiles', name: 'Tiles & Stone', icon: '⬜', count: 4 },
  { id: 'wood', name: 'Wood & Lumber', icon: '🪵', count: 4 },
  { id: 'roofing', name: 'Roofing & Cladding', icon: '🏠', count: 3 },
  { id: 'hardware', name: 'Hardware', icon: '🪛', count: 7 },
  { id: 'masonry', name: 'Masonry & Blocks', icon: '🧱', count: 3 },
  { id: 'doors', name: 'Doors & Windows', icon: '🚪', count: 4 },
  { id: 'wall', name: 'Wall & Ceiling', icon: '🏛️', count: 3 },
  { id: 'aggregates', name: 'Aggregates', icon: '⛰️', count: 3 },
  { id: 'abrasives', name: 'Abrasives', icon: '💎', count: 5 },
];

export const stores = philippineStores.map((s) => s.name);

export const locations = [
  'Metro Manila',
  'Cebu',
  'Davao',
  'Luzon',
  'Visayas',
  'Mindanao',
  'Online',
];
