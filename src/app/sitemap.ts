import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://convertmorph.com'

  // All Tools (verified against actual routes)
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

  // All Blog Posts (verified against actual blog directories)
  const blogPosts = [
    'add-page-numbers-to-pdf',
    'add-watermark-to-pdf',
    'compress-images-online',
    'convert-image-formats-online',
    'convert-images-to-pdf',
    'convert-pdf-to-images',
    'convertmorph-free-online-tools',
    'crop-images-online',
    'emi-calculator-guide',
    'how-to-compress-pdf-files',
    'hra-calculator-guide',
    'loan-calculator-guide',
    'merge-pdf-files-online',
    'organize-pdf-pages',
    'resize-images-online',
    'sign-pdf-documents',
    'sip-calculator-guide',
    'split-pdf-pages',
    'tax-calculator-guide',
    'text-analysis-tools'
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
