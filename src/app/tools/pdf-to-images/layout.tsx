import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'PDF to Images — ConvertMorph',
  description: 'Convert PDF pages to JPG, PNG images. Extract all pages or specific pages as high-quality images. Fast, private, free forever.',
  keywords: ["PDF to images","PDF to JPG","PDF to PNG","convert PDF images","extract PDF pages","PDF page images"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-to-images'),
  },
  openGraph: {
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to JPG, PNG images. Extract all pages or specific pages as high-quality images. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-to-images.png'),
        width: 1200,
        height: 630,
        alt: 'PDF to Images - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-to-images'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to JPG, PNG images. Extract all pages or specific pages as high-quality images. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-to-images.png')],
  },
}

export default function PdfToImagesLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF to Images", "item": "https://convertmorph.com/tools/pdf-to-images" }
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
