'use client';

import { lazy, Suspense, ReactNode } from 'react';

// Lazy load framer-motion to prevent blocking initial render
const MotionDiv = lazy(() => 
  import('framer-motion').then(module => ({
    default: module.motion.div
  }))
);

const MotionSection = lazy(() => 
  import('framer-motion').then(module => ({
    default: module.motion.section
  }))
);

// Fallback component for loading state
const MotionFallback = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

// Optimized motion components with lazy loading
interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  initial?: any;
  animate?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
}

export function LazyFadeIn({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <Suspense fallback={<MotionFallback className={className}>{children}</MotionFallback>}>
      <MotionDiv
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </MotionDiv>
    </Suspense>
  );
}

export function LazySlideUp({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <Suspense fallback={<MotionFallback className={className}>{children}</MotionFallback>}>
      <MotionDiv
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </MotionDiv>
    </Suspense>
  );
}

export function LazyHeroAnimation({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <Suspense fallback={<MotionFallback className={className}>{children}</MotionFallback>}>
      <MotionDiv
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </MotionDiv>
    </Suspense>
  );
}

// Simple CSS-only animations as fallback for critical content
export function CSSFadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div 
      className={`${className} animate-in fade-in duration-500`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
}

export function CSSSlideUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div 
      className={`${className} animate-in slide-in-from-bottom-4 duration-500`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
}
