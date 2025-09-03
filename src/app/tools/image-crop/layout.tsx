import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Crop — ConvertMorph',
  description: 'Professional image crop tool. Fast, private, free forever.',
  keywords: ["image crop", "image crop", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-crop'),
  },
  openGraph: {
    title: 'Image Crop — ConvertMorph',
    description: 'Professional image crop tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-crop.png'),
        width: 1200,
        height: 630,
        alt: 'Image Crop - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-crop'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Crop — ConvertMorph',
    description: 'Professional image crop tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-crop.png')],
  },
}

export default function ImageCropLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
