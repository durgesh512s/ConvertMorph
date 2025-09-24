import { metadata } from './metadata'
import ImageConvertClient from './ImageConvertClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { 
  RefreshCw, 
  Upload, 
  Settings, 
  Download, 
  Eye, 
  Zap,
  CheckCircle,
  Shield,
  FileImage,
  Palette,
  Target,
  Globe,
  Camera,
  Monitor,
  Smartphone
} from 'lucide-react'

export { metadata }

export default function ImageConvertPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <ImageConvertClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent mb-4">
                Professional Image Format Conversion Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master image format conversion with Canvas API processing. Convert between JPEG, PNG, and WebP with optimal quality and compression settings.
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
                    Select up to 20 images in JPEG, PNG, WebP, GIF, or BMP format. Each file can be up to 50MB.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <span>Batch processing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <span>Multiple formats</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Choose Format</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select target format (JPEG, PNG, or WebP) and adjust quality settings for lossy formats.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Format selection</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Palette className="h-3 w-3 text-gray-500" />
                      <span>Quality control</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Convert & Preview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Process images using Canvas API and preview results before downloading.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <RefreshCw className="h-3 w-3 text-gray-500" />
                      <span>Canvas processing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="h-3 w-3 text-gray-500" />
                      <span>Live preview</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-700 to-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Download Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Download individual files or get all converted images in a ZIP archive.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Individual files</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Bulk ZIP download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Format Selection Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Format Selection Guide</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">JPEG Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Best for photographs and images with many colors</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Photography:</strong> Digital photos, portraits</li>
                        <li>• <strong>Web Images:</strong> Blog photos, galleries</li>
                        <li>• <strong>Social Media:</strong> Profile pictures, posts</li>
                        <li>• <strong>Email:</strong> Attachments with size limits</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Lossy Compression</span>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Small File Size</span>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">No Transparency</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PNG Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Perfect for graphics, logos, and images with transparency</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Logos:</strong> Company logos, icons</li>
                        <li>• <strong>Graphics:</strong> Illustrations, diagrams</li>
                        <li>• <strong>Screenshots:</strong> UI captures, tutorials</li>
                        <li>• <strong>Print:</strong> High-quality documents</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Lossless Quality</span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Transparency</span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Larger Files</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">WebP Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Modern web format with superior compression</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Websites:</strong> Modern web applications</li>
                        <li>• <strong>Mobile Apps:</strong> Faster loading images</li>
                        <li>• <strong>E-commerce:</strong> Product galleries</li>
                        <li>• <strong>CDN:</strong> Bandwidth optimization</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Both Lossy/Lossless</span>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">25-35% Smaller</span>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Transparency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Strategies */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Conversion Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web Optimization</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimize images for faster web loading and better user experience</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Conversions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Photos:</strong> JPEG (80-90% quality)</li>
                        <li>• <strong>Graphics:</strong> PNG for transparency</li>
                        <li>• <strong>Modern sites:</strong> WebP for best compression</li>
                        <li>• <strong>Thumbnails:</strong> JPEG (70-80% quality)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile & Performance</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimize for mobile devices and bandwidth constraints</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Best Practices:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>App Icons:</strong> PNG for crisp edges</li>
                        <li>• <strong>Photos:</strong> WebP for smaller sizes</li>
                        <li>• <strong>Retina displays:</strong> Higher quality settings</li>
                        <li>• <strong>Progressive:</strong> JPEG for large images</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Conversion Tips</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Expert strategies to achieve optimal conversion results while balancing quality, file size, and compatibility.
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
                        Choose JPEG for photos with many colors, PNG for graphics with transparency, and WebP for modern web applications requiring optimal compression.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <Palette className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Start with 85% quality for most use cases. Use 95%+ for professional photography and 70-80% for web thumbnails and social media.
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
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Impact</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        WebP can reduce bandwidth by 25-35% compared to JPEG. Consider progressive JPEG for large images and always test different settings for your specific use case.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Process similar images together with consistent settings. Use preview feature to verify results before bulk downloading as ZIP archives.
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
              Common questions about image format conversion and optimization
            </p>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What image formats can I convert between?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can upload JPEG, PNG, WebP, GIF, and BMP images and convert them to JPEG, PNG, or WebP formats. Each conversion uses Canvas API processing for optimal quality and compatibility.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Which format should I choose for my images?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use JPEG for photos with many colors and smaller file sizes, PNG for graphics with transparency or when you need lossless quality, and WebP for modern web applications requiring the best compression efficiency.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Will conversion affect my image quality?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  PNG conversion is completely lossless. JPEG and WebP offer adjustable quality settings - higher settings preserve more detail but create larger files. Our Canvas API processing ensures optimal results for each format.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I preview images before downloading?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Each converted image includes a preview button that opens the result in a new tab, allowing you to verify the conversion quality before downloading individual files or ZIP archives.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What's the maximum file size I can convert?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can convert images up to 50MB each, with a maximum of 20 files per batch. This ensures smooth processing in your browser while covering most photography and design requirements.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Is my data secure during conversion?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! All image conversion happens entirely in your browser using the Canvas API. Your images are never uploaded to our servers, ensuring complete privacy and security of your files.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="image-convert" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="image-convert" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
