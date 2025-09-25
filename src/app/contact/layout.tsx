import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact ConvertMorph - Get Support for Free PDF, Image & Finance Tools',
  description: 'Contact ConvertMorph support team for help with PDF tools, image editors, text processors, and financial calculators. Get technical support, report issues, or request new features. Fast response guaranteed.',
  keywords: [
    "contact ConvertMorph", "PDF tools support", "technical support", "customer service", "help desk",
    "image tools support", "finance calculator help", "text tools assistance", "feature request",
    "bug report", "tool support", "online tools help", "free tools support", "digital toolkit support"
  ],
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
  openGraph: {
    title: 'Contact ConvertMorph - Get Support for Free Digital Tools',
    description: 'Contact ConvertMorph support team for help with PDF tools, image editors, text processors, and financial calculators. Fast response guaranteed.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'Contact ConvertMorph Support Team',
      }
    ],
    type: 'website',
    url: absoluteUrl('/contact'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ConvertMorph - Get Support for Free Digital Tools',
    description: 'Contact ConvertMorph support team for help with PDF tools, image editors, text processors, and financial calculators. Fast response guaranteed.',
    images: [absoluteUrl('/og/default.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://convertmorph.com/contact" }
    ]
  };

  // Contact page schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ConvertMorph Support",
    "description": "Get support for ConvertMorph's free PDF tools, image editors, text processors, and financial calculators",
    "url": "https://convertmorph.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://convertmorph.com/#organization",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "url": "https://convertmorph.com/contact",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "contactType": "Technical Support",
          "email": "support@convertmorph.com",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        }
      ]
    }
  };

  // FAQ data for contact page - matching exactly what's shown in UI
  const faqs = [
    {
      "question": "Are my files stored on your servers?",
      "answer": "No, all processing happens in your browser. Files are automatically deleted after processing."
    },
    {
      "question": "What file size limits do you have?",
      "answer": "Currently, we support files up to 100MB and PDFs with up to 200 pages."
    },
    {
      "question": "Is ConvertMorph free to use?",
      "answer": "Yes, all our core PDF tools are completely free with no hidden costs."
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactPageSchema} />
      <JsonLd data={faqJsonLd(faqs)} />
      {children}
    </>
  )
}
