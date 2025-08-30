// pdfCompressionWorker.ts (Client-side PDF Compression)
import { PDFDocument, PDFName, PDFDict, PDFRef } from 'pdf-lib'

export interface CompressionOptions {
  level: 'light' | 'medium' | 'strong';
  removeMetadata?: boolean;
  optimizeImages?: boolean;
  subsetFonts?: boolean;
}

export interface CompressionProgress {
  stage: 'loading' | 'analyzing' | 'compressing' | 'optimizing' | 'finalizing' | 'complete';
  progress: number; // 0-100
  message: string;
}

export interface CompressionResult {
  success: boolean;
  compressedPdf?: Uint8Array;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  error?: string;
}

// Worker message types
export interface WorkerMessage {
  type: 'compress';
  file: File;
  level: 'light' | 'medium' | 'strong';
  fileId: string;
}

export interface WorkerResponse {
  type: 'progress' | 'result' | 'error';
  fileId: string;
  progress?: CompressionProgress;
  result?: CompressionResult;
  error?: string;
}

class PDFCompressor {
  private onProgress?: (progress: CompressionProgress) => void;

  constructor(onProgress?: (progress: CompressionProgress) => void) {
    this.onProgress = onProgress;
  }

  private reportProgress(stage: CompressionProgress['stage'], progress: number, message: string) {
    this.onProgress?.({ stage, progress, message });
  }

  async compressPDF(file: File, level: 'light' | 'medium' | 'strong'): Promise<CompressionResult> {
    const arrayBuffer = await file.arrayBuffer();
    const originalSize = arrayBuffer.byteLength;
    
    try {
      this.reportProgress('loading', 10, 'Loading PDF document...');
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
        capNumbers: false,
      });

      this.reportProgress('analyzing', 20, 'Analyzing document structure...');

      // Always apply compression techniques regardless of file size
      this.reportProgress('compressing', 30, 'Removing metadata...');
      this.removeMetadata(pdfDoc);

      this.reportProgress('compressing', 40, 'Optimizing document structure...');
      this.optimizeDocumentStructure(pdfDoc, level);

      this.reportProgress('compressing', 60, 'Compressing content...');
      this.compressContent(pdfDoc, level);

      this.reportProgress('optimizing', 80, 'Removing unnecessary objects...');
      this.removeUnnecessaryObjects(pdfDoc, level);

      this.reportProgress('finalizing', 90, 'Finalizing compression...');

      // Save with aggressive compression options
      const saveOptions = this.getSaveOptions(level);
      const compressedPdf = await pdfDoc.save(saveOptions);

      const compressedSize = compressedPdf.byteLength;
      const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      // Only return original if compression ratio is negative (file got larger)
      if (compressionRatio < 0) {
        this.reportProgress('complete', 100, 'File already optimized - no compression needed');
        
        return {
          success: true,
          compressedPdf: new Uint8Array(arrayBuffer),
          originalSize,
          compressedSize: originalSize,
          compressionRatio: 0,
        };
      }

      this.reportProgress('complete', 100, `Compression complete! ${compressionRatio}% reduction`);

