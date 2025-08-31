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

// Default articles mapping for different tools - using actual existing blog articles
const defaultArticles: Record<string, Article[]> = {
  'pdf-compress': [
    {
      title: 'How to Compress PDF Files Online: Complete Guide 2025',
      description: 'Learn how to compress PDF files effectively while maintaining quality. Step-by-step guide with free online tools, compression levels, and best practices.',
      href: '/blog/how-to-compress-pdf-files',
      readTime: '8 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-merge': [
    {
      title: 'Merge PDF Files Online: Complete Guide',
      description: 'Step-by-step guide to combining multiple PDF documents into one file using our free online tool.',
      href: '/blog/merge-pdf-files-online',
      readTime: '6 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-split': [
    {
      title: 'Split PDF Pages: Complete Guide',
      description: 'Learn how to extract specific pages or split large PDFs into smaller files using our free online tool.',
      href: '/blog/split-pdf-pages',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-organize': [
    {
      title: 'Organize PDF Pages: Complete Guide',
      description: 'Learn how to reorder, rotate, and organize PDF pages efficiently with our free online tool.',
      href: '/blog/organize-pdf-pages',
      readTime: '6 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-pagenum': [
    {
      title: 'Add Page Numbers to PDF: Complete Guide',
      description: 'Learn how to add professional page numbers to your PDF documents with customizable positioning and formatting.',
      href: '/blog/add-page-numbers-to-pdf',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-watermark': [
    {
      title: 'Add Watermark to PDF: Complete Guide',
      description: 'Learn how to add text and image watermarks to your PDF documents for branding and security.',
      href: '/blog/add-watermark-to-pdf',
      readTime: '6 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-sign': [
    {
      title: 'Sign PDF Documents: Complete Guide',
      description: 'Learn how to digitally sign PDF documents with our free online tool for secure document authentication.',
      href: '/blog/sign-pdf-documents',
      readTime: '7 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'images-to-pdf': [
    {
      title: 'Convert Images to PDF: Complete Guide',
      description: 'Transform your JPG, PNG, and other image formats into professional PDF documents with our free online tool.',
      href: '/blog/convert-images-to-pdf',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'pdf-to-images': [
    {
      title: 'Convert PDF to Images: Complete Guide',
      description: 'Extract pages from PDF as high-quality JPG, PNG, or other image formats with our free online tool.',
      href: '/blog/convert-pdf-to-images',
      readTime: '6 min read',
      category: 'Tutorial'
    },
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    }
  ],
  'image-compress': [
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'Convert Images to PDF: Complete Guide',
      description: 'Transform your JPG, PNG, and other image formats into professional PDF documents with our free online tool.',
      href: '/blog/convert-images-to-pdf',
      readTime: '5 min read',
      category: 'Tutorial'
    }
  ],
  'image-resize': [
    {
      title: 'Resize Images Online: Complete Guide 2025',
      description: 'Learn how to resize images effectively while maintaining quality. Step-by-step guide with Canvas API, aspect ratios, and format conversion.',
      href: '/blog/resize-images-online',
      readTime: '7 min read',
      category: 'Tutorial'
    },
    {
      title: 'Crop Images Online: Complete Guide to Image Cropping',
      description: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion.',
      href: '/blog/crop-images-online',
      readTime: '12 min read',
      category: 'Tutorial'
    },
    {
      title: 'Convert Image Formats Online: Complete Guide to Image Format Conversion',
      description: 'Convert images between JPEG, PNG, and WebP formats online for free. High-quality image format conversion with preview and batch processing.',
      href: '/blog/convert-image-formats-online',
      readTime: '9 min read',
      category: 'Tutorial'
    }
  ],
  'image-convert': [
    {
      title: 'Convert Image Formats Online: Complete Guide to Image Format Conversion',
      description: 'Convert images between JPEG, PNG, and WebP formats online for free. High-quality image format conversion with preview and batch processing.',
      href: '/blog/convert-image-formats-online',
      readTime: '9 min read',
      category: 'Tutorial'
    },
    {
      title: 'Crop Images Online: Complete Guide to Image Cropping',
      description: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion.',
      href: '/blog/crop-images-online',
      readTime: '12 min read',
      category: 'Tutorial'
    },
    {
      title: 'Resize Images Online: Complete Guide 2025',
      description: 'Learn how to resize images effectively while maintaining quality. Step-by-step guide with Canvas API, aspect ratios, and format conversion.',
      href: '/blog/resize-images-online',
      readTime: '7 min read',
      category: 'Tutorial'
    }
  ],
  'image-crop': [
    {
      title: 'Crop Images Online: Complete Guide to Image Cropping',
      description: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion.',
      href: '/blog/crop-images-online',
      readTime: '12 min read',
      category: 'Tutorial'
    },
    {
      title: 'Resize Images Online: Complete Guide 2025',
      description: 'Learn how to resize images effectively while maintaining quality. Step-by-step guide with Canvas API, aspect ratios, and format conversion.',
      href: '/blog/resize-images-online',
      readTime: '7 min read',
      category: 'Tutorial'
    },
    {
      title: 'Convert Image Formats Online: Complete Guide to Image Format Conversion',
      description: 'Convert images between JPEG, PNG, and WebP formats online for free. High-quality image format conversion with preview and batch processing.',
      href: '/blog/convert-image-formats-online',
      readTime: '9 min read',
      category: 'Tutorial'
    }
  ],
  'default': [
    {
      title: 'ConvertMorph: Free PDF Tools for Everyone',
      description: 'Discover our comprehensive suite of free PDF tools for compression, merging, splitting, and more.',
      href: '/blog/convertmorph-free-pdf-tools',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      title: 'How to Compress PDF Files Online: Complete Guide 2025',
      description: 'Learn how to compress PDF files effectively while maintaining quality. Step-by-step guide with free online tools, compression levels, and best practices.',
      href: '/blog/how-to-compress-pdf-files',
      readTime: '8 min read',
      category: 'Tutorial'
    },
    {
      title: 'Merge PDF Files Online: Complete Guide',
      description: 'Step-by-step guide to combining multiple PDF documents into one file using our free online tool.',
      href: '/blog/merge-pdf-files-online',
      readTime: '6 min read',
      category: 'Tutorial'
    }
  ]
};

export function RelatedArticles({ toolName, articles }: RelatedArticlesProps) {
  const displayArticles = articles || defaultArticles[toolName] || defaultArticles.default || [];

  if (!displayArticles || displayArticles.length === 0) {
    return null;
  }

  // Dynamic description based on tool type
  const getDescription = (toolName: string) => {
    if (toolName.includes('image')) {
      return 'Learn more about image processing and optimization techniques';
    }
    return 'Learn more about PDF processing and document management';
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Related Articles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {getDescription(toolName)}
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
