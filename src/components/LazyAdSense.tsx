'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load AdSense components with proper error handling
const HeaderAd = dynamic(
  () => import('./AdSense').then(mod => {
    // Ensure the component exists before returning
    if (mod && mod.HeaderAd) {
      return { default: mod.HeaderAd };
    }
    // Return a fallback component if import fails
    return { default: () => null };
  }).catch(() => {
    // Return a fallback component if import fails
    return { default: () => null };
  }),
  {
    ssr: false, // Don't render on server side for better TTI
    loading: () => (
      <div 
        className="w-full h-[90px] bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center"
        style={{ minHeight: '90px', maxHeight: '90px' }}
      >
        <span className="text-xs text-gray-400">Advertisement</span>
      </div>
    ),
  }
);

const ContentAd = dynamic(
  () => import('./AdSense').then(mod => {
    // Ensure the component exists before returning
    if (mod && mod.ContentAd) {
      return { default: mod.ContentAd };
    }
    // Return a fallback component if import fails
    return { default: () => null };
  }).catch(() => {
    // Return a fallback component if import fails
    return { default: () => null };
  }),
  {
    ssr: false,
    loading: () => (
      <div 
        className="w-full max-w-4xl mx-auto h-[250px] bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center"
        style={{ minHeight: '250px', maxHeight: '250px' }}
      >
        <span className="text-xs text-gray-400">Advertisement</span>
      </div>
    ),
  }
);

export function LazyHeaderAd() {
  return (
    <div 
      className="w-full"
      style={{ minHeight: '90px', maxHeight: '90px', contain: 'layout' }}
    >
      <Suspense fallback={
        <div 
          className="w-full h-[90px] bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center"
          style={{ minHeight: '90px', maxHeight: '90px' }}
        >
          <span className="text-xs text-gray-400">Advertisement</span>
        </div>
      }>
        <HeaderAd />
      </Suspense>
    </div>
  );
}

export function LazyContentAd() {
  return (
    <div 
      className="w-full max-w-4xl mx-auto"
      style={{ minHeight: '250px', maxHeight: '250px', contain: 'layout' }}
    >
      <Suspense fallback={
        <div 
          className="w-full h-[250px] bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center"
          style={{ minHeight: '250px', maxHeight: '250px' }}
        >
          <span className="text-xs text-gray-400">Advertisement</span>
        </div>
      }>
        <ContentAd />
      </Suspense>
    </div>
  );
}
