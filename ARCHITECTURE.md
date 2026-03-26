# Project Structure & Architecture

## Complete Directory Tree

```
price-check/
│
├── public/                          # Static assets (favicon, etc.)
│   └── (add favicon here)
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx          # Navigation bar with logo, menu, dark toggle
│   │   │   ├── Footer.tsx          # Footer with links and info
│   │   │   ├── EmptyState.tsx      # Reusable empty state component
│   │   │   └── LoadingSkeleton.tsx # Loading placeholder UI
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx       # Search input with recent searches dropdown
│   │   │   └── FilterSidebar.tsx   # Filters: price, brand, store, location
│   │   │
│   │   └── product/
│   │       ├── ProductCard.tsx     # Individual product card (grid view)
│   │       ├── PriceComparisonTable.tsx  # Price table (table view)
│   │       └── CategoryGrid.tsx    # Quick category navigation
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            # Homepage with hero section
│   │   ├── SearchResultsPage.tsx   # Search with filters and results
│   │   ├── ProductDetailPage.tsx   # Individual product details
│   │   ├── FavoritesPage.tsx       # Saved products list
│   │   └── AboutPage.tsx           # How it works + FAQs
│   │
│   ├── data/
│   │   └── mockData.ts             # 30+ mock products (replace with API)
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces and types
│   │
│   ├── hooks/
│   │   └── useAppHooks.ts          # Custom React hooks
│   │                               #   - useSearch()
│   │                               #   - useFavorites()
│   │                               #   - useRecentSearches()
│   │                               #   - useTheme()
│   │                               #   - useLoadingState()
│   │
│   ├── utils/
│   │   ├── searchUtils.ts          # Search, filter, normalization logic
│   │   ├── storageUtils.ts         # LocalStorage management
│   │   └── formatUtils.ts          # Currency, date, color formatting
│   │
│   ├── styles/
│   │   ├── index.css               # Tailwind imports + custom CSS
│   │   └── App.css                 # App-specific component styles
│   │
│   ├── App.tsx                     # Main app with router
│   └── main.tsx                    # React entry point
│
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript for build tools
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
│
├── README.md                       # Full documentation
├── SETUP.md                        # Detailed setup instructions
├── QUICKSTART.md                   # Quick start guide
├── ARCHITECTURE.md                 # This file (structure overview)
└── PROJECT_SUMMARY.md              # Features & implementation notes
```

## Component Architecture

### Component Hierarchy

```
App
├── Header
│   ├── Logo/Brand
│   ├── Navigation Menu
│   ├── Favorites Button
│   ├── Theme Toggle
│   └── Mobile Menu
│
├── Main Routes
│   ├── HomePage
│   │   ├── Hero Section
│   │   ├── SearchBar
│   │   ├── Recent Searches
│   │   ├── CategoryGrid
│   │   ├── Featured Products
│   │   └── CTA Sections
│   │
│   ├── SearchResultsPage
│   │   ├── Sticky SearchBar
│   │   ├── Results Grid (or Table)
│   │   │   └── ProductCard (×n)
│   │   └── FilterSidebar
│   │       ├── Sort Options
│   │       ├── Category Filter
│   │       ├── Price Range Slider
│   │       ├── Brand Filter
│   │       ├── Store Filter
│   │       └── Location Filter
│   │
│   ├── ProductDetailPage
│   │   ├── Product Image
│   │   ├── Product Info
│   │   ├── PriceComparisonTable
│   │   ├── Related Products
│   │   └── Store Information
│   │
│   ├── FavoritesPage
│   │   └── Saved Items List
│   │       └── Favorite Item (×n)
│   │
│   └── AboutPage
│       ├── How It Works
│       ├── Features Section
│       ├── Stores Covered
│       ├── Categories Covered
│       ├── FAQ Section
│       └── CTA Section
│
└── Footer
    ├── Links Section
    ├── Contact Info
    └── Disclaimer
```

## Data Flow Architecture

```
User Input
    ↓
[SearchBar Component]
    ↓
useSearch Hook
    ↓
searchUtils.searchProducts()
    ↓
[FilterSidebar]
    ↓
FilteredResults
    ↓
[ProductCard] / [PriceComparisonTable]
    ↓
Display Results
```

## State Management Flow

```
App State (React Hooks)
├── useSearch({
│   ├── filters (SearchFilters)
│   ├── results (SearchResult)
│   ├── isLoading (boolean)
│   └── methods: performSearch(), resetSearch()
│
├── useFavorites({
│   ├── favorites (FavoriteItem[])
│   ├── methods: toggleFavorite(), isFav()
│
├── useRecentSearches({
│   ├── recentSearches (RecentSearch[])
│   └── methods: addSearch(), removeSearch()
│
└── useTheme({
    ├── theme ('light' | 'dark')
    └── toggleTheme()
```

## Data Model Relationships

```
ProductPrice
├── id: string (unique)
├── productName: string
├── normalizedProductName: string (for grouping)
├── category: string
├── brand: string
├── unit: string
├── variant?: string
├── size?: string
├── price: number
├── currency: 'PHP'
├── sourceName: string (Store reference)
├── sourceUrl: string
├── imageUrl: string
├── location: string (Region)
├── availability: enum
├── lastUpdated: ISO date
├── sku?: string
└── trustRating?: number (0-5)

FavoriteItem
├── id: string (ProductPrice.id)
├── productName: string
├── imageUrl: string
├── brand: string
├── category: string
├── price: number
├── source: string
└── savedAt: ISO date

SearchFilters
├── query: string
├── category?: string
├── brand?: string
├── minPrice?: number
├── maxPrice?: number
├── source?: string
├── location?: string
├── unit?: string
└── sortBy?: enum ('lowest_price' | 'highest_price' | 'newest' | 'most_relevant')
```

