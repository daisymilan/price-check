/**
 * Favorites Page
 */

import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Search } from 'lucide-react';
import { useFavorites } from '../hooks/useAppHooks';
import { mockProducts } from '../data/mockData';
import EmptyState from '../components/common/EmptyState';
import { formatPriceWithSymbol, getCategoryIcon, formatDate } from '../utils/formatUtils';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <EmptyState
          icon={<Heart size={36} />}
          title="No Saved Items Yet"
          description="Save construction materials you're interested in to track prices and compare options."
          actionLabel="Browse Materials"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label">Your List</p>
            <h1 className="section-title mb-0">Saved Items</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {favorites.length} saved item{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            <Search size={14} /> Browse More
          </button>
        </div>

        {/* Favorites list */}
        <div className="space-y-3 mb-12">
          {favorites.map((fav) => {
            const allPrices = mockProducts.filter((p) =>
              p.productName.toLowerCase().includes(fav.productName.toLowerCase())
            );
            const cheapest = allPrices.length > 0
              ? allPrices.reduce((min, p) => (p.price < min.price ? p : min))
              : null;
            const savings = cheapest && cheapest.price < fav.price
              ? fav.price - cheapest.price
              : 0;

            const product = mockProducts.find((p) => p.id === fav.id);

            return (
              <div key={fav.id} className="card p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={fav.imageUrl}
                      alt={fav.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span>{getCategoryIcon(fav.category)}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                            {fav.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          {fav.productName}
                        </h3>
                      </div>

                      <button
                        onClick={() => product && toggleFavorite(product)}
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Remove from saved"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Prices row */}
                    <div className="flex flex-wrap items-center gap-5 mb-2">
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Saved Price</p>
                        <p className="price-tag">{formatPriceWithSymbol(fav.price)}</p>
                      </div>

                      {cheapest && cheapest.price < fav.price && (
                        <div>
                          <p className="text-[10px] text-gray-400 mb-0.5">Current Best</p>
                          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {formatPriceWithSymbol(cheapest.price)}
                          </p>
                        </div>
                      )}

                      {savings > 0 && (
                        <div className="badge-green text-xs px-2.5 py-1 self-end mb-0.5">
                          Save {formatPriceWithSymbol(savings)}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-400">
                      from <span className="font-medium text-gray-600 dark:text-gray-300">{fav.source}</span>
                      {' · '}Saved {formatDate(fav.savedAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 sm:w-32 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/search?q=${encodeURIComponent(fav.productName)}`)}
                      className="btn-primary flex-1 sm:flex-none justify-center text-xs"
                    >
                      Compare <ArrowRight size={12} />
                    </button>
                    {product && (
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="btn-secondary flex-1 sm:flex-none justify-center text-xs"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="card p-6 bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
            💡 Tips for Smarter Buying
          </h3>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold flex-shrink-0">→</span>
              Check prices from multiple stores before committing to a purchase.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold flex-shrink-0">→</span>
              Online prices (Shopee, Lazada) often include delivery — factor that in.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold flex-shrink-0">→</span>
              Bulk orders at physical stores like Wilcon or CW Home Depot can offer discounts.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold flex-shrink-0">→</span>
              Price alerts (coming soon) will notify you when saved items go on sale.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
