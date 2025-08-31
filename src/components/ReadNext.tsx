import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { cn } from '@/lib/utils';

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  readingTime: string;
  datePublished: string;
  category?: string;
}

interface ReadNextProps {
  posts: BlogPost[];
  className?: string;
  variant?: 'grid' | 'list';
}

export function ReadNext({ posts, className, variant = 'grid' }: ReadNextProps) {
  if (posts.length === 0) {
    return null;
  }


  if (variant === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Continue Reading
        </h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readingTime}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.datePublished)}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={cn('', className)}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Read Next
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Discover more helpful guides and tutorials
        </p>
      </div>

      <div className={cn(
        'grid gap-6',
        posts.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-2'
      )}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:-translate-y-1">
              {post.category && (
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    {post.category}
                  </span>
                </div>
              )}
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h4>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readingTime}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.datePublished)}
                  </div>
                </div>
                
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          View All Articles
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

// Predefined blog posts for common use cases
export const blogPosts = {
  'compress-pdf': {
    title: 'How to Compress PDF Files: Complete Guide 2025',
    excerpt: 'Learn how to compress PDF files effectively. Reduce file size while maintaining quality with our step-by-step guide and free online tools.',
    slug: 'how-to-compress-pdf-files',
    readingTime: '8 min read',
    datePublished: '2025-01-15T10:00:00.000Z',
    category: 'Tutorial'
  },
  'merge-pdf': {
    title: 'Merge PDF Files Online: Complete Guide',
    excerpt: 'Step-by-step guide to combining multiple PDF documents into one file. Learn the best practices and tools for merging PDFs.',
    slug: 'merge-pdf-files-online',
    readingTime: '6 min read',
    datePublished: '2025-01-20T10:00:00.000Z',
    category: 'Tutorial'
  },
  'split-pdf': {
    title: 'Split PDF Pages: Extract and Organize Documents',
    excerpt: 'Learn how to extract specific pages or split large PDFs into smaller files. Master PDF page management techniques.',
    slug: 'split-pdf-pages',
    readingTime: '5 min read',
    datePublished: '2025-01-25T10:00:00.000Z',
    category: 'Tutorial'
  },
  'images-to-pdf': {
    title: 'Convert Images to PDF: JPG, PNG to PDF Guide',
    excerpt: 'Transform your JPG, PNG images into professional PDF documents. Learn the best practices for image-to-PDF conversion.',
    slug: 'convert-images-to-pdf',
    readingTime: '7 min read',
    datePublished: '2025-02-01T10:00:00.000Z',
    category: 'Tutorial'
  },
  'pdf-to-images': {
    title: 'Convert PDF to Images: Extract High-Quality Images',
    excerpt: 'Extract pages from PDF files as high-quality JPG or PNG images. Complete guide to PDF-to-image conversion.',
    slug: 'convert-pdf-to-images',
    readingTime: '6 min read',
    datePublished: '2025-02-05T10:00:00.000Z',
    category: 'Tutorial'
  }
};

// Helper function to get related posts based on current post
export function getRelatedPosts(currentSlug: string, count: number = 2): BlogPost[] {
  const allPosts = Object.values(blogPosts);
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
  
  // Return the specified number of posts
  return otherPosts.slice(0, count);
}

// Convenience component for predefined posts
export function RelatedPosts({ 
  currentSlug, 
  count = 2, 
  variant = 'grid',
  className 
}: { 
  currentSlug: string;
  count?: number;
  variant?: 'grid' | 'list';
  className?: string;
}) {
  const relatedPosts = getRelatedPosts(currentSlug, count);
  
  return (
    <ReadNext
      posts={relatedPosts}
      variant={variant}
      className={className}
    />
  );
}
