import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

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
  return children
}
