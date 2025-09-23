import { metadata } from './metadata'
import PDFPageNumClient from './PDFPageNumClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { Hash, Upload, Settings, Download, AlignLeft, AlignCenter, AlignRight, FileText, Layers, CheckCircle, ArrowRight, Grid, Calculator, Zap, Shield } from 'lucide-react'

export { metadata }

export default function PDFPageNumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <PDFPageNumClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-teal-50 via-emerald-50 to-green-50 dark:from-teal-900/20 dark:via-emerald-900/20 dark:to-green-900/20 rounded-3xl p-8 sm:p-12 border border-teal-200 dark:border-teal-800">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 dark:from-teal-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-4">
                Complete Page Numbering Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Transform your PDFs with professional page numbering. Master every format, position, and style option to create perfectly numbered documents.
              </p>
            </div>

            {/* Sequential Flow Design */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-6">
                {/* Step 1 */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-teal-200 dark:border-teal-800 relative">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-teal-100 dark:bg-teal-900 rounded-full px-3 py-1 text-sm font-bold text-teal-700 dark:text-teal-300 mb-3 inline-block">
                      STEP 1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Upload PDF</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Select your PDF document. Our tool supports files up to 100MB with instant processing.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-teal-400" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-emerald-200 dark:border-emerald-800 relative">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full px-3 py-1 text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-3 inline-block">
                      STEP 2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Configure Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Choose format, position, alignment, and starting number for your page numbers.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Download className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 rounded-full px-3 py-1 text-sm font-bold text-green-700 dark:text-green-300 mb-3 inline-block">
                      STEP 3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Download Result</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Get your professionally numbered PDF with consistent formatting across all pages.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Step-by-Step Guide */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                📋 Professional Page Numbering Workflow
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Upload and Analyze Your PDF</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Start by uploading your PDF document. The tool automatically analyzes the document structure, page count, and optimal placement zones for page numbers.
                    </p>
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                      <p className="text-sm text-teal-700 dark:text-teal-300">
                        💡 <strong>Pro Tip:</strong> For best results, ensure your PDF has consistent margins. The tool will automatically detect safe zones for number placement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Choose Your Number Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Select from multiple numbering formats to match your document style and requirements.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Arabic Numerals</h5>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-mono">1, 2, 3, 4, 5...</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Most common for reports and documents</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-green-700 dark:text-green-300 mb-1">Roman Numerals</h5>
                        <p className="text-sm text-green-600 dark:text-green-400 font-mono">i, ii, iii... or I, II, III...</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Perfect for prefaces and appendices</p>
                      </div>
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                        <h5 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">Alphabetic</h5>
                        <p className="text-sm text-teal-600 dark:text-teal-400 font-mono">a, b, c... or A, B, C...</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ideal for sections and chapters</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Position and Align Numbers</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Choose the perfect position for your page numbers. Consider document type and reading flow when selecting placement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                      {/* Header Options */}
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center">
                          <Layers className="h-4 w-4 mr-2" />
                          Header (Top)
                        </h5>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignLeft className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                            <span className="text-xs">Left</span>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignCenter className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                            <span className="text-xs">Center</span>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignRight className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                            <span className="text-xs">Right</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Options */}
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-teal-700 dark:text-teal-300 mb-3 flex items-center">
                          <Layers className="h-4 w-4 mr-2 transform rotate-180" />
                          Footer (Bottom)
                        </h5>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignLeft className="h-4 w-4 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
                            <span className="text-xs">Left</span>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignCenter className="h-4 w-4 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
                            <span className="text-xs">Center</span>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">
                            <AlignRight className="h-4 w-4 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
                            <span className="text-xs">Right</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Set Starting Number and Apply</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Choose your starting number (useful for multi-part documents) and apply the numbering to all pages with consistent formatting.
                    </p>
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                      <p className="text-sm text-teal-700 dark:text-teal-300">
                        🔒 <strong>Privacy Guaranteed:</strong> All processing happens locally in your browser - your documents never leave your device.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Format & Position Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Number Formats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full p-3 mr-4">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Number Formats</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Arabic Numerals</span>
                    <span className="text-teal-600 dark:text-teal-400 font-mono text-lg">1, 2, 3, 4, 5...</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Roman Lowercase</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-lg">i, ii, iii, iv, v...</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Roman Uppercase</span>
                    <span className="text-green-600 dark:text-green-400 font-mono text-lg">I, II, III, IV, V...</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Letters Lowercase</span>
                    <span className="text-teal-600 dark:text-teal-400 font-mono text-lg">a, b, c, d, e...</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">Letters Uppercase</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-lg">A, B, C, D, E...</span>
                  </div>
                </div>
              </div>

              {/* Position & Alignment */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-full p-3 mr-4">
                    <Grid className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Position & Alignment</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Header Options */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-emerald-600" />
                      Header (Top)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg text-center">
                        <AlignLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Left</span>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg text-center">
                        <AlignCenter className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Center</span>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg text-center">
                        <AlignRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Right</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Options */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-green-600 transform rotate-180" />
                      Footer (Bottom)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                        <AlignLeft className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Left</span>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                        <AlignCenter className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Center</span>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                        <AlignRight className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Right</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="bg-gradient-to-r from-white to-teal-50 dark:from-gray-800 dark:to-teal-900/20 rounded-2xl p-8 border border-teal-200 dark:border-teal-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                <Zap className="h-6 w-6 mr-2 text-teal-600" />
                Advanced Numbering Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Hash className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Starting Number</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Begin numbering from any value - perfect for multi-part documents or continuing sequences.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Process multiple PDFs with consistent numbering settings for efficient document management.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Format Consistency</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintain uniform numbering style across all pages with professional typography and spacing.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Preview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    See exactly how your page numbers will appear before processing with real-time preview functionality.
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
                    How do I add page numbers to a PDF?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upload your PDF file, choose the position (header or footer), select the number format, set the starting number, and click "Add Page Numbers". The tool will process your PDF and add page numbers to all pages.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I choose where to place the page numbers?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, you can place page numbers in the header (top) or footer (bottom) of your PDF pages. You can also choose the alignment: left, center, or right.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What number formats are supported?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We support multiple formats including: 1, 2, 3... (Arabic numerals), i, ii, iii... (lowercase Roman), I, II, III... (uppercase Roman), a, b, c... (lowercase letters), and A, B, C... (uppercase letters).
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I start page numbering from a specific number?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, you can set any starting number for your page numbering. This is useful when adding numbers to a document that is part of a larger series.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is my PDF file secure when adding page numbers?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, ensuring complete privacy and security of your documents.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are there any file size limits?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our tool can handle PDF files up to 100MB in size. For larger files, consider compressing your PDF first or splitting it into smaller sections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-pagenum" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-pagenum" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
