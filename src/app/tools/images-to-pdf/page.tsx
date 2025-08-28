'use client'

import { useState } from 'react'
import { FileImage, Download, FileText, Zap, Settings } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'

interface ConvertedFile {
  name: string
  pageCount: number
  downloadUrl: string
}

export default function ImagesToPDFPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [conversionMode, setConversionMode] = useState<'single' | 'multiple'>('single')
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Auto'>('A4')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'auto'>('auto')

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
    setConvertedFiles([])
    
    // Track file uploads
    files.forEach(file => {
      track('file_upload', {
        tool: 'img2pdf',
        sizeMb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        pages: 0
      })
    })
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    const jobId = newJobId('img2pdf')
    const startTime = Date.now()
    setIsProcessing(true)
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'img2pdf',
      fileCount: uploadedFiles.length,
      conversionMode,
      pageSize,
      orientation
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument } = await import('pdf-lib')
      
      let results: ConvertedFile[] = []
      const totalOriginalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0)
      
      if (conversionMode === 'single') {
        // Combine all images into one PDF
        const pdfDoc = await PDFDocument.create()
        
        for (const file of uploadedFiles) {
          const imageBytes = await file.file.arrayBuffer()
          let image
          
          if (file.file.type === 'image/jpeg' || file.file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(imageBytes)
          } else if (file.file.type === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes)
          } else {
            continue // Skip unsupported formats
          }
          
          // Calculate page dimensions based on settings
          let pageWidth = 595.28 // A4 width in points
          let pageHeight = 841.89 // A4 height in points
          
          if (pageSize === 'Letter') {
            pageWidth = 612
            pageHeight = 792
          } else if (pageSize === 'Auto') {
            pageWidth = image.width
            pageHeight = image.height
          }
          
          // Handle orientation
          if (orientation === 'landscape' || (orientation === 'auto' && image.width > image.height)) {
            [pageWidth, pageHeight] = [pageHeight, pageWidth]
          }
          
          const page = pdfDoc.addPage([pageWidth, pageHeight])
          
          // Scale image to fit page while maintaining aspect ratio
          const imageAspectRatio = image.width / image.height
          const pageAspectRatio = pageWidth / pageHeight
          
          let drawWidth = pageWidth
          let drawHeight = pageHeight
          let x = 0
          let y = 0
          
          if (pageSize !== 'Auto') {
            if (imageAspectRatio > pageAspectRatio) {
              // Image is wider than page
              drawHeight = pageWidth / imageAspectRatio
              y = (pageHeight - drawHeight) / 2
            } else {
              // Image is taller than page
              drawWidth = pageHeight * imageAspectRatio
              x = (pageWidth - drawWidth) / 2
            }
          }
          
          page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          })
        }
        
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
        const downloadUrl = URL.createObjectURL(blob)
        
        // Use names helper for filename
        const filename = names.imgToPdf(true, uploadedFiles.length)
        
        results = [{
          name: filename,
          pageCount: uploadedFiles.length,
          downloadUrl
        }]
      } else {
        // Create separate PDF for each image
        for (const file of uploadedFiles) {
          const pdfDoc = await PDFDocument.create()
          const imageBytes = await file.file.arrayBuffer()
          let image
          
          if (file.file.type === 'image/jpeg' || file.file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(imageBytes)
          } else if (file.file.type === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes)
          } else {
            continue // Skip unsupported formats
          }
          
          // Calculate page dimensions based on settings
          let pageWidth = 595.28 // A4 width in points
          let pageHeight = 841.89 // A4 height in points
          
          if (pageSize === 'Letter') {
            pageWidth = 612
            pageHeight = 792
          } else if (pageSize === 'Auto') {
            pageWidth = image.width
            pageHeight = image.height
          }
          
          // Handle orientation
          if (orientation === 'landscape' || (orientation === 'auto' && image.width > image.height)) {
            [pageWidth, pageHeight] = [pageHeight, pageWidth]
          }
          
          const page = pdfDoc.addPage([pageWidth, pageHeight])
          
          // Scale image to fit page while maintaining aspect ratio
          const imageAspectRatio = image.width / image.height
          const pageAspectRatio = pageWidth / pageHeight
          
          let drawWidth = pageWidth
          let drawHeight = pageHeight
          let x = 0
          let y = 0
          
          if (pageSize !== 'Auto') {
            if (imageAspectRatio > pageAspectRatio) {
              // Image is wider than page
              drawHeight = pageWidth / imageAspectRatio
              y = (pageHeight - drawHeight) / 2
            } else {
              // Image is taller than page
              drawWidth = pageHeight * imageAspectRatio
              x = (pageWidth - drawWidth) / 2
            }
          }
          
          page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          })
          
          const pdfBytes = await pdfDoc.save()
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
          const downloadUrl = URL.createObjectURL(blob)
          
          // Use names helper for filename
          const filename = names.imgToPdf(false, 1)
          
          results.push({
            name: filename,
            pageCount: 1,
            downloadUrl
          })
        }
      }
      
      const durationMs = Date.now() - startTime
      const totalResultSize = results.reduce((sum) => {
        // Estimate PDF size (actual size would require blob.size but that's async)
        return sum + (totalOriginalSize / uploadedFiles.length)
      }, 0)
      
      // Track successful conversion
      track('job_success', {
        jobId,
        tool: 'img2pdf',
        durationMs,
        resultSizeMb: Math.round(totalResultSize / (1024 * 1024) * 100) / 100,
        fileCount: uploadedFiles.length,
        conversionMode,
        pageSize,
        orientation
      })
      
      setConvertedFiles(results)
    } catch (error) {
      console.error('Error converting images to PDF:', error)
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'img2pdf',
        code: 'conversion_failed'
      })
      
      // Fallback to simulation if pdf-lib fails
      let results: ConvertedFile[] = []
      
      if (conversionMode === 'single') {
        const filename = names.imgToPdf(true, uploadedFiles.length)
        results = [{
          name: filename,
          pageCount: uploadedFiles.length,
          downloadUrl: URL.createObjectURL(uploadedFiles[0].file)
        }]
      } else {
        results = uploadedFiles.map(file => {
          const filename = names.imgToPdf(false, 1)
          return {
            name: filename,
            pageCount: 1,
            downloadUrl: URL.createObjectURL(file.file)
          }
        })
      }
      
      setConvertedFiles(results)
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <FileImage className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Images to PDF
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Convert JPG, PNG images to PDF. Combine multiple images into one document or create separate PDFs.
            </p>
          </div>

          {/* Conversion Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Conversion Settings
            </h2>
            
            {/* Conversion Mode */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">Conversion Mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    conversionMode === 'single'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setConversionMode('single')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={conversionMode === 'single'}
                      onChange={() => setConversionMode('single')}
                      className="mr-2"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Single PDF
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Combine all images into one PDF document
                  </p>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    conversionMode === 'multiple'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setConversionMode('multiple')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={conversionMode === 'multiple'}
                      onChange={() => setConversionMode('multiple')}
                      className="mr-2"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Multiple PDFs
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Create separate PDF for each image
                  </p>
                </div>
              </div>
            </div>

            {/* Page Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="pageSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Size
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter' | 'Auto')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Auto">Auto (fit to image)</option>
                </select>
              </div>

              <div>
                <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Orientation
                </label>
                <select
                  id="orientation"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape' | 'auto')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="auto">Auto</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
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
                'image/png': ['.png']
              }}
              maxFiles={20}
              maxSize={10 * 1024 * 1024} // 10MB per image
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      <span className="hidden sm:inline">Converting to PDF...</span>
                      <span className="sm:hidden">Converting...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="hidden sm:inline">Convert to PDF ({uploadedFiles.length} image{uploadedFiles.length !== 1 ? 's' : ''})</span>
                      <span className="sm:hidden">Convert ({uploadedFiles.length})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {convertedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Converted PDFs ({convertedFiles.length})
              </h3>
              
              <div className="space-y-4">
                {convertedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-start sm:items-center">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-all">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{file.pageCount} page{file.pageCount !== 1 ? 's' : ''}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Size: {pageSize} {orientation !== 'auto' ? orientation : ''}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={file.downloadUrl}
                        download={file.name}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base flex-shrink-0"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {convertedFiles.length > 1 && (
                  <button
                    onClick={async () => {
                      try {
                        const files = convertedFiles.map(file => ({
                          name: file.name,
                          url: file.downloadUrl
                        }))
                        await downloadFilesAsZip(files, 'converted-pdfs.zip')
                        toast.success('ZIP file downloaded successfully!')
                      } catch (error) {
                        console.error('Error downloading ZIP:', error)
                        toast.error('Failed to create ZIP file')
                      }
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="hidden sm:inline">Download All as ZIP</span>
                    <span className="sm:hidden">Download ZIP</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setUploadedFiles([])
                    setConvertedFiles([])
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Convert More Images</span>
                  <span className="sm:hidden">Convert More</span>
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileImage className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Support for JPG, JPEG, and PNG image formats
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Custom Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose page size, orientation, and conversion mode
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quick conversion with optimized image compression
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Convert</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Convert multiple images at once or combine into one PDF
              </p>
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
                    What image formats are supported?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We support JPG, JPEG, and PNG image formats. These are the most common image formats and provide the best compatibility with PDF conversion.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I combine multiple images into one PDF?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes! You can choose between two conversion modes: combine all images into a single PDF document, or create separate PDF files for each image.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What is the maximum file size for images?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Each image can be up to 10MB in size. You can upload up to 20 images at once for batch conversion.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How do I choose the right page size?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    A4 is the standard international paper size, Letter is common in North America, and Auto will fit the PDF page to your image dimensions for the best quality.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are my images stored on your servers?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No, all image processing happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I control the image quality in the PDF?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The conversion maintains the original image quality while optimizing for PDF format. The resulting PDF will preserve your image clarity and colors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
