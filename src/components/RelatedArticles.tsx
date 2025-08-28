import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  href: string;
  readTime: string;
  category: string;
}

interface RelatedArticlesProps {
  toolName: string;
  articles?: Article[];
}

// Default articles mapping for different tools
const defaultArticles: Record<string, Article[]> = {
  'pdf-compress': [
    {
      title: 'How to Compress PDF Files Online',
      description: 'Learn the best practices for reducing PDF file sizes while maintaining quality.',
      href: '/blog/how-to-compress-pdf-files',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      title: 'PDF Optimization Tips for Web',
      description: 'Optimize your PDFs for faster web loading and better user experience.',
      href: '/blog/pdf-optimization-tips',
      readTime: '4 min read',
      category: 'Guide'
    },
    {
      title: 'Understanding PDF Compression Levels',
      description: 'Choose the right compression level for your specific needs and use cases.',
      href: '/blog/pdf-compression-levels',
      readTime: '3 min read',
      category: 'Tutorial'
    }
  ],
  'pdf-merge': [
    {
      title: 'Merge PDF Files Online',
      description: 'Step-by-step guide to combining multiple PDF documents into one file.',
      href: '/blog/merge-pdf-files-online',
      readTime: '4 min read',
      category: 'Tutorial'
    },
    {
      title: 'PDF Organization Best Practices',
      description: 'Tips for organizing and managing your PDF documents effectively.',
      href: '/blog/pdf-organization-tips',
      readTime: '6 min read',
      category: 'Guide'
    },
    {
      title: 'Batch PDF Processing Tips',
      description: 'Efficiently handle multiple PDF files with batch processing techniques.',
      href: '/blog/batch-pdf-processing',
      readTime: '5 min read',
      category: 'Tutorial'
    }
  ],
  'pdf-split': [
    {
      title: 'Split PDF Pages',
      description: 'Learn how to extract specific pages or split large PDFs into smaller files.',
      href: '/blog/split-pdf-pages',
      readTime: '4 min read',
      category: 'Tutorial'
    },
    {
      title: 'PDF Page Management',
      description: 'Master the art of managing PDF pages for better document organization.',
      href: '/blog/pdf-page-management',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'Working with Large PDF Files',
      description: 'Best practices for handling and processing large PDF documents.',
      href: '/blog/large-pdf-handling',
      readTime: '6 min read',
      category: 'Tutorial'
    }
  ],
  'images-to-pdf': [
    {
      title: 'Convert Images to PDF',
      description: 'Transform your JPG, PNG images into professional PDF documents.',
      href: '/blog/convert-images-to-pdf',
      readTime: '4 min read',
      category: 'Tutorial'
    },
    {
      title: 'Image Quality in PDF Conversion',
      description: 'Maintain image quality when converting to PDF format.',
      href: '/blog/image-quality-pdf',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'Batch Image to PDF Conversion',
      description: 'Convert multiple images to PDF efficiently with batch processing.',
      href: '/blog/batch-image-pdf',
      readTime: '4 min read',
      category: 'Tutorial'
    }
  ],
  'pdf-to-images': [
    {
      title: 'Convert PDF to Images',
      description: 'Extract pages from PDF as high-quality image files.',
      href: '/blog/convert-pdf-to-images',
      readTime: '4 min read',
      category: 'Tutorial'
    },
    {
      title: 'PDF to Image Quality Settings',
      description: 'Choose the right image format and quality for your needs.',
      href: '/blog/pdf-image-quality',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'Extracting Graphics from PDFs',
      description: 'Advanced techniques for extracting images and graphics from PDFs.',
      href: '/blog/extract-pdf-graphics',
      readTime: '6 min read',
      category: 'Tutorial'
    }
  ],
  'default': [
    {
      title: 'PDF Processing Best Practices',
      description: 'Essential tips for working with PDF documents efficiently.',
      href: '/blog/pdf-best-practices',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'Digital Document Management',
      description: 'Organize and manage your digital documents like a pro.',
      href: '/blog/document-management',
      readTime: '6 min read',
      category: 'Tutorial'
    },
    {
      title: 'PDF Security and Privacy',
      description: 'Keep your PDF documents secure and protect your privacy.',
      href: '/blog/pdf-security',
      readTime: '4 min read',
      category: 'Guide'
    }
  ]
};

export function RelatedArticles({ toolName, articles }: RelatedArticlesProps) {
  const displayArticles = articles || defaultArticles[toolName] || defaultArticles.default;

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Related Articles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Learn more about PDF processing and document management
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={article.href}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Read Article
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          View All Articles
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
