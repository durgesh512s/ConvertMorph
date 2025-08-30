'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load the Footer component
const Footer = dynamic(() => import('./Footer').then(mod => ({ default: mod.Footer })), {
  ssr: false, // Don't render on server side for better TTI
  loading: () => (
    <div className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 h-64 animate-pulse" />
  ),
});

export function LazyFooter() {
  return (
    <Suspense fallback={<div className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 h-64 animate-pulse" />}>
      <Footer />
    </Suspense>
  );
}
