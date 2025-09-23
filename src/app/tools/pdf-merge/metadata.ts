import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'PDF Merge - Combine Multiple PDF Files Online | ConvertMorph',
  description: 'Merge multiple PDF files into one document online for free. Combine PDFs while preserving quality with our secure browser-based tool. Drag, drop, and reorder pages easily.',
  keywords: [
    'PDF merge',
    'combine PDF',
    'join PDF files',
    'merge PDF online',
    'PDF combiner',
    'unite PDFs',
    'PDF joiner',
    'free PDF merger',
    'online PDF tools',
    'PDF combination'
  ],
  openGraph: {
    title: 'PDF Merge - Combine Multiple PDF Files Online',
    description: 'Merge multiple PDF files into one document online for free. Secure browser-based processing with drag and drop functionality.',
    url: absoluteUrl('/tools/pdf-merge'),
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og/pdf-merge.png'),
        width: 1200,
        height: 630,
        alt: 'PDF Merge Tool - ConvertMorph',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Merge - Combine Multiple PDF Files Online',
    description: 'Merge multiple PDF files into one document online for free. Secure browser-based processing with drag and drop functionality.',
    images: [absoluteUrl('/og/pdf-merge.png')],
  },
  alternates: {
    canonical: absoluteUrl('/tools/pdf-merge'),
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

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Merge Tool',
  description: 'Free online PDF merger that combines multiple PDF files into one document',
  url: absoluteUrl('/tools/pdf-merge'),
  applicationCategory: 'Productivity',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Combine multiple PDF files',
    'Drag and drop interface',
    'Preserve document quality',
    'Browser-based processing',
    'No file uploads required',
    'Instant download'
  ],
  screenshot: absoluteUrl('/og/pdf-merge.png'),
}
