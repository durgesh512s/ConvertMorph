import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://convertmorph.com'

  // All Tools
  const tools = [
    'pdf-compress',
    'pdf-merge',
    'pdf-split',
    'images-to-pdf',
    'pdf-to-images',
    'pdf-organize',
    'pdf-watermark',
    'pdf-pagenum',
    'pdf-sign',
    'emi-calculator',
    'sip-calculator',
    'hra-calculator',
    'loan-calculator',
    'tax-calculator',
    'image-compress',
    'image-convert',
    'image-crop',
    'image-resize',
    'text-compare',
    'word-counter'
  ]

  // All Blog Posts
  const blogPosts = [
    'convertmorph-free-pdf-tools',
    'how-to-compress-pdf-files',
    'merge-pdf-files-online',
    'convert-images-to-pdf',
    'split-pdf-pages',
    'convert-pdf-to-images',
    'organize-pdf-pages',
    'add-watermark-to-pdf',
    'sign-pdf-documents',
    'add-page-numbers-to-pdf',
    'emi-calculator-guide',
    'sip-calculator-guide',
    'hra-calculator-guide',
    'loan-calculator-guide',
    'tax-calculator-guide',
    'compress-images-online',
    'convert-image-formats-online',
    'crop-images-online',
    'resize-images-online',
    'text-analysis-tools',
    'convertmorph-free-online-tools'
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // All Tools
    ...tools.map(tool => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // All Blog Posts
    ...blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-01-01"), // static date
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}