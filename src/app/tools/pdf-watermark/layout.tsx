import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Add Watermark to PDF — ConvertMorph',
  description: 'Add text or image watermarks to PDF documents. Customize position, opacity, and rotation. Fast, private, free forever.',
  keywords: ["PDF watermark","add watermark PDF","PDF stamp","watermark PDF online","PDF branding","mark PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-watermark'),
  },
  openGraph: {
    title: 'Add Watermark to PDF — ConvertMorph',
    description: 'Add text or image watermarks to PDF documents. Customize position, opacity, and rotation. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-watermark.png'),
        width: 1200,
        height: 630,
        alt: 'Add Watermark to PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-watermark'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Watermark to PDF — ConvertMorph',
    description: 'Add text or image watermarks to PDF documents. Customize position, opacity, and rotation. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-watermark.png')],
  },
}

export default function PdfWatermarkLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Watermark", "item": "https://convertmorph.com/tools/pdf-watermark" }
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
