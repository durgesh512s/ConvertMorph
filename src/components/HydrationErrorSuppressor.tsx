'use client';

import { useEffect } from 'react';

/**
 * Global hydration error suppressor for production environments
 * This component intercepts and suppresses React Error #418 and similar hydration errors
 */
export function HydrationErrorSuppressor() {
  useEffect(() => {
    // Only run in production to suppress hydration errors
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Store original console.error
    const originalConsoleError = console.error;

    // Override console.error to filter out hydration errors
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || '';
      
      // Check if this is a hydration-related error
      const isHydrationError = 
        errorMessage.includes('Minified React error #418') ||
        errorMessage.includes('Hydration failed') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('server rendered HTML didn\'t match the client') ||
        errorMessage.includes('Warning: Text content did not match') ||
        errorMessage.includes('Warning: Expected server HTML to contain') ||
        errorMessage.includes('Warning: Did not expect server HTML to contain');

      // If it's a hydration error, log a warning instead of an error
      if (isHydrationError) {
        console.warn('Hydration mismatch suppressed in production:', errorMessage);
        return;
      }

      // For all other errors, use the original console.error
      originalConsoleError.apply(console, args);
    };

    // Store original window.onerror
    const originalWindowError = window.onerror;

    // Override window.onerror to catch unhandled hydration errors
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMessage = message?.toString() || '';
      
      // Check if this is a hydration-related error
      const isHydrationError = 
        errorMessage.includes('Minified React error #418') ||
        errorMessage.includes('Hydration failed') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('server rendered HTML didn\'t match the client');

      // If it's a hydration error, suppress it
      if (isHydrationError) {
        console.warn('Global hydration error suppressed:', errorMessage);
        return true; // Prevent default error handling
      }

      // For all other errors, use the original handler
      if (originalWindowError) {
        return originalWindowError(message, source, lineno, colno, error);
      }
      
      return false;
    };

    // Store original unhandledrejection handler
    const originalUnhandledRejection = window.onunhandledrejection;

    // Override unhandledrejection to catch promise-based hydration errors
    window.onunhandledrejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.toString() || '';
      
      // Check if this is a hydration-related error
      const isHydrationError = 
        errorMessage.includes('Minified React error #418') ||
        errorMessage.includes('Hydration failed') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('server rendered HTML didn\'t match the client');

      // If it's a hydration error, suppress it
      if (isHydrationError) {
        console.warn('Promise-based hydration error suppressed:', errorMessage);
        event.preventDefault();
        return;
      }

      // For all other errors, use the original handler
      if (originalUnhandledRejection) {
        originalUnhandledRejection.call(window, event);
      }
    };

    // Cleanup function to restore original handlers
    return () => {
      console.error = originalConsoleError;
      window.onerror = originalWindowError;
      window.onunhandledrejection = originalUnhandledRejection;
    };
  }, []);

  // This component doesn't render anything
  return null;
}

export default HydrationErrorSuppressor;
