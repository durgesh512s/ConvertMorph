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
  Type,
  Move,
  Palette
} from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { Progress } from '@/components/Progress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { generateFileId } from '@/lib/id-utils'

interface WatermarkSettings {
  text: string
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  opacity: number
  fontSize: number
  color: string
  rotation: number
}

const POSITION_OPTIONS = [
  { value: 'center', label: 'Center' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
]

const COLOR_OPTIONS = [
  { value: '#000000', label: 'Black' },
  { value: '#666666', label: 'Gray' },
  { value: '#FF0000', label: 'Red' },
  { value: '#0000FF', label: 'Blue' },
  { value: '#008000', label: 'Green' },
  { value: '#800080', label: 'Purple' },
]

export function PDFWatermarkClient() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    text: 'CONFIDENTIAL',
    position: 'center',
    opacity: 0.3,
    fontSize: 48,
    color: '#666666',
    rotation: 45
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
      id: generateFileId(),
      file: pdfFile,
      name: pdfFile.name,
      size: pdfFile.size,
      type: pdfFile.type,
      status: 'success'
    }
    setUploadedFiles([uploadedFile])
    
    track('pdf_watermark_uploaded', {
      file_size: pdfFile.size
    })
  }, [track])

  // Handle file remove
  const handleFileRemove = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setFile(null)
    setError(null)
  }, [])

  // Update watermark settings
  const updateWatermarkSetting = useCallback(<K extends keyof WatermarkSettings>(
    key: K,
    value: WatermarkSettings[K]
  ) => {
    setWatermarkSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  // Get position coordinates for watermark
  const getPositionCoordinates = (position: string, pageWidth: number, pageHeight: number, textWidth: number, textHeight: number) => {
    const margin = 50
    
    switch (position) {
      case 'top-left':
        return { x: margin, y: pageHeight - margin - textHeight }
      case 'top-center':
        return { x: pageWidth / 2 - textWidth / 2, y: pageHeight - margin - textHeight }
      case 'top-right':
        return { x: pageWidth - margin - textWidth, y: pageHeight - margin - textHeight }
      case 'center':
        return { x: pageWidth / 2 - textWidth / 2, y: pageHeight / 2 - textHeight / 2 }
      case 'bottom-left':
        return { x: margin, y: margin }
      case 'bottom-center':
        return { x: pageWidth / 2 - textWidth / 2, y: margin }
      case 'bottom-right':
        return { x: pageWidth - margin - textWidth, y: margin }
      default:
        return { x: pageWidth / 2 - textWidth / 2, y: pageHeight / 2 - textHeight / 2 }
    }
  }

  // Process and download watermarked PDF
  const handleProcess = useCallback(async () => {
    if (!file || !watermarkSettings.text.trim()) {
      toast.error('Please upload a PDF and enter watermark text')
      return
    }
    
    const jobId = newJobId('watermark')
    const startTime = Date.now()
    const originalSizeMb = file.size / (1024 * 1024)
    
    setIsProcessing(true)
    setProgress(0)
    setError(null)
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'watermark',
      fileCount: 1,
      watermarkText: watermarkSettings.text,
      position: watermarkSettings.position,
      opacity: watermarkSettings.opacity,
      fontSize: watermarkSettings.fontSize,
      rotation: watermarkSettings.rotation,
      originalSizeMb
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument, rgb, degrees } = await import('pdf-lib')
      
      // Load the original PDF
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      setProgress(20)
      
      // Get all pages
      const pages = pdfDoc.getPages()
      const totalPages = pages.length
      
      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        if (result) {
          const r = result[1]
          const g = result[2]
          const b = result[3]
          if (r && g && b) {
            return {
              r: parseInt(r, 16) / 255,
              g: parseInt(g, 16) / 255,
              b: parseInt(b, 16) / 255
            }
          }
        }
        return { r: 0.4, g: 0.4, b: 0.4 }
      }
      
      const color = hexToRgb(watermarkSettings.color)
      
      // Add watermark to each page
      for (let i = 0; i < totalPages; i++) {
        const page = pages[i]
        if (!page) continue
        
        const { width, height } = page.getSize()
        
        // Calculate position
        const textWidth = watermarkSettings.text.length * (watermarkSettings.fontSize * 0.6)
        const textHeight = watermarkSettings.fontSize
        const { x, y } = getPositionCoordinates(
          watermarkSettings.position,
          width,
          height,
          textWidth,
          textHeight
        )
        
        // Add watermark text
        page.drawText(watermarkSettings.text, {
          x,
          y,
          size: watermarkSettings.fontSize,
          color: rgb(color.r, color.g, color.b),
          opacity: watermarkSettings.opacity,
          rotate: degrees(watermarkSettings.rotation),
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
      const filename = names.watermark(file.name)
      
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
      
      toast.success('PDF watermarked and downloaded successfully!')
      
      // Track successful completion
      track('job_success', {
        jobId,
        tool: 'watermark',
        durationMs,
        pageCount: totalPages,
        watermarkText: watermarkSettings.text,
        position: watermarkSettings.position,
        opacity: watermarkSettings.opacity,
        originalSizeMb,
        resultSizeMb
      })
      
    } catch (error) {
      console.error('Error adding watermark:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const durationMs = Date.now() - startTime
      
      setError(errorMessage)
      toast.error('Failed to add watermark to PDF')
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'watermark',
        error: errorMessage,
        durationMs,
        watermarkText: watermarkSettings.text
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [file, watermarkSettings, track])

  // Reset function
  const handleReset = useCallback(() => {
    setFile(null)
    setUploadedFiles([])
    setError(null)
    setWatermarkSettings({
      text: 'CONFIDENTIAL',
      position: 'center',
      opacity: 0.3,
      fontSize: 48,
      color: '#666666',
      rotation: 45
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

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
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm sm:text-base truncate" title={file.name}>{file.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isProcessing}
                className="flex items-center space-x-1 w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>

            {/* Watermark Settings */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Text Input */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="watermark-text" className="flex items-center gap-2 text-sm sm:text-base">
                  <Type className="w-4 h-4" />
                  Watermark Text
                </Label>
                <Input
                  id="watermark-text"
                  value={watermarkSettings.text}
                  onChange={(e) => updateWatermarkSetting('text', e.target.value)}
                  placeholder="Enter watermark text"
                  disabled={isProcessing}
                  className="text-sm sm:text-base"
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm sm:text-base">
                  <Move className="w-4 h-4" />
                  Position
                </Label>
                <select
                  value={watermarkSettings.position}
                  onChange={(e) => updateWatermarkSetting('position', e.target.value as WatermarkSettings['position'])}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {POSITION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm sm:text-base">
                  <Palette className="w-4 h-4" />
                  Color
                </Label>
                <select
                  value={watermarkSettings.color}
                  onChange={(e) => updateWatermarkSetting('color', e.target.value)}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {COLOR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opacity */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between text-sm sm:text-base">
                  <span>Opacity</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {Math.round(watermarkSettings.opacity * 100)}%
                  </span>
                </Label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={watermarkSettings.opacity}
                  onChange={(e) => updateWatermarkSetting('opacity', parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between text-sm sm:text-base">
                  <span>Font Size</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {watermarkSettings.fontSize}px
                  </span>
                </Label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="4"
                  value={watermarkSettings.fontSize}
                  onChange={(e) => updateWatermarkSetting('fontSize', parseInt(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Rotation */}
              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center justify-between text-sm sm:text-base">
                  <span>Rotation</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {watermarkSettings.rotation}°
                  </span>
                </Label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="15"
                  value={watermarkSettings.rotation}
                  onChange={(e) => updateWatermarkSetting('rotation', parseInt(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 sm:mt-8 flex flex-col space-y-4">
              <Button
                onClick={handleProcess}
                disabled={isProcessing || !watermarkSettings.text.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Adding Watermark...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    <span className="text-sm sm:text-base">Add Watermark & Download</span>
                  </>
                )}
              </Button>

              {/* Progress */}
              {isProcessing && (
                <Progress value={progress} className="w-full" />
              )}

              {/* Error Display */}
              {error && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      {file && watermarkSettings.text && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Watermark Preview</h3>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="relative inline-block">
                <div className="w-48 h-64 bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center">
                  <div
                    className="absolute pointer-events-none select-none"
                    style={{
                      color: watermarkSettings.color,
                      opacity: watermarkSettings.opacity,
                      fontSize: `${Math.max(8, watermarkSettings.fontSize / 6)}px`,
                      transform: `rotate(${watermarkSettings.rotation}deg)`,
                      ...(watermarkSettings.position === 'top-left' && { top: '10px', left: '10px' }),
                      ...(watermarkSettings.position === 'top-center' && { top: '10px', left: '50%', transform: `translateX(-50%) rotate(${watermarkSettings.rotation}deg)` }),
                      ...(watermarkSettings.position === 'top-right' && { top: '10px', right: '10px' }),
                      ...(watermarkSettings.position === 'center' && { top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${watermarkSettings.rotation}deg)` }),
                      ...(watermarkSettings.position === 'bottom-left' && { bottom: '10px', left: '10px' }),
                      ...(watermarkSettings.position === 'bottom-center' && { bottom: '10px', left: '50%', transform: `translateX(-50%) rotate(${watermarkSettings.rotation}deg)` }),
                      ...(watermarkSettings.position === 'bottom-right' && { bottom: '10px', right: '10px' }),
                    }}
                  >
                    {watermarkSettings.text}
                  </div>
                  <div className="text-gray-400 text-xs">PDF Page Preview</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This is a preview of how your watermark will appear on the PDF pages
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
