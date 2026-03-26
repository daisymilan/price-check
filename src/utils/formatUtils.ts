/**
 * Formatting and display utilities
 */

/**
 * Normalize product name for comparison
 */
export const normalizeProductName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '');
};

/**
 * Format number as Philippine Peso currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format price with symbol
 */
export const formatPriceWithSymbol = (price: number): string => {
  return `₱${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)}`;
};

/**
 * Get absolute URL if relative
 */
export const getImageUrl = (url: string): string => {
  if (url.startsWith('http')) {
    return url;
  }
  return url;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  return date.toLocaleDateString('en-PH');
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Get trust rating badge
 */
export const getTrustRatingBadge = (rating?: number): string => {
  if (!rating) return 'New Store';
  if (rating >= 4.7) return 'Highly Trusted';
  if (rating >= 4.5) return 'Trusted';
  if (rating >= 4.0) return 'Reliable';
  return 'Good';
};

/**
 * Get availability badge text
 */
export const getAvailabilityBadge = (
  availability: 'in_stock' | 'out_of_stock' | 'limited'
): string => {
  switch (availability) {
    case 'in_stock':
      return 'In Stock';
    case 'out_of_stock':
      return 'Out of Stock';
    case 'limited':
      return 'Limited Stock';
    default:
      return 'Unknown';
  }
};

/**
 * Get availability color
 */
export const getAvailabilityColor = (
  availability: 'in_stock' | 'out_of_stock' | 'limited'
): string => {
  switch (availability) {
    case 'in_stock':
      return 'bg-green-50 text-green-700';
    case 'out_of_stock':
      return 'bg-red-50 text-red-700';
    case 'limited':
      return 'bg-yellow-50 text-yellow-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

/**
 * Calculate price difference
 */
export const calculatePriceDifference = (
  price: number,
  cheapestPrice: number
): { amount: number; percentage: number } => {
  const amount = price - cheapestPrice;
  const percentage = (amount / cheapestPrice) * 100;
  return {
    amount: Math.round(amount * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
  };
};

/**
 * Format price difference for display
 */
export const formatPriceDifference = (
  price: number,
  cheapestPrice: number
): string => {
  const diff = calculatePriceDifference(price, cheapestPrice);
  if (diff.amount === 0) return 'Cheapest';
  return `+₱${diff.amount.toFixed(0)} (+${diff.percentage.toFixed(1)}%)`;
};

/**
 * Get location badge
 */
export const getLocationBadge = (location: string): string => {
  if (location === 'Online') return '🌐 Online';
  if (location === 'Metro Manila') return '🏙️ Metro Manila';
  if (location === 'Cebu') return '🏝️ Cebu';
  if (location === 'Davao') return '🏝️ Davao';
  if (location.includes('Luzon')) return '🗺️ Luzon';
  if (location.includes('Visayas')) return '🗺️ Visayas';
  if (location.includes('Mindanao')) return '🗺️ Mindanao';
  return '📍 ' + location;
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'Paint & Coating': '🎨',
    'Cement & Concrete': '🏗️',
    'Tiles & Stone': '⬜',
    'Masonry & Blocks': '🧱',
    'Steel & Structural': '🔩',
    'Wood & Lumber': '🪵',
    'Roofing & Cladding': '🏠',
    Plumbing: '🚿',
    Electrical: '⚡',
    Aggregates: '⛰️',
    'Doors & Windows': '🚪',
    Hardware: '🔧',
  };
  return categoryMap[category] || '📦';
};

/**
 * Sanitize URL to make it clickable
 */
export const ensureHttp = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
};
