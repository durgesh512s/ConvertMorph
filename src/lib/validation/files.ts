import { fileTypeFromBuffer } from 'file-type';
import { envSchema } from './schemas';

const env = envSchema.parse(process.env);

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  detectedType?: string;
}

export class FileValidator {
  private allowedMimes: Set<string>;
  private maxSizeBytes: number;

  constructor() {
    this.allowedMimes = new Set(env.ALLOWED_MIMES.split(','));
    this.maxSizeBytes = env.MAX_FILE_SIZE_MB * 1024 * 1024;
  }

  async validateFile(
    buffer: Buffer,
    originalName: string,
    declaredMimeType: string
  ): Promise<FileValidationResult> {
    // Check file size
    if (buffer.length > this.maxSizeBytes) {
      return {
        isValid: false,
        error: `File size exceeds ${env.MAX_FILE_SIZE_MB}MB limit`,
      };
    }

    // Check file extension
    const extension = this.getFileExtension(originalName).toLowerCase();
    if (!this.isAllowedExtension(extension)) {
      return {
        isValid: false,
        error: `File type not allowed. Allowed types: PDF, JPG, JPEG, PNG`,
      };
    }

    // Detect actual file type from buffer
    const detectedType = await fileTypeFromBuffer(buffer);
    
    if (!detectedType) {
      return {
        isValid: false,
        error: 'Could not determine file type',
      };
    }

    // Verify the detected type matches allowed types
    if (!this.allowedMimes.has(detectedType.mime)) {
      return {
        isValid: false,
        error: `File type ${detectedType.mime} is not allowed`,
        detectedType: detectedType.mime,
      };
    }

    // Additional validation for specific file types
    if (detectedType.mime === 'application/pdf') {
      const pdfValidation = await this.validatePDF(buffer);
      if (!pdfValidation.isValid) {
        return pdfValidation;
      }
    }

    return {
      isValid: true,
      detectedType: detectedType.mime,
    };
  }

  private async validatePDF(buffer: Buffer): Promise<FileValidationResult> {
    try {
      // Basic PDF validation - check for PDF header
      const header = buffer.subarray(0, 8).toString('ascii');
      if (!header.startsWith('%PDF-')) {
        return {
          isValid: false,
          error: 'Invalid PDF file format',
        };
      }

      // Additional PDF validation could be added here
      // For now, we'll do basic validation
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: 'PDF validation failed',
      };
    }
  }

  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? '' : filename.substring(lastDot + 1);
  }

  private isAllowedExtension(extension: string): boolean {
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
    return allowedExtensions.includes(extension.toLowerCase());
  }

  sanitizeFilename(filename: string): string {
    // Remove or replace dangerous characters
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255); // Limit filename length
  }

  async validateMultipleFiles(
    files: Array<{ buffer: Buffer; name: string; type: string }>
  ): Promise<Array<FileValidationResult & { filename: string }>> {
    const results = [];

    for (const file of files) {
      const validation = await this.validateFile(file.buffer, file.name, file.type);
      results.push({
        ...validation,
        filename: file.name,
      });
    }

    return results;
  }
}

export const fileValidator = new FileValidator();
