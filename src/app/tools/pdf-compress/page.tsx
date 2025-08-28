'use client'

import { useState } from 'react'
import { Archive, Download, FileText, Zap, Settings } from 'lucide-react'
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
}

// Helper function for fetch with progress tracking
async function fetchWithProgress(
  input: RequestInfo, 
  init: RequestInit, 
  onProgress: (pct: number, speed?: string) => void,
  fileSize: number
) {
  const startTime = Date.now()
  
  // Start from 0%
  onProgress(0, 'Starting upload...')
  
  // Smooth continuous progress simulation
  const simulateSmoothProgress = () => {
    let progress = 0
    let phase = 'uploading'
    let phaseStartTime = Date.now()
    
    const progressInterval = setInterval(() => {
      const now = Date.now()
      const totalElapsed = (now - startTime) / 1000
      const phaseElapsed = (now - phaseStartTime) / 1000
      
      if (phase === 'uploading' && progress < 25) {
        // Upload phase: 0-25% (2-4 seconds)
        const uploadDuration = Math.max(2, Math.min(4, fileSize / (1024 * 1024))) // 1-4 seconds based on size
        const uploadProgress = Math.min(25, (phaseElapsed / uploadDuration) * 25)
        progress = uploadProgress
        
        const uploadedBytes = (progress / 25) * fileSize
        const speed = totalElapsed > 0 ? `${(uploadedBytes / totalElapsed / 1024).toFixed(1)} KB/s` : '0.0 KB/s'
        
        onProgress(Math.round(progress), `Uploading... ${speed}`)
        
        if (progress >= 24.5) {
          phase = 'processing'
          phaseStartTime = now
        }
      } else if (phase === 'processing' && progress < 90) {
        // Processing phase: 25-90% (most of the time)
        const processingDuration = Math.max(8, fileSize / (1024 * 1024) * 3) // 3 seconds per MB minimum
        const processingProgress = Math.min(65, (phaseElapsed / processingDuration) * 65)
        progress = 25 + processingProgress
        
        onProgress(Math.round(progress), 'Processing on server...')
        
        if (progress >= 89.5) {
          phase = 'finalizing'
          phaseStartTime = now
        }
      } else if (phase === 'finalizing' && progress < 95) {
        // Finalizing phase: 90-95% (1-2 seconds)
        const finalizingProgress = Math.min(5, (phaseElapsed / 1.5) * 5)
        progress = 90 + finalizingProgress
        
        onProgress(Math.round(progress), 'Finalizing compression...')
      }
    }, 150) // Update every 150ms for very smooth progress
    
    return progressInterval
  }
  
  const progressInterval = simulateSmoothProgress()
  
  try {
    const res = await fetch(input, init)
    
    if (!res.ok) {
      clearInterval(progressInterval)
      throw new Error(await res.text().catch(() => 'Request failed'))
    }
    
    // Smoothly transition to download phase
    onProgress(96, 'Downloading result...')
    
    const total = Number(res.headers.get('Content-Length') || 0)
    if (!res.body || !('getReader' in res.body)) {
      // Smooth transition to completion
      setTimeout(() => onProgress(98, 'Almost done...'), 100)
      const blob = await res.blob()
      clearInterval(progressInterval)
      onProgress(100, 'Complete')
      return { res, blob }
    }
    
    const reader = res.body.getReader()
    const chunks: Uint8Array[] = []
    let received = 0
    
    // Track download progress (96-100%)
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      if (value) {
        chunks.push(value)
        received += value.length
        
        if (total > 0) {
          const downloadProgress = Math.round((received / total) * 100)
          const overallProgress = 96 + (downloadProgress * 0.04) // 96-100%
          onProgress(Math.min(100, overallProgress), 'Downloading...')
        } else {
          // Smooth progress even without content-length
          const estimatedProgress = 96 + Math.min(4, (received / (1024 * 1024)) * 2) // Estimate based on received data
          onProgress(Math.round(estimatedProgress), 'Downloading...')
        }
      }
    }
    
    const blob = new Blob(chunks as BlobPart[], { type: res.headers.get('Content-Type') || 'application/pdf' })
    clearInterval(progressInterval)
    onProgress(100, 'Complete')
    return { res, blob }
  } catch (error) {
    clearInterval(progressInterval)
    throw error
  }
}

