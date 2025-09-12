import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Organize PDF — ConvertMorph',
  description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
  keywords: ["organize PDF","reorder PDF pages","rotate PDF","rearrange PDF","PDF page organizer","sort PDF pages"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-organize'),
  },
  openGraph: {
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-organize.png'),
        width: 1200,
        height: 630,
        alt: 'Organize PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-organize'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-organize.png')],
  },
}

export default function PdfOrganizeLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Organize", "item": "https://convertmorph.com/tools/pdf-organize" }
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
