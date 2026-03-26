/**
 * Favorites Page Component
 */

import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../hooks/useAppHooks';
import { mockProducts } from '../data/mockData';
import EmptyState from '../components/common/EmptyState';
import {
  formatPriceWithSymbol,
  getCategoryIcon,
  formatDate,
} from '../utils/formatUtils';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center">
          <EmptyState
            icon={<Heart size={64} className="text-gray-300 dark:text-gray-700 mx-auto" />}
            title="No Saved Items Yet"
            description="Start saving your favorite construction materials to compare prices and track deals."
            actionLabel="Browse Materials"
            onAction={() => navigate('/search')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Saved Items</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {favorites.length} saved item{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Favorites List */}
        <div className="space-y-4">
          {favorites.map((favorite) => {
            // Find all products with this name in mock data
            const allPrices = mockProducts.filter((p) =>
              p.productName.toLowerCase().includes(favorite.productName.toLowerCase())
            );
            const cheapest = allPrices.length > 0 ? allPrices[0] : null;
            const savings = cheapest && cheapest.price < favorite.price
              ? favorite.price - cheapest.price
              : 0;

            return (
              <div
                key={favorite.id}
                className="card card-dark p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image */}
                  <div className="sm:w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={favorite.imageUrl}
                      alt={favorite.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>{getCategoryIcon(favorite.category)}</span>
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase">
                            {favorite.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 cursor-pointer">
                          {favorite.productName}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          const fav = favorites.find((f) => f.id === favorite.id);
                          if (fav) {
                            const product = mockProducts.find((p) => p.id === favorite.id);
                            if (product) {
                              // Handle removal
                            }
                          }
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove from favorites"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Saved Price</p>
                        <p className="price-tag">{formatPriceWithSymbol(favorite.price)}</p>
                      </div>

                      {cheapest && cheapest.price < favorite.price && (
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                            Current Best Price
                          </p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatPriceWithSymbol(cheapest.price)}
                          </p>
                        </div>
                      )}

                      {savings > 0 && (
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Potential Saving</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            -₱{savings.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        from <strong>{favorite.source}</strong>
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-500 text-xs">
                        Saved {formatDate(favorite.savedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => navigate(`/search?q=${encodeURIComponent(favorite.productName)}`)}
                      className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2"
                    >
                      Compare <ArrowRight size={14} />
                    </button>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(favorite.productName)} ${encodeURIComponent(favorite.source)} price`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none btn-secondary dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 text-center"
                    >
                      Check Price
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>✓ Regularly check saved items to monitor price changes</li>
            <li>✓ Compare prices across different stores before purchasing</li>
            <li>✓ Use the bulk comparison feature to check multiple items at once</li>
            <li>✓ Enable price drop notifications to get alerts when items go on sale</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
