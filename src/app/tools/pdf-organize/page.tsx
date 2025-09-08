'use client'

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
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'

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


export default function PDFOrganizePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Move3D className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                PDF Organize
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Reorder and rotate PDF pages with visual drag-and-drop interface. Organize your documents with thumbnail previews and powerful editing tools. All processing happens in your browser for maximum privacy.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                How to Organize Your PDF
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <PDFOrganizeClient />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Visual Thumbnails</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  See preview thumbnails of all pages for easy identification and organization
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <GripVertical className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Drag & Drop</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Intuitive drag-and-drop interface for effortless page reordering
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <RotateCw className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Page Rotation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Rotate individual pages in 90° increments to fix orientation
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg shadow-lg p-4 sm:p-6 mb-8 sm:mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Your PDF files are processed locally in your browser. No files are uploaded to our servers, 
                  ensuring complete privacy and security of your documents.
                </p>
              </div>
            </div>

            {/* How to Use Section */}
            <div className="mt-16 sm:mt-20 bg-gradient-to-r from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-600">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-700 via-gray-800 to-zinc-700 dark:from-slate-300 dark:via-gray-200 dark:to-zinc-300 bg-clip-text text-transparent mb-4">
                  Master PDF Organization
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Take complete control of your PDF documents with our intuitive visual interface. Reorder, rotate, and reorganize pages with professional precision.
                </p>
              </div>

              {/* Interactive Workflow */}
              <div className="mb-12">
                <div className="relative">
                  {/* Central Hub */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-8 shadow-2xl">
                      <Move3D className="h-16 w-16 text-white" />
                    </div>
                  </div>

                  {/* Surrounding Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Upload */}
                    <div className="relative">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 group">
                        <div className="text-center">
                          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Download className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upload & Preview</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Upload your PDF and instantly see thumbnail previews of every page for easy identification.
                          </p>
                        </div>
                      </div>
                      {/* Connection Line */}
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                    </div>

                    {/* Drag & Drop */}
                    <div className="relative">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 group">
                        <div className="text-center">
                          <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <GripVertical className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Drag & Reorder</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Simply drag page thumbnails to reorder them. Visual feedback shows exactly where pages will be placed.
                          </p>
                        </div>
                      </div>
                      {/* Connection Line */}
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-green-300"></div>
                    </div>

                    {/* Rotate */}
                    <div className="relative">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 group">
                        <div className="text-center">
                          <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <RotateCw className="h-8 w-8 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rotate Pages</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Fix page orientation with one-click rotation. Rotate clockwise or counterclockwise in 90° increments.
                          </p>
                        </div>
                      </div>
                      {/* Connection Line */}
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-orange-300"></div>
                    </div>

                    {/* Download */}
                    <div className="relative">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 group">
                        <div className="text-center">
                          <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Download className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Export Result</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Download your perfectly organized PDF with all changes applied and pages in the desired order.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Techniques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 mr-4">
                      <MousePointer className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Drag & Drop Mastery</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Select & Grab</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Click and hold any page thumbnail to start dragging. The page will lift with visual feedback.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
                        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Position Preview</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          As you drag, see exactly where the page will be inserted with visual drop indicators.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                        <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Drop & Confirm</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Release to place the page in its new position. Changes are applied instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3 mr-4">
                      <RotateCw className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rotation Controls</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                        <RotateCw className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Clockwise Rotation</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Click the rotate right button to turn pages 90° clockwise. Perfect for landscape pages.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                        <RotateCw className="h-4 w-4 text-blue-600 dark:text-blue-400 transform scale-x-[-1]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Counter-Clockwise</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Use the rotate left button for counter-clockwise rotation. Undo unwanted rotations easily.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
                        <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Live Preview</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          See rotation changes immediately in the thumbnail preview before downloading.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                  <Zap className="h-6 w-6 mr-2 text-indigo-600" />
                  Organization Pro Tips
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Keyboard className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Keyboard Shortcuts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Use Ctrl+Z/Y for undo/redo, Ctrl+D to download, and ? for help. Speed up your workflow significantly.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Undo className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experiment Freely</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Full undo/redo support means you can experiment without fear. Try different arrangements easily.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Feedback</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Real-time thumbnails and drop indicators make organization intuitive and error-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 sm:mt-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
                Frequently Asked Questions
              </h3>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
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

            {/* Related Articles */}
            <RelatedArticles toolName="pdf-organize" />

            {/* Tools Navigation */}
            <ToolsNavigation currentTool="pdf-organize" className="mt-8" />
          </div>
        </div>
      </div>
    </>
  )
}
