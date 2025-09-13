import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Merge PDF — ConvertMorph',
  description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
  keywords: ["PDF merge","combine PDF","join PDF files","merge PDF online","PDF combiner","unite PDFs"],
  alternates: {
    canonical: absoluteUrl('/tools/pdf-merge'),
  },
  openGraph: {
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/pdf-merge.png'),
        width: 1200,
        height: 630,
        alt: 'Merge PDF - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/pdf-merge'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
    images: [absoluteUrl('/og/pdf-merge.png')],
  },
}

export default function PdfMergeLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Merge", "item": "https://convertmorph.com/tools/pdf-merge" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How many PDFs can I merge at once?",
          "answer": "You can merge up to 20 PDF files in a single operation, with each file up to 100MB in size."
      },
      {
          "question": "Can I control the order of merged pages?",
          "answer": "Yes, you can drag and drop files to reorder them before merging. Pages will be combined in the order you specify."
      },
      {
          "question": "Will merging affect PDF quality?",
          "answer": "No, merging preserves the original quality of all pages. No compression or quality loss occurs during the merge process."
      },
      {
          "question": "Can I merge password-protected PDFs?",
          "answer": "Currently, password-protected PDFs cannot be merged. Please remove password protection first, then merge the files."
      },
      {
          "question": "Is my data secure during merging?",
          "answer": "Absolutely! All PDF merging happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What happens to bookmarks and metadata?",
          "answer": "Bookmarks from the first PDF are preserved, while metadata is combined when possible. Some metadata may be lost during the merge process."
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
