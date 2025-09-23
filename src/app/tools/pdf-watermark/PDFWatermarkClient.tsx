'use client'

import { 
  Type, 
  Upload, 
  Settings, 
  Eye, 
  Download,
  Palette,
  Move,
  Layers,
  Shield,
  Zap,
  Target,
  Sliders
} from 'lucide-react'
import { PDFWatermarkClient as PDFWatermarkComponent } from '@/components/PDFWatermarkClient'

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

export default function PDFWatermarkClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full">
            <Type className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Add Watermark to PDF
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Add custom text watermarks to your PDF documents with professional precision. Choose position, transparency, and styling options for perfect branding and document protection.
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
        <PDFWatermarkComponent />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Move className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Customizable Position</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Place watermarks exactly where you need them - center, corners, or custom coordinates
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Sliders className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Transparency Control</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Adjust opacity from 10% to 100% for subtle or prominent watermarks
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">All Pages</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Apply watermarks to all pages automatically with consistent positioning
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Privacy Protected</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            All processing happens locally in your browser for maximum security
          </p>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-lg shadow-lg p-4 sm:p-6 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full">
              <Shield className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Secure Watermarking
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
