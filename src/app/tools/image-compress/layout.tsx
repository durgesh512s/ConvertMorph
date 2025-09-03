import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Compress — ConvertMorph',
  description: 'Professional image compress tool. Fast, private, free forever.',
  keywords: ["image compress", "image compress", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-compress'),
  },
  openGraph: {
    title: 'Image Compress — ConvertMorph',
    description: 'Professional image compress tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-compress.png'),
        width: 1200,
        height: 630,
        alt: 'Image Compress - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-compress'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Compress — ConvertMorph',
    description: 'Professional image compress tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-compress.png')],
  },
}

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
