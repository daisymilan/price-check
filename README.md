# PriceCheck Philippines - Construction Materials Price Comparison App

A modern web application for comparing construction material prices across Philippine stores and suppliers.

## Features

✨ **Core Features**
- 🔍 Real-time price comparison across 10+ Philippine stores
- 📊 Grid and table view options for search results
- ❤️ Save favorite products for later comparison
- 🏷️ Filter and sort by price, brand, category, location
- 📍 Location-based filtering (Metro Manila, Cebu, Davao, etc.)
- 💾 Recent searches saved in local storage
- 🌙 Dark mode support
- 📱 Fully responsive mobile design
- 🚀 Fast, lightweight, production-ready code

### Supported Materials
- Paint & Coating
- Cement & Concrete
- Tiles & Stone
- Masonry & Blocks
- Steel & Structural
- Wood & Lumber
- Roofing & Cladding
- Plumbing Materials
- Electrical Materials
- Aggregates
- Doors & Windows
- Hardware & Tools

### Covered Stores
- Wilcon Depot
- CW Home Depot
- AllHome
- Handyman
- Ace Hardware Philippines
- Shopee Philippines
- Lazada Philippines
- SM Home
- Puregold Hardware
- Hardware Zone Davao

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Storage:** LocalStorage API

## Directory Structure

```
price-check/
├── public/                       # Static assets
├── src/
│   ├── components/
│   │   ├── common/              # Header, Footer, EmptyState, LoadingSkeleton
│   │   ├── search/              # SearchBar, FilterSidebar
│   │   └── product/             # ProductCard, PriceComparisonTable, CategoryGrid
│   ├── pages/                   # Full page components
│   │   ├── HomePage.tsx
│   │   ├── SearchResultsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   └── AboutPage.tsx
│   ├── data/
│   │   └── mockData.ts          # Mock product database (production: API)
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── hooks/
│   │   └── useAppHooks.ts       # Custom React hooks
│   ├── utils/
│   │   ├── searchUtils.ts       # Search and filter logic
│   │   ├── storageUtils.ts      # LocalStorage management
│   │   └── formatUtils.ts       # Display formatting
│   ├── styles/
│   │   ├── index.css            # Tailwind + custom CSS
│   │   └── App.css              # App-specific styles
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Clone the repository (or navigate to the project)**
   ```bash
   cd price-check
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - Hot reload is enabled - changes save instantly

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Usage Guide

### Searching for Products

1. **Homepage Search**: Enter material name (e.g., "1 gallon white paint", "Portland cement")
2. **Category Browse**: Click on category quick links to browse by type
3. **Advanced Filters**: Use the sidebar to filter by:
   - Price range
   - Brand
   - Store/Source
   - Location (Metro Manila, Cebu, Davao, etc.)
   - Product unit (gallon, bag, piece, etc.)

### Sorting Options
- **Most Relevant**: Default (best match)
- **Lowest Price**: Cheapest first
- **Highest Price**: Most expensive first
- **Newest**: Recently updated prices

### Saving & Comparing
- **Save Products**: Click the heart icon on any product
- **View Saved**: Go to Favorites page
- **Compare**: View price table with all sources side-by-side
- **Price Difference**: See exactly how much you'll save

## Data Model

Each product entry contains:
```typescript
{
  id: string;
  productName: string;
  normalizedProductName: string;  // For matching similar products
  category: string;
  brand: string;
  unit: string;
  variant?: string;
  size?: string;
  price: number;
  currency: string;               // PHP
  sourceName: string;             // Store name
  sourceUrl: string;
  imageUrl: string;
  location: string;               // Region/City
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  lastUpdated: string;
  sku?: string;
  trustRating?: number;           // 0-5 stars
}
```

## API Integration (Future)

The app is designed to easily connect to:

1. **Database**: Supabase or PostgreSQL
   - Replace `mockData.ts` with API calls
   - Add real-time price updates
   - User authentication

2. **Web Scrapers**: Collect prices from Philippine retailers
   - Store APIs (if available)
   - Custom scrapers for static sites
   - Real-time price monitoring

3. **Features to Add**:
   - User accounts with price history
   - Price drop notifications
   - Bulk product imports
   - Affiliate links
   - Admin dashboard for price management

### Integration Points (Marked in code)

Look for `// TODO: API Integration` comments:
- `src/data/mockData.ts` - Replace with API fetch
- `src/pages/SearchResultsPage.tsx` - Add real search
- `src/hooks/useAppHooks.ts` - Add async state

## Performance Optimizations

✅ Code splitting via Vite
✅ Image lazy loading
✅ Memoized components
✅ Tailwind CSS purging
✅ Production build minification

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Colors
Edit `tailwind.config.js` - modify the `primary` and `accent` colors

### Add More Products
Edit `src/data/mockData.ts`:
```typescript
export const mockProducts: ProductPrice[] = [
  // Add your products here
];
```

### Update Store List
Edit `src/data/mockData.ts` - modify `stores` and `philippineStores` arrays

### Change Currency/Locale
See `src/utils/formatUtils.ts` - modify `formatPrice()` function

## Project Status

✅ **Complete Features**
- Homepage with hero section
- Product search with filters
- Price comparison table
- Product detail page
- Favorites management
- Recent searches
- Dark mode
- Responsive design
- Category browsing
- Store information

🔄 **Future Enhancements**
- Real API integration
- User authentication
- Price history charts
- Price drop alerts
- Bulk product comparison
- Mobile app version
- Wishlist sharing
- Price predictions

## Development Notes

### Key Utilities

**Search Logic** (`searchUtils.ts`):
- `normalizeProductName()` - Match similar products
- `searchProducts()` - Main search with filters
- `getPriceStats()` - Calculate price ranges
- `groupProductsByNormalizedName()` - Group similar items

**Storage** (`storageUtils.ts`):
- `getFavorites()` / `addFavorite()`
- `getRecentSearches()` / `addRecentSearch()`
- `getTheme()` / `setTheme()`

**Formatting** (`formatUtils.ts`):
- `formatPrice()` / `formatPriceWithSymbol()` - PHP currency
- `formatDate()` - Relative dates
- `calculatePriceDifference()` - Savings calculation
- `getTrustRatingBadge()` - Star ratings
- `getAvailabilityColor()` - Status colors

### Custom Hooks

- `useSearch()` - Search state management
- `useFavorites()` - Favorites management
- `useRecentSearches()` - Recent searches
- `useTheme()` - Dark mode toggle
- `useLoadingState()` - Loading indicators

## Troubleshooting

**Q: Port 3000 is already in use**
```bash
npm run dev -- --port 3001
```

**Q: Dark mode not working**
- Check browser console for localStorage errors
- Clear cache and reload

**Q: Images not loading**
- Verify image URLs in `mockData.ts`
- Check browser network tab for 404s

**Q: Filters not working**
- Check that product categories match exactly
- Clear filters and try again

## License

MIT License - Free to use and modify

## Support

For issues or feature requests:
- Check existing code comments marked `TODO`
- Review the directory structure
- Check component props for customization options

## Contributors

Built with attention to Philippine market needs:
- Local store partnerships
- PHP currency formatting
- Regional location support
- Construction industry focus

---

**Made in the Philippines 🇵🇭**

*Helping Filipino builders, contractors, architects, and homeowners find the best construction material prices.*
