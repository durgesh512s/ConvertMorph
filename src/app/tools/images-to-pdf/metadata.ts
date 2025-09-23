import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Images to PDF — ConvertMorph',
  description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
  keywords: ["images to PDF","JPG to PDF","PNG to PDF","convert images PDF","photo to PDF","picture to PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/images-to-pdf'),
  },
  openGraph: {
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/images-to-pdf.png'),
        width: 1200,
        height: 630,
        alt: 'Images to PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/images-to-pdf'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
    images: [absoluteUrl('/og/images-to-pdf.png')],
  },
}
