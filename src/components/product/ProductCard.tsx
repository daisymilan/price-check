/**
 * Product Card Component — Grid card for search results and listings
 */

import { Heart, ExternalLink, MapPin, Star } from 'lucide-react';
import { ProductPrice } from '../../types';
import { formatPriceWithSymbol, formatDate } from '../../utils/formatUtils';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useAppHooks';

interface ProductCardProps {
  product: ProductPrice;
  isCheapest?: boolean;
  onFavoriteClick?: () => void;
}

export default function ProductCard({
  product,
  isCheapest = false,
  onFavoriteClick,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { isFav, toggleFavorite } = useFavorites();
  const favorited = isFav(product.id);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick();
    } else {
      toggleFavorite(product);
    }
  };

  return (
    <article
      className="product-card group"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* Top-left badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isCheapest && (
            <span className="best-price-badge">★ Pinakamura</span>
          )}
          {product.availability === 'limited' && (
            <span className="badge-yellow" style={{ fontSize: '10px' }}>Limited</span>
          )}
          {product.availability === 'out_of_stock' && (
            <span className="badge-red" style={{ fontSize: '10px' }}>Out of Stock</span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFav}
          className={`absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
            favorited
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:bg-white hover:text-red-500 shadow-sm'
          }`}
          title={favorited ? 'Remove from saved' : 'Save item'}
        >
          <Heart size={13} className={favorited ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {product.productName}
        </h3>

        {/* Variant / Size */}
        {(product.variant || product.size) && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2.5">
            {[product.variant, product.size].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          <p className="price-tag">{formatPriceWithSymbol(product.price)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">per {product.unit}</p>
        </div>

        {/* Divider */}
        <div className="divider mb-3" />

        {/* Store info */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              {product.sourceName}
            </p>
            <p className="flex items-center gap-0.5 mt-0.5" style={{ fontSize: '10px', color: '#94a3b8' }}>
              <MapPin size={9} />
              {product.location}
            </p>
          </div>
          {product.trustRating && (
            <div className="flex items-center gap-0.5 flex-shrink-0 mt-0.5">
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span className="text-gray-500 dark:text-gray-400" style={{ fontSize: '10px' }}>
                {product.trustRating}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-400 dark:text-gray-500 mb-3" style={{ fontSize: '10px' }}>
          Updated {formatDate(product.lastUpdated)}
        </p>

        {/* Store link */}
        <a
          href={product.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-auto inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
        >
          Visit Store <ExternalLink size={11} />
        </a>
      </div>
    </article>
  );
}
