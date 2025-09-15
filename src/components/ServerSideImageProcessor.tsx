'use client'

import { useState } from 'react'
import { Upload, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ProcessingResult {
  blob: Blob
  filename: string
  originalSize: number
  processedSize: number
  metadata?: Record<string, string>
}

interface ServerSideImageProcessorProps {
  endpoint: string
  title: string
  description: string
  acceptedTypes?: string
  maxFileSize?: number
  children?: React.ReactNode
}

export function ServerSideImageProcessor({
  endpoint,
  title,
  description,
  acceptedTypes = 'image/*',
  maxFileSize = 50 * 1024 * 1024, // 50MB
  children
}: ServerSideImageProcessorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [dragActive, setDragActive] = useState(false)

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

    // Validate file size
    if (selectedFile.size > maxFileSize) {
      toast.error(`File too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`)
      return
    }

    setFile(selectedFile)
    setResult(null)
  }

  const processImage = async (formData: FormData) => {
    if (!file) return

    setProcessing(true)
    try {
      // Add the file to form data
      formData.append('file', file)

      const response = await fetch(endpoint, {
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
        ?.match(/filename="(.+)"/)?.[1] || 'processed_image'

      const originalSize = parseInt(metadata['x-original-size'] || '0')
      const processedSize = parseInt(metadata['x-compressed-size'] || metadata['x-resized-size'] || metadata['x-converted-size'] || '0')

      setResult({
        blob,
        filename,
        originalSize,
        processedSize,
        metadata
      })

      toast.success('Image processed successfully!')
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
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
          Supports: JPG, PNG, WebP, AVIF, TIFF (Max: {Math.round(maxFileSize / 1024 / 1024)}MB)
        </p>
        <input
          type="file"
          accept={acceptedTypes}
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
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

      {/* Processing Options */}
      {file && children && (
        <div className="mt-6">
          {children}
        </div>
      )}

      {/* Processing Status */}
      {processing && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-3" />
            <p className="text-blue-700 dark:text-blue-300">Processing image on server...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                Processing Complete!
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

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Original Size:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatFileSize(result.originalSize)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Processed Size:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatFileSize(result.processedSize)}
              </p>
            </div>
          </div>

          {result.metadata && Object.keys(result.metadata).length > 0 && (
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
              <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Processing Details:
              </p>
              <div className="grid grid-cols-1 gap-1 text-xs">
                {Object.entries(result.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {key.replace('x-', '').replace(/-/g, ' ')}:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Specific processor components
export function ServerSideImageCompressor() {
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState('jpeg')

  const handleProcess = (formData: FormData) => {
    formData.append('quality', quality.toString())
    formData.append('format', format)
    return formData
  }

  return (
    <ServerSideImageProcessor
      endpoint="/api/image-compress"
      title="Server-Side Image Compression"
      description="Compress images using powerful server-side processing with Sharp"
    >
      <div className="space-y-4">
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
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
        <button
          onClick={() => {
            const formData = new FormData()
            handleProcess(formData)
          }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Compress Image
        </button>
      </div>
    </ServerSideImageProcessor>
  )
}
