import { Metadata } from 'next'
import { PDFPageNumClient } from '@/components/PDFPageNumClient'

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF - Free PDF Page Numbering Tool | ConvertMorph',
  description: 'Add page numbers to your PDF documents for free. Choose position, format, and starting number. Fast, secure, and works offline in your browser.',
  keywords: 'PDF page numbers, add page numbers PDF, PDF numbering, page numbering tool, PDF footer, PDF header',
  openGraph: {
    title: 'Add Page Numbers to PDF - Free PDF Page Numbering Tool',
    description: 'Add page numbers to your PDF documents for free. Choose position, format, and starting number. Fast, secure, and works offline in your browser.',
    type: 'website',
    url: 'https://convertmorph.com/tools/pdf-pagenum',
    images: [
      {
        url: '/og-pdf-pagenum.png',
        width: 1200,
        height: 630,
        alt: 'Add Page Numbers to PDF Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Page Numbers to PDF - Free PDF Page Numbering Tool',
    description: 'Add page numbers to your PDF documents for free. Choose position, format, and starting number.',
    images: ['/og-pdf-pagenum.png'],
  },
  alternates: {
    canonical: 'https://convertmorph.com/tools/pdf-pagenum',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF Page Numbers Tool',
  description: 'Add page numbers to PDF documents with customizable position and format',
  url: 'https://convertmorph.com/tools/pdf-pagenum',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Add page numbers to PDF',
    'Customizable position (header/footer)',
    'Multiple number formats',
    'Starting number selection',
    'Batch processing',
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
      name: 'How do I add page numbers to a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF file, choose the position (header or footer), select the number format, set the starting number, and click "Add Page Numbers". The tool will process your PDF and add page numbers to all pages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I choose where to place the page numbers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can place page numbers in the header (top) or footer (bottom) of your PDF pages. You can also choose the alignment: left, center, or right.',
      },
    },
    {
      '@type': 'Question',
      name: 'What number formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We support multiple formats including: 1, 2, 3... (Arabic numerals), i, ii, iii... (lowercase Roman), I, II, III... (uppercase Roman), a, b, c... (lowercase letters), and A, B, C... (uppercase letters).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I start page numbering from a specific number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can set any starting number for your page numbering. This is useful when adding numbers to a document that is part of a larger series.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my PDF file secure when adding page numbers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, ensuring complete privacy and security of your documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any file size limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our tool can handle PDF files up to 25MB in size. For larger files, consider compressing your PDF first or splitting it into smaller sections.',
      },
    },
  ],
}

export default function PDFPageNumPage() {
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
            Add Page Numbers to PDF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add professional page numbers to your PDF documents. Choose position, format, and starting number. 
            All processing happens in your browser for maximum privacy.
          </p>
        </div>

        <PDFPageNumClient />

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-sm text-gray-600">
              Support for Arabic numerals, Roman numerals, and alphabetic numbering
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Positioning</h3>
            <p className="text-sm text-gray-600">
              Place page numbers in header or footer with left, center, or right alignment
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
                How do I add page numbers to a PDF?
              </h3>
              <p className="text-gray-600">
                Upload your PDF file, choose the position (header or footer), select the number format, 
                set the starting number, and click "Add Page Numbers". The tool will process your PDF 
                and add page numbers to all pages.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I choose where to place the page numbers?
              </h3>
              <p className="text-gray-600">
                Yes, you can place page numbers in the header (top) or footer (bottom) of your PDF pages. 
                You can also choose the alignment: left, center, or right.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                What number formats are supported?
              </h3>
              <p className="text-gray-600">
                We support multiple formats including: 1, 2, 3... (Arabic numerals), i, ii, iii... (lowercase Roman), 
                I, II, III... (uppercase Roman), a, b, c... (lowercase letters), and A, B, C... (uppercase letters).
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I start page numbering from a specific number?
              </h3>
              <p className="text-gray-600">
                Yes, you can set any starting number for your page numbering. This is useful when adding 
                numbers to a document that is part of a larger series.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is my PDF file secure when adding page numbers?
              </h3>
              <p className="text-gray-600">
                Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, 
                ensuring complete privacy and security of your documents.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Are there any file size limits?
              </h3>
              <p className="text-gray-600">
                Our tool can handle PDF files up to 25MB in size. For larger files, consider compressing 
                your PDF first or splitting it into smaller sections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
