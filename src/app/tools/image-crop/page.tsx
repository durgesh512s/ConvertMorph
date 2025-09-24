import { metadata } from './metadata'
import ImageCropClient from './ImageCropClient'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { 
  Crop, 
  Upload, 
  Settings, 
  Download, 
  Scissors, 
  Zap,
  CheckCircle,
  Shield,
  FileImage,
  Palette,
  Target,
  Grid,
  Camera,
  Monitor,
  Smartphone
} from 'lucide-react'

export { metadata }

export default function ImageCropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Client Component for Interactive Functionality */}
          <ImageCropClient />

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent mb-4">
                Professional Image Cropping Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master precision image cropping with React Easy Crop. Learn professional techniques for perfect composition and aspect ratio control.
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
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Batch processing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Multiple formats</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Set Aspect Ratio</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Choose from preset ratios (square, 16:9, 4:3) or use free crop for custom dimensions.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Preset ratios</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Grid className="h-3 w-3 text-gray-500" />
                      <span>Free crop mode</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Scissors className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Position & Crop</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Drag to position the crop area and use zoom controls for precise framing with grid overlay.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Crop className="h-3 w-3 text-gray-500" />
                      <span>Drag positioning</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="h-3 w-3 text-gray-500" />
                      <span>Zoom controls</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-700 to-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Process & Download</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Apply crops to all images, choose output format and quality, then download individually or as ZIP.
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

            {/* Aspect Ratio Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Aspect Ratio Mastery</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Square (1:1)</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Perfect for social media and balanced compositions</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Instagram Posts:</strong> Perfect square format</li>
                        <li>• <strong>Profile Pictures:</strong> Avatars and headshots</li>
                        <li>• <strong>Product Photos:</strong> E-commerce thumbnails</li>
                        <li>• <strong>Logo Design:</strong> Balanced brand elements</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Balanced Focus</span>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Social Media</span>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Symmetrical</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Widescreen (16:9)</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Ideal for landscapes and video content</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>YouTube Thumbnails:</strong> Video preview images</li>
                        <li>• <strong>Website Banners:</strong> Hero section images</li>
                        <li>• <strong>Landscape Photos:</strong> Scenic photography</li>
                        <li>• <strong>Presentations:</strong> Slide backgrounds</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Cinematic</span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Wide View</span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Professional</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile Stories (9:16)</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for mobile and vertical content</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best Use Cases:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Instagram Stories:</strong> Vertical story format</li>
                        <li>• <strong>TikTok Videos:</strong> Mobile-first content</li>
                        <li>• <strong>Phone Wallpapers:</strong> Lock screen images</li>
                        <li>• <strong>App Screenshots:</strong> Mobile app previews</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Characteristics:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Mobile First</span>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Vertical</span>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Story Format</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cropping Strategies */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Professional Cropping Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Composition Rules</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Rule of Thirds:</strong> Position key elements along grid lines for balanced composition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Leading Lines:</strong> Use crop boundaries to guide viewer attention to focal points</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Negative Space:</strong> Include breathing room around subjects for visual impact</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Center Focus:</strong> Use square crops for symmetrical, centered compositions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Technical Tips</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Zoom Control:</strong> Use 1x-3x zoom for precise positioning and detail work</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Grid Overlay:</strong> Enable grid lines for accurate alignment and composition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Quality Settings:</strong> Adjust JPEG/WebP quality based on intended use case</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Batch Processing:</strong> Apply consistent crops across multiple images efficiently</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">What aspect ratios are available for cropping?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We offer common aspect ratios like 1:1 (square), 4:3, 16:9, 3:2, and custom ratios. You can also crop freely without any ratio constraints using React Easy Crop's flexible interface.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Can I crop multiple images with the same settings?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, you can apply the same crop settings to multiple images in batch mode, ensuring consistent dimensions across all your images with Canvas API processing.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Will cropping affect image quality?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Cropping only removes pixels and doesn't compress the remaining image, so there's no quality loss in the cropped area. Quality settings only apply when converting formats.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">What image formats are supported for cropping?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We support JPEG, PNG, WebP, GIF, and BMP formats. The output can maintain the same format as your input image or convert to JPEG, PNG, or WebP with quality control.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Is my data secure during cropping?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Absolutely! All image cropping happens entirely in your browser using Canvas API. Your images are never uploaded to our servers, ensuring complete privacy and security.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Can I undo crop operations?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can reset the crop area before applying changes using the zoom and position controls. Once applied, you'll need to re-upload the original image to start over.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles 
            toolName="Image Crop"
            articles={[
              {
                title: "Crop Images Online",
                description: "Learn professional image cropping techniques",
                href: "/blog/crop-images-online",
                category: "Tutorial",
                readTime: "5 min read"
              },
              {
                title: "Image Resize Guide", 
                description: "Resize images while maintaining quality",
                href: "/blog/resize-images-online",
                category: "Guide",
                readTime: "4 min read"
              },
              {
                title: "Convert Image Formats",
                description: "Convert between JPEG, PNG, WebP formats",
                href: "/blog/convert-image-formats-online", 
                category: "Tutorial",
                readTime: "6 min read"
              }
            ]}
          />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="image-crop" />
        </div>
      </div>
    </div>
  )
}
