'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const metrics: PerformanceMetrics = {};

    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            const fidEntry = entry as any; // PerformanceEventTiming
            metrics.fid = fidEntry.processingStart - fidEntry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            break;
        }
      }
    });

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance monitoring not fully supported');
    }

    // Report metrics after page load
    const reportMetrics = () => {
      // Only report if we have meaningful data
      if (Object.keys(metrics).length > 0) {
        // In a real app, you'd send this to your analytics service
        console.log('Performance Metrics:', metrics);
        
        // Check for performance issues
        const issues = [];
        if (metrics.lcp && metrics.lcp > 2500) issues.push('LCP > 2.5s');
        if (metrics.fid && metrics.fid > 100) issues.push('FID > 100ms');
        if (metrics.cls && metrics.cls > 0.1) issues.push('CLS > 0.1');
        if (metrics.ttfb && metrics.ttfb > 600) issues.push('TTFB > 600ms');
        
        if (issues.length > 0) {
          console.warn('Performance Issues Detected:', issues);
        }
      }
    };

    // Report metrics after a delay to ensure all measurements are captured
    const timeoutId = setTimeout(reportMetrics, 5000);

    // Monitor for console errors
    const originalError = console.error;
    console.error = (...args) => {
      // Log error for monitoring (in production, send to error tracking service)
      if (process.env.NODE_ENV === 'production') {
        // You would send this to your error tracking service
        console.log('Console Error Detected:', args);
      }
      originalError.apply(console, args);
    };

    // Monitor for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      // In production, send to error tracking service
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      console.error = originalError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}
