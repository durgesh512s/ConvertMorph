import imageCompression from "browser-image-compression"

export type CompressionLevel = "light" | "medium" | "strong"
export type OutputFormat = "original" | "jpeg" | "webp"

interface CompressedResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  ratio: number
  format: string
}

export async function compressImage(
  file: File, 
  level: CompressionLevel = "medium",
  outputFormat: OutputFormat = "original",
  qualityOverride?: number // Allow direct quality control
): Promise<CompressedResult> {
  const originalSize = file.size

  // Calculate target quality based on level or override
  let targetQuality: number
  if (qualityOverride !== undefined) {
    targetQuality = qualityOverride / 100 // Convert percentage to decimal
  } else {
    // More aggressive compression settings to ensure size reduction
    const qualitySettings = {
      light: 0.85,   // 85% quality
      medium: 0.70,  // 70% quality  
      strong: 0.50   // 50% quality
    }
    targetQuality = qualitySettings[level]
  }

  // Enhanced compression settings with better handling for large files
  const compressionSettings = {
    light: { 
      maxWidthOrHeight: 1920, 
      initialQuality: targetQuality,
      maxSizeMB: originalSize > 10 * 1024 * 1024 ? 5 : undefined // 5MB limit for files > 10MB
    },
    medium: { 
      maxWidthOrHeight: 1600, 
      initialQuality: targetQuality,
      maxSizeMB: originalSize > 10 * 1024 * 1024 ? 3 : undefined // 3MB limit for files > 10MB
    },
    strong: { 
      maxWidthOrHeight: 1200, 
      initialQuality: targetQuality,
      maxSizeMB: originalSize > 10 * 1024 * 1024 ? 2 : undefined // 2MB limit for files > 10MB
    }
  }

  const settings = compressionSettings[level]

  // Determine output format - be smarter about format conversion
  let targetFormat = file.type
  let fileExtension = file.name.split('.').pop()?.toLowerCase() || ''

  // Only convert format if explicitly requested and different from original
  if (outputFormat === "jpeg" && file.type !== "image/jpeg") {
    targetFormat = "image/jpeg"
    fileExtension = "jpg"
  } else if (outputFormat === "webp" && file.type !== "image/webp") {
    targetFormat = "image/webp"
    fileExtension = "webp"
  } else if (outputFormat === "original") {
    // Keep original format
    targetFormat = file.type
    fileExtension = getExtensionFromMimeType(file.type)
  }

  // For JPEG files, ensure we're actually compressing
  if (file.type === "image/jpeg" && outputFormat === "jpeg") {
    // Only re-encode if quality is significantly lower than likely original
    if (targetQuality >= 0.85) {
      // If target quality is high, reduce it to ensure compression
      targetQuality = Math.min(0.80, targetQuality)
    }
  }

  try {
    // Enhanced compression options for better large file handling
    const compressionOptions = {
      maxWidthOrHeight: settings.maxWidthOrHeight,
      initialQuality: settings.initialQuality,
      fileType: targetFormat,
      useWebWorker: true,
      maxIteration: originalSize > 10 * 1024 * 1024 ? 5 : 10, // Fewer iterations for large files
      exifOrientation: 1, // Reset EXIF orientation
      ...(settings.maxSizeMB && { maxSizeMB: settings.maxSizeMB }), // Add size limit for large files
      // Additional options for better memory management
      alwaysKeepResolution: false,
      preserveExif: false, // Remove EXIF data to save space
    }

    console.log('Compressing image with options:', compressionOptions)

    // Use browser-image-compression for the actual compression
    const compressedFile = await imageCompression(file, compressionOptions)

    // Convert to blob if needed
    let compressedBlob: Blob
    if (compressedFile instanceof Blob) {
      compressedBlob = compressedFile
    } else {
      compressedBlob = new Blob([compressedFile], { type: targetFormat })
    }

    const compressedSize = compressedBlob.size
    const ratio = Math.round(((originalSize - compressedSize) / originalSize) * 100)

    console.log(`Compression complete: ${originalSize} -> ${compressedSize} (${ratio}% reduction)`)

    return {
      blob: compressedBlob,
      originalSize,
      compressedSize,
      ratio: Math.max(0, ratio), // Ensure ratio is not negative
      format: fileExtension
    }
  } catch (error) {
    console.error('Image compression failed:', error)
    
    // Enhanced error handling with specific messages for common issues
    let errorMessage = 'Failed to compress image'
    
    if (error instanceof Error) {
      if (error.message.includes('memory') || error.message.includes('Memory')) {
        errorMessage = 'File too large for browser compression. Try reducing the image size first or use a smaller quality setting.'
      } else if (error.message.includes('format') || error.message.includes('type')) {
        errorMessage = 'Unsupported image format. Please use JPEG, PNG, or WebP images.'
      } else if (error.message.includes('timeout') || error.message.includes('worker')) {
        errorMessage = 'Compression timed out. Try using a smaller image or lower quality setting.'
      } else {
        errorMessage = `Compression failed: ${error.message}`
      }
    }
    
    throw new Error(errorMessage)
  }
}

// Helper function to get file extension from MIME type
function getExtensionFromMimeType(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/svg+xml': 'svg'
  }
  return mimeToExt[mimeType] || 'jpg'
}

// Helper function to check if format conversion is supported
export function isFormatConversionSupported(fromType: string, toFormat: OutputFormat): boolean {
  // Most browsers support conversion from any image format to JPEG or WebP
  if (toFormat === "jpeg" || toFormat === "webp") {
    return true
  }
  
  // For "original", we keep the same format
  if (toFormat === "original") {
    return true
  }
  
  return false
}
