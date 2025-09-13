import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Sign PDF — ConvertMorph',
  description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
  keywords: ["sign PDF","PDF signature","digital signature PDF","e-sign PDF","PDF signing","electronic signature"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-sign'),
  },
  openGraph: {
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-sign.png'),
        width: 1200,
        height: 630,
        alt: 'Sign PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-sign'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-sign.png')],
  },
}

export default function PdfSignLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Sign", "item": "https://convertmorph.com/tools/pdf-sign" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How do I create a digital signature?",
          "answer": "You can draw your signature using a mouse or touchscreen, upload an image of your signature, or type your name in various signature fonts."
      },
      {
          "question": "Can I save my signature for reuse?",
          "answer": "Yes, you can save your signature locally in your browser for quick reuse across multiple documents."
      },
      {
          "question": "Are digital signatures legally valid?",
          "answer": "Digital signatures created with our tool are suitable for most business purposes, but legal validity depends on your jurisdiction and specific use case."
      },
      {
          "question": "Can I add multiple signatures to one document?",
          "answer": "Yes, you can add multiple signatures, initials, dates, and text fields to different locations within the same PDF document."
      },
      {
          "question": "Is my data secure during signing?",
          "answer": "Absolutely! All PDF signing happens entirely in your browser. Your documents and signatures are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What's the maximum PDF size I can sign?",
          "answer": "You can sign PDF files up to 100MB. This covers most document types while ensuring optimal browser performance."
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
