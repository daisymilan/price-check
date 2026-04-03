/**
 * SearchBar — Compact search bar for results page
 */

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
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
  placeholder = 'Search materials... (e.g. cement, paint, tiles)',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const { recentSearches } = useRecentSearches();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update query if initialQuery prop changes (e.g. from URL)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setOpen(false);
    }
  };

  const pick = (q: string) => {
    setQuery(q);
    onSearch(q);
    setOpen(false);
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const showDropdown = open && showRecent && recentSearches.length > 0 && !query;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Search
            size={16}
            className="absolute left-3.5 text-gray-400 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="input pl-10 pr-10 h-10"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </form>

      {/* Recent searches dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-down">
          <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Recent Searches
            </p>
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {recentSearches.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); pick(s.query); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Clock size={12} className="text-gray-300 dark:text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{s.query}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
