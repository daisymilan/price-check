/**
 * CategoryGrid — Icon grid for browsing by category
 */

import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/mockData';

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
          className="category-card group"
        >
          <div className="category-icon">
            <span>{cat.icon}</span>
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight">
            {cat.name}
          </span>
          <span className="text-[10px] text-gray-400">{cat.count} items</span>
        </button>
      ))}
    </div>
  );
}
