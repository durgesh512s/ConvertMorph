'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  Download, 
  Trash2,
  FileText,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { Progress } from '@/components/Progress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'

interface PageNumberSettings {
  position: 'header' | 'footer'
  alignment: 'left' | 'center' | 'right'
  format: 'arabic' | 'roman-lower' | 'roman-upper' | 'alpha-lower' | 'alpha-upper'
  startNumber: number
  prefix: string
  suffix: string
  fontSize: number
  margin: number
}

const POSITION_OPTIONS = [
  { value: 'header', label: 'Header (Top)' },
  { value: 'footer', label: 'Footer (Bottom)' },
]

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left', icon: AlignLeft },
  { value: 'center', label: 'Center', icon: AlignCenter },
  { value: 'right', label: 'Right', icon: AlignRight },
]

const FORMAT_OPTIONS = [
  { value: 'arabic', label: '1, 2, 3...' },
  { value: 'roman-lower', label: 'i, ii, iii...' },
  { value: 'roman-upper', label: 'I, II, III...' },
  { value: 'alpha-lower', label: 'a, b, c...' },
  { value: 'alpha-upper', label: 'A, B, C...' },
]

export function PDFPageNumClient() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const [pageNumSettings, setPageNumSettings] = useState<PageNumberSettings>({
    position: 'footer',
    alignment: 'center',
    format: 'arabic',
    startNumber: 1,
    prefix: '',
    suffix: '',
    fontSize: 12,
    margin: 20
  })
  
  const { track } = useAnalytics()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileUpload = useCallback((files: File[]) => {
    const pdfFile = files[0]
    if (!pdfFile) return
    
    setFile(pdfFile)
    setError(null)
    
    // Create uploaded file entry
    const uploadedFile: UploadedFile = {
      id: `file-${Date.now()}`,
      file: pdfFile,
      name: pdfFile.name,
      size: pdfFile.size,
      type: pdfFile.type,
      status: 'success'
    }
    setUploadedFiles([uploadedFile])
    
    track('pdf_pagenum_uploaded', {
      file_size: pdfFile.size
    })
  }, [track])

  // Handle file remove
  const handleFileRemove = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setFile(null)
    setError(null)
  }, [])

  // Update page number settings
  const updatePageNumSetting = useCallback(<K extends keyof PageNumberSettings>(
    key: K,
    value: PageNumberSettings[K]
  ) => {
    setPageNumSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  // Convert number to different formats
  const formatPageNumber = (pageNum: number, format: string): string => {
    switch (format) {
      case 'arabic':
        return pageNum.toString()
      case 'roman-lower':
        return toRoman(pageNum).toLowerCase()
      case 'roman-upper':
        return toRoman(pageNum)
      case 'alpha-lower':
        return toAlpha(pageNum).toLowerCase()
      case 'alpha-upper':
        return toAlpha(pageNum)
      default:
        return pageNum.toString()
    }
  }

  // Convert number to Roman numerals
  const toRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    let result = ''
    
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i]
        num -= values[i]
      }
    }
    return result
  }

  // Convert number to alphabetic
  const toAlpha = (num: number): string => {
    let result = ''
    while (num > 0) {
      num--
      result = String.fromCharCode(65 + (num % 26)) + result
      num = Math.floor(num / 26)
    }
    return result
  }

  // Get position coordinates for page number
  const getPositionCoordinates = (
    position: string,
    alignment: string,
    pageWidth: number,
    pageHeight: number,
    margin: number
  ) => {
    let x: number
    let y: number

    // Calculate Y position
    if (position === 'header') {
      y = pageHeight - margin
    } else {
      y = margin
    }

    // Calculate X position
    switch (alignment) {
      case 'left':
        x = margin
        break
      case 'right':
        x = pageWidth - margin
        break
      case 'center':
      default:
        x = pageWidth / 2
        break
    }

    return { x, y }
  }

  // Process and download PDF with page numbers
  const handleProcess = useCallback(async () => {
    if (!file) {
      toast.error('Please upload a PDF file')
      return
    }
    
    const jobId = newJobId('pagenum')
    const startTime = Date.now()
    const originalSizeMb = file.size / (1024 * 1024)
    
    setIsProcessing(true)
    setProgress(0)
    setError(null)
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'pagenum',
      fileCount: 1,
      position: pageNumSettings.position,
      alignment: pageNumSettings.alignment,
      format: pageNumSettings.format,
      startNumber: pageNumSettings.startNumber,
      fontSize: pageNumSettings.fontSize,
      originalSizeMb
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument, rgb } = await import('pdf-lib')
      
      // Load the original PDF
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      setProgress(20)
      
      // Get all pages
      const pages = pdfDoc.getPages()
      const totalPages = pages.length
      
      // Add page numbers to each page
      for (let i = 0; i < totalPages; i++) {
        const page = pages[i]
        const { width, height } = page.getSize()
        
        // Calculate page number
        const pageNumber = pageNumSettings.startNumber + i
        const formattedNumber = formatPageNumber(pageNumber, pageNumSettings.format)
        const pageText = `${pageNumSettings.prefix}${formattedNumber}${pageNumSettings.suffix}`
        
        // Calculate position
        const { x, y } = getPositionCoordinates(
          pageNumSettings.position,
          pageNumSettings.alignment,
          width,
          height,
          pageNumSettings.margin
        )
        
        // Add page number text
        page.drawText(pageText, {
          x,
          y,
          size: pageNumSettings.fontSize,
          color: rgb(0, 0, 0),
        })
        
        // Update progress
        setProgress(20 + (i / totalPages) * 70)
      }
      
      setProgress(90)
      
      // Generate the PDF bytes
      const pdfBytes = await pdfDoc.save()
      const resultSizeMb = pdfBytes.length / (1024 * 1024)
      
      setProgress(100)
      
      // Use names helper for filename
      const filename = names.pagenum(file.name)
      
      // Create download link
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      const durationMs = Date.now() - startTime
      
      toast.success('Page numbers added and PDF downloaded successfully!')
      
      // Track successful completion
      track('job_success', {
        jobId,
        tool: 'pagenum',
        durationMs,
        pageCount: totalPages,
        position: pageNumSettings.position,
        alignment: pageNumSettings.alignment,
        format: pageNumSettings.format,
        startNumber: pageNumSettings.startNumber,
        originalSizeMb,
        resultSizeMb
      })
      
    } catch (error) {
      console.error('Error adding page numbers:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const durationMs = Date.now() - startTime
      
      setError(errorMessage)
      toast.error('Failed to add page numbers to PDF')
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'pagenum',
        error: errorMessage,
        durationMs,
        position: pageNumSettings.position,
        format: pageNumSettings.format
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [file, pageNumSettings, track])

  // Reset function
  const handleReset = useCallback(() => {
    setFile(null)
    setUploadedFiles([])
    setError(null)
    setPageNumSettings({
      position: 'footer',
      alignment: 'center',
      format: 'arabic',
      startNumber: 1,
      prefix: '',
      suffix: '',
      fontSize: 12,
      margin: 20
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Generate preview text
  const getPreviewText = () => {
    const sampleNumber = formatPageNumber(pageNumSettings.startNumber, pageNumSettings.format)
    return `${pageNumSettings.prefix}${sampleNumber}${pageNumSettings.suffix}`
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {!file && (
        <Dropzone
          onFilesAdded={handleFileUpload}
          onFileRemove={handleFileRemove}
          uploadedFiles={uploadedFiles}
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={1}
          maxSize={100 * 1024 * 1024} // 100MB
        />
      )}

      {/* File Info & Settings */}
      {file && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>

            {/* Page Number Settings */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Position */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Position
                </Label>
                <select
                  value={pageNumSettings.position}
                  onChange={(e) => updatePageNumSetting('position', e.target.value as PageNumberSettings['position'])}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {POSITION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alignment */}
              <div className="space-y-2">
                <Label>Alignment</Label>
                <div className="flex space-x-2">
                  {ALIGNMENT_OPTIONS.map((option) => {
                    const Icon = option.icon
                    return (
                      <Button
                        key={option.value}
                        variant={pageNumSettings.alignment === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updatePageNumSetting('alignment', option.value as PageNumberSettings['alignment'])}
                        disabled={isProcessing}
                        className="flex items-center space-x-1"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <Label>Number Format</Label>
                <select
                  value={pageNumSettings.format}
                  onChange={(e) => updatePageNumSetting('format', e.target.value as PageNumberSettings['format'])}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {FORMAT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Number */}
              <div className="space-y-2">
                <Label htmlFor="start-number">Start Number</Label>
                <Input
                  id="start-number"
                  type="number"
                  min="1"
                  value={pageNumSettings.startNumber}
                  onChange={(e) => updatePageNumSetting('startNumber', parseInt(e.target.value) || 1)}
                  disabled={isProcessing}
                />
              </div>

              {/* Prefix */}
              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix (optional)</Label>
                <Input
                  id="prefix"
                  value={pageNumSettings.prefix}
                  onChange={(e) => updatePageNumSetting('prefix', e.target.value)}
                  placeholder="e.g., Page "
                  disabled={isProcessing}
                />
              </div>

              {/* Suffix */}
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix (optional)</Label>
                <Input
                  id="suffix"
                  value={pageNumSettings.suffix}
                  onChange={(e) => updatePageNumSetting('suffix', e.target.value)}
                  placeholder="e.g., /10"
                  disabled={isProcessing}
                />
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span>Font Size</span>
                  <span className="text-sm text-gray-500">
                    {pageNumSettings.fontSize}px
                  </span>
                </Label>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={pageNumSettings.fontSize}
                  onChange={(e) => updatePageNumSetting('fontSize', parseInt(e.target.value))}
                  disabled={isProcessing}
                  className="w-full"
                />
              </div>

              {/* Margin */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span>Margin</span>
                  <span className="text-sm text-gray-500">
                    {pageNumSettings.margin}px
                  </span>
                </Label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={pageNumSettings.margin}
                  onChange={(e) => updatePageNumSetting('margin', parseInt(e.target.value))}
                  disabled={isProcessing}
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex flex-col space-y-4">
              <Button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Adding Page Numbers...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Add Page Numbers & Download
                  </>
                )}
              </Button>

              {/* Progress */}
              {isProcessing && (
                <Progress value={progress} className="w-full" />
              )}

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      {file && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Page Number Preview</h3>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="relative inline-block">
                <div className="w-48 h-64 bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center relative">
                  <div
                    className="absolute text-black"
                    style={{
                      fontSize: `${Math.max(6, pageNumSettings.fontSize / 2)}px`,
                      ...(pageNumSettings.position === 'header' && pageNumSettings.alignment === 'left' && { top: '8px', left: '8px' }),
                      ...(pageNumSettings.position === 'header' && pageNumSettings.alignment === 'center' && { top: '8px', left: '50%', transform: 'translateX(-50%)' }),
                      ...(pageNumSettings.position === 'header' && pageNumSettings.alignment === 'right' && { top: '8px', right: '8px' }),
                      ...(pageNumSettings.position === 'footer' && pageNumSettings.alignment === 'left' && { bottom: '8px', left: '8px' }),
                      ...(pageNumSettings.position === 'footer' && pageNumSettings.alignment === 'center' && { bottom: '8px', left: '50%', transform: 'translateX(-50%)' }),
                      ...(pageNumSettings.position === 'footer' && pageNumSettings.alignment === 'right' && { bottom: '8px', right: '8px' }),
                    }}
                  >
                    {getPreviewText()}
                  </div>
                  <div className="text-gray-400 text-xs">PDF Page Preview</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This is a preview of how page numbers will appear on your PDF
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
