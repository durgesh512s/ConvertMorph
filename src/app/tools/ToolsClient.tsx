'use client';

import React, { useState, useMemo } from 'react';
import { CategoryTabs } from '@/components/CategoryTabs';
import ToolCard from '@/components/ToolCard';
import { Search } from 'lucide-react';
import { toolCategories, tabs, getAllTools } from './toolsData';

export default function ToolsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Get all tools
  const allTools = useMemo(() => getAllTools(), []);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let filtered = allTools;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.categoryId === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allTools, activeCategory, searchQuery]);

  // Group filtered tools by category for display
  const groupedFilteredTools = useMemo(() => {
    const grouped: { [key: string]: typeof filteredTools } = {};
    filteredTools.forEach(tool => {
      const categoryId = tool.categoryId || 'uncategorized';
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(tool);
    });
    return grouped;
  }, [filteredTools]);

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="sticky top-16 z-40 mb-8">
        <div className="backdrop-blur bg-white/70 dark:bg-gray-900/70 border rounded-2xl shadow-sm px-4 py-3 flex flex-col gap-3">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tools…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 pl-10 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              aria-label="Search tools"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center">
            <CategoryTabs tabs={tabs} active={activeCategory} setActive={setActiveCategory} />
          </div>
        </div>
      </div>

      {/* Tools by Category */}
      {searchQuery.trim() || activeCategory !== 'all' ? (
        // Show filtered results
        <div className="space-y-12">
          {Object.entries(groupedFilteredTools).map(([categoryId, tools]) => {
            const category = toolCategories[categoryId as keyof typeof toolCategories];
            return (
              <section key={categoryId} id={`${categoryId}-panel`} role="tabpanel" style={{ scrollMarginTop: '6rem' }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category?.title || categoryId}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {category?.description || ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tools.map((tool) => (
                    <ToolCard
                      key={tool.title}
                      icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      accentColor={tool.accentColor}
                      comingSoon={tool.comingSoon}
                      categoryId={tool.categoryId}
                    />
                  ))}
                </div>
              </section>
            );
          })}
          {Object.keys(groupedFilteredTools).length === 0 && (
            <div className="rounded-2xl border p-8 text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-base font-medium mb-1">No tools found</p>
              <p className="text-sm mb-4">Try different keywords or browse categories.</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  aria-label="Browse all tools"
                >
                  Browse All
                </button>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  aria-label="Clear search query"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Show all categories
        <div className="space-y-12">
          {Object.entries(toolCategories).map(([categoryId, category]) => (
            <section key={categoryId} id={`${categoryId}-section`} style={{ scrollMarginTop: '6rem' }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <ToolCard
                    key={tool.title}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    accentColor={tool.accentColor}
                    comingSoon={tool.comingSoon}
                    categoryId={categoryId}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
