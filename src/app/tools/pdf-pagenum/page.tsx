import { Hash } from 'lucide-react'
import { PDFPageNumClient } from '@/components/PDFPageNumClient'

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
        text: 'Our tool can handle PDF files up to 100MB in size. For larger files, consider compressing your PDF first or splitting it into smaller sections.',
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
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                  <Hash className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Add Page Numbers to PDF
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Add professional page numbers to your PDF documents. Choose position, format, and starting number. 
                All processing happens in your browser for maximum privacy.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <PDFPageNumClient />
            </div>

            {/* Features */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Support for Arabic numerals, Roman numerals, and alphabetic numbering
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flexible Positioning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Place page numbers in header or footer with left, center, or right alignment
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quick page numbering with optimized algorithms
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      How do I add page numbers to a PDF?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Upload your PDF file, choose the position (header or footer), select the number format, 
                      set the starting number, and click &quot;Add Page Numbers&quot;. The tool will process your PDF
                      and add page numbers to all pages.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I choose where to place the page numbers?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, you can place page numbers in the header (top) or footer (bottom) of your PDF pages. 
                      You can also choose the alignment: left, center, or right.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      What number formats are supported?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We support multiple formats including: 1, 2, 3... (Arabic numerals), i, ii, iii... (lowercase Roman), 
                      I, II, III... (uppercase Roman), a, b, c... (lowercase letters), and A, B, C... (uppercase letters).
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I start page numbering from a specific number?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, you can set any starting number for your page numbering. This is useful when adding 
                      numbers to a document that is part of a larger series.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Is my PDF file secure when adding page numbers?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, 
                      ensuring complete privacy and security of your documents.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Are there any file size limits?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our tool can handle PDF files up to 100MB in size. For larger files, consider compressing 
                      your PDF first or splitting it into smaller sections.
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
