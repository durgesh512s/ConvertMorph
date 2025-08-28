'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogTOCProps {
  headings: Heading[];
  className?: string;
}

export function BlogTOC({ headings, className }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Table of Contents</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors md:hidden"
          aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className={cn('transition-all duration-200', isCollapsed ? 'hidden md:block' : 'block')}>
        <nav className="p-4">
          <ul className="space-y-1">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={cn(
                    'w-full text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                    level === 2 && 'pl-0',
                    level === 3 && 'pl-4',
                    level === 4 && 'pl-8',
                    level === 5 && 'pl-12',
                    level === 6 && 'pl-16',
                    activeId === id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  <span className="block py-1 border-l-2 pl-3 transition-colors hover:border-blue-300 dark:hover:border-blue-600">
                    <span
                      className={cn(
                        'border-l-2 pl-3 transition-colors',
                        activeId === id
                          ? 'border-blue-500 dark:border-blue-400'
                          : 'border-transparent'
                      )}
                    >
                      {text}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

// Hook to automatically generate headings from content
export function useHeadingsFromContent(content: string): Heading[] {
  return React.useMemo(() => {
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      headings.push({ id, text, level });
    }

    return headings;
  }, [content]);
}

// Sticky TOC wrapper for desktop
export function StickyBlogTOC({ headings, className }: BlogTOCProps) {
  return (
    <div className={cn('sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto', className)}>
      <BlogTOC headings={headings} />
    </div>
  );
}
