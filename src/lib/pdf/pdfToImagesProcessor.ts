import { PdfToImagesOptions } from '../validation/schemas';

// Dynamic import for PDF.js to avoid SSR issues
let pdfjsLib: any = null;

async function getPdfjsLib() {
  if (typeof window !== 'undefined' && !pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }
  return pdfjsLib;
}

export interface PDFPageImage {
  pageNumber: number;
  canvas: HTMLCanvasElement;
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
}

export interface PDFToImagesResult {
  images: PDFPageImage[];
  totalPages: number;
  originalFileName: string;
}

export class PDFToImagesProcessor {
  private options: PdfToImagesOptions;

  constructor(options: PdfToImagesOptions) {
    this.options = options;
  }

  async processFile(
    file: File,
    onProgress?: (progress: number, message: string) => void,
    pageRange?: string
  ): Promise<PDFToImagesResult> {
    try {
      onProgress?.(10, 'Loading PDF document...');
      
      const pdfjs = await getPdfjsLib();
      if (!pdfjs) {
        throw new Error('PDF.js not available - this feature only works in the browser');
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      
      onProgress?.(20, `PDF loaded with ${totalPages} pages`);
      
      // Parse page range
      const pagesToProcess = this.parsePageRange(pageRange, totalPages);
      const images: PDFPageImage[] = [];
      
      for (let i = 0; i < pagesToProcess.length; i++) {
        const pageNum = pagesToProcess[i];
        if (pageNum === undefined) continue;
        
        const progress = 20 + (i / pagesToProcess.length) * 70;
        onProgress?.(progress, `Rendering page ${pageNum}...`);
        
        const pageImage = await this.renderPage(pdf, pageNum);
        images.push(pageImage);
      }
      
      onProgress?.(95, 'Finalizing images...');
      
      return {
        images,
        totalPages,
        originalFileName: file.name
      };
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async renderPage(pdf: any, pageNumber: number): Promise<PDFPageImage> {
    try {
      const page = await pdf.getPage(pageNumber);
      
      // Calculate scale based on DPI
      const scale = this.options.dpi / 72; // 72 is default PDF DPI
      const viewport = page.getViewport({ scale });
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render page to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      };
      
      await page.render(renderContext).promise;
      
      // Validate canvas has content
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error(`Invalid canvas dimensions: ${canvas.width}x${canvas.height}`);
      }
      
      // Convert to blob based on format
      const blob = await this.canvasToBlob(canvas, this.options.format, this.options.quality);
      
      // Validate blob
      if (!blob || blob.size === 0) {
        throw new Error('Failed to create blob from canvas - blob is empty');
      }
      
      const dataUrl = canvas.toDataURL(
        this.options.format === 'png' ? 'image/png' : 'image/jpeg',
        this.options.quality / 100
      );
      
      // Validate dataUrl
      if (!dataUrl || dataUrl === 'data:,' || !dataUrl.startsWith('data:image/')) {
        throw new Error('Failed to create valid data URL from canvas');
      }
      
      // Ensure dataUrl has substantial content (not just a tiny placeholder)
      if (dataUrl.length < 1000) {
        console.warn(`Data URL seems too small (${dataUrl.length} chars) for page ${pageNumber}`);
      }
      
      console.log(`Successfully rendered page ${pageNumber}: ${canvas.width}x${canvas.height}, blob: ${blob.size} bytes, dataUrl: ${dataUrl.length} chars`);
      
      return {
        pageNumber,
        canvas,
        blob,
        dataUrl,
        width: canvas.width,
        height: canvas.height
      };
    } catch (error) {
      console.error(`Error rendering page ${pageNumber}:`, error);
      throw new Error(`Failed to render page ${pageNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private canvasToBlob(
    canvas: HTMLCanvasElement,
    format: 'png' | 'jpg',
    quality?: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const qualityValue = format === 'jpg' && quality ? quality / 100 : undefined;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        },
        mimeType,
        qualityValue
      );
    });
  }

  private parsePageRange(pageRange: string | undefined, totalPages: number): number[] {
    if (!pageRange || pageRange.trim() === '') {
      // Return all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages: number[] = [];
    const ranges = pageRange.split(',').map(r => r.trim());
    
    for (const range of ranges) {
      if (range.includes('-')) {
        const parts = range.split('-');
        const startStr = parts[0];
        const endStr = parts[1];
        
        if (!startStr || !endStr) continue;
        
        const start = parseInt(startStr.trim());
        const end = parseInt(endStr.trim());
        
        if (isNaN(start) || isNaN(end)) continue;
        
        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }
      } else {
        const pageNum = parseInt(range);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages && !pages.includes(pageNum)) {
          pages.push(pageNum);
        }
      }
    }
    
    return pages.sort((a, b) => a - b);
  }

  static generateFileName(originalName: string, pageNumber: number, format: 'png' | 'jpg'): string {
    const baseName = originalName.replace(/\.pdf$/i, '');
    return `${baseName}_page_${pageNumber}.${format}`;
  }

  static async downloadImage(blob: Blob, fileName: string): Promise<void> {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async downloadAllAsZip(images: PDFPageImage[], originalFileName: string, format: 'png' | 'jpg'): Promise<void> {
    // Dynamic import to avoid SSR issues
    const JSZip = (await import('jszip')).default;
    
    const zip = new JSZip();
    const baseName = originalFileName.replace(/\.pdf$/i, '');
    
    for (const image of images) {
      const fileName = this.generateFileName(originalFileName, image.pageNumber, format);
      zip.file(fileName, image.blob);
    }
    
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipFileName = `${baseName}_pages.zip`;
    
    await this.downloadImage(zipBlob, zipFileName);
  }
}
