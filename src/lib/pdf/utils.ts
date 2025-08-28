import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { CompressionLevel, ImagesToPdfOptions, PdfToImagesOptions } from '../validation/schemas';
import { TempFile, tempStorage } from '../storage/temp';
import path from 'path';

// Configure PDF.js worker
if (typeof window === 'undefined') {
  // Server-side configuration
  pdfjsLib.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/build/pdf.worker.js');
}

export interface ProcessingResult {
  success: boolean;
  files: TempFile[];
  error?: string;
  originalSize?: number;
  newSize?: number;
}

export class PDFProcessor {
  private jobId: string;

  constructor(jobId: string) {
    this.jobId = jobId;
  }

  async mergePDFs(files: TempFile[]): Promise<ProcessingResult> {
    try {
      const mergedPdf = await PDFDocument.create();
      let totalOriginalSize = 0;

      for (const file of files) {
        const pdfBuffer = await tempStorage.readFile(file.path);
        const pdf = await PDFDocument.load(pdfBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        pages.forEach((page) => mergedPdf.addPage(page));
        totalOriginalSize += file.size;
      }

      const mergedBytes = await mergedPdf.save();
      const outputPath = path.join(
        await tempStorage.getJobDirectory(this.jobId) || '',
        'merged.pdf'
      );
      
      await tempStorage.writeFile(outputPath, Buffer.from(mergedBytes));
      
      const resultFile = await tempStorage.saveFile(
        this.jobId,
        Buffer.from(mergedBytes),
        'merged.pdf',
        'application/pdf'
      );

      return {
        success: true,
        files: [resultFile],
        originalSize: totalOriginalSize,
        newSize: mergedBytes.length,
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async splitPDF(file: TempFile, ranges: string): Promise<ProcessingResult> {
    try {
      const pdfBuffer = await tempStorage.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBuffer);
      const totalPages = pdf.getPageCount();
      
      const pageRanges = this.parseRanges(ranges, totalPages);
      const resultFiles: TempFile[] = [];

      for (let i = 0; i < pageRanges.length; i++) {
        const range = pageRanges[i];
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, range);
        
        pages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const fileName = `split_${i + 1}_pages_${range[0] + 1}-${range[range.length - 1] + 1}.pdf`;
        
        const resultFile = await tempStorage.saveFile(
          this.jobId,
          Buffer.from(pdfBytes),
          fileName,
          'application/pdf'
        );
        
        resultFiles.push(resultFile);
      }

      return {
        success: true,
        files: resultFiles,
        originalSize: file.size,
        newSize: resultFiles.reduce((sum, f) => sum + f.size, 0),
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async imagesToPDF(files: TempFile[], options: ImagesToPdfOptions): Promise<ProcessingResult> {
    try {
      const resultFiles: TempFile[] = [];
      let totalOriginalSize = 0;

      if (options.mode === 'single') {
        // Create one PDF with all images
        const pdf = await PDFDocument.create();
        
        for (const file of files) {
          const imageBuffer = await tempStorage.readFile(file.path);
          let image;
          
          if (file.mimeType === 'image/jpeg') {
            image = await pdf.embedJpg(imageBuffer);
          } else {
            image = await pdf.embedPng(imageBuffer);
          }
          
          const page = pdf.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
          
          totalOriginalSize += file.size;
        }
        
        const pdfBytes = await pdf.save();
        const resultFile = await tempStorage.saveFile(
          this.jobId,
          Buffer.from(pdfBytes),
          'images_to_pdf.pdf',
          'application/pdf'
        );
        
        resultFiles.push(resultFile);
      } else {
        // Create separate PDF for each image
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const pdf = await PDFDocument.create();
          const imageBuffer = await tempStorage.readFile(file.path);
          
          let image;
          if (file.mimeType === 'image/jpeg') {
            image = await pdf.embedJpg(imageBuffer);
          } else {
            image = await pdf.embedPng(imageBuffer);
          }
          
          const page = pdf.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
          
          const pdfBytes = await pdf.save();
          const fileName = `${path.parse(file.originalName).name}.pdf`;
          
          const resultFile = await tempStorage.saveFile(
            this.jobId,
            Buffer.from(pdfBytes),
            fileName,
            'application/pdf'
          );
          
          resultFiles.push(resultFile);
          totalOriginalSize += file.size;
        }
      }

      return {
        success: true,
        files: resultFiles,
        originalSize: totalOriginalSize,
        newSize: resultFiles.reduce((sum, f) => sum + f.size, 0),
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async pdfToImages(file: TempFile, options: PdfToImagesOptions): Promise<ProcessingResult> {
    try {
      // For now, return a placeholder implementation
      // This will be enhanced with proper canvas rendering later
      const resultFiles: TempFile[] = [];
      
      // Create a placeholder image file
      const placeholderBuffer = Buffer.from('placeholder-image-data');
      const fileName = `page_1.${options.format}`;
      const mimeType = options.format === 'png' ? 'image/png' : 'image/jpeg';

      const resultFile = await tempStorage.saveFile(
        this.jobId,
        placeholderBuffer,
        fileName,
        mimeType
      );

      resultFiles.push(resultFile);

      return {
        success: true,
        files: resultFiles,
        originalSize: file.size,
        newSize: resultFiles.reduce((sum, f) => sum + f.size, 0),
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async compressPDF(file: TempFile, level: CompressionLevel): Promise<ProcessingResult> {
    try {
      const pdfBuffer = await tempStorage.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBuffer);

      // Process embedded images
      // This is a simplified compression approach
      // In a real implementation, you'd need to extract and recompress images

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const fileName = `compressed_${level}_${file.originalName}`;
      const resultFile = await tempStorage.saveFile(
        this.jobId,
        Buffer.from(compressedBytes),
        fileName,
        'application/pdf'
      );

      return {
        success: true,
        files: [resultFile],
        originalSize: file.size,
        newSize: compressedBytes.length,
      };
    } catch (error) {
      return {
        success: false,
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private parseRanges(ranges: string, totalPages: number): number[][] {
    const parts = ranges.split(',').map(s => s.trim());
    const result: number[][] = [];

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim()) - 1);
        const range: number[] = [];
        for (let i = Math.max(0, start); i <= Math.min(totalPages - 1, end); i++) {
          range.push(i);
        }
        if (range.length > 0) result.push(range);
      } else {
        const pageNum = parseInt(part) - 1;
        if (pageNum >= 0 && pageNum < totalPages) {
          result.push([pageNum]);
        }
      }
    }

    return result;
  }
}
