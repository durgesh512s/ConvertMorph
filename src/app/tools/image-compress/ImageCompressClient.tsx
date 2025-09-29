'use client'

import { useState } from 'react'
import { Image, Download, FileImage, Zap, Settings, Upload, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { gtm } from '@/components/GoogleTagManager'

interface ProcessingResult {
  blob: Blob
  filename: string
  originalSize: number
  processedSize: number
  metadata?: Record<string, string>
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Compression Tool',
  description: 'Compress images with advanced algorithms while maintaining quality',
  url: 'https://convertmorph.com/tools/image-compress',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Advanced image compression algorithms',
    'Multiple format support (JPEG, PNG, WebP)',
    'Quality control settings',
    'Server-side processing with Sharp',
    'Up to 70% size reduction',
    'Privacy focused - secure processing',
  ],
}

export default function ImageCompressClient() {
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

    // Track file upload with GTM
    gtm.push({
      event: 'tool_usage',
      tool_name: 'image-compress',
      action: 'upload',
      file_type: selectedFile.type.split('/')[1] || 'image',
      file_size_mb: Math.round(selectedFile.size / (1024 * 1024) * 100) / 100,
      file_count: 1
    })
  }

  const processImage = async () => {
    if (!file) return

    setProcessing(true)
    try {
      // First try server-side processing for better performance
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('quality', quality.toString())
        formData.append('format', format)

        const response = await fetch('/api/image-compress', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
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

          // Track successful compression with GTM
          gtm.push({
            event: 'file_convert',
            tool_name: 'image-compress',
            file_type: file.type.split('/')[1] || 'image',
            conversion_value: 1,
            output_format: format,
            processing_method: 'server-side'
          })

          toast.success('Image compressed successfully using server processing!')
          return
        }
      } catch (serverError) {
        console.warn('Server-side processing failed, falling back to client-side:', serverError)
      }

      // Fallback to client-side compression using browser-image-compression
      console.log('Using client-side compression fallback...')
      
      // Import the compression library dynamically
      const { compressImage } = await import('@/lib/imageCompressor')
      
      // Use quality directly instead of mapping to compression levels
      // This gives users precise control over compression
      const compressionLevel: 'light' | 'medium' | 'strong' = 'medium' // Default fallback

      // Map format
      let outputFormat: 'original' | 'jpeg' | 'webp'
      if (format === 'jpeg') {
        outputFormat = 'jpeg'
      } else if (format === 'webp') {
        outputFormat = 'webp'
      } else {
        outputFormat = 'original'
      }

      // Pass quality directly to ensure precise compression control
      const result = await compressImage(file, compressionLevel, outputFormat, quality)
      
      // Generate filename
      const originalName = file.name.split('.')[0] || 'compressed'
      const extension = result.format
      const filename = `${originalName}_compressed.${extension}`

      setResult({
        blob: result.blob,
        filename,
        originalSize: result.originalSize,
        processedSize: result.compressedSize,
        metadata: {
          'compression-ratio': `${result.ratio}%`,
          'processing-method': 'client-side',
          'original-format': file.type,
          'output-format': result.blob.type
        }
      })

      // Track successful compression with GTM (client-side fallback)
      gtm.push({
        event: 'file_convert',
        tool_name: 'image-compress',
        file_type: file.type.split('/')[1] || 'image',
        conversion_value: 1,
        output_format: format,
        processing_method: 'client-side'
      })

      toast.success('Image compressed successfully using client-side processing!')
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
  
  const isFileLarger = result && result.processedSize > result.originalSize
  const compressionText = isFileLarger 
    ? `+${Math.abs(parseFloat(compressionRatio))}% increase` 
    : `${compressionRatio}% reduction`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
              <p className="text-gray-600 dark:text-gray-400">
                {isFileLarger ? 'Size Change:' : 'Reduction:'}
              </p>
              <p className={`font-medium ${isFileLarger ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {compressionText}
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
    </>
  )
}
