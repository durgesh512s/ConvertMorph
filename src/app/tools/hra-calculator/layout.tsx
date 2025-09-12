import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

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
