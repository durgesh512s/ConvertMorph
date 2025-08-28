import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Split PDF — ConvertMorph',
  description: 'Extract pages from PDF files. Split by page ranges, individual pages, or custom selections. Fast, private, free forever.',
  openGraph: {
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges, individual pages, or custom selections. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-split.png')],
    type: 'website',
    url: absoluteUrl('/tools/pdf-split'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges, individual pages, or custom selections. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-split.png')],
  },
}

export default function PDFSplitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
