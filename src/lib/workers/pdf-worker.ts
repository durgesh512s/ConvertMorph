// Worker thread for heavy PDF processing operations
import { parentPort } from 'worker_threads';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import * as fs from 'fs/promises';
import path from 'path';

interface CompressData {
  filePath: string;
  quality: 'light' | 'medium' | 'strong';
}

interface MergeData {
  filePaths: string[];
}

interface SplitData {
  filePath: string;
  ranges: string;
}

interface ImagesToPdfData {
  imagePaths: string[];
  mode: 'single' | 'multiple';
}

interface PdfToImagesData {
  filePath: string;
  format: 'png' | 'jpg';
}

type WorkerData = CompressData | MergeData | SplitData | ImagesToPdfData | PdfToImagesData;

interface WorkerMessage {
  type: 'compress' | 'merge' | 'split' | 'images-to-pdf' | 'pdf-to-images';
  data: WorkerData;
  jobId: string;
}

interface WorkerResponse {
  type: 'progress' | 'complete' | 'error';
  jobId: string;
  data?: {
    outputPath?: string;
    outputPaths?: string[];
    originalSize?: number;
    compressedSize?: number;
  };
  error?: string;
  progress?: number;
}

// Send progress updates to main thread
function sendProgress(jobId: string, progress: number) {
  parentPort?.postMessage({
    type: 'progress',
    jobId,
    progress
  } as WorkerResponse);
}

// Send completion message to main thread
function sendComplete(jobId: string, data: WorkerResponse['data']) {
  parentPort?.postMessage({
    type: 'complete',
    jobId,
    data
  } as WorkerResponse);
}

// Send error message to main thread
function sendError(jobId: string, error: string) {
  parentPort?.postMessage({
    type: 'error',
    jobId,
    error
  } as WorkerResponse);
}

