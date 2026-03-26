/**
 * Search Results Page Component
 */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import FilterSidebar from '../components/search/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import EmptyState from '../components/common/EmptyState';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useSearch, useFavorites, useRecentSearches } from '../hooks/useAppHooks';
import { mockProducts } from '../data/mockData';
import { SearchFilters } from '../types';
import { Search, List, Grid3x3 } from 'lucide-react';

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || searchParams.get('category') || '';

  const { filters, results, isLoading, performSearch, resetSearch } = useSearch(mockProducts);
  const { toggleFavorite } = useFavorites();
  const { addSearch } = useRecentSearches();

  // Initial search
  useEffect(() => {
    if (initialQuery) {
      const newFilters: SearchFilters = {
        query: searchParams.get('q') || '',
        category: searchParams.get('category') || undefined,
      };
      performSearch(newFilters);
      addSearch(initialQuery);
    }
  }, []);

  const handleSearch = (query: string) => {
    const newFilters: SearchFilters = {
      ...filters,
      query,
    };
    performSearch(newFilters);
    addSearch(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    performSearch(newFilters);
  };

  const handleReset = () => {
    resetSearch();
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Search Bar Section */}
      <div className="sticky top-16 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar onSearch={handleSearch} initialQuery={filters.query} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        {results.products.length > 0 && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Search Results
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Found {results.total} results
                {filters.query && ` for "${filters.query}"`}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title="Grid View"
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'table'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title="Table View"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              products={mockProducts}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleReset}
            />
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <LoadingSkeleton />
            ) : results.products.length === 0 ? (
              <EmptyState
                icon={<Search size={48} />}
                title="No Results Found"
                description={
                  filters.query
                    ? `We couldn't find any materials matching "${filters.query}". Try adjusting your search or filters.`
                    : 'Try searching for a material to get started.'
                }
                actionLabel="Clear Filters"
                onAction={handleReset}
              />
            ) : (
              <div>
                {/* Cheapest Highlight */}
                {results.cheapest && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                      💰 Best Price Available
                    </p>
                    <p className="text-lg font-bold text-green-700 dark:text-green-300 mb-1">
                      ₱{results.cheapest.price.toLocaleString()} from{' '}
                      <span className="text-green-600 dark:text-green-400">
                        {results.cheapest.sourceName}
                      </span>
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      at {results.cheapest.location}
                    </p>
                  </div>
                )}

                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="product-grid">
                    {results.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isCheapest={results.cheapest?.id === product.id}
                        onFavoriteClick={() => toggleFavorite(product)}
                      />
                    ))}
                  </div>
                )}

                {/* Table View */}
                {viewMode === 'table' && (
                  <PriceComparisonTable
                    products={results.products}
                    cheapest={results.cheapest}
                  />
                )}

                {/* Pagination Info */}
                <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Showing {results.products.length} of {results.total} results
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
