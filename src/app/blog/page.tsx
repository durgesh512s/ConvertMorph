import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import Newsletter from '@/components/Newsletter';

const blogPosts = [
  {
    title: 'ConvertMorph - Free Online Tools for PDF, Image, Text & Finance',
    excerpt: 'Discover ConvertMorph\'s comprehensive suite of free online tools. Process PDFs, edit images, analyze text, and calculate finances securely with our browser-based tools.',
    date: '2025-09-10',
    readTime: '12 min read',
    slug: 'convertmorph-free-online-tools',
    category: 'Platform Guide',
  },
  {
    title: 'EMI Calculator Guide: Calculate Loan EMI & Interest',
    excerpt: 'Master EMI calculations with our comprehensive guide. Calculate loan EMI, understand interest rates, and plan your finances effectively.',
    date: '2025-08-01',
    readTime: '7 min read',
    slug: 'emi-calculator-guide',
    category: 'Financial Tools',
  },
  {
    title: 'SIP Calculator Guide: Calculate SIP Returns & Investment Growth',
    excerpt: 'Plan your SIP investments with our detailed guide. Calculate returns, understand compound growth, and achieve your financial goals.',
    date: '2025-08-01',
    readTime: '8 min read',
    slug: 'sip-calculator-guide',
    category: 'Financial Tools',
  },
  {
    title: 'HRA Calculator Guide: Calculate House Rent Allowance Exemption',
    excerpt: 'Maximize your HRA tax benefits with our comprehensive guide. Calculate exemptions, understand rules, and save on taxes.',
    date: '2025-08-01',
    readTime: '6 min read',
    slug: 'hra-calculator-guide',
    category: 'Financial Tools',
  },
  {
    title: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount',
    excerpt: 'Master loan calculations with our comprehensive guide. Learn how to calculate EMI, compare loan options, and make informed borrowing decisions.',
    date: '2025-08-01',
    readTime: '8 min read',
    slug: 'loan-calculator-guide',
    category: 'Financial Tools',
  },
  {
    title: 'Tax Calculator Guide: Calculate Income Tax Old vs New Regime',
    excerpt: 'Master income tax calculations with our comprehensive guide. Compare old vs new tax regime, understand tax slabs, and optimize your tax planning.',
    date: '2025-08-01',
    readTime: '9 min read',
    slug: 'tax-calculator-guide',
    category: 'Financial Tools',
  },
  {
    title: 'Text Analysis Tools: Word Counter & Text Comparison Online Free',
    excerpt: 'Comprehensive text analysis tools for writers, students, and professionals. Count words, analyze readability, compare texts, and export detailed reports.',
    date: '2025-05-20',
    readTime: '8 min read',
    slug: 'text-analysis-tools',
    category: 'Text Tools',
  },
  {
    title: 'Crop Images Online: Complete Guide to Image Cropping',
    excerpt: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion.',
    date: '2025-05-15',
    readTime: '12 min read',
    slug: 'crop-images-online',
    category: 'Image Tools',
  },
  {
    title: 'Convert Image Formats Online: Free Image Converter',
    excerpt: 'Convert images between JPEG, PNG, WebP, and other formats online. Free image format converter with quality control and batch processing.',
    date: '2025-07-10',
    readTime: '9 min read',
    slug: 'convert-image-formats-online',
    category: 'Image Tools',
  },
  {
    title: 'Resize Images Online: Free Image Resizer Tool',
    excerpt: 'Resize images online for free with our powerful image resizer. Change image dimensions while maintaining quality for web, social media, and print.',
    date: '2025-07-05',
    readTime: '8 min read',
    slug: 'resize-images-online',
    category: 'Image Tools',
  },
  {
    title: 'Compress Images Online: Complete Guide to Reducing File Size',
    excerpt: 'Learn how to compress images online effectively while maintaining quality. Complete guide to reducing JPEG, PNG, WebP file sizes.',
    date: '2025-06-01',
    readTime: '7 min read',
    slug: 'compress-images-online',
    category: 'Image Tools',
  },
  {
    title: 'How to Compress PDF Files: Complete Guide 2025',
    excerpt: 'Learn how to compress PDF files effectively. Reduce file size while maintaining quality with our step-by-step guide and free online tools.',
    date: '2025-06-15',
    readTime: '8 min read',
    slug: 'how-to-compress-pdf-files',
    category: 'PDF Tools',
  },
  {
    title: 'How to Merge PDF Files Online: Free & Secure',
    excerpt: 'Learn how to merge multiple PDF files into one document online. Free, secure, and easy-to-use PDF merger tool with step-by-step guide.',
    date: '2025-08-20',
    readTime: '6 min read',
    slug: 'merge-pdf-files-online',
    category: 'PDF Tools',
  },
  {
    title: 'Convert Images to PDF: JPG, PNG to PDF Online Free',
    excerpt: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF or create separate PDFs. No software required.',
    date: '2025-10-25',
    readTime: '7 min read',
    slug: 'convert-images-to-pdf',
    category: 'PDF Tools',
  },
  {
    title: 'How to Split PDF Pages: Extract & Separate PDF Files Online',
    excerpt: 'Learn how to split PDF files by pages, extract specific pages, or separate large PDFs into smaller documents. Free online PDF splitter tool.',
    date: '2025-08-30',
    readTime: '6 min read',
    slug: 'split-pdf-pages',
    category: 'PDF Tools',
  },
  {
    title: 'Convert PDF to Images: Extract Pages as JPG/PNG Online',
    excerpt: 'Convert PDF pages to high-quality JPG or PNG images online. Extract all pages or specific pages from PDF documents. Free and secure conversion.',
    date: '2025-04-05',
    readTime: '7 min read',
    slug: 'convert-pdf-to-images',
    category: 'PDF Tools',
  },
  {
    title: 'Organize PDF Pages: Reorder and Rearrange Documents',
    excerpt: 'Learn how to organize, reorder, and rearrange PDF pages with our free online tool. Perfect for restructuring documents and improving readability.',
    date: '2025-07-10',
    readTime: '6 min read',
    slug: 'organize-pdf-pages',
    category: 'PDF Tools',
  },
  {
    title: 'Add Watermark to PDF: Complete Protection Guide',
    excerpt: 'Protect and brand your PDF documents with text or image watermarks. Learn how to add professional watermarks using our free online tool.',
    date: '2025-09-15',
    readTime: '7 min read',
    slug: 'add-watermark-to-pdf',
    category: 'PDF Tools',
  },
  {
    title: 'Sign PDF Documents: Digital Signature Guide',
    excerpt: 'Add secure digital signatures to your PDF documents with our easy-to-use signing tool. Learn about digital signature security and best practices.',
    date: '2025-10-20',
    readTime: '8 min read',
    slug: 'sign-pdf-documents',
    category: 'PDF Tools',
  },
  {
    title: 'Add Page Numbers to PDF: Professional Formatting',
    excerpt: 'Add professional page numbering to your PDF documents with customizable positioning and styles. Perfect for reports, books, and formal documents.',
    date: '2025-09-25',
    readTime: '5 min read',
    slug: 'add-page-numbers-to-pdf',
    category: 'PDF Tools',
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  
  if (!featuredPost) {
    return <div>No blog posts available</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-blue-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            PDF Tips & Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Expert guides, tips, and best practices for working with PDF files. 
            Learn how to compress, merge, split, and convert PDFs like a pro.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50/50 to-blue-50 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl mb-2 dark:text-white">
                {featuredPost.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {featuredPost.excerpt}
              </p>
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Read Full Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 auto-rows-fr">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.slug} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow group flex flex-col h-full">
              <CardHeader className="p-6 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium self-start">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto"
                >
                  Read {post.category} Guide
                  <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Newsletter className="mt-16" />

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tools?category=pdf" className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow border dark:border-gray-700 group">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">PDF Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">9 Tools Available</p>
            </Link>
            <Link href="/tools?category=image" className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow border dark:border-gray-700 group">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Image Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 Tools Available</p>
            </Link>
            <Link href="/tools?category=text" className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow border dark:border-gray-700 group">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Text Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 Tools Available</p>
            </Link>
            <Link href="/tools?category=finance" className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow border dark:border-gray-700 group">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Finance Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 Tools Available</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
