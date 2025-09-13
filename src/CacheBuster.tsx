'use client';

import { useEffect, useState } from 'react';

interface CacheBusterProps {
  /** Enable debug logging */
  debug?: boolean;
  /** Force refresh CSS on mount */
  forceRefresh?: boolean;
}

function CacheBuster({ debug = false, forceRefresh = false }: CacheBusterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after client hydration
    setMounted(true);

    if (debug) {
      console.log('CacheBuster: Component mounted');
    }

    // Simple cache busting functionality
    const handleCacheBusting = () => {
      if (typeof window === 'undefined') return;

      // Get cache bust ID from environment - use consistent fallback
      const cacheBustId = process.env.NEXT_PUBLIC_CACHE_BUST_ID || 'static';
      
      if (debug) {
        console.log('CacheBuster: Cache bust ID:', cacheBustId);
      }

      // Add cache busting to stylesheets if needed
      if (forceRefresh) {
        try {
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
        } catch (error) {
          if (debug) {
            console.warn('CacheBuster: Error updating stylesheets:', error);
          }
        }
      }
    };

    // Delay cache busting to ensure it happens after hydration
    const timer = setTimeout(() => {
      handleCacheBusting();
    }, 100);

    // Add global functions for debugging only after mounting
    if (typeof window !== 'undefined' && debug) {
      try {
        (window as any).cacheBustInfo = {
          id: process.env.NEXT_PUBLIC_CACHE_BUST_ID || 'static',
          environment: process.env.NODE_ENV || 'development',
        };
      } catch (error) {
        if (debug) {
          console.warn('CacheBuster: Error setting global debug info:', error);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [debug, forceRefresh]);

  return null; // This component doesn't render anything
}

export default CacheBuster;
export { CacheBuster };
