/**
 * Home Page Component
 */

import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import CategoryGrid from '../components/product/CategoryGrid';
import { useRecentSearches } from '../hooks/useAppHooks';
import { mockProducts } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();
  const { recentSearches } = useRecentSearches();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find the Best Prices for Construction Materials
          </h1>
          <p className="hero-subtitle">
            Compare prices across Philippine hardware stores and suppliers. Support local
            businesses while getting the best deals.
          </p>

          {/* Main Search Bar */}
          <div className="mt-8 max-w-2xl">
            <SearchBar
              onSearch={handleSearch}
              initialQuery=""
              showRecent={true}
              autoFocus={true}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                {mockProducts.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Products Tracked</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                10+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stores & Suppliers</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                Save 30%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mb-16">
            <h2 className="section-title">Recent Searches</h2>
            <div className="flex flex-wrap gap-3">
              {recentSearches.slice(0, 5).map((search) => (
                <button
                  key={search.id}
                  onClick={() => handleSearch(search.query)}
                  className="recent-search-chip"
                >
                  {search.query}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="section-title">Browse by Category</h2>
          <CategoryGrid />
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title m-0">Featured Materials</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium transition"
            >
              View All →
            </button>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="card card-dark p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/search?q=${encodeURIComponent(product.productName)}`)}
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase mb-2">
                  {product.brand}
                </p>
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 hover:text-primary-700">
                  {product.productName}
                </h3>
                <p className="text-lg font-bold text-primary-700 dark:text-accent-300">
                  ₱{product.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  from {product.sourceName}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-primary-50 dark:bg-primary-900 rounded-xl p-8 mb-16">
          <h2 className="section-title text-center">How PriceCheck Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '1',
                title: 'Search',
                description: 'Enter the material you need',
              },
              {
                number: '2',
                title: 'Compare',
                description: 'See prices from all stores',
              },
              {
                number: '3',
                title: 'Save',
                description: 'Find the cheapest option',
              },
              {
                number: '4',
                title: 'Buy',
                description: 'Purchase from your choice',
              },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 dark:from-primary-900 dark:to-primary-800 rounded-xl p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Better Prices?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Start comparing prices now and save on your construction materials. Updated
            prices from Philippine suppliers daily.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="bg-white dark:bg-slate-800 text-primary-700 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Start Comparing
          </button>
        </section>
      </div>
    </div>
  );
}
