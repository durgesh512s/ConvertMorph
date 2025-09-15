/**
 * Centralized cache busting utilities
 * Provides consistent cache busting across the application
 */

// Generate a consistent cache bust ID based on build information
export function getCacheBustId(): string {
  // Production: Use git commit SHA (available in Vercel/GitHub Actions)
  const gitSha = process.env.VERCEL_GIT_COMMIT_SHA || 
                 process.env.GITHUB_SHA || 
                 process.env.CI_COMMIT_SHA;
  
  if (gitSha) {
    return gitSha.substring(0, 8);
  }
  
  // Local development: Use environment variable
  const envCacheBustId = process.env.NEXT_PUBLIC_CACHE_BUST_ID;
  if (envCacheBustId) {
    return envCacheBustId;
  }
  
  // Final fallback for edge cases
  return Date.now().toString().substring(-8);
}

// Add cache busting parameter to URLs
export function addCacheBust(url: string, customId?: string): string {
  const id = customId || getCacheBustId();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${id}`;
}

// Remove cache busting parameters from URLs
export function removeCacheBust(url: string): string {
  return url.split('?')[0] || url;
}

// Check if a URL already has cache busting
export function hasCacheBust(url: string): boolean {
  return url.includes('?v=') || url.includes('&v=');
}

// Update cache busting on existing URLs
export function updateCacheBust(url: string, newId?: string): string {
  const cleanUrl = removeCacheBust(url);
  return addCacheBust(cleanUrl, newId);
}

// Client-side cache busting utilities
export const clientCacheBust = {
  // Clear browser cache for specific resources
  clearResourceCache: (selector: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const href = element.getAttribute('href');
        const src = element.getAttribute('src');
        
        if (href && !href.includes('/_next/static/')) {
          element.setAttribute('href', updateCacheBust(href));
        }
        
        if (src && !src.includes('/_next/static/')) {
          element.setAttribute('src', updateCacheBust(src));
        }
      });
    } catch (error) {
      console.warn('Error clearing resource cache:', error);
    }
  },

  // Force reload of stylesheets
  reloadStylesheets: () => {
    clientCacheBust.clearResourceCache('link[rel="stylesheet"]');
  },

  // Force reload of favicons
  reloadFavicons: () => {
    clientCacheBust.clearResourceCache('link[rel="icon"], link[rel="apple-touch-icon"]');
  },

  // Get current cache bust info
  getInfo: () => ({
    id: getCacheBustId(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
  }),
};
