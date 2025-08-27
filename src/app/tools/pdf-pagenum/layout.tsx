import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Page Numbers — ConvertMorph',
  description: 'Add page numbers to PDF documents. Customize position, format, and styling. Fast, private, free forever.',
  openGraph: {
    title: 'PDF Page Numbers — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and styling. Fast, private, free forever.',
    images: ['/og/og-pagenum.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Page Numbers — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and styling. Fast, private, free forever.',
    images: ['/og/og-pagenum.png'],
  },
}

export default function PdfPagenumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