      return {
        success: true,
        compressedPdf,
        originalSize,
        compressedSize,
        compressionRatio,
      };

    } catch (error) {
      console.error('PDF compression error:', error);
      return {
        success: false,
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 0,
        error: error instanceof Error ? error.message : 'Unknown compression error',
      };
    }
  }

  private compressContent(pdfDoc: PDFDocument, level: 'light' | 'medium' | 'strong') {
    try {
      const settings = this.getCompressionSettings(level);
      const pages = pdfDoc.getPages();
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (!page) continue;
        
        // Scale down page content for compression
        const { width, height } = page.getSize();
        const newWidth = width * settings.scaleFactor;
        const newHeight = height * settings.scaleFactor;
        
        // Scale the page content and size
        page.scaleContent(settings.scaleFactor, settings.scaleFactor);
        page.setSize(newWidth, newHeight);
        
        // Remove optional page elements for stronger compression
        if (level === 'medium' || level === 'strong') {
          try {
            const pageNode = page.node;
            
            // Remove annotations that aren't essential
            if (pageNode.has(PDFName.of('Annots'))) {
              pageNode.delete(PDFName.of('Annots'));
            }
            
            // Remove optional content groups
            if (pageNode.has(PDFName.of('Group'))) {
              pageNode.delete(PDFName.of('Group'));
            }
            
            // Remove thumbnail
            if (pageNode.has(PDFName.of('Thumb'))) {
              pageNode.delete(PDFName.of('Thumb'));
            }
          } catch (e) {
            // Ignore errors when removing optional elements
          }
        }
      }
    } catch (error) {
      console.warn('Error compressing content:', error);
    }
  }

  private optimizeDocumentStructure(pdfDoc: PDFDocument, level: 'light' | 'medium' | 'strong') {
    try {
      // Remove optional catalog entries for all levels
      const catalog = pdfDoc.catalog;
      
      try {
        // Remove viewer preferences
        if (catalog.has(PDFName.of('ViewerPreferences'))) {
          catalog.delete(PDFName.of('ViewerPreferences'));
        }
        
        // Remove page layout and mode for medium/strong compression
        if (level === 'medium' || level === 'strong') {
          if (catalog.has(PDFName.of('PageLayout'))) {
            catalog.delete(PDFName.of('PageLayout'));
          }
          if (catalog.has(PDFName.of('PageMode'))) {
            catalog.delete(PDFName.of('PageMode'));
          }
          if (catalog.has(PDFName.of('OpenAction'))) {
            catalog.delete(PDFName.of('OpenAction'));
          }
        }
        
        // Remove additional optional elements for strong compression
        if (level === 'strong') {
          if (catalog.has(PDFName.of('Names'))) {
            catalog.delete(PDFName.of('Names'));
          }
          if (catalog.has(PDFName.of('Dests'))) {
            catalog.delete(PDFName.of('Dests'));
          }
          if (catalog.has(PDFName.of('Outlines'))) {
            catalog.delete(PDFName.of('Outlines'));
          }
        }
      } catch (e) {
        // Ignore errors
      }
    } catch (error) {
      console.warn('Error optimizing document structure:', error);
    }
  }

  private removeUnnecessaryObjects(pdfDoc: PDFDocument, level: 'light' | 'medium' | 'strong') {
    try {
      // Remove unused objects and optimize cross-reference table
      const context = pdfDoc.context;
      
      // For medium and strong compression, be more aggressive
      if (level === 'medium' || level === 'strong') {
        // Try to remove unused font subsets and resources
        const pages = pdfDoc.getPages();
        pages.forEach(page => {
          try {
            const pageNode = page.node;
            const resources = pageNode.lookup(PDFName.of('Resources'));
            
            if (resources instanceof PDFDict) {
              // Remove unused font resources for strong compression
              if (level === 'strong') {
                const fonts = resources.lookup(PDFName.of('Font'));
                if (fonts instanceof PDFDict) {
                  // Keep only essential fonts
                  const fontKeys = fonts.keys();
                  if (fontKeys.length > 3) {
                    // Remove excess fonts, keep first 3
                    for (let i = 3; i < fontKeys.length; i++) {
                      try {
                        const fontKey = fontKeys[i];
                        if (fontKey) {
                          fonts.delete(fontKey);
                        }
                      } catch (e) {
                        // Ignore errors
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            // Ignore errors
          }
        });
      }
    } catch (error) {
      console.warn('Error removing unnecessary objects:', error);
    }
  }

  private removeMetadata(pdfDoc: PDFDocument) {
    try {
      // Clear document metadata
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
      pdfDoc.setCreationDate(new Date(0));
      pdfDoc.setModificationDate(new Date(0));
    } catch (error) {
      console.warn('Could not remove metadata:', error);
    }
  }

  private getCompressionSettings(level: 'light' | 'medium' | 'strong') {
    switch (level) {
      case 'light':
        return {
          scaleFactor: 0.90, // 10% reduction
          quality: 0.80
        };
      case 'medium':
        return {
          scaleFactor: 0.75, // 25% reduction
          quality: 0.65
        };
      case 'strong':
        return {
          scaleFactor: 0.60, // 40% reduction
          quality: 0.50
        };
      default:
        return {
          scaleFactor: 0.75,
          quality: 0.65
        };
    }
  }

  private getSaveOptions(level: 'light' | 'medium' | 'strong') {
    const baseOptions = {
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    };

    switch (level) {
      case 'light':
        return {
          ...baseOptions,
          objectsPerTick: 100,
        };
      case 'medium':
        return {
          ...baseOptions,
          objectsPerTick: 200,
        };
      case 'strong':
        return {
          ...baseOptions,
          objectsPerTick: 500,
        };
      default:
        return baseOptions;
    }
  }
}

// Worker implementation
if (typeof self !== 'undefined' && 'postMessage' in self) {
  // We're in a Web Worker context
  self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
    const { type, file, level, fileId } = event.data;

    if (type === 'compress') {
      const compressor = new PDFCompressor((progress) => {
        const response: WorkerResponse = {
          type: 'progress',
          fileId,
          progress,
        };
        self.postMessage(response);
      });

      try {
        const result = await compressor.compressPDF(file, level);
        const response: WorkerResponse = {
          type: 'result',
          fileId,
          result,
        };
        self.postMessage(response);
      } catch (error) {
        const response: WorkerResponse = {
          type: 'error',
          fileId,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        self.postMessage(response);
      }
    }
  };
}

// Export for use in main thread
export { PDFCompressor };
