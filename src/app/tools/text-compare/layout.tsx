import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Text Compare — ConvertMorph',
  description: 'Professional text compare tool. Fast, private, free forever.',
  keywords: ["text compare", "text compare", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/text-compare'),
  },
  openGraph: {
    title: 'Text Compare — ConvertMorph',
    description: 'Professional text compare tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/text-compare.png'),
        width: 1200,
        height: 630,
        alt: 'Text Compare - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/text-compare'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Compare — ConvertMorph',
    description: 'Professional text compare tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/text-compare.png')],
  },
}

export default function TextCompareLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Text Compare", "item": "https://convertmorph.com/tools/text-compare" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What types of differences does the tool detect?",
          "answer": "Our tool detects added text, deleted text, modified content, and moved paragraphs, highlighting each type with different colors for easy identification."
      },
      {
          "question": "Can I compare files in different formats?",
          "answer": "You can paste text directly or upload text files. The tool works with plain text content regardless of the original file format."
      },
      {
          "question": "How accurate is the comparison algorithm?",
          "answer": "We use the Longest Common Subsequence (LCS) algorithm, which provides highly accurate difference detection at the character and word level."
      },
      {
          "question": "Can I export the comparison results?",
          "answer": "Yes, you can copy the highlighted comparison results or export them as a formatted document showing all differences."
      },
      {
          "question": "Is my text data secure during comparison?",
          "answer": "Absolutely! All text comparison happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What's the maximum text size I can compare?",
          "answer": "You can compare texts up to 1MB each. This covers most document types while ensuring optimal browser performance."
      }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
      {children}
    </>
  )
}
