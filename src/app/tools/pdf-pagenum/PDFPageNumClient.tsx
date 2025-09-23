'use client'

import { 
  Hash, 
  Upload, 
  Settings, 
  Download, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  FileText,
  Layers,
  CheckCircle,
  ArrowRight,
  Grid,
  Calculator,
  Zap,
  Shield
} from 'lucide-react'
import { PDFPageNumClient as PDFPageNumComponent } from '@/components/PDFPageNumClient'

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

export default function PDFPageNumClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Add professional page numbers to your PDF documents with complete control over position, format, and styling. Perfect for reports, books, and official documents.
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
        <PDFPageNumComponent />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Support for Arabic numerals, Roman numerals, and alphabetic numbering
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Grid className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flexible Positioning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Place page numbers in header or footer with left, center, or right alignment
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Privacy First</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            All processing happens locally in your browser - no files uploaded to servers
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Processing</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Quick page numbering with optimized algorithms
          </p>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg shadow-lg p-4 sm:p-6 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
              <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Secure Page Numbering
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your PDF files are processed locally in your browser. No files are uploaded to our servers, 
            ensuring complete privacy and security of your sensitive documents.
          </p>
        </div>
      </div>
    </>
  )
}
