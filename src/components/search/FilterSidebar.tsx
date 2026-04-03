/**
 * Filter Sidebar Component
 */

import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { SearchFilters, ProductPrice } from '../../types';
import {
  getUniqueBrands,
  getUniqueCategories,
  getUniqueLocations,
  getUniqueSources,
  getPriceStats,
} from '../../utils/searchUtils';

interface FilterSidebarProps {
  products: ProductPrice[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
}

interface SectionProps {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ label, open, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar({
  products,
  filters,
  onFiltersChange,
  onReset,
}: FilterSidebarProps) {
  const [open, setOpen] = useState({
    sort: true,
    category: true,
    price: false,
    brand: false,
    source: false,
    location: false,
  });

  const cats = getUniqueCategories(products);
  const brands = getUniqueBrands(products);
  const sources = getUniqueSources(products);
  const locations = getUniqueLocations(products);
  const priceStats = getPriceStats(products);

  const toggle = (k: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [k]: !prev[k] }));

  const set = (patch: Partial<SearchFilters>) =>
    onFiltersChange({ ...filters, ...patch });

  const hasFilters =
    filters.category || filters.brand || filters.source ||
    filters.location || filters.minPrice || filters.maxPrice;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Filters
        </span>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <FilterSection label="Sort By" open={open.sort} onToggle={() => toggle('sort')}>
        <div className="space-y-1.5 pt-1">
          {[
            { value: 'most_relevant', label: 'Most Relevant' },
            { value: 'lowest_price', label: 'Lowest Price' },
            { value: 'highest_price', label: 'Highest Price' },
            { value: 'newest', label: 'Newest First' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={(filters.sortBy || 'most_relevant') === opt.value}
                onChange={() => set({ sortBy: opt.value as SearchFilters['sortBy'] })}
                className="accent-primary-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection label="Category" open={open.category} onToggle={() => toggle('category')}>
        {cats.map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.category === cat}
              onChange={() => set({ category: filters.category === cat ? undefined : cat })}
              className="w-3.5 h-3.5 rounded accent-primary-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {cat}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection label="Price Range" open={open.price} onToggle={() => toggle('price')}>
        <div className="space-y-3 pt-1">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">Min</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                ₱{(filters.minPrice || priceStats.min).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={filters.minPrice || priceStats.min}
              onChange={(e) => set({ minPrice: Number(e.target.value) })}
              className="w-full accent-primary-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">Max</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                ₱{(filters.maxPrice || priceStats.max).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={filters.maxPrice || priceStats.max}
              onChange={(e) => set({ maxPrice: Number(e.target.value) })}
              className="w-full accent-primary-600"
            />
          </div>
          <p className="text-xs text-gray-400 text-center">
            ₱{(filters.minPrice || priceStats.min).toLocaleString()} –
            ₱{(filters.maxPrice || priceStats.max).toLocaleString()}
          </p>
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection label="Brand" open={open.brand} onToggle={() => toggle('brand')}>
        <div className="max-h-44 overflow-y-auto space-y-1.5">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brand === b}
                onChange={() => set({ brand: filters.brand === b ? undefined : b })}
                className="w-3.5 h-3.5 rounded accent-primary-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {b}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Store */}
      <FilterSection label="Store" open={open.source} onToggle={() => toggle('source')}>
        <div className="max-h-44 overflow-y-auto space-y-1.5">
          {sources.map((s) => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.source === s}
                onChange={() => set({ source: filters.source === s ? undefined : s })}
                className="w-3.5 h-3.5 rounded accent-primary-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {s}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection label="Location" open={open.location} onToggle={() => toggle('location')}>
        <div className="space-y-1.5">
          {locations.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.location === loc}
                onChange={() => set({ location: filters.location === loc ? undefined : loc })}
                className="w-3.5 h-3.5 rounded accent-primary-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {loc}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
