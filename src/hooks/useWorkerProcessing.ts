'use client';

import { useState, useCallback } from 'react';
import { workerManager } from '@/lib/workers/worker-manager';
import { useAnalytics } from './useAnalytics';

interface WorkerResult {
  outputPath?: string;
  outputPaths?: string[];
  originalSize?: number;
  compressedSize?: number;
}

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  result: WorkerResult | null;
}

interface UseWorkerProcessingReturn {
  state: ProcessingState;
  compressPdf: (filePath: string, quality: 'light' | 'medium' | 'strong') => Promise<void>;
  mergePdfs: (filePaths: string[]) => Promise<void>;
  splitPdf: (filePath: string, ranges: string) => Promise<void>;
  imagesToPdf: (imagePaths: string[], mode: 'single' | 'multiple') => Promise<void>;
  pdfToImages: (filePath: string, format: 'png' | 'jpg') => Promise<void>;
  reset: () => void;
}

export function useWorkerProcessing(): UseWorkerProcessingReturn {
  const { trackFile } = useAnalytics();
  
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    result: null
  });

  const reset = useCallback(() => {
    setState({
      isProcessing: false,
      progress: 0,
      error: null,
      result: null
    });
  }, []);

  const handleProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }));
  }, []);

  const handleError = useCallback((error: Error, operation: string) => {
    setState(prev => ({
      ...prev,
      isProcessing: false,
      error: error.message,
      progress: 0
    }));
    
    // Track error in analytics
    trackFile('job_error', operation, {
      error_type: error.message
    });
  }, [trackFile]);

  const handleSuccess = useCallback((result: WorkerResult, operation: string, fileCount: number = 1) => {
    setState(prev => ({
      ...prev,
      isProcessing: false,
      result,
      progress: 100
    }));
    
    // Track success in analytics
    trackFile('job_success', operation, {
      file_count: fileCount
    });
  }, [trackFile]);

  const compressPdf = useCallback(async (filePath: string, quality: 'light' | 'medium' | 'strong') => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null, progress: 0 }));
      
      const result = await workerManager.compressPdf(filePath, quality, handleProgress);
      handleSuccess(result, 'pdf-compress');
    } catch (error) {
      handleError(error as Error, 'pdf-compress');
    }
  }, [handleProgress, handleSuccess, handleError]);

  const mergePdfs = useCallback(async (filePaths: string[]) => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null, progress: 0 }));
      
      const result = await workerManager.mergePdfs(filePaths, handleProgress);
      handleSuccess(result, 'pdf-merge', filePaths.length);
    } catch (error) {
      handleError(error as Error, 'pdf-merge');
    }
  }, [handleProgress, handleSuccess, handleError]);

  const splitPdf = useCallback(async (filePath: string, ranges: string) => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null, progress: 0 }));
      
      const result = await workerManager.splitPdf(filePath, ranges, handleProgress);
      handleSuccess(result, 'pdf-split');
    } catch (error) {
      handleError(error as Error, 'pdf-split');
    }
  }, [handleProgress, handleSuccess, handleError]);

  const imagesToPdf = useCallback(async (imagePaths: string[], mode: 'single' | 'multiple') => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null, progress: 0 }));
      
      const result = await workerManager.imagesToPdf(imagePaths, mode, handleProgress);
      handleSuccess(result, 'images-to-pdf', imagePaths.length);
    } catch (error) {
      handleError(error as Error, 'images-to-pdf');
    }
  }, [handleProgress, handleSuccess, handleError]);

  const pdfToImages = useCallback(async (filePath: string, format: 'png' | 'jpg') => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null, progress: 0 }));
      
      const result = await workerManager.pdfToImages(filePath, format, handleProgress);
      handleSuccess(result, 'pdf-to-images');
    } catch (error) {
      handleError(error as Error, 'pdf-to-images');
    }
  }, [handleProgress, handleSuccess, handleError]);

  return {
    state,
    compressPdf,
    mergePdfs,
    splitPdf,
    imagesToPdf,
    pdfToImages,
    reset
  };
}
