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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "Image Crop", "item": "https://convertmorph.com/tools/image-crop" }
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
