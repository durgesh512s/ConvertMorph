import { metadata } from './metadata'
import ImageCompressClient from './ImageCompressClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { 
  Image, 
  Upload, 
  Sliders, 
  Target, 
  Gauge, 
  Layers, 
  Monitor, 
  Smartphone,
  Zap,
  CheckCircle,
  Shield,
  FileImage,
  Download
} from 'lucide-react'

export { metadata }

export default function ImageCompressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <ImageCompressClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent mb-4">
                Smart Image Compression Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Optimize your images for web, email, and storage. Reduce file sizes by up to 70% while maintaining visual quality with intelligent compression algorithms.
              </p>
            </div>

            {/* Step-by-Step Process */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Upload Images</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Drag & drop or select your image. Supports JPEG, PNG, WebP, GIF, BMP, and TIFF formats.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>Max 50MB per file</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>Server-side processing</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sliders className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Choose Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select quality level and output format based on your needs and quality requirements.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Quality: 10-100%</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>JPEG, PNG, WebP</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Compress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Click compress and watch as advanced Sharp algorithms reduce file sizes while preserving quality.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Gauge className="h-3 w-3 text-gray-500" />
                      <span>Real-time progress</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Gauge className="h-3 w-3 text-gray-500" />
                      <span>Instant results</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-700 to-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Download</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Download your compressed image with detailed compression statistics and metadata.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Instant download</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Compression stats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compression Strategy Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Compression Strategy Guide</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web Optimization</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Perfect for websites and online content</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Settings:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Quality:</strong> 70-80%</li>
                        <li>• <strong>Format:</strong> WebP or JPEG</li>
                        <li>• <strong>Target:</strong> 100-500KB per image</li>
                        <li>• <strong>Use Case:</strong> Fast loading websites</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best For:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Hero Images</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Product Photos</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Blog Images</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile & Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for mobile apps and email</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Settings:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Quality:</strong> 60-70%</li>
                        <li>• <strong>Format:</strong> JPEG or WebP</li>
                        <li>• <strong>Target:</strong> 50-200KB per image</li>
                        <li>• <strong>Use Case:</strong> Mobile optimization</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best For:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">App Assets</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Email Attachments</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Social Media</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Layers className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Archive & Storage</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Balance quality and storage efficiency</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Settings:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Quality:</strong> 80-90%</li>
                        <li>• <strong>Format:</strong> Keep Original</li>
                        <li>• <strong>Target:</strong> 30-50% size reduction</li>
                        <li>• <strong>Use Case:</strong> Long-term storage</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best For:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Photo Libraries</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Backup Storage</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Documents</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-slate-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Compression Tips</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Expert strategies to achieve optimal compression results for different use cases and image types.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Format Selection Strategy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Use WebP for modern browsers (95%+ support), JPEG for photos with gradients, and keep PNG for images with transparency.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <Gauge className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality vs Size Balance</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Start with 80% quality and adjust based on visual inspection. Most users can't detect quality loss below 70% for web use.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Zap className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Server-Side Advantages</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Our server-side Sharp processing provides better compression algorithms and handles larger files than browser-based tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Impact</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Smaller images load faster, improve SEO rankings, and reduce bandwidth costs. Aim for under 500KB for web images.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 sm:mt-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
              Common questions about image compression and optimization
            </p>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What makes server-side compression better?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our server-side compression uses Sharp, a professional-grade image processing library with advanced algorithms like mozjpeg. It's 3-5x faster than browser-based compression and can handle files up to 50MB without memory limitations.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How much can I reduce image file size?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Typically, you can achieve 30-70% size reduction depending on the quality setting. Our server-side processing often achieves better compression ratios than browser-based tools while maintaining superior image quality.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Which format should I choose?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  WebP provides the best compression (25-35% smaller than JPEG) with 95%+ browser support. JPEG is ideal for photos and universal compatibility. PNG is best for graphics with transparency or sharp edges.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Is my data safe during processing?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, your images are processed securely on our servers and are not stored permanently. Files are processed in memory and immediately deleted after compression. We use enterprise-grade security measures to protect your data.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What's the maximum file size supported?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our server-side processing supports files up to 50MB, which is significantly larger than most browser-based tools. This allows you to compress high-resolution photos, professional images, and large graphics without issues.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="image-compress" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="image-compress" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
