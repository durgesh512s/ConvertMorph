import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Convert — ConvertMorph',
  description: 'Convert images between JPEG, PNG, WebP formats with Canvas API. High-quality conversion with preview. Supports batch processing, quality control. Fast, private, free forever.',
  keywords: ["image convert","format conversion","JPEG to PNG","PNG to WebP","WebP converter","image format","Canvas API","batch convert","quality control","lossless conversion","web optimization"],
  alternates: {
    canonical: absoluteUrl('/tools/image-convert'),
  },
  openGraph: {
    title: 'Image Convert — ConvertMorph',
    description: 'Convert images between JPEG, PNG, WebP formats with Canvas API. High-quality conversion with preview. Supports batch processing, quality control. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-convert.png'),
        width: 1200,
        height: 630,
        alt: 'Image Convert - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-convert'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Convert — ConvertMorph',
    description: 'Convert images between JPEG, PNG, WebP formats with Canvas API. High-quality conversion with preview. Supports batch processing, quality control. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-convert.png')],
  },
}
