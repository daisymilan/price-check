/**
 * Filter Sidebar Component
 */

import { ChevronDown } from 'lucide-react';
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

export default function FilterSidebar({
  products,
  filters,
  onFiltersChange,
  onReset,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: false,
    source: false,
    location: false,
  });

  const categories = getUniqueCategories(products);
  const brands = getUniqueBrands(products);
  const sources = getUniqueSources(products);
  const locations = getUniqueLocations(products);
  const priceStats = getPriceStats(products);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleBrandChange = (brand: string) => {
    onFiltersChange({
      ...filters,
      brand: filters.brand === brand ? undefined : brand,
    });
  };

  const handleSourceChange = (source: string) => {
    onFiltersChange({
      ...filters,
      source: filters.source === source ? undefined : source,
    });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location: filters.location === location ? undefined : location,
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.brand ||
    filters.source ||
    filters.location ||
    filters.minPrice ||
    filters.maxPrice;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Sort Options */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'most_relevant'}
          onChange={(e) =>
            handleSortChange(
              e.target.value as SearchFilters['sortBy']
            )
          }
          className="input-field text-sm dark:bg-slate-700 dark:border-gray-600 dark:text-white"
        >
          <option value="most_relevant">Most Relevant</option>
          <option value="lowest_price">Lowest Price</option>
          <option value="highest_price">Highest Price</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-group p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between mb-3"
        >
          <label className="filter-label m-0 cursor-pointer">Category</label>
          <ChevronDown
            size={16}
            className={`transition transform ${
              openSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="filter-checkbox dark:bg-slate-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-group p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-3"
        >
          <label className="filter-label m-0 cursor-pointer">Price Range</label>
          <ChevronDown
            size={16}
            className={`transition transform ${
              openSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.price && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                Min Price: ₱{filters.minPrice || 0}
              </label>
              <input
                type="range"
                min={priceStats.min}
                max={priceStats.max}
                value={filters.minPrice || priceStats.min}
                onChange={(e) =>
                  handlePriceChange(
                    Number(e.target.value),
                    filters.maxPrice
                  )
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                Max Price: ₱{filters.maxPrice || priceStats.max}
              </label>
              <input
                type="range"
                min={priceStats.min}
                max={priceStats.max}
                value={filters.maxPrice || priceStats.max}
                onChange={(e) =>
                  handlePriceChange(
                    filters.minPrice,
                    Number(e.target.value)
                  )
                }
                className="w-full"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ₱{filters.minPrice || priceStats.min} - ₱
              {filters.maxPrice || priceStats.max}
            </p>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="filter-group p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between mb-3"
        >
          <label className="filter-label m-0 cursor-pointer">Brand</label>
          <ChevronDown
            size={16}
            className={`transition transform ${
              openSections.brand ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.brand && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brand === brand}
                  onChange={() => handleBrandChange(brand)}
                  className="filter-checkbox dark:bg-slate-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Source Filter */}
      <div className="filter-group p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('source')}
          className="w-full flex items-center justify-between mb-3"
        >
          <label className="filter-label m-0 cursor-pointer">Store</label>
          <ChevronDown
            size={16}
            className={`transition transform ${
              openSections.source ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.source && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sources.map((source) => (
              <label key={source} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.source === source}
                  onChange={() => handleSourceChange(source)}
                  className="filter-checkbox dark:bg-slate-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="filter-group p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between mb-3"
        >
          <label className="filter-label m-0 cursor-pointer">Location</label>
          <ChevronDown
            size={16}
            className={`transition transform ${
              openSections.location ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.location === loc}
                  onChange={() => handleLocationChange(loc)}
                  className="filter-checkbox dark:bg-slate-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <div className="p-4">
          <button
            onClick={onReset}
            className="w-full btn-secondary dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
