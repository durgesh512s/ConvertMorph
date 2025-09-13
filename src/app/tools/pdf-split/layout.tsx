import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Split PDF — ConvertMorph',
  description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
  keywords: ["PDF split","extract PDF pages","divide PDF","split PDF online","PDF page extractor","separate PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-split'),
  },
  openGraph: {
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-split.png'),
        width: 1200,
        height: 630,
        alt: 'Split PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-split'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-split.png')],
  },
}

export default function PdfSplitLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Split", "item": "https://convertmorph.com/tools/pdf-split" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How can I split my PDF?",
          "answer": "You can split by page ranges, extract specific pages, or split into individual pages. Choose the method that best fits your needs."
      },
      {
          "question": "Can I split into multiple files at once?",
          "answer": "Yes, you can define multiple page ranges and create several PDF files in a single operation."
      },
      {
          "question": "Will splitting affect PDF quality?",
          "answer": "No, splitting preserves the original quality of all pages. No compression or quality loss occurs during the split process."
      },
      {
          "question": "Can I preview pages before splitting?",
          "answer": "Yes, all pages are displayed as thumbnails so you can see exactly which pages you're selecting for each split operation."
      },
      {
          "question": "Is my data secure during splitting?",
          "answer": "Absolutely! All PDF splitting happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What's the maximum PDF size I can split?",
          "answer": "You can split PDF files up to 100MB with unlimited pages. This covers most document types while ensuring optimal browser performance."
      }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
      {children}
    </>
  )
}
