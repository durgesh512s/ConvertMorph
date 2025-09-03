import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Resize — ConvertMorph',
  description: 'Professional image resize tool. Fast, private, free forever.',
  keywords: ["image resize", "image resize", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-resize'),
  },
  openGraph: {
    title: 'Image Resize — ConvertMorph',
    description: 'Professional image resize tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-resize.png'),
        width: 1200,
        height: 630,
        alt: 'Image Resize - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-resize'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resize — ConvertMorph',
    description: 'Professional image resize tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-resize.png')],
  },
}

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
