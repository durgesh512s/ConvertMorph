import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Text Compare — ConvertMorph',
  description: 'Professional text compare tool. Fast, private, free forever.',
  keywords: ["text compare", "text compare", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/text-compare'),
  },
  openGraph: {
    title: 'Text Compare — ConvertMorph',
    description: 'Professional text compare tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/text-compare.png'),
        width: 1200,
        height: 630,
        alt: 'Text Compare - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/text-compare'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Compare — ConvertMorph',
    description: 'Professional text compare tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/text-compare.png')],
  },
}

export default function TextCompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
