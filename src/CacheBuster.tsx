'use client';

import { useEffect } from 'react';

interface CacheBusterProps {
  /** Enable debug logging */
  debug?: boolean;
  /** Force refresh CSS on mount */
  forceRefresh?: boolean;
}

function CacheBuster({ debug = false, forceRefresh = false }: CacheBusterProps) {
  useEffect(() => {
    if (debug) {
      console.log('CacheBuster: Component mounted');
    }

    // Simple cache busting functionality
    const handleCacheBusting = () => {
      if (typeof window === 'undefined') return;

      // Get cache bust ID from environment
      const cacheBustId = process.env.NEXT_PUBLIC_CACHE_BUST_ID || 'dev';
      
      if (debug) {
        console.log('CacheBuster: Cache bust ID:', cacheBustId);
      }

      // Add cache busting to stylesheets if needed
      if (forceRefresh) {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && !href.includes('/_next/static/')) {
            const cleanHref = href.split('?')[0] || href;
            const separator = cleanHref.includes('?') ? '&' : '?';
            const newHref = `${cleanHref}${separator}v=${cacheBustId}`;
            link.setAttribute('href', newHref);
          }
        });
        
        if (debug) {
          console.log('CacheBuster: CSS cache cleared and stylesheets reloaded');
        }
      }
    };

    handleCacheBusting();

    // Add global functions for debugging
    if (typeof window !== 'undefined' && debug) {
      (window as any).cacheBustInfo = {
        id: process.env.NEXT_PUBLIC_CACHE_BUST_ID || 'dev',
        environment: process.env.NODE_ENV || 'development',
      };
    }
  }, [debug, forceRefresh]);

  return null; // This component doesn't render anything
}

export default CacheBuster;
export { CacheBuster };
