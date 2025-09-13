import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Word Counter — ConvertMorph',
  description: 'Professional word counter tool. Fast, private, free forever.',
  keywords: ["word counter", "word counter", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/word-counter'),
  },
  openGraph: {
    title: 'Word Counter — ConvertMorph',
    description: 'Professional word counter tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/word-counter.png'),
        width: 1200,
        height: 630,
        alt: 'Word Counter - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/word-counter'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter — ConvertMorph',
    description: 'Professional word counter tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/word-counter.png')],
  },
}

export default function WordCounterLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Word Counter", "item": "https://convertmorph.com/tools/word-counter" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What statistics does the word counter provide?",
          "answer": "We provide word count, character count (with and without spaces), sentence count, paragraph count, reading time, and readability scores."
      },
      {
          "question": "How is reading time calculated?",
          "answer": "Reading time is calculated based on an average reading speed of 200-250 words per minute, which is the standard for adult readers."
      },
      {
          "question": "What readability scores do you provide?",
          "answer": "We calculate Flesch Reading Ease and Flesch-Kincaid Grade Level to help you understand how easy your text is to read."
      },
      {
          "question": "Can I analyze text in different languages?",
          "answer": "Yes, the basic counting features work with any language. However, readability scores are optimized for English text."
      },
      {
          "question": "Is my text data secure?",
          "answer": "Absolutely! All text analysis happens entirely in your browser. Your text is never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What's the maximum text length I can analyze?",
          "answer": "There's no strict limit, but very large texts (over 1MB) may slow down the analysis. The tool works best with documents up to 500KB."
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
