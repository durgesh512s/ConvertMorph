'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the client component with no SSR to avoid hydration issues
const ToolsClient = dynamic(() => import('./ToolsClient'), { ssr: false });

function ToolsClientFallback() {
  return (
    <div className="space-y-8">
      <div className="sticky top-16 z-40 mb-8">
        <div className="backdrop-blur bg-white/70 dark:bg-gray-900/70 border rounded-2xl shadow-sm px-4 py-3 flex flex-col gap-3">
          <div className="relative max-w-md mx-auto w-full">
            <div className="w-full rounded-xl border px-4 py-3 pl-10 shadow-inner bg-white dark:bg-gray-800 dark:border-gray-700 animate-pulse h-12" />
          </div>
          <div className="flex justify-center">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse h-10 w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolsClientWrapper() {
  return (
    <Suspense fallback={<ToolsClientFallback />}>
      <ToolsClient />
    </Suspense>
  );
}
