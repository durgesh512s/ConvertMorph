'use client'

import { useState } from 'react'
import { Image, Download, FileImage, Zap, Settings, AlertCircle } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'

interface ProcessedFile {
  name: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  downloadUrl: string
  format: string
}

export default function ImageCompressPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')
  const [outputFormat, setOutputFormat] = useState<'original' | 'jpeg' | 'webp'>('original')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesAdded = async (files: File[]) => {
    const mapped = files.map(file => {
      track('file_upload', {
        tool: 'image-compress',
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

  const clearAll = () => {
    processedFiles.forEach(f => URL.revokeObjectURL(f.downloadUrl))
    setUploadedFiles([])
    setProcessedFiles([])
  }

  const handleCompress = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    setProcessedFiles([])

    try {
      const results: ProcessedFile[] = []

      // Dynamically import the image compressor to avoid SSR issues
      const { compressImage } = await import('@/lib/imageCompressor')

      for (const uf of uploadedFiles) {
        try {
          const result = await compressImage(uf.file, compressionLevel, outputFormat)
          const url = URL.createObjectURL(result.blob)
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')

          results.push({
            name: names.compressImage(safeName, compressionLevel, result.format),
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            compressionRatio: result.ratio,
            downloadUrl: url,
            format: result.format,
          })
        } catch (err) {
          console.error('Compression error:', err)
          toast.error(`Failed to compress ${uf.name}`)
        }
      }

      if (results.length > 0) {
        setProcessedFiles(results)
        toast.success(`Compressed ${results.length} image${results.length > 1 ? 's' : ''} successfully!`)
      }
    } catch (error) {
      console.error('Compression failed:', error)
      toast.error('Compression failed. Please try again.')
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

  const compressionOptions = [
    { level: 'light' as const, name: 'Light Compression', description: 'Minimal compression, best quality', quality: '90%', reduction: '~20%' },
    { level: 'medium' as const, name: 'Medium Compression', description: 'Balanced compression and quality', quality: '70%', reduction: '~50%' },
    { level: 'strong' as const, name: 'Strong Compression', description: 'Maximum compression, smaller files', quality: '50%', reduction: '~70%' },
  ]

  const formatOptions = [
    { format: 'original' as const, name: 'Keep Original', description: 'Maintain original format' },
    { format: 'jpeg' as const, name: 'JPEG', description: 'Best for photos, smaller size' },
    { format: 'webp' as const, name: 'WebP', description: 'Modern format, excellent compression' },
  ]

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Image Compress</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Reduce image file size while maintaining quality. Support for JPEG, PNG, WebP and more formats.
            </p>
          </div>

          {/* Compression Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Compression Settings
            </h2>
            
            {/* Compression Level */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Compression Level</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {compressionOptions.map(option => (
                  <div
                    key={option.level}
                    className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                      compressionLevel === option.level
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setCompressionLevel(option.level)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        checked={compressionLevel === option.level}
                        onChange={() => setCompressionLevel(option.level)}
                        className="mr-2 flex-shrink-0"
                        id={`compression-${option.level}`}
                        name="compression-level"
                      />
                      <label htmlFor={`compression-${option.level}`} className="font-medium text-sm sm:text-base cursor-pointer text-gray-900 dark:text-white">
                        {option.name}
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm mb-2 text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                      <span>Quality: {option.quality}</span>
                      <span>{option.reduction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Output Format</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {formatOptions.map(option => (
                  <div
                    key={option.format}
                    className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                      outputFormat === option.format
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
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
                'image/bmp': ['.bmp'],
                'image/tiff': ['.tiff', '.tif']
              }}
              maxFiles={20}
              maxSize={50 * 1024 * 1024}
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Compress Images ({uploadedFiles.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="h-4 w-4 mr-2" /> Compressed Images
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex items-start min-w-0 flex-1">
                        <FileImage className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white break-words">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Original: {formatFileSize(file.originalSize)}</span>
                            <span>Compressed: {formatFileSize(file.compressedSize)}</span>
                            <span className="text-green-600 dark:text-green-400">({file.compressionRatio}% smaller)</span>
                            <span className="text-purple-600 dark:text-purple-400">{file.format.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={file.downloadUrl}
                        download={file.name}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                      >
                        <Download className="h-3 w-3 mr-1" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {processedFiles.length > 1 && (
                <button
                  onClick={async () => {
                    const files = processedFiles.map(file => ({ name: file.name, url: file.downloadUrl }))
                    await downloadFilesAsZip(files, 'compressed-images.zip')
                  }}
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" /> Download All as ZIP
                </button>
              )}
            </div>
          )}

          {/* Related Articles */}
          <RelatedArticles toolName="image-compress" />
        </div>
      </div>
    </div>
  )
}
