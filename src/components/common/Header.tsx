/**
 * Header/Navbar — Sticky with blur-on-scroll effect
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Moon, Sun, Menu, X, Tag } from 'lucide-react';
import { useTheme } from '../../hooks/useAppHooks';
import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const go = (path: string) => { navigate(path); setMobileMenuOpen(false); };

  const navLinkCls = (path: string) =>
    location.pathname === path
      ? 'text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200/60 dark:border-gray-700/60'
          : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label="PriceCheck PH — Home"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Tag size={17} className="text-white" />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
              PriceCheck<span className="text-primary-600 dark:text-primary-400"> PH</span>
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[
            { label: 'Home', path: '/' },
            { label: 'Browse', path: '/search' },
            { label: 'How It Works', path: '/about' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={`px-3.5 py-2 rounded-lg text-sm transition-all ${navLinkCls(item.path)}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => go('/favorites')}
            className={`p-2.5 rounded-lg transition-all ${navLinkCls('/favorites')}`}
            title="Saved items"
          >
            <Heart
              size={18}
              className={location.pathname === '/favorites' ? 'fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400' : ''}
            />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            title={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ml-0.5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-slide-down">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {[
              { label: 'Home', path: '/' },
              { label: 'Browse Materials', path: '/search' },
              { label: 'How It Works', path: '/about' },
              { label: 'Saved Items', path: '/favorites' },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${navLinkCls(item.path)}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
