'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dropzone, UploadedFile } from '@/components/Dropzone';
import { Progress } from '@/components/ui/progress';
import { GitMerge, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { newJobId } from '@/lib/jobs/id';
import { names } from '@/lib/names';
import { track } from '@/lib/analytics/client';

interface ProcessingResult {
  success: boolean;
  downloadUrl?: string;
  filename?: string;
  error?: string;
  originalSize?: number;
  newSize?: number;
}

export default function PDFMergePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);

  const handleFilesAdded = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      toast.error('Only PDF files are allowed for merging');
    }

    const newFiles: UploadedFile[] = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'success',
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Track file uploads
    pdfFiles.forEach(file => {
      track('file_upload', {
        tool: 'merge',
        sizeMb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        pages: 0 // PDF page count would need to be extracted
      })
    })
  };

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setResult(null);
  };

  const handleMerge = async () => {
    if (uploadedFiles.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge');
      return;
    }

    // Generate job ID for tracking
    const jobId = newJobId('merge');

    setIsProcessing(true);
    setProcessingProgress(0);
    setResult(null);

    // Track job start
    track('job_start', {
      tool: 'merge',
      jobId,
      fileCount: uploadedFiles.length
    });

    try {
      // Import pdf-lib dynamically to avoid SSR issues
      const { PDFDocument } = await import('pdf-lib');
      
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      setProcessingProgress(10);

      let totalPages = 0;

      // Process each uploaded file
      for (let i = 0; i < uploadedFiles.length; i++) {
        const uploadedFile = uploadedFiles[i];
        
        // Load the PDF
        const arrayBuffer = await uploadedFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // Copy all pages from this PDF to the merged PDF
        const pageIndices = pdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
        
        // Add the copied pages to the merged PDF
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        
        totalPages += pageIndices.length;
        
        // Update progress
        setProcessingProgress(10 + ((i + 1) / uploadedFiles.length) * 80);
      }

      // Generate the merged PDF bytes
      const pdfBytes = await mergedPdf.save();
      setProcessingProgress(100);

      // Create download URL
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
      
      // Use consistent filename convention
      const mergedFilename = names.merge();

      setResult({
        success: true,
        downloadUrl,
        filename: mergedFilename,
        originalSize: totalSize,
        newSize: pdfBytes.length,
      });

      // Track successful completion
      track('job_success', {
        tool: 'merge',
        jobId,
        fileCount: uploadedFiles.length,
        totalPages,
        totalOriginalSize: totalSize,
        finalSize: pdfBytes.length
      });

      toast.success('PDFs merged successfully!');
    } catch (error) {
      console.error('Error merging PDFs:', error);
      
      // Track error
      track('job_error', {
        tool: 'merge',
        jobId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to merge PDFs',
      });
      toast.error('Failed to merge PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <GitMerge className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Merge
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Combine multiple PDF files into a single document. Preserve page order and bookmarks. All processing happens in your browser for maximum privacy.
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={20}
              disabled={isProcessing}
            />
          </div>

          {/* Processing Section */}
          {uploadedFiles.length >= 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Merge PDFs
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                Ready to merge {uploadedFiles.length} PDF files
              </p>
              
              {isProcessing && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Processing...</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>
              )}
              
              <Button 
                onClick={handleMerge}
                disabled={isProcessing || uploadedFiles.length < 2}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-sm sm:text-base"
                size="lg"
              >
                {isProcessing ? 'Merging...' : `Merge ${uploadedFiles.length} PDFs`}
              </Button>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2" />
                )}
                <span>{result.success ? 'Merge Complete' : 'Merge Failed'}</span>
              </h3>
              
              {result.success ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-3 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base text-green-900 dark:text-green-100 break-words">{result.filename}</p>
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                        {result.originalSize && result.newSize && (
                          <>Original: {formatFileSize(result.originalSize)} → Final: {formatFileSize(result.newSize)}</>
                        )}
                      </p>
                    </div>
                    <a
                      href={result.downloadUrl}
                      download={result.filename}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base flex-shrink-0"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm sm:text-base text-red-900 dark:text-red-100">{result.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <GitMerge className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Combine Multiple PDFs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Merge up to 20 PDF files into a single document
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Preserve Formatting</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maintain original quality and formatting of all documents
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Custom Page Order</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Files are merged in the order you upload them
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download your merged PDF immediately after processing
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How many PDF files can I merge at once?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    You can merge up to 20 PDF files in a single operation. This limit ensures optimal performance and prevents browser memory issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Are bookmarks and links preserved?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Basic document structure is preserved, but complex interactive elements like bookmarks and internal links may not function correctly in the merged document.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is my data secure during the merge process?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Absolutely! All PDF merging happens entirely in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Will the page order be preserved?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, the pages will be merged in the exact order you upload the files. The first uploaded file will appear first, followed by the second file, and so on.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What&apos;s the maximum file size for merging?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Each individual PDF can be up to 50MB, and the total combined size of all files should not exceed 200MB for optimal performance.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I rearrange files before merging?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Currently, files are merged in upload order. To change the order, remove and re-upload files in your desired sequence before clicking merge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
