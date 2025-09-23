import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export default function PdfOrganizeLayout({
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
      { "@type": "ListItem", "position": 3, "name": "PDF Organize", "item": "https://convertmorph.com/tools/pdf-organize" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How do I reorder PDF pages?",
          "answer": "Simply drag and drop page thumbnails to rearrange them in your desired order. Changes are applied when you download the reorganized PDF."
      },
      {
          "question": "Can I rotate individual pages?",
          "answer": "Yes, you can rotate each page independently by 90, 180, or 270 degrees to correct orientation issues."
      },
      {
          "question": "Can I delete pages while organizing?",
          "answer": "Yes, you can remove unwanted pages by selecting them and clicking delete, or use our dedicated PDF delete tool for more options."
      },
      {
          "question": "Will organizing affect PDF quality?",
          "answer": "No, page organization preserves original quality. Only the page order and rotation are changed, not the content quality."
      },
      {
          "question": "Is my data secure during organization?",
          "answer": "Absolutely! All PDF organization happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "What's the maximum PDF size I can organize?",
          "answer": "You can organize PDF files up to 100MB with unlimited pages. This covers most document types while ensuring optimal browser performance."
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
