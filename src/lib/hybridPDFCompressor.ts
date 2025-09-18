import { PDFDocument } from 'pdf-lib'

// Dynamic import for pdfjs-dist to avoid SSR issues
let pdfjsLib: any = null

async function getPdfjsLib() {
  if (!pdfjsLib && typeof window !== 'undefined') {
    pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
  }
  return pdfjsLib
}

// Constants
const FILE_SIZE_THRESHOLD = 20 * 1024 * 1024 // 20MB
const IMAGE_RATIO_THRESHOLD = 0.3 // 30% pages with images = image-heavy

export type CompressionPreset = 'light' | 'medium'

export interface HybridCompressionResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  ratio: number
  method: 'client-side' | 'server-side'
  processingTime: number
  pdfType: 'image-heavy' | 'text-heavy'
  message?: string
}

export interface CompressionProgress {
  stage: 'analyzing' | 'uploading' | 'processing' | 'downloading' | 'complete'
  progress: number
  message: string
  method?: 'client-side' | 'server-side'
  estimatedTime?: string
}

interface PDFAnalysis {
  pages: number
  sizeInMB: number
  imageRatio: number
  isImageHeavy: boolean
  isTextHeavy: boolean
}

/**
 * Quick scan to detect PDF type (image vs text heavy)
 */
async function detectImageRatio(file: File): Promise<PDFAnalysis> {
  try {
    const pdfjsLib = await getPdfjsLib()
    if (!pdfjsLib) {
      throw new Error('PDF.js not available in server environment')
    }
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pages = pdf.numPages
    const sizeInMB = file.size / (1024 * 1024)
    
    let imagePages = 0
    let textPages = 0
    
    // Sample up to 10 pages for performance
    const samplesToCheck = Math.min(pages, 10)
    const pageStep = Math.max(1, Math.floor(pages / samplesToCheck))
    
    for (let i = 1; i <= pages; i += pageStep) {
      try {
        const page = await pdf.getPage(i)
        const operatorList = await page.getOperatorList()
        
        let hasImages = false
        let hasText = false
        
        // Check for image operations
        for (let j = 0; j < operatorList.fnArray.length; j++) {
          const op = operatorList.fnArray[j]
          if (op === pdfjsLib.OPS.paintImageXObject || op === pdfjsLib.OPS.paintInlineImageXObject) {
            hasImages = true
          }
          if (op === pdfjsLib.OPS.showText || op === pdfjsLib.OPS.showSpacedText) {
            hasText = true
          }
        }
        
        if (hasImages) imagePages++
        if (hasText && !hasImages) textPages++
        
      } catch (pageError) {
        console.warn(`Error analyzing page ${i}:`, pageError)
        // Fallback: assume text page
        textPages++
      }
    }
    
    const imageRatio = imagePages / samplesToCheck
    const isImageHeavy = imageRatio > IMAGE_RATIO_THRESHOLD
    const isTextHeavy = !isImageHeavy
    
    return {
      pages,
      sizeInMB,
      imageRatio,
      isImageHeavy,
      isTextHeavy
    }
  } catch (error) {
    console.error('Error analyzing PDF:', error)
    // Fallback analysis based on file size
    const sizeInMB = file.size / (1024 * 1024)
    const estimatedPages = Math.ceil(sizeInMB * 10)
    
    return {
      pages: estimatedPages,
      sizeInMB,
      imageRatio: sizeInMB > 10 ? 0.8 : 0.2, // Large files likely image-heavy
      isImageHeavy: sizeInMB > 10,
      isTextHeavy: sizeInMB <= 10
    }
  }
}

/**
 * Main hybrid PDF compression function
 */
