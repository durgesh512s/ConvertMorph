import { PDFDocument } from 'pdf-lib'

export type CompressionMethod = 'client-side' | 'server-side'
export type CompressionLevel = 'light' | 'medium' | 'strong'

interface CompressionDecision {
  method: CompressionMethod
  reason: string
  estimatedTime: string
  recommendation: string
}

interface FileAnalysis {
  pages: number
  sizeInMB: number
  isImageHeavy: boolean
  isTextHeavy: boolean
  complexity: 'low' | 'medium' | 'high'
}

/**
 * Analyzes a PDF file to determine its characteristics
 */
export async function analyzePDFFile(file: File): Promise<FileAnalysis> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pages = pdf.getPageCount()
    const sizeInMB = file.size / (1024 * 1024)
    
    // Estimate content type based on file size to page ratio
    const bytesPerPage = file.size / pages
    
    // Heuristics for content type detection
    const isImageHeavy = bytesPerPage > 500000 // > 500KB per page suggests images
    const isTextHeavy = bytesPerPage < 50000   // < 50KB per page suggests mostly text
    
    let complexity: 'low' | 'medium' | 'high' = 'low'
    if (isImageHeavy) complexity = 'high'
    else if (!isTextHeavy) complexity = 'medium'
    
    return {
      pages,
      sizeInMB,
      isImageHeavy,
      isTextHeavy,
      complexity
    }
  } catch (error) {
    console.error('Error analyzing PDF:', error)
    // Fallback analysis
    const sizeInMB = file.size / (1024 * 1024)
    return {
      pages: Math.ceil(sizeInMB * 10), // Rough estimate
      sizeInMB,
      isImageHeavy: sizeInMB > 10,
      isTextHeavy: sizeInMB < 5,
      complexity: sizeInMB > 20 ? 'high' : sizeInMB > 5 ? 'medium' : 'low'
    }
  }
}

/**
 * Intelligent compression method selection based on file characteristics and user preferences
 */
export function chooseCompressionMethod(
  analysis: FileAnalysis,
  userPreference?: 'privacy' | 'performance' | 'quality' | 'auto'
): CompressionDecision {
  const { pages, sizeInMB, isImageHeavy, isTextHeavy, complexity } = analysis
  
  // File size and page count thresholds
  const LARGE_FILE_SIZE_MB = 50
  const LARGE_PAGE_COUNT = 100
  const VERY_LARGE_PAGE_COUNT = 1000
  
  // User preference override
  if (userPreference === 'privacy') {
    return {
      method: 'client-side',
      reason: 'User selected privacy-first processing',
      estimatedTime: estimateProcessingTime(analysis, 'client-side'),
      recommendation: 'Files will be processed locally for maximum privacy'
    }
  }
  
  if (userPreference === 'performance') {
    return {
      method: 'server-side',
      reason: 'User selected performance-optimized processing',
      estimatedTime: estimateProcessingTime(analysis, 'server-side'),
      recommendation: 'Files will be processed on our servers for fastest results'
    }
  }
  
  // Automatic decision logic
  
  // Very large files → Server-side
  if (sizeInMB > LARGE_FILE_SIZE_MB || pages > VERY_LARGE_PAGE_COUNT) {
    return {
      method: 'server-side',
      reason: `Large file (${sizeInMB.toFixed(1)}MB, ${pages} pages) - server processing recommended`,
      estimatedTime: estimateProcessingTime(analysis, 'server-side'),
      recommendation: 'Server-side processing will be faster and more reliable for large files'
    }
  }
  
  // Many pages → Server-side
  if (pages > LARGE_PAGE_COUNT) {
    return {
      method: 'server-side',
      reason: `High page count (${pages} pages) - server processing recommended`,
      estimatedTime: estimateProcessingTime(analysis, 'server-side'),
      recommendation: 'Server-side processing prevents browser timeouts for multi-page documents'
    }
  }
  
  // Text-heavy PDFs → Server-side (better quality preservation)
  if (isTextHeavy && pages > 50) {
    return {
      method: 'server-side',
      reason: 'Text-heavy PDF - server processing preserves text searchability',
      estimatedTime: estimateProcessingTime(analysis, 'server-side'),
      recommendation: 'Server-side compression can optimize without converting text to images'
    }
  }
  
  // Image-heavy PDFs → Client-side (good compression results)
  if (isImageHeavy && pages < LARGE_PAGE_COUNT && sizeInMB < LARGE_FILE_SIZE_MB) {
    return {
      method: 'client-side',
      reason: 'Image-heavy PDF - client-side compression works well for images',
      estimatedTime: estimateProcessingTime(analysis, 'client-side'),
      recommendation: 'Client-side processing provides excellent compression for image content'
    }
  }
  
  // Small files → Client-side (privacy + speed)
  if (pages < 50 && sizeInMB < 10) {
    return {
      method: 'client-side',
      reason: 'Small file - fast client-side processing with complete privacy',
      estimatedTime: estimateProcessingTime(analysis, 'client-side'),
      recommendation: 'Client-side processing is ideal for small files'
    }
  }
  
  // Default to server-side for quality and reliability
  return {
    method: 'server-side',
    reason: 'Default recommendation for optimal quality and performance',
    estimatedTime: estimateProcessingTime(analysis, 'server-side'),
    recommendation: 'Server-side processing provides the best balance of speed and quality'
  }
}

