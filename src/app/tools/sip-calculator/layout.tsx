import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: 'Sip Calculator — ConvertMorph',
  description: 'Professional sip calculator tool. Fast, private, free forever.',
  keywords: ["sip calculator", "sip calculator", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/sip-calculator'),
  },
  openGraph: {
    title: 'Sip Calculator — ConvertMorph',
    description: 'Professional sip calculator tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/sip-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Sip Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/sip-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sip Calculator — ConvertMorph',
    description: 'Professional sip calculator tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/sip-calculator.png')],
  },
}

export default function SipCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
