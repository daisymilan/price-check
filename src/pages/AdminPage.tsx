/**
 * Admin Dashboard — scraper health, database stats, per-store breakdown
 */

import { Database, RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock, Package, ShoppingBag, Activity } from 'lucide-react';
import { getDbMetadata, getDbLastScraped, isDbPopulated, getAllProducts } from '../utils/dbUtils';
import { formatDate } from '../utils/formatUtils';

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: 'live' | 'seed' }) {
  return source === 'live' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
      <CheckCircle size={10} /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
      <AlertTriangle size={10} /> Seed
    </span>
  );
}

export default function AdminPage() {
  const meta = getDbMetadata();
  const lastScraped = getDbLastScraped();
  const populated = isDbPopulated();
  const products = getAllProducts();

  const uniqueStores = [...new Set(products.map((p) => p.sourceName))];
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Database size={20} className="text-primary-600 dark:text-primary-400" />
            <p className="section-label">System</p>
          </div>
          <h1 className="section-title mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Price database health, scraper status, and per-store product counts.
          </p>
        </div>

        {/* DB status banner */}
        {!populated ? (
          <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">
                Database not yet populated — using mock data
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">
                Run the scraper to populate the live database from all 19 stores.
              </p>
              <code className="block text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-3 py-2 rounded-lg font-mono">
                npm install &amp;&amp; npm run scrape
              </code>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              Database is populated.
              {lastScraped && (
                <> Last scraped: <strong>{formatDate(lastScraped)}</strong></>
              )}
            </p>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Package}
            label="Total Products"
            value={meta?.totalProducts ?? 0}
            sub={`${uniqueCategories.length} categories`}
          />
          <StatCard
            icon={ShoppingBag}
            label="Total Offers"
            value={meta?.totalOffers ?? products.length}
            sub={`across ${uniqueStores.length} stores`}
          />
          <StatCard
            icon={Activity}
            label="Scrapers"
            value={19}
            sub={
              meta?.scrapeReports
                ? `${meta.scrapeReports.filter((r) => r.source === 'live').length} live`
                : 'not yet run'
            }
          />
          <StatCard
            icon={Clock}
            label="Last Scrape"
            value={lastScraped ? formatDate(lastScraped) : '—'}
            sub={meta?.scrapeDuration ? `${(meta.scrapeDuration / 1000).toFixed(1)}s` : undefined}
          />
        </div>

        {/* Per-store breakdown */}
        <div className="card mb-8">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Products per Store</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {uniqueStores
              .map((store) => ({
                store,
                count: products.filter((p) => p.sourceName === store).length,
                report: meta?.scrapeReports?.find((r) => r.store === store),
              }))
              .sort((a, b) => b.count - a.count)
              .map(({ store, count, report }) => (
                <div key={store} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{store}</p>
                      {report && <SourceBadge source={report.source} />}
                    </div>
                    {report?.error && (
                      <p className="text-xs text-gray-400 truncate max-w-xs hidden lg:block" title={report.error}>
                        {report.error.slice(0, 50)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {report && (
                      <span className="text-xs text-gray-400">{report.durationMs}ms</span>
                    )}
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Scrape reports table */}
        {meta?.scrapeReports && meta.scrapeReports.length > 0 && (
          <div className="card mb-8">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">Last Scrape Report</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Store</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Source</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Products</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {meta.scrapeReports.map((r) => (
                    <tr key={r.store} className="border-b border-gray-50 dark:border-gray-800">
                      <td className="px-5 py-3">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{r.store}</p>
                          {r.error && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-0.5 truncate max-w-xs" title={r.error}>
                              <XCircle size={10} className="inline mr-1" />{r.error.slice(0, 60)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <SourceBadge source={r.source} />
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white">{r.productsFound}</td>
                      <td className="px-5 py-3 text-right text-gray-500 dark:text-gray-400">{r.durationMs}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* How to run scrapers */}
        <div className="card p-6 bg-gray-50/80 dark:bg-gray-800/50 border-dashed">
          <div className="flex items-start gap-3">
            <RefreshCw size={18} className="text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                Running the Scraper Pipeline
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">npm run scrape</span> — Full scrape of all 19 stores</p>
                <p><span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">npm run scrape:seed</span> — Populate DB from existing mock data</p>
                <p><span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">npm run scrape:check</span> — Dry run (counts only, no write)</p>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                GitHub Actions runs <code className="text-xs">npm run scrape</code> automatically every 24 hours via{' '}
                <code className="text-xs">.github/workflows/scrape.yml</code>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
