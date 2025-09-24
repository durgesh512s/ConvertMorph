import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export default function ImageCompressLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Image Compress", "item": "https://convertmorph.com/tools/image-compress" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How much can I compress my images?",
          "answer": "Compression results vary by image type and content. JPEG images typically compress 60-80%, PNG images 20-50%, while maintaining good visual quality."
      },
      {
          "question": "Will compression affect image quality?",
          "answer": "Our smart compression algorithms are designed to maintain visual quality while reducing file size. You can choose compression levels to balance quality and size."
      },
      {
          "question": "What image formats are supported?",
          "answer": "We support JPEG, PNG, WebP, and GIF formats. Each format is optimized using the best compression techniques for that specific type."
      },
      {
          "question": "Is my data secure during compression?",
          "answer": "Absolutely! All image compression happens entirely in your browser. Your images are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I compress multiple images at once?",
          "answer": "Yes, you can compress up to 20 images simultaneously. This batch processing saves time when working with multiple files."
      },
      {
          "question": "What's the maximum file size I can compress?",
          "answer": "You can compress images up to 50MB each. This covers most photography and design needs while ensuring optimal browser performance."
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
