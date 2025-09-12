import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

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
