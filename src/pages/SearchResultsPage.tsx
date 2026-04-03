/**
 * Search Results Page
 */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import FilterSidebar from '../components/search/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import EmptyState from '../components/common/EmptyState';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useSearch, useRecentSearches } from '../hooks/useAppHooks';
import { mockProducts } from '../data/mockData';
import { SearchFilters } from '../types';
import { Search, LayoutGrid, List, TrendingDown, SlidersHorizontal, X } from 'lucide-react';
import { formatPriceWithSymbol } from '../utils/formatUtils';

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || undefined;

  const { filters, results, isLoading, performSearch, resetSearch } = useSearch(mockProducts);
  const { addSearch } = useRecentSearches();

  useEffect(() => {
    const newFilters: SearchFilters = {
      query: initialQuery,
      category: initialCategory,
    };
    performSearch(newFilters);
    if (initialQuery) addSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = (query: string) => {
    const f: SearchFilters = { ...filters, query };
    performSearch(f);
    if (query) addSearch(query);
    navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
  };

  const handleFiltersChange = (newFilters: SearchFilters) => performSearch(newFilters);
  const handleReset = () => { resetSearch(); navigate('/search'); };

  const hasQuery = !!filters.query || !!filters.category;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sticky search bar */}
      <div className="sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} initialQuery={filters.query} />
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Results header */}
        {(results.products.length > 0 || isLoading || hasQuery) && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              {hasQuery && (
                <p className="text-xs text-gray-400 mb-0.5">
                  {isLoading
                    ? 'Searching...'
                    : `${results.total} result${results.total !== 1 ? 's' : ''}`}
                  {filters.query && (
                    <> for <span className="font-semibold text-gray-700 dark:text-gray-300">"{filters.query}"</span></>
                  )}
                </p>
              )}
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {filters.category
                  ? filters.category
                  : filters.query
                  ? 'Search Results'
                  : 'All Materials'}
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600'
                }`}
                title="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600'
                }`}
                title="Table view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-6">

          {/* Sidebar — desktop: always visible; mobile: slide-in overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">Filters</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    products={mockProducts}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleReset}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterSidebar
              products={mockProducts}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleReset}
            />
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <LoadingSkeleton />
            ) : results.products.length === 0 ? (
              <EmptyState
                icon={<Search size={36} />}
                title="No results found"
                description={
                  filters.query
                    ? `No materials matched "${filters.query}". Try different keywords or remove filters.`
                    : 'Search for a construction material to see prices from multiple stores.'
                }
                actionLabel="Clear Filters"
                onAction={handleReset}
              />
            ) : (
              <div className="space-y-5">

                {/* Best price banner */}
                {results.cheapest && (
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingDown size={17} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                        ★ Pinakamura — Best Price Available
                      </p>
                      <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                        {formatPriceWithSymbol(results.cheapest.price)}
                        <span className="text-sm font-normal text-emerald-600 dark:text-emerald-400 ml-2">
                          from {results.cheapest.sourceName}
                        </span>
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500">
                        {results.cheapest.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Grid view */}
                {viewMode === 'grid' && (
                  <div className="product-grid">
                    {results.products.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        isCheapest={results.cheapest?.id === p.id}
                      />
                    ))}
                  </div>
                )}

                {/* Table view */}
                {viewMode === 'table' && (
                  <PriceComparisonTable
                    products={results.products}
                    cheapest={results.cheapest}
                  />
                )}

                <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-2">
                  Showing {results.products.length} of {results.total} results
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
