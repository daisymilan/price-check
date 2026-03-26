/**
 * Product Card Component
 */

import { Heart, ExternalLink } from 'lucide-react';
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
  const { isFav } = useFavorites();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const isLimited = product.availability === 'limited';
  const isOutOfStock = product.availability === 'out_of_stock';

  return (
    <div
      className="card card-dark flex flex-col h-full hover:shadow-xl transition-shadow cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-t-xl">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isCheapest && (
            <div className="cheapest-badge px-3 py-1 rounded-full text-xs font-bold shadow">
              Best Price
            </div>
          )}
          {isLimited && (
            <div className="limited-badge px-3 py-1 rounded-full text-xs font-bold shadow">
              Limited
            </div>
          )}
          {isOutOfStock && (
            <div className="out-of-stock-badge px-3 py-1 rounded-full text-xs font-bold shadow">
              Out of Stock
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick?.();
          }}
          className="favorite-btn absolute bottom-3 right-3 p-2 bg-white dark:bg-slate-700 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-slate-600 transition"
          title="Add to favorites"
        >
          <Heart
            size={18}
            className={isFav(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col p-4">
        {/* Brand */}
        <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-700 dark:hover:text-primary-400">
          {product.productName}
        </h3>

        {/* Variant/Size */}
        {(product.variant || product.size) && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {product.variant && <span>{product.variant}</span>}
            {product.variant && product.size && <span> • </span>}
            {product.size && <span>{product.size}</span>}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          <p className="price-tag">{formatPriceWithSymbol(product.price)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">per {product.unit}</p>
        </div>

        {/* Store Info */}
        <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-grow">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {product.sourceName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{product.location}</p>
          </div>
          {product.trustRating && (
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.round(product.trustRating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Last Updated */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          Updated {formatDate(product.lastUpdated)}
        </p>

        {/* Store Link */}
        <a
          href={product.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition mt-auto"
        >
          View at Store <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
