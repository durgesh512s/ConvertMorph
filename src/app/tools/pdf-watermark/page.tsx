import { Metadata } from 'next'
import { PDFWatermarkClient } from '@/components/PDFWatermarkClient'

export const metadata: Metadata = {
  title: 'Add Watermark to PDF - Free PDF Watermark Tool | ConvertMorph',
  description: 'Add text watermarks to your PDF documents for free. Choose position, transparency, and styling. Secure your documents with custom watermarks.',
  keywords: 'PDF watermark, add watermark to PDF, PDF security, document protection, text watermark, PDF branding',
  openGraph: {
    title: 'Add Watermark to PDF - Free PDF Watermark Tool',
    description: 'Add text watermarks to your PDF documents for free. Choose position, transparency, and styling.',
    type: 'website',
    url: 'https://convertmorph.com/tools/pdf-watermark',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Watermark to PDF - Free PDF Watermark Tool',
    description: 'Add text watermarks to your PDF documents for free. Choose position, transparency, and styling.',
  },
  alternates: {
    canonical: 'https://convertmorph.com/tools/pdf-watermark',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF Watermark Tool',
  description: 'Add text watermarks to PDF documents with customizable position, transparency, and styling options.',
  url: 'https://convertmorph.com/tools/pdf-watermark',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Add text watermarks to PDF',
    'Customizable position and transparency',
    'Multiple font options',
    'Batch processing support',
    'No file size limits',
    'Privacy-focused processing'
  ]
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I add a watermark to my PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF file, enter your watermark text, choose the position and transparency, then download the watermarked PDF. The process is completely free and secure.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I customize the watermark appearance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You can customize the watermark text, position (center, corners, etc.), transparency level, font size, and color to match your needs.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my PDF secure when adding watermarks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. All processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.'
      }
    },
    {
      '@type': 'Question',
      name: 'What file formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool works with PDF files only. The output will also be a PDF file with your watermark applied to all pages.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I add watermarks to multiple pages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the watermark will be applied to all pages in your PDF document automatically. You can choose different positions for variety.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are there any file size limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The default limit is 100MB per file, but this can handle most PDF documents. For larger files, consider compressing your PDF first.'
      }
    }
  ]
}

export default function PDFWatermarkPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add Watermark to PDF
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Add custom text watermarks to your PDF documents. Choose position, transparency, and styling options.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Customizable Position
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Transparency Control
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              All Pages
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </span>
          </div>
        </div>

        <PDFWatermarkClient />

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I add a watermark to my PDF?
                </h3>
                <p className="text-gray-600 text-sm">
                  Upload your PDF file, enter your watermark text, choose the position and transparency, then download the watermarked PDF. The process is completely free and secure.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I customize the watermark appearance?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! You can customize the watermark text, position (center, corners, etc.), transparency level, font size, and color to match your needs.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is my PDF secure when adding watermarks?
                </h3>
                <p className="text-gray-600 text-sm">
                  Absolutely. All processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What file formats are supported?
                </h3>
                <p className="text-gray-600 text-sm">
                  This tool works with PDF files only. The output will also be a PDF file with your watermark applied to all pages.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I add watermarks to multiple pages?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes, the watermark will be applied to all pages in your PDF document automatically. You can choose different positions for variety.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are there any file size limits?
                </h3>
                <p className="text-gray-600 text-sm">
                  The default limit is 100MB per file, but this can handle most PDF documents. For larger files, consider compressing your PDF first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
