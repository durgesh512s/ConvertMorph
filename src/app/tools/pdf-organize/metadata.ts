import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Organize PDF — ConvertMorph',
  description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
  keywords: ["organize PDF","reorder PDF pages","rotate PDF","rearrange PDF","PDF page organizer","sort PDF pages"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-organize'),
  },
  openGraph: {
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-organize.png'),
        width: 1200,
        height: 630,
        alt: 'Organize PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-organize'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-organize.png')],
  },
}
