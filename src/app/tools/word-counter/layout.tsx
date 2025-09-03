import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Word Counter — ConvertMorph',
  description: 'Professional word counter tool. Fast, private, free forever.',
  keywords: ["word counter", "word counter", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/word-counter'),
  },
  openGraph: {
    title: 'Word Counter — ConvertMorph',
    description: 'Professional word counter tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/word-counter.png'),
        width: 1200,
        height: 630,
        alt: 'Word Counter - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/word-counter'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter — ConvertMorph',
    description: 'Professional word counter tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/word-counter.png')],
  },
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
