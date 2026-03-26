/**
 * Product Detail Page Component
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Bell, Share2 } from 'lucide-react';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import EmptyState from '../components/common/EmptyState';
import { mockProducts } from '../data/mockData';
import { ProductPrice } from '../types';
import {
  formatPriceWithSymbol,
  getCategoryIcon,
  normalizeProductName,
} from '../utils/formatUtils';
import { useFavorites } from '../hooks/useAppHooks';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductPrice | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductPrice[]>([]);
  const { toggleFavorite, isFav } = useFavorites();

  useEffect(() => {
    // Find product by ID
    const found = mockProducts.find((p) => p.id === id);
    setProduct(found || null);

    // Find related products (same category or similar name)
    if (found) {
      const related = mockProducts.filter(
        (p) =>
          p.id !== found.id &&
          (p.category === found.category ||
            normalizeProductName(p.productName).includes(
              normalizeProductName(found.brand)
            ))
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Product Not Found"
          description="The product you're looking for doesn't exist or has been removed."
          actionLabel="Back to Search"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  // Get all variants of this product from different sources
  const allVariants = mockProducts.filter(
    (p) => p.normalizedProductName === product.normalizedProductName
  );

  const cheapest = allVariants.reduce((min, p) =>
    p.price < min.price ? p : min
  );

  const isFavorite = isFav(product.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Product Image and Info */}
          <div className="lg:col-span-1">
            <div className="card card-dark sticky top-24 overflow-hidden">
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                {/* Category */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                  <span className="category-badge">{product.category}</span>
                </div>

                {/* Product Details */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.productName}
                </h1>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Brand:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{product.brand}</span>
                  </p>
                  {product.variant && (
                    <p className="text-sm">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Variant:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        {product.variant}
                      </span>
                    </p>
                  )}
                  {product.size && (
                    <p className="text-sm">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Size:</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">{product.size}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Unit:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{product.unit}</span>
                  </p>
                </div>

                {/* Price Highlight */}
                <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-4 mb-4">
                  <p className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase mb-1">
                    At {product.sourceName}
                  </p>
                  <p className="price-tag">{formatPriceWithSymbol(product.price)}</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">
                    {product.availability === 'in_stock'
                      ? '✓ In Stock'
                      : '⚠ Limited Stock'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                      isFavorite
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart
                      size={18}
                      className={isFavorite ? 'fill-current' : ''}
                    />
                    {isFavorite ? 'Saved' : 'Save to Favorites'}
                  </button>

                  <button className="w-full btn-secondary dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share
                  </button>

                  <button className="w-full btn-secondary dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 flex items-center justify-center gap-2">
                    <Bell size={18} />
                    Notify on Price Drop
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            {/* Price Comparison Section */}
            <div className="card card-dark p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Price Comparison (All Sources)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {allVariants.length} seller{allVariants.length !== 1 ? 's' : ''} offering
                this product
              </p>
              <PriceComparisonTable products={allVariants} cheapest={cheapest} />
            </div>

            {/* Product Specs */}
            <div className="card card-dark p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Product Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Category
                    </p>
                    <p className="text-gray-900 dark:text-white">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Brand
                    </p>
                    <p className="text-gray-900 dark:text-white">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Unit
                    </p>
                    <p className="text-gray-900 dark:text-white">{product.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Availability
                    </p>
                    <p className="text-gray-900 dark:text-white capitalize">
                      {product.availability.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {product.sku && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      SKU
                    </p>
                    <p className="text-gray-900 dark:text-white font-mono">{product.sku}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Savings Info */}
            {cheapest && cheapest.id !== product.id && (
              <div className="card card-dark p-6 mb-8 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                  💰 Potential Savings
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  You could save ₱
                  {(product.price - cheapest.price).toLocaleString()} by purchasing from{' '}
                  <strong>{cheapest.sourceName}</strong>, which offers the same product at{' '}
                  <strong>{formatPriceWithSymbol(cheapest.price)}</strong>
                </p>
              </div>
            )}

            {/* Store Info */}
            <div className="card card-dark p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Seller Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                    Store
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {product.sourceName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                    Location
                  </p>
                  <p className="text-gray-900 dark:text-white">{product.location}</p>
                </div>
                {product.trustRating && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Trust Rating
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < Math.round(product.trustRating!)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {product.trustRating.toFixed(1)}/5.0
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm btn-primary inline-block"
                  >
                    Visit Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="section-title">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="card card-dark p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.productName}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase mb-1">
                    {prod.brand}
                  </p>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {prod.productName}
                  </h3>
                  <p className="text-lg font-bold text-primary-700 dark:text-accent-300 mb-1">
                    {formatPriceWithSymbol(prod.price)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    from {prod.sourceName}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
