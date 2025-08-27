import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Watermark — ConvertMorph',
  description: 'Add watermarks to PDF files. Insert text or image watermarks with custom positioning. Fast, private, free forever.',
  openGraph: {
    title: 'PDF Watermark — ConvertMorph',
    description: 'Add watermarks to PDF files. Insert text or image watermarks with custom positioning. Fast, private, free forever.',
    images: ['/og/og-watermark.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Watermark — ConvertMorph',
    description: 'Add watermarks to PDF files. Insert text or image watermarks with custom positioning. Fast, private, free forever.',
    images: ['/og/og-watermark.png'],
  },
}

export default function PdfWatermarkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
