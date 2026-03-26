/**
 * About / How It Works Page Component
 */

import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, TrendingDown, BarChart3 } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How PriceCheck Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The easiest way to find the best prices for construction materials in the
            Philippines. Compare prices, save money, and support local businesses.
          </p>
        </div>

        {/* How It Works Steps */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">4 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '1',
                icon: '🔍',
                title: 'Search',
                description: 'Enter the material or product you need',
              },
              {
                number: '2',
                icon: '📊',
                title: 'Compare',
                description: 'See prices from multiple Philippine stores',
              },
              {
                number: '3',
                icon: '💰',
                title: 'Save',
                description: 'Find the cheapest option instantly',
              },
              {
                number: '4',
                icon: '🛒',
                title: 'Buy',
                description: 'Purchase from your preferred store',
              },
            ].map((step, index) => (
              <div key={index} className="card card-dark p-6 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div
                  className="w-10 h-10 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3"
                >
                  {step.number}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Why Choose PriceCheck?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart3 className="text-primary-600 dark:text-primary-400" />,
                title: 'Real-Time Price Comparison',
                description:
                  'Compare prices from 10+ major Philippine stores including Wilcon, CW Home Depot, AllHome, Shopee, Lazada, and more.',
              },
              {
                icon: <TrendingDown className="text-green-600 dark:text-green-400" />,
                title: 'Save Up to 30%',
                description:
                  'Find the cheapest option for any construction material. Average savings is around 30% compared to highest price.',
              },
              {
                icon: <CheckCircle className="text-blue-600 dark:text-blue-400" />,
                title: 'Fast & Easy Search',
                description:
                  'Enter any product name and instantly see all available options with prices from different stores.',
              },
              {
                icon: <AlertCircle className="text-yellow-600 dark:text-yellow-400" />,
                title: 'Accurate Information',
                description:
                  'All prices are verified and updated regularly to ensure you have the most current information.',
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stores Covered */}
        <section className="mb-16 bg-white dark:bg-slate-800 rounded-xl p-8">
          <h2 className="section-title text-center mb-8">Stores We Compare</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              'Wilcon Depot',
              'CW Home Depot',
              'AllHome',
              'Handyman',
              'Ace Hardware',
              'Shopee Philippines',
              'Lazada Philippines',
              'SM Home',
              'Puregold Hardware',
              'Hardware Zone Davao',
            ].map((store, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:bg-primary-50 dark:hover:bg-primary-900 transition"
              >
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {store}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16 bg-white dark:bg-slate-800 rounded-xl p-8">
          <h2 className="section-title text-center mb-8">Categories We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '🎨 Paint & Coating',
              '🏗️ Cement & Concrete',
              '⬜ Tiles & Stone',
              '🧱 Masonry & Blocks',
              '🔩 Steel & Structural',
              '🪵 Wood & Lumber',
              '🏠 Roofing & Cladding',
              '🚿 Plumbing',
              '⚡ Electrical',
              '⛰️ Aggregates',
              '🚪 Doors & Windows',
              '🔧 Hardware & Tools',
            ].map((cat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"
              >
                <span className="text-2xl">{cat.split(' ')[0]}</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {cat.split(' ').slice(1).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 mb-16">
          <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>
              • PriceCheck is a price comparison tool. We do not sell directly but provide
              links to our partner stores.
            </li>
            <li>
              • Prices and availability shown are current as of the last update. Always
              verify with the store before purchase.
            </li>
            <li>
              • We are not affiliated with any retailers shown. We provide unbiased price
              information.
            </li>
            <li>
              • Shipping costs, taxes, and delivery fees may apply and should be verified
              with each store.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is PriceCheck free to use?',
                a: 'Yes, PriceCheck is completely free. We do not charge any fees for price comparisons.',
              },
              {
                q: 'How often are prices updated?',
                a: 'Prices are updated daily from our partner stores. We aim to provide the most current information.',
              },
              {
                q: 'Can I purchase directly from PriceCheck?',
                a: 'No, PriceCheck is a comparison tool. You click through to purchase from the stores directly.',
              },
              {
                q: 'Do you deliver or provide logistics?',
                a: 'No, each store handles their own delivery. Check with your chosen store for shipping options.',
              },
              {
                q: 'How do I know if a store is trustworthy?',
                a: 'We show trust ratings and reviews. We only list established, legitimate Philippine retailers.',
              },
              {
                q: 'Can I save products for later?',
                a: 'Yes, use the heart icon to save products to your favorites list for later comparison.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="card card-dark p-6 group cursor-pointer"
              >
                <summary className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  {faq.q}
                  <span className="ml-2 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 dark:from-primary-900 dark:to-primary-800 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Better Prices?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Start comparing construction material prices across Philippine stores now.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="bg-white dark:bg-slate-800 text-primary-700 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Start Comparing Now
          </button>
        </section>
      </div>
    </div>
  );
}
