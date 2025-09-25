import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/url';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit | ConvertMorph',
  description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private. No registration required.',
  keywords: [
    "free online tools", "PDF tools", "image tools", "text tools", "finance tools", "calculator tools",
    "PDF compress", "PDF merge", "PDF split", "PDF converter", "PDF to images", "images to PDF",
    "image compress", "image resize", "image converter", "background remover", "image crop",
    "word counter", "text compare", "grammar checker", "plagiarism checker", "paraphraser",
    "tax calculator", "EMI calculator", "SIP calculator", "loan calculator", "HRA calculator",
    "browser based tools", "privacy first tools", "no registration tools", "instant tools",
    "document processing", "file conversion", "digital toolkit", "productivity tools"
  ],
  alternates: {
    canonical: absoluteUrl('/tools'),
  },
  openGraph: {
    title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit',
    description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private.',
    images: [
      {
        url: absoluteUrl('/og/default.png'),
        width: 1200,
        height: 630,
        alt: 'ConvertMorph Free Online Tools - PDF, Image, Text & Finance Toolkit',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - PDF, Image, Text & Finance Calculator Toolkit',
    description: 'Discover 20+ professional online tools for PDF processing, image editing, text analysis, and financial calculations. 100% free, browser-based, completely private.',
    images: [absoluteUrl('/og/default.png')],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No schema in layout - individual tool pages will have their own specific schemas
  // This prevents duplicate SoftwareApplication schemas on individual tool pages
  return (
    <>
      {children}
    </>
  );
}
