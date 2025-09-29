'use client';

import { useEffect, useState } from 'react';
import { VercelAnalytics } from './VercelAnalytics';
// GoogleAnalytics removed - using GTM-only setup
import { PerformanceMonitor } from './PerformanceMonitor';

interface DeferredScriptsProps {
  children?: React.ReactNode;
}

export function DeferredScripts({ children }: DeferredScriptsProps) {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);
  const [shouldLoadPerformance, setShouldLoadPerformance] = useState(false);

  useEffect(() => {
    // Defer analytics loading until after initial render and user interaction
    const loadAnalytics = () => {
      setShouldLoadAnalytics(true);
    };

    const loadPerformance = () => {
      setShouldLoadPerformance(true);
    };

    // Load analytics after a delay to not block initial render
    const analyticsTimer = setTimeout(loadAnalytics, 2000);

    // Load performance monitoring after analytics
    const performanceTimer = setTimeout(loadPerformance, 3000);

    // Also load on first user interaction
    const handleUserInteraction = () => {
      loadAnalytics();
      loadPerformance();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Listen for user interactions
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });
    document.addEventListener('keydown', handleUserInteraction, { passive: true });
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(analyticsTimer);
      clearTimeout(performanceTimer);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <>
      {children}
      {shouldLoadAnalytics && (
        <>
          <VercelAnalytics />
        </>
      )}
      {shouldLoadPerformance && <PerformanceMonitor />}
    </>
  );
}

// Hook for deferring heavy components
export function useDeferredComponent(delay: number = 1000) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender;
}

// Component for deferring non-critical features
export function DeferredFeature({ 
  children, 
  delay = 1000, 
  fallback = null 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  fallback?: React.ReactNode;
}) {
  const shouldRender = useDeferredComponent(delay);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
