import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

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

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What types of watermarks can I add?",
          "answer": "You can add text watermarks, image watermarks, or both. Text can be customized with different fonts, sizes, colors, and transparency levels."
      },
      {
          "question": "Can I control watermark position and opacity?",
          "answer": "Yes, you can position watermarks anywhere on the page and adjust opacity from 10% to 100% to achieve the desired visibility."
      },
      {
          "question": "Will watermarks appear on all pages?",
          "answer": "By default, watermarks are applied to all pages, but you can choose to apply them to specific page ranges if needed."
      },
      {
          "question": "Can I rotate watermarks?",
          "answer": "Yes, you can rotate text watermarks to any angle, including diagonal placement across the page for security purposes."
      },
      {
          "question": "Is my data secure during watermarking?",
          "answer": "Absolutely! All PDF watermarking happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I remove watermarks after adding them?",
          "answer": "Once watermarks are added and saved, they become part of the PDF content. Keep a backup of your original PDF if you might need to remove them."
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
