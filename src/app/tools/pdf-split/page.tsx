'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Scissors, Download, FileText, Zap, Info } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'

const metadata: Metadata = {
  title: 'PDF Split | ConvertMorph - Split PDF Pages',
  description: 'Split PDF files by page ranges. Extract specific pages or split into multiple documents with our free PDF splitter.',
  openGraph: {
    title: 'PDF Split | ConvertMorph',
    description: 'Split PDF files by page ranges with our free online tool.',
    type: 'website',
  },
}

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
  const [splitMode, setSplitMode] = useState<'ranges' | 'pages' | 'size'>('ranges')

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
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleSplit = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    
    // Simulate split process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const file = uploadedFiles[0]
    const totalPages = Math.floor(Math.random() * 50) + 10 // Simulate 10-60 pages
    
    let splits: SplitFile[] = []
    
    if (splitMode === 'ranges' && pageRanges) {
      // Parse page ranges like "1-3,5,7-9"
      const ranges = pageRanges.split(',').map(r => r.trim())
      splits = ranges.map((range, index) => {
        const pageCount = range.includes('-') 
          ? parseInt(range.split('-')[1]) - parseInt(range.split('-')[0]) + 1
          : 1
        
        return {
          name: `${file.name.replace('.pdf', '')}_pages_${range}.pdf`,
          pageRange: range,
          pageCount,
          downloadUrl: URL.createObjectURL(file.file) // Placeholder
        }
      })
    } else if (splitMode === 'pages') {
      // Split every N pages
      const pagesPerSplit = 5
      const numSplits = Math.ceil(totalPages / pagesPerSplit)
      splits = Array.from({ length: numSplits }, (_, index) => {
        const startPage = index * pagesPerSplit + 1
        const endPage = Math.min((index + 1) * pagesPerSplit, totalPages)
        return {
          name: `${file.name.replace('.pdf', '')}_part_${index + 1}.pdf`,
          pageRange: `${startPage}-${endPage}`,
          pageCount: endPage - startPage + 1,
          downloadUrl: URL.createObjectURL(file.file) // Placeholder
        }
      })
    } else {
      // Split by size (simulate)
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
    setIsProcessing(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Scissors className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Split
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Split PDF files by page ranges, extract specific pages, or divide into smaller documents.
            </p>
          </div>

          {/* Split Mode Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Scissors className="h-5 w-5 mr-2" />
              Split Mode
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
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
                  Split into chunks of 5 pages each
                </p>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  splitMode === 'size'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSplitMode('size')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={splitMode === 'size'}
                    onChange={() => setSplitMode('size')}
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
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={1}
              maxSize={25 * 1024 * 1024} // 25MB
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleSplit}
                  disabled={isProcessing || (splitMode === 'ranges' && !pageRanges.trim())}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Splitting PDF...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Split PDF
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {splitFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Split Files ({splitFiles.length})
              </h3>
              
              <div className="space-y-4">
                {splitFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>Pages: {file.pageRange}</span>
                            <span>•</span>
                            <span>{file.pageCount} page{file.pageCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex space-x-4">
                <button
                  onClick={() => {
                    // Download all as ZIP
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All as ZIP
                </button>
                <button
                  onClick={() => {
                    setUploadedFiles([])
                    setSplitFiles([])
                    setPageRanges('')
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Split Another PDF
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </div>
    </div>
  )
}
