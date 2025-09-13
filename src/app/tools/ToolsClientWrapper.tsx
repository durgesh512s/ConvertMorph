'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR to avoid hydration issues
const ToolsClient = dynamic(() => import('./ToolsClient'), { ssr: false });

export default function ToolsClientWrapper() {
  return <ToolsClient />;
}
