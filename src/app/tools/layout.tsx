import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/url';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit | ConvertMorph',
  description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private. No registration required.',
  keywords: [
    "free online tools", "PDF tools", "image tools", "text tools", "finance tools", "calculator tools",
    "PDF compress", "PDF merge", "PDF split", "PDF converter", "PDF to images", "images to PDF",
    "image compress", "image resize", "image converter", "background remover", "image crop",
    "word counter", "text compare", "grammar checker", "plagiarism checker", "paraphraser",
    "tax calculator", "EMI calculator", "SIP calculator", "loan calculator", "HRA calculator",
    "browser based tools", "privacy first tools", "no registration tools", "instant tools",
    "document processing", "file conversion", "digital toolkit", "productivity tools"
  ],
  alternates: {
    canonical: absoluteUrl('/tools'),
  },
  openGraph: {
    title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit',
    description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'ConvertMorph Free Online Tools - PDF, Image, Text & Finance Toolkit',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit',
    description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private.',
    images: [absoluteUrl('/og/default.png')],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" }
    ]
  };

  // Collection page schema for tools
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit",
    "description": "Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private.",
    "url": "https://convertmorph.com/tools",
    "mainEntity": {
      "@type": "ItemList",
      "name": "ConvertMorph Online Tools",
      "description": "Comprehensive collection of free online tools for document processing, image editing, text analysis, and financial calculations",
      "numberOfItems": 20,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "PDF Compress",
          "url": "https://convertmorph.com/tools/pdf-compress",
          "applicationCategory": "Productivity",
          "operatingSystem": "Web Browser",
          "description": "Compress PDF files while maintaining quality",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "PDF Merge",
          "url": "https://convertmorph.com/tools/pdf-merge",
          "applicationCategory": "Productivity",
          "operatingSystem": "Web Browser",
          "description": "Combine multiple PDF files into one document",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Tax Calculator",
          "url": "https://convertmorph.com/tools/tax-calculator",
          "applicationCategory": "Finance",
          "operatingSystem": "Web Browser",
          "description": "Calculate income tax for FY 2024-25 with regime comparison",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "EMI Calculator",
          "url": "https://convertmorph.com/tools/emi-calculator",
          "applicationCategory": "Finance",
          "operatingSystem": "Web Browser",
          "description": "Calculate loan EMI for home, personal, and car loans",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Word Counter",
          "url": "https://convertmorph.com/tools/word-counter",
          "applicationCategory": "Productivity",
          "operatingSystem": "Web Browser",
          "description": "Count words, characters, and analyze text readability",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      ]
    },
    "breadcrumb": {
      "@id": "https://convertmorph.com/tools#breadcrumb"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionPageSchema} />
      {children}
    </>
  );
}
