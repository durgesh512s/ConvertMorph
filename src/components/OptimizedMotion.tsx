'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Optimized motion components with reduced complexity for better performance
interface OptimizedMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Simple fade in animation - less complex than full motion
export function FadeIn({ children, className, delay = 0 }: OptimizedMotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

// Simple slide up animation
export function SlideUp({ children, className, delay = 0 }: OptimizedMotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

// Hero section optimized animation
export function HeroAnimation({ children, className, delay = 0 }: OptimizedMotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
interface StaggeredProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredContainer({ children, className, staggerDelay = 0.1 }: StaggeredProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      {children}
    </motion.div>
  );
}
