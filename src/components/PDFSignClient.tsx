'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  Download, 
  Trash2,
  FileText,
  PenTool,
  Type,
  Save,
  Plus
} from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { Progress } from '@/components/Progress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'

interface SignatureElement {
  id: string
  type: 'signature' | 'text'
  content: string // base64 image for signature, text for text
  x: number
  y: number
  width: number
  height: number
  pageIndex: number
  fontSize?: number
  color?: string
}

interface PDFPage {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

export function PDFSignClient() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [pdfPages, setPdfPages] = useState<PDFPage[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [elements, setElements] = useState<SignatureElement[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizingElement, setResizingElement] = useState<string | null>(null)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  
  const { track } = useAnalytics()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null)
  const pdfContainerRef = useRef<HTMLDivElement>(null)

  // Handle file upload
  const handleFileUpload = useCallback(async (files: File[]) => {
    const pdfFile = files[0]
    if (!pdfFile) return
    
    setFile(pdfFile)
    setError(null)
    setElements([])
    
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
    
    // Load PDF pages
    await loadPDFPages(pdfFile)
    
    track('pdf_sign_uploaded', {
      file_size: pdfFile.size
    })
  }, [track])

  // Load PDF pages for preview
  const loadPDFPages = async (file: File) => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
      
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const pages: PDFPage[] = []
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 1.5 })
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        canvas.height = viewport.height
        canvas.width = viewport.width
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        }).promise
        
        pages.push({
          canvas,
          width: viewport.width,
          height: viewport.height
        })
      }
      
      setPdfPages(pages)
      setCurrentPage(0)
    } catch (error) {
      console.error('Error loading PDF:', error)
      toast.error('Failed to load PDF for preview')
    }
  }

  // Handle file remove
  const handleFileRemove = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setFile(null)
    setError(null)
    setPdfPages([])
    setElements([])
    setCurrentPage(0)
  }, [])

  // Clear signature canvas
  const clearSignature = () => {
    const canvas = signatureCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  // Save signature from canvas
  const saveSignature = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const dataURL = canvas.toDataURL('image/png')
    const element: SignatureElement = {
      id: `sig-${Date.now()}`,
      type: 'signature',
      content: dataURL,
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      pageIndex: currentPage
    }
    
    setElements(prev => [...prev, element])
    setShowSignaturePad(false)
    clearSignature()
    toast.success('Signature added to document')
  }

  // Add text element
  const addTextElement = () => {
    if (!textInput.trim()) return
    
    const element: SignatureElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: textInput,
      x: 100,
      y: 100,
      width: textInput.length * (fontSize * 0.6),
      height: fontSize + 4,
      pageIndex: currentPage,
      fontSize,
      color: '#000000'
    }
    
    setElements(prev => [...prev, element])
    setShowTextInput(false)
    setTextInput('')
    toast.success('Text added to document')
  }

  // Remove element
  const removeElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId))
  }

  // Drag and drop handlers
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const element = elements.find(el => el.id === elementId)
    if (!element || !pdfContainerRef.current) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    
    // Calculate scale factor for current display
    const canvas = pdfContainerRef.current.querySelector('canvas')
    const currentPageData = pdfPages[currentPage]
    if (!canvas || !currentPageData) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate display position of element
    const displayX = element.x * scaleX
    const displayY = element.y * scaleY
    
    // Calculate offset from mouse to element's top-left corner in display coordinates
    const offsetX = e.clientX - rect.left - displayX
    const offsetY = e.clientY - rect.top - displayY
    
    setDraggedElement(elementId)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedElement || !pdfContainerRef.current) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    
    // Get current page dimensions for boundary checking
    const currentPageData = pdfPages[currentPage]
    if (!currentPageData) return
    
    // Calculate scale factor
    const canvas = pdfContainerRef.current.querySelector('canvas')
    if (!canvas) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate new position in display coordinates
    const displayX = e.clientX - rect.left - dragOffset.x
    const displayY = e.clientY - rect.top - dragOffset.y
    
    // Convert to actual PDF coordinates
    const actualX = displayX / scaleX
    const actualY = displayY / scaleY
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setElements(prev => prev.map(el => {
        if (el.id === draggedElement) {
          // Ensure element stays within page bounds
          const boundedX = Math.max(0, Math.min(actualX, currentPageData.width - el.width))
          const boundedY = Math.max(0, Math.min(actualY, currentPageData.height - el.height))
          
          return {
            ...el,
            x: boundedX,
            y: boundedY
          }
        }
        return el
      }))
    })
  }, [draggedElement, dragOffset, pdfPages, currentPage])

  const handleMouseUp = useCallback(() => {
    setDraggedElement(null)
    setDragOffset({ x: 0, y: 0 })
    setResizingElement(null)
    setResizeHandle(null)
    setInitialSize({ width: 0, height: 0 })
  }, [])

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent, elementId: string, handle: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const element = elements.find(el => el.id === elementId)
    if (!element) return
    
    setResizingElement(elementId)
    setResizeHandle(handle)
    setInitialSize({ width: element.width, height: element.height })
  }

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingElement || !resizeHandle || !pdfContainerRef.current) return
    
    const element = elements.find(el => el.id === resizingElement)
    if (!element) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    const currentPageData = pdfPages[currentPage]
    if (!currentPageData) return
    
    const canvas = pdfContainerRef.current.querySelector('canvas')
    if (!canvas) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate mouse position relative to element's top-left corner
    const mouseX = (e.clientX - rect.left) / scaleX
    const mouseY = (e.clientY - rect.top) / scaleY
    
    let newWidth = element.width
    let newHeight = element.height
    
    // Calculate new dimensions based on resize handle
    if (resizeHandle.includes('right')) {
      newWidth = Math.max(20, mouseX - element.x)
    }
    if (resizeHandle.includes('bottom')) {
      newHeight = Math.max(20, mouseY - element.y)
    }
    if (resizeHandle.includes('left')) {
      newWidth = Math.max(20, element.x + element.width - mouseX)
    }
    if (resizeHandle.includes('top')) {
      newHeight = Math.max(20, element.y + element.height - mouseY)
    }
    
    // Maintain aspect ratio for corner handles
    if (resizeHandle.includes('corner')) {
      const aspectRatio = initialSize.width / initialSize.height
      if (resizeHandle.includes('right') || resizeHandle.includes('left')) {
        newHeight = newWidth / aspectRatio
      } else {
        newWidth = newHeight * aspectRatio
      }
    }
    
    // Ensure element stays within page bounds
    newWidth = Math.min(newWidth, currentPageData.width - element.x)
    newHeight = Math.min(newHeight, currentPageData.height - element.y)
    
    requestAnimationFrame(() => {
      setElements(prev => prev.map(el => {
        if (el.id === resizingElement) {
          const updatedElement = { ...el, width: newWidth, height: newHeight }
          
          // For text elements, update font size proportionally
          if (el.type === 'text' && el.fontSize) {
            const scaleFactor = newHeight / el.height
            updatedElement.fontSize = Math.max(8, Math.min(72, el.fontSize * scaleFactor))
          }
          
          return updatedElement
        }
        return el
      }))
    })
  }, [resizingElement, resizeHandle, initialSize, pdfPages, currentPage, elements])

  // Add global mouse event listeners for dragging and resizing
  useEffect(() => {
    if (draggedElement) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [draggedElement, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (resizingElement) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [resizingElement, handleResizeMove, handleMouseUp])

  // Handle canvas drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000000'
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Process and download signed PDF
  const handleProcess = useCallback(async () => {
    if (!file || elements.length === 0) {
      toast.error('Please upload a PDF and add at least one signature or text element')
      return
    }
    
    setIsProcessing(true)
    setProgress(0)
    setError(null)
    
    const startTime = Date.now()
    const jobId = newJobId('sign')
    const elementCount = elements.length
    const signatureCount = elements.filter(el => el.type === 'signature').length
    const textCount = elements.filter(el => el.type === 'text').length
    const originalSizeMb = Number((file.size / (1024 * 1024)).toFixed(2))
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'sign',
      fileCount: 1,
      elementCount,
      signatureCount,
      textCount,
      originalSizeMb
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument } = await import('pdf-lib')
      
      // Load the original PDF
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      setProgress(20)
      
      // Get all pages
      const pages = pdfDoc.getPages()
      const pageCount = pages.length
      
      // Process each element
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        const page = pages[element.pageIndex]
        
        // CRITICAL: Convert from scaled canvas coordinates (1.5x) back to original PDF coordinates (1x)
        // The preview canvas is rendered at 1.5x scale, but element coordinates are stored in that scaled system
        const CANVAS_SCALE = 1.5
        const actualX = element.x / CANVAS_SCALE
        const actualY = element.y / CANVAS_SCALE
        const actualWidth = element.width / CANVAS_SCALE
        const actualHeight = element.height / CANVAS_SCALE
        const actualFontSize = (element.fontSize || 16) / CANVAS_SCALE
        
        if (element.type === 'signature') {
          // Convert base64 image to bytes
          const imageBytes = Uint8Array.from(atob(element.content.split(',')[1]), c => c.charCodeAt(0))
          const image = await pdfDoc.embedPng(imageBytes)
          
          // Get the page dimensions from the original PDF page
          const pageHeight = page.getHeight()
          
          // Convert coordinates from canvas coordinate system (top-left origin) 
          // to PDF coordinate system (bottom-left origin)
          const pdfX = actualX
          const pdfY = pageHeight - actualY - actualHeight
          
          // Add signature image to page
          page.drawImage(image, {
            x: pdfX,
            y: pdfY,
            width: actualWidth,
            height: actualHeight,
          })
        } else if (element.type === 'text') {
          // Get the page dimensions from the original PDF page
          const pageHeight = page.getHeight()
          
          // Convert coordinates from canvas coordinate system (top-left origin) 
          // to PDF coordinate system (bottom-left origin)
          // For text, we need to account for the font size to position the baseline correctly
          const pdfX = actualX
          const pdfY = pageHeight - actualY - actualFontSize
          
          // Add text to page
          page.drawText(element.content, {
            x: pdfX,
            y: pdfY,
            size: actualFontSize,
          })
        }
        
        // Update progress
        setProgress(20 + (i / elements.length) * 70)
      }
      
      setProgress(90)
      
      // Generate the PDF bytes
      const pdfBytes = await pdfDoc.save()
      const resultSizeMb = Number((pdfBytes.length / (1024 * 1024)).toFixed(2))
      
      setProgress(100)
      
      // Use names helper for filename
      const filename = names.sign(file.name)
      
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
      
      toast.success('PDF signed and downloaded successfully!')
      
      // Track job success
      track('job_success', {
        jobId,
        tool: 'sign',
        durationMs,
        pageCount,
        elementCount,
        signatureCount,
        textCount,
        originalSizeMb,
        resultSizeMb
      })
      
    } catch (error) {
      console.error('Error signing PDF:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMessage)
      toast.error('Failed to sign PDF')
      
      const durationMs = Date.now() - startTime
      
      // Track job error
      track('job_error', {
        jobId,
        tool: 'sign',
        durationMs,
        error: errorMessage,
        elementCount,
        signatureCount,
        textCount,
        originalSizeMb
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [file, elements, track])

  // Reset function
  const handleReset = useCallback(() => {
    setFile(null)
    setUploadedFiles([])
    setError(null)
    setPdfPages([])
    setElements([])
    setCurrentPage(0)
    setShowSignaturePad(false)
    setShowTextInput(false)
    setTextInput('')
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

      {/* PDF Viewer & Editor */}
      {file && pdfPages.length > 0 && (
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* PDF Preview */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">{file.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Page {currentPage + 1} of {pdfPages.length}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={isProcessing}
                    className="flex items-center space-x-1 w-full sm:w-auto flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Reset</span>
                  </Button>
                </div>

                {/* Page Navigation */}
                {pdfPages.length > 1 && (
                  <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </Button>
                    <span className="text-xs sm:text-sm text-gray-600 px-2 whitespace-nowrap">
                      {currentPage + 1} / {pdfPages.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(pdfPages.length - 1, currentPage + 1))}
                      disabled={currentPage === pdfPages.length - 1}
                      className="px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                    </Button>
                  </div>
                )}

                {/* PDF Page Display */}
                <div 
                  ref={pdfContainerRef}
                  className="relative border border-gray-300 rounded-lg overflow-hidden bg-white"
                  style={{ maxHeight: '70vh', overflow: 'auto' }}
                >
                  {pdfPages[currentPage] && (
                    <div className="relative">
                      <canvas
                        ref={(canvas) => {
                          if (canvas && pdfPages[currentPage]) {
                            const ctx = canvas.getContext('2d')
                            if (ctx) {
                              canvas.width = pdfPages[currentPage].width
                              canvas.height = pdfPages[currentPage].height
                              ctx.drawImage(pdfPages[currentPage].canvas, 0, 0)
                            }
                          }
                        }}
                        className="w-full h-auto"
                      />
                      
                      {/* Overlay elements for current page */}
                      {elements
                        .filter(el => el.pageIndex === currentPage)
                        .map(element => {
                          // Calculate display position based on canvas scaling
                          const canvas = pdfContainerRef.current?.querySelector('canvas')
                          const currentPageData = pdfPages[currentPage]
                          
                          if (!canvas || !currentPageData) return null
                          
                          const scaleX = canvas.offsetWidth / currentPageData.width
                          const scaleY = canvas.offsetHeight / currentPageData.height
                          
                          const displayX = element.x * scaleX
                          const displayY = element.y * scaleY
                          const displayWidth = element.width * scaleX
                          const displayHeight = element.height * scaleY
                          
                          return (
                            <div
                              key={element.id}
                              className={`absolute border-2 bg-opacity-50 group select-none ${
                                draggedElement === element.id 
                                  ? 'border-rose-500 bg-rose-50 cursor-grabbing' 
                                  : 'border-blue-500 bg-blue-50 cursor-grab hover:border-rose-500 hover:bg-rose-50'
                              }`}
                              style={{
                                left: `${displayX}px`,
                                top: `${displayY}px`,
                                width: `${displayWidth}px`,
                                height: `${displayHeight}px`,
                              }}
                              onMouseDown={(e) => handleMouseDown(e, element.id)}
                              onDoubleClick={() => removeElement(element.id)}
                            >
                              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {element.type === 'signature' ? '✍️ Signature' : '📝 Text'} - Drag to move, resize handles to resize, double-click to remove
                              </div>
                              
                              {/* Resize Handles */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Corner handles */}
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-nw-resize -top-1 -left-1"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-top-left')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-ne-resize -top-1 -right-1"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-top-right')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-sw-resize -bottom-1 -left-1"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-bottom-left')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-se-resize -bottom-1 -right-1"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-bottom-right')}
                                />
                                
                                {/* Edge handles */}
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-n-resize -top-1 left-1/2 transform -translate-x-1/2"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'top')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-s-resize -bottom-1 left-1/2 transform -translate-x-1/2"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'bottom')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-w-resize -left-1 top-1/2 transform -translate-y-1/2"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'left')}
                                />
                                <div
                                  className="absolute w-3 h-3 bg-blue-600 border border-white rounded-sm cursor-e-resize -right-1 top-1/2 transform -translate-y-1/2"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'right')}
                                />
                              </div>
                              {element.type === 'text' && (
                                <div 
                                  className="w-full h-full flex items-center justify-center text-black pointer-events-none"
                                  style={{ fontSize: `${(element.fontSize || 16) * scaleX}px` }}
                                >
                                  {element.content}
                                </div>
                              )}
                              {element.type === 'signature' && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                  src={element.content} 
                                  alt="Signature" 
                                  className="w-full h-full object-contain pointer-events-none"
                                  draggable={false}
                                />
                              )}
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            {/* Mobile: Horizontal layout for signature and text buttons */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              <Card>
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <PenTool className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Signature</span>
                    <span className="sm:hidden">Signature</span>
                  </h3>
                  <Button
                    onClick={() => setShowSignaturePad(true)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm"
                    size="sm"
                  >
                    <PenTool className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Draw Signature</span>
                    <span className="sm:hidden">Draw</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Type className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Text</span>
                    <span className="sm:hidden">Text</span>
                  </h3>
                  <Button
                    onClick={() => setShowTextInput(true)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm"
                    size="sm"
                  >
                    <Type className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Add Text</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Desktop: Vertical layout */}
            <div className="hidden lg:block space-y-4">
              {/* Add Signature */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Add Signature
                  </h3>
                  <Button
                    onClick={() => setShowSignaturePad(true)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    Draw Signature
                  </Button>
                </CardContent>
              </Card>

              {/* Add Text */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Add Text
                  </h3>
                  <Button
                    onClick={() => setShowTextInput(true)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Add Text
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Elements List */}
            {elements.length > 0 && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Elements ({elements.length})</h3>
                  <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                    {elements.map(element => (
                      <div key={element.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs sm:text-sm">
                        <span className="truncate">
                          {element.type === 'signature' ? '✍️ Signature' : '📝 Text'} 
                          {element.pageIndex !== currentPage && ` (Page ${element.pageIndex + 1})`}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeElement(element.id)}
                          className="p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Download */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || elements.length === 0}
                  className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white text-sm sm:text-base"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      <span className="hidden sm:inline">Processing...</span>
                      <span className="sm:hidden">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Download Signed PDF</span>
                      <span className="sm:hidden">Download PDF</span>
                    </>
                  )}
                </Button>

                {/* Progress */}
                {isProcessing && (
                  <Progress value={progress} className="w-full mt-2" />
                )}

                {/* Error Display */}
                {error && (
                  <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg mt-2">
                    <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Draw Your Signature</h3>
              <div className="border border-gray-300 rounded-lg mb-4">
                <canvas
                  ref={signatureCanvasRef}
                  width={400}
                  height={200}
                  className="w-full h-auto cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={clearSignature} variant="outline" className="flex-1">
                  Clear
                </Button>
                <Button onClick={() => setShowSignaturePad(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={saveSignature} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Text Input Modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Add Text</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text-input">Text</Label>
                  <Input
                    id="text-input"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text to add"
                  />
                </div>
                <div>
                  <Label>Font Size: {fontSize}px</Label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={() => setShowTextInput(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={addTextElement} className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white" disabled={!textInput.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
