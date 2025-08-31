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
  outputFormat: OutputFormat = "original"
): Promise<CompressedResult> {
  const originalSize = file.size

  // Compression settings based on level
  const compressionSettings = {
    light: { maxWidthOrHeight: 1920, initialQuality: 0.9 },
    medium: { maxWidthOrHeight: 1600, initialQuality: 0.7 },
    strong: { maxWidthOrHeight: 1200, initialQuality: 0.5 }
  }

  const settings = compressionSettings[level]

  // Determine output format
  let targetFormat = file.type
  let fileExtension = file.name.split('.').pop()?.toLowerCase() || ''

  if (outputFormat === "jpeg") {
    targetFormat = "image/jpeg"
    fileExtension = "jpg"
  } else if (outputFormat === "webp") {
    targetFormat = "image/webp"
    fileExtension = "webp"
  }

  try {
    // Use browser-image-compression for the actual compression
    const compressedFile = await imageCompression(file, {
      maxWidthOrHeight: settings.maxWidthOrHeight,
      initialQuality: settings.initialQuality,
      fileType: targetFormat,
      useWebWorker: true,
      maxIteration: 10,
      exifOrientation: 1, // Reset EXIF orientation
    })

    // Convert to blob if needed
    let compressedBlob: Blob
    if (compressedFile instanceof Blob) {
      compressedBlob = compressedFile
    } else {
      compressedBlob = new Blob([compressedFile], { type: targetFormat })
    }

    const compressedSize = compressedBlob.size
    const ratio = Math.round(((originalSize - compressedSize) / originalSize) * 100)

    return {
      blob: compressedBlob,
      originalSize,
      compressedSize,
      ratio: Math.max(0, ratio), // Ensure ratio is not negative
      format: fileExtension
    }
  } catch (error) {
    console.error('Image compression failed:', error)
    throw new Error(`Failed to compress image: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
