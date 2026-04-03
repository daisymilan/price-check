/**
 * Product Detail Page
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Bell, Share2, MapPin, Star, ExternalLink } from 'lucide-react';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import EmptyState from '../components/common/EmptyState';
import { mockProducts } from '../data/mockData';
import { ProductPrice } from '../types';
import { formatPriceWithSymbol, getCategoryIcon, normalizeProductName, formatDate } from '../utils/formatUtils';
import { useFavorites } from '../hooks/useAppHooks';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductPrice | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductPrice[]>([]);
  const { toggleFavorite, isFav } = useFavorites();

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === id);
    setProduct(found || null);

    if (found) {
      const related = mockProducts.filter(
        (p) =>
          p.id !== found.id &&
          (p.category === found.category ||
            normalizeProductName(p.productName).includes(normalizeProductName(found.brand)))
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Product Not Found"
          description="This product doesn't exist or has been removed."
          actionLabel="Back to Search"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  const allVariants = mockProducts.filter(
    (p) => p.normalizedProductName === product.normalizedProductName
  );

  const cheapest = allVariants.reduce((min, p) => (p.price < min.price ? p : min));
  const favorited = isFav(product.id);
  const savings = product.price - cheapest.price;

  const availConfig = {
    in_stock: { label: 'In Stock', cls: 'badge-green' },
    limited: { label: 'Limited Stock', cls: 'badge-yellow' },
    out_of_stock: { label: 'Out of Stock', cls: 'badge-red' },
  };
  const avail = availConfig[product.availability];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Left: Image + actions */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 overflow-hidden">
              {/* Image */}
              <div className="relative h-64 sm:h-72 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={avail.cls}>{avail.label}</span>
                </div>
              </div>

              <div className="p-5">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{getCategoryIcon(product.category)}</span>
                  <span className="category-badge">{product.category}</span>
                </div>

                {/* Name */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {product.productName}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  by {product.brand}
                  {product.size && <> · {product.size}</>}
                  {product.variant && <> · {product.variant}</>}
                </p>

                {/* Price highlight */}
                <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1">
                    at {product.sourceName}
                  </p>
                  <p className="price-large">{formatPriceWithSymbol(product.price)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">per {product.unit}</p>
                </div>

                {/* Store info */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <MapPin size={13} />
                    {product.location}
                  </div>
                  {product.trustRating && (
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{product.trustRating}/5</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  Updated {formatDate(product.lastUpdated)}
                </p>

                {/* Actions */}
                <div className="space-y-2.5">
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    <ExternalLink size={14} /> Visit Store
                  </a>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`btn-secondary w-full justify-center ${
                      favorited ? 'border-red-200 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100' : ''
                    }`}
                  >
                    <Heart size={14} className={favorited ? 'fill-current' : ''} />
                    {favorited ? 'Saved' : 'Save to Favorites'}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn-secondary justify-center">
                      <Share2 size={13} /> Share
                    </button>
                    {/* Future: price alert feature */}
                    <button
                      className="btn-secondary justify-center opacity-70 cursor-not-allowed"
                      title="Coming soon"
                      disabled
                    >
                      <Bell size={13} /> Alert
                    </button>
                  </div>
                </div>

                {/* Notify placeholder */}
                <div className="notify-bar mt-3 text-xs text-amber-800 dark:text-amber-300">
                  <span className="font-semibold">Coming soon:</span> Get notified when the price drops.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Comparison + specs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Savings highlight */}
            {savings > 0 && cheapest.id !== product.id && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    💰 Potential Savings
                  </p>
                  <p className="text-base text-emerald-800 dark:text-emerald-200">
                    You could save{' '}
                    <strong>{formatPriceWithSymbol(savings)}</strong> by purchasing
                    from <strong>{cheapest.sourceName}</strong> at{' '}
                    <strong>{formatPriceWithSymbol(cheapest.price)}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Price comparison */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Price Comparison
                </h2>
                <span className="badge-gray">{allVariants.length} seller{allVariants.length !== 1 ? 's' : ''}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                All stores offering this product, sorted by price
              </p>
              <PriceComparisonTable products={allVariants} cheapest={cheapest} />
            </div>

            {/* Product specs */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Product Information
              </h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: 'Category', value: product.category },
                  { label: 'Brand', value: product.brand },
                  { label: 'Unit', value: product.unit },
                  { label: 'Size', value: product.size || '—' },
                  { label: 'Variant', value: product.variant || '—' },
                  { label: 'Availability', value: product.availability.replace('_', ' ') },
                  ...(product.sku ? [{ label: 'SKU', value: product.sku }] : []),
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-gray-800 dark:text-white capitalize">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Price trend placeholder */}
            <div className="card p-6 border-dashed border-2 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-gray">Coming Soon</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Price History & Trend
              </h3>
              <p className="text-sm text-gray-400">
                Track how this product's price changes over time. Integrate with
                a scraper service and Supabase to enable this feature.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="section-title">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="product-card text-left group"
                >
                  <div className="h-36 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-0.5">
                      {prod.brand}
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {prod.productName}
                    </h3>
                    <p className="font-bold text-primary-600 dark:text-primary-400 text-sm">
                      {formatPriceWithSymbol(prod.price)}
                    </p>
                    <p className="text-[10px] text-gray-400">{prod.sourceName}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
