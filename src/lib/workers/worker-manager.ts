import { Worker } from 'worker_threads';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface WorkerResult {
  outputPath?: string;
  outputPaths?: string[];
  originalSize?: number;
  compressedSize?: number;
}

interface Job {
  id: string;
  worker: Worker;
  resolve: (value: WorkerResult) => void;
  reject: (error: Error) => void;
  onProgress?: (progress: number) => void;
  startTime: number;
}

interface WorkerData {
  filePath?: string;
  filePaths?: string[];
  quality?: 'light' | 'medium' | 'strong';
  ranges?: string;
  imagePaths?: string[];
  mode?: 'single' | 'multiple';
  format?: 'png' | 'jpg';
}

interface WorkerMessage {
  type: 'compress' | 'merge' | 'split' | 'images-to-pdf' | 'pdf-to-images';
  data: WorkerData;
  jobId: string;
}

interface WorkerResponse {
  type: 'progress' | 'complete' | 'error';
  jobId: string;
  data?: WorkerResult;
  error?: string;
  progress?: number;
}

class WorkerManager {
  private jobs = new Map<string, Job>();
  private maxWorkers = 4; // Limit concurrent workers
  private activeWorkers = 0;
  private queue: (() => void)[] = [];

  private createWorker(message: WorkerMessage, onProgress?: (progress: number) => void): Promise<WorkerResult> {
    return new Promise((resolve, reject) => {
      const executeJob = () => {
        const jobId = message.jobId;
        const workerPath = path.join(__dirname, 'pdf-worker.js');
        
        try {
          const worker = new Worker(workerPath);
          
          const job: Job = {
            id: jobId,
            worker,
            resolve,
            reject,
            onProgress,
            startTime: Date.now()
          };
          
          this.jobs.set(jobId, job);
          this.activeWorkers++;
          
          // Set up worker message handling
          worker.on('message', (response: WorkerResponse) => {
            const currentJob = this.jobs.get(response.jobId);
            if (!currentJob) return;
            
            switch (response.type) {
              case 'progress':
                if (response.progress !== undefined && currentJob.onProgress) {
                  currentJob.onProgress(response.progress);
                }
                break;
                
              case 'complete':
                this.cleanupJob(jobId);
                currentJob.resolve(response.data || {});
                this.processQueue();
                break;
                
              case 'error':
                this.cleanupJob(jobId);
                currentJob.reject(new Error(response.error || 'Worker error'));
                this.processQueue();
                break;
            }
          });
          
          // Handle worker errors
          worker.on('error', (error) => {
            const currentJob = this.jobs.get(jobId);
            if (currentJob) {
              this.cleanupJob(jobId);
              currentJob.reject(error);
              this.processQueue();
            }
          });
          
          // Handle worker exit
          worker.on('exit', (code) => {
            const currentJob = this.jobs.get(jobId);
            if (currentJob && code !== 0) {
              this.cleanupJob(jobId);
              currentJob.reject(new Error(`Worker stopped with exit code ${code}`));
              this.processQueue();
            }
          });
          
          // Send message to worker
          worker.postMessage(message);
          
          // Set timeout for job (5 minutes)
          setTimeout(() => {
            const currentJob = this.jobs.get(jobId);
            if (currentJob) {
              this.cleanupJob(jobId);
              currentJob.reject(new Error('Job timeout'));
              this.processQueue();
            }
          }, 5 * 60 * 1000);
          
        } catch (error) {
          this.activeWorkers--;
          reject(error);
          this.processQueue();
        }
      };
      
      // If we're at max capacity, queue the job
      if (this.activeWorkers >= this.maxWorkers) {
        this.queue.push(executeJob);
      } else {
        executeJob();
      }
    });
  }
  
  private cleanupJob(jobId: string) {
    const job = this.jobs.get(jobId);
    if (job) {
      job.worker.terminate();
      this.jobs.delete(jobId);
      this.activeWorkers--;
    }
  }
  
  private processQueue() {
    if (this.queue.length > 0 && this.activeWorkers < this.maxWorkers) {
      const nextJob = this.queue.shift();
      if (nextJob) {
        nextJob();
      }
    }
  }
  
  // Public methods for each operation type
  async compressPdf(
    filePath: string, 
    quality: 'light' | 'medium' | 'strong',
    onProgress?: (progress: number) => void
  ): Promise<{ outputPath: string; originalSize: number; compressedSize: number }> {
    const jobId = uuidv4();
    const message: WorkerMessage = {
      type: 'compress',
      data: { filePath, quality },
      jobId
    };
    
    const result = await this.createWorker(message, onProgress);
    if (!result.outputPath || result.originalSize === undefined || result.compressedSize === undefined) {
      throw new Error('Invalid compression result');
    }
    
    return {
      outputPath: result.outputPath,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize
    };
  }
  
  async mergePdfs(
    filePaths: string[],
    onProgress?: (progress: number) => void
  ): Promise<{ outputPath: string }> {
    const jobId = uuidv4();
    const message: WorkerMessage = {
      type: 'merge',
      data: { filePaths },
      jobId
    };
    
    const result = await this.createWorker(message, onProgress);
    if (!result.outputPath) {
      throw new Error('Invalid merge result');
    }
    
    return { outputPath: result.outputPath };
  }
  
  async splitPdf(
    filePath: string,
    ranges: string,
    onProgress?: (progress: number) => void
  ): Promise<{ outputPaths: string[] }> {
    const jobId = uuidv4();
    const message: WorkerMessage = {
      type: 'split',
      data: { filePath, ranges },
      jobId
    };
    
    const result = await this.createWorker(message, onProgress);
    if (!result.outputPaths) {
      throw new Error('Invalid split result');
    }
    
    return { outputPaths: result.outputPaths };
  }
  
  async imagesToPdf(
    imagePaths: string[],
    mode: 'single' | 'multiple',
    onProgress?: (progress: number) => void
  ): Promise<{ outputPaths: string[] }> {
    const jobId = uuidv4();
    const message: WorkerMessage = {
      type: 'images-to-pdf',
      data: { imagePaths, mode },
      jobId
    };
    
    const result = await this.createWorker(message, onProgress);
    if (!result.outputPaths) {
      throw new Error('Invalid images to PDF result');
    }
    
    return { outputPaths: result.outputPaths };
  }
  
  async pdfToImages(
    filePath: string,
    format: 'png' | 'jpg',
    onProgress?: (progress: number) => void
  ): Promise<{ outputPaths: string[] }> {
    const jobId = uuidv4();
    const message: WorkerMessage = {
      type: 'pdf-to-images',
      data: { filePath, format },
      jobId
    };
    
    const result = await this.createWorker(message, onProgress);
    if (!result.outputPaths) {
      throw new Error('Invalid PDF to images result');
    }
    
    return { outputPaths: result.outputPaths };
  }
  
  // Get current job statistics
  getStats() {
    return {
      activeJobs: this.activeWorkers,
      queuedJobs: this.queue.length,
      maxWorkers: this.maxWorkers
    };
  }
  
  // Cancel all jobs and cleanup
  async shutdown() {
    const jobPromises = Array.from(this.jobs.values()).map(job => {
      return new Promise<void>((resolve) => {
        job.worker.once('exit', () => resolve());
        job.worker.terminate();
      });
    });
    
    await Promise.all(jobPromises);
    this.jobs.clear();
    this.queue.length = 0;
    this.activeWorkers = 0;
  }
}

// Export singleton instance
export const workerManager = new WorkerManager();

// Export types for use in other files
export type {
  WorkerMessage,
  WorkerResponse
};
