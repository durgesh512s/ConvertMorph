import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export default function PdfPagenumLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Page Number", "item": "https://convertmorph.com/tools/pdf-pagenum" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "Where can I place page numbers?",
          "answer": "You can add page numbers to top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right positions on each page."
      },
      {
          "question": "Can I customize page number format?",
          "answer": "Yes, you can choose from various formats like \"1\", \"Page 1\", \"1 of 10\", or custom formats with different fonts and sizes."
      },
      {
          "question": "Can I start numbering from a specific page?",
          "answer": "Yes, you can choose which page to start numbering from and set the starting number value."
      },
      {
          "question": "Will page numbers affect existing content?",
          "answer": "Page numbers are added as an overlay, so they may cover existing content if placed in occupied areas. Choose positions carefully."
      },
      {
          "question": "Is my data secure during page numbering?",
          "answer": "Absolutely! All PDF page numbering happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I remove page numbers after adding them?",
          "answer": "Once page numbers are added and saved, they become part of the PDF content. Keep a backup of your original PDF if you might need to remove them."
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
