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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "EMI Calculator", "item": "https://convertmorph.com/tools/emi-calculator" }
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
