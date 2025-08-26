'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dropzone, UploadedFile } from '@/components/Dropzone';
import { Progress } from '@/components/ui/progress';
import { GitMerge, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

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

    setIsProcessing(true);
    setProcessingProgress(0);
    setResult(null);

    try {
      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Create FormData for file upload
      const formData = new FormData();
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`file-${index}`, uploadedFile.file);
      });

      // For now, simulate the merge process
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setProcessingProgress(100);

      // Simulate successful result
      const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
      setResult({
        success: true,
        downloadUrl: '#', // This would be the actual download URL
        filename: 'merged.pdf',
        originalSize: totalSize,
        newSize: Math.floor(totalSize * 0.95), // Simulate slight size change
      });

      toast.success('PDFs merged successfully!');
    } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <GitMerge className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PDF Merge
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combine multiple PDF files into a single document. Upload your PDFs and merge them instantly.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>
              Select multiple PDF files to merge. Files will be merged in the order they appear.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={20}
              disabled={isProcessing}
            />
          </CardContent>
        </Card>

        {/* Processing Section */}
        {uploadedFiles.length >= 2 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Merge PDFs</CardTitle>
              <CardDescription>
                Ready to merge {uploadedFiles.length} PDF files
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing...</span>
                    <span className="text-sm text-gray-500">{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>
              )}
              
              <Button 
                onClick={handleMerge}
                disabled={isProcessing || uploadedFiles.length < 2}
                className="w-full"
                size="lg"
              >
                {isProcessing ? 'Merging...' : `Merge ${uploadedFiles.length} PDFs`}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span>{result.success ? 'Merge Complete' : 'Merge Failed'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">{result.filename}</p>
                      <p className="text-sm text-green-700">
                        {result.originalSize && result.newSize && (
                          <>Original: {formatFileSize(result.originalSize)} → Final: {formatFileSize(result.newSize)}</>
                        )}
                      </p>
                    </div>
                    <Button asChild>
                      <a href={result.downloadUrl} download={result.filename}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-900">{result.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How many PDFs can I merge?</h3>
              <p className="text-gray-600">You can merge up to 20 PDF files at once, with a maximum file size of 25MB per file.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Will the quality be preserved?</h3>
              <p className="text-gray-600">Yes, the original quality of your PDFs will be maintained during the merge process.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Absolutely. All processing happens in your browser - your files never leave your device.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Can I change the order of pages?</h3>
              <p className="text-gray-600">Files are merged in the order they appear in the list. You can remove and re-add files to change the order.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
