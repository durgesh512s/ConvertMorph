export type ResizeMode = 'exact' | 'aspect-ratio'
export type OutputFormat = 'original' | 'jpeg' | 'png' | 'webp'

interface ResizeOptions {
  width?: number
  height?: number
  mode: ResizeMode
  outputFormat: OutputFormat
  quality?: number
}

interface ResizedResult {
  blob: Blob
  originalSize: number
  resizedSize: number
  originalDimensions: { width: number; height: number }
  newDimensions: { width: number; height: number }
  format: string
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<ResizedResult> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    img.onload = () => {
      const originalWidth = img.naturalWidth
      const originalHeight = img.naturalHeight
      const originalSize = file.size

      let newWidth: number
      let newHeight: number

      // Calculate new dimensions based on mode
      if (options.mode === 'exact') {
        newWidth = options.width || originalWidth
        newHeight = options.height || originalHeight
      } else {
        // aspect-ratio mode
        const aspectRatio = originalWidth / originalHeight

        if (options.width && options.height) {
          // Both dimensions provided - choose the one that maintains aspect ratio
          const widthBasedHeight = options.width / aspectRatio
          const heightBasedWidth = options.height * aspectRatio

          if (widthBasedHeight <= options.height) {
            newWidth = options.width
            newHeight = widthBasedHeight
          } else {
            newWidth = heightBasedWidth
            newHeight = options.height
          }
        } else if (options.width) {
          // Only width provided
          newWidth = options.width
          newHeight = options.width / aspectRatio
        } else if (options.height) {
          // Only height provided
          newWidth = options.height * aspectRatio
          newHeight = options.height
        } else {
          // No dimensions provided - keep original
          newWidth = originalWidth
          newHeight = originalHeight
        }
      }

      // Round dimensions to integers to ensure clean filenames
      newWidth = Math.round(newWidth)
      newHeight = Math.round(newHeight)

      // Set canvas dimensions
      canvas.width = newWidth
      canvas.height = newHeight

      // Draw resized image
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Determine output format and quality
      let outputMimeType = file.type
      let fileExtension = getFileExtension(file.name)
      let quality: number | undefined = options.quality || 0.9

      if (options.outputFormat === 'jpeg') {
        outputMimeType = 'image/jpeg'
        fileExtension = 'jpg'
      } else if (options.outputFormat === 'png') {
        outputMimeType = 'image/png'
        fileExtension = 'png'
        quality = undefined // PNG doesn't use quality parameter
      } else if (options.outputFormat === 'webp') {
        outputMimeType = 'image/webp'
        fileExtension = 'webp'
      }

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob from canvas'))
            return
          }

          resolve({
            blob,
            originalSize,
            resizedSize: blob.size,
            originalDimensions: { width: originalWidth, height: originalHeight },
            newDimensions: { width: newWidth, height: newHeight },
            format: fileExtension
          })
        },
        outputMimeType,
        quality !== undefined ? quality : undefined
      )
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Load the image
    img.src = URL.createObjectURL(file)
  })
}

function getFileExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? (parts[parts.length - 1] || 'jpg').toLowerCase() : 'jpg'
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function getSupportedFormats(): string[] {
  return ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
}

// Helper function to calculate file size reduction/increase
export function calculateSizeChange(originalSize: number, newSize: number): {
  percentage: number
  isReduction: boolean
} {
  const difference = originalSize - newSize
  const percentage = Math.abs(Math.round((difference / originalSize) * 100))
  return {
    percentage,
    isReduction: difference > 0
  }
}
