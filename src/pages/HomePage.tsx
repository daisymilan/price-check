/**
 * Home Page — Landing page with hero, categories, featured products
 */

import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Clock, Zap, Shield, Star, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRecentSearches } from '../hooks/useAppHooks';
import { mockProducts, categories } from '../data/mockData';
import { formatPriceWithSymbol } from '../utils/formatUtils';

const POPULAR_SEARCHES = [
  'Boysen white paint',
  'Portland cement',
  'Marine plywood',
  '10mm steel bar',
  'Mariwasa tiles 60x60',
  'PVC pipe 4 inch',
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Comparison',
    desc: 'See prices from 10+ stores side by side in seconds.',
  },
  {
    icon: TrendingUp,
    title: 'Best Price Detection',
    desc: 'We automatically highlight the cheapest option.',
  },
  {
    icon: MapPin,
    title: 'Local & Online',
    desc: 'Compare physical stores and online marketplaces.',
  },
  {
    icon: Shield,
    title: 'Trusted Sources',
    desc: 'Data from verified Philippine hardware stores.',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { recentSearches } = useRecentSearches();
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = (query: string) => {
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const featuredProducts = mockProducts.slice(0, 6);
  const storeCount = [...new Set(mockProducts.map((p) => p.sourceName))].length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-grid-overlay" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-content text-center">
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-600/10 border border-primary-600/20 rounded-full text-primary-700 dark:text-primary-300 text-xs font-semibold mb-6">
            <span className="live-indicator"><span className="live-dot" /></span>
            Prices updated daily from Philippine stores
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-5 leading-[1.1]">
            Find the Best Price for
            <br className="hidden sm:block" />
            <span className="gradient-text"> Construction Materials</span>
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
            Compare prices from Wilcon, CW Home Depot, AllHome, Shopee, Lazada and more — before you buy.
          </p>

          {/* Search box */}
          <div className="max-w-2xl mx-auto mb-5">
            <form onSubmit={handleSubmit}>
              <div className={`search-hero${focused ? ' focused' : ''}`}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder='Search... e.g. "Boysen white paint 1 gallon"'
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base outline-none min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Popular chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mr-0.5">
              <Star size={10} /> Popular:
            </span>
            {POPULAR_SEARCHES.map((s) => (
              <button key={s} onClick={() => handleSearch(s)} className="recent-chip text-xs">
                {s}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            {[
              { label: 'Products', value: `${mockProducts.length}+` },
              { label: 'Stores', value: `${storeCount}+` },
              { label: 'Avg. Savings', value: '≤30%' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="text-xl sm:text-2xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Recent searches */}
        {recentSearches.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={13} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Recent Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.slice(0, 6).map((s) => (
                <button key={s.id} onClick={() => handleSearch(s.query)} className="recent-chip">
                  <Clock size={10} />
                  {s.query}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <p className="section-label">Shop by Category</p>
          <div className="flex items-end justify-between mb-6">
            <h2 className="section-title mb-0">Browse Materials</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
                className="category-card group"
              >
                <div className="category-icon"><span>{cat.icon}</span></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400">{cat.count} items</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section>
          <p className="section-label">Featured Listings</p>
          <div className="flex items-end justify-between mb-6">
            <h2 className="section-title mb-0">Popular Materials</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
            >
              See all <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => navigate(`/search?q=${encodeURIComponent(product.productName)}`)}
                className="product-card group text-left"
              >
                <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="badge-blue" style={{ fontSize: '10px' }}>{product.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="price-tag">{formatPriceWithSymbol(product.price)}</p>
                      <p className="text-[10px] text-gray-400">per {product.unit}</p>
                    </div>
                    <p className="text-xs text-gray-400">{product.sourceName}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <p className="section-label text-center">Why PriceCheck PH</p>
          <h2 className="section-title text-center mb-12">Save time. Save money.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card card-hover p-6">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="card p-8 md:p-12">
          <p className="section-label text-center">Simple Process</p>
          <h2 className="section-title text-center mb-10">How PriceCheck Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { n: '1', title: 'Search', desc: 'Type the material you need in the search bar.' },
              { n: '2', title: 'Compare', desc: 'See all prices from different stores at once.' },
              { n: '3', title: 'Find the Best', desc: 'We highlight the cheapest option for you.' },
              { n: '4', title: 'Buy Smart', desc: 'Visit the store or buy online — your choice.' },
            ].map((step, i) => (
              <div key={step.n} className="text-center relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-5 left-[60%] w-[80%] border-t-2 border-dashed border-primary-200 dark:border-primary-800" />
                )}
                <div className="step-number">{step.n}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-gradient rounded-2xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">
            Ready to Compare Prices?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto text-base">
            Stop overpaying for construction materials. Search and compare now — it's free.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
          >
            Start Comparing <ArrowRight size={15} />
          </button>
        </section>
      </div>
    </div>
  );
}
