import { metadata } from './metadata'
import ImageResizeClient from './ImageResizeClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { 
  Maximize2, 
  Upload, 
  Sliders, 
  Target, 
  Ruler, 
  Lock, 
  Zap,
  CheckCircle,
  Shield,
  FileImage,
  Download,
  Monitor,
  Smartphone,
  Camera,
  Palette,
  Settings
} from 'lucide-react'

export { metadata }

export default function ImageResizePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <ImageResizeClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent mb-4">
                Professional Image Resizing Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master the art of image resizing for web, print, and digital media. Achieve perfect dimensions while maintaining quality and optimizing file sizes.
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
                    <Ruler className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Set Dimensions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Enter target width and height in pixels. Choose to maintain aspect ratio or resize freely.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Lock className="h-3 w-3 text-gray-500" />
                      <span>Aspect ratio lock</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Precise control</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sliders className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Configure Output</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select output format and quality settings. Optimize for your specific use case and requirements.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Palette className="h-3 w-3 text-gray-500" />
                      <span>Format options</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Settings className="h-3 w-3 text-gray-500" />
                      <span>Quality control</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-700 to-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Download Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Get your resized images individually or download all as a convenient ZIP archive.
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

            {/* Resize Strategy Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Resize Strategy Guide</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web & Digital</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for websites and digital displays</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Hero Images:</strong> 1920×1080px</li>
                        <li>• <strong>Blog Images:</strong> 1200×630px</li>
                        <li>• <strong>Thumbnails:</strong> 300×200px</li>
                        <li>• <strong>Social Media:</strong> 1080×1080px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">WebP Format</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Maintain Aspect</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Optimize Size</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile & Apps</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Perfect for mobile applications and responsive design</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>App Icons:</strong> 512×512px</li>
                        <li>• <strong>Mobile Banners:</strong> 750×1334px</li>
                        <li>• <strong>Profile Images:</strong> 400×400px</li>
                        <li>• <strong>Card Images:</strong> 600×400px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Square Ratios</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">High DPI</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Small Files</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Print & Media</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">High-resolution for print and professional media</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>A4 Print:</strong> 2480×3508px</li>
                        <li>• <strong>Business Card:</strong> 1050×600px</li>
                        <li>• <strong>Poster:</strong> 3000×4000px</li>
                        <li>• <strong>Brochure:</strong> 2550×3300px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">PNG Format</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">300 DPI</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">High Quality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Resizing Tips</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Expert strategies to achieve optimal resizing results while maintaining quality and meeting specific requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Aspect Ratio Strategy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Always maintain aspect ratio for photos to prevent distortion. Use free resize only for graphics that need exact dimensions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <Ruler className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dimension Planning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Plan your target dimensions based on final use. Consider device pixel ratios and responsive breakpoints for web images.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Format Selection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose WebP for web use, PNG for graphics with transparency, and JPEG for photos. Consider file size vs quality trade-offs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Start with 90% quality and adjust down if file size is too large. Most users can't detect quality loss below 80%.
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
              Common questions about image resizing and optimization
            </p>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What image formats are supported?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can upload JPEG, PNG, WebP, GIF, and BMP images. Output formats include JPEG, PNG, and WebP, or you can keep the original format. Each format is optimized using Canvas API for the best quality.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How does aspect ratio maintenance work?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When aspect ratio is locked, entering width automatically calculates height (and vice versa) to maintain the original proportions of your image. This prevents distortion and ensures professional results.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What's the maximum file size I can resize?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can resize images up to 50MB each, with a maximum of 20 files per batch. This ensures smooth processing in your browser while covering most photography and design requirements.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Will resizing affect image quality?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quality depends on the output format and settings. PNG maintains lossless quality, while JPEG and WebP offer adjustable quality settings for size optimization. Our Canvas API processing ensures optimal results.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I resize images to make them larger?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can resize images to any dimensions, both smaller and larger. However, enlarging images may result in some quality loss due to interpolation. For best results, start with high-resolution source images.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Is my data secure during resizing?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! All image processing happens entirely in your browser using the Canvas API. Your images are never uploaded to our servers, ensuring complete privacy and security of your files.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="image-resize" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="image-resize" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
