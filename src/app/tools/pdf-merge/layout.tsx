import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Merge PDF — ConvertMorph',
  description: 'Combine multiple PDF files into one document. Drag, drop, reorder pages and merge PDFs instantly. Fast, private, free forever.',
  openGraph: {
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, reorder pages and merge PDFs instantly. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-merge.png')],
    type: 'website',
    url: absoluteUrl('/tools/pdf-merge'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, reorder pages and merge PDFs instantly. Fast, private, free forever.',
    images: [absoluteUrl('/og/og-merge.png')],
  },
}

export default function PDFMergeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
