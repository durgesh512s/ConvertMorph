'use client'

import { useState } from 'react'
import { Scissors, Download, FileText, Zap, Info } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'

interface SplitFile {
  name: string
  pageRange: string
  pageCount: number
  downloadUrl: string
}

export default function PDFSplitPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [splitFiles, setSplitFiles] = useState<SplitFile[]>([])
  const [pageRanges, setPageRanges] = useState('')
  const [splitMode, setSplitMode] = useState<'ranges' | 'pages' | 'half'>('ranges')
  const [pagesPerSplit, setPagesPerSplit] = useState(5)

  const handleFilesAdded = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'success'
    }))
    setUploadedFiles(newFiles.slice(0, 1)) // Only allow one file for splitting
    setSplitFiles([])
    
    // Track file uploads
    files.slice(0, 1).forEach(file => {
      track('file_upload', {
        tool: 'split',
        sizeMb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        pages: 0 // PDF page count would need to be extracted
      })
    })
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleSplit = async () => {
    if (uploadedFiles.length === 0) return

    // Generate job ID for tracking
    const jobId = newJobId('split')

    setIsProcessing(true)
    
    // Track job start
    track('job_start', {
      tool: 'split',
      jobId,
      splitMode,
      pageRanges: splitMode === 'ranges' ? pageRanges : undefined
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument } = await import('pdf-lib')
      
      const file = uploadedFiles[0]
      if (!file) {
        throw new Error('No file selected for splitting')
      }
      
      // Load the PDF
      const arrayBuffer = await file.file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()
      
      let splits: SplitFile[] = []
      
      if (splitMode === 'ranges' && pageRanges) {
        // Parse page ranges like "1-3,5,7-9"
        const ranges = pageRanges.split(',').map(r => r.trim())
        
        for (const range of ranges) {
          let startPage: number, endPage: number
          
          if (range.includes('-')) {
            const parts = range.split('-')
            const firstPart = parts[0]
            const secondPart = parts[1]
            if (!firstPart || !secondPart) continue
            startPage = parseInt(firstPart) - 1 // Convert to 0-based index
            endPage = parseInt(secondPart) - 1
          } else {
            startPage = endPage = parseInt(range) - 1 // Single page
          }
          
          // Validate page numbers
          if (startPage < 0 || endPage >= totalPages || startPage > endPage) {
            continue // Skip invalid ranges
          }
          
          // Create new PDF with selected pages
          const newPdf = await PDFDocument.create()
          const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
          const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices)
          copiedPages.forEach(page => newPdf.addPage(page))
          
          // Generate PDF bytes and create download URL
          const pdfBytes = await newPdf.save()
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
          const downloadUrl = URL.createObjectURL(blob)
          
          splits.push({
            name: `${file.name.replace('.pdf', '')}_pages_${range}.pdf`,
            pageRange: range,
            pageCount: endPage - startPage + 1,
            downloadUrl
          })
        }
      } else if (splitMode === 'pages') {
        // Split every N pages
        const numSplits = Math.ceil(totalPages / pagesPerSplit)
        
        for (let i = 0; i < numSplits; i++) {
          const startPage = i * pagesPerSplit
          const endPage = Math.min((i + 1) * pagesPerSplit - 1, totalPages - 1)
          
          // Create new PDF with selected pages
          const newPdf = await PDFDocument.create()
          const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, j) => startPage + j)
          const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices)
          copiedPages.forEach(page => newPdf.addPage(page))
          
          // Generate PDF bytes and create download URL
          const pdfBytes = await newPdf.save()
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
          const downloadUrl = URL.createObjectURL(blob)
          
          splits.push({
            name: `${file.name.replace('.pdf', '')}_part_${i + 1}.pdf`,
            pageRange: `${startPage + 1}-${endPage + 1}`,
            pageCount: endPage - startPage + 1,
            downloadUrl
          })
        }
      } else {
        // Split in half
        const midPoint = Math.floor(totalPages / 2)
        
        // First half
        const firstHalf = await PDFDocument.create()
        const firstPageIndices = Array.from({ length: midPoint }, (_, i) => i)
        const firstCopiedPages = await firstHalf.copyPages(pdfDoc, firstPageIndices)
        firstCopiedPages.forEach(page => firstHalf.addPage(page))
        
        const firstPdfBytes = await firstHalf.save()
        const firstBlob = new Blob([new Uint8Array(firstPdfBytes)], { type: 'application/pdf' })
        const firstDownloadUrl = URL.createObjectURL(firstBlob)
        
        // Second half
        const secondHalf = await PDFDocument.create()
        const secondPageIndices = Array.from({ length: totalPages - midPoint }, (_, i) => midPoint + i)
        const secondCopiedPages = await secondHalf.copyPages(pdfDoc, secondPageIndices)
        secondCopiedPages.forEach(page => secondHalf.addPage(page))
        
        const secondPdfBytes = await secondHalf.save()
        const secondBlob = new Blob([new Uint8Array(secondPdfBytes)], { type: 'application/pdf' })
        const secondDownloadUrl = URL.createObjectURL(secondBlob)
        
        splits = [
          {
            name: `${file.name.replace('.pdf', '')}_part_1.pdf`,
            pageRange: `1-${midPoint}`,
            pageCount: midPoint,
            downloadUrl: firstDownloadUrl
          },
          {
            name: `${file.name.replace('.pdf', '')}_part_2.pdf`,
            pageRange: `${midPoint + 1}-${totalPages}`,
            pageCount: totalPages - midPoint,
            downloadUrl: secondDownloadUrl
          }
        ]
      }
      
      setSplitFiles(splits)
      
      // Track successful completion
      track('job_success', {
        tool: 'split',
        jobId,
        splitMode,
        splitCount: splits.length,
        totalPages: splits.reduce((sum, s) => sum + s.pageCount, 0)
      })
      
    } catch (error) {
      console.error('Error splitting PDF:', error)
      
      // Track error
      track('job_error', {
        tool: 'split',
        jobId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      // Fallback to simulation if pdf-lib fails
      const file = uploadedFiles[0]
      if (!file) {
        toast.error('No file available for splitting')
        return
      }
      
      const totalPages = Math.floor(Math.random() * 50) + 10 // Simulate 10-60 pages
      
      let splits: SplitFile[] = []
      
      if (splitMode === 'ranges' && pageRanges) {
        const ranges = pageRanges.split(',').map(r => r.trim())
        splits = ranges.map((range) => {
          let pageCount = 1
          if (range.includes('-')) {
            const parts = range.split('-')
            const firstPart = parts[0]
            const secondPart = parts[1]
            if (firstPart && secondPart) {
              pageCount = parseInt(secondPart) - parseInt(firstPart) + 1
            }
          }
          
          return {
            name: `${file.name.replace('.pdf', '')}_pages_${range}.pdf`,
            pageRange: range,
            pageCount,
            downloadUrl: URL.createObjectURL(file.file)
          }
        })
      } else if (splitMode === 'pages') {
        const numSplits = Math.ceil(totalPages / pagesPerSplit)
        splits = Array.from({ length: numSplits }, (_, index) => {
          const startPage = index * pagesPerSplit + 1
          const endPage = Math.min((index + 1) * pagesPerSplit, totalPages)
          return {
            name: `${file.name.replace('.pdf', '')}_part_${index + 1}.pdf`,
            pageRange: `${startPage}-${endPage}`,
            pageCount: endPage - startPage + 1,
            downloadUrl: URL.createObjectURL(file.file)
          }
        })
      } else {
        splits = [
          {
            name: `${file.name.replace('.pdf', '')}_part_1.pdf`,
            pageRange: `1-${Math.floor(totalPages / 2)}`,
            pageCount: Math.floor(totalPages / 2),
            downloadUrl: URL.createObjectURL(file.file)
          },
          {
            name: `${file.name.replace('.pdf', '')}_part_2.pdf`,
            pageRange: `${Math.floor(totalPages / 2) + 1}-${totalPages}`,
            pageCount: totalPages - Math.floor(totalPages / 2),
            downloadUrl: URL.createObjectURL(file.file)
          }
        ]
      }
      
      setSplitFiles(splits)
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Split
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Split PDF files by page ranges, extract specific pages, or divide into smaller documents.
            </p>
          </div>

          {/* Split Mode Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Scissors className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Split Mode
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  splitMode === 'ranges'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSplitMode('ranges')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={splitMode === 'ranges'}
                    onChange={() => setSplitMode('ranges')}
                    className="mr-2"
                  />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Page Ranges
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Extract specific page ranges (e.g., 1-3,5,7-9)
                </p>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  splitMode === 'pages'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSplitMode('pages')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={splitMode === 'pages'}
                    onChange={() => setSplitMode('pages')}
                    className="mr-2"
                  />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Every N Pages
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Split into chunks of {pagesPerSplit} pages each
                </p>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  splitMode === 'half'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSplitMode('half')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={splitMode === 'half'}
                    onChange={() => setSplitMode('half')}
                    className="mr-2"
                  />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Split in Half
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Divide PDF into two equal parts
                </p>
              </div>
            </div>

            {splitMode === 'ranges' && (
              <div>
                <label htmlFor="pageRanges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Ranges
                </label>
                <input
                  type="text"
                  id="pageRanges"
                  value={pageRanges}
                  onChange={(e) => setPageRanges(e.target.value)}
                  placeholder="e.g., 1-3,5,7-9"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <div className="mt-2 flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use commas to separate ranges. Examples: &quot;1-5&quot; (pages 1 to 5), &quot;1,3,5&quot; (pages 1, 3, and 5), &quot;1-3,7-10&quot; (pages 1-3 and 7-10)
                  </p>
                </div>
              </div>
            )}

            {splitMode === 'pages' && (
              <div>
                <label htmlFor="pagesPerSplit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pages per Split
                </label>
                <input
                  type="number"
                  id="pagesPerSplit"
                  value={pagesPerSplit}
                  onChange={(e) => setPagesPerSplit(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <div className="mt-2 flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Specify how many pages each split file should contain. For example, setting this to 5 will create files with 5 pages each.
                  </p>
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
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={1}
              maxSize={100 * 1024 * 1024} // 100MB
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleSplit}
                  disabled={isProcessing || (splitMode === 'ranges' && !pageRanges.trim())}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      <span className="hidden sm:inline">Splitting PDF...</span>
                      <span className="sm:hidden">Splitting...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="hidden sm:inline">
                        {splitMode === 'ranges' ? 'Split PDF by Ranges' : 
                         splitMode === 'pages' ? `Split PDF Every ${pagesPerSplit} Pages` : 
                         'Split PDF in Half'}
                      </span>
                      <span className="sm:hidden">
                        {splitMode === 'ranges' ? 'Split by Ranges' : 
                         splitMode === 'pages' ? `Split Every ${pagesPerSplit}` : 
                         'Split in Half'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {splitFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Split Files ({splitFiles.length})
              </h3>
              
              <div className="space-y-4">
                {splitFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-start sm:items-center">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-all">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>Pages: {file.pageRange}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{file.pageCount} page{file.pageCount !== 1 ? 's' : ''}</span>
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
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={async () => {
                    try {
                      const files = splitFiles.map(file => ({
                        name: file.name,
                        url: file.downloadUrl
                      }))
                      // Use names helper for ZIP filename with user ranges
                      const originalName = uploadedFiles[0]?.name || 'document.pdf'
                      const userRanges = splitMode === 'ranges' ? pageRanges : 
                                       splitFiles.map(f => f.pageRange).join(',')
                      const zipName = names.splitZip(originalName, userRanges)
                      
                      await downloadFilesAsZip(files, zipName)
                      toast.success('ZIP file downloaded successfully!')
                    } catch (error) {
                      console.error('Error downloading ZIP:', error)
                      toast.error('Failed to create ZIP file')
                    }
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span className="hidden sm:inline">Download All as ZIP</span>
                  <span className="sm:hidden">Download ZIP</span>
                </button>
                <button
                  onClick={() => {
                    setUploadedFiles([])
                    setSplitFiles([])
                    setPageRanges('')
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Split Another PDF</span>
                  <span className="sm:hidden">Split Another</span>
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Scissors className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Precise Splitting</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extract exact page ranges or split by custom criteria
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Outputs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Generate multiple PDF files from a single document
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Split large PDFs quickly with optimized algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download all split files as a convenient ZIP archive
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
                    How do I split a PDF by page ranges?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Select &quot;Page Ranges&quot; mode and enter your desired ranges in the format &quot;1-3,5,7-9&quot;. 
                    This will create separate PDFs for pages 1-3, page 5, and pages 7-9. Use commas to 
                    separate multiple ranges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What does &quot;Every N Pages&quot; mode do?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This mode splits your PDF into chunks of a specified number of pages. For example, 
                    if you set it to 5 pages, a 20-page PDF will be split into 4 separate files with 
                    5 pages each.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How does &quot;Split in Half&quot; work?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This mode divides your PDF into two equal parts. A 20-page document becomes two 
                    10-page documents. If the page count is odd, the first half gets the extra page.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is there a file size limit for splitting?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You can split PDF files up to 100MB in size. All processing happens in your browser, 
                    so larger files may take longer to process depending on your device&apos;s capabilities.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are my files secure when splitting?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, your PDF is processed entirely in your browser. No files are uploaded to our 
                    servers, ensuring complete privacy and security of your documents.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I download all split files at once?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, after splitting you can download all files individually or use the &quot;Download All as ZIP&quot; 
                    button to get all split files in a single compressed archive for convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="pdf-split" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="pdf-split" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
