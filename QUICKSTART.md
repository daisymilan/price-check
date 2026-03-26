# Quick Start Checklist

## ✅ Before You Start

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Terminal/Command prompt ready
- [ ] Text editor or IDE open

## 🚀 Getting Started (5 minutes)

### Step 1: Install Dependencies (2 min)
```bash
cd c:\Users\acer\Desktop\price-check
npm install
```

### Step 2: Start Dev Server (1 min)
```bash
npm run dev
```

### Step 3: Open in Browser (1 min)
- Browser should open automatically at `http://localhost:3000`
- If not, manually go to that URL
- You should see the PriceCheck homepage

### Step 4: Test Key Features (1 min)
- [ ] Search for "paint" - see results
- [ ] Toggle dark mode (moon icon)
- [ ] Click on a product card
- [ ] Try filters on search results
- [ ] Add to favorites (heart icon)
- [ ] Go to Favorites page

## 📁 Project File Locations

| Purpose | Path |
|---------|------|
| Product Data | `src/data/mockData.ts` |
| Home Page | `src/pages/HomePage.tsx` |
| Search Page | `src/pages/SearchResultsPage.tsx` |
| Product Detail | `src/pages/ProductDetailPage.tsx` |
| Components | `src/components/` |
| Styles | `src/styles/` |
| Config | `tailwind.config.js` |

## 🎨 Quick Customizations

### Change App Colors
Edit `tailwind.config.js`:
```javascript
primary: {
  700: '#your-color-here',
  // ... other shades
}
```

### Add More Products
Edit `src/data/mockData.ts`:
```typescript
export const mockProducts: ProductPrice[] = [
  // Add your products here
];
```

### Update Store List
Edit `src/data/mockData.ts`:
```typescript
const philippineStores = [
  // Add or modify stores
];
```

### Change App Name
1. Edit `index.html` - `<title>` tag
2. Edit `src/components/common/Header.tsx` - "PriceCheck" text
3. Edit README.md

## 🔧 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📱 Test Responsive Design

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile: 375px (iPhone)
   - Tablet: 768px (iPad)
   - Desktop: 1920px

## 🌙 Dark Mode Testing

1. Click moon icon in header
2. Verify all pages work in dark mode
3. Check localStorage saved the preference

## 🔍 Feature Checklist

- [ ] **Search Works**: Type "paint" and see results
- [ ] **Filters Work**: Filter by price, brand, store
- [ ] **Sorting Works**: Sort by lowest price
- [ ] **View Toggle**: Switch between grid and table view
- [ ] **Product Detail**: Click product to see full details
- [ ] **Price Table**: See all store prices in table
- [ ] **Favorites**: Save items, view favorites page
- [ ] **Recent Searches**: Recent searches appear
- [ ] **Categories**: Category links navigate correctly
- [ ] **Dark Mode**: Toggle works on all pages
- [ ] **Mobile**: All features work on mobile
- [ ] **Links**: Store links open correctly

## 📊 Mock Data Included

**Products**: 30+ construction materials  
**Stores**: 10+ Philippine retailers  
**Categories**: 12 material types  
**Locations**: Metro Manila, Cebu, Davao, and more

## 🚫 Known Limitations (MVP)

- Mock data only (no real database yet)
- No user authentication
- No actual payment/checkout
- No email notifications
- No price history
- No user reviews/ratings

These are planned for Phase 2! 💡

## 📚 Learn More

- **Full Setup Guide**: See `SETUP.md`
- **Features & Documentation**: See `README.md`
- **Code Comments**: Look for `TODO: API Integration` comments
- **TypeScript Types**: Check `src/types/index.ts`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Use `npm run dev -- --port 3001` |
| Dependencies error | Run `npm install` again |
| Module not found | Clear `node_modules/` and reinstall |
| Dark mode not saving | Check browser localStorage enabled |
| Build fails | Run `npm run build` to see errors |

## 🎯 Next Steps

1. ✅ Get app running
2. ✅ Explore all pages
3. 📝 Review `src/data/mockData.ts` 
4. 🎨 Customize colors/branding
5. 📦 Fill with your products
6. 🚀 Deploy to production

## 📞 Need Help?

Check these files:
- `SETUP.md` - Detailed installation
- `README.md` - Full feature documentation
- `src/types/index.ts` - Data structure
- Code comments in components

## ✨ Pro Tips

- Use `npm run dev` during development (hot reload)
- Check `src/data/mockData.ts` to understand data structure
- Look at `src/hooks/useAppHooks.ts` for state management examples
- Use browser DevTools to inspect components
- Dark mode preference saved in localStorage

---

**You're all set!** 🎉

Run `npm run dev` and start building your price comparison app!
