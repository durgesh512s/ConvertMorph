import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Loan Calculator — ConvertMorph',
  description: 'Professional loan calculator tool. Fast, private, free forever.',
  keywords: ["loan calculator", "loan calculator", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/loan-calculator'),
  },
  openGraph: {
    title: 'Loan Calculator — ConvertMorph',
    description: 'Professional loan calculator tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/loan-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Loan Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/loan-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator — ConvertMorph',
    description: 'Professional loan calculator tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/loan-calculator.png')],
  },
}

export default function LoanCalculatorLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Loan Calculator", "item": "https://convertmorph.com/tools/loan-calculator" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What types of loans can I calculate?",
          "answer": "Our calculator works for all types of loans including home loans, personal loans, car loans, and business loans with fixed interest rates."
      },
      {
          "question": "How accurate are the loan calculations?",
          "answer": "Our calculator uses standard loan formulas and provides accurate estimates. Actual amounts may vary slightly due to bank-specific policies and fees."
      },
      {
          "question": "Can I see the complete payment schedule?",
          "answer": "Yes, the calculator shows a detailed amortization schedule with monthly breakdowns of principal and interest payments throughout the loan term."
      },
      {
          "question": "What is the difference between reducing and flat interest rates?",
          "answer": "Reducing balance calculates interest on the outstanding principal, while flat rate calculates on the original amount. Our calculator uses the reducing balance method."
      },
      {
          "question": "How do prepayments affect my loan?",
          "answer": "Prepayments reduce the outstanding principal, which can either reduce your EMI amount or loan tenure, depending on your preference and lender policy."
      },
      {
          "question": "Can I calculate loans with variable interest rates?",
          "answer": "Currently, our calculator works with fixed interest rates. For variable rates, you can calculate different scenarios by adjusting the interest rate."
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
