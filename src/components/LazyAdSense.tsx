'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load AdSense components
const HeaderAd = dynamic(() => import('./AdSense').then(mod => ({ default: mod.HeaderAd })), {
  ssr: false, // Don't render on server side for better TTI
  loading: () => (
    <div className="w-full h-[90px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
});

const ContentAd = dynamic(() => import('./AdSense').then(mod => ({ default: mod.ContentAd })), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto h-[250px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
});

export function LazyHeaderAd() {
  return (
    <Suspense fallback={<div className="w-full h-[90px] bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
      <HeaderAd />
    </Suspense>
  );
}

export function LazyContentAd() {
  return (
    <Suspense fallback={<div className="w-full max-w-4xl mx-auto h-[250px] bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
      <ContentAd />
    </Suspense>
  );
}
