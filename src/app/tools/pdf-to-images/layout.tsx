import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF to Images — ConvertMorph',
  description: 'Convert PDF pages to images. Extract as JPG, PNG with custom quality settings. Fast, private, free forever.',
  openGraph: {
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to images. Extract as JPG, PNG with custom quality settings. Fast, private, free forever.',
    images: ['/og/og-pdf-to-images.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to images. Extract as JPG, PNG with custom quality settings. Fast, private, free forever.',
    images: ['/og/og-pdf-to-images.png'],
  },
}

export default function PdfToImagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
