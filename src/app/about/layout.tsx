import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About ConvertMorph - Professional Free PDF, Image & Finance Tools | Our Story',
  description: 'Learn about ConvertMorph\'s mission to provide professional-grade PDF tools, image editors, text processors, and financial calculators. 100% free, privacy-first, browser-based digital toolkit for everyone.',
  keywords: [
    "about ConvertMorph", "PDF tools company", "free online tools", "privacy-first tools", "digital toolkit",
    "PDF processing", "image editing", "text analysis", "financial calculators", "browser-based tools",
    "document processing", "file conversion", "online productivity tools", "secure file processing",
    "professional PDF tools", "free software", "web-based applications", "digital transformation"
  ],
  alternates: {
    canonical: absoluteUrl('/about'),
  },
  openGraph: {
    title: 'About ConvertMorph - Professional Free PDF, Image & Finance Tools',
    description: 'Learn about ConvertMorph\'s mission to provide professional-grade PDF tools, image editors, text processors, and financial calculators. 100% free, privacy-first, browser-based.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'About ConvertMorph - Professional Digital Tools',
      }
    ],
    type: 'website',
    url: absoluteUrl('/about'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ConvertMorph - Professional Free PDF, Image & Finance Tools',
    description: 'Learn about ConvertMorph\'s mission to provide professional-grade PDF tools, image editors, text processors, and financial calculators. 100% free, privacy-first.',
    images: [absoluteUrl('/og/default.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://convertmorph.com/about" }
    ]
  };

  // About page schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ConvertMorph - Professional Free PDF, Image & Finance Tools",
    "description": "Learn about ConvertMorph's mission to provide professional-grade PDF tools, image editors, text processors, and financial calculators. 100% free, privacy-first, browser-based digital toolkit.",
    "url": "https://convertmorph.com/about",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://convertmorph.com/#organization"
    },
    "about": {
      "@type": "Thing",
      "name": "ConvertMorph Digital Toolkit",
      "description": "Professional-grade online tools for PDF processing, image editing, text analysis, and financial calculations"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={aboutPageSchema} />
      {children}
    </>
  )
}
