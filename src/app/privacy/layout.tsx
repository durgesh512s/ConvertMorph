import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Privacy Policy - ConvertMorph Data Protection & GDPR Compliance | Secure PDF Tools',
  description: 'ConvertMorph privacy policy: Learn how we protect your data with local processing, auto-delete files, and GDPR compliance. Your privacy is our priority with secure PDF, image, and finance tools.',
  keywords: [
    "privacy policy", "data protection", "GDPR compliance", "file privacy", "secure PDF tools",
    "local processing", "auto-delete files", "data security", "privacy-first tools", "ConvertMorph privacy",
    "document security", "file encryption", "user privacy", "data retention", "privacy rights",
    "secure file processing", "browser-based tools", "no data collection", "private PDF tools"
  ],
  alternates: {
    canonical: absoluteUrl('/privacy'),
  },
  openGraph: {
    title: 'Privacy Policy - ConvertMorph Data Protection & GDPR Compliance',
    description: 'Learn how ConvertMorph protects your data with local processing, auto-delete files, and GDPR compliance. Your privacy is our priority with secure PDF, image, and finance tools.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'ConvertMorph Privacy Policy - Data Protection & Security',
      }
    ],
    type: 'website',
    url: absoluteUrl('/privacy'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - ConvertMorph Data Protection & GDPR Compliance',
    description: 'Learn how ConvertMorph protects your data with local processing, auto-delete files, and GDPR compliance. Your privacy is our priority.',
    images: [absoluteUrl('/og/default.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://convertmorph.com/privacy" }
    ]
  };

  // Privacy policy page schema
  const privacyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - ConvertMorph Data Protection & GDPR Compliance",
    "description": "ConvertMorph privacy policy detailing data protection practices, GDPR compliance, local file processing, and user privacy rights for secure PDF, image, and finance tools.",
    "url": "https://convertmorph.com/privacy",
    "about": {
      "@type": "Thing",
      "name": "Data Privacy and Protection",
      "description": "Privacy policy and data protection practices for ConvertMorph digital tools"
    },
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://convertmorph.com/#organization"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={privacyPageSchema} />
      {children}
    </>
  )
}
