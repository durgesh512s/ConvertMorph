import { 
  analyzePDFFile, 
  chooseCompressionMethod, 
  getCompressionMethodExplanation,
  validateCompressionMethod,
  type CompressionMethod,
  type CompressionLevel 
} from './pdfCompressionRouter'

export interface HybridCompressionResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  ratio: number
  method: CompressionMethod
  processingTime: number
}

export interface CompressionProgress {
  stage: 'analyzing' | 'uploading' | 'processing' | 'downloading' | 'complete'
  progress: number
  message: string
  method?: CompressionMethod
  estimatedTime?: string
}

/**
 * Hybrid PDF compression that intelligently chooses between client-side and server-side processing
 */
export async function compressPDFHybrid(
  file: File,
  level: CompressionLevel = 'medium',
  userPreference?: 'privacy' | 'performance' | 'quality' | 'auto',
  onProgress?: (progress: CompressionProgress) => void
): Promise<HybridCompressionResult> {
  const startTime = Date.now()
  
  // Stage 1: Analyze file
  onProgress?.({
    stage: 'analyzing',
    progress: 10,
    message: 'Analyzing PDF file characteristics...'
  })
  
  const analysis = await analyzePDFFile(file)
  const decision = chooseCompressionMethod(analysis, userPreference)
  const validation = validateCompressionMethod(analysis, decision.method)
  
  if (!validation.valid) {
    throw new Error(validation.warning || 'File not suitable for compression')
  }
  
  onProgress?.({
    stage: 'analyzing',
    progress: 20,
    message: `Selected ${decision.method} processing`,
    method: decision.method,
    estimatedTime: decision.estimatedTime
  })
  
  let baseResult: Omit<HybridCompressionResult, 'method' | 'processingTime'>
  
  if (decision.method === 'client-side') {
    baseResult = await compressClientSide(file, level, onProgress)
  } else {
    baseResult = await compressServerSide(file, level, onProgress)
  }
  
  const processingTime = Date.now() - startTime
  
  onProgress?.({
    stage: 'complete',
    progress: 100,
    message: `Compression complete! Reduced by ${baseResult.ratio}%`
  })
  
  return {
    ...baseResult,
    method: decision.method,
    processingTime
  }
}

/**
 * Client-side compression using existing implementation
 */
async function compressClientSide(
  file: File,
  level: CompressionLevel,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime'>> {
  onProgress?.({
    stage: 'processing',
    progress: 30,
    message: 'Processing PDF locally in your browser...'
  })
  
  // Dynamically import client-side compressor to avoid SSR issues
  const { compressPDF } = await import('./pdfClientCompressor')
  const result = await compressPDF(file, level as 'light' | 'medium')
  
  onProgress?.({
    stage: 'processing',
    progress: 90,
    message: 'Finalizing compressed PDF...'
  })
  
  return {
    blob: result.blob,
    originalSize: result.originalSize,
    compressedSize: result.compressedSize,
    ratio: result.ratio
  }
}

/**
 * Server-side compression using API
 */
async function compressServerSide(
  file: File,
  level: CompressionLevel,
  onProgress?: (progress: CompressionProgress) => void
): Promise<Omit<HybridCompressionResult, 'method' | 'processingTime'>> {
  // Stage 2: Upload file
  onProgress?.({
    stage: 'uploading',
    progress: 30,
    message: 'Uploading PDF to server...'
  })
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('compressionLevel', level)
  
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
    
    // Fallback to client-side if server fails
    onProgress?.({
      stage: 'processing',
      progress: 40,
      message: 'Server unavailable, falling back to local processing...'
    })
    
    return await compressClientSide(file, level, onProgress)
  }
}

/**
 * Get compression method recommendation for a file
 */
export async function getCompressionRecommendation(
  file: File,
  userPreference?: 'privacy' | 'performance' | 'quality' | 'auto'
) {
  const analysis = await analyzePDFFile(file)
  const decision = chooseCompressionMethod(analysis, userPreference)
  const explanation = getCompressionMethodExplanation(decision)
  const validation = validateCompressionMethod(analysis, decision.method)
  
  return {
    analysis,
    decision,
    explanation,
    validation
  }
}

/**
 * Check server-side compression availability
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
