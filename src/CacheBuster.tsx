'use client';

import { useEffect, useState } from 'react';
import { getCacheBustId, clientCacheBust } from '@/lib/cache-bust';

interface CacheBusterProps {
  /** Enable debug logging */
  debug?: boolean;
  /** Force refresh CSS on mount */
  forceRefresh?: boolean;
  /** Force refresh favicons on mount */
  refreshFavicons?: boolean;
}

function CacheBuster({ 
  debug = false, 
  forceRefresh = false, 
  refreshFavicons = false 
}: CacheBusterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after client hydration
    setMounted(true);

    // Only run on client side after mounting
    if (typeof window === 'undefined') return;

    if (debug) {
      console.log('CacheBuster: Component mounted');
      console.log('CacheBuster: Cache info:', clientCacheBust.getInfo());
    }

    // Enhanced cache busting functionality
    const handleCacheBusting = () => {
      const cacheBustId = getCacheBustId();
      
      if (debug) {
        console.log('CacheBuster: Using cache bust ID:', cacheBustId);
      }

      // Refresh stylesheets if requested
      if (forceRefresh) {
        try {
          clientCacheBust.reloadStylesheets();
          
          if (debug) {
            console.log('CacheBuster: CSS cache cleared and stylesheets reloaded');
          }
        } catch (error) {
          if (debug) {
            console.warn('CacheBuster: Error updating stylesheets:', error);
          }
        }
      }

      // Refresh favicons if requested
      if (refreshFavicons) {
        try {
          clientCacheBust.reloadFavicons();
          
          if (debug) {
            console.log('CacheBuster: Favicons cache cleared and reloaded');
          }
        } catch (error) {
          if (debug) {
            console.warn('CacheBuster: Error updating favicons:', error);
          }
        }
      }
    };

    // Delay cache busting to ensure it happens after hydration
    const timer = setTimeout(() => {
      handleCacheBusting();
    }, 100);

    // Add global functions for debugging only after mounting
    if (debug) {
      try {
        (window as any).cacheBustInfo = clientCacheBust.getInfo();
        (window as any).cacheBustUtils = {
          reload: handleCacheBusting,
          reloadCSS: clientCacheBust.reloadStylesheets,
          reloadFavicons: clientCacheBust.reloadFavicons,
          getInfo: clientCacheBust.getInfo,
        };
        
        console.log('CacheBuster: Debug utilities available on window.cacheBustUtils');
      } catch (error) {
        if (debug) {
          console.warn('CacheBuster: Error setting global debug info:', error);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [debug, forceRefresh, refreshFavicons]);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return null; // This component doesn't render anything
}

export default CacheBuster;
export { CacheBuster };