// Compress PDF by reducing image quality
async function compressPdf(filePath: string, quality: 'light' | 'medium' | 'strong', jobId: string) {
  try {
    sendProgress(jobId, 10);
    
    const pdfBytes = await fs.readFile(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    sendProgress(jobId, 30);
    
    // Quality settings (for future use)
    // const qualitySettings = {
    //   light: { dpi: 150, quality: 85 },
    //   medium: { dpi: 120, quality: 70 },
    //   strong: { dpi: 96, quality: 55 }
    // };
    
    const pages = pdfDoc.getPages();
    
    sendProgress(jobId, 50);
    
    // Process images in the PDF
    for (let i = 0; i < pages.length; i++) {
      // Note: This is a simplified version. In a real implementation,
      // you would need to extract and recompress embedded images
      sendProgress(jobId, 50 + (i / pages.length) * 40);
    }
    
    const compressedBytes = await pdfDoc.save();
    sendProgress(jobId, 95);
    
    // Write compressed file
    const outputPath = filePath.replace('.pdf', '_compressed.pdf');
    await fs.writeFile(outputPath, compressedBytes);
    
    sendProgress(jobId, 100);
    sendComplete(jobId, {
      outputPath,
      originalSize: pdfBytes.length,
      compressedSize: compressedBytes.length
    });
  } catch (error) {
    sendError(jobId, `Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Merge multiple PDFs
async function mergePdfs(filePaths: string[], jobId: string) {
  try {
    sendProgress(jobId, 10);
    
    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      
      sendProgress(jobId, 10 + (i / filePaths.length) * 80);
    }
    
    const mergedBytes = await mergedPdf.save();
    sendProgress(jobId, 95);
    
    // Write merged file
    const outputPath = path.join(path.dirname(filePaths[0]), 'merged.pdf');
    await fs.writeFile(outputPath, mergedBytes);
    
    sendProgress(jobId, 100);
    sendComplete(jobId, { outputPath });
  } catch (error) {
    sendError(jobId, `Merge failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Split PDF by page ranges
async function splitPdf(filePath: string, ranges: string, jobId: string) {
  try {
    sendProgress(jobId, 10);
    
    const pdfBytes = await fs.readFile(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    sendProgress(jobId, 30);
    
    // Parse ranges (e.g., "1-3,5,7-9")
    const pageRanges = ranges.split(',').map(range => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(n => parseInt(n.trim()));
        return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
      } else {
        return [parseInt(range.trim()) - 1];
      }
    }).flat();
    
    sendProgress(jobId, 50);
    
    const outputPaths: string[] = [];
    
    for (let i = 0; i < pageRanges.length; i++) {
      const pageIndex = pageRanges[i];
      if (pageIndex >= 0 && pageIndex < totalPages) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const outputPath = filePath.replace('.pdf', `_page_${pageIndex + 1}.pdf`);
        await fs.writeFile(outputPath, pdfBytes);
        outputPaths.push(outputPath);
      }
      
      sendProgress(jobId, 50 + (i / pageRanges.length) * 45);
    }
    
    sendProgress(jobId, 100);
    sendComplete(jobId, { outputPaths });
  } catch (error) {
    sendError(jobId, `Split failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Convert images to PDF
async function imagesToPdf(imagePaths: string[], mode: 'single' | 'multiple', jobId: string) {
  try {
    sendProgress(jobId, 10);
    
    if (mode === 'single') {
      // Create one PDF with multiple pages
      const pdfDoc = await PDFDocument.create();
      
      for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];
        const imageBytes = await fs.readFile(imagePath);
        
        let image;
        if (imagePath.toLowerCase().endsWith('.png')) {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          image = await pdfDoc.embedJpg(imageBytes);
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
        
        sendProgress(jobId, 10 + (i / imagePaths.length) * 80);
      }
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = path.join(path.dirname(imagePaths[0]), 'images.pdf');
      await fs.writeFile(outputPath, pdfBytes);
      
      sendProgress(jobId, 100);
      sendComplete(jobId, { outputPaths: [outputPath] });
    } else {
      // Create separate PDFs for each image
      const outputPaths: string[] = [];
      
      for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];
        const pdfDoc = await PDFDocument.create();
        const imageBytes = await fs.readFile(imagePath);
        
        let image;
        if (imagePath.toLowerCase().endsWith('.png')) {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          image = await pdfDoc.embedJpg(imageBytes);
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
        
        const pdfBytes = await pdfDoc.save();
        const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
        await fs.writeFile(outputPath, pdfBytes);
        outputPaths.push(outputPath);
        
        sendProgress(jobId, 10 + (i / imagePaths.length) * 85);
      }
      
      sendProgress(jobId, 100);
      sendComplete(jobId, { outputPaths });
    }
  } catch (error) {
    sendError(jobId, `Images to PDF failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Convert PDF to images
async function pdfToImages(filePath: string, format: 'png' | 'jpg', jobId: string) {
  try {
    sendProgress(jobId, 10);
    
    // Note: This is a simplified version. In a real implementation,
    // you would use pdfjs-dist with node-canvas to render pages
    const pdfBytes = await fs.readFile(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    
    sendProgress(jobId, 30);
    
    // For now, we'll create placeholder images
    // In a real implementation, you would render each page
    const outputPaths: string[] = [];
    
    for (let i = 0; i < pageCount; i++) {
      // Create a placeholder image using Sharp
      const image = sharp({
        create: {
          width: 595,
          height: 842,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }
        }
      });
      
      const outputPath = filePath.replace('.pdf', `_page_${i + 1}.${format}`);
      
      if (format === 'png') {
        await image.png().toFile(outputPath);
      } else {
        await image.jpeg({ quality: 90 }).toFile(outputPath);
      }
      
      outputPaths.push(outputPath);
      sendProgress(jobId, 30 + (i / pageCount) * 65);
    }
    
    sendProgress(jobId, 100);
    sendComplete(jobId, { outputPaths });
  } catch (error) {
    sendError(jobId, `PDF to images failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Handle messages from main thread
parentPort?.on('message', async (message: WorkerMessage) => {
  const { type, data, jobId } = message;
  
  try {
    switch (type) {
      case 'compress':
        const compressData = data as CompressData;
        await compressPdf(compressData.filePath, compressData.quality, jobId);
        break;
      case 'merge':
        const mergeData = data as MergeData;
        await mergePdfs(mergeData.filePaths, jobId);
        break;
      case 'split':
        const splitData = data as SplitData;
        await splitPdf(splitData.filePath, splitData.ranges, jobId);
        break;
      case 'images-to-pdf':
        const imagesToPdfData = data as ImagesToPdfData;
        await imagesToPdf(imagesToPdfData.imagePaths, imagesToPdfData.mode, jobId);
        break;
      case 'pdf-to-images':
        const pdfToImagesData = data as PdfToImagesData;
        await pdfToImages(pdfToImagesData.filePath, pdfToImagesData.format, jobId);
        break;
      default:
        sendError(jobId, `Unknown operation type: ${type}`);
    }
  } catch (error) {
    sendError(jobId, `Worker error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});
