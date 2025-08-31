export interface ConvertOptions {
  outputFormat: 'jpeg' | 'png' | 'webp';
  quality?: number; // 0-1, only for jpeg and webp
}

export interface ConvertResult {
  blob: Blob;
  originalSize: number;
  convertedSize: number;
  originalFormat: string;
  outputFormat: string;
  originalDimensions: { width: number; height: number };
  sizeChange: { percentage: number; isReduction: boolean };
}

export async function convertImage(file: File, options: ConvertOptions): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set canvas dimensions to match image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Convert to desired format
        const mimeType = `image/${options.outputFormat}`;
        const quality = options.quality || 0.9;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }

            const originalSize = file.size;
            const convertedSize = blob.size;
            const sizeChange = calculateSizeChange(originalSize, convertedSize);

            resolve({
              blob,
              originalSize,
              convertedSize,
              originalFormat: getFormatFromMimeType(file.type),
              outputFormat: options.outputFormat,
              originalDimensions: {
                width: img.naturalWidth,
                height: img.naturalHeight
              },
              sizeChange
            });
          },
          mimeType,
          options.outputFormat === 'png' ? undefined : quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function calculateSizeChange(originalSize: number, newSize: number): { percentage: number; isReduction: boolean } {
  const difference = Math.abs(originalSize - newSize);
  const percentage = Math.round((difference / originalSize) * 100);
  const isReduction = newSize < originalSize;
  
  return { percentage, isReduction };
}

export function getFormatFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpeg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/bmp':
      return 'bmp';
    default:
      return 'unknown';
  }
}

export function getFileExtension(format: string): string {
  switch (format) {
    case 'jpeg':
      return 'jpg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    default:
      return format;
  }
}
