import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Merge PDF — ConvertMorph',
  description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
  keywords: ["PDF merge","combine PDF","join PDF files","merge PDF online","PDF combiner","unite PDFs"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-merge'),
  },
  openGraph: {
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-merge.png'),
        width: 1200,
        height: 630,
        alt: 'Merge PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-merge'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-merge.png')],
  },
}

export default function PdfMergeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
