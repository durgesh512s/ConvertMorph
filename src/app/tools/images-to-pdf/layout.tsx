import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Images to PDF — ConvertMorph',
  description: 'Convert images to PDF documents. Combine multiple images into one PDF with custom page sizes. Fast, private, free forever.',
  openGraph: {
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert images to PDF documents. Combine multiple images into one PDF with custom page sizes. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-images-to-pdf.png')],
    type: 'website',
    url: absoluteUrl('/tools/images-to-pdf'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert images to PDF documents. Combine multiple images into one PDF with custom page sizes. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-images-to-pdf.png')],
  },
}

export default function ImagesToPDFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
