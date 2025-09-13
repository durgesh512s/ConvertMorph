import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Compress PDF — ConvertMorph',
  description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
  keywords: ["PDF compress","reduce PDF size","PDF compression","compress PDF online","PDF optimizer","shrink PDF"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-compress'),
  },
  openGraph: {
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-compress.png'),
        width: 1200,
        height: 630,
        alt: 'Compress PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-compress'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-compress.png')],
  },
}

export default function PdfCompressLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Compress", "item": "https://convertmorph.com/tools/pdf-compress" }
    ]
  };

  // FAQ data for structured data
  const faqs = [
    {
      question: 'How much can I compress my PDF files?',
      answer: 'Compression results vary by content type. Light compression typically reduces size by 20%, medium by 40%, and strong by up to 60%. Image-heavy PDFs compress more than text-only documents.'
    },
    {
      question: 'Will compression affect PDF quality?',
      answer: 'Our smart compression algorithms are designed to maintain visual quality while reducing file size. Light compression preserves maximum quality, while stronger levels provide smaller files with minimal quality loss.'
    },
    {
      question: 'Is my data secure during compression?',
      answer: 'Absolutely! All PDF compression happens entirely in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security of your documents.'
    },
    {
      question: "What's the maximum file size I can compress?",
      answer: 'You can compress PDF files up to 100MB each, with a maximum of 10 files per batch. This ensures optimal performance and prevents browser memory issues.'
    },
    {
      question: 'Can I compress password-protected PDFs?',
      answer: 'Currently, password-protected PDFs cannot be compressed. Please remove the password protection first, then compress the file and re-apply security if needed.'
    },
    {
      question: 'Which compression level should I choose?',
      answer: 'Choose Light for documents where quality is critical, Medium for general use with balanced size and quality, and Strong for maximum size reduction when quality is less important.'
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
