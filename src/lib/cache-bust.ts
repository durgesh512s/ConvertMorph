/**
 * Client-side cache busting utilities
 */

// Get the cache bust ID from environment variables
export const getCacheBustId = (): string => {
  return process.env.NEXT_PUBLIC_CACHE_BUST_ID || 
         process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 8) || 
         'dev';
};

// Add cache busting parameter to URLs
export const addCacheBust = (url: string): string => {
  const cacheBustId = getCacheBustId();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${cacheBustId}`;
};

// Add cache busting to asset URLs
export const bustAssetUrl = (assetPath: string): string => {
  // Don't add cache busting to already hashed Next.js assets
  if (assetPath.includes('/_next/static/')) {
    return assetPath;
  }
  
  return addCacheBust(assetPath);
};

// Force reload stylesheets with cache busting
export const reloadStylesheets = (): void => {
  if (typeof window === 'undefined') return;
  
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && !href.includes('/_next/static/')) {
      const cleanHref = href.split('?')[0] || href;
      const newHref = addCacheBust(cleanHref);
      link.setAttribute('href', newHref);
    }
  });
};

// Get build information for debugging
export const getBuildInfo = () => {
  return {
    cacheBustId: getCacheBustId(),
    buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || 'unknown',
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    environment: process.env.NODE_ENV || 'development',
  };
};

// Check if assets are properly cache busted
export const validateCacheBusting = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const scripts = document.querySelectorAll('script[src]');
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  
  let hasValidCacheBusting = true;
  
  // Check scripts
  scripts.forEach((script) => {
    const src = script.getAttribute('src');
    if (src && !src.includes('/_next/static/') && !src.includes('?v=')) {
      console.warn('Script without cache busting:', src);
      hasValidCacheBusting = false;
    }
  });
  
  // Check stylesheets
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && !href.includes('/_next/static/') && !href.includes('?v=')) {
      console.warn('Stylesheet without cache busting:', href);
      hasValidCacheBusting = false;
    }
  });
  
  return hasValidCacheBusting;
};
