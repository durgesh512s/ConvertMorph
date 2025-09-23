'use client'

import { 
  PenTool, 
  Upload, 
  Edit3, 
  MousePointer, 
  Download,
  Type,
  Signature,
  FileText,
  Shield,
  Zap,
  CheckSquare,
  Users,
  Lock
} from 'lucide-react'
import { PDFSignClient as PDFSignComponent } from '@/components/PDFSignClient'

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

export default function PDFSignClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
            <PenTool className="h-8 w-8 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          PDF Fill & Sign
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Add signatures and text to your PDF documents. Draw or type signatures, fill forms, 
          and position elements exactly where you need them. All processing happens in your browser for maximum privacy.
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
        <PDFSignComponent />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <PenTool className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Draw Signatures</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Draw your signature naturally with mouse, touchpad, or touch screen
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Type className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Type Text</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add typed signatures and text fields with customizable fonts and sizes
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
            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Elements</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add multiple signatures and text fields to a single document
          </p>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg shadow-lg p-4 sm:p-6 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
              <Shield className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Secure Document Signing
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your PDF files are processed locally in your browser. No files are uploaded to our servers, 
            ensuring complete privacy and security of your sensitive documents and signatures.
          </p>
        </div>
      </div>
    </>
  )
}
