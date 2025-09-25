import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMI Online Free | ConvertMorph',
  description: 'Calculate EMI for home loan, personal loan, car loan with our free EMI calculator. Get instant monthly installment, total interest, and amortization schedule. Compare loan options easily.',
  keywords: ["EMI calculator", "loan EMI calculator", "home loan EMI", "personal loan EMI", "car loan EMI", "monthly installment calculator", "loan calculator", "interest calculator", "amortization calculator", "free EMI calculator"],
  alternates: {
    canonical: absoluteUrl('/tools/emi-calculator'),
  },
  openGraph: {
    title: 'EMI Calculator - Calculate Loan EMI Online Free',
    description: 'Calculate EMI for home loan, personal loan, car loan with our free EMI calculator. Get instant monthly installment, total interest, and amortization schedule.',
    images: [
      {
        url: absoluteUrl('/og/emi-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Emi Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/emi-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMI Calculator - Calculate Loan EMI Online Free',
    description: 'Calculate EMI for home loan, personal loan, car loan with our free EMI calculator. Get instant monthly installment, total interest, and amortization schedule.',
    images: [absoluteUrl('/og/emi-calculator.png')],
  },
}

export default function EmiCalculatorLayout({
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
      { "@type": "ListItem", "position": 3, "name": "EMI Calculator", "item": "https://convertmorph.com/tools/emi-calculator" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How is EMI calculated?",
          "answer": "EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is principal amount, R is monthly interest rate, and N is number of months."
      },
      {
          "question": "What factors affect my EMI amount?",
          "answer": "EMI amount depends on three main factors: loan amount (principal), interest rate, and loan tenure. Higher loan amount or interest rate increases EMI, while longer tenure reduces it."
      },
      {
          "question": "Can I prepay my loan to reduce EMI?",
          "answer": "Yes, prepayment reduces the outstanding principal, which can either reduce your EMI amount or loan tenure, depending on your lender's policy."
      },
      {
          "question": "Is this EMI calculator accurate?",
          "answer": "Our calculator provides accurate estimates based on standard EMI formulas. However, actual EMI may vary slightly due to bank-specific policies, processing fees, or rounding differences."
      },
      {
          "question": "What is the ideal EMI to income ratio?",
          "answer": "Financial experts recommend keeping your total EMI obligations below 40-50% of your monthly income to maintain healthy finances and avoid over-leveraging."
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
