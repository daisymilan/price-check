# Setup & Installation Guide

## System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher (or yarn/pnpm)
- **OS**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd c:\Users\acer\Desktop\price-check
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

**Expected time**: 1-3 minutes depending on internet speed

### 3. Start Development Server

```bash
npm run dev
```

**Output should show**:
```
  VITE v[version] ready in [time] ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

The browser should automatically open at `http://localhost:3000`

### 4. Verify Installation

- Homepage loads with search bar
- Categories display properly
- Nav bar shows all menu items
- Dark mode toggle works
- Search functionality responds

## Development Workflow

### Hot Module Replacement (HMR)

Changes to files are automatically reflected in the browser without full reload:

```bash
# Just save files and see changes instantly
# Edit src/App.tsx, save, browser updates automatically
```

### Debug Mode

Open browser DevTools (F12) to:
- Check console for errors
- Inspect React components
- Monitor network requests
- Test localStorage in Application tab

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Import and add to Routes

Example:
```typescript
// src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page</div>;
}

// In App.tsx
import NewPage from './pages/NewPage';

// In <Routes>:
<Route path="/new" element={<NewPage />} />
```

## Building for Production

### Create Optimized Build

```bash
npm run build
```

**Output directory**: `dist/`
**Build time**: ~30 seconds

### Preview Production Build Locally

```bash
npm run preview
```

Opens at `http://localhost:4173`

### Build Output Analysis

- **JS bundles**: Minified and code-split
- **CSS**: Purged (unused styles removed)
- **Images**: Optimized
- **Size**: ~200-300 KB gzipped

## Deployment Options

### Option 1: Vercel (Recommended for Vite)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Option 4: Traditional Hosting

1. Run `npm run build`
2. Upload `dist/` folder contents to web server
3. Configure server to serve `index.html` for all routes

## Configuration Files Explained

### `vite.config.ts`
- Build and development settings
- Auto port detection
- HMR configuration

### `tsconfig.json`
- TypeScript compiler options
- Target ES2020
- Strict mode enabled

### `tailwind.config.js`
- Color palette customization
- Custom utilities
- Plugin configuration

### `package.json`
- Dependencies and versions
- Scripts (dev, build, preview)
- Metadata

## Troubleshooting

### "Port 3000 is already in use"

```bash
# Use different port
npm run dev -- --port 3001

# Or kill existing process
# Windows: taskkill /PID <pid> /F
# Mac/Linux: kill -9 <pid>
```

### "Module not found" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Or use clean cache
npm ci
```

### Dark mode not saving

Check browser localStorage is enabled:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Check for `pc_theme` entry

### Build fails with TypeScript errors

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Fix errors and rebuild
npm run build
```

### Hot reload not working

```bash
# Restart development server
# Ctrl+C to stop
npm run dev
```

## Environment Variables

Create `.env.local` for local overrides:

```bash
# .env.local (not committed to git)
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Tips

### Development

- Use `npm run dev` for HMR (best experience)
- Open DevTools → Performance tab to profile
- Check for unused imports

### Production

- Run `npm run build` to check bundle size
- Use Chrome DevTools → Lighthouse for audits
- Optimize image sizes before adding

## File Structure During Development

```
price-check/
├── dist/                    # Created after build
├── node_modules/            # Created after npm install
├── src/
│   └── ... (your source code)
├── .env.local              # Your local env vars
├── package-lock.json       # Lock file (keep committed)
└── ... other config files
```

## Common Commands Reference

```bash
# Development
npm run dev              # Start dev server with HMR
npm run dev -- --host   # Access from other machines

# Building
npm run build           # Production build
npm run preview         # Preview production build locally

# Maintenance
npm update              # Update packages
npm audit              # Check for vulnerabilities
npm audit fix          # Auto-fix vulnerabilities

# Windows-specific
npm install --legacy-peer-deps  # For compatibility issues
```

## IDE Setup (VS Code Recommended)

### Extensions to Install

1. **ES7+ React/Redux/React-Native snippets**
   - Publisher: dsznajder.es7-react-js-snippets

2. **Tailwind CSS IntelliSense**
   - Publisher: bradlc.vscode-tailwindcss

3. **TypeScript Vue Plugin (Volar)**
   - Publisher: Vue.volar

4. **ESLint**
   - Publisher: dbaeumer.vscode-eslint

### Settings (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. ✅ Verify it works
4. 📝 Review mock data in `src/data/mockData.ts`
5. 🎨 Customize colors in `tailwind.config.js`
6. 🚀 Deploy to production

## Support & Help

- Check `README.md` for feature documentation
- Look for `TODO: API Integration` comments in code
- Review component prop types in TypeScript interfaces
- Check error messages in browser console

## Security Checklist

Before deployment:
- [ ] Remove console.log() statements
- [ ] Check no sensitive data in code
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Add rate limiting (if using API)
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Add CSP headers
- [ ] Test on multiple browsers

---

**Ready to build!** 🚀

Start the development server and begin customizing the app for your needs.
