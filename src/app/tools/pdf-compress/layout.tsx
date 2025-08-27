import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compress PDF — ConvertMorph',
  description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
  openGraph: {
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: ['/og/og-compress.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: ['/og/og-compress.png'],
  },
}

export default function PDFCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
