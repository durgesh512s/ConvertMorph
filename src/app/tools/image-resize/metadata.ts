import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Resize — ConvertMorph',
  description: 'Resize images to exact dimensions with precision. Maintain aspect ratio or resize freely. Supports JPEG, PNG, WebP with quality control. Fast, private, free forever.',
  keywords: ["image resize","resize images","image dimensions","aspect ratio","image scaling","photo resize","bulk resize","canvas resize","JPEG resize","PNG resize","WebP resize"],
  alternates: {
    canonical: absoluteUrl('/tools/image-resize'),
  },
  openGraph: {
    title: 'Image Resize — ConvertMorph',
    description: 'Resize images to exact dimensions with precision. Maintain aspect ratio or resize freely. Supports JPEG, PNG, WebP with quality control. Fast, private, free forever.',
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
    description: 'Resize images to exact dimensions with precision. Maintain aspect ratio or resize freely. Supports JPEG, PNG, WebP with quality control. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-resize.png')],
  },
}
