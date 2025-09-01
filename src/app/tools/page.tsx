'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ToolCard from '@/components/ToolCard';
import CategoryTabs from '@/components/CategoryTabs';
import { 
  Archive, 
  GitMerge, 
  Scissors, 
  Image as ImageIcon, 
  Download,
  Move3D,
  Type,
  Hash,
  PenTool,
  Search,
  Eraser,
  Minimize2,
  CheckCircle,
  Copy,
  FileText,
  Calculator,
  Home,
  CreditCard,
  PiggyBank,
  Crop,
  FileText as WordCountIcon,
  GitCompare
} from 'lucide-react';

// Tool categories and data
const toolCategories = {
  pdf: {
    title: 'PDF Tools',
    description: 'Fast, private utilities for everyday PDF tasks.',
    tools: [
      {
        title: 'PDF Compress',
        description: 'Reduce PDF file size while maintaining quality. Choose from light, medium, or strong compression levels.',
        icon: Archive,
        href: '/tools/pdf-compress',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'PDF Merge',
        description: 'Combine multiple PDF files into a single document. Preserve page order and bookmarks.',
        icon: GitMerge,
        href: '/tools/pdf-merge',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'PDF Split',
        description: 'Split PDF pages into separate documents using page ranges like 1-3,5,7-9.',
        icon: Scissors,
        href: '/tools/pdf-split',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Images to PDF',
        description: 'Convert JPG, PNG images to PDF format. Create single or multiple PDF files.',
        icon: ImageIcon,
        href: '/tools/images-to-pdf',
        accentColor: '#f97316',
        comingSoon: false,
      },
      {
        title: 'PDF to Images',
        description: 'Extract pages from PDF as high-quality PNG or JPG image files.',
        icon: Download,
        href: '/tools/pdf-to-images',
        accentColor: '#ef4444',
        comingSoon: false,
      },
      {
        title: 'PDF Organize',
        description: 'Reorder and rotate PDF pages with visual drag-and-drop interface.',
        icon: Move3D,
        href: '/tools/pdf-organize',
        accentColor: '#6366f1',
        comingSoon: false,
      },
      {
        title: 'PDF Watermark',
        description: 'Add text watermarks to PDF documents with customizable position and style.',
        icon: Type,
        href: '/tools/pdf-watermark',
        accentColor: '#06b6d4',
        comingSoon: false,
      },
      {
        title: 'PDF Page Numbers',
        description: 'Add page numbers to PDF documents with multiple formats and positions.',
        icon: Hash,
        href: '/tools/pdf-pagenum',
        accentColor: '#059669',
        comingSoon: false,
      },
      {
        title: 'PDF Fill & Sign',
        description: 'Add signatures and text to PDF documents. Draw or type signatures.',
        icon: PenTool,
        href: '/tools/pdf-sign',
        accentColor: '#f43f5e',
        comingSoon: false,
      },
    ]
  },
  image: {
    title: 'Image Tools',
    description: 'Professional image editing and optimization tools.',
    tools: [
      {
        title: 'Background Remover',
        description: 'Remove backgrounds from images automatically using AI technology.',
        icon: Eraser,
        href: '#',
        accentColor: '#8b5cf6',
        comingSoon: true,
      },
      {
        title: 'Image Compress',
        description: 'Reduce image file sizes while maintaining visual quality.',
        icon: Archive,
        href: '/tools/image-compress',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Image Resize',
        description: 'Resize images to specific dimensions using Canvas API. Support for PNG, JPG, WebP with aspect ratio control.',
        icon: Minimize2,
        href: '/tools/image-resize',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'Image Converter',
        description: 'Convert images between JPEG, PNG, and WebP formats with quality control and preview functionality.',
        icon: Copy,
        href: '/tools/image-convert',
        accentColor: '#f97316',
        comingSoon: false,
      },
      {
        title: 'Image Crop',
        description: 'Crop images with precision using React Easy Crop. Support for multiple aspect ratios and formats.',
        icon: Crop,
        href: '/tools/image-crop',
        accentColor: '#059669',
        comingSoon: false,
      },
    ]
  },
  text: {
    title: 'Text Tools',
    description: 'Advanced text processing and analysis utilities.',
    tools: [
      {
        title: 'Word Counter',
        description: 'Count words, characters, sentences, and paragraphs. Analyze readability and get detailed text statistics.',
        icon: WordCountIcon,
        href: '/tools/word-counter',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'Text Comparison',
        description: 'Compare two texts side-by-side with detailed difference analysis and similarity scoring using LCS algorithm.',
        icon: GitCompare,
        href: '/tools/text-compare',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'Grammar Checker',
        description: 'Check and correct grammar, spelling, and punctuation errors.',
        icon: CheckCircle,
        href: '#',
        accentColor: '#f97316',
        comingSoon: true,
      },
      {
        title: 'Paraphraser',
        description: 'Rewrite text while maintaining original meaning and context.',
        icon: Copy,
        href: '#',
        accentColor: '#8b5cf6',
        comingSoon: true,
      },
      {
        title: 'Plagiarism Checker',
        description: 'Detect potential plagiarism and ensure content originality.',
        icon: FileText,
        href: '#',
        accentColor: '#ef4444',
        comingSoon: true,
      },
    ]
  },
  finance: {
    title: 'Finance Tools',
    description: 'Essential calculators for financial planning and analysis.',
    tools: [
      {
        title: 'Tax Calculator',
        description: 'Calculate income tax based on current tax slabs and deductions.',
        icon: Calculator,
        href: '/tools/tax-calculator',
        accentColor: '#059669',
        comingSoon: false,
      },
      {
        title: 'EMI Calculator',
        description: 'Calculate loan EMIs for home, car, and personal loans.',
        icon: Home,
        href: '/tools/emi-calculator',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'SIP Calculator',
        description: 'Calculate returns on Systematic Investment Plans (SIP).',
        icon: PiggyBank,
        href: '/tools/sip-calculator',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'HRA Calculator',
        description: 'Calculate House Rent Allowance exemption for tax savings.',
        icon: CreditCard,
        href: '/tools/hra-calculator',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Loan Calculator',
        description: 'Calculate loan EMI, total interest, and payment schedule for different types of loans.',
        icon: CreditCard,
        href: '/tools/loan-calculator',
        accentColor: '#f97316',
        comingSoon: false,
      },
    ]
  }
};

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pdf', label: 'PDF' },
  { key: 'image', label: 'Image' },
  { key: 'text', label: 'Text' },
  { key: 'finance', label: 'Finance' },
];

