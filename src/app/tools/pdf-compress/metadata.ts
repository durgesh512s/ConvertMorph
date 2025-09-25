import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'PDF Compress - Reduce PDF File Size Online | ConvertMorph',
  description: 'Compress PDF files online for free. Reduce PDF file size while maintaining quality with our smart compression algorithms. Choose from light, medium, or strong compression levels. 100% secure and private.',
  keywords: [
    'PDF compress',
    'reduce PDF size',
    'PDF compression',
    'compress PDF online',
    'PDF optimizer',
    'shrink PDF',
    'PDF file size reducer',
    'free PDF compressor',
    'online PDF tools',
    'PDF optimization'
  ],
  openGraph: {
    title: 'PDF Compress - Reduce PDF File Size Online',
    description: 'Compress PDF files online for free. Smart compression algorithms reduce file size while maintaining quality. Secure browser-based processing.',
    url: absoluteUrl('/tools/pdf-compress'),
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og/pdf-compress.png'),
        width: 1200,
        height: 630,
        alt: 'PDF Compress Tool - ConvertMorph',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Compress - Reduce PDF File Size Online',
    description: 'Compress PDF files online for free. Smart compression algorithms reduce file size while maintaining quality.',
    images: [absoluteUrl('/og/pdf-compress.png')],
  },
  alternates: {
    canonical: absoluteUrl('/tools/pdf-compress'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

// Comprehensive Rich Results Schema for PDF Compress Tool
export const jsonLd = [
  // Breadcrumb Schema for PDF Compress
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': absoluteUrl('/tools/pdf-compress#breadcrumb'),
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/')
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: absoluteUrl('/tools')
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'PDF Compress',
        item: absoluteUrl('/tools/pdf-compress')
      }
    ]
  },

  // Primary SoftwareApplication Schema
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': absoluteUrl('/tools/pdf-compress#software'),
    name: 'PDF Compress - Free PDF Compression Tool',
    alternateName: 'PDF Compressor',
    description: 'Professional PDF compression tool that reduces file size by up to 60% while maintaining visual quality. Smart algorithms optimize PDFs for web, email, and storage with light, medium, and strong compression levels.',
    url: absoluteUrl('/tools/pdf-compress'),
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Document Processing',
    operatingSystem: 'Web Browser',
    softwareVersion: '2.0',
    releaseDate: '2025-01-01',
    dateModified: '2025-01-15',
    publisher: {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: 'ConvertMorph'
    },
    creator: {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: 'ConvertMorph'
    },
    offers: {
      '@type': 'Offer',
      name: 'Free PDF Compression Service',
      description: 'Completely free PDF compression with no registration required',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Software Application',
      validFrom: '2025-01-01'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '420',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '420'
    },
    featureList: [
      'Smart compression algorithms with quality preservation',
      'Multiple compression levels (Light, Medium, Strong)',
      'Batch processing up to 10 files simultaneously',
      'Browser-based processing for maximum privacy',
      'No file uploads - everything happens locally',
      'Instant download with original filename preservation',
      'Support for files up to 100MB each',
      'Maintains PDF structure and metadata',
      'Works with password-protected PDFs after unlocking',
      'Cross-platform compatibility'
    ],
    screenshot: {
      '@type': 'ImageObject',
      url: absoluteUrl('/og/pdf-compress.png'),
      width: 1200,
      height: 630,
      caption: 'PDF Compress Tool Interface'
    },
    downloadUrl: absoluteUrl('/tools/pdf-compress'),
    installUrl: absoluteUrl('/tools/pdf-compress'),
    memoryRequirements: '512MB RAM',
    storageRequirements: '0MB (browser-based)',
    permissions: 'No special permissions required',
    supportingData: {
      '@type': 'DataSet',
      name: 'PDF Compression Statistics',
      description: 'Performance data showing average compression rates'
    }
  },
  
  // WebPage Schema for SEO
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': absoluteUrl('/tools/pdf-compress#webpage'),
    url: absoluteUrl('/tools/pdf-compress'),
    name: 'PDF Compress - Reduce PDF File Size Online | ConvertMorph',
    description: 'Compress PDF files online for free. Reduce PDF file size while maintaining quality with our smart compression algorithms. Choose from light, medium, or strong compression levels.',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: 'ConvertMorph'
    },
    about: {
      '@type': 'Thing',
      name: 'PDF Compression',
      description: 'Digital document optimization and file size reduction'
    },
    mainEntity: {
      '@id': absoluteUrl('/tools/pdf-compress#software')
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.tool-description']
    }
  },

  // HowTo Schema for Step-by-Step Instructions
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': absoluteUrl('/tools/pdf-compress#howto'),
    name: 'How to Compress PDF Files Online',
    description: 'Step-by-step guide to compress PDF files while maintaining quality using our free online tool',
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl('/og/pdf-compress.png'),
      width: 1200,
      height: 630
    },
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'PDF file to compress'
      },
      {
        '@type': 'HowToSupply',
        name: 'Web browser (Chrome, Firefox, Safari, Edge)'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'ConvertMorph PDF Compress Tool',
        url: absoluteUrl('/tools/pdf-compress')
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload PDF Files',
        text: 'Click "Choose Files" or drag and drop your PDF files into the upload area. You can select up to 10 files at once.',
        image: {
          '@type': 'ImageObject',
          url: absoluteUrl('/og/pdf-compress.png'),
          width: 1200,
          height: 630
        }
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Compression Level',
        text: 'Choose your preferred compression level: Light (20% reduction), Medium (40% reduction), or Strong (60% reduction) based on your quality requirements.',
        image: {
          '@type': 'ImageObject',
          url: absoluteUrl('/og/pdf-compress.png'),
          width: 1200,
          height: 630
        }
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Start Compression',
        text: 'Click "Compress PDFs" to begin the compression process. All processing happens in your browser for maximum privacy.',
        image: {
          '@type': 'ImageObject',
          url: absoluteUrl('/og/pdf-compress.png'),
          width: 1200,
          height: 630
        }
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download Compressed Files',
        text: 'Once compression is complete, download your optimized PDF files individually or as a ZIP archive. Files maintain their original names with size reduction.',
        image: {
          '@type': 'ImageObject',
          url: absoluteUrl('/og/pdf-compress.png'),
          width: 1200,
          height: 630
        }
      }
    ],
    yield: {
      '@type': 'Thing',
      name: 'Compressed PDF files',
      description: 'PDF files with reduced file size while maintaining visual quality'
    }
  }
]
