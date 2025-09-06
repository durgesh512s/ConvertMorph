'use client'

import { useState } from 'react'
import { Maximize2, Download, FileImage, Settings, RotateCcw, Lock, Unlock, Zap, Palette, Shield, Upload, Sliders, Target, CheckCircle, Ruler, Crop, Monitor, Smartphone, Camera } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'

interface ProcessedFile {
  name: string
  originalSize: number
  resizedSize: number
  originalDimensions: { width: number; height: number }
  newDimensions: { width: number; height: number }
  downloadUrl: string
  format: string
  sizeChange: { percentage: number; isReduction: boolean }
}

export default function ImageResizePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [outputFormat, setOutputFormat] = useState<'original' | 'jpeg' | 'png' | 'webp'>('original')
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesAdded = async (files: File[]) => {
    const mapped = files.map(file => {
      track('file_upload', {
        tool: 'image-resize',
        sizeMb: Math.round(file.size / (1024*1024) * 100) / 100,
        format: file.type
      })
      return { 
        id: Math.random().toString(36).slice(2, 11), 
        file, 
        name: file.name, 
        size: file.size, 
        type: file.type, 
        status: 'success' 
      } as UploadedFile
    })
    setUploadedFiles(prev => [...prev, ...mapped])
    setProcessedFiles([])
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleWidthChange = (value: string) => {
    setWidth(value)
    if (maintainAspectRatio && value && uploadedFiles.length > 0) {
      // Calculate height based on first image's aspect ratio
      const firstFile = uploadedFiles[0]
      if (firstFile) {
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.naturalWidth / img.naturalHeight
          const newHeight = Math.round(parseInt(value) / aspectRatio)
          setHeight(newHeight.toString())
        }
        img.src = URL.createObjectURL(firstFile.file)
      }
    }
  }

  const handleHeightChange = (value: string) => {
    setHeight(value)
    if (maintainAspectRatio && value && uploadedFiles.length > 0) {
      // Calculate width based on first image's aspect ratio
      const firstFile = uploadedFiles[0]
      if (firstFile) {
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.naturalWidth / img.naturalHeight
          const newWidth = Math.round(parseInt(value) * aspectRatio)
          setWidth(newWidth.toString())
        }
        img.src = URL.createObjectURL(firstFile.file)
      }
    }
  }

  const handleResize = async () => {
    if (uploadedFiles.length === 0) return
    if (!width && !height) {
      toast.error('Please specify at least width or height')
      return
    }

    setIsProcessing(true)
    setProcessedFiles([])

    try {
      const results: ProcessedFile[] = []

      // Dynamically import the image resizer to avoid SSR issues
      const { resizeImage, calculateSizeChange } = await import('@/lib/imageResizer')

      for (const uf of uploadedFiles) {
        try {
          const result = await resizeImage(uf.file, {
            width: width ? parseInt(width) : undefined,
            height: height ? parseInt(height) : undefined,
            mode: maintainAspectRatio ? 'aspect-ratio' : 'exact',
            outputFormat,
            quality: quality / 100
          })

          const url = URL.createObjectURL(result.blob)
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')
          const sizeChange = calculateSizeChange(result.originalSize, result.resizedSize)

          results.push({
            name: names.resizeImage(
              safeName, 
              result.newDimensions.width, 
              result.newDimensions.height, 
              result.format
            ),
            originalSize: result.originalSize,
            resizedSize: result.resizedSize,
            originalDimensions: result.originalDimensions,
            newDimensions: result.newDimensions,
            downloadUrl: url,
            format: result.format,
            sizeChange
          })
        } catch (err) {
          console.error('Resize error:', err)
          toast.error(`Failed to resize ${uf.name}`)
        }
      }

      if (results.length > 0) {
        setProcessedFiles(results)
        toast.success(`Resized ${results.length} image${results.length > 1 ? 's' : ''} successfully!`)
      }
    } catch (error) {
      console.error('Resize failed:', error)
      toast.error('Resize failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatOptions = [
    { format: 'original' as const, name: 'Keep Original', description: 'Maintain original format' },
    { format: 'jpeg' as const, name: 'JPEG', description: 'Best for photos, smaller size' },
    { format: 'png' as const, name: 'PNG', description: 'Best for graphics, lossless' },
    { format: 'webp' as const, name: 'WebP', description: 'Modern format, excellent compression' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Maximize2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Image Resize</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Resize images to specific dimensions using Canvas API. Support for PNG, JPG, WebP with aspect ratio control.
            </p>
          </div>

          {/* Resize Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Resize Settings
            </h2>
            
            {/* Dimensions */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Dimensions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    id="width"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    placeholder="Enter width"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    placeholder="Enter height"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Aspect Ratio Toggle */}
              <div className="flex items-center">
                <button
                  onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    maintainAspectRatio
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {maintainAspectRatio ? (
                    <Lock className="h-4 w-4 mr-2" />
                  ) : (
                    <Unlock className="h-4 w-4 mr-2" />
                  )}
                  {maintainAspectRatio ? 'Maintain Aspect Ratio' : 'Free Resize'}
                </button>
              </div>
            </div>

            {/* Output Format */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Output Format</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {formatOptions.map(option => (
                  <div
                    key={option.format}
                    className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                      outputFormat === option.format
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setOutputFormat(option.format)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        checked={outputFormat === option.format}
                        onChange={() => setOutputFormat(option.format)}
                        className="mr-2 flex-shrink-0"
                        id={`format-${option.format}`}
                        name="output-format"
                      />
                      <label htmlFor={`format-${option.format}`} className="font-medium text-sm sm:text-base cursor-pointer text-gray-900 dark:text-white">
                        {option.name}
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Slider (for JPEG/WebP) */}
            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  Quality: {quality}%
                </h3>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Lower quality (smaller file)</span>
                  <span>Higher quality (larger file)</span>
                </div>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              onFileRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              accept={{ 
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'image/webp': ['.webp'],
                'image/gif': ['.gif'],
                'image/bmp': ['.bmp']
              }}
              maxFiles={20}
              maxSize={50 * 1024 * 1024}
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={handleResize}
                  disabled={isProcessing || (!width && !height)}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Resize Images ({uploadedFiles.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {processedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="h-4 w-4 mr-2" /> Resized Images
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex items-start min-w-0 flex-1">
                        <FileImage className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white break-words">{file.name}</p>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Original: {file.originalDimensions.width}×{file.originalDimensions.height}</span>
                            <span>Resized: {file.newDimensions.width}×{file.newDimensions.height}</span>
                            <span>Size: {formatFileSize(file.originalSize)} → {formatFileSize(file.resizedSize)}</span>
                            <span className={file.sizeChange.isReduction ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                              ({file.sizeChange.isReduction ? '-' : '+'}{file.sizeChange.percentage}%)
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">{file.format.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={file.downloadUrl}
                        download={file.name}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm mt-2 sm:mt-0"
                      >
                        <Download className="h-3 w-3 mr-1" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {processedFiles.length > 1 && (
                <button
                  onClick={async () => {
                    const files = processedFiles.map(file => ({ name: file.name, url: file.downloadUrl }))
                    await downloadFilesAsZip(files, 'resized-images.zip')
                  }}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" /> Download All as ZIP
                </button>
              )}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Maximize2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Precise Resizing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resize images to exact dimensions or maintain aspect ratio automatically</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Canvas Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">High-quality resizing using HTML5 Canvas API for optimal results</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Format Conversion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Convert between JPEG, PNG, WebP formats with quality control</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Client-Side Only</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">All processing happens in your browser - your images never leave your device</p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20 mb-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 dark:from-gray-300 dark:via-slate-300 dark:to-gray-200 bg-clip-text text-transparent mb-4">
                Professional Image Resizing Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master the art of image resizing for web, print, and digital media. Achieve perfect dimensions while maintaining quality and optimizing file sizes.
              </p>
            </div>

            {/* Step-by-Step Process */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Upload Images</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select up to 20 images in JPEG, PNG, WebP, GIF, or BMP format. Each file can be up to 50MB.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-orange-500" />
                      <span>Batch processing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-orange-500" />
                      <span>Multiple formats</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Ruler className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Set Dimensions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Enter target width and height in pixels. Choose to maintain aspect ratio or resize freely.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Lock className="h-3 w-3 text-gray-500" />
                      <span>Aspect ratio lock</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span>Precise control</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sliders className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Configure Output</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Select output format and quality settings. Optimize for your specific use case and requirements.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <Palette className="h-3 w-3 text-gray-500" />
                      <span>Format options</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Settings className="h-3 w-3 text-gray-500" />
                      <span>Quality control</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                  <div className="bg-gradient-to-br from-slate-700 to-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Download Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Get your resized images individually or download all as a convenient ZIP archive.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Individual files</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <FileImage className="h-3 w-3 text-gray-500" />
                      <span>Bulk ZIP download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resize Strategy Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Resize Strategy Guide</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web & Digital</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for websites and digital displays</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>Hero Images:</strong> 1920×1080px</li>
                        <li>• <strong>Blog Images:</strong> 1200×630px</li>
                        <li>• <strong>Thumbnails:</strong> 300×200px</li>
                        <li>• <strong>Social Media:</strong> 1080×1080px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">WebP Format</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Maintain Aspect</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">Optimize Size</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile & Apps</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Perfect for mobile applications and responsive design</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>App Icons:</strong> 512×512px</li>
                        <li>• <strong>Mobile Banners:</strong> 750×1334px</li>
                        <li>• <strong>Profile Images:</strong> 400×400px</li>
                        <li>• <strong>Card Images:</strong> 600×400px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Square Ratios</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">High DPI</span>
                        <span className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-xs">Small Files</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-700 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Print & Media</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">High-resolution for print and professional media</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Common Dimensions:</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• <strong>A4 Print:</strong> 2480×3508px</li>
                        <li>• <strong>Business Card:</strong> 1050×600px</li>
                        <li>• <strong>Poster:</strong> 3000×4000px</li>
                        <li>• <strong>Brochure:</strong> 2550×3300px</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">Best Practices:</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">PNG Format</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">300 DPI</span>
                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">High Quality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Resizing Tips</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Expert strategies to achieve optimal resizing results while maintaining quality and meeting specific requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Aspect Ratio Strategy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Always maintain aspect ratio for photos to prevent distortion. Use free resize only for graphics that need exact dimensions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <Ruler className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dimension Planning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Plan your target dimensions based on final use. Consider device pixel ratios and responsive breakpoints for web images.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 mt-1">
                      <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Format Selection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose WebP for web use, PNG for graphics with transparency, and JPEG for photos. Consider file size vs quality trade-offs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Start with 90% quality and adjust down if file size is too large. Most users can't detect quality loss below 80%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What image formats are supported?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You can upload JPEG, PNG, WebP, GIF, and BMP images. Output formats include JPEG, PNG, and WebP, or you can keep the original format.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How does aspect ratio maintenance work?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  When aspect ratio is locked, entering width automatically calculates height (and vice versa) to maintain the original proportions of your image.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-2">What's the maximum file size I can resize?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You can resize images up to 50MB each, with a maximum of 20 files per batch. This ensures smooth processing in your browser.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Will resizing affect image quality?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Quality depends on the output format and settings. PNG maintains lossless quality, while JPEG and WebP offer adjustable quality settings for size optimization.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I resize images to make them larger?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes! You can resize images to any dimensions, both smaller and larger. However, enlarging images may result in some quality loss due to interpolation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data secure during resizing?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Absolutely! All image processing happens entirely in your browser using the Canvas API. Your images are never uploaded to our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="image-resize" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="image-resize" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
