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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "Word Counter", "item": "https://convertmorph.com/tools/word-counter" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
