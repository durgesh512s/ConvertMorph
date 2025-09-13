import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Tax Calculator — ConvertMorph',
  description: 'Professional tax calculator tool. Fast, private, free forever.',
  keywords: ["tax calculator", "tax calculator", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/tax-calculator'),
  },
  openGraph: {
    title: 'Tax Calculator — ConvertMorph',
    description: 'Professional tax calculator tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/tax-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Tax Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/tax-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Calculator — ConvertMorph',
    description: 'Professional tax calculator tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/tax-calculator.png')],
  },
}

export default function TaxCalculatorLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Tax Calculator", "item": "https://convertmorph.com/tools/tax-calculator" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "Which tax regime should I choose?",
          "answer": "Compare both old and new tax regimes using our calculator. New regime has lower rates but fewer deductions, while old regime offers more deductions."
      },
      {
          "question": "What deductions are available under old tax regime?",
          "answer": "Old regime allows deductions like 80C (₹1.5L), 80D (health insurance), HRA, home loan interest, and various other sections."
      },
      {
          "question": "How accurate are the tax calculations?",
          "answer": "Our calculator follows current Income Tax Act provisions and is updated regularly. However, consult a tax advisor for complex situations."
      },
      {
          "question": "Can I calculate tax for previous years?",
          "answer": "Our calculator is designed for the current financial year. Tax rates and slabs may differ for previous years."
      },
      {
          "question": "What is standard deduction?",
          "answer": "Standard deduction is ₹50,000 for salaried individuals under both tax regimes, automatically reducing your taxable income."
      },
      {
          "question": "How do I save more tax legally?",
          "answer": "Maximize deductions under 80C, 80D, invest in ELSS, claim HRA if applicable, and consider tax-saving instruments based on your regime choice."
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
