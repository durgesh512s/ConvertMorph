import React from 'react';
import ToolCard from '@/components/ToolCard';
import { toolCategories } from './toolsData';

// Server Component - renders tool cards without any client-side logic
export default function ToolsGrid() {
  return (
    <div className="space-y-12" id="server-tools-grid">
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
  );
}
