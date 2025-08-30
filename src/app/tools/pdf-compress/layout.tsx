import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Compress PDF — ConvertMorph',
  description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
  keywords: ["PDF compress","reduce PDF size","PDF compression","compress PDF online","PDF optimizer","shrink PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-compress'),
  },
  openGraph: {
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-compress.png'),
        width: 1200,
        height: 630,
        alt: 'Compress PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-compress'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-compress.png')],
  },
}

export default function PdfCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
