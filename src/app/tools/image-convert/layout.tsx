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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "Image Convert", "item": "https://convertmorph.com/tools/image-convert" }
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
