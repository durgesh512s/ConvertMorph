import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Sign PDF — ConvertMorph',
  description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
  keywords: ["sign PDF","PDF signature","digital signature PDF","e-sign PDF","PDF signing","electronic signature"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-sign'),
  },
  openGraph: {
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-sign.png'),
        width: 1200,
        height: 630,
        alt: 'Sign PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-sign'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-sign.png')],
  },
}

export default function PdfSignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
