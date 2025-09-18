'use client'

import { useState, useCallback, useEffect } from 'react'
import { FileText, Download, Image, Zap, Settings, AlertCircle } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { generateFileId, generateHistoryTimestamp } from '@/lib/id-utils'
import { PdfToImagesOptions } from '@/lib/validation/schemas'

interface ConvertedImage {
  name: string
  pageNumber: number
  blob: Blob
  dataUrl: string
  size: string
  width: number
  height: number
}

interface PDFPageImage {
  pageNumber: number
  canvas: HTMLCanvasElement
  blob: Blob
  dataUrl: string
  width: number
  height: number
}

interface PDFToImagesResult {
  images: PDFPageImage[]
  totalPages: number
  originalFileName: string
}

export default function PDFToImagesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processingMessage, setProcessingMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Settings
  const [imageFormat, setImageFormat] = useState<'png' | 'jpg'>('png')
  const [imageQuality, setImageQuality] = useState<number>(90)
  const [resolution, setResolution] = useState<number>(150)
  const [pageRange, setPageRange] = useState<string>('')
  const [extractMode, setExtractMode] = useState<'all' | 'range'>('all')

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFilesAdded = useCallback((files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: generateFileId(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'success'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    setConvertedImages([])
    setError(null)
    
    // Track file uploads
    files.forEach(file => {
      track('file_upload', {
        tool: 'pdf2img',
        sizeMb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        pages: 0 // Will be determined during processing
      })
    })
  }, [])

  const handleFileRemove = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setConvertedImages([])
    setError(null)
  }, [])

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    const jobId = newJobId('pdf2img')
    const startTime = generateHistoryTimestamp()
    setIsProcessing(true)
    setError(null)
    setProcessingProgress(0)
    setProcessingMessage('Initializing...')
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'pdf2img',
      fileCount: uploadedFiles.length,
      extractMode,
      imageFormat,
      resolution,
      imageQuality: imageFormat === 'jpg' ? imageQuality : undefined,
      pageRange: extractMode === 'range' ? pageRange : undefined
    })
    
    try {
      const file = uploadedFiles[0]?.file
      if (!file) {
        throw new Error('No file selected')
      }

      // Dynamic import to avoid SSR issues
      const { PDFToImagesProcessor } = await import('@/lib/pdf/pdfToImagesProcessor')

      // Create processor options
      const options: PdfToImagesOptions = {
        format: imageFormat,
        quality: imageQuality,
        dpi: resolution
      }

      const processor = new PDFToImagesProcessor(options)
      
      // Process the PDF
      const result: PDFToImagesResult = await processor.processFile(
        file,
        (progress: number, message: string) => {
          setProcessingProgress(progress)
          setProcessingMessage(message)
        },
        extractMode === 'range' ? pageRange : undefined
      )
      
      // Convert results to our format
      const convertedResults: ConvertedImage[] = result.images.map((image: PDFPageImage) => ({
        name: PDFToImagesProcessor.generateFileName(result.originalFileName, image.pageNumber, imageFormat),
        pageNumber: image.pageNumber,
        blob: image.blob,
        dataUrl: image.dataUrl,
        size: formatFileSize(image.blob.size),
        width: image.width,
        height: image.height
      }))
      
      const durationMs = generateHistoryTimestamp() - startTime
      const totalResultSize = convertedResults.reduce((sum, img) => sum + img.blob.size, 0)
      
      // Track successful conversion
      track('job_success', {
        jobId,
        tool: 'pdf2img',
        durationMs,
        resultSizeMb: Math.round(totalResultSize / (1024 * 1024) * 100) / 100,
        fileCount: uploadedFiles.length,
        extractedImages: convertedResults.length,
        totalPages: result.totalPages,
        extractMode,
        imageFormat,
        resolution
      })
      
      setConvertedImages(convertedResults)
      setProcessingProgress(100)
      setProcessingMessage('Conversion completed!')
    } catch (error) {
      console.error('Error converting PDF to images:', error)
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'pdf2img',
        code: 'conversion_failed',
        error: errorMessage
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadImage = async (image: ConvertedImage) => {
    try {
      const { PDFToImagesProcessor } = await import('@/lib/pdf/pdfToImagesProcessor')
      await PDFToImagesProcessor.downloadImage(image.blob, image.name)
      
      track('download', {
        tool: 'pdf2img',
        type: 'single_image',
        format: imageFormat,
        pageNumber: image.pageNumber
      })
    } catch (error) {
      console.error('Error downloading image:', error)
      setError('Failed to download image')
    }
  }

  const handleDownloadAll = async () => {
    if (convertedImages.length === 0) return
    
    try {
      const { PDFToImagesProcessor } = await import('@/lib/pdf/pdfToImagesProcessor')
      const images: PDFPageImage[] = convertedImages.map(img => ({
        pageNumber: img.pageNumber,
        canvas: document.createElement('canvas'), // Not used for download
        blob: img.blob,
        dataUrl: img.dataUrl,
        width: img.width,
        height: img.height
      }))
      
      const originalFileName = uploadedFiles[0]?.name || 'document.pdf'
      await PDFToImagesProcessor.downloadAllAsZip(images, originalFileName, imageFormat)
      
      track('download', {
        tool: 'pdf2img',
        type: 'zip_archive',
        format: imageFormat,
        imageCount: convertedImages.length
      })
    } catch (error) {
      console.error('Error downloading ZIP:', error)
      setError('Failed to create ZIP file')
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const resetTool = () => {
    setUploadedFiles([])
    setConvertedImages([])
    setError(null)
    setProcessingProgress(0)
    setProcessingMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <Download className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF to Images
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Extract pages from PDF as high-quality PNG or JPG image files. Choose format, quality, and specific page ranges. All processing happens in your browser for maximum privacy.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Conversion Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Conversion Settings
            </h2>
            
            {/* Extract Mode */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">Extract Mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    extractMode === 'all'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setExtractMode('all')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={extractMode === 'all'}
                      onChange={() => setExtractMode('all')}
                      className="mr-2"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      All Pages
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract all pages from the PDF as images
                  </p>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    extractMode === 'range'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setExtractMode('range')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={extractMode === 'range'}
                      onChange={() => setExtractMode('range')}
                      className="mr-2"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Page Range
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract specific pages (e.g., 1-3,5,7-9)
                  </p>
                </div>
              </div>
              
              {extractMode === 'range' && (
                <div className="mt-4">
                  <label htmlFor="pageRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Range
                  </label>
                  <input
                    type="text"
                    id="pageRange"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g., 1-3,5,7-9"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Use commas to separate pages/ranges. Example: 1-3,5,7-9 extracts pages 1, 2, 3, 5, 7, 8, 9
                  </p>
                </div>
              )}
            </div>

            {/* Image Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label htmlFor="imageFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Format
                </label>
                <select
                  id="imageFormat"
                  value={imageFormat}
                  onChange={(e) => setImageFormat(e.target.value as 'png' | 'jpg')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="png">PNG (Lossless)</option>
                  <option value="jpg">JPG (Smaller size)</option>
                </select>
              </div>

              <div>
                <label htmlFor="resolution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resolution (DPI)
                </label>
                <select
                  id="resolution"
                  value={resolution}
                  onChange={(e) => setResolution(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value={72}>72 DPI (Web)</option>
                  <option value={150}>150 DPI (Standard)</option>
                  <option value={300}>300 DPI (High Quality)</option>
                  <option value={600}>600 DPI (Print Quality)</option>
                </select>
              </div>

              {imageFormat === 'jpg' && (
                <div>
                  <label htmlFor="imageQuality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality ({imageQuality}%)
                  </label>
                  <input
                    type="range"
                    id="imageQuality"
                    min="10"
                    max="100"
                    step="5"
                    value={imageQuality}
                    onChange={(e) => setImageQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Smaller</span>
                    <span>Better Quality</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={1}
              maxSize={100 * 1024 * 1024} // 100MB
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      <span className="hidden sm:inline">Converting to Images...</span>
                      <span className="sm:hidden">Converting...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="hidden sm:inline">Convert to {imageFormat.toUpperCase()} Images</span>
                      <span className="sm:hidden">Convert to {imageFormat.toUpperCase()}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>{processingMessage}</span>
                  <span>{Math.round(processingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {convertedImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Extracted Images ({convertedImages.length})
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {convertedImages.map((image, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Image className="h-5 w-5 text-blue-500 mr-2" aria-label="Image file icon" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Page {image.pageNumber}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {image.size}
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-24 mb-3 flex items-center justify-center overflow-hidden">
                      {image.dataUrl && image.dataUrl.startsWith('data:image/') && image.dataUrl.length > 1000 ? (
                        <img
                          src={image.dataUrl}
                          alt={`Page ${image.pageNumber} preview`}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            console.error(`Failed to load preview for page ${image.pageNumber}:`, e);
                            // Hide the broken image and show fallback
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                          onLoad={() => {
                            console.log(`Successfully loaded preview for page ${image.pageNumber}`);
                          }}
                        />
                      ) : null}
                      <div 
                        className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                        style={{ display: image.dataUrl && image.dataUrl.startsWith('data:image/') && image.dataUrl.length > 1000 ? 'none' : 'flex' }}
                      >
                        <Image className="h-8 w-8 mb-2" />
                        <span className="text-xs">Preview</span>
                        <span className="text-xs">Page {image.pageNumber}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {image.name}
                    </p>
                    
                    <button
                      onClick={() => handleDownloadImage(image)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleDownloadAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span className="hidden sm:inline">Download All as ZIP</span>
                  <span className="sm:hidden">Download ZIP</span>
                </button>
                <button
                  onClick={resetTool}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Convert Another PDF</span>
                  <span className="sm:hidden">Convert Another</span>
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Image className="h-6 w-6 text-red-600 dark:text-red-400" aria-label="High-quality output icon" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">High-quality Output</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extract images at up to 600 DPI for print quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Export as PNG or JPG with custom quality settings
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Custom DPI Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose resolution from 72 to 600 DPI for any use case
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download all images individually or as a ZIP file
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-to-images" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-to-images" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
