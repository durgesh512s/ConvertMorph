'use client'

import { useState } from 'react'
import { Archive, Download, FileText, Zap, Settings, AlertCircle } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
// Dynamic import for client-side only PDF compression

interface ProcessedFile {
  name: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  downloadUrl: string
}

export default function PDFCompressPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')
  const [isProcessing, setIsProcessing] = useState(false)

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
      return { id: Math.random().toString(36).slice(2, 11), file, name: file.name, size: file.size, type: file.type, status: 'success' } as UploadedFile
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

    try {
      const results: ProcessedFile[] = []

      // Dynamically import the PDF compressor to avoid SSR issues
      const { compressPDF } = await import('@/lib/pdfClientCompressor')

      for (const uf of uploadedFiles) {
        try {
          const result = await compressPDF(uf.file, compressionLevel as 'light' | 'medium')
          const url = URL.createObjectURL(result.blob)
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')

          results.push({
            name: names.compress(safeName, compressionLevel),
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            compressionRatio: result.ratio,
            downloadUrl: url,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

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
              </div>
            )}
          </div>

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="h-4 w-4 mr-2" /> Compressed Files
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex items-start min-w-0 flex-1">
                        <FileText className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white break-words">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Original: {formatFileSize(file.originalSize)}</span>
                            <span>Compressed: {formatFileSize(file.compressedSize)}</span>
                            <span className="text-green-600 dark:text-green-400">({file.compressionRatio}% smaller)</span>
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
                    await downloadFilesAsZip(files, 'compressed-pdfs.zip')
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

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-compress" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-compress" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
