/**
 * Price Comparison Table Component
 */

import { ExternalLink, CheckCircle } from 'lucide-react';
import { ProductPrice } from '../../types';
import {
  formatPriceWithSymbol,
  formatPriceDifference,
  formatDate,
  getTrustRatingBadge,
  getAvailabilityBadge,
  getAvailabilityColor,
  ensureHttp,
} from '../../utils/formatUtils';

interface PriceComparisonTableProps {
  products: ProductPrice[];
  cheapest?: ProductPrice | null;
}

export default function PriceComparisonTable({
  products,
  cheapest,
}: PriceComparisonTableProps) {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="compare-table w-full">
        <thead>
          <tr>
            <th className="text-left min-w-[200px]">Store</th>
            <th className="text-center min-w-[120px]">Price</th>
            <th className="text-center min-w-[100px]">Difference</th>
            <th className="text-center min-w-[100px]">Rating</th>
            <th className="text-center min-w-[120px]">Status</th>
            <th className="text-center min-w-[100px]">Updated</th>
            <th className="text-center min-w-[80px]">Link</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => {
            const isCheapest = cheapest && product.id === cheapest.id;
            return (
              <tr key={product.id} className={isCheapest ? 'bg-green-50 dark:bg-green-900' : ''}>
                {/* Store Name */}
                <td>
                  <div className="flex items-start gap-2">
                    {isCheapest && (
                      <CheckCircle
                        size={18}
                        className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {product.sourceName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.location}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="text-center">
                  <p
                    className={`text-lg font-bold ${
                      isCheapest
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {formatPriceWithSymbol(product.price)}
                  </p>
                </td>

                {/* Difference */}
                <td className="text-center">
                  {isCheapest ? (
                    <span className="badge badge-success">Cheapest</span>
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatPriceDifference(product.price, cheapest?.price || product.price)}
                    </span>
                  )}
                </td>

                {/* Rating */}
                <td className="text-center">
                  {product.trustRating ? (
                    <div className="flex flex-col items-center">
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.round(product.trustRating!)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {getTrustRatingBadge(product.trustRating)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">N/A</span>
                  )}
                </td>

                {/* Availability */}
                <td className="text-center">
                  <span className={`badge text-xs ${getAvailabilityColor(product.availability)}`}>
                    {getAvailabilityBadge(product.availability)}
                  </span>
                </td>

                {/* Last Updated */}
                <td className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(product.lastUpdated)}
                </td>

                {/* Link */}
                <td className="text-center">
                  <a
                    href={ensureHttp(product.sourceUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition"
                    title="Open store link"
                  >
                    <ExternalLink size={16} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
