/**
 * Category Grid Component
 */

import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/mockData';

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      navigate(`/search?category=${encodeURIComponent(category.name)}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="card card-dark flex flex-col items-center justify-center p-4 hover:shadow-lg hover:scale-105 transition-all"
        >
          <span className="text-3xl mb-2">{category.icon}</span>
          <span className="text-sm font-semibold text-center text-gray-900 dark:text-white line-clamp-2 overflow-hidden">
            {category.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}
