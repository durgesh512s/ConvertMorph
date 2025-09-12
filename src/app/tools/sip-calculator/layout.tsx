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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "SIP Calculator", "item": "https://convertmorph.com/tools/sip-calculator" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
