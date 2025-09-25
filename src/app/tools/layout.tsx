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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "420",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "PDF Merge",
          "url": "https://convertmorph.com/tools/pdf-merge",
          "applicationCategory": "Productivity",
          "operatingSystem": "Web Browser",
          "description": "Combine multiple PDF files into one document",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "380",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Tax Calculator",
          "url": "https://convertmorph.com/tools/tax-calculator",
          "applicationCategory": "Finance",
          "operatingSystem": "Web Browser",
          "description": "Calculate income tax for FY 2024-25 with regime comparison",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "ratingCount": "290",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "EMI Calculator",
          "url": "https://convertmorph.com/tools/emi-calculator",
          "applicationCategory": "Finance",
          "operatingSystem": "Web Browser",
          "description": "Calculate loan EMI for home, personal, and car loans",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "340",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Word Counter",
          "url": "https://convertmorph.com/tools/word-counter",
          "applicationCategory": "Productivity",
          "operatingSystem": "Web Browser",
          "description": "Count words, characters, and analyze text readability",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "ratingCount": "210",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
        }
      ]
    }
  };

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      {children}
    </>
  );
}
