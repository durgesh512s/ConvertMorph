import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedCTAProps {
  toolSlug: string;
  title: string;
  description: string;
  href: string;
  features?: string[];
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function RelatedCTA({ 
  toolSlug, 
  title, 
  description, 
  href, 
  features = [],
  className,
  variant = 'default'
}: RelatedCTAProps) {
  const getIcon = (toolSlug: string) => {
    switch (toolSlug) {
      case 'pdf-compress':
        return <Zap className="w-6 h-6" />;
      case 'pdf-merge':
        return <Shield className="w-6 h-6" />;
      case 'pdf-split':
        return <Clock className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn(
        'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-300 dark:border-blue-800 rounded-lg p-4',
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-200 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-700 dark:text-blue-400">
              {getIcon(toolSlug)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white" style={{ color: '#111827 !important' }}>
                {title}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300" style={{ color: '#374151 !important' }}>
                {description}
              </p>
            </div>
          </div>
          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Try Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={cn(
        'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-lg',
        className
      )}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
              {getIcon(toolSlug)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-white/90">{description}</p>
            </div>
          </div>
        </div>

        {features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-white font-medium">
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 shadow-sm" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="inline-flex items-center px-6 py-3 bg-white/90 hover:bg-white text-blue-600 hover:text-blue-700 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span className="text-blue-600 hover:text-blue-700 font-semibold">Get Started Free</span>
          <ArrowRight className="w-4 h-4 ml-2 text-blue-600 hover:text-blue-700" />
        </Link>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm',
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
          {getIcon(toolSlug)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
          
          {features.length > 0 && (
            <ul className="space-y-1 mb-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Try {title}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Predefined tool CTAs for common use cases
export const toolCTAs = {
  'pdf-compress': {
    toolSlug: 'pdf-compress',
    title: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality with our advanced compression algorithms.',
    href: '/tools/pdf-compress',
    features: [
      'Multiple compression levels',
      'Batch processing support',
      'No file size limits',
      'Privacy-focused processing'
    ]
  },
  'pdf-merge': {
    toolSlug: 'pdf-merge',
    title: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document with custom page ordering.',
    href: '/tools/pdf-merge',
    features: [
      'Drag & drop reordering',
      'Preview before merging',
      'Unlimited file count',
      'Fast processing'
    ]
  },
  'pdf-split': {
    toolSlug: 'pdf-split',
    title: 'PDF Splitter',
    description: 'Extract specific pages or split large PDFs into smaller, manageable files.',
    href: '/tools/pdf-split',
    features: [
      'Page range selection',
      'Split by page count',
      'Extract single pages',
      'Bulk operations'
    ]
  },
  'images-to-pdf': {
    toolSlug: 'images-to-pdf',
    title: 'Images to PDF',
    description: 'Convert JPG, PNG, and other image formats into professional PDF documents.',
    href: '/tools/images-to-pdf',
    features: [
      'Multiple image formats',
      'Custom page layouts',
      'Quality preservation',
      'Batch conversion'
    ]
  },
  'pdf-to-images': {
    toolSlug: 'pdf-to-images',
    title: 'PDF to Images',
    description: 'Extract pages from PDF files as high-quality JPG or PNG images.',
    href: '/tools/pdf-to-images',
    features: [
      'High-resolution output',
      'Multiple image formats',
      'Page selection',
      'Quality control'
    ]
  }
};

// Convenience component for predefined tools
export function ToolCTA({ 
  toolSlug, 
  variant = 'default', 
  className 
}: { 
  toolSlug: keyof typeof toolCTAs; 
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}) {
  const toolData = toolCTAs[toolSlug];
  
  if (!toolData) {
    return null;
  }

  return (
    <RelatedCTA
      {...toolData}
      variant={variant}
      className={className}
    />
  );
}
