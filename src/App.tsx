/**
 * Main App component with routing
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useAppHooks';
import { DataProvider } from './context/DataContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import './styles/App.css';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
