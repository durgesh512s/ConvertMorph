import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Sign — ConvertMorph',
  description: 'Add digital signatures to PDF documents. Sign with text, drawing, or upload signature images. Fast, private, free forever.',
  openGraph: {
    title: 'PDF Sign — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Sign with text, drawing, or upload signature images. Fast, private, free forever.',
    images: ['/og/pdf-sign.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Sign — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Sign with text, drawing, or upload signature images. Fast, private, free forever.',
    images: ['/og/pdf-sign.png'],
  },
}

export default function PdfSignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
