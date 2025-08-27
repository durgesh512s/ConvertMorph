'use client';

import React, { useState, useMemo } from 'react';
import ToolCard from '@/components/ToolCard';
import { Input } from '@/components/ui/input';
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
  PiggyBank
} from 'lucide-react';

// Tool categories and data
const toolCategories = {
  pdf: {
    title: 'PDF Tools',
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
        href: '#',
        accentColor: '#3b82f6',
        comingSoon: true,
      },
      {
        title: 'Image Resize',
        description: 'Resize images to specific dimensions or percentages.',
        icon: Minimize2,
        href: '#',
        accentColor: '#10b981',
        comingSoon: true,
      },
    ]
  },
  text: {
    title: 'Text Tools',
    tools: [
      {
        title: 'Grammar Checker',
        description: 'Check and correct grammar, spelling, and punctuation errors.',
        icon: CheckCircle,
        href: '#',
        accentColor: '#10b981',
        comingSoon: true,
      },
      {
        title: 'Paraphraser',
        description: 'Rewrite text while maintaining original meaning and context.',
        icon: Copy,
        href: '#',
        accentColor: '#3b82f6',
        comingSoon: true,
      },
      {
        title: 'Plagiarism Checker',
        description: 'Detect potential plagiarism and ensure content originality.',
        icon: FileText,
        href: '#',
        accentColor: '#f97316',
        comingSoon: true,
      },
    ]
  },
  finance: {
    title: 'Finance Tools',
    tools: [
      {
        title: 'Tax Calculator',
        description: 'Calculate income tax based on current tax slabs and deductions.',
        icon: Calculator,
        href: '#',
        accentColor: '#059669',
        comingSoon: true,
      },
      {
        title: 'EMI Calculator',
        description: 'Calculate loan EMIs for home, car, and personal loans.',
        icon: Home,
        href: '#',
        accentColor: '#3b82f6',
        comingSoon: true,
      },
      {
        title: 'SIP Calculator',
        description: 'Calculate returns on Systematic Investment Plans (SIP).',
        icon: PiggyBank,
        href: '#',
        accentColor: '#10b981',
        comingSoon: true,
      },
      {
        title: 'HRA Calculator',
        description: 'Calculate House Rent Allowance exemption for tax savings.',
        icon: CreditCard,
        href: '#',
        accentColor: '#8b5cf6',
        comingSoon: true,
      },
    ]
  }
};

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'pdf', label: 'PDF' },
  { id: 'image', label: 'Image' },
  { id: 'text', label: 'Text' },
  { id: 'finance', label: 'Finance' },
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Flatten all tools for search and filtering
  const allTools = useMemo(() => {
    return Object.entries(toolCategories).flatMap(([categoryId, category]) =>
      category.tools.map(tool => ({ ...tool, categoryId }))
    );
  }, []);

  // Generate JSON-LD structured data
  const jsonLd = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://convertmorph.com';
    
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
  }, [allTools]);

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
      grouped[tool.categoryId].push(tool);
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
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade tools for PDF, Image, Text, and Finance tasks. 
              All tools work entirely in your browser for maximum privacy.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center">
              <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border overflow-x-auto">
                {categoryFilters.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
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
                  <section key={categoryId}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {category.title}
                    </h2>
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
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
              {Object.keys(groupedFilteredTools).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No tools found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            // Show all categories
            <div className="space-y-12">
              {Object.entries(toolCategories).map(([categoryId, category]) => (
                <section key={categoryId}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.title}
                  </h2>
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
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Features Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Use ConvertMorph Tools?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Archive className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  100% Private
                </h3>
                <p className="text-gray-600">
                  All processing happens in your browser. Your files never leave your device.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GitMerge className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  No uploads or downloads. Process files instantly without waiting.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Professional Quality
                </h3>
                <p className="text-gray-600">
                  Enterprise-grade tools with advanced features and high-quality output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
