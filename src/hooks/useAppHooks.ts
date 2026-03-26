/**
 * Custom React hooks for the app
 */

import { useState, useCallback } from 'react';
import { ProductPrice, SearchFilters } from '../types';
import { searchProducts } from '../utils/searchUtils';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorited,
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
} from '../utils/storageUtils';

/**
 * Hook for managing search state and results
 */
export const useSearch = (allProducts: ProductPrice[]) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
  });
  const [results, setResults] = useState(() =>
    searchProducts(allProducts, { query: '' })
  );
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(
    (newFilters: SearchFilters) => {
      setIsLoading(true);
      // Simulate network delay for better UX
      setTimeout(() => {
        setFilters(newFilters);
        const newResults = searchProducts(allProducts, newFilters);
        setResults(newResults);
        setIsLoading(false);
      }, 300);
    },
    [allProducts]
  );

  const resetSearch = useCallback(() => {
    setFilters({ query: '' });
    setResults(searchProducts(allProducts, { query: '' }));
  }, [allProducts]);

  return {
    filters,
    results,
    isLoading,
    performSearch,
    resetSearch,
  };
};

/**
 * Hook for managing favorites
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => getFavorites());

  const toggleFavorite = useCallback(
    (product: ProductPrice) => {
      const isFav = isFavorited(product.id);

      if (isFav) {
        removeFavorite(product.id);
        setFavorites((prev) => prev.filter((f) => f.id !== product.id));
      } else {
        const newFave = {
          id: product.id,
          productName: product.productName,
          imageUrl: product.imageUrl,
          brand: product.brand,
          category: product.category,
          price: product.price,
          source: product.sourceName,
          savedAt: new Date().toISOString(),
        };
        addFavorite(newFave);
        setFavorites((prev) => [newFave, ...prev]);
      }
    },
    []
  );

  const isFav = useCallback(
    (id: string) => {
      return isFavorited(id);
    },
    []
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFav,
    clearAllFavorites,
  };
};

/**
 * Hook for managing recent searches
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());

  const addSearch = useCallback((query: string) => {
    addRecentSearch(query);
    setRecentSearches(getRecentSearches());
  }, []);

  const removeSearch = useCallback((id: string) => {
    removeRecentSearch(id);
    setRecentSearches(getRecentSearches());
  }, []);

  return {
    recentSearches,
    addSearch,
    removeSearch,
  };
};

/**
 * Hook for managing loading state
 */
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  const toggleLoading = useCallback(() => setIsLoading((prev) => !prev), []);

  return { isLoading, startLoading, stopLoading, toggleLoading };
};

/**
 * Hook for managing theme preference
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pc_theme') as 'light' | 'dark' | null;
      return stored || 'light';
    }
    return 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('pc_theme', newTheme);
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme };
};
