/**
 * Footer Component
 */

import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 dark:bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3">PriceCheck</h3>
            <p className="text-gray-300 text-sm">
              Find the best prices for construction materials in the Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 hover:text-white transition">
                  Search Materials
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-300 hover:text-white transition">
                  Saved Items
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-3">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">support@pricecheck.ph</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">1-800-PRICECHECK</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">Metro Manila, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-300 text-sm">
              © {currentYear} PriceCheck Philippines. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 pt-4 border-t border-primary-800">
          <p>
            PriceCheck is a price comparison tool. Prices and availability are subject
            to change. Always verify directly with stores before making purchases. We
            are not affiliated with any retailers shown.
          </p>
        </div>
      </div>
    </footer>
  );
}
