import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Crop — ConvertMorph',
  description: 'Crop images with precision using React Easy Crop. Multiple aspect ratios, Canvas API processing, batch cropping. Support for JPEG, PNG, WebP formats. Fast, private, free forever.',
  keywords: ["image crop","photo crop","crop tool","aspect ratio","React Easy Crop","Canvas API","batch crop","precision crop","16:9 crop","square crop","free crop","image editor"],
  alternates: {
    canonical: absoluteUrl('/tools/image-crop'),
  },
  openGraph: {
    title: 'Image Crop — ConvertMorph',
    description: 'Crop images with precision using React Easy Crop. Multiple aspect ratios, Canvas API processing, batch cropping. Support for JPEG, PNG, WebP formats. Fast, private, free forever.',
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
    description: 'Crop images with precision using React Easy Crop. Multiple aspect ratios, Canvas API processing, batch cropping. Support for JPEG, PNG, WebP formats. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-crop.png')],
  },
}
