/**
 * Footer Component
 */

import { Tag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Tag size={14} className="text-white" />
              </div>
              <span className="text-white font-bold text-sm">PriceCheck PH</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-4">
              Compare construction material prices from Philippine hardware stores
              and online marketplaces — before you buy.
            </p>
            <p className="text-xs text-gray-600">Prices shown for reference only.</p>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'Browse Materials', path: '/search' },
                { label: 'How It Works', path: '/about' },
                { label: 'Saved Items', path: '/favorites' },
              ].map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'Paint & Coating',
                'Cement & Concrete',
                'Tiles & Stone',
                'Steel & Structural',
                'Wood & Lumber',
                'Plumbing',
              ].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => navigate(`/search?category=${encodeURIComponent(c)}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Covered Stores
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'Wilcon Depot',
                'CW Home Depot',
                'AllHome',
                'Ace Hardware PH',
                'Handyman',
                'Shopee Philippines',
                'Lazada Philippines',
              ].map((s) => (
                <li key={s}>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <ExternalLink size={10} className="flex-shrink-0" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {year} PriceCheck PH. For informational purposes only.</p>
          <p>Not affiliated with any listed store. Prices may vary.</p>
        </div>
      </div>
    </footer>
  );
}
