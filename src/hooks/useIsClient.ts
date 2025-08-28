'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to safely check if code is running on the client side
 * Prevents hydration mismatches by returning false during SSR
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}
