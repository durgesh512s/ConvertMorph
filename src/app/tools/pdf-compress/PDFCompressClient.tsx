'use client'

import { useState } from 'react'
import { Archive, Download, FileText, Zap, Settings, Server, Monitor, Clock, Info } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
import { generateFileId } from '@/lib/id-utils'
import { 
  compressPDFHybrid, 
  type CompressionProgress,
  type HybridCompressionResult,
} from '@/lib/hybridPDFCompressor'

interface ProcessedFile {
  name: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  downloadUrl: string
  method: 'client-side' | 'server-side'
  processingTime: number
  pdfType: 'image-heavy' | 'text-heavy'
}

export default function PDFCompressClient() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentProgress, setCurrentProgress] = useState<CompressionProgress | null>(null)

  const handleFilesAdded = async (files: File[]) => {
    const mapped = await Promise.all(files.map(async file => {
      let pages = 0
      try {
        const { PDFDocument } = await import('pdf-lib')
        const ab = await file.arrayBuffer()
        const pdf = await PDFDocument.load(ab)
        pages = pdf.getPageCount()
      } catch {}
      track('file_upload', {
        tool: 'compress',
        sizeMb: Math.round(file.size / (1024*1024) * 100) / 100,
        pages
      })
      return { id: generateFileId(), file, name: file.name, size: file.size, type: file.type, status: 'success' } as UploadedFile
    }))
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

    if (compressionLevel === 'strong') {
      toast.error('Strong compression is coming soon! Please use Light or Medium.')
      return
    }

    setIsProcessing(true)
    setProcessedFiles([])
    setCurrentProgress(null)

    try {
      const results: ProcessedFile[] = []

      for (const uf of uploadedFiles) {
        try {
          const result = await compressPDFHybrid(
            uf.file, 
            compressionLevel as 'light' | 'medium',
            (progress: CompressionProgress) => {
              setCurrentProgress(progress)
            }
          )
          
          const url = URL.createObjectURL(result.blob)
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')

          results.push({
            name: names.compress(safeName, compressionLevel),
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            compressionRatio: result.ratio,
            downloadUrl: url,
            method: result.method,
            processingTime: result.processingTime,
            pdfType: result.pdfType
          })
        } catch (err) {
          console.error('Compression error:', err)
          toast.error(`Failed to compress ${uf.name}`)
        }
      }

      if (results.length > 0) {
        setProcessedFiles(results)
        toast.success(`Compressed ${results.length} file${results.length > 1 ? 's' : ''} successfully!`)
      }
    } catch (error) {
      console.error('Compression failed:', error)
      toast.error('Compression failed. Please try again.')
    } finally {
      setIsProcessing(false)
      setCurrentProgress(null)
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
    { level: 'light' as const, name: 'Light Compression', description: 'Minimal compression, best quality', dpi: '150 DPI', reduction: '~20%' },
    { level: 'medium' as const, name: 'Medium Compression', description: 'Balanced compression and quality', dpi: '120 DPI', reduction: '~40%' },
    { level: 'strong' as const, name: 'Strong Compression', description: 'Maximum compression, smaller files', dpi: '96 DPI', reduction: '~60%' },
  ]

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Archive className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">PDF Compress</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Reduce PDF file size while maintaining quality. Choose your compression level and optimize your documents.
        </p>
      </div>

      {/* Hybrid Processing Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Smart Hybrid Processing
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2 flex-shrink-0">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automatic Method Selection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Our system automatically chooses the best processing method for your files:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Files &lt; 20MB:</strong> Client-side processing (Private & Fast)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Files ≥ 20MB:</strong> Server-side processing (Powerful & Reliable)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compression Level Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Compression Level
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {compressionOptions.map(option => {
            const isDisabled = option.level === 'strong'
            return (
              <div
                key={option.level}
                className={`border-2 rounded-lg p-3 sm:p-4 transition-all relative ${
                  isDisabled
                    ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 cursor-not-allowed opacity-75'
                    : compressionLevel === option.level
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer'
                }`}
                onClick={() => !isDisabled && setCompressionLevel(option.level)}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={compressionLevel === option.level}
                    onChange={() => !isDisabled && setCompressionLevel(option.level)}
                    disabled={isDisabled}
                    className="mr-2 flex-shrink-0"
                    id={`compression-${option.level}`}
                    name="compression-level"
                  />
                  <label htmlFor={`compression-${option.level}`} className={`font-medium text-sm sm:text-base cursor-pointer ${
                    isDisabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.name}
                    {isDisabled && (
                      <span className="ml-2 inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Coming Soon</span>
                    )}
                  </label>
                </div>
                <p className={`text-xs sm:text-sm mb-2 ${isDisabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {option.description}
                </p>
                <div className={`flex justify-between text-xs ${isDisabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  <span>{option.dpi}</span>
                  <span>{option.reduction}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <Dropzone
          onFilesAdded={handleFilesAdded}
          onFileRemove={handleFileRemove}
          uploadedFiles={uploadedFiles}
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={10}
          maxSize={100 * 1024 * 1024}
        />
        {uploadedFiles.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Compressing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Compress PDFs ({uploadedFiles.length})
                </>
              )}
            </button>
            
            {/* Progress Display */}
            {currentProgress && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {currentProgress.method === 'client-side' ? (
                      <Monitor className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                    ) : (
                      <Server className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentProgress.method === 'client-side' ? 'Client-Side Processing' : 'Server-Side Processing'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentProgress.progress}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentProgress.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>{currentProgress.message}</span>
                  {currentProgress.estimatedTime && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {currentProgress.estimatedTime}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {processedFiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Download className="h-4 w-4 mr-2" /> Compressed Files
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {processedFiles.map((file, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-all">
                      {file.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatFileSize(file.originalSize)} → {formatFileSize(file.compressedSize)}</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {file.compressionRatio.toFixed(1)}% reduction
                      </span>
                      <span className="flex items-center">
                        {file.method === 'client-side' ? (
                          <Monitor className="h-3 w-3 mr-1" />
                        ) : (
                          <Server className="h-3 w-3 mr-1" />
                        )}
                        {file.method}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = file.downloadUrl
                      link.download = file.name
                      link.click()
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center min-w-[120px]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {processedFiles.length > 1 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  const files = processedFiles.map(file => ({ url: file.downloadUrl, name: file.name }))
                  downloadFilesAsZip(files, 'compressed-pdfs.zip')
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Archive className="h-4 w-4 mr-2" />
                Download All as ZIP
              </button>
            </div>
          )}
        </div>
      )}

      {/* Feature Highlights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Archive className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Compression</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced algorithms reduce file size while preserving quality</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Process multiple PDFs instantly in your browser</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose from light, medium, or strong compression levels</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Download</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Download compressed PDFs immediately after processing</p>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to Use PDF Compress Tool</h2>
        
        {/* Step Icons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="relative">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">1</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload PDF Files</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop or click to select your PDF files</p>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-white" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">2</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Compression</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Select light, medium, or strong compression level</p>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">3</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Process Files</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Click compress to start the optimization process</p>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">4</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download Results</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Download your compressed PDF files instantly</p>
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Your PDF Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start by uploading your PDF files using the drag-and-drop area or by clicking to browse your files. You can upload up to 10 PDF files at once, with each file being up to 100MB in size.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Select Compression Level</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred compression level: Light (20% reduction, best quality), Medium (40% reduction, balanced), or Strong (60% reduction, maximum compression).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Start Compression Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the "Compress PDFs" button to begin the optimization process. All processing happens locally in your browser, ensuring your files remain private and secure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download Compressed Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Once compression is complete, download your optimized PDF files individually or as a ZIP archive. You'll see the compression ratio and file size reduction for each processed document.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Pro Tips for Better Compression</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Image-heavy PDFs typically achieve better compression ratios than text-only documents</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Use Medium compression for the best balance between file size and quality</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>All processing happens locally - your files never leave your device</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Batch process multiple files to save time and effort</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How much can I compress my PDF files?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Compression results vary by content type. Light compression typically reduces size by 20%, medium by 40%, and strong by up to 60%. Image-heavy PDFs compress more than text-only documents.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Will compression affect PDF quality?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Our smart compression algorithms are designed to maintain visual quality while reducing file size. Light compression preserves maximum quality, while stronger levels provide smaller files with minimal quality loss.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data secure during compression?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Absolutely! All PDF compression happens entirely in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security of your documents.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's the maximum file size I can compress?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              You can compress PDF files up to 100MB each, with a maximum of 10 files per batch. This ensures optimal performance and prevents browser memory issues.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I compress password-protected PDFs?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Currently, password-protected PDFs cannot be compressed. Please remove the password protection first, then compress the file and re-apply security if needed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Which compression level should I choose?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose Light for documents where quality is critical, Medium for general use with balanced size and quality, and Strong for maximum size reduction when quality is less important.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
