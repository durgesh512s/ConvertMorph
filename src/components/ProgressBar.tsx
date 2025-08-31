'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
});

function ProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress on route change
    NProgress.start();
    
    // Complete progress after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    // Handle browser navigation (back/forward buttons)
    const handleStart = () => NProgress.start();

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleStart);
    
    // Clean up progress on component unmount
    return () => {
      window.removeEventListener('popstate', handleStart);
      NProgress.done();
    };
  }, []);

  return null;
}

export function ProgressBar() {
  return <ProgressBarInner />;
}
