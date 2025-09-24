import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export default function ImageConvertLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Image Convert", "item": "https://convertmorph.com/tools/image-convert" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What image formats can I convert between?",
          "answer": "You can convert between JPEG, PNG, WebP, GIF, BMP, and TIFF formats. All conversions maintain image quality and metadata when possible."
      },
      {
          "question": "Will converting change image quality?",
          "answer": "Quality depends on the target format. Converting to JPEG may introduce slight compression, while PNG and WebP maintain original quality. We use optimal settings for each format."
      },
      {
          "question": "Can I convert multiple images at once?",
          "answer": "Yes, you can convert up to 20 images simultaneously to the same target format, making batch processing quick and efficient."
      },
      {
          "question": "Is my data secure during conversion?",
          "answer": "Absolutely! All image conversion happens entirely in your browser. Your images are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Why should I convert to WebP format?",
          "answer": "WebP provides superior compression compared to JPEG and PNG, reducing file sizes by 25-50% while maintaining quality, making it ideal for web use."
      },
      {
          "question": "Do you preserve image metadata during conversion?",
          "answer": "We preserve essential metadata when the target format supports it. However, some metadata may be lost when converting to formats with limited metadata support."
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
