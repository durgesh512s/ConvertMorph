import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Split PDF — ConvertMorph',
  description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
  keywords: ["PDF split","extract PDF pages","divide PDF","split PDF online","PDF page extractor","separate PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-split'),
  },
  openGraph: {
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-split.png'),
        width: 1200,
        height: 630,
        alt: 'Split PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-split'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-split.png')],
  },
}

export default function PdfSplitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
