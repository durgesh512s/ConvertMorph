import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export default function ImageCropLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Image Crop", "item": "https://convertmorph.com/tools/image-crop" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What aspect ratios are available for cropping?",
          "answer": "We offer common aspect ratios like 1:1 (square), 4:3, 16:9, 3:2, and custom ratios. You can also crop freely without any ratio constraints."
      },
      {
          "question": "Can I crop multiple images with the same settings?",
          "answer": "Yes, you can apply the same crop settings to multiple images in batch mode, ensuring consistent dimensions across all your images."
      },
      {
          "question": "Will cropping affect image quality?",
          "answer": "Cropping only removes pixels and doesn't compress the remaining image, so there's no quality loss in the cropped area."
      },
      {
          "question": "What image formats are supported for cropping?",
          "answer": "We support JPEG, PNG, WebP, and GIF formats. The output maintains the same format as your input image."
      },
      {
          "question": "Is my data secure during cropping?",
          "answer": "Absolutely! All image cropping happens entirely in your browser. Your images are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "Can I undo crop operations?",
          "answer": "You can reset the crop area before applying changes. Once applied, you'll need to re-upload the original image to start over."
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
