import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Blog - Expert PDF, Image, Text & Finance Tools Tutorials | ConvertMorph',
  description: 'Expert tutorials, tips, and guides for PDF tools, image editing, text analysis, and financial calculators. Learn professional techniques for document processing, file conversion, and digital productivity.',
  keywords: [
    "PDF tutorials", "PDF tips", "document processing guide", "file conversion tutorials", "PDF tools guide",
    "image editing tutorials", "text analysis guide", "financial calculator tutorials", "productivity tips",
    "PDF compression guide", "PDF merge tutorial", "PDF split guide", "image resize tutorial",
    "word counter guide", "tax calculator tutorial", "EMI calculator guide", "SIP calculator tutorial",
    "digital tools tutorials", "online tools guide", "document management tips", "file processing guide"
  ],
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    title: 'Blog - Expert PDF, Image, Text & Finance Tools Tutorials',
    description: 'Expert tutorials, tips, and guides for PDF tools, image editing, text analysis, and financial calculators. Learn professional techniques for document processing.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'ConvertMorph Blog - Expert Tutorials & Guides',
      }
    ],
    type: 'website',
    url: absoluteUrl('/blog'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Expert PDF, Image, Text & Finance Tools Tutorials',
    description: 'Expert tutorials, tips, and guides for PDF tools, image editing, text analysis, and financial calculators. Learn professional techniques.',
    images: [absoluteUrl('/og/default.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://convertmorph.com/blog" }
    ]
  };

  // Blog page schema
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ConvertMorph Blog - Expert Digital Tools Tutorials",
    "description": "Expert tutorials, tips, and guides for PDF tools, image editing, text analysis, and financial calculators. Learn professional techniques for document processing and digital productivity.",
    "url": "https://convertmorph.com/blog",
    "publisher": {
      "@type": "Organization",
      "@id": "https://convertmorph.com/#organization"
    },
    "inLanguage": "en-US",
    "about": [
      {
        "@type": "Thing",
        "name": "PDF Tools",
        "description": "Tutorials and guides for PDF processing, compression, merging, splitting, and conversion"
      },
      {
        "@type": "Thing",
        "name": "Image Tools",
        "description": "Guides for image editing, resizing, compression, and format conversion"
      },
      {
        "@type": "Thing",
        "name": "Text Tools",
        "description": "Tutorials for text analysis, word counting, and document comparison"
      },
      {
        "@type": "Thing",
        "name": "Finance Tools",
        "description": "Guides for financial calculators including tax, EMI, SIP, and loan calculations"
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={blogPageSchema} />
      {children}
    </>
  )
}
