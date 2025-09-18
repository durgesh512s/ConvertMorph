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
import { generateFileId, generateSignatureId, generateTextId } from '@/lib/id-utils'

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
      id: generateFileId(),
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


  // Save signature from canvas
  const saveSignature = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const dataURL = canvas.toDataURL('image/png')
    
    // Calculate much larger default size for better visibility
    const currentPageData = pdfPages[currentPage]
    const defaultWidth = currentPageData ? Math.min(400, currentPageData.width * 0.5) : 400
    const defaultHeight = currentPageData ? Math.min(200, currentPageData.height * 0.25) : 200
    
    const element: SignatureElement = {
      id: generateSignatureId(),
      type: 'signature',
      content: dataURL,
      x: 50,
      y: 50,
      width: defaultWidth,
      height: defaultHeight,
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
    
    // Calculate much larger default size for better visibility
    const currentPageData = pdfPages[currentPage]
    const baseWidth = Math.max(textInput.length * (fontSize * 1.2), fontSize * 6) // Minimum 6 characters width, more generous multiplier
    const defaultWidth = currentPageData ? Math.min(baseWidth, currentPageData.width * 0.7) : baseWidth
    const defaultHeight = fontSize * 2 // Much more generous height
    
    const element: SignatureElement = {
      id: generateTextId(),
      type: 'text',
      content: textInput,
      x: 50,
      y: 50,
      width: defaultWidth,
      height: defaultHeight,
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

  // Drag and drop handlers - Support both mouse and touch events
  const getPointerPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0]
      if (!touch) {
        return { clientX: 0, clientY: 0 }
      }
      return {
        clientX: touch.clientX,
        clientY: touch.clientY
      }
    } else {
      // Mouse event
      return {
        clientX: e.clientX,
        clientY: e.clientY
      }
    }
  }

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent, elementId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const element = elements.find(el => el.id === elementId)
    if (!element || !pdfContainerRef.current) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    const { clientX, clientY } = getPointerPosition(e)
    
    // Calculate scale factor for current display
    const canvas = pdfContainerRef.current.querySelector('canvas')
    const currentPageData = pdfPages[currentPage]
    if (!canvas || !currentPageData) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate display position of element
    const displayX = element.x * scaleX
    const displayY = element.y * scaleY
    
    // Calculate offset from pointer to element's top-left corner in display coordinates
    const offsetX = clientX - rect.left - displayX
    const offsetY = clientY - rect.top - displayY
    
    setDraggedElement(elementId)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    handlePointerDown(e, elementId)
  }

  const handleTouchStart = (e: React.TouchEvent, elementId: string) => {
    handlePointerDown(e, elementId)
  }

  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggedElement || !pdfContainerRef.current) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    const { clientX, clientY } = getPointerPosition(e)
    
    // Get current page dimensions for boundary checking
    const currentPageData = pdfPages[currentPage]
    if (!currentPageData) return
    
    // Calculate scale factor
    const canvas = pdfContainerRef.current.querySelector('canvas')
    if (!canvas) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate new position in display coordinates
    const displayX = clientX - rect.left - dragOffset.x
    const displayY = clientY - rect.top - dragOffset.y
    
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handlePointerMove(e)
  }, [handlePointerMove])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault() // Prevent scrolling while dragging
    handlePointerMove(e)
  }, [handlePointerMove])

  const handlePointerUp = useCallback(() => {
    setDraggedElement(null)
    setDragOffset({ x: 0, y: 0 })
    setResizingElement(null)
    setResizeHandle(null)
    setInitialSize({ width: 0, height: 0 })
  }, [])

  const handleMouseUp = useCallback(() => {
    handlePointerUp()
  }, [handlePointerUp])

  const handleTouchEnd = useCallback(() => {
    handlePointerUp()
  }, [handlePointerUp])

  // Resize handlers - Support both mouse and touch events
  const handleResizePointerStart = (e: React.MouseEvent | React.TouchEvent, elementId: string, handle: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const element = elements.find(el => el.id === elementId)
    if (!element) return
    
    setResizingElement(elementId)
    setResizeHandle(handle)
    setInitialSize({ width: element.width, height: element.height })
  }

  const handleResizeStart = (e: React.MouseEvent, elementId: string, handle: string) => {
    handleResizePointerStart(e, elementId, handle)
  }

  const handleResizeTouchStart = (e: React.TouchEvent, elementId: string, handle: string) => {
    handleResizePointerStart(e, elementId, handle)
  }

  const handleResizePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!resizingElement || !resizeHandle || !pdfContainerRef.current) return
    
    const element = elements.find(el => el.id === resizingElement)
    if (!element) return
    
    const rect = pdfContainerRef.current.getBoundingClientRect()
    const { clientX, clientY } = getPointerPosition(e)
    const currentPageData = pdfPages[currentPage]
    if (!currentPageData) return
    
    const canvas = pdfContainerRef.current.querySelector('canvas')
    if (!canvas) return
    
    const scaleX = canvas.offsetWidth / currentPageData.width
    const scaleY = canvas.offsetHeight / currentPageData.height
    
    // Calculate pointer position relative to element's top-left corner
    const pointerX = (clientX - rect.left) / scaleX
    const pointerY = (clientY - rect.top) / scaleY
    
    let newWidth = element.width
    let newHeight = element.height
    let newX = element.x
    let newY = element.y
    
    // Calculate new dimensions and positions based on resize handle
    if (resizeHandle.includes('right')) {
      newWidth = Math.max(30, pointerX - element.x)
    }
    if (resizeHandle.includes('bottom')) {
      newHeight = Math.max(20, pointerY - element.y)
    }
    if (resizeHandle.includes('left')) {
      const minWidth = 30
      const maxX = element.x + element.width - minWidth
      newX = Math.min(pointerX, maxX)
      newWidth = element.x + element.width - newX
    }
    if (resizeHandle.includes('top')) {
      const minHeight = 20
      const maxY = element.y + element.height - minHeight
      newY = Math.min(pointerY, maxY)
      newHeight = element.y + element.height - newY
    }
    
    // For text elements, maintain a reasonable aspect ratio but allow more flexibility
    if (element.type === 'text') {
      // Don't maintain strict aspect ratio for text - allow free resizing
      // Just ensure minimum dimensions
      newWidth = Math.max(50, newWidth)
      newHeight = Math.max(20, newHeight)
    } else if (resizeHandle.includes('corner')) {
      // Maintain aspect ratio for corner handles on signatures only
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
          const updatedElement = { ...el, x: newX, y: newY, width: newWidth, height: newHeight }
          
          // For text elements, update font size proportionally based on height change
          if (el.type === 'text' && el.fontSize) {
            // Use a more aggressive scaling factor for better visual feedback
            const heightScaleFactor = newHeight / el.height
            const widthScaleFactor = newWidth / el.width
            // Use the average of both scale factors for more balanced scaling
            const avgScaleFactor = (heightScaleFactor + widthScaleFactor) / 2
            const newFontSize = Math.max(8, Math.min(72, el.fontSize * avgScaleFactor))
            updatedElement.fontSize = Math.round(newFontSize) // Round for cleaner values
          }
          
          return updatedElement
        }
        return el
      }))
    })
  }, [resizingElement, resizeHandle, initialSize, pdfPages, currentPage, elements])

  const handleResizeMove = useCallback((e: MouseEvent) => {
    handleResizePointerMove(e)
  }, [handleResizePointerMove])

  const handleResizeTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault() // Prevent scrolling while resizing
    handleResizePointerMove(e)
  }, [handleResizePointerMove])

  // Add global touch event listeners for dragging and resizing
  useEffect(() => {
    if (draggedElement) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
    
    return () => {
      // Cleanup function for when draggedElement is null
    }
  }, [draggedElement, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    if (resizingElement) {
      document.addEventListener('touchmove', handleResizeTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('touchmove', handleResizeTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
    
    return () => {
      // Cleanup function for when resizingElement is null
    }
  }, [resizingElement, handleResizeTouchMove, handleTouchEnd])

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
    
    return () => {
      // Cleanup function for when draggedElement is null
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
    
    return () => {
      // Cleanup function for when resizingElement is null
    }
  }, [resizingElement, handleResizeMove, handleMouseUp])

  // Enhanced canvas drawing with smooth lines and better touch support
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)
  const [drawingPath, setDrawingPath] = useState<{ x: number; y: number }[]>([])

  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0]
      if (!touch) {
        return { x: 0, y: 0 }
      }
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      }
    } else {
      // Mouse event
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const { x, y } = getEventPosition(e)
    
    // Set up drawing context for smooth lines
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.globalCompositeOperation = 'source-over'
    
    // Start new path
    ctx.beginPath()
    ctx.moveTo(x, y)
    
    setLastPoint({ x, y })
    setDrawingPath([{ x, y }])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing || !lastPoint) return
    
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const { x, y } = getEventPosition(e)
    
    // Calculate distance for smooth drawing
    const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2))
    
    // Only draw if moved enough distance (reduces jitter)
    if (distance > 1) {
      // Use quadratic curves for smoother lines
      const midX = (lastPoint.x + x) / 2
      const midY = (lastPoint.y + y) / 2
      
      ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midX, midY)
      ctx.stroke()
      
      setLastPoint({ x, y })
      setDrawingPath(prev => [...prev, { x, y }])
    }
  }

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e) e.preventDefault()
    if (!isDrawing) return
    
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Finish the current stroke
    ctx.stroke()
    ctx.closePath()
    
    setIsDrawing(false)
    setLastPoint(null)
    setDrawingPath([])
  }

  // Enhanced clear signature function
  const clearSignature = () => {
    const canvas = signatureCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Reset drawing state
        setIsDrawing(false)
        setLastPoint(null)
        setDrawingPath([])
      }
    }
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
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      
      setProgress(20)
      
      // Get all pages
      const pages = pdfDoc.getPages()
      const pageCount = pages.length
      
      // Process each element
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (!element) continue
        
        const page = pages[element.pageIndex]
        if (!page) continue
        
        // CRITICAL: Convert coordinates properly accounting for canvas scale and coordinate systems
        // Elements are stored in canvas coordinates (1.5x scaled, top-left origin)
        // Need to convert to PDF coordinates (1x scale, bottom-left origin)
        const CANVAS_SCALE = 1.5
        
        // Get the actual PDF page dimensions (not the canvas dimensions)
        const pageWidth = page.getWidth()
        const pageHeight = page.getHeight()
        
        // Convert from canvas coordinates to actual PDF coordinates
        const actualX = element.x / CANVAS_SCALE
        const actualY = element.y / CANVAS_SCALE
        const actualWidth = element.width / CANVAS_SCALE
        const actualHeight = element.height / CANVAS_SCALE
        const actualFontSize = (element.fontSize || 16) / CANVAS_SCALE
        
        if (element.type === 'signature') {
          // Convert base64 image to bytes
          const contentParts = element.content.split(',')
          const base64Data = contentParts[1]
          if (!base64Data) continue
          
          const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
          const image = await pdfDoc.embedPng(imageBytes)
          
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
          // Convert coordinates from canvas coordinate system (top-left origin) 
          // to PDF coordinate system (bottom-left origin)
          // For text, we need to position the baseline correctly
          // The text element's Y position in canvas is the top of the text box
          // In PDF coordinates, we need to position the baseline (bottom of text)
          const pdfX = actualX
          const pdfY = pageHeight - actualY - actualFontSize // Position baseline at bottom of element
          
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
    <div className="relative space-y-6">
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
                              className={`absolute border-2 bg-opacity-50 group select-none touch-manipulation ${
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
                              onTouchStart={(e) => handleTouchStart(e, element.id)}
                              onDoubleClick={() => removeElement(element.id)}
                            >
                              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {element.type === 'signature' ? '✍️ Signature' : '📝 Text'} - Drag to move, resize handles to resize, double-click to remove
                              </div>
                              
                              {/* Resize Handles - Larger for mobile touch */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Corner handles - Larger for mobile */}
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-nw-resize -top-2 -left-2 sm:-top-1 sm:-left-1 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-top-left')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'corner-top-left')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-ne-resize -top-2 -right-2 sm:-top-1 sm:-right-1 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-top-right')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'corner-top-right')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-sw-resize -bottom-2 -left-2 sm:-bottom-1 sm:-left-1 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-bottom-left')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'corner-bottom-left')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-se-resize -bottom-2 -right-2 sm:-bottom-1 sm:-right-1 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'corner-bottom-right')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'corner-bottom-right')}
                                />
                                
                                {/* Edge handles - Larger for mobile */}
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-n-resize -top-2 sm:-top-1 left-1/2 transform -translate-x-1/2 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'top')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'top')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-s-resize -bottom-2 sm:-bottom-1 left-1/2 transform -translate-x-1/2 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'bottom')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'bottom')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-w-resize -left-2 sm:-left-1 top-1/2 transform -translate-y-1/2 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'left')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'left')}
                                />
                                <div
                                  className="absolute w-4 h-4 sm:w-3 sm:h-3 bg-blue-600 border border-white rounded-sm cursor-e-resize -right-2 sm:-right-1 top-1/2 transform -translate-y-1/2 touch-manipulation"
                                  onMouseDown={(e) => handleResizeStart(e, element.id, 'right')}
                                  onTouchStart={(e) => handleResizeTouchStart(e, element.id, 'right')}
                                />
                              </div>
                              {element.type === 'text' && (
                                <div 
                                  className="w-full h-full flex items-center justify-center text-black pointer-events-none overflow-hidden"
                                  style={{ 
                                    fontSize: `${(element.fontSize || 16) * scaleX}px`,
                                    lineHeight: '1.2',
                                    wordBreak: 'break-word'
                                  }}
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
            {/* Mobile: Inline components */}
            <div className="space-y-3 lg:hidden">
              {/* Add Signature */}
              <Card>
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <PenTool className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Signature</span>
                    <span className="sm:hidden">Signature</span>
                  </h3>
                  {!showSignaturePad ? (
                    <Button
                      onClick={() => setShowSignaturePad(true)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm"
                      size="sm"
                    >
                      <PenTool className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Draw Signature</span>
                      <span className="sm:hidden">Draw</span>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="border border-gray-300 rounded-lg">
                        <canvas
                          ref={signatureCanvasRef}
                          width={280}
                          height={120}
                          className="w-full h-auto cursor-crosshair rounded-lg"
                          style={{ touchAction: 'none' }}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                        />
                      </div>
                      <div className="flex space-x-1">
                        <Button onClick={clearSignature} variant="outline" size="sm" className="flex-1 text-xs">
                          Clear
                        </Button>
                        <Button onClick={() => setShowSignaturePad(false)} variant="outline" size="sm" className="flex-1 text-xs">
                          Cancel
                        </Button>
                        <Button onClick={saveSignature} size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs">
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add Text */}
              <Card>
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Type className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Text</span>
                    <span className="sm:hidden">Text</span>
                  </h3>
                  {!showTextInput ? (
                    <Button
                      onClick={() => setShowTextInput(true)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm"
                      size="sm"
                    >
                      <Type className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Add Text</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="mobile-text-input" className="text-xs">Text</Label>
                        <Input
                          id="mobile-text-input"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Enter text to add"
                          className="mt-1 text-sm"
                        />
                      </div>
                        <div>
                          <Label className="text-xs">Font Size: {fontSize}px</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <input
                              type="range"
                              min="12"
                              max="48"
                              step="1"
                              value={fontSize}
                              onChange={(e) => setFontSize(Number(e.target.value))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <Input
                              type="number"
                              min="12"
                              max="48"
                              step="1"
                              value={fontSize}
                              onChange={(e) => {
                                const value = Number(e.target.value)
                                if (value >= 12 && value <= 48) {
                                  setFontSize(value)
                                }
                              }}
                              className="w-12 text-xs"
                            />
                          </div>
                        </div>
                      <div className="flex space-x-1">
                        <Button onClick={() => setShowTextInput(false)} variant="outline" size="sm" className="flex-1 text-xs">
                          Cancel
                        </Button>
                        <Button onClick={addTextElement} size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white text-xs" disabled={!textInput.trim()}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
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
                  {!showSignaturePad ? (
                    <Button
                      onClick={() => setShowSignaturePad(true)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Draw Signature
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="border border-gray-300 rounded-lg">
                        <canvas
                          ref={signatureCanvasRef}
                          width={280}
                          height={140}
                          className="w-full h-auto cursor-crosshair rounded-lg"
                          style={{ touchAction: 'none' }}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={clearSignature} variant="outline" size="sm" className="flex-1">
                          Clear
                        </Button>
                        <Button onClick={() => setShowSignaturePad(false)} variant="outline" size="sm" className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={saveSignature} size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add Text */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Add Text
                  </h3>
                  {!showTextInput ? (
                    <Button
                      onClick={() => setShowTextInput(true)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      <Type className="w-4 h-4 mr-2" />
                      Add Text
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="text-input" className="text-sm">Text</Label>
                        <Input
                          id="text-input"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Enter text to add"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Font Size: {fontSize}px</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="range"
                            min="12"
                            max="48"
                            step="1"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <Input
                            type="number"
                            min="12"
                            max="48"
                            step="1"
                            value={fontSize}
                            onChange={(e) => {
                              const value = Number(e.target.value)
                              if (value >= 12 && value <= 48) {
                                setFontSize(value)
                              }
                            }}
                            className="w-16 text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => setShowTextInput(false)} variant="outline" size="sm" className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={addTextElement} size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white" disabled={!textInput.trim()}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Added Items List */}
            {elements.length > 0 && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Added Items ({elements.length})</h3>
                  <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                    {elements.map(element => (
                      <div key={element.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs sm:text-sm">
                        <span className="truncate text-gray-900 dark:text-gray-100">
                          {element.type === 'signature' ? '✍️ Signature' : '📝 Text'} 
                          {element.pageIndex !== currentPage && ` (Page ${element.pageIndex + 1})`}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeElement(element.id)}
                          className="p-1 h-auto hover:bg-gray-200 dark:hover:bg-gray-600"
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

    </div>
  )
}
