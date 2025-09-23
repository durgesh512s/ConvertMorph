import { metadata } from './metadata'
import PDFToImagesClient from './PDFToImagesClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { FileText, Download, Image, Zap, Settings, CheckCircle, ArrowRight } from 'lucide-react'

export { metadata }

export default function PDFToImagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <PDFToImagesClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 sm:p-12 mb-6 sm:mb-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
                How to Convert PDF to Images
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Follow our simple step-by-step guide to extract high-quality images from your PDF documents with complete control over format and quality settings.
              </p>
            </div>

            {/* Step-by-Step Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="relative group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-2xl font-bold text-red-500">01</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Upload PDF
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Drag and drop your PDF file or click to browse. Supports files up to 100MB for comprehensive document processing.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-pink-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full">
                      <Settings className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <span className="text-2xl font-bold text-pink-500">02</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Configure Settings
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Choose extraction mode, image format (PNG/JPG), resolution (72-600 DPI), and quality settings for optimal results.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-rose-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="text-2xl font-bold text-rose-500">03</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Extract Images
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Click convert and watch real-time progress as each PDF page is transformed into a high-quality image file.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-2xl font-bold text-purple-500">04</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Download Results
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download individual images or get all extracted images in a convenient ZIP file for easy organization.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                📋 Detailed Instructions
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Your PDF Document</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Start by uploading your PDF file using the drag-and-drop area or by clicking to browse your files. The tool supports PDF files up to 100MB in size.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        💡 <strong>Tip:</strong> For best results, ensure your PDF contains clear, high-resolution content. Scanned documents work well too!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Choose Extraction Mode</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Select whether to extract all pages or specify a custom page range. Use the range format like "1-3,5,7-9" to extract specific pages.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <strong>All Pages:</strong> Extract every page as individual images
                        </p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          <strong>Page Range:</strong> Extract only specific pages you need
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Configure Image Settings</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Choose your preferred image format and quality settings based on your intended use:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Format</h5>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          PNG for lossless quality, JPG for smaller file sizes
                        </p>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">Resolution</h5>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">
                          72 DPI for web, 300+ DPI for print quality
                        </p>
                      </div>
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">Quality</h5>
                        <p className="text-sm text-teal-600 dark:text-teal-400">
                          Adjust JPG quality from 10% to 100% (PNG is always lossless)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Conversion & Download</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Click the convert button to begin extraction. Monitor progress in real-time, then download individual images or get all files in a ZIP archive.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        ⚡ <strong>Fast Processing:</strong> All conversion happens in your browser - no uploads to external servers required!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Image className="h-5 w-5 mr-2 text-blue-500" />
                  Format Selection Guide
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">PNG Format</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Best for: Documents with text, diagrams, or when you need perfect quality. Larger file sizes but no quality loss.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">JPG Format</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Best for: Photos, images with many colors, or when file size matters. Adjustable quality from 10% to 100%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-500" />
                  Resolution Guidelines
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium text-gray-900 dark:text-white">72 DPI</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Web/Screen</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium text-gray-900 dark:text-white">150 DPI</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Standard Quality</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium text-gray-900 dark:text-white">300 DPI</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">High Quality</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium text-gray-900 dark:text-white">600 DPI</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Print Quality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🎯</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Best Practices</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use PNG for text documents and JPG for photo-heavy PDFs. Higher DPI means better quality but larger files.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🔒</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Privacy First</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All processing happens locally in your browser. Your PDF files never leave your device.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">⚡</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Fast & Efficient</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Extract multiple pages simultaneously with real-time progress tracking and batch download options.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Image className="h-6 w-6 text-red-600 dark:text-red-400" aria-label="High-quality output icon" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">High-quality Output</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extract images at up to 600 DPI for print quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Export as PNG or JPG with custom quality settings
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Custom DPI Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose resolution from 72 to 600 DPI for any use case
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download all images individually or as a ZIP file
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What image formats can I convert PDF pages to?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can convert PDF pages to PNG or JPG formats. PNG offers lossless quality while JPG provides smaller file sizes with adjustable quality settings.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I convert specific pages only?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes! You can select individual pages or page ranges to convert, rather than converting the entire PDF document. Use formats like "1-3,5,7-9" for custom ranges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What resolution options are available?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can choose from 72 DPI (web), 150 DPI (standard), 300 DPI (high quality), or 600 DPI (print quality) to balance image quality and file size.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Will conversion preserve image quality?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, conversion maintains high quality based on your selected DPI. PNG format preserves perfect quality, while JPG quality can be adjusted from 10% to 100%.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is my data secure during conversion?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Absolutely! All PDF to image conversion happens entirely in your browser. Your documents are never uploaded to our servers, ensuring complete privacy.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I convert password-protected PDFs?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Currently, password-protected PDFs cannot be converted. Please remove the password protection first, then convert the pages to images.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-to-images" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-to-images" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
