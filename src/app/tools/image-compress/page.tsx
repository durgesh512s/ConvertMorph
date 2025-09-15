'use client'

import { useState } from 'react'
import { Image, Download, FileImage, Zap, Settings, Upload, Sliders, Target, CheckCircle, Gauge, Layers, Monitor, Smartphone } from 'lucide-react'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { toast } from 'sonner'
import { track } from '@/lib/analytics/client'

interface ProcessingResult {
  blob: Blob
  filename: string
  originalSize: number
  processedSize: number
  metadata?: Record<string, string>
}

export default function ImageCompressPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024
    if (selectedFile.size > maxSize) {
      toast.error('File too large. Maximum size is 50MB')
      return
    }

    setFile(selectedFile)
    setResult(null)

    track('file_upload', {
      tool: 'image-compress',
      sizeMb: Math.round(selectedFile.size / (1024*1024) * 100) / 100,
      format: selectedFile.type
    })
  }

  const processImage = async () => {
    if (!file) return

    setProcessing(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('quality', quality.toString())
      formData.append('format', format)

      const response = await fetch('/api/image-compress', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Processing failed')
      }

      // Get metadata from headers
      const metadata: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        if (key.startsWith('x-')) {
          metadata[key] = value
        }
      })

      const blob = await response.blob()
      const filename = response.headers.get('content-disposition')
        ?.match(/filename="(.+)"/)?.[1] || 'compressed_image'

      const originalSize = parseInt(metadata['x-original-size'] || '0')
      const processedSize = parseInt(metadata['x-compressed-size'] || '0')

      setResult({
        blob,
        filename,
        originalSize,
        processedSize,
        metadata
      })

      toast.success('Image compressed successfully!')
    } catch (error) {
      console.error('Processing error:', error)
      toast.error(error instanceof Error ? error.message : 'Processing failed')
    } finally {
      setProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return

    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const compressionRatio = result ? 
    ((result.originalSize - result.processedSize) / result.originalSize * 100).toFixed(1) : '0'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Image className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Compress

            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Compress images using powerful server-side processing with Sharp. Faster, more reliable, and supports larger files.
            </p>
          </div>

          {/* Compression Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Compression Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quality Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Smaller</span>
                  <span>Better Quality</span>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="jpeg">JPEG (Best for photos)</option>
                  <option value="png">PNG (Best for graphics)</option>
                  <option value="webp">WebP (Modern format)</option>
                </select>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop your image here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Supports: JPG, PNG, WebP, GIF, BMP, TIFF (Max: 50MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 cursor-pointer"
              >
                Choose File
              </label>
            </div>

            {/* Selected File Info */}
            {file && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            )}

            {/* Process Button */}
            {file && (
              <div className="mt-6">
                <button
                  onClick={processImage}
                  disabled={processing}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Compressing on server...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Compress Image
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                    Compression Complete!
                  </h3>
                </div>
                <button
                  onClick={downloadResult}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Original Size:</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatFileSize(result.originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Compressed Size:</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatFileSize(result.processedSize)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Reduction:</p>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {compressionRatio}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Format:</p>
                  <p className="font-medium text-purple-600 dark:text-purple-400">
                    {format.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}

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
