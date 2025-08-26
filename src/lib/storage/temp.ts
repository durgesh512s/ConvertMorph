import { promises as fs } from 'fs';
import { createWriteStream } from 'fs';
import path from 'path';
import os from 'os';
import { randomUUID } from 'crypto';
import archiver from 'archiver';
import { Readable } from 'stream';

export interface TempFile {
  id: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}

export interface TempJob {
  id: string;
  directory: string;
  files: TempFile[];
  createdAt: Date;
}

class TempStorage {
  private baseDir: string;
  private jobs = new Map<string, TempJob>();

  constructor() {
    this.baseDir = path.join(os.tmpdir(), 'docmorph');
  }

  async init(): Promise<void> {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create temp directory:', error);
    }
  }

  async createJob(): Promise<string> {
    const jobId = randomUUID();
    const jobDir = path.join(this.baseDir, jobId);
    
    await fs.mkdir(jobDir, { recursive: true });
    
    const job: TempJob = {
      id: jobId,
      directory: jobDir,
      files: [],
      createdAt: new Date(),
    };
    
    this.jobs.set(jobId, job);
    return jobId;
  }

  async saveFile(
    jobId: string,
    buffer: Buffer,
    originalName: string,
    mimeType: string
  ): Promise<TempFile> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    const fileId = randomUUID();
    const ext = path.extname(originalName);
    const fileName = `${fileId}${ext}`;
    const filePath = path.join(job.directory, fileName);

    await fs.writeFile(filePath, buffer);

    const tempFile: TempFile = {
      id: fileId,
      originalName,
      path: filePath,
      size: buffer.length,
      mimeType,
      createdAt: new Date(),
    };

    job.files.push(tempFile);
    return tempFile;
  }

  async getFile(jobId: string, fileId: string): Promise<TempFile | null> {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return job.files.find(f => f.id === fileId) || null;
  }

  async readFile(filePath: string): Promise<Buffer> {
    return fs.readFile(filePath);
  }

  async writeFile(filePath: string, data: Buffer): Promise<void> {
    await fs.writeFile(filePath, data);
  }

  async createZip(files: TempFile[], outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = createWriteStream(outputPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => resolve());
      archive.on('error', reject);

      archive.pipe(output);

      for (const file of files) {
        archive.file(file.path, { name: file.originalName });
      }

      archive.finalize();
    });
  }

  async cleanupJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    try {
      await fs.rm(job.directory, { recursive: true, force: true });
      this.jobs.delete(jobId);
    } catch (error) {
      console.error(`Failed to cleanup job ${jobId}:`, error);
    }
  }

  async cleanupOldJobs(maxAgeHours: number = 1): Promise<void> {
    const cutoff = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);
    
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.createdAt < cutoff) {
        await this.cleanupJob(jobId);
      }
    }
  }

  getJobFiles(jobId: string): TempFile[] {
    const job = this.jobs.get(jobId);
    return job?.files || [];
  }

  async getJobDirectory(jobId: string): Promise<string | null> {
    const job = this.jobs.get(jobId);
    return job?.directory || null;
  }
}

export const tempStorage = new TempStorage();

// Initialize on module load
tempStorage.init().catch(console.error);
