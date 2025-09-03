import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Emi Calculator — ConvertMorph',
  description: 'Professional emi calculator tool. Fast, private, free forever.',
  keywords: ["emi calculator", "emi calculator", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/emi-calculator'),
  },
  openGraph: {
    title: 'Emi Calculator — ConvertMorph',
    description: 'Professional emi calculator tool. Fast, private, free forever.',
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
    title: 'Emi Calculator — ConvertMorph',
    description: 'Professional emi calculator tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/emi-calculator.png')],
  },
}

export default function EmiCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
