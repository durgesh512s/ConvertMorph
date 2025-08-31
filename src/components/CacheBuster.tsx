'use client';

import { useEffect } from 'react';
import { forceRefreshCSS, validateCacheBusting, getBuildInfo } from '@/lib/cache-bust';

interface CacheBusterProps {
  /** Enable debug logging */
  debug?: boolean;
  /** Force refresh CSS on mount */
  forceRefresh?: boolean;
}

export function CacheBuster({ debug = false, forceRefresh = false }: CacheBusterProps) {
  useEffect(() => {
    const handleCacheBusting = async () => {
      if (debug) {
        console.log('CacheBuster: Build info:', getBuildInfo());
      }

      // Check if cache busting is properly applied
      const isValid = validateCacheBusting();
      
      if (!isValid || forceRefresh) {
        if (debug) {
          console.log('CacheBuster: Invalid cache busting detected or force refresh requested');
        }
        
        await forceRefreshCSS();
        
        if (debug) {
          console.log('CacheBuster: CSS cache cleared and stylesheets reloaded');
        }
      }

      // Listen for visibility change to refresh CSS when tab becomes visible
      const handleVisibilityChange = async () => {
        if (!document.hidden) {
          // Check if we need to refresh CSS when tab becomes visible
          const currentValid = validateCacheBusting();
          if (!currentValid) {
            if (debug) {
              console.log('CacheBuster: Refreshing CSS on tab visibility change');
            }
            await forceRefreshCSS();
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Listen for focus events to refresh CSS
      const handleFocus = async () => {
        const currentValid = validateCacheBusting();
        if (!currentValid) {
          if (debug) {
            console.log('CacheBuster: Refreshing CSS on window focus');
          }
          await forceRefreshCSS();
        }
      };

      window.addEventListener('focus', handleFocus);

      // Cleanup
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
      };
    };

    handleCacheBusting();
  }, [debug, forceRefresh]);

  // Add a global function for manual cache clearing (useful for debugging)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).clearCSSCache = async () => {
        console.log('Manually clearing CSS cache...');
        await forceRefreshCSS();
        console.log('CSS cache cleared!');
      };

      (window as any).validateCacheBusting = () => {
        const isValid = validateCacheBusting();
        console.log('Cache busting validation:', isValid ? 'VALID' : 'INVALID');
        return isValid;
      };

      (window as any).getBuildInfo = getBuildInfo;
    }
  }, []);

  return null; // This component doesn't render anything
}
