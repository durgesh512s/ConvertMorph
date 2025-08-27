'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { 
  RotateCw, 
  RotateCcw, 
  Undo, 
  Redo, 
  Download, 
  Trash2,
  GripVertical,
  FileText,
  Keyboard
} from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { Progress } from '@/components/Progress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { newJobId } from '@/lib/jobs/id'
import { names } from '@/lib/names'
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface PageData {
  id: string
  pageNumber: number
  rotation: number
  thumbnail: string
  width: number
  height: number
}

interface HistoryState {
  pages: PageData[]
  timestamp: number
}

interface SortablePageProps {
  page: PageData
  index: number
  onRotate: (pageId: string, direction: 'cw' | 'ccw') => void
  isProcessing: boolean
}

// Simple Badge component since we don't have it in shadcn/ui
function Badge({ children, variant = 'default', className = '' }: { 
  children: React.ReactNode
  variant?: 'default' | 'secondary'
  className?: string 
}) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  const variantClasses = variant === 'secondary' 
    ? 'bg-gray-100 text-gray-800' 
    : 'bg-blue-100 text-blue-800'
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}

function SortablePage({ page, index, onRotate, isProcessing }: SortablePageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'z-50' : ''}`}
    >
      <Card className="overflow-hidden border-2 border-dashed border-transparent hover:border-blue-300 transition-colors">
        <CardContent className="p-3">
          <div className="relative">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="absolute top-1 left-1 z-10 p-1 bg-white/90 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Drag page ${page.pageNumber}`}
            >
              <GripVertical className="w-4 h-4 text-gray-600" />
            </div>

            {/* Page Number Badge */}
            <Badge 
              variant="secondary" 
              className="absolute top-1 right-1 z-10 text-xs"
            >
              {index + 1}
            </Badge>

            {/* Thumbnail */}
            <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden mb-2">
              <img
                src={page.thumbnail}
                alt={`Page ${page.pageNumber}`}
                className="w-full h-full object-contain"
                style={{
                  transform: `rotate(${page.rotation}deg)`,
                }}
              />
            </div>

            {/* Rotation Controls */}
            <div className="flex gap-1 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRotate(page.id, 'ccw')}
                disabled={isProcessing}
                className="h-7 px-2"
                aria-label={`Rotate page ${page.pageNumber} counter-clockwise`}
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRotate(page.id, 'cw')}
                disabled={isProcessing}
                className="h-7 px-2"
                aria-label={`Rotate page ${page.pageNumber} clockwise`}
              >
                <RotateCw className="w-3 h-3" />
              </Button>
            </div>

            {/* Original Page Number */}
            <div className="text-xs text-gray-500 text-center mt-1">
              Original: {page.pageNumber}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PDFOrganizeClient() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState<PageData[]>([])
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isLoadingPages, setIsLoadingPages] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  
  const { track } = useAnalytics()
  
  // Local processing state (replacing worker system for now)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Save state to history
  const saveToHistory = useCallback((newPages: PageData[]) => {
    const newState: HistoryState = {
      pages: [...newPages],
      timestamp: Date.now()
    }
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    
    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift()
    } else {
      setHistoryIndex(prev => prev + 1)
    }
    
    setHistory(newHistory)
  }, [history, historyIndex])

  // Generate thumbnails from PDF
  const generateThumbnails = useCallback(async (pdfFile: File) => {
    setIsLoadingPages(true)
    try {
      // Dynamically import PDF.js to avoid SSR issues
      const pdfjsLib = await import('pdfjs-dist')
      
      // Configure PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
      
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const numPages = pdf.numPages
      
      const pagePromises: Promise<PageData>[] = []
      
      for (let i = 1; i <= numPages; i++) {
        pagePromises.push(
          (async () => {
            const page = await pdf.getPage(i)
            const viewport = page.getViewport({ scale: 0.5 })
            
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')!
            canvas.height = viewport.height
            canvas.width = viewport.width
            
            await page.render({
              canvasContext: context,
              viewport: viewport,
              canvas: canvas
            }).promise
            
            return {
              id: `page-${i}`,
              pageNumber: i,
              rotation: 0,
              thumbnail: canvas.toDataURL('image/jpeg', 0.8),
              width: viewport.width,
              height: viewport.height
            }
          })()
        )
      }
      
      const newPages = await Promise.all(pagePromises)
      setPages(newPages)
      
      // Initialize history
      setHistory([{
        pages: [...newPages],
        timestamp: Date.now()
      }])
      setHistoryIndex(0)
      
      track('pdf_organize_loaded', {
        page_count: numPages,
        file_size: pdfFile.size
      })
      
    } catch (error) {
      console.error('Error generating thumbnails:', error)
      toast.error('Failed to load PDF pages')
    } finally {
      setIsLoadingPages(false)
    }
  }, [track])

  // Handle file upload
  const handleFileUpload = useCallback((files: File[]) => {
    const pdfFile = files[0]
    if (!pdfFile) return
    
    setFile(pdfFile)
    
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
    
    generateThumbnails(pdfFile)
  }, [generateThumbnails])

  // Handle file remove
  const handleFileRemove = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setFile(null)
    setPages([])
    setHistory([])
    setHistoryIndex(-1)
  }, [])

  // Handle drag end
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const oldIndex = pages.findIndex(page => page.id === active.id)
      const newIndex = pages.findIndex(page => page.id === over.id)
      
      const newPages = arrayMove(pages, oldIndex, newIndex)
      setPages(newPages)
      saveToHistory(newPages)
      
      track('pdf_organize_reorder', {
        from_position: oldIndex,
        to_position: newIndex
      })
    }
  }, [pages, saveToHistory, track])

  // Handle page rotation
  const handleRotate = useCallback((pageId: string, direction: 'cw' | 'ccw') => {
    const newPages = pages.map(page => {
      if (page.id === pageId) {
        const rotationChange = direction === 'cw' ? 90 : -90
        return {
          ...page,
          rotation: (page.rotation + rotationChange) % 360
        }
      }
      return page
    })
    
    setPages(newPages)
    saveToHistory(newPages)
    
    track('pdf_organize_rotate', {
      direction,
      page_number: pages.find(p => p.id === pageId)?.pageNumber || 0
    })
  }, [pages, saveToHistory, track])

  // Undo/Redo functions
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setPages([...history[newIndex].pages])
      setHistoryIndex(newIndex)
      track('pdf_organize_undo')
    }
  }, [history, historyIndex, track])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setPages([...history[newIndex].pages])
      setHistoryIndex(newIndex)
      track('pdf_organize_redo')
    }
  }, [history, historyIndex, track])

  // Process and download - actual PDF processing implementation
  const handleProcess = useCallback(async () => {
    if (!file || pages.length === 0) return
    
    const jobId = newJobId('organize')
    const startTime = Date.now()
    const originalSizeMb = file.size / (1024 * 1024)
    const rotationsApplied = pages.filter(p => p.rotation !== 0).length
    
    setIsProcessing(true)
    setProgress(0)
    setError(null)
    
    // Track job start
    track('job_start', {
      jobId,
      tool: 'organize',
      fileCount: 1,
      pageCount: pages.length,
      rotationsApplied,
      originalSizeMb
    })
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument, degrees } = await import('pdf-lib')
      
      // Load the original PDF
      const arrayBuffer = await file.arrayBuffer()
      const originalPdf = await PDFDocument.load(arrayBuffer)
      
      // Create new PDF document
      const newPdf = await PDFDocument.create()
      
      setProgress(20)
      
      // Copy pages in the new order with rotations
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const originalPageIndex = page.pageNumber - 1
        
        // Copy the page from original PDF
        const [copiedPage] = await newPdf.copyPages(originalPdf, [originalPageIndex])
        
        // Apply rotation if needed
        if (page.rotation !== 0) {
          copiedPage.setRotation(degrees(page.rotation))
        }
        
        // Add the page to new PDF
        newPdf.addPage(copiedPage)
        
        // Update progress
        setProgress(20 + (i / pages.length) * 70)
      }
      
      setProgress(90)
      
      // Generate the PDF bytes
      const pdfBytes = await newPdf.save()
      const resultSizeMb = pdfBytes.length / (1024 * 1024)
      
      setProgress(100)
      
      // Use names helper for filename
      const filename = names.organize(file.name)
      
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
      
      toast.success('PDF organized and downloaded successfully!')
      
      // Track successful completion
      track('job_success', {
        jobId,
        tool: 'organize',
        durationMs,
        pageCount: pages.length,
        rotationsApplied,
        originalSizeMb,
        resultSizeMb
      })
      
    } catch (error) {
      console.error('Error processing PDF:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const durationMs = Date.now() - startTime
      
      setError(errorMessage)
      toast.error('Failed to organize PDF')
      
      // Track error
      track('job_error', {
        jobId,
        tool: 'organize',
        error: errorMessage,
        durationMs,
        pageCount: pages.length
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }, [file, pages, track])

  // Reset function
  const handleReset = useCallback(() => {
    setFile(null)
    setPages([])
    setHistory([])
    setHistoryIndex(-1)
    setUploadedFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        if (pages.length > 0) {
          handleProcess()
        }
      } else if (e.key === '?') {
        e.preventDefault()
        setShowKeyboardHelp(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, handleProcess, pages.length])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

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

      {/* Loading State */}
      {isLoadingPages && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading PDF pages...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      {pages.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{file?.name}</span>
                <Badge variant="secondary">{pages.length} pages</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={!canUndo || isProcessing}
                  className="flex items-center space-x-1"
                >
                  <Undo className="w-4 h-4" />
                  <span>Undo</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={!canRedo || isProcessing}
                  className="flex items-center space-x-1"
                >
                  <Redo className="w-4 h-4" />
                  <span>Redo</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                  className="flex items-center space-x-1"
                >
                  <Keyboard className="w-4 h-4" />
                  <span>Help</span>
                </Button>
                
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
                
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || pages.length === 0}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Organized PDF</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keyboard Help Modal */}
      {showKeyboardHelp && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl/Cmd + Z</kbd> Undo</div>
              <div><kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl/Cmd + Y</kbd> Redo</div>
              <div><kbd className="px-2 py-1 bg-white rounded text-xs">Ctrl/Cmd + D</kbd> Download</div>
              <div><kbd className="px-2 py-1 bg-white rounded text-xs">?</kbd> Toggle this help</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <Progress 
              value={progress} 
              className="mb-2" 
            />
            <p className="text-sm text-gray-600 text-center">
              Organizing PDF... {Math.round(progress)}%
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pages Grid */}
      {pages.length > 0 && !isLoadingPages && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {pages.map((page, index) => (
                <SortablePage
                  key={page.id}
                  page={page}
                  index={index}
                  onRotate={handleRotate}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
