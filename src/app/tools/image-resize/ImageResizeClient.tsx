'use client'

import { useState } from 'react'
import { Maximize2, Download, FileImage, Settings, RotateCcw, Lock, Unlock, Zap, Palette, Shield, Upload, Sliders, Target, CheckCircle, Ruler, Crop, Monitor, Smartphone, Camera } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { names } from '@/lib/names'
import { track } from '@/lib/analytics/client'
import { generateFileId } from '@/lib/id-utils'

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

export default function ImageResizeClient() {
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
        id: generateFileId(), 
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
    <>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
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
    </>
  )
}
