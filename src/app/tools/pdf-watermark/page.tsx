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
import { PDFWatermarkClient } from '@/components/PDFWatermarkClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'

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
      
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-4xl mx-auto">
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
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Add custom text watermarks to your PDF documents. Choose position, transparency, and styling options.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <PDFWatermarkClient />
            </div>
            {/* Features */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Customizable Position</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Place watermarks exactly where you need them
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Transparency Control</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Adjust opacity for subtle or prominent watermarks
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">All Pages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Apply watermarks to all pages automatically
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Privacy Protected</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All processing happens locally in your browser
                </p>
              </div>
            </div>

            {/* How to Use Section */}
            <div className="mt-16 sm:mt-20 bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-red-900/20 rounded-3xl p-8 sm:p-12 border border-rose-200 dark:border-rose-800">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
                  Professional Watermarking Guide
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Master the art of PDF watermarking with our comprehensive guide. Create professional, branded documents with perfect positioning and styling.
                </p>
              </div>

              {/* Layered Process Design */}
              <div className="relative mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Process Steps */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Upload Your PDF</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Select your PDF document from your device. Our tool supports files up to 100MB and processes everything locally for maximum security.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Type className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Design Your Watermark</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Enter your watermark text - company name, copyright notice, or confidential stamp. Choose from multiple font styles and sizes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Perfect the Positioning</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Position your watermark precisely - center, corners, or custom placement. Adjust transparency and rotation for optimal visibility.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Download & Deploy</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Preview your watermarked PDF and download instantly. Your watermark is applied to all pages with consistent quality.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Visual Representation */}
                  <div className="relative">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 rounded-xl p-6 mb-6">
                          <Layers className="h-16 w-16 text-rose-600 dark:text-rose-400 mx-auto mb-4" />
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Layered Watermarking</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Professional overlay technology ensures your watermark integrates seamlessly without affecting document readability.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/50 dark:to-rose-900/50 rounded-lg p-4">
                            <Target className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Precise Positioning</p>
                          </div>
                          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/50 dark:to-pink-900/50 rounded-lg p-4">
                            <Eye className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Live Preview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-rose-200 dark:border-rose-800">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Move className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Position Control</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Center placement for maximum visibility</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Corner positioning for subtle branding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Custom coordinates for precise control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Diagonal placement for security</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-200 dark:border-pink-800">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Style Options</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Multiple font families and weights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Adjustable font size and color</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Rotation angles for dynamic look</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Transparency control for subtlety</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-red-200 dark:border-red-800">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Sliders className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Advanced Settings</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Opacity levels from 10% to 100%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Blend modes for different effects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Page range selection options</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Batch processing capabilities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Use Cases */}
              <div className="bg-gradient-to-r from-white to-rose-50 dark:from-gray-800 dark:to-rose-900/20 rounded-2xl p-8 border border-rose-200 dark:border-rose-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                  <Shield className="h-6 w-6 mr-2 text-rose-600" />
                  Professional Watermarking Strategies
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">©</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Copyright Protection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Add copyright notices to protect intellectual property and establish ownership of documents.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Confidential Marking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mark sensitive documents with "CONFIDENTIAL" or "DRAFT" stamps for security and version control.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Brand Identity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Add company logos or brand names to maintain consistent corporate identity across all documents.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Version Control</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Track document versions with timestamps, revision numbers, or status indicators for better workflow management.
                    </p>
                  </div>
                </div>
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
                      How do I add a watermark to my PDF?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Upload your PDF file, enter your watermark text, choose the position and transparency, then download the watermarked PDF. The process is completely free and secure.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I customize the watermark appearance?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes! You can customize the watermark text, position (center, corners, etc.), transparency level, font size, and color to match your needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Is my PDF secure when adding watermarks?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Absolutely. All processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      What file formats are supported?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      This tool works with PDF files only. The output will also be a PDF file with your watermark applied to all pages.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Can I add watermarks to multiple pages?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, the watermark will be applied to all pages in your PDF document automatically. You can choose different positions for variety.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Are there any file size limits?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The default limit is 100MB per file, but this can handle most PDF documents. For larger files, consider compressing your PDF first.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <RelatedArticles toolName="pdf-watermark" />

            {/* Tools Navigation */}
            <ToolsNavigation currentTool="pdf-watermark" className="mt-8" />
          </div>
        </div>
      </div>
    </>
  )
}
