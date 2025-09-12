import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Images to PDF — ConvertMorph',
  description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
  keywords: ["images to PDF","JPG to PDF","PNG to PDF","convert images PDF","photo to PDF","picture to PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/images-to-pdf'),
  },
  openGraph: {
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/images-to-pdf.png'),
        width: 1200,
        height: 630,
        alt: 'Images to PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/images-to-pdf'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
    images: [absoluteUrl('/og/images-to-pdf.png')],
  },
}

export default function ImagesToPdfLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Images to PDF", "item": "https://convertmorph.com/tools/images-to-pdf" }
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
