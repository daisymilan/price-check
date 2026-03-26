/**
 * Header/Navbar Component
 */

import { useNavigate } from 'react-router-dom';
import { Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useAppHooks';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogo = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            onClick={handleLogo}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₱</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-900 dark:text-white">
                PriceCheck
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PH Construction Materials
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('/search')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition"
            >
              Search
            </button>
            <button
              onClick={() => handleNavigate('/about')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 font-medium transition"
            >
              How it Works
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Favorites Button */}
            <button
              onClick={() => handleNavigate('/favorites')}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
              title="Favorites"
            >
              <Heart
                size={20}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
              />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-700" />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 space-y-2">
            <button
              onClick={() => handleNavigate('/')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('/search')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
            >
              Search
            </button>
            <button
              onClick={() => handleNavigate('/about')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
            >
              How it Works
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
