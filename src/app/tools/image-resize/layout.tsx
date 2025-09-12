import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Image Resize — ConvertMorph',
  description: 'Professional image resize tool. Fast, private, free forever.',
  keywords: ["image resize", "image resize", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-resize'),
  },
  openGraph: {
    title: 'Image Resize — ConvertMorph',
    description: 'Professional image resize tool. Fast, private, free forever.',
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
    description: 'Professional image resize tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-resize.png')],
  },
}

export default function ImageResizeLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Image Resize", "item": "https://convertmorph.com/tools/image-resize" }
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
