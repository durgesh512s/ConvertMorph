import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Hra Calculator — ConvertMorph',
  description: 'Professional hra calculator tool. Fast, private, free forever.',
  keywords: ["hra calculator", "hra calculator", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/hra-calculator'),
  },
  openGraph: {
    title: 'Hra Calculator — ConvertMorph',
    description: 'Professional hra calculator tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/hra-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Hra Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/hra-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hra Calculator — ConvertMorph',
    description: 'Professional hra calculator tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/hra-calculator.png')],
  },
}

export default function HraCalculatorLayout({
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
      { "@type": "ListItem", "position": 3, "name": "HRA Calculator", "item": "https://convertmorph.com/tools/hra-calculator" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How is HRA exemption calculated?",
          "answer": "HRA exemption is the minimum of: actual HRA received, 50% of salary (40% for non-metro cities), or actual rent paid minus 10% of salary."
      },
      {
          "question": "What documents are needed for HRA claim?",
          "answer": "You need rent receipts, rental agreement, landlord's PAN (if rent exceeds ₹1 lakh annually), and HRA certificate from employer."
      },
      {
          "question": "Can I claim HRA if I own a house?",
          "answer": "Yes, you can claim HRA even if you own a house, provided you live in a rented accommodation in a different city for work purposes."
      },
      {
          "question": "What is the difference between metro and non-metro HRA?",
          "answer": "Metro cities (Delhi, Mumbai, Chennai, Kolkata) allow 50% of salary as HRA exemption, while non-metro cities allow 40% of salary."
      },
      {
          "question": "Is this HRA calculator updated with latest tax rules?",
          "answer": "Yes, our calculator follows current Income Tax Act provisions and is regularly updated to reflect the latest HRA exemption rules and limits."
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
