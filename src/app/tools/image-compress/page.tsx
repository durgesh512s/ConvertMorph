'use client'

import { useState } from 'react'
import { Image, Download, FileImage, Zap, Settings, AlertCircle, Upload, Sliders, Target, CheckCircle, Gauge, Layers, Monitor, Smartphone } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
import { generateFileId } from '@/lib/id-utils'

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
                    Drag & drop or select up to 20 images. Supports JPEG, PNG, WebP, GIF, BMP, and TIFF formats.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>Max 50MB per file</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>Batch processing</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sliders className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Choose Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select compression level and output format based on your needs and quality requirements.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Light, Medium, Strong</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>JPEG, WebP, Original</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Compress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Click compress and watch as advanced algorithms reduce file sizes while preserving quality.
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
                    Download individual files or get all compressed images in a convenient ZIP archive.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Individual downloads</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Bulk ZIP download</span>
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
                        <li>• <strong>Level:</strong> Medium to Strong</li>
                        <li>• <strong>Format:</strong> WebP or JPEG</li>
                        <li>• <strong>Target:</strong> 100-500KB per image</li>
                        <li>• <strong>Quality:</strong> 70-80% for photos</li>
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
                        <li>• <strong>Level:</strong> Strong</li>
                        <li>• <strong>Format:</strong> JPEG or WebP</li>
                        <li>• <strong>Target:</strong> 50-200KB per image</li>
                        <li>• <strong>Quality:</strong> 60-70% acceptable</li>
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
                        <li>• <strong>Level:</strong> Light to Medium</li>
                        <li>• <strong>Format:</strong> Keep Original</li>
                        <li>• <strong>Target:</strong> 30-50% size reduction</li>
                        <li>• <strong>Quality:</strong> 80-90% preserved</li>
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
                        Use WebP for modern browsers (90%+ support), JPEG for photos with gradients, and keep PNG for images with transparency or sharp edges.
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
                        Start with medium compression and adjust based on visual inspection. Most users can't detect quality loss below 80% for photos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Layers className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Batch Processing Efficiency</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Process similar images together with the same settings. Group photos, graphics, and screenshots separately for optimal results.
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
                  What image formats are supported for compression?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our tool supports all major image formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can upload up to 20 images at once, with each file up to 50MB in size.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How much can I reduce image file size without losing quality?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Typically, you can achieve 20-70% size reduction depending on the compression level. Light compression reduces size by ~20% with minimal quality loss, medium by ~50% with good quality retention, and strong compression can reduce size by ~70% with acceptable quality for web use.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Which compression level should I choose?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose based on your use case: Light compression (90% quality) for archival and print, Medium compression (70% quality) for websites and general use, Strong compression (50% quality) for mobile apps, email attachments, and when file size is critical.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What's the difference between JPEG and WebP output formats?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  JPEG is universally supported and ideal for photos with gradients and complex colors. WebP is a modern format that provides 25-35% better compression than JPEG with similar quality, but has 95%+ browser support. Choose WebP for web use and JPEG for maximum compatibility.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Is my data safe? Are images stored on your servers?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No, your images are processed entirely in your browser using client-side compression algorithms. Images are never uploaded to our servers, ensuring complete privacy and security. All processing happens locally on your device.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I compress images for social media platforms?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Use medium to strong compression with JPEG or WebP format. Most social platforms automatically compress images, so pre-compressing helps maintain better quality. Target 100-500KB for optimal results on platforms like Instagram, Facebook, and Twitter.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What happens to image metadata during compression?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Most metadata (EXIF data, location info, camera settings) is removed during compression to reduce file size and protect privacy. If you need to preserve metadata for professional use, consider using light compression or keeping the original format.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How does batch compression work?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload multiple images and apply the same compression settings to all files simultaneously. This saves time when processing many images with similar requirements. You can download individual files or get all compressed images in a single ZIP archive.
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
