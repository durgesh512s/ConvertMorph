import { Metadata } from 'next'
import { PDFSignClient } from '@/components/PDFSignClient'

export const metadata: Metadata = {
  title: 'PDF Fill & Sign - Add Signatures to PDF Documents | ConvertMorph',
  description: 'Add signatures and text to your PDF documents for free. Draw signatures, add text fields, and fill forms. Fast, secure, and works offline in your browser.',
  keywords: 'PDF signature, sign PDF, fill PDF, PDF forms, digital signature, e-signature, PDF signing tool',
  openGraph: {
    title: 'PDF Fill & Sign - Add Signatures to PDF Documents',
    description: 'Add signatures and text to your PDF documents for free. Draw signatures, add text fields, and fill forms. Fast, secure, and works offline in your browser.',
    type: 'website',
    url: 'https://convertmorph.com/tools/pdf-sign',
    images: [
      {
        url: '/og-pdf-sign.png',
        width: 1200,
        height: 630,
        alt: 'PDF Fill & Sign Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Fill & Sign - Add Signatures to PDF Documents',
    description: 'Add signatures and text to your PDF documents for free. Draw signatures, add text fields, and fill forms.',
    images: ['/og-pdf-sign.png'],
  },
  alternates: {
    canonical: 'https://convertmorph.com/tools/pdf-sign',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF Fill & Sign Tool',
  description: 'Add signatures and text to PDF documents with drawing and typing capabilities',
  url: 'https://convertmorph.com/tools/pdf-sign',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Draw signatures on PDF',
    'Add text to PDF documents',
    'Fill PDF forms',
    'Multiple signature styles',
    'Drag and drop positioning',
    'No file size limits',
    'Privacy focused - files processed locally',
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I add a signature to a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF file, choose to draw or type your signature, position it where needed on the document, and download the signed PDF. You can add multiple signatures and text fields as needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I draw my signature with a mouse or touchpad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can draw your signature using a mouse, touchpad, or touch screen. The tool provides a smooth drawing experience with adjustable pen thickness and color options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I type my signature instead of drawing it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can type your signature using various fonts and styles. This is useful for creating consistent, professional-looking signatures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this legally binding for electronic signatures?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool creates visual signatures on PDFs. For legally binding electronic signatures, consult with legal professionals about your specific jurisdiction and use case requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my documents secure when signing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, ensuring complete privacy and security of your documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add multiple signatures to one document?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can add multiple signatures, text fields, and other elements to a single PDF document. Each element can be positioned independently.',
      },
    },
  ],
}

export default function PDFSignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PDF Fill & Sign
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add signatures and text to your PDF documents. Draw or type signatures, fill forms, 
            and position elements exactly where you need them. All processing happens in your browser for maximum privacy.
          </p>
        </div>

        <PDFSignClient />

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Draw Signatures</h3>
            <p className="text-sm text-gray-600">
              Draw your signature naturally with mouse, touchpad, or touch screen
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Type Text</h3>
            <p className="text-sm text-gray-600">
              Add typed signatures and text fields with customizable fonts and sizes
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
            <p className="text-sm text-gray-600">
              All processing happens locally in your browser - no files uploaded to servers
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I add a signature to a PDF?
              </h3>
              <p className="text-gray-600">
                Upload your PDF file, choose to draw or type your signature, position it where needed 
                on the document, and download the signed PDF. You can add multiple signatures and text 
                fields as needed.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I draw my signature with a mouse or touchpad?
              </h3>
              <p className="text-gray-600">
                Yes, you can draw your signature using a mouse, touchpad, or touch screen. The tool 
                provides a smooth drawing experience with adjustable pen thickness and color options.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I type my signature instead of drawing it?
              </h3>
              <p className="text-gray-600">
                Yes, you can type your signature using various fonts and styles. This is useful for 
                creating consistent, professional-looking signatures.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is this legally binding for electronic signatures?
              </h3>
              <p className="text-gray-600">
                This tool creates visual signatures on PDFs. For legally binding electronic signatures, 
                consult with legal professionals about your specific jurisdiction and use case requirements.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Are my documents secure when signing?
              </h3>
              <p className="text-gray-600">
                Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, 
                ensuring complete privacy and security of your documents.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I add multiple signatures to one document?
              </h3>
              <p className="text-gray-600">
                Yes, you can add multiple signatures, text fields, and other elements to a single PDF 
                document. Each element can be positioned independently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
