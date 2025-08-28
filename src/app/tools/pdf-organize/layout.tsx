import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Organize — ConvertMorph',
  description: 'Organize PDF pages by reordering, rotating, and rearranging. Customize your document layout. Fast, private, free forever.',
  openGraph: {
    title: 'PDF Organize — ConvertMorph',
    description: 'Organize PDF pages by reordering, rotating, and rearranging. Customize your document layout. Fast, private, free forever.',
    images: ['/og/pdf-organize.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Organize — ConvertMorph',
    description: 'Organize PDF pages by reordering, rotating, and rearranging. Customize your document layout. Fast, private, free forever.',
    images: ['/og/pdf-organize.png'],
  },
}

export default function PdfOrganizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
