import { Metadata } from 'next'
import { PenTool } from 'lucide-react'
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
      
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
                  <PenTool className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                PDF Fill & Sign
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Add signatures and text to your PDF documents. Draw or type signatures, fill forms, 
                and position elements exactly where you need them. All processing happens in your browser for maximum privacy.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <PDFSignClient />
            </div>

            {/* Features */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Draw Signatures</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Draw your signature naturally with mouse, touchpad, or touch screen
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Type Text</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add typed signatures and text fields with customizable fonts and sizes
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All processing happens locally in your browser - no files uploaded to servers
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Elements</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add multiple signatures and text fields to a single document
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      How do I add a signature to a PDF?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Upload your PDF file, choose to draw or type your signature, position it where needed 
                      on the document, and download the signed PDF. You can add multiple signatures and text 
                      fields as needed.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I draw my signature with a mouse or touchpad?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, you can draw your signature using a mouse, touchpad, or touch screen. The tool 
                      provides a smooth drawing experience with adjustable pen thickness and color options.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I type my signature instead of drawing it?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, you can type your signature using various fonts and styles. This is useful for 
                      creating consistent, professional-looking signatures.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Is this legally binding for electronic signatures?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      This tool creates visual signatures on PDFs. For legally binding electronic signatures, 
                      consult with legal professionals about your specific jurisdiction and use case requirements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Are my documents secure when signing?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, 
                      ensuring complete privacy and security of your documents.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I add multiple signatures to one document?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, you can add multiple signatures, text fields, and other elements to a single PDF 
                      document. Each element can be positioned independently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
