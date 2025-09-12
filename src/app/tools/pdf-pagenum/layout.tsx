import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF — ConvertMorph',
  description: 'Add page numbers to PDF documents. Customize position, format, and starting number. Fast, private, free forever.',
  keywords: ["PDF page numbers","add page numbers PDF","number PDF pages","PDF pagination","page numbering PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-pagenum'),
  },
  openGraph: {
    title: 'Add Page Numbers to PDF — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and starting number. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-pagenum.png'),
        width: 1200,
        height: 630,
        alt: 'Add Page Numbers to PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-pagenum'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Page Numbers to PDF — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and starting number. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-pagenum.png')],
  },
}

export default function PdfPagenumLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Page Number", "item": "https://convertmorph.com/tools/pdf-pagenum" }
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
