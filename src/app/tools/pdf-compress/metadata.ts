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

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Compress Tool',
  description: 'Free online PDF compression tool that reduces file size while maintaining quality',
  url: absoluteUrl('/tools/pdf-compress'),
  applicationCategory: 'Productivity',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Smart compression algorithms',
    'Multiple compression levels',
    'Batch processing',
    'Browser-based processing',
    'No file uploads required',
    'Instant download'
  ],
  screenshot: absoluteUrl('/og/pdf-compress.png'),
}
