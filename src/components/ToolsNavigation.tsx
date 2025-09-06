'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Archive, 
  GitMerge, 
  Scissors, 
  Image as ImageIcon, 
  Move3D,
  Type,
  Hash,
  PenTool,
  Crop,
  FileText,
  Calculator,
  Home,
  CreditCard,
  PiggyBank,
  GitCompare,
  Copy
} from 'lucide-react';

interface Tool {
  title: string;
  icon: any;
  href: string;
  accentColor: string;
}

interface Category {
  title: string;
  tools: Tool[];
}

// Consolidated categories with more tools per category
const toolCategories: Category[] = [
  {
    title: 'PDF Tools',
    tools: [
      {
        title: 'Compress PDF',
        icon: Archive,
        href: '/tools/pdf-compress',
        accentColor: '#dc2626',
      },
      {
        title: 'Merge PDF',
        icon: GitMerge,
        href: '/tools/pdf-merge',
        accentColor: '#8b5cf6',
      },
      {
        title: 'Split PDF',
        icon: Scissors,
        href: '/tools/pdf-split',
        accentColor: '#8b5cf6',
      },
      {
        title: 'Organize PDF',
        icon: Move3D,
        href: '/tools/pdf-organize',
        accentColor: '#8b5cf6',
      },
      {
        title: 'Watermark PDF',
        icon: Type,
        href: '/tools/pdf-watermark',
        accentColor: '#06b6d4',
      },
      {
        title: 'Number Pages',
        icon: Hash,
        href: '/tools/pdf-pagenum',
        accentColor: '#06b6d4',
      },
      {
        title: 'PDF Fill & Sign',
        icon: PenTool,
        href: '/tools/pdf-sign',
        accentColor: '#8b5cf6',
      },
    ]
  },
  {
    title: 'Convert',
    tools: [
      {
        title: 'PDF to Images',
        icon: ImageIcon,
        href: '/tools/pdf-to-images',
        accentColor: '#eab308',
      },
      {
        title: 'Images to PDF',
        icon: ImageIcon,
        href: '/tools/images-to-pdf',
        accentColor: '#eab308',
      },
      {
        title: 'Image Converter',
        icon: Copy,
        href: '/tools/image-convert',
        accentColor: '#f97316',
      },
    ]
  },
  {
    title: 'Image Tools',
    tools: [
      {
        title: 'Image Compress',
        icon: Archive,
        href: '/tools/image-compress',
        accentColor: '#8b5cf6',
      },
      {
        title: 'Image Resize',
        icon: Move3D,
        href: '/tools/image-resize',
        accentColor: '#10b981',
      },
      {
        title: 'Image Crop',
        icon: Crop,
        href: '/tools/image-crop',
        accentColor: '#10b981',
      },
    ]
  },
  {
    title: 'Text & Analysis',
    tools: [
      {
        title: 'Word Counter',
        icon: FileText,
        href: '/tools/word-counter',
        accentColor: '#3b82f6',
      },
      {
        title: 'Text Comparison',
        icon: GitCompare,
        href: '/tools/text-compare',
        accentColor: '#10b981',
      },
    ]
  },
  {
    title: 'Calculators',
    tools: [
      {
        title: 'Tax Calculator',
        icon: Calculator,
        href: '/tools/tax-calculator',
        accentColor: '#10b981',
      },
      {
        title: 'EMI Calculator',
        icon: Home,
        href: '/tools/emi-calculator',
        accentColor: '#3b82f6',
      },
      {
        title: 'SIP Calculator',
        icon: PiggyBank,
        href: '/tools/sip-calculator',
        accentColor: '#10b981',
      },
      {
        title: 'HRA Calculator',
        icon: Home,
        href: '/tools/hra-calculator',
        accentColor: '#8b5cf6',
      },
      {
        title: 'Loan Calculator',
        icon: CreditCard,
        href: '/tools/loan-calculator',
        accentColor: '#f97316',
      },
    ]
  },
];

interface ToolsNavigationProps {
  currentTool?: string;
  className?: string;
}

export default function ToolsNavigation({ currentTool, className = '' }: ToolsNavigationProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          All Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Professional-grade tools for PDF, Image, Text, and Finance tasks
        </p>
      </div>
      
      {/* Horizontal layout matching the reference image */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl">
          {toolCategories.map((category) => (
            <div key={category.title} className="flex flex-col">
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                  {category.title}
                </h3>
              </div>
              
              {/* Tools List */}
              <div className="space-y-3 flex-1">
                {category.tools.map((tool) => {
                  const IconComponent = tool.icon;
                  const isCurrentTool = currentTool && tool.href.includes(currentTool);
                  
                  return (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md ${
                        isCurrentTool 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                          : 'bg-gray-100/50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: tool.accentColor }}
                      >
                        <IconComponent 
                          className="w-4 h-4 text-white" 
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        isCurrentTool 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                      }`}>
                        {tool.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
