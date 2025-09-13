'use client';

import { lazy, Suspense, ReactNode, useEffect, useState } from 'react';

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

// Hook to check if component is mounted (client-side)
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted;
}

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
  const isMounted = useIsMounted();
  
  // Use CSS animation on server/initial render, motion on client
  if (!isMounted) {
    return <CSSFadeIn className={className} delay={delay}>{children}</CSSFadeIn>;
  }
  
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
  const isMounted = useIsMounted();
  
  // Use CSS animation on server/initial render, motion on client
  if (!isMounted) {
    return <CSSSlideUp className={className} delay={delay}>{children}</CSSSlideUp>;
  }
  
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
  const isMounted = useIsMounted();
  
  // Use CSS animation on server/initial render, motion on client
  if (!isMounted) {
    return <CSSFadeIn className={className} delay={delay}>{children}</CSSFadeIn>;
  }
  
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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts to prevent layout shift
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 100);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0.01, // Start with minimal opacity instead of 0
        transform: isVisible ? 'translateY(0px)' : 'translateY(5px)', // Reduced movement
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', // Faster transition
        contain: 'layout style', // Prevent layout shifts
        willChange: isVisible ? 'auto' : 'opacity, transform' // Optimize for animation
      }}
    >
      {children}
    </div>
  );
}

export function CSSSlideUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts to prevent layout shift
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 100);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0.01, // Start with minimal opacity instead of 0
        transform: isVisible ? 'translateY(0px)' : 'translateY(10px)', // Reduced movement
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', // Faster transition
        contain: 'layout style', // Prevent layout shifts
        willChange: isVisible ? 'auto' : 'opacity, transform' // Optimize for animation
      }}
    >
      {children}
    </div>
  );
}