/**
 * Estimates processing time based on file analysis and method
 */
function estimateProcessingTime(analysis: FileAnalysis, method: CompressionMethod): string {
  const { pages, complexity } = analysis
  
  if (method === 'client-side') {
    // Client-side timing based on our test results
    const timePerPage = complexity === 'high' ? 0.6 : complexity === 'medium' ? 0.2 : 0.05 // seconds
    const totalSeconds = pages * timePerPage
    
    if (totalSeconds < 60) {
      return `~${Math.ceil(totalSeconds)} seconds`
    } else if (totalSeconds < 3600) {
      return `~${Math.ceil(totalSeconds / 60)} minutes`
    } else {
      return `~${Math.ceil(totalSeconds / 3600)} hours`
    }
  } else {
    // Server-side is typically 5-10x faster
    const timePerPage = complexity === 'high' ? 0.1 : complexity === 'medium' ? 0.03 : 0.01 // seconds
    const totalSeconds = pages * timePerPage + 5 // Add 5 seconds for upload/download
    
    if (totalSeconds < 60) {
      return `~${Math.ceil(totalSeconds)} seconds`
    } else {
      return `~${Math.ceil(totalSeconds / 60)} minutes`
    }
  }
}

/**
 * Gets user-friendly explanation for the compression method choice
 */
export function getCompressionMethodExplanation(decision: CompressionDecision): {
  title: string
  description: string
  pros: string[]
  cons: string[]
} {
  if (decision.method === 'client-side') {
    return {
      title: 'Client-Side Processing',
      description: 'Your PDF will be processed locally in your browser',
      pros: [
        'Complete privacy - files never leave your device',
        'No upload time required',
        'Works offline',
        'No file size limits from server'
      ],
      cons: [
        'Processing speed depends on your device',
        'May convert text to images',
        'Browser may become unresponsive during processing',
        'Limited compression algorithms'
      ]
    }
  } else {
    return {
      title: 'Server-Side Processing',
      description: 'Your PDF will be processed on our optimized servers',
      pros: [
        'Much faster processing (5-10x speed)',
        'Advanced compression algorithms',
        'Preserves text searchability',
        'Reliable for large files',
        'Works on all devices'
      ],
      cons: [
        'Requires file upload',
        'Files temporarily stored on server',
        'Requires internet connection',
        'Upload time for large files'
      ]
    }
  }
}

/**
 * Validates if a file is suitable for the chosen compression method
 */
export function validateCompressionMethod(
  analysis: FileAnalysis, 
  method: CompressionMethod
): { valid: boolean; warning?: string } {
  const { pages, sizeInMB } = analysis
  
  if (method === 'client-side') {
    // Client-side limitations
    if (sizeInMB > 100) {
      return {
        valid: false,
        warning: 'File too large for client-side processing (max 100MB)'
      }
    }
    
    if (pages > 2000) {
      return {
        valid: true,
        warning: `Large page count (${pages} pages) may cause browser performance issues`
      }
    }
    
    if (sizeInMB > 50) {
      return {
        valid: true,
        warning: `Large file (${sizeInMB.toFixed(1)}MB) may take significant time to process`
      }
    }
  } else {
    // Server-side limitations
    if (sizeInMB > 500) {
      return {
        valid: false,
        warning: 'File too large for server processing (max 500MB)'
      }
    }
  }
  
  return { valid: true }
}