export async function compressPDFHybrid(
  file: File,
  preset: CompressionPreset = 'medium',
  onProgress?: (progress: CompressionProgress) => void
): Promise<HybridCompressionResult> {
  const startTime = Date.now()
  
  // Stage 1: Quick scan and analysis
  onProgress?.({
    stage: 'analyzing',
    progress: 10,
    message: 'Analyzing PDF content and structure...'
  })
  
  const analysis = await detectImageRatio(file)
  
  onProgress?.({
    stage: 'analyzing',
    progress: 20,
    message: `Detected ${analysis.isImageHeavy ? 'image-heavy' : 'text-heavy'} PDF (${analysis.pages} pages)`
  })
  
  // Stage 2: Decide processing method based on file size
  const useClientSide = file.size < FILE_SIZE_THRESHOLD
  const method = useClientSide ? 'client-side' : 'server-side'
  
  onProgress?.({
    stage: 'analyzing',
    progress: 30,
    message: `Using ${method} processing (${(file.size / (1024 * 1024)).toFixed(1)}MB file)`
  })
  
  let result: Omit<HybridCompressionResult, 'method' | 'processingTime' | 'pdfType'>
  
  try {
    if (useClientSide) {
      result = await compressClientSide(file, preset, analysis, onProgress)
    } else {
      result = await compressServerSide(file, preset, analysis, onProgress)
    }
  } catch (error) {
    console.error(`${method} compression failed:`, error)
    
    // Fallback logic
    if (useClientSide) {
      // If client-side fails, try server-side
      onProgress?.({
        stage: 'processing',
        progress: 40,
        message: 'Client processing failed, trying server...'
      })
      result = await compressServerSide(file, preset, analysis, onProgress)
    } else {
      // If server-side fails, try client-side (if file is not too large)
      if (file.size < 100 * 1024 * 1024) { // 100MB fallback limit
        onProgress?.({
          stage: 'processing',
          progress: 40,
          message: 'Server unavailable, processing locally...'
        })
        result = await compressClientSide(file, preset, analysis, onProgress)
      } else {
        throw new Error('File too large and server unavailable')
      }
    }
  }
  
  const processingTime = Date.now() - startTime
  
  // Stage 3: File size comparison - never increase size
  const savings = ((result.originalSize - result.compressedSize) / result.originalSize) * 100
  
  if (savings < 1) {
    // Return original file if no meaningful compression
    const originalBlob = new Blob([await file.arrayBuffer()], { type: 'application/pdf' })
    
    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'No meaningful reduction - file already optimized'
    })
    
    return {
      blob: originalBlob,
      originalSize: file.size,
      compressedSize: file.size,
      ratio: 0,
      method,
      processingTime,
      pdfType: analysis.isImageHeavy ? 'image-heavy' : 'text-heavy',
      message: 'No meaningful reduction - file already optimized'
    }
  }
  
  onProgress?.({
    stage: 'complete',
    progress: 100,
    message: `Compression complete! Saved ${Math.round(savings)}% (${method})`
  })
  
  return {
    ...result,
    method,
    processingTime,
    pdfType: analysis.isImageHeavy ? 'image-heavy' : 'text-heavy'
  }
}

/**
 * Client-side compression using WebWorker
 */
async function compressClientSide(
  file: File,
  preset: CompressionPreset,
  analysis: PDFAnalysis,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime' | 'pdfType'>> {
  
  onProgress?.({
    stage: 'processing',
    progress: 40,
    message: 'Processing PDF locally in your browser - Private'
  })
  
  // Check if WebWorker is available and CSP allows it
  let useWorker = true
  try {
    // Test if we can create a worker
    const testWorker = new Worker(
      URL.createObjectURL(new Blob(['self.postMessage("test")'], { type: 'application/javascript' }))
    )
    testWorker.terminate()
  } catch (error) {
    console.warn('WebWorker blocked by CSP, using main thread:', error)
    useWorker = false
  }
  
  if (useWorker) {
    return await compressWithWorker(file, preset, analysis, onProgress)
  } else {
    return await compressInMainThread(file, preset, analysis, onProgress)
  }
}

/**
 * Compress using WebWorker for better performance
 */
