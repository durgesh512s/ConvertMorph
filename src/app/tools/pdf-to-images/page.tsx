'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { FileText, Download, Image, Zap, Settings } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'

const metadata: Metadata = {
  title: 'PDF to Images | DocMorph - Convert PDF to JPG PNG',
  description: 'Convert PDF pages to JPG or PNG images. Extract all pages or specific page ranges from your PDF documents.',
  openGraph: {
    title: 'PDF to Images | DocMorph',
    description: 'Convert PDF to images with our free online converter.',
    type: 'website',
  },
}

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
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simulate extracted images (in real implementation, this would process the actual PDF)
    const mockPageCount = Math.floor(Math.random() * 10) + 1 // 1-10 pages
    const results: ConvertedImage[] = []
    
    for (let i = 1; i <= mockPageCount; i++) {
      if (extractMode === 'all' || isPageInRange(i, pageRange)) {
        results.push({
          name: `${uploadedFiles[0].name.replace('.pdf', '')}_page_${i}.${imageFormat.toLowerCase()}`,
          pageNumber: i,
          downloadUrl: URL.createObjectURL(uploadedFiles[0].file), // Placeholder
          size: `${Math.floor(Math.random() * 500 + 100)} KB`
        })
      }
    }
    
    setConvertedImages(results)
    setIsProcessing(false)
  }

  const isPageInRange = (pageNum: number, range: string): boolean => {
    if (!range.trim()) return true
    
    const ranges = range.split(',').map(r => r.trim())
    
    for (const r of ranges) {
      if (r.includes('-')) {
        const [start, end] = r.split('-').map(n => parseInt(n.trim()))
        if (pageNum >= start && pageNum <= end) return true
      } else {
        if (pageNum === parseInt(r)) return true
      }
    }
    
    return false
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Image className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF to Images
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert PDF pages to high-quality JPG or PNG images. Extract all pages or specific ranges.
            </p>
          </div>

          {/* Conversion Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Conversion Settings
            </h2>
            
            {/* Extract Mode */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Extract Mode</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    extractMode === 'all'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
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
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Use commas to separate pages/ranges. Example: 1-3,5,7-9 extracts pages 1, 2, 3, 5, 7, 8, 9
                  </p>
                </div>
              )}
            </div>

            {/* Image Settings */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="imageFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Format
                </label>
                <select
                  id="imageFormat"
                  value={imageFormat}
                  onChange={(e) => setImageFormat(e.target.value as 'PNG' | 'JPG')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
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
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Converting to Images...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Convert to {imageFormat} Images
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {convertedImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Extracted Images ({convertedImages.length})
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {convertedImages.map((image, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Image className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Page {image.pageNumber}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {image.size}
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-24 mb-3 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {image.name}
                    </p>
                    
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
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
                    setConvertedImages([])
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Convert Another PDF
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Image className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">High Quality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extract images at up to 600 DPI for print quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flexible Options</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose format, quality, and specific page ranges
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quick extraction with optimized rendering
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Batch Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download all images as individual files or ZIP
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What image formats can I export to?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can export PDF pages as PNG (lossless, larger files) or JPG (compressed, smaller files). PNG is best for documents with text, while JPG is suitable for photos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I extract specific pages?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select &quot;Page Range&quot; mode and enter the pages you want. Use commas to separate individual pages and hyphens for ranges. For example: &quot;1-3,5,7-9&quot; extracts pages 1, 2, 3, 5, 7, 8, and 9.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What resolution should I choose?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  72 DPI is suitable for web use, 150 DPI for standard viewing, 300 DPI for high-quality printing, and 600 DPI for professional print work. Higher DPI creates larger files.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What is the maximum PDF size I can upload?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can upload PDF files up to 25MB in size. For larger files, consider compressing your PDF first using our PDF compression tool.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Are my PDF files stored on your servers?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No, all PDF processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I adjust the image quality for JPG exports?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, when exporting to JPG format, you can adjust the quality from 10% to 100%. Higher quality produces better images but larger file sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
