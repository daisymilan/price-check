/**
 * Search Bar Component
 */

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRecentSearches } from '../../hooks/useAppHooks';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  showRecent?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  initialQuery = '',
  showRecent = true,
  autoFocus = false,
  placeholder = 'Search materials... (e.g., paint, cement, tiles)',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const { recentSearches } = useRecentSearches();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowRecentDropdown(false);
    }
  };

  const handleRecentClick = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowRecentDropdown(false);
  };

  const handleClear = () => {
    setQuery('');
    setShowRecentDropdown(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search
            size={20}
            className="absolute left-4 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => showRecent && setShowRecentDropdown(true)}
            onBlur={() => setShowRecentDropdown(false)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="input-field pl-12 pr-10 text-base dark:bg-slate-700 dark:border-gray-600 dark:text-white"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Recent Searches Dropdown */}
      {showRecentDropdown && recentSearches.length > 0 && showRecent && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
              Recent Searches
            </p>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {recentSearches.map((search) => (
              <li key={search.id}>
                <button
                  onClick={() => handleRecentClick(search.query)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center gap-2"
                >
                  <Search size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {search.query}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
