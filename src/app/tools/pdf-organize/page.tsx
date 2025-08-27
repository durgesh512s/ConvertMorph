'use client'

import { useState } from 'react'
import { 
  Move3D, 
  RotateCw, 
  Eye, 
  Keyboard, 
  Undo, 
  Download,
  GripVertical,
  MousePointer,
  Zap,
  Shield
} from 'lucide-react'
import { PDFOrganizeClient } from '@/components/PDFOrganizeClient'

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
}

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
}

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
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Move3D className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                PDF Organize
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Reorder and rotate PDF pages with visual drag-and-drop interface. Organize your documents with thumbnail previews and powerful editing tools. All processing happens in your browser for maximum privacy.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                How to Organize Your PDF
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">1. Upload PDF</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upload your PDF file and see thumbnail previews of all pages
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <MousePointer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">2. Drag & Drop</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Drag pages to reorder them and use rotation buttons to adjust orientation
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">3. Download</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download your reorganized PDF with the new page order and rotations
                  </p>
                </div>
              </div>
            </div>

            {/* Main Tool */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <PDFOrganizeClient />
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Visual Thumbnails</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  See preview thumbnails of all pages for easy identification and organization
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <GripVertical className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Drag & Drop</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Intuitive drag-and-drop interface for effortless page reordering
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <RotateCw className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Page Rotation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Rotate individual pages in 90° increments to fix orientation
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Undo className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Undo/Redo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Full undo/redo support to easily revert changes and experiment
                </p>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Keyboard className="h-5 w-5 mr-2 text-blue-600" />
                  Keyboard Shortcuts
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Undo</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                      Ctrl + Z
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Redo</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                      Ctrl + Y
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Download</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                      Ctrl + D
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Help</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                      ?
                    </kbd>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-600" />
                  Performance Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300">Local processing - no server uploads</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300">Support for PDFs up to 200 pages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300">Real-time thumbnail generation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 dark:text-gray-300">Instant preview of changes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg shadow-lg p-6 mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Your PDF files are processed locally in your browser. No files are uploaded to our servers, 
                  ensuring complete privacy and security of your documents.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Frequently Asked Questions
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      How do I reorder pages in a PDF?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Upload your PDF and you&apos;ll see thumbnail previews of each page. Simply drag and drop the thumbnails to reorder them, then download the reorganized PDF.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I rotate individual pages?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes! Each page thumbnail has rotation buttons that let you rotate pages in 90-degree increments (clockwise and counterclockwise).
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      What keyboard shortcuts are available?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Use Ctrl+Z for undo, Ctrl+Y for redo, and Ctrl+D to download. Press ? to see all available shortcuts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Is there a limit to the number of pages?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can organize PDFs with up to 200 pages. For larger documents, consider splitting them first using our PDF Split tool.
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
