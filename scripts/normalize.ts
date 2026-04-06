/**
 * Product name normalization layer
 * Ensures same products from different stores can be grouped for comparison
 */

// Unit standardization map
const UNIT_MAP: Record<string, string> = {
  gallons: 'gal', gallon: 'gal', gal: 'gal',
  liters: 'l', liter: 'l', litres: 'l', litre: 'l', lts: 'l',
  kilograms: 'kg', kilogram: 'kg', kgs: 'kg',
  grams: 'g', gram: 'g',
  pounds: 'lb', pound: 'lb', lbs: 'lb',
  meters: 'm', meter: 'm', metres: 'm',
  feet: 'ft', foot: 'ft',
  inches: 'in', inch: 'in',
  pieces: 'pc', piece: 'pc', pcs: 'pc',
  rolls: 'roll',
  sheets: 'sheet',
  boxes: 'box',
  bags: 'bag',
  sets: 'set',
  pairs: 'pair',
};

// Words to remove from product names
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'of', 'with', 'by',
  'per', 'in', 'at', 'to', 'on', 'new', 'sale', 'official',
  'philippine', 'philippines', 'ph', 'price', 'original',
  'free', 'shipping', 'cod', 'available',
]);

/**
 * Normalize a product name for cross-store comparison.
 * Returns a stable, lowercase, punctuation-free string.
 */
export function normalizeProductName(name: string): string {
  let n = name
    .toLowerCase()
    .replace(/[™®©]/g, '')                // remove trademark symbols
    .replace(/[^\w\s./-]/g, ' ')           // keep letters, numbers, dots, slashes, hyphens
    .replace(/\//g, ' ')                   // expand slashes
    .replace(/\./g, ' ')                   // expand dots (e.g. "2.5mm" → "2 5mm")
    .trim();

  // Standardize units
  for (const [from, to] of Object.entries(UNIT_MAP)) {
    n = n.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
  }

  // Remove stopwords
  n = n
    .split(/\s+/)
    .filter((word) => !STOPWORDS.has(word) && word.length > 0)
    .join(' ');

  // Collapse whitespace
  return n.replace(/\s+/g, ' ').trim();
}

/**
 * Generate a stable product key used to group same products across stores.
 * Uses brand + name + size to create a unique signature.
 */
export function generateProductKey(
  name: string,
  brand: string,
  size: string = '',
  unit: string = ''
): string {
  const parts = [brand, name, size, unit]
    .map((s) => normalizeProductName(s))
    .filter(Boolean);
  return parts.join(' ').replace(/\s+/g, '-');
}

/**
 * Check if two product names refer to the same product.
 * Uses token overlap similarity.
 */
export function areSameProduct(nameA: string, nameB: string): boolean {
  const na = normalizeProductName(nameA);
  const nb = normalizeProductName(nameB);

  if (na === nb) return true;

  const tokensA = new Set(na.split(' ').filter((t) => t.length > 2));
  const tokensB = new Set(nb.split(' ').filter((t) => t.length > 2));

  if (tokensA.size === 0 || tokensB.size === 0) return false;

  let overlap = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) overlap++;
  }

  const similarity = overlap / Math.max(tokensA.size, tokensB.size);
  return similarity >= 0.75;
}

/**
 * Infer category from product name when not explicitly provided.
 */
export function inferCategory(name: string): string {
  const lower = name.toLowerCase();

  if (/paint|primer|enamel|latex|skimcoat|putty|varnish|stain|lacquer/.test(lower))
    return 'Paint & Coating';
  if (/cement|concrete|adhesive|grout|mortar|tile adhesive/.test(lower))
    return 'Cement & Concrete';
  if (/tile|ceramic|porcelain|floor tile|wall tile/.test(lower))
    return 'Tiles & Stone';
  if (/steel bar|rebar|purlins|angle bar|c-purlins|gi sheet/.test(lower))
    return 'Steel & Structural';
  if (/plywood|lumber|wood|mdf|hardboard/.test(lower))
    return 'Wood & Lumber';
  if (/roofing|corrugated|spandrel|ga\./.test(lower))
    return 'Roofing & Cladding';
  if (/pvc pipe|faucet|toilet|shower|valve|fitting|water tank|sink|lavatory/.test(lower))
    return 'Plumbing';
  if (/wire|breaker|outlet|switch|conduit|panel|avr|ups|cable|electrical/.test(lower))
    return 'Electrical';
  if (/hollow block|chb|block/.test(lower))
    return 'Masonry & Blocks';
  if (/sand|gravel|aggregate|fill/.test(lower))
    return 'Aggregates';
  if (/drill|grinder|saw|jigsaw|sander|router|wrench|hammer|screwdriver|plier|level|tape|ladder|wheelbarrow|welder|nailer|compressor/.test(lower))
    return 'Tools & Equipment';
  if (/helmet|hard hat|glove|goggles|boots|vest|mask|respirator|harness/.test(lower))
    return 'Safety Equipment';
  if (/door|window|lock|hinge|knob/.test(lower))
    return 'Doors & Windows';
  if (/gypsum|drywall|ceiling|board/.test(lower))
    return 'Wall & Ceiling';
  if (/sandpaper|abrasive|disc|grinding wheel|flap disc/.test(lower))
    return 'Abrasives';

  return 'Hardware';
}

/**
 * Extract brand from product name when brand field is missing.
 */
export function inferBrand(name: string): string {
  const KNOWN_BRANDS = [
    'Bosch', 'Makita', 'Dewalt', 'Stanley', 'Snap-on', 'Milwaukee',
    'Black & Decker', 'Ryobi', 'Hitachi', 'Metabo',
    'Boysen', 'Davies', 'Nippon', 'Sherwin-Williams', 'Jotun',
    'Holcim', 'Republic Cement', 'Lafarge', 'Titan',
    'Mapei', 'Knauf', 'Bostik', 'Sika', 'ABC',
    'Neltex', 'Emerald', 'Onnuri',
    'Meiji', 'Schneider', 'Siemens', 'ABB', 'Panasonic', 'Omron',
    '3M', 'MSA', 'Honeywell', 'Mechanix', 'Caterpillar',
    'Yale', 'Master Lock', 'Abloy',
    'Lotus', 'Krisbow', 'Garant', 'Fujimoto',
    'Bestank', 'Grundfos', 'Rosco', 'San-Ei',
    'Knipex', 'Bahco', 'Gedore', 'Facom',
  ];

  for (const brand of KNOWN_BRANDS) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }

  // Return first word as brand guess
  return name.split(/\s+/)[0] ?? 'Unknown';
}
