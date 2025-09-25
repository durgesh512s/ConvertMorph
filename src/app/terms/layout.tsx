import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Terms of Service - ConvertMorph Legal Agreement & User Responsibilities | PDF Tools',
  description: 'ConvertMorph Terms of Service: Legal agreement, user responsibilities, and service terms for our free PDF, image, text, and finance tools. Read our user agreement and acceptable use policy.',
  keywords: [
    "terms of service", "user agreement", "legal terms", "service agreement", "ConvertMorph terms",
    "PDF tools terms", "user responsibilities", "acceptable use policy", "service conditions",
    "legal agreement", "terms and conditions", "user rights", "service limitations", "liability terms",
    "intellectual property", "privacy terms", "data usage terms", "file processing terms"
  ],
  alternates: {
    canonical: absoluteUrl('/terms'),
  },
  openGraph: {
    title: 'Terms of Service - ConvertMorph Legal Agreement & User Responsibilities',
    description: 'ConvertMorph Terms of Service: Legal agreement, user responsibilities, and service terms for our free PDF, image, text, and finance tools.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'ConvertMorph Terms of Service - Legal Agreement',
      }
    ],
    type: 'website',
    url: absoluteUrl('/terms'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - ConvertMorph Legal Agreement & User Responsibilities',
    description: 'ConvertMorph Terms of Service: Legal agreement, user responsibilities, and service terms for our free PDF, image, text, and finance tools.',
    images: [absoluteUrl('/og/default.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://convertmorph.com/terms" }
    ]
  };

  // Terms of service page schema
  const termsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - ConvertMorph Legal Agreement & User Responsibilities",
    "description": "ConvertMorph Terms of Service detailing legal agreement, user responsibilities, acceptable use policy, and service conditions for PDF, image, text, and finance tools.",
    "url": "https://convertmorph.com/terms",
    "about": {
      "@type": "Thing",
      "name": "Terms of Service and Legal Agreement",
      "description": "Legal terms and conditions for using ConvertMorph digital tools and services"
    },
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://convertmorph.com/#organization"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={termsPageSchema} />
      {children}
    </>
  )
}
