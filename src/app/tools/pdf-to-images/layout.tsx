import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

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

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What image formats can I convert PDF pages to?",
          "answer": "You can convert PDF pages to JPEG, PNG, or WebP formats. Each format offers different benefits for quality and file size."
      },
      {
          "question": "Can I convert specific pages only?",
          "answer": "Yes, you can select individual pages or page ranges to convert, rather than converting the entire PDF document."
      },
      {
          "question": "What resolution options are available?",
          "answer": "You can choose from various DPI settings (72, 150, 300, 600) to balance image quality and file size based on your needs."
      },
      {
          "question": "Will conversion preserve image quality?",
          "answer": "Yes, conversion maintains high quality based on your selected DPI. Higher DPI settings produce better quality but larger file sizes."
      },
      {
          "question": "Is my data secure during conversion?",
          "answer": "Absolutely! All PDF to image conversion happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I convert password-protected PDFs?",
          "answer": "Currently, password-protected PDFs cannot be converted. Please remove the password protection first, then convert the pages."
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
