'use client'

import { useState } from 'react'
import { RefreshCw, Download, FileImage, Settings, Eye, Zap, Palette, Shield } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'

interface ProcessedFile {
  name: string
  originalSize: number
  convertedSize: number
  originalFormat: string
  outputFormat: string
  originalDimensions: { width: number; height: number }
  downloadUrl: string
  previewUrl: string
  sizeChange: { percentage: number; isReduction: boolean }
}

export default function ImageConvertPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('png')
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesAdded = async (files: File[]) => {
    const mapped = files.map(file => {
      track('file_upload', {
        tool: 'image-convert',
        sizeMb: Math.round(file.size / (1024*1024) * 100) / 100,
        format: file.type
      })
      return { 
        id: Math.random().toString(36).slice(2, 11), 
        file, 
        name: file.name, 
        size: file.size, 
        type: file.type, 
        status: 'success' 
      } as UploadedFile
    })
    setUploadedFiles(prev => [...prev, ...mapped])
    setProcessedFiles([])
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    setProcessedFiles([])

    try {
      const results: ProcessedFile[] = []

      // Dynamically import the image converter to avoid SSR issues
      const { convertImage, getFormatFromMimeType, getFileExtension } = await import('@/lib/imageConverter')

      for (const uf of uploadedFiles) {
        try {
          const result = await convertImage(uf.file, {
            outputFormat,
            quality: quality / 100
          })

          const url = URL.createObjectURL(result.blob)
          const previewUrl = URL.createObjectURL(result.blob)
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')

          results.push({
            name: names.convertImage(
              safeName, 
              result.originalFormat, 
              result.outputFormat
            ),
            originalSize: result.originalSize,
            convertedSize: result.convertedSize,
            originalFormat: result.originalFormat,
            outputFormat: result.outputFormat,
            originalDimensions: result.originalDimensions,
            downloadUrl: url,
            previewUrl,
            sizeChange: result.sizeChange
          })
        } catch (err) {
          console.error('Convert error:', err)
          toast.error(`Failed to convert ${uf.name}`)
        }
      }

      if (results.length > 0) {
        setProcessedFiles(results)
        toast.success(`Converted ${results.length} image${results.length > 1 ? 's' : ''} successfully!`)
      }
    } catch (error) {
      console.error('Convert failed:', error)
      toast.error('Convert failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatOptions = [
    { format: 'jpeg' as const, name: 'JPEG', description: 'Best for photos, smaller size', supportsQuality: true },
    { format: 'png' as const, name: 'PNG', description: 'Best for graphics, lossless', supportsQuality: false },
    { format: 'webp' as const, name: 'WebP', description: 'Modern format, excellent compression', supportsQuality: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Image Convert</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Convert images between JPG, PNG, and WebP formats using Canvas API. High-quality conversion with preview.
            </p>
          </div>

          {/* Convert Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Convert Settings
            </h2>
            
            {/* Output Format */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Output Format</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {formatOptions.map(option => (
                  <div
                    key={option.format}
                    className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                      outputFormat === option.format
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setOutputFormat(option.format)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        checked={outputFormat === option.format}
                        onChange={() => setOutputFormat(option.format)}
                        className="mr-2 flex-shrink-0"
                        id={`format-${option.format}`}
                        name="output-format"
                      />
                      <label htmlFor={`format-${option.format}`} className="font-medium text-sm sm:text-base cursor-pointer text-gray-900 dark:text-white">
                        {option.name}
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Slider (for JPEG/WebP) */}
            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  Quality: {quality}%
                </h3>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Lower quality (smaller file)</span>
                  <span>Higher quality (larger file)</span>
                </div>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'image/webp': ['.webp'],
                'image/gif': ['.gif'],
                'image/bmp': ['.bmp']
              }}
              maxFiles={20}
              maxSize={50 * 1024 * 1024}
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Converting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Convert Images ({uploadedFiles.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="h-4 w-4 mr-2" /> Converted Images
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <div className="flex items-start min-w-0 flex-1">
                        <FileImage className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white break-words">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Format: {file.originalFormat.toUpperCase()} → {file.outputFormat.toUpperCase()}</span>
                            <span>Dimensions: {file.originalDimensions.width}×{file.originalDimensions.height}</span>
                            <span>Size: {formatFileSize(file.originalSize)} → {formatFileSize(file.convertedSize)}</span>
                            <span className={file.sizeChange.isReduction ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                              ({file.sizeChange.isReduction ? '-' : '+'}{file.sizeChange.percentage}%)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                        <button
                          onClick={() => window.open(file.previewUrl, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                        >
                          <Eye className="h-3 w-3 mr-1" /> Preview
                        </button>
                        <a
                          href={file.downloadUrl}
                          download={file.name}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                        >
                          <Download className="h-3 w-3 mr-1" /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {processedFiles.length > 1 && (
                <button
                  onClick={async () => {
                    const files = processedFiles.map(file => ({ name: file.name, url: file.downloadUrl }))
                    await downloadFilesAsZip(files, 'converted-images.zip')
                  }}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" /> Download All as ZIP
                </button>
              )}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Format Conversion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Convert between JPEG, PNG, and WebP formats seamlessly</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Canvas Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">High-quality conversion using HTML5 Canvas API</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Control</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Adjustable quality settings for JPEG and WebP formats</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preview & Download</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preview converted images before downloading</p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 mb-8">
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-slate-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <RefreshCw className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Smart Image Format Conversion Guide</h2>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Master the art of image format conversion with our comprehensive step-by-step guide and format selection strategies
                </p>
              </div>

              {/* Conversion Process */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🔄 Conversion Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <FileImage className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Upload Images</h4>
                    <p className="text-gray-200 text-sm">
                      Drag & drop or select your images. Supports JPEG, PNG, WebP, GIF, and BMP formats up to 50MB each.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Choose Format</h4>
                    <p className="text-gray-200 text-sm">
                      Select your target format (JPEG, PNG, or WebP) and adjust quality settings for lossy formats.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Convert & Preview</h4>
                    <p className="text-gray-200 text-sm">
                      Click convert to process your images using Canvas API. Preview results before downloading.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Download className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Download Results</h4>
                    <p className="text-gray-200 text-sm">
                      Download individual files or get all converted images in a convenient ZIP archive.
                    </p>
                  </div>
                </div>
              </div>

              {/* Format Selection Guide */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">📋 Format Selection Guide</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-red-500/30 rounded-lg p-2 mr-3">
                        <span className="text-lg font-bold">JPEG</span>
                      </div>
                      <h4 className="font-semibold text-lg">Best for Photos</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Excellent compression for photographs</li>
                      <li>• Smaller file sizes for web use</li>
                      <li>• Adjustable quality (10-100%)</li>
                      <li>• No transparency support</li>
                      <li>• Lossy compression format</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-500/30 rounded-lg p-2 mr-3">
                        <span className="text-lg font-bold">PNG</span>
                      </div>
                      <h4 className="font-semibold text-lg">Best for Graphics</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Lossless compression quality</li>
                      <li>• Full transparency support</li>
                      <li>• Perfect for logos & graphics</li>
                      <li>• Larger file sizes than JPEG</li>
                      <li>• No quality degradation</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500/30 rounded-lg p-2 mr-3">
                        <span className="text-lg font-bold">WebP</span>
                      </div>
                      <h4 className="font-semibold text-lg">Modern Web Format</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Superior compression efficiency</li>
                      <li>• Both lossy and lossless modes</li>
                      <li>• Transparency support included</li>
                      <li>• Excellent for modern browsers</li>
                      <li>• 25-35% smaller than JPEG</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Conversion Strategies */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🎯 Conversion Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-yellow-500/30 rounded-lg p-2 mr-3 text-sm">WEB</span>
                      Web Optimization
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>Photos:</strong> Convert to JPEG (80-90% quality)</li>
                      <li><strong>Graphics:</strong> Use PNG for transparency</li>
                      <li><strong>Modern sites:</strong> WebP for best compression</li>
                      <li><strong>Thumbnails:</strong> JPEG at 70-80% quality</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-green-500/30 rounded-lg p-2 mr-3 text-sm">PRINT</span>
                      Print & Archive
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>High quality:</strong> PNG for no quality loss</li>
                      <li><strong>Photos:</strong> JPEG at 95-100% quality</li>
                      <li><strong>Documents:</strong> PNG for text clarity</li>
                      <li><strong>Archive:</strong> PNG for long-term storage</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Conversion Tips */}
              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-white">💡 Pro Conversion Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-3 text-white">🎨 Format Selection</h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Choose JPEG for photos with many colors</li>
                      <li>• Use PNG for images with text or transparency</li>
                      <li>• WebP offers best compression for modern browsers</li>
                      <li>• Consider your target audience's browser support</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-3 text-white">⚡ Quality Balance</h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Start with 85% quality for most use cases</li>
                      <li>• Use 95%+ for professional photography</li>
                      <li>• 70-80% works well for web thumbnails</li>
                      <li>• Test different settings to find sweet spot</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-3 text-white">📦 Batch Processing</h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Process similar images together</li>
                      <li>• Use consistent quality settings</li>
                      <li>• Download as ZIP for multiple files</li>
                      <li>• Preview before bulk downloading</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-3 text-white">🚀 Performance Impact</h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• Smaller files load faster on websites</li>
                      <li>• WebP can reduce bandwidth by 25-35%</li>
                      <li>• Consider progressive JPEG for large images</li>
                      <li>• Balance quality vs file size for your needs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What image formats can I convert?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You can upload JPEG, PNG, WebP, GIF, and BMP images. Convert to JPEG, PNG, or WebP formats with high quality output.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Which format should I choose?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Use JPEG for photos with smaller file sizes, PNG for graphics with transparency, and WebP for modern web applications with excellent compression.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's the maximum file size I can convert?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You can convert images up to 50MB each, with a maximum of 20 files per batch for optimal browser performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Will conversion affect image quality?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  PNG conversion is lossless. JPEG and WebP offer quality controls - higher settings preserve more detail but create larger files.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I preview images before downloading?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes! Each converted image includes a preview button to view the result in a new tab before downloading.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data secure during conversion?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Absolutely! All image conversion happens entirely in your browser using Canvas API. Your images never leave your device.
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
