import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Image Resize — ConvertMorph',
  description: 'Professional image resize tool. Fast, private, free forever.',
  keywords: ["image resize", "image resize", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/image-resize'),
  },
  openGraph: {
    title: 'Image Resize — ConvertMorph',
    description: 'Professional image resize tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/image-resize.png'),
        width: 1200,
        height: 630,
        alt: 'Image Resize - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/image-resize'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resize — ConvertMorph',
    description: 'Professional image resize tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/image-resize.png')],
  },
}

export default function ImageResizeLayout({
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
      { "@type": "ListItem", "position": 3, "name": "Image Resize", "item": "https://convertmorph.com/tools/image-resize" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "What resize options are available?",
          "answer": "You can resize by percentage, specific dimensions (width/height), or choose from preset sizes. We maintain aspect ratio by default to prevent distortion."
      },
      {
          "question": "Will resizing affect image quality?",
          "answer": "We use high-quality resampling algorithms. Enlarging images may reduce sharpness, while reducing size typically maintains good quality."
      },
      {
          "question": "Can I resize multiple images at once?",
          "answer": "Yes, you can resize up to 20 images simultaneously with the same settings, perfect for batch processing workflows."
      },
      {
          "question": "What's the maximum image size I can resize?",
          "answer": "You can resize images up to 50MB and 10,000x10,000 pixels. This covers most photography and design requirements."
      },
      {
          "question": "Is my data secure during resizing?",
          "answer": "Absolutely! All image resizing happens entirely in your browser. Your images are never uploaded to our servers, ensuring complete privacy."
      },
      {
          "question": "How do I maintain aspect ratio while resizing?",
          "answer": "By default, we maintain aspect ratio. When you change width, height adjusts automatically. You can disable this to set custom dimensions."
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
