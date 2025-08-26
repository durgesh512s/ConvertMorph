'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Archive, Download, FileText, Zap, Settings } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'

const metadata: Metadata = {
  title: 'PDF Compress | DocMorph - Reduce PDF File Size',
  description: 'Compress PDF files to reduce their size while maintaining quality. Choose from Light, Medium, or Strong compression levels.',
  openGraph: {
    title: 'PDF Compress | DocMorph',
    description: 'Reduce PDF file size with our free online PDF compressor.',
    type: 'website',
  },
}

interface ProcessedFile {
  name: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  downloadUrl: string
}

export default function PDFCompressPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')

  const handleFilesAdded = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'success'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    setProcessedFiles([])
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleCompress = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    
    // Simulate compression process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const processed = uploadedFiles.map(uploadedFile => {
      const compressionRatios = {
        light: 0.8,
        medium: 0.6,
        strong: 0.4
      }
      
      const ratio = compressionRatios[compressionLevel]
      const compressedSize = Math.floor(uploadedFile.size * ratio)
      
      return {
        name: uploadedFile.name.replace('.pdf', '_compressed.pdf'),
        originalSize: uploadedFile.size,
        compressedSize,
        compressionRatio: Math.round((1 - ratio) * 100),
        downloadUrl: URL.createObjectURL(uploadedFile.file) // Placeholder
      }
    })
    
    setProcessedFiles(processed)
    setIsProcessing(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const compressionOptions = [
    {
      level: 'light' as const,
      name: 'Light Compression',
      description: 'Minimal compression, best quality',
      dpi: '150 DPI',
      reduction: '~20%'
    },
    {
      level: 'medium' as const,
      name: 'Medium Compression',
      description: 'Balanced compression and quality',
      dpi: '120 DPI',
      reduction: '~40%'
    },
    {
      level: 'strong' as const,
      name: 'Strong Compression',
      description: 'Maximum compression, smaller files',
      dpi: '96 DPI',
      reduction: '~60%'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Archive className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Compress
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Reduce PDF file size while maintaining quality. Choose your compression level and optimize your documents.
            </p>
          </div>

          {/* Compression Level Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Compression Level
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {compressionOptions.map((option) => (
                <div
                  key={option.level}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    compressionLevel === option.level
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setCompressionLevel(option.level)}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={compressionLevel === option.level}
                      onChange={() => setCompressionLevel(option.level)}
                      className="mr-2"
                    />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {option.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {option.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{option.dpi}</span>
                    <span>{option.reduction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={10}
              maxSize={25 * 1024 * 1024} // 25MB
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Compress PDFs ({uploadedFiles.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Compressed Files
              </h3>
              
              <div className="space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>Original: {formatFileSize(file.originalSize)}</span>
                            <span>→</span>
                            <span>Compressed: {formatFileSize(file.compressedSize)}</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              ({file.compressionRatio}% smaller)
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                    
                    {/* Compression Stats */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Compression Level:</span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">{compressionLevel}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600 dark:text-gray-300">Size Reduction:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatFileSize(file.originalSize - file.compressedSize)} saved
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => {
                    setUploadedFiles([])
                    setProcessedFiles([])
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Compress More Files
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Compression</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Compress multiple PDFs quickly with optimized algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Quality Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose compression level to balance file size and quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Compress up to 10 PDF files at once
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download compressed files immediately after processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