// Component that uses useSearchParams
function ToolsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Set initial category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && TABS.some(tab => tab.key === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);


  // Flatten all tools for search and filtering
  const allTools = useMemo(() => {
    return Object.entries(toolCategories).flatMap(([categoryId, category]) =>
      category.tools.map(tool => ({ ...tool, categoryId }))
    );
  }, []);

  // Generate JSON-LD structured data
  const [baseUrl, setBaseUrl] = useState('https://convertmorph.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "ConvertMorph Tools",
      "description": "Professional-grade tools for PDF, Image, Text, and Finance tasks",
      "url": `${baseUrl}/tools`,
      "numberOfItems": allTools.filter(tool => !tool.comingSoon).length,
      "itemListElement": allTools
        .filter(tool => !tool.comingSoon)
        .map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": tool.title,
            "description": tool.description,
            "url": `${baseUrl}${tool.href}`,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        }))
    };
  }, [allTools, baseUrl]);

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
      if (!grouped[tool.categoryId]) {
        grouped[tool.categoryId] = [];
      }
      const categoryTools = grouped[tool.categoryId];
      if (categoryTools) {
        categoryTools.push(tool);
      }
    });
    return grouped;
  }, [filteredTools]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
                <CategoryTabs tabs={TABS} active={activeCategory} setActive={setActiveCategory} />
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
                        {category.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
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

// Loading component for Suspense fallback
function ToolsLoading() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/40 dark:via-gray-950 dark:to-gray-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional-grade tools for PDF, Image, Text, and Finance tasks. 
            All tools work entirely in your browser for maximum privacy.
          </p>
        </div>
        <div className="animate-pulse space-y-8">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main export with Suspense boundary
export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsLoading />}>
      <ToolsContent />
    </Suspense>
  );
}
