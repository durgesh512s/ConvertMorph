import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // More robust URL detection for different environments
  const baseUrl = process.env.SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  process.env.NEXT_PUBLIC_SITE_URL || 
                  'https://convertmorph.com'

  // Core PDF tools with realistic last modified dates (March-May 2025)
  const coreTools = [
    { slug: 'pdf-compress', lastModified: '2025-05-15' },
    { slug: 'pdf-merge', lastModified: '2025-05-10' },
    { slug: 'pdf-split', lastModified: '2025-05-08' },
    { slug: 'images-to-pdf', lastModified: '2025-05-05' },
    { slug: 'pdf-to-images', lastModified: '2025-05-03' },
    { slug: 'pdf-organize', lastModified: '2025-04-28' },
    { slug: 'pdf-watermark', lastModified: '2025-04-25' },
    { slug: 'pdf-pagenum', lastModified: '2025-04-20' },
    { slug: 'pdf-sign', lastModified: '2025-04-18' }
  ]

  // Calculator tools (April 2025)
  const calculatorTools = [
    { slug: 'emi-calculator', lastModified: '2025-04-15' },
    { slug: 'sip-calculator', lastModified: '2025-04-12' },
    { slug: 'hra-calculator', lastModified: '2025-04-10' },
    { slug: 'loan-calculator', lastModified: '2025-04-08' },
    { slug: 'tax-calculator', lastModified: '2025-04-05' }
  ]

  // Image tools (March-April 2025)
  const imageTools = [
    { slug: 'image-compress', lastModified: '2025-04-01' },
    { slug: 'image-convert', lastModified: '2025-03-28' },
    { slug: 'image-crop', lastModified: '2025-03-25' },
    { slug: 'image-resize', lastModified: '2025-03-22' }
  ]

  // Text tools (March 2025)
  const textTools = [
    { slug: 'text-compare', lastModified: '2025-03-20' },
    { slug: 'word-counter', lastModified: '2025-03-18' }
  ]

  // Recent blog posts with realistic dates (July-August 2025 - most recent)
  const recentBlogPosts = [
    { slug: 'how-to-compress-pdf-files', lastModified: '2025-08-05' },
    { slug: 'merge-pdf-files-online', lastModified: '2025-08-02' },
    { slug: 'split-pdf-pages', lastModified: '2025-07-30' },
    { slug: 'convert-images-to-pdf', lastModified: '2025-07-28' },
    { slug: 'convert-pdf-to-images', lastModified: '2025-07-25' },
    { slug: 'compress-images-online', lastModified: '2025-07-22' },
    { slug: 'emi-calculator-guide', lastModified: '2025-07-20' },
    { slug: 'sip-calculator-guide', lastModified: '2025-07-18' },
    { slug: 'loan-calculator-guide', lastModified: '2025-07-15' },
    { slug: 'convertmorph-free-online-tools', lastModified: '2025-07-12' }
  ]

  // Older blog posts (June-July 2025)
  const olderBlogPosts = [
    { slug: 'add-page-numbers-to-pdf', lastModified: '2025-07-08' },
    { slug: 'add-watermark-to-pdf', lastModified: '2025-07-05' },
    { slug: 'convert-image-formats-online', lastModified: '2025-07-02' },
    { slug: 'crop-images-online', lastModified: '2025-06-28' },
    { slug: 'hra-calculator-guide', lastModified: '2025-06-25' },
    { slug: 'organize-pdf-pages', lastModified: '2025-06-22' },
    { slug: 'resize-images-online', lastModified: '2025-06-18' },
    { slug: 'sign-pdf-documents', lastModified: '2025-06-15' },
    { slug: 'tax-calculator-guide', lastModified: '2025-06-12' },
    { slug: 'text-analysis-tools', lastModified: '2025-06-08' }
  ]

  const allTools = [...coreTools, ...calculatorTools, ...imageTools, ...textTools]
  const allBlogPosts = [...recentBlogPosts, ...olderBlogPosts]

  return [
    // Homepage - highest priority (August 2025)
    {
      url: baseUrl,
      lastModified: new Date('2025-08-15'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Main tools page (August 2025)
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date('2025-08-12'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // All tool pages with realistic dates
    ...allTools.map(tool => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(tool.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    
    // Blog main page (August 2025)
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2025-08-10'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    
    // All blog posts with realistic recent dates
    ...allBlogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    
    // Static pages (most recent updates - August 2025)
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-08-25'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-08-22'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-08-28'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-08-30'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
