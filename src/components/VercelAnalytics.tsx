'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function VercelAnalytics() {
  // Only load Vercel Analytics when actually deployed to Vercel
  // This prevents 404 errors and MIME type issues in local production builds
  const isVercelEnv = process.env.VERCEL === '1';
  const isVercelUrl = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
  const shouldLoadAnalytics = isVercelEnv || isVercelUrl;

  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
