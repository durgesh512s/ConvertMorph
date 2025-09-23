import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'PDF Split - Extract Pages & Divide PDF Files Online | ConvertMorph',
  description: 'Split PDF files by page ranges, extract specific pages, or divide into smaller documents online for free. Precise page extraction with our secure browser-based tool.',
  keywords: [
    'PDF split',
    'extract PDF pages',
    'divide PDF',
    'split PDF online',
    'PDF page extractor',
    'separate PDF',
    'PDF splitter',
    'free PDF split',
    'online PDF tools',
    'PDF page extraction'
  ],
  openGraph: {
    title: 'PDF Split - Extract Pages & Divide PDF Files Online',
    description: 'Split PDF files by page ranges, extract specific pages, or divide into smaller documents online for free. Secure browser-based processing.',
    url: absoluteUrl('/tools/pdf-split'),
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og/pdf-split.png'),
        width: 1200,
        height: 630,
        alt: 'PDF Split Tool - ConvertMorph',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Split - Extract Pages & Divide PDF Files Online',
    description: 'Split PDF files by page ranges, extract specific pages, or divide into smaller documents online for free. Secure browser-based processing.',
    images: [absoluteUrl('/og/pdf-split.png')],
  },
  alternates: {
    canonical: absoluteUrl('/tools/pdf-split'),
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
  name: 'PDF Split Tool',
  description: 'Free online PDF splitter that extracts pages and divides PDF files into smaller documents',
  url: absoluteUrl('/tools/pdf-split'),
  applicationCategory: 'Productivity',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Split by page ranges',
    'Extract specific pages',
    'Divide into equal chunks',
    'Browser-based processing',
    'No file uploads required',
    'Batch download support'
  ],
  screenshot: absoluteUrl('/og/pdf-split.png'),
}