## Utility Functions Organization

### searchUtils.ts
- `normalizeProductName()` - Match similar products
- `searchProducts()` - Main search with filters
- `groupProductsByNormalizedName()` - Group variants
- `getUniqueBrands()` - Extract brands
- `getUniqueCategories()` - Extract categories
- `getUniqueSources()` - Extract stores
- `getUniqueLocations()` - Extract regions
- `getPriceStats()` - Calculate min/max/avg price

### storageUtils.ts
- `getFavorites()` - Load favorites
- `addFavorite()` - Save to favorites
- `removeFavorite()` - Remove from favorites
- `isFavorited()` - Check if favorited
- `getRecentSearches()` - Load history
- `addRecentSearch()` - Save search
- `removeRecentSearch()` - Delete from history
- `getTheme()` - Load theme preference
- `setTheme()` - Save theme preference
- `toggleTheme()` - Switch theme

### formatUtils.ts
- `normalizeProductName()` - Normalize text
- `formatPrice()` - Format to PHP currency
- `formatPriceWithSymbol()` - Add ₱ symbol
- `getImageUrl()` - Handle image URLs
- `formatDate()` - Relative dates
- `truncateText()` - Text truncation
- `getTrustRatingBadge()` - Rating labels
- `getAvailabilityBadge()` - Stock status
- `getAvailabilityColor()` - Status colors
- `calculatePriceDifference()` - Savings calc
- `formatPriceDifference()` - Display savings
- `getLocationBadge()` - Location labels
- `getCategoryIcon()` - Category emoji
- `ensureHttp()` - URL validation

## CSS Architecture

### Tailwind Setup
- **Framework**: Tailwind CSS v3
- **Colors**: Custom primary (slate) and accent (amber)
- **Extensions**: Custom utilities for cards, badges, tables
- **Dark Mode**: Class-based (`dark:`)
- **Responsive**: Mobile-first approach

### Custom CSS (@/styles/App.css)
- Hero section styling
- Card layouts
- Filter sidebar
- Price comparison tables
- Empty state components
- Loading skeletons
- Alert messages
- Animations and transitions

### Theme Colors
```
Primary (Slate):
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

Accent (Amber):
- 50, 100, 200, 300, 400, 500, 600

Semantic:
- Green (in-stock)
- Yellow (limited)
- Red (out-of-stock)
- Blue (info)
```

## Routing Structure

```
/               → HomePage
├── /search     → SearchResultsPage (with ?q, ?category params)
├── /product/:id → ProductDetailPage
├── /favorites  → FavoritesPage
├── /about      → AboutPage
└── *          → Redirect to /
```

## Storage Structure (localStorage)

```
browser localStorage
├── pc_favorites: JSON string
│   └── FavoriteItem[]
│
├── pc_recent_searches: JSON string
│   └── RecentSearch[]
│
└── pc_theme: 'light' | 'dark'
```

## Build Output Structure

```
dist/ (after npm run build)
├── index.html       # HTML entry
├── assets/
│   ├── index-[hash].js    # Main bundle
│   └── index-[hash].css   # Styles
└── vite.svg               # Logo
```

## Performance Optimizations

### Code Splitting
- Each page lazy-loaded with React Router
- Component `import()` optimization

### Asset Optimization
- Images via Unsplash URLs (no local optimization needed)
- CSS purged by Tailwind (unused styles removed)
- JS minified and gzipped

### Runtime Performance
- Memoized components in ProductCard
- useCallback for expensive functions
- LocalStorage for instant favorites/searches
- Debounced filter updates

## Security Considerations

✅ **Implemented**
- TypeScript for type safety
- Input validation in search
- XSS prevention (React escaping)
- CSRF protection via routes
- No sensitive data in code

⚠️ **For Production**
- Add rate limiting
- Implement CORS properly
- Use HTTPS only
- Add CSP headers
- Validate API responses
- Authentication for user features

## Testing Structure (Planned)

```
__tests__/
├── components/
│   ├── ProductCard.test.tsx
│   ├── SearchBar.test.tsx
│   └── FilterSidebar.test.tsx
├── utils/
│   ├── searchUtils.test.ts
│   ├── formatUtils.test.ts
│   └── storageUtils.test.ts
├── hooks/
│   └── useAppHooks.test.ts
└── pages/
    └── SearchResultsPage.test.tsx
```

## API Integration Points

Future API calls will replace:

1. **mockData.ts** → Backend API
   ```
   GET /api/products
   GET /api/products?search=paint
   GET /api/products?category=paint
   ```

2. **searchUtils.ts** → Server-side search
   ```
   POST /api/search
   { query, filters, sort }
   ```

3. **storageUtils.ts** → User API
   ```
   GET /api/user/favorites
   POST /api/user/favorites
   GET /api/user/recent-searches
   ```

## Environment Setup

```
.env.local (ignore in git)
├── VITE_API_URL=http://localhost:3001
├── VITE_APP_NAME=PriceCheck Philippines
└── VITE_DEBUG=false
```

## Development Server Config

```
vite.config.ts
├── Port: 3000
├── Auto-open browser: true
├── HMR: enabled
└── React Fast Refresh: enabled
```

---

This architecture is designed to be:
- **Scalable**: Easy to add new features
- **Maintainable**: Clear separation of concerns
- **Type-Safe**: Full TypeScript support
- **Performance**: Optimized for production
- **User-Friendly**: Intuitive component structure

All comments in code marked `TODO: API Integration` indicate where to connect a real backend.
