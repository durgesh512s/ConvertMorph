# Cache Busting Solution for ConvertMorph

## Problem Solved

This solution addresses the stale cache problem where mobile and desktop browsers were loading old cached CSS/JS bundles instead of new ones after deployment, causing the UI to look broken until browsing history was cleared.

## Solution Overview

The implemented cache busting strategy uses a multi-layered approach:

1. **Proper Cache Headers**: Different cache strategies for different asset types
2. **Build-time Cache Busting**: Automatic generation of unique build IDs
3. **Asset Versioning**: Automatic versioning of static assets
4. **Client-side Utilities**: Tools for manual cache busting when needed

## Implementation Details

### 1. Next.js Configuration (`next.config.ts`)

**Cache Headers Strategy:**
- **Static Assets** (`/_next/static/*`, `/static/*`): Long cache (1 year) with `immutable` flag
- **Images & Fonts**: Long cache (1 year) with `immutable` flag  
- **API Routes**: No cache (`no-cache, no-store, must-revalidate`)
- **HTML Pages**: Short cache with revalidation (`max-age=0, must-revalidate`)

**Build ID Generation:**
- Uses Git commit SHA when available (Vercel deployment)
- Falls back to timestamp-based hash for local builds
- Ensures unique build IDs for each deployment

### 2. Vercel Configuration (`vercel.json`)

Complementary cache headers that work with Next.js configuration:
- Static assets get proper long-term caching
- Removes conflicting cache headers from previous configuration

### 3. Cache Busting Script (`scripts/cache-bust.mjs`)

**Automatic Build-time Cache Busting:**
- Generates unique cache bust ID using Git SHA or timestamp
- Updates `.env.local` with `NEXT_PUBLIC_CACHE_BUST_ID`
- Updates `manifest.webmanifest` version
- Runs automatically before each build (`prebuild` script)

**Usage:**
```bash
npm run cache-bust  # Manual execution
npm run build       # Automatic execution via prebuild
```

### 4. Client-side Utilities (`src/lib/cache-bust.ts`)

**Available Functions:**
- `getCacheBustId()`: Get current cache bust ID
- `addCacheBust(url)`: Add cache busting parameter to URLs
- `bustAssetUrl(assetPath)`: Smart asset URL cache busting
- `reloadStylesheets()`: Force reload stylesheets with cache busting
- `getBuildInfo()`: Get build information for debugging
- `validateCacheBusting()`: Check if assets are properly cache busted

**Example Usage:**
```typescript
import { addCacheBust, getBuildInfo } from '@/lib/cache-bust';

// Add cache busting to a URL
const cachedUrl = addCacheBust('/api/data');

// Get build information
const buildInfo = getBuildInfo();
console.log('Cache Bust ID:', buildInfo.cacheBustId);
```

## How It Works

### During Development
1. Cache busting script generates a development ID
2. Assets are served with appropriate cache headers
3. Next.js handles automatic asset versioning

### During Deployment
1. **Pre-build**: Cache busting script runs automatically
2. **Build ID**: Uses Git commit SHA from Vercel environment
3. **Asset Hashing**: Next.js generates unique hashes for chunks
4. **Cache Headers**: Proper headers ensure optimal caching strategy

### Browser Behavior
- **Static Assets**: Cached for 1 year but with unique URLs per build
- **HTML Pages**: Always revalidated to check for new versions
- **API Responses**: Never cached to ensure fresh data

## Cache Strategy Breakdown

| Asset Type | Cache Duration | Strategy | Reason |
|------------|---------------|----------|---------|
| `/_next/static/*` | 1 year | Immutable | Next.js auto-hashes these files |
| `/static/*` | 1 year | Immutable | Manual static assets with versioning |
| Images/Fonts | 1 year | Immutable | Rarely change, can be versioned |
| HTML Pages | 0 seconds | Revalidate | Always check for new versions |
| API Routes | No cache | No store | Dynamic data, always fresh |

## Benefits

1. **Eliminates Stale Cache Issues**: Users always get the latest assets
2. **Optimal Performance**: Long-term caching for static assets
3. **Automatic Deployment**: No manual intervention required
4. **Debug-Friendly**: Build information available for troubleshooting
5. **Flexible**: Can be extended for specific use cases

## Monitoring & Debugging

### Check Current Cache Bust ID
```typescript
import { getBuildInfo } from '@/lib/cache-bust';
console.log(getBuildInfo());
```

### Validate Cache Busting
```typescript
import { validateCacheBusting } from '@/lib/cache-bust';
const isValid = validateCacheBusting();
```

### Browser DevTools
- Check Network tab for proper cache headers
- Look for `X-Build-ID` header in responses
- Verify asset URLs contain version parameters

## Environment Variables

- `NEXT_PUBLIC_CACHE_BUST_ID`: Current cache bust ID (auto-generated)
- `VERCEL_GIT_COMMIT_SHA`: Git commit SHA (Vercel deployment)
- `GITHUB_SHA`: Git commit SHA (GitHub Actions)

## Troubleshooting

### Issue: Assets Still Cached
1. Check if build script ran successfully
2. Verify `.env.local` contains `NEXT_PUBLIC_CACHE_BUST_ID`
3. Check browser Network tab for proper headers

### Issue: Build Fails
1. Ensure `scripts/cache-bust.mjs` is executable
2. Check Node.js version compatibility
3. Verify file permissions

### Issue: Cache Headers Not Applied
1. Check Vercel deployment logs
2. Verify `next.config.ts` syntax
3. Test locally with `npm run build && npm start`

## Future Enhancements

1. **Service Worker Integration**: Update service worker cache on new builds
2. **CDN Integration**: Extend cache busting to CDN assets
3. **Analytics**: Track cache hit/miss rates
4. **A/B Testing**: Different cache strategies for different user groups

## Migration Notes

If migrating from the previous aggressive no-cache strategy:
1. Users may need to hard refresh once after deployment
2. Monitor Core Web Vitals for performance improvements
3. Check analytics for reduced server load

This solution provides a robust, production-ready cache busting strategy that eliminates stale cache issues while maintaining optimal performance.
