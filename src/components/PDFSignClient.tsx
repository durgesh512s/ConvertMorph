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
  Undo,
  Redo,
  Save,
  Plus
} from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { Progress } from '@/components/Progress'
import { useAnalytics } from '@/hooks/useAnalytics'

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
    
    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument } = await import('pdf-lib')
      
      // Load the original PDF
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      setProgress(20)
      
      // Get all pages
      const pages = pdfDoc.getPages()
      
      // Process each element
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        const page = pages[element.pageIndex]
        
        if (element.type === 'signature') {
          // Convert base64 image to bytes
          const imageBytes = Uint8Array.from(atob(element.content.split(',')[1]), c => c.charCodeAt(0))
          const image = await pdfDoc.embedPng(imageBytes)
          
          // Add signature image to page
          page.drawImage(image, {
            x: element.x,
            y: page.getHeight() - element.y - element.height,
            width: element.width,
            height: element.height,
          })
        } else if (element.type === 'text') {
          // Add text to page
          page.drawText(element.content, {
            x: element.x,
            y: page.getHeight() - element.y - (element.fontSize || 16),
            size: element.fontSize || 16,
          })
        }
        
        // Update progress
        setProgress(20 + (i / elements.length) * 70)
      }
      
      setProgress(90)
      
      // Generate the PDF bytes
      const pdfBytes = await pdfDoc.save()
      
      setProgress(100)
      
      // Create download link
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `signed_${file.name}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success('PDF signed and downloaded successfully!')
      
      track('pdf_sign_success', {
        element_count: elements.length,
        signature_count: elements.filter(el => el.type === 'signature').length,
        text_count: elements.filter(el => el.type === 'text').length,
        file_size: pdfBytes.length
      })
      
    } catch (error) {
      console.error('Error signing PDF:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMessage)
      toast.error('Failed to sign PDF')
      track('pdf_sign_error', {
        error: errorMessage
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
          maxSize={25 * 1024 * 1024} // 25MB
        />
      )}

      {/* PDF Viewer & Editor */}
      {file && pdfPages.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* PDF Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-gray-500">
                        Page {currentPage + 1} of {pdfPages.length}
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

                {/* Page Navigation */}
                {pdfPages.length > 1 && (
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      {currentPage + 1} / {pdfPages.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(pdfPages.length - 1, currentPage + 1))}
                      disabled={currentPage === pdfPages.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* PDF Page Display */}
                <div 
                  ref={pdfContainerRef}
                  className="relative border border-gray-300 rounded-lg overflow-hidden bg-white"
                  style={{ maxHeight: '600px', overflow: 'auto' }}
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
                        .map(element => (
                          <div
                            key={element.id}
                            className="absolute border-2 border-blue-500 bg-blue-50 bg-opacity-50 cursor-pointer group"
                            style={{
                              left: `${element.x}px`,
                              top: `${element.y}px`,
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                            }}
                            onClick={() => removeElement(element.id)}
                          >
                            <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {element.type === 'signature' ? 'Signature' : 'Text'} - Click to remove
                            </div>
                            {element.type === 'text' && (
                              <div 
                                className="w-full h-full flex items-center justify-center text-black"
                                style={{ fontSize: `${(element.fontSize || 16) * 0.8}px` }}
                              >
                                {element.content}
                              </div>
                            )}
                            {element.type === 'signature' && (
                              <img 
                                src={element.content} 
                                alt="Signature" 
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="space-y-4">
            {/* Add Signature */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Add Signature
                </h3>
                <Button
                  onClick={() => setShowSignaturePad(true)}
                  className="w-full"
                  variant="outline"
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
                  className="w-full"
                  variant="outline"
                >
                  <Type className="w-4 h-4 mr-2" />
                  Add Text
                </Button>
              </CardContent>
            </Card>

            {/* Elements List */}
            {elements.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Elements ({elements.length})</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {elements.map(element => (
                      <div key={element.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          {element.type === 'signature' ? '✍️ Signature' : '📝 Text'} 
                          {element.pageIndex !== currentPage && ` (Page ${element.pageIndex + 1})`}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeElement(element.id)}
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
              <CardContent className="p-4">
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || elements.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Signed PDF
                    </>
                  )}
                </Button>

                {/* Progress */}
                {isProcessing && (
                  <Progress value={progress} className="w-full mt-2" />
                )}

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-2">
                    <p className="text-red-700 text-sm">{error}</p>
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
                <Button onClick={saveSignature} className="flex-1">
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
                <Button onClick={addTextElement} className="flex-1" disabled={!textInput.trim()}>
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
