export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropOptions {
  format?: 'jpeg' | 'png' | 'webp';
  quality?: number;
  outputWidth?: number;
  outputHeight?: number;
}

/**
 * Crops an image using Canvas API
 */
export async function cropImage(
  imageSrc: string,
  cropArea: CropArea,
  options: CropOptions = {}
): Promise<string> {
  const {
    format = 'jpeg',
    quality = 0.9,
    outputWidth,
    outputHeight
  } = options;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate actual crop dimensions
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        const actualCropArea = {
          x: cropArea.x * scaleX,
          y: cropArea.y * scaleY,
          width: cropArea.width * scaleX,
          height: cropArea.height * scaleY
        };

        // Set canvas size to output dimensions or crop dimensions
        canvas.width = outputWidth || actualCropArea.width;
        canvas.height = outputHeight || actualCropArea.height;

        // Draw the cropped image
        ctx.drawImage(
          image,
          actualCropArea.x,
          actualCropArea.y,
          actualCropArea.width,
          actualCropArea.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Convert to desired format
        const mimeType = `image/${format}`;
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    image.src = imageSrc;
  });
}

/**
 * Converts data URL to blob for download
 */
export function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  const mime = mimeMatch?.[1] || 'image/jpeg';
  const bstr = atob(arr[1] || '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

/**
 * Gets the file extension for a given format
 */
export function getFileExtension(format: string): string {
  switch (format) {
    case 'jpeg':
      return 'jpg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    default:
      return 'jpg';
  }
}

/**
 * Validates if the crop area is valid
 */
export function isValidCropArea(cropArea: CropArea): boolean {
  return (
    cropArea.width > 0 &&
    cropArea.height > 0 &&
    cropArea.x >= 0 &&
    cropArea.y >= 0
  );
}

/**
 * Calculates aspect ratio from width and height
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Gets common aspect ratios
 */
export const ASPECT_RATIOS = {
  free: null,
  square: 1,
  '4:3': 4 / 3,
  '3:4': 3 / 4,
  '16:9': 16 / 9,
  '9:16': 9 / 16,
  '3:2': 3 / 2,
  '2:3': 2 / 3,
  '5:4': 5 / 4,
  '4:5': 4 / 5
} as const;

export type AspectRatioKey = keyof typeof ASPECT_RATIOS;
