import { Metadata } from 'next';
import { PDFOrganizeClient } from '@/components/PDFOrganizeClient';

export const metadata: Metadata = {
  title: 'PDF Organize - Reorder & Rotate Pages | ConvertMorph',
  description: 'Visually reorder and rotate PDF pages with drag-and-drop interface. Organize your PDF documents with thumbnail preview and keyboard shortcuts.',
  keywords: 'PDF organize, reorder pages, rotate PDF, PDF page management, drag drop PDF',
  openGraph: {
    title: 'PDF Organize - Reorder & Rotate Pages',
    description: 'Visually reorder and rotate PDF pages with drag-and-drop interface',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Organize - Reorder & Rotate Pages',
    description: 'Visually reorder and rotate PDF pages with drag-and-drop interface',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF Organize Tool',
  description: 'Free online tool to reorder and rotate PDF pages with visual thumbnail interface',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Visual page thumbnails',
    'Drag and drop reordering',
    'Page rotation (90° increments)',
    'Undo/redo functionality',
    'Keyboard shortcuts',
    'Local processing'
  ],
};

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I reorder pages in a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF and you\'ll see thumbnail previews of each page. Simply drag and drop the thumbnails to reorder them, then download the reorganized PDF.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I rotate individual pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Each page thumbnail has rotation buttons that let you rotate pages in 90-degree increments (clockwise and counterclockwise).'
      }
    },
    {
      '@type': 'Question',
      name: 'What keyboard shortcuts are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Ctrl+Z for undo, Ctrl+Y for redo, arrow keys to navigate between pages, and R to rotate the selected page.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a limit to the number of pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can organize PDFs with up to 200 pages. For larger documents, consider splitting them first.'
      }
    }
  ]
};

export default function PDFOrganizePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <PDFOrganizeClient />
    </>
  );
}