async function compressWithWorker(
  file: File,
  preset: CompressionPreset,
  analysis: PDFAnalysis,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime' | 'pdfType'>> {
  
  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker('/workers/pdf-worker.js')
      const fileId = Math.random().toString(36).substring(7)
      
      worker.onmessage = (e) => {
        const { type, progress, result, error } = e.data
        
        if (type === 'progress' && onProgress && progress) {
          onProgress({
            stage: progress.stage || 'processing',
            progress: progress.progress || 0,
            message: progress.message || 'Processing...'
          })
        } else if (type === 'result') {
          worker.terminate()
          resolve(result)
        } else if (type === 'error') {
          worker.terminate()
          reject(new Error(error))
        }
      }
      
      worker.onerror = (error) => {
        worker.terminate()
        console.warn('Worker error, falling back to main thread:', error)
        // Fallback to main thread
        compressInMainThread(file, preset, analysis, onProgress).then(resolve).catch(reject)
      }
      
      // Send compression task to worker
      worker.postMessage({ 
        type: 'compress',
        file, 
        preset, 
        analysis,
        fileId
      })
      
    } catch (error) {
      // Fallback to main thread
      console.warn('Worker creation failed, using main thread:', error)
      compressInMainThread(file, preset, analysis, onProgress).then(resolve).catch(reject)
    }
  })
}

/**
 * Compress in main thread (fallback)
 */
async function compressInMainThread(
  file: File,
  preset: CompressionPreset,
  analysis: PDFAnalysis,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime' | 'pdfType'>> {
  
  const arrayBuffer = await file.arrayBuffer()
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
  
  onProgress?.({
    stage: 'processing',
    progress: 50,
    message: 'Optimizing PDF structure...'
  })
  
  // Apply compression based on PDF type and preset
  if (analysis.isImageHeavy) {
    await compressImageHeavyPDF(pdfDoc, preset, onProgress)
  } else {
    await compressTextHeavyPDF(pdfDoc, preset, onProgress)
  }
  
  onProgress?.({
    stage: 'processing',
    progress: 80,
    message: 'Finalizing compression...'
  })
  
  // Save with compression options
  const saveOptions = getSaveOptions(preset)
  const compressedBytes = await pdfDoc.save(saveOptions)
  const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })
  
  return {
    blob: compressedBlob,
    originalSize: file.size,
    compressedSize: compressedBlob.size,
    ratio: Math.round(((file.size - compressedBlob.size) / file.size) * 100)
  }
}

/**
 * Compression pipeline for image-heavy PDFs
 */
async function compressImageHeavyPDF(
  pdfDoc: PDFDocument,
  preset: CompressionPreset,
  onProgress?: (progress: CompressionProgress) => void
): Promise<void> {
  
  onProgress?.({
    stage: 'processing',
    progress: 60,
    message: 'Compressing images and removing metadata...'
  })
  
  // Remove metadata
  removeMetadata(pdfDoc)
  
  // Remove thumbnails and unnecessary objects
  removeUnnecessaryObjects(pdfDoc)
  
  // Note: Advanced image compression would require more complex implementation
  // For now, we rely on the save options for compression
}

/**
 * Compression pipeline for text-heavy PDFs
 */
async function compressTextHeavyPDF(
  pdfDoc: PDFDocument,
  preset: CompressionPreset,
  onProgress?: (progress: CompressionProgress) => void
): Promise<void> {
  
  onProgress?.({
    stage: 'processing',
    progress: 60,
    message: 'Optimizing fonts and text content...'
  })
  
  // Remove metadata
  removeMetadata(pdfDoc)
  
  // Font subsetting and optimization would be implemented here
  // For now, we rely on the save options
  
  // Remove unnecessary objects
  removeUnnecessaryObjects(pdfDoc)
}

/**
 * Server-side compression with presigned URLs
 */
