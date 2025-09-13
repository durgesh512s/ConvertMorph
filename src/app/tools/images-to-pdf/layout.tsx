import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

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

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What image formats can I convert to PDF?",
          "answer": "You can convert JPEG, PNG, WebP, GIF, and BMP images to PDF. All formats are supported with high-quality conversion."
      },
      {
          "question": "Can I combine multiple images into one PDF?",
          "answer": "Yes, you can add multiple images and they'll be combined into a single PDF document with each image on a separate page."
      },
      {
          "question": "How do I control image order in the PDF?",
          "answer": "Images are arranged in the order you add them. You can drag and drop to reorder images before generating the PDF."
      },
      {
          "question": "What page sizes are available?",
          "answer": "We support standard page sizes like A4, Letter, Legal, and custom dimensions. Images are automatically fitted to the selected page size."
      },
      {
          "question": "Is my data secure during conversion?",
          "answer": "Absolutely! All image to PDF conversion happens entirely in your browser. Your files are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I adjust image quality in the PDF?",
          "answer": "Yes, you can choose compression levels to balance file size and image quality in the resulting PDF document."
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
