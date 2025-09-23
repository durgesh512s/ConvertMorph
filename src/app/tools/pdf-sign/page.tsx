import { metadata } from './metadata'
import PDFSignClient from './PDFSignClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
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
  Lock,
  ArrowRight
} from 'lucide-react'

export { metadata }

export default function PDFSignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <PDFSignClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                Digital Signature Mastery
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master the art of digital document signing. Create professional signatures, fill forms efficiently, and secure your documents with confidence.
              </p>
            </div>

            {/* Dual Path Design */}
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Draw Signature Path */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <PenTool className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Draw Your Signature</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create authentic handwritten signatures</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Upload Document</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Select your PDF file to begin the signing process</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-1 mt-1">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Draw Signature</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Use mouse, touchpad, or touch screen to draw naturally</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-1 mt-1">
                        <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Position & Resize</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Drag to position and resize your signature perfectly</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Download Signed PDF</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Get your professionally signed document instantly</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Type Signature Path */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 dark:border-indigo-800">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Type className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Type Your Signature</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create consistent typed signatures</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-1 mt-1">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Upload Document</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Load your PDF file for signing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-1 mt-1">
                        <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Choose Font Style</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Select from professional signature fonts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Type & Position</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Enter your name and position the signature</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-1 mt-1">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Save & Download</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Complete the signing process and download</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MousePointer className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Precision Positioning</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Drag and drop signature placement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Resize handles for perfect scaling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Snap-to-grid alignment assistance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Multi-page signature support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-800">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Customization Options</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Adjustable pen thickness and color</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Multiple signature font styles</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Signature transparency control</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Save signature templates</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Form Filling</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Interactive form field detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Text input with custom fonts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Checkbox and radio button support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Date and timestamp insertion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Legal */}
            <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security & Legal Considerations</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Understanding the security and legal aspects of digital document signing for professional use.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                      <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Protection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        All document processing happens locally in your browser. No files are uploaded to external servers, ensuring complete privacy and data security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                      <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Document Integrity</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Signatures are embedded directly into the PDF structure, maintaining document integrity and preventing unauthorized modifications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Use</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Ideal for contracts, agreements, forms, and other business documents requiring visual signatures and form completion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-2 mt-1">
                      <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Compliance</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        For legally binding electronic signatures, consult legal professionals about jurisdiction-specific requirements and compliance standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How do I add a signature to a PDF?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Upload your PDF file, choose to draw or type your signature, position it where needed 
                    on the document, and download the signed PDF. You can add multiple signatures and text 
                    fields as needed.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I draw my signature with a mouse or touchpad?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, you can draw your signature using a mouse, touchpad, or touch screen. The tool 
                    provides a smooth drawing experience with adjustable pen thickness and color options.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I type my signature instead of drawing it?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, you can type your signature using various fonts and styles. This is useful for 
                    creating consistent, professional-looking signatures.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is this legally binding for electronic signatures?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    This tool creates visual signatures on PDFs. For legally binding electronic signatures, 
                    consult with legal professionals about your specific jurisdiction and use case requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are my documents secure when signing?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, your PDF is processed entirely in your browser. No files are uploaded to our servers, 
                    ensuring complete privacy and security of your documents.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I add multiple signatures to one document?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, you can add multiple signatures, text fields, and other elements to a single PDF 
                    document. Each element can be positioned independently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-sign" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-sign" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
