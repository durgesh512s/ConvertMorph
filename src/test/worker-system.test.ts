import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { workerManager } from '@/lib/workers/worker-manager';

// Mock worker_threads module
vi.mock('worker_threads', () => ({
  Worker: vi.fn().mockImplementation(() => ({
    postMessage: vi.fn(),
    terminate: vi.fn(),
    on: vi.fn(),
    once: vi.fn()
  }))
}));

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-job-id')
}));

// Mock path
vi.mock('path', () => ({
  join: vi.fn(() => '/mock/path/pdf-worker.js')
}));

describe('Worker System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await workerManager.shutdown();
  });

  describe('WorkerManager', () => {
    it('should get initial stats', () => {
      const stats = workerManager.getStats();
      expect(stats).toEqual({
        activeJobs: 0,
        queuedJobs: 0,
        maxWorkers: 4
      });
    });

    it('should handle PDF compression request', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            // Simulate worker response
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: {
                  outputPath: '/mock/compressed.pdf',
                  originalSize: 1000000,
                  compressedSize: 500000
                }
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const promise = workerManager.compressPdf('/mock/input.pdf', 'medium');
      
      // Wait a bit for the mock to execute
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        type: 'compress',
        data: { filePath: '/mock/input.pdf', quality: 'medium' },
        jobId: 'test-job-id'
      });
    });

    it('should handle PDF merge request', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: {
                  outputPath: '/mock/merged.pdf'
                }
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const filePaths = ['/mock/file1.pdf', '/mock/file2.pdf'];
      const promise = workerManager.mergePdfs(filePaths);
      
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        type: 'merge',
        data: { filePaths },
        jobId: 'test-job-id'
      });
    });

    it('should handle PDF split request', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: {
                  outputPaths: ['/mock/page1.pdf', '/mock/page2.pdf']
                }
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const promise = workerManager.splitPdf('/mock/input.pdf', '1-2');
      
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        type: 'split',
        data: { filePath: '/mock/input.pdf', ranges: '1-2' },
        jobId: 'test-job-id'
      });
    });

    it('should handle images to PDF request', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: {
                  outputPaths: ['/mock/output.pdf']
                }
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const imagePaths = ['/mock/image1.jpg', '/mock/image2.jpg'];
      const promise = workerManager.imagesToPdf(imagePaths, 'single');
      
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        type: 'images-to-pdf',
        data: { imagePaths, mode: 'single' },
        jobId: 'test-job-id'
      });
    });

    it('should handle PDF to images request', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: {
                  outputPaths: ['/mock/page1.png', '/mock/page2.png']
                }
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const promise = workerManager.pdfToImages('/mock/input.pdf', 'png');
      
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        type: 'pdf-to-images',
        data: { filePath: '/mock/input.pdf', format: 'png' },
        jobId: 'test-job-id'
      });
    });

    it('should handle worker errors', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            setTimeout(() => {
              callback({
                type: 'error',
                jobId: 'test-job-id',
                error: 'Processing failed'
              });
            }, 10);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      await expect(
        workerManager.compressPdf('/mock/input.pdf', 'medium')
      ).rejects.toThrow('Processing failed');
    });

    it('should handle progress updates', async () => {
      const progressCallback = vi.fn();
      
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn((event, callback) => {
          if (event === 'message') {
            // Send progress updates
            setTimeout(() => {
              callback({
                type: 'progress',
                jobId: 'test-job-id',
                progress: 50
              });
            }, 5);
            
            setTimeout(() => {
              callback({
                type: 'complete',
                jobId: 'test-job-id',
                data: { outputPath: '/mock/output.pdf' }
              });
            }, 15);
          }
        }),
        once: vi.fn()
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      const promise = workerManager.compressPdf('/mock/input.pdf', 'medium', progressCallback);
      
      await new Promise(resolve => setTimeout(resolve, 25));
      
      expect(progressCallback).toHaveBeenCalledWith(50);
    });

    it('should shutdown properly', async () => {
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        on: vi.fn(),
        once: vi.fn((event, callback) => {
          if (event === 'exit') {
            setTimeout(callback, 5);
          }
        })
      };

      const { Worker } = await import('worker_threads');
      (Worker as any).mockImplementation(() => mockWorker);

      // Start a job to create an active worker
      const promise = workerManager.compressPdf('/mock/input.pdf', 'medium');
      
      // Shutdown should terminate all workers
      await workerManager.shutdown();
      
      expect(mockWorker.terminate).toHaveBeenCalled();
      
      const stats = workerManager.getStats();
      expect(stats.activeJobs).toBe(0);
    });
  });
});
