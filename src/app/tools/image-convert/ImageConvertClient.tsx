'use client'

import { useState } from 'react'
import { RefreshCw, Download, FileImage, Settings, Eye, Zap, Palette, Shield } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { gtm } from '@/components/GoogleTagManager'
import { generateFileId } from '@/lib/id-utils'

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

export default function ImageConvertClient() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('png')
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesAdded = async (files: File[]) => {
    const mapped = files.map(file => {
      // Track file upload with GTM
      gtm.push({
        event: 'tool_usage',
        tool_name: 'image-convert',
        action: 'upload',
        file_type: file.type.split('/')[1] || 'image',
        file_size_mb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        file_count: 1
      })
      return { 
        id: generateFileId(), 
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
        
        // Track successful conversion with GTM
        gtm.push({
          event: 'file_convert',
          tool_name: 'image-convert',
          file_type: 'image',
          conversion_value: 1,
          file_count: results.length,
          output_format: outputFormat,
          processing_method: 'client-side'
        })
        
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
    <>
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
    </>
  )
}
