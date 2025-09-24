import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Compress — ConvertMorph',
  description: 'Compress images with advanced algorithms. Reduce file sizes by up to 70% while maintaining quality. Supports JPEG, PNG, WebP. Fast, private, free forever.',
  keywords: ["image compress","image compression","compress images","reduce image size","optimize images","image optimizer","JPEG compress","PNG compress","WebP compress"],
  alternates: {
    canonical: absoluteUrl('/tools/image-compress'),
  },
  openGraph: {
    title: 'Image Compress — ConvertMorph',
    description: 'Compress images with advanced algorithms. Reduce file sizes by up to 70% while maintaining quality. Supports JPEG, PNG, WebP. Fast, private, free forever.',
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
    description: 'Compress images with advanced algorithms. Reduce file sizes by up to 70% while maintaining quality. Supports JPEG, PNG, WebP. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-compress.png')],
  },
}