export default function PDFCompressPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'strong'>('medium')
  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null)
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({}) // 0..100
  const [fileSpeed, setFileSpeed] = useState<Record<string, string>>({}) // speed info

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

  // Helper function to revoke processed URLs
  const revokeProcessedUrls = (files: ProcessedFile[]) => {
    files.forEach(f => {
      try { URL.revokeObjectURL(f.downloadUrl) } catch {}
    })
  }

  const clearAll = () => {
    revokeProcessedUrls(processedFiles)
    setUploadedFiles([])
    setProcessedFiles([])
    setFileProgress({})
    setFileSpeed({})
  }

  const handleCompress = async () => {
    if (uploadedFiles.length === 0) return

    const ctrl = new AbortController()
    setAbortCtrl(ctrl)
    setIsProcessing(true)
    setProcessedFiles([])
    setFileProgress({})
    setFileSpeed({})

    const concurrency = 3
    let idx = 0
    const results: ProcessedFile[] = []
    const inFlight: Promise<void>[] = []

    const runOne = async (uf: UploadedFile) => {
      const fileId = uf.id
      const onProgress = (pct: number, speed?: string) => {
        setFileProgress(prev => ({ ...prev, [fileId]: pct }))
        if (speed) {
          setFileSpeed(prev => ({ ...prev, [fileId]: speed }))
        }
      }

      // Start with immediate progress feedback
      onProgress(0, '0.0 KB/s')

      const fd = new FormData()
      const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')
      fd.append('file', new File([uf.file], safeName, { type: uf.file.type || 'application/pdf' }))
      fd.append('level', compressionLevel)

      try {
        const { res, blob } = await fetchWithProgress('/api/compress', { method: 'POST', body: fd, signal: ctrl.signal }, onProgress, uf.file.size)

        const ct = res.headers.get('Content-Type') || ''
        if (!ct.toLowerCase().includes('pdf')) throw new Error('Server did not return a PDF')

        const originalSize = parseInt(res.headers.get('X-Original-Bytes') || String(uf.size), 10)
        const compressedSize = blob.size
        const compressionRatio = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))

        const url = URL.createObjectURL(blob)
        results.push({
          name: names.compress(safeName, compressionLevel),
          originalSize,
          compressedSize,
          compressionRatio,
          downloadUrl: url,
        })
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'name' in e && e.name === 'AbortError') return
        console.error('Compression error:', e)
        toast.error(`Failed to compress ${safeName}`)
        results.push({
          name: names.compress(safeName, compressionLevel),
          originalSize: uf.size,
          compressedSize: uf.size,
          compressionRatio: 0,
          downloadUrl: URL.createObjectURL(uf.file),
        })
      } finally {
        onProgress(100)
      }
    }

    const queueNext = () => {
      if (idx >= uploadedFiles.length) return
      const uf = uploadedFiles[idx++]
      const p = runOne(uf).then(() => queueNext())
      inFlight.push(p)
    }

    for (let i = 0; i < Math.min(concurrency, uploadedFiles.length); i++) queueNext()

    try {
      await Promise.allSettled(inFlight)
      if (!ctrl.signal.aborted) setProcessedFiles(results)
    } finally {
      setIsProcessing(false)
      setAbortCtrl(null)
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
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Archive className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Compress
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Reduce PDF file size while maintaining quality. Choose your compression level and optimize your documents.
            </p>
          </div>

          {/* AD SLOT: Hero Banner - 728x90 or 320x50 mobile */}
          <div className="mb-6 sm:mb-8" style={{ minHeight: '50px' }}>
            {/* Future ad placement - reserved space to prevent CLS */}
          </div>

          {/* Compression Level Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Compression Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {compressionOptions.map((option) => (
                <div
                  key={option.level}
                  className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
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
                      className="mr-2 flex-shrink-0"
                    />
                    <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      {option.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={10}
              maxSize={100 * 1024 * 1024} // 100MB
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Compress PDFs ({uploadedFiles.length})
                    </>
                  )}
                </button>
                
                {/* Cancel Button */}
                {isProcessing && (
                  <button
                    onClick={() => { abortCtrl?.abort(); toast.message('Cancelling…') }}
                    className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Progress Section - Show during compression */}
          {isProcessing && uploadedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Compressing Files...
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                      <div className="flex items-center min-w-0 flex-1">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">{file.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Size: {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {fileProgress[file.id] !== undefined ? `${fileProgress[file.id]}%` : 'Waiting...'}
                        </div>
                        {fileSpeed[file.id] && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {fileSpeed[file.id]}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2 overflow-hidden">
                      <div
                        className="h-2 bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                        style={{ width: `${fileProgress[file.id] || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AD SLOT: Results Banner - 728x90 or 320x50 mobile */}
          {processedFiles.length > 0 && (
            <div className="mb-6 sm:mb-8" style={{ minHeight: '50px' }}>
              {/* Future ad placement - reserved space to prevent CLS */}
            </div>
          )}

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Compressed Files
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-3 sm:space-y-0">
                      <div className="flex items-start min-w-0 flex-1">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white break-words">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 space-y-1 sm:space-y-0">
                            <span>Original: {formatFileSize(file.originalSize)}</span>
                            <span className="hidden sm:inline">→</span>
                            <span>Compressed: {formatFileSize(file.compressedSize)}</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              ({file.compressionRatio}% smaller)
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={file.downloadUrl}
                        download={file.name}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base flex-shrink-0"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Download
                      </a>
                    </div>
                    
                    {/* Progress Bar */}
                    {isProcessing && fileProgress[uploadedFiles[index]?.id || ''] !== undefined && (
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2 mt-3 overflow-hidden">
                        <div
                          className="h-2 bg-green-500 dark:bg-green-400 transition-all"
                          style={{ width: `${fileProgress[uploadedFiles[index]?.id || ''] || 0}%` }}
                        />
                      </div>
                    )}
                    
                    {/* Compression Stats */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-3">
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
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 space-y-4">
                {processedFiles.length > 1 && (
                  <button
                    onClick={async () => {
                      try {
                        const files = processedFiles.map(file => ({
                          name: file.name,
                          url: file.downloadUrl
                        }))
                        await downloadFilesAsZip(files, 'compressed-pdfs.zip')
                        toast.success('ZIP file downloaded successfully!')
                      } catch (error) {
                        console.error('Error downloading ZIP:', error)
                        toast.error('Failed to create ZIP file')
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All as ZIP
                  </button>
                )}
                <button
                  onClick={clearAll}
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

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    What compression levels are available?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We offer three compression levels: Light (150 DPI, ~20% reduction), Medium (120 DPI, ~40% reduction), and Strong (96 DPI, ~60% reduction). Choose based on your quality and file size requirements.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    How many files can I compress at once?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can compress up to 10 PDF files simultaneously. Each file can be up to 100MB in size for optimal processing speed.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Will compression affect PDF quality?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Compression reduces file size by optimizing images and removing unnecessary data. Light compression maintains high quality, while stronger compression provides smaller files with some quality trade-off.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    How much can I reduce file size?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    File size reduction varies based on content and compression level. Image-heavy PDFs typically see 20-60% reduction, while text-only documents may have smaller reductions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Are my files secure during compression?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, all files are processed securely and temporarily. Files are automatically deleted from our servers after processing, and we don&quot;t store or access your document content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Can I download all compressed files at once?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, when compressing multiple files, you can download them individually or use the &quot;Download All as ZIP&quot; option to get all compressed PDFs in a single archive.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-compress" />
        </div>
      </div>
    </div>
  )
}
