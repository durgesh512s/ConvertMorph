import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Convert — ConvertMorph',
  description: 'Professional image convert tool. Fast, private, free forever.',
  keywords: ["image convert", "image convert", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-convert'),
  },
  openGraph: {
    title: 'Image Convert — ConvertMorph',
    description: 'Professional image convert tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-convert.png'),
        width: 1200,
        height: 630,
        alt: 'Image Convert - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-convert'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Convert — ConvertMorph',
    description: 'Professional image convert tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-convert.png')],
  },
}

export default function ImageConvertLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
