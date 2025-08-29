'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Archive, GitMerge, Scissors, Image as ImageIcon, Download, Move3D, Type, Hash } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PWAInstall } from './PWAInstall';
import { ThemeToggle } from './ThemeToggle';
import { useIsClient } from '@/hooks/useIsClient';
import Logo from './Logo';

const pdfTools = [
  { 
    name: 'PDF Compress', 
    href: '/tools/pdf-compress', 
    icon: Archive,
    description: 'Reduce PDF file size while maintaining quality',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    name: 'PDF Merge', 
    href: '/tools/pdf-merge', 
    icon: GitMerge,
    description: 'Combine multiple PDFs into one document',
    color: 'bg-green-100 text-green-600'
  },
  { 
    name: 'PDF Split', 
    href: '/tools/pdf-split', 
    icon: Scissors,
    description: 'Extract pages or split PDF into multiple files',
    color: 'bg-orange-100 text-orange-600'
  },
  { 
    name: 'Images to PDF', 
    href: '/tools/images-to-pdf', 
    icon: ImageIcon,
    description: 'Convert images to PDF format',
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    name: 'PDF to Images', 
    href: '/tools/pdf-to-images', 
    icon: Download,
    description: 'Extract images from PDF documents',
    color: 'bg-pink-100 text-pink-600'
  },
  { 
    name: 'PDF Organize', 
    href: '/tools/pdf-organize', 
    icon: Move3D,
    description: 'Reorder and organize PDF pages',
    color: 'bg-indigo-100 text-indigo-600'
  },
];

const futureTools = [
  { name: 'Image Tools', description: 'Coming soon', icon: ImageIcon, color: 'bg-gray-100 text-gray-400' },
  { name: 'Text Tools', description: 'Coming soon', icon: Type, color: 'bg-gray-100 text-gray-400' },
  { name: 'Finance Tools', description: 'Coming soon', icon: Hash, color: 'bg-gray-100 text-gray-400' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Recently used tools functionality
const getRecentlyUsedTools = () => {
  if (typeof window === 'undefined') return [];
  try {
    const recent = localStorage.getItem('convertmorph-recent-tools');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
};

const addToRecentlyUsed = (toolSlug: string) => {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentlyUsedTools();
    const updated = [toolSlug, ...recent.filter((slug: string) => slug !== toolSlug)].slice(0, 3);
    localStorage.setItem('convertmorph-recent-tools', JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [recentlyUsedSlugs, setRecentlyUsedSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    setMounted(true);
    if (!isClient) return;
    setRecentlyUsedSlugs(getRecentlyUsedTools());
  }, [isClient]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };

    if (toolsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toolsDropdownOpen]);

  // Get recently used tools with full tool data
  const recentlyUsedTools = recentlyUsedSlugs
    .map(slug => pdfTools.find(tool => tool.href.includes(slug)))
    .filter(Boolean) as typeof pdfTools;

  const handleToolClick = (toolHref: string) => {
    if (!isClient) return;
    const toolSlug = toolHref.split('/').pop();
    if (toolSlug) {
      addToRecentlyUsed(toolSlug);
      setRecentlyUsedSlugs(getRecentlyUsedTools());
    }
    setToolsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                  pathname.startsWith('/tools')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                <span>Tools</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-[600px] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] overflow-y-auto"
                  >
                  <div className="p-6">
                    {/* CTA Button */}
                    <div className="mb-6">
                      <Link
                        href="/tools"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                        onClick={() => setToolsDropdownOpen(false)}
                      >
                        View All Tools →
                      </Link>
                    </div>

                    {/* Recently Used Section */}
                    {isClient && recentlyUsedTools.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Recently Used</h3>
                        <div className="flex space-x-3">
                          {recentlyUsedTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <Link
                                key={tool.name}
                                href={tool.href}
                                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                onClick={() => handleToolClick(tool.href)}
                              >
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mb-1", tool.color)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                                  {tool.name.replace('PDF ', '')}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      {/* Column 1: PDF Tools */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">PDF Tools</h3>
                        <div className="space-y-3">
                          {pdfTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <Link
                                key={tool.name}
                                href={tool.href}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 group"
                                onClick={() => handleToolClick(tool.href)}
                              >
                                <div className={cn("flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:brightness-110", tool.color)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {tool.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {tool.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: Future Categories */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Coming Soon</h3>
                        <div className="space-y-3">
                          {futureTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <div
                                key={tool.name}
                                className="flex items-start space-x-3 p-3 rounded-lg opacity-60"
                              >
                                <div className={cn("flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center", tool.color)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {tool.name}
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {tool.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Install App Link */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Install App
                      </button>
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 after:absolute after:w-0 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full',
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 after:w-full'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <PWAInstall />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <PWAInstall />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {/* Tools Section */}
            <div className="mb-4">
              <Link
                href="/tools"
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                  pathname.startsWith('/tools')
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tools
              </Link>
              <div className="ml-4 mt-2 space-y-1">
                {pdfTools.slice(0, 4).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
