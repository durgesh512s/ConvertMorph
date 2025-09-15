'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function VercelAnalytics() {
  // Only load Vercel Analytics in production or when explicitly enabled
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercelEnv = process.env.VERCEL === '1';
  const shouldLoadAnalytics = isProduction || isVercelEnv;

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