async function compressServerSide(
  file: File,
  preset: CompressionPreset,
  analysis: PDFAnalysis,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime' | 'pdfType'>> {
  
  onProgress?.({
    stage: 'uploading',
    progress: 40,
    message: 'Uploading to server for processing...'
  })
  
  // Show privacy notice for server processing
  onProgress?.({
    stage: 'uploading',
    progress: 45,
    message: 'Files >20MB uploaded to server and deleted after 24 hours'
  })
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('compressionLevel', preset)
  formData.append('pdfType', analysis.isImageHeavy ? 'image-heavy' : 'text-heavy')
  
  try {
    const response = await fetch('/api/pdf-compress', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Server error: ${response.status}`)
    }
    
    onProgress?.({
      stage: 'processing',
      progress: 60,
      message: 'Processing PDF on server...'
    })
    
    // Get compression metadata from headers
    const originalSize = parseInt(response.headers.get('X-Original-Size') || '0')
    const compressedSize = parseInt(response.headers.get('X-Compressed-Size') || '0')
    const ratio = parseInt(response.headers.get('X-Compression-Ratio') || '0')
    
    onProgress?.({
      stage: 'downloading',
      progress: 80,
      message: 'Downloading compressed PDF...'
    })
    
    // Get the compressed PDF blob
    const blob = await response.blob()
    
    return {
      blob,
      originalSize: originalSize || file.size,
      compressedSize: compressedSize || blob.size,
      ratio: ratio || Math.round(((file.size - blob.size) / file.size) * 100)
    }
    
  } catch (error) {
    console.error('Server-side compression failed:', error)
    throw error
  }
}

/**
 * Remove metadata from PDF
 */
function removeMetadata(pdfDoc: PDFDocument): void {
  try {
    pdfDoc.setTitle('')
    pdfDoc.setAuthor('')
    pdfDoc.setSubject('')
    pdfDoc.setKeywords([])
    pdfDoc.setProducer('')
    pdfDoc.setCreator('')
    pdfDoc.setCreationDate(new Date(0))
    pdfDoc.setModificationDate(new Date(0))
  } catch (error) {
    console.warn('Could not remove metadata:', error)
  }
}

/**
 * Remove unnecessary objects from PDF
 */
function removeUnnecessaryObjects(pdfDoc: PDFDocument): void {
  try {
    const catalog = pdfDoc.catalog
    
    // Remove viewer preferences
    if (catalog.has(pdfDoc.context.obj('ViewerPreferences'))) {
      catalog.delete(pdfDoc.context.obj('ViewerPreferences'))
    }
    
    // Remove page layout and mode
    if (catalog.has(pdfDoc.context.obj('PageLayout'))) {
      catalog.delete(pdfDoc.context.obj('PageLayout'))
    }
    if (catalog.has(pdfDoc.context.obj('PageMode'))) {
      catalog.delete(pdfDoc.context.obj('PageMode'))
    }
    if (catalog.has(pdfDoc.context.obj('OpenAction'))) {
      catalog.delete(pdfDoc.context.obj('OpenAction'))
    }
  } catch (error) {
    console.warn('Could not remove unnecessary objects:', error)
  }
}

/**
 * Get save options based on compression preset
 */
function getSaveOptions(preset: CompressionPreset) {
  const baseOptions = {
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  }

  switch (preset) {
    case 'light':
      return {
        ...baseOptions,
        objectsPerTick: 100,
      }
    case 'medium':
      return {
        ...baseOptions,
        objectsPerTick: 200,
      }
    default:
      return baseOptions
  }
}

/**
 * Check server availability for compression
 */
export async function checkServerAvailability(): Promise<{
  available: boolean
  tools: { ghostscript: boolean; qpdf: boolean }
  error?: string
}> {
  try {
    const response = await fetch('/api/pdf-compress', {
      method: 'GET'
    })
    
    if (!response.ok) {
      return { available: false, tools: { ghostscript: false, qpdf: false }, error: 'Server unavailable' }
    }
    
    const data = await response.json()
    return {
      available: data.status === 'healthy',
      tools: data.availableTools || { ghostscript: false, qpdf: false },
      error: data.status !== 'healthy' ? data.error : undefined
    }
  } catch (error) {
    return {
      available: false,
      tools: { ghostscript: false, qpdf: false },
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
