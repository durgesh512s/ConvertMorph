import { z } from 'zod';

// Environment configuration schema
export const envSchema = z.object({
  SITE_URL: z.string().url().default('https://convertmorph.com'),
  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(25),
  MAX_PAGES: z.coerce.number().positive().default(200),
  JOB_TIMEOUT_MS: z.coerce.number().positive().default(90000),
  COMPRESS_TIMEOUT_MS: z.coerce.number().positive().default(180000),
  ALLOWED_MIMES: z.string().default('application/pdf,image/jpeg,image/png'),
  RATE_LIMIT_POINTS: z.coerce.number().positive().default(60),
  RATE_LIMIT_DURATION: z.coerce.number().positive().default(3600),
  ENABLE_GHOSTSCRIPT: z.coerce.boolean().default(true),
  TEMP_CLEANUP_INTERVAL_HOURS: z.coerce.number().positive().default(1),
});

// File upload validation
export const fileUploadSchema = z.object({
  name: z.string().min(1),
  size: z.number().positive(),
  type: z.string().min(1),
});

// PDF compression levels
export const compressionLevelSchema = z.enum(['light', 'medium', 'strong']);

// PDF split ranges validation
export const splitRangeSchema = z.string().regex(
  /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/,
  'Invalid range format. Use format like: 1-3,5,7-9'
);

// Images to PDF options
export const imagesToPdfSchema = z.object({
  mode: z.enum(['single', 'multiple']).default('single'),
  pageSize: z.enum(['A4', 'Letter', 'Legal']).default('A4'),
  orientation: z.enum(['portrait', 'landscape']).default('portrait'),
});

// PDF to images options
export const pdfToImagesSchema = z.object({
  format: z.enum(['png', 'jpg']).default('png'),
  quality: z.number().min(1).max(100).default(90),
  dpi: z.number().min(72).max(600).default(150),
});

// Tool types
export const toolTypeSchema = z.enum([
  'pdf-compress',
  'pdf-merge',
  'pdf-split',
  'images-to-pdf',
  'pdf-to-images'
]);

export type CompressionLevel = z.infer<typeof compressionLevelSchema>;
export type ImagesToPdfOptions = z.infer<typeof imagesToPdfSchema>;
export type PdfToImagesOptions = z.infer<typeof pdfToImagesSchema>;
export type ToolType = z.infer<typeof toolTypeSchema>;
