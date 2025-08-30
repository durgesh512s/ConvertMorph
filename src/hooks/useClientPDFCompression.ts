import { useState, useCallback, useRef } from 'react';
import { CompressionOptions, CompressionResult, CompressionProgress, WorkerMessage, WorkerResponse } from '@/workers/pdfCompressionWorker';

export interface CompressionState {
  isProcessing: boolean;
  progress: Record<string, number>;
  speed: Record<string, string>;
  results: Record<string, CompressionResult>;
  errors: Record<string, string>;
}

export interface UseClientPDFCompressionReturn {
  state: CompressionState;
  compressFiles: (files: File[], options: CompressionOptions) => Promise<void>;
  cancelCompression: () => void;
  clearResults: () => void;
}

export function useClientPDFCompression(): UseClientPDFCompressionReturn {
  const [state, setState] = useState<CompressionState>({
    isProcessing: false,
    progress: {},
    speed: {},
    results: {},
    errors: {},
  });

  const workersRef = useRef<Map<string, Worker>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  const updateProgress = useCallback((fileId: string, progress: number, speed?: string) => {
    setState(prev => ({
      ...prev,
      progress: { ...prev.progress, [fileId]: progress },
      speed: speed ? { ...prev.speed, [fileId]: speed } : prev.speed,
    }));
  }, []);

  const updateResult = useCallback((fileId: string, result: CompressionResult) => {
    setState(prev => ({
      ...prev,
      results: { ...prev.results, [fileId]: result },
    }));
  }, []);

  const updateError = useCallback((fileId: string, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [fileId]: error },
    }));
  }, []);

  const createWorker = useCallback(() => {
    // Create worker from the TypeScript file
    // In production, this would be a compiled JS file
    const workerCode = `
      // Import the compression worker code
      importScripts('/workers/pdfCompressionWorker.js');
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  }, []);

  const compressFiles = useCallback(async (files: File[], options: CompressionOptions) => {
    // Clear previous state
    setState({
      isProcessing: true,
      progress: {},
      speed: {},
      results: {},
      errors: {},
    });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Process files with limited concurrency
      const maxConcurrency = 3;
      const fileQueue = [...files];
      const activePromises: Promise<void>[] = [];

      const processFile = async (file: File): Promise<void> => {
        if (abortController.signal.aborted) return;

        const fileId = `${file.name}-${file.size}-${file.lastModified}`;
        
        return new Promise<void>((resolve, reject) => {
          // For now, use direct compression without worker to avoid worker setup complexity
          // In a production environment, you'd want to use the worker for better performance
          compressFileDirectly(file, fileId, options)
            .then(() => resolve())
            .catch(reject);
        });
      };

      const processNext = async (): Promise<void> => {
        const file = fileQueue.shift();
        if (!file) return;

        const promise = processFile(file).finally(() => {
          const index = activePromises.indexOf(promise);
          if (index > -1) {
            activePromises.splice(index, 1);
          }
          return processNext();
        });

        activePromises.push(promise);
      };

      // Start initial batch
      for (let i = 0; i < Math.min(maxConcurrency, files.length); i++) {
        processNext();
      }

      // Wait for all files to complete
      await Promise.allSettled(activePromises);

    } catch (error) {
      console.error('Compression failed:', error);
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
      abortControllerRef.current = null;
    }
  }, [updateProgress, updateResult, updateError]);

  const compressFileDirectly = async (file: File, fileId: string, options: CompressionOptions) => {
    try {
      // Dynamic import to avoid SSR issues
      const { PDFCompressor } = await import('@/workers/pdfCompressionWorker');
      
      const startTime = Date.now();
      updateProgress(fileId, 0, 'Starting...');

      const compressor = new PDFCompressor((progress) => {
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = elapsed > 0 ? `${(file.size * progress.progress / 100 / elapsed / 1024).toFixed(1)} KB/s` : '0.0 KB/s';
        updateProgress(fileId, progress.progress, progress.message);
      });

      const arrayBuffer = await file.arrayBuffer();
      const result = await compressor.compressPDF(arrayBuffer, options);

      if (result.success) {
        updateResult(fileId, result);
        updateProgress(fileId, 100, 'Complete');
      } else {
        updateError(fileId, result.error || 'Compression failed');
      }
    } catch (error) {
      updateError(fileId, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const cancelCompression = useCallback(() => {
    abortControllerRef.current?.abort();
    
    // Terminate all workers
    workersRef.current.forEach(worker => {
      worker.terminate();
    });
    workersRef.current.clear();

    setState(prev => ({ ...prev, isProcessing: false }));
  }, []);

  const clearResults = useCallback(() => {
    setState({
      isProcessing: false,
      progress: {},
      speed: {},
      results: {},
      errors: {},
    });
  }, []);

  return {
    state,
    compressFiles,
    cancelCompression,
    clearResults,
  };
}
