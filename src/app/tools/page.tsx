import React from 'react';
import { Archive, GitMerge, Scissors } from 'lucide-react';
import { getAllTools } from './toolsData';
import ToolsClientWrapper from './ToolsClientWrapper';

// Server Component - renders immediately with all content
export default function ToolsPage() {
  return (
    <>
      
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/40 dark:via-gray-950 dark:to-gray-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              All Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional-grade tools for PDF, Image, Text, and Finance tasks. 
              All tools work entirely in your browser for maximum privacy.
            </p>
          </div>

          {/* Client-side component with search and category filters */}
          <ToolsClientWrapper />

          {/* Features Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Use ConvertMorph Tools?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Archive className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  100% Private
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All processing happens in your browser. Your files never leave your device.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GitMerge className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No uploads or downloads. Process files instantly without waiting.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Professional Quality
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade tools with advanced features and high-quality output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
