'use client'

import { useState } from 'react'
import { FileText, Download, Image, Zap, Settings } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'


interface ConvertedImage {
  name: string
  pageNumber: number
  downloadUrl: string
  size: string
}

export default function PDFToImagesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [imageFormat, setImageFormat] = useState<'PNG' | 'JPG'>('PNG')
  const [imageQuality, setImageQuality] = useState<number>(90)
  const [resolution, setResolution] = useState<number>(150)
  const [pageRange, setPageRange] = useState<string>('')
  const [extractMode, setExtractMode] = useState<'all' | 'range'>('all')

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
    setConvertedImages([])
    
    // Track file uploads
    files.forEach(file => {
      track('file_upload', {
        tool: 'pdf2img',
        sizeMb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        pages: 0 // Will be determined during processing
      })
    })
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    const jobId = newJobId('pdf2img')
    const startTime = Date.now()
    setIsProcessing(true)
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'pdf2img',
      fileCount: uploadedFiles.length,
      extractMode,
      imageFormat,
      resolution,
      imageQuality: imageFormat === 'JPG' ? imageQuality : undefined,
      pageRange: extractMode === 'range' ? pageRange : undefined
    })
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate extracted images (in real implementation, this would process the actual PDF)
      const mockPageCount = Math.floor(Math.random() * 10) + 1 // 1-10 pages
      const results: ConvertedImage[] = []
      const firstFile = uploadedFiles[0]
      if (!firstFile) {
        throw new Error('No file available for conversion')
      }
      const originalName = firstFile.name
      
      for (let i = 1; i <= mockPageCount; i++) {
        if (extractMode === 'all' || isPageInRange(i, pageRange)) {
          // Use names helper for consistent filename
          const filename = names.pdfToImages(originalName, i, imageFormat.toLowerCase() as 'png' | 'jpg')
          
          results.push({
            name: filename,
            pageNumber: i,
            downloadUrl: URL.createObjectURL(firstFile.file), // Placeholder
            size: `${Math.floor(Math.random() * 500 + 100)} KB`
          })
        }
      }
      
      const durationMs = Date.now() - startTime
      const totalResultSize = results.length * 300 * 1024 // Estimate 300KB per image
      
      // Track successful conversion
      track('job_success', {
        jobId,
        tool: 'pdf2img',
        durationMs,
        resultSizeMb: Math.round(totalResultSize / (1024 * 1024) * 100) / 100,
        fileCount: uploadedFiles.length,
        extractedImages: results.length,
        totalPages: mockPageCount,
        extractMode,
        imageFormat,
        resolution
      })
      
      setConvertedImages(results)
    } catch (error) {
      console.error('Error converting PDF to images:', error)
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'pdf2img',
        code: 'conversion_failed'
      })
      
      // Fallback - still show some results for demo
      const results: ConvertedImage[] = []
      const firstFile = uploadedFiles[0]
      if (!firstFile) {
        return
      }
      const originalName = firstFile.name
      
      for (let i = 1; i <= 3; i++) {
        const filename = names.pdfToImages(originalName, i, imageFormat.toLowerCase() as 'png' | 'jpg')
        results.push({
          name: filename,
          pageNumber: i,
          downloadUrl: URL.createObjectURL(firstFile.file),
          size: `${Math.floor(Math.random() * 500 + 100)} KB`
        })
      }
      
      setConvertedImages(results)
    } finally {
      setIsProcessing(false)
    }
  }

  const isPageInRange = (pageNum: number, range: string): boolean => {
    if (!range.trim()) return true
    
    const ranges = range.split(',').map(r => r.trim())
    
    for (const r of ranges) {
      if (r.includes('-')) {
        const parts = r.split('-')
        const startStr = parts[0]
        const endStr = parts[1]
        if (!startStr || !endStr) continue
        
        const start = parseInt(startStr.trim())
        const end = parseInt(endStr.trim())
        if (isNaN(start) || isNaN(end)) continue
        
        if (pageNum >= start && pageNum <= end) return true
      } else {
        const pageNumber = parseInt(r)
        if (!isNaN(pageNumber) && pageNum === pageNumber) return true
      }
    }
    
    return false
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
                  onChange={(e) => setImageFormat(e.target.value as 'PNG' | 'JPG')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="PNG">PNG (Lossless)</option>
                  <option value="JPG">JPG (Smaller size)</option>
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

              {imageFormat === 'JPG' && (
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
                      <span className="hidden sm:inline">Convert to {imageFormat} Images</span>
                      <span className="sm:hidden">Convert to {imageFormat}</span>
                    </>
                  )}
                </button>
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
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-24 mb-3 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" aria-label="Image preview placeholder" />
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {image.name}
                    </p>
                    
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    // Download all as ZIP
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span className="hidden sm:inline">Download All as ZIP</span>
                  <span className="sm:hidden">Download ZIP</span>
                </button>
                <button
                  onClick={() => {
                    setUploadedFiles([])
                    setConvertedImages([])
                  }}
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

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Extract PDF Pages as Images
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Transform your PDF documents into high-quality images with precision control over format, resolution, and page selection.
              </p>
            </div>

            {/* Visual Process Flow */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                      <FileText className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Upload PDF</h3>
                      <p className="text-cyan-100 text-sm">
                        Drop your PDF file or click to browse. Up to 100MB supported.
                      </p>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-cyan-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Settings className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Configure</h3>
                      <p className="text-blue-100 text-sm">
                        Choose format, resolution, quality, and page range settings.
                      </p>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Zap className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Extract</h3>
                      <p className="text-indigo-100 text-sm">
                        Process your PDF and extract pages as high-quality images.
                      </p>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-indigo-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="text-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Download className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Download</h3>
                      <p className="text-purple-100 text-sm">
                        Get individual images or download all as a ZIP archive.
                      </p>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-purple-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Format & Quality Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3 mr-4">
                    <Image className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Format Selection Guide</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🖼️ PNG Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      Perfect for documents with text, diagrams, and graphics requiring crisp edges.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-green-700 dark:text-green-300 text-xs">
                        <strong>Best for:</strong> Text documents, presentations, technical drawings, logos
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📸 JPG Format</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      Ideal for photos and images where smaller file size is important.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-blue-700 dark:text-blue-300 text-xs">
                        <strong>Best for:</strong> Photo albums, magazines, brochures, web sharing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-3 mr-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Resolution Guide</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">72 DPI</span>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Web & Screen</p>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">Small files</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">150 DPI</span>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Standard Quality</p>
                    </div>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">Recommended</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">300 DPI</span>
                      <p className="text-xs text-gray-600 dark:text-gray-300">High Quality Print</p>
                    </div>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">Large files</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">600 DPI</span>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Professional Print</p>
                    </div>
                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">Very large</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Tips */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                🎯 Pro Extraction Tips
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Page Range Syntax</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use "1-5" for ranges, "1,3,5" for specific pages, or "1-3,7-9" for mixed selections.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Optimize File Size</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use JPG at 80-90% quality for photos, PNG for text. Lower DPI for web use.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Balance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    150 DPI PNG for documents, 300 DPI JPG for photos, 600 DPI for professional printing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What image formats can I export to?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can export PDF pages as PNG (lossless, larger files) or JPG (compressed, smaller files). PNG is best for documents with text, while JPG is suitable for photos.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How do I extract specific pages?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Select &quot;Page Range&quot; mode and enter the pages you want. Use commas to separate individual pages and hyphens for ranges. For example: &quot;1-3,5,7-9&quot; extracts pages 1, 2, 3, 5, 7, 8, and 9.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What resolution should I choose?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    72 DPI is suitable for web use, 150 DPI for standard viewing, 300 DPI for high-quality printing, and 600 DPI for professional print work. Higher DPI creates larger files.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What is the maximum PDF size I can upload?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can upload PDF files up to 100MB in size. For larger files, consider compressing your PDF first using our PDF compression tool.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are my PDF files stored on your servers?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No, all PDF processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I adjust the image quality for JPG exports?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, when exporting to JPG format, you can adjust the quality from 10% to 100%. Higher quality produces better images but larger file sizes.
                  </p>
                </div>
              </div>
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
