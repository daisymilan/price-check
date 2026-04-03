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

export default function PriceComparisonTable({ products, cheapest }: PriceComparisonTableProps) {
  const sorted = [...products].sort((a, b) => a.price - b.price);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="compare-table w-full">
        <thead>
          <tr>
            <th style={{ minWidth: 200 }}>Store</th>
            <th className="text-right" style={{ minWidth: 120 }}>Price</th>
            <th className="text-center" style={{ minWidth: 110 }}>vs. Best</th>
            <th className="text-center" style={{ minWidth: 90 }}>Rating</th>
            <th className="text-center" style={{ minWidth: 110 }}>Status</th>
            <th className="text-center" style={{ minWidth: 90 }}>Updated</th>
            <th className="text-center" style={{ minWidth: 60 }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((product) => {
            const isCheapest = cheapest && product.id === cheapest.id;
            return (
              <tr
                key={product.id}
                className={isCheapest ? 'cheapest-row' : ''}
              >
                {/* Store */}
                <td>
                  <div className="flex items-start gap-2">
                    {isCheapest && (
                      <CheckCircle
                        size={15}
                        className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {product.sourceName}
                      </p>
                      <p className="text-xs text-gray-400">{product.location}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="text-right">
                  <p
                    className={`text-base font-bold ${
                      isCheapest
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {formatPriceWithSymbol(product.price)}
                  </p>
                </td>

                {/* Diff */}
                <td className="text-center">
                  {isCheapest ? (
                    <span className="badge-green text-[10px]">Best Price</span>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatPriceDifference(product.price, cheapest?.price || product.price)}
                    </span>
                  )}
                </td>

                {/* Rating */}
                <td className="text-center">
                  {product.trustRating ? (
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.round(product.trustRating!)
                                ? 'text-amber-400'
                                : 'text-gray-200 dark:text-gray-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {getTrustRatingBadge(product.trustRating)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                {/* Availability */}
                <td className="text-center">
                  <span className={`badge text-[10px] ${getAvailabilityColor(product.availability)}`}>
                    {getAvailabilityBadge(product.availability)}
                  </span>
                </td>

                {/* Updated */}
                <td className="text-center">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(product.lastUpdated)}
                  </span>
                </td>

                {/* Link */}
                <td className="text-center">
                  <a
                    href={ensureHttp(product.sourceUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-all"
                    title="Open store"
                  >
                    <ExternalLink size={14} />
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
