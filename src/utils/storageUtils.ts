/**
 * LocalStorage management utilities
 */

import { FavoriteItem, RecentSearch } from '../types';

// Keys
const STORAGE_KEYS = {
  FAVORITES: 'pc_favorites',
  RECENT_SEARCHES: 'pc_recent_searches',
  THEME: 'pc_theme',
};

// Favorites Management
export const getFavorites = (): FavoriteItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addFavorite = (item: FavoriteItem): void => {
  try {
    const favorites = getFavorites();
    // Check if already exists
    if (!favorites.some((fav) => fav.id === item.id)) {
      favorites.unshift(item);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
};

export const removeFavorite = (id: string): void => {
  try {
    const favorites = getFavorites().filter((fav) => fav.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const isFavorited = (id: string): boolean => {
  return getFavorites().some((fav) => fav.id === id);
};

export const clearFavorites = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};

// Recent Searches Management
export const getRecentSearches = (): RecentSearch[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentSearch = (query: string): void => {
  try {
    if (!query.trim()) return;

    const recentSearches = getRecentSearches();
    const newSearch: RecentSearch = {
      id: Math.random().toString(36).substring(7),
      query: query.trim(),
      timestamp: new Date().toISOString(),
    };

    // Remove duplicate if exists
    const filtered = recentSearches.filter((s) => s.query !== query.trim());

    // Add new search at the beginning and keep only last 10
    const updated = [newSearch, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

export const removeRecentSearch = (id: string): void => {
  try {
    const recentSearches = getRecentSearches().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(recentSearches));
  } catch (error) {
    console.error('Error removing recent search:', error);
  }
};

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};

// Theme Management
export const getTheme = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    return (stored as 'light' | 'dark') || 'light';
  } catch {
    return 'light';
  }
};

export const setTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const toggleTheme = (): 'light' | 'dark' => {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
};
