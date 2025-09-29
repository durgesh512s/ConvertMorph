'use client'

import { useState, useCallback } from 'react'
import { Crop, Download, FileImage, Settings, Scissors, Zap, Palette, Shield } from 'lucide-react'
import { Dropzone, UploadedFile } from '@/components/Dropzone'
import { downloadFilesAsZip } from '@/lib/utils/zip'
import { toast } from 'sonner'
import { gtm } from '@/components/GoogleTagManager'
import { generateFileId } from '@/lib/id-utils'
import Cropper from 'react-easy-crop'
import { cropImage, dataURLToBlob, getFileExtension, ASPECT_RATIOS, type AspectRatioKey, type CropArea } from '@/lib/imageCropper'

interface ProcessedFile {
  name: string
  originalSize: number
  croppedSize: number
  originalDimensions: { width: number; height: number }
  croppedDimensions: { width: number; height: number }
  downloadUrl: string
  format: string
  sizeChange: { percentage: number; isReduction: boolean }
}

interface CropperState {
  crop: { x: number; y: number }
  zoom: number
  aspect: number | undefined
  croppedAreaPixels: CropArea | null
}

export default function ImageCropClient() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [outputFormat, setOutputFormat] = useState<'original' | 'jpeg' | 'png' | 'webp'>('original')
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<AspectRatioKey>('free')
  
  // Cropper state for current image
  const [cropperState, setCropperState] = useState<CropperState>({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: undefined,
    croppedAreaPixels: null
  })

  const handleFilesAdded = async (files: File[]) => {
    const mapped = files.map(file => {
      // Track file upload with GTM
      gtm.push({
        event: 'tool_usage',
        tool_name: 'image-crop',
        action: 'upload',
        file_type: file.type.split('/')[1] || 'image',
        file_size_mb: Math.round(file.size / (1024 * 1024) * 100) / 100,
        file_count: 1
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
    setCurrentFileIndex(0)
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter(f => f.id !== fileId)
      if (currentFileIndex >= newFiles.length && newFiles.length > 0) {
        setCurrentFileIndex(newFiles.length - 1)
      }
      return newFiles
    })
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropArea) => {
    setCropperState(prev => ({ ...prev, croppedAreaPixels }))
  }, [])

  const handleAspectRatioChange = (ratio: AspectRatioKey) => {
    setAspectRatio(ratio)
    const aspectValue = ASPECT_RATIOS[ratio]
    setCropperState(prev => ({ 
      ...prev, 
      aspect: aspectValue === null ? undefined : aspectValue,
      crop: { x: 0, y: 0 },
      zoom: 1
    }))
  }

  const calculateSizeChange = (originalSize: number, newSize: number) => {
    const percentage = Math.round(Math.abs((newSize - originalSize) / originalSize) * 100)
    return {
      percentage,
      isReduction: newSize < originalSize
    }
  }

  const handleCrop = async () => {
    if (uploadedFiles.length === 0 || !cropperState.croppedAreaPixels) return

    setIsProcessing(true)
    setProcessedFiles([])

    try {
      const results: ProcessedFile[] = []

      for (let i = 0; i < uploadedFiles.length; i++) {
        const uf = uploadedFiles[i]
        if (!uf) continue
        
        try {
          // Create image URL for cropping
          const imageUrl = URL.createObjectURL(uf.file)
          
          // Get original image dimensions
          const img = new Image()
          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            img.src = imageUrl
          })

          // Use the crop area from the current file being displayed, or default crop for others
          const cropArea = i === currentFileIndex && cropperState.croppedAreaPixels ? cropperState.croppedAreaPixels : {
            x: 0,
            y: 0,
            width: img.naturalWidth,
            height: img.naturalHeight
          }

          // Determine output format
          const format = outputFormat === 'original' ? 
            (uf.file.type.split('/')[1] as 'jpeg' | 'png' | 'webp') : 
            outputFormat

          // Crop the image
          const croppedDataUrl = await cropImage(imageUrl, cropArea, {
            format,
            quality: quality / 100
          })

          // Convert to blob
          const blob = dataURLToBlob(croppedDataUrl)
          const url = URL.createObjectURL(blob)
          
          const safeName = uf.name.replace(/[^\w.\-()\s]/g, '_')
          const extension = getFileExtension(format)
          const nameWithoutExt = safeName.replace(/\.[^/.]+$/, '')
          const finalName = `${nameWithoutExt}_cropped.${extension}`

          const sizeChange = calculateSizeChange(uf.file.size, blob.size)

          results.push({
            name: finalName,
            originalSize: uf.file.size,
            croppedSize: blob.size,
            originalDimensions: { width: img.naturalWidth, height: img.naturalHeight },
            croppedDimensions: { width: cropArea.width, height: cropArea.height },
            downloadUrl: url,
            format: format,
            sizeChange
          })

          // Clean up
          URL.revokeObjectURL(imageUrl)
        } catch (err) {
          console.error('Crop error:', err)
          toast.error(`Failed to crop ${uf.name}`)
        }
      }

      if (results.length > 0) {
        setProcessedFiles(results)
        
        // Track successful crop with GTM
        gtm.push({
          event: 'file_convert',
          tool_name: 'image-crop',
          file_type: 'image',
          conversion_value: 1,
          file_count: results.length,
          output_format: outputFormat,
          processing_method: 'client-side'
        })
        
        toast.success(`Cropped ${results.length} image${results.length > 1 ? 's' : ''} successfully!`)
      }
    } catch (error) {
      console.error('Crop failed:', error)
      toast.error('Crop failed. Please try again.')
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

  const aspectRatioOptions = [
    { key: 'free' as AspectRatioKey, name: 'Free', description: 'Any aspect ratio' },
    { key: 'square' as AspectRatioKey, name: 'Square', description: '1:1' },
    { key: '4:3' as AspectRatioKey, name: '4:3', description: 'Standard photo' },
    { key: '3:4' as AspectRatioKey, name: '3:4', description: 'Portrait photo' },
    { key: '16:9' as AspectRatioKey, name: '16:9', description: 'Widescreen' },
    { key: '9:16' as AspectRatioKey, name: '9:16', description: 'Mobile/Story' },
  ]

  const currentFile = uploadedFiles[currentFileIndex]
  const currentImageUrl = currentFile ? URL.createObjectURL(currentFile.file) : null

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Crop className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Image Crop</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Crop images with precision using React Easy Crop. Support for multiple aspect ratios and formats.
        </p>
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
      </div>

      {/* Crop Interface */}
      {uploadedFiles.length > 0 && currentImageUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Cropper */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Scissors className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Crop Image
                </h2>
                {uploadedFiles.length > 1 && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentFileIndex(Math.max(0, currentFileIndex - 1))}
                      disabled={currentFileIndex === 0}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                    >
                      ←
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {currentFileIndex + 1} / {uploadedFiles.length}
                    </span>
                    <button
                      onClick={() => setCurrentFileIndex(Math.min(uploadedFiles.length - 1, currentFileIndex + 1))}
                      disabled={currentFileIndex === uploadedFiles.length - 1}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Cropper
                  image={currentImageUrl}
                  crop={cropperState.crop}
                  zoom={cropperState.zoom}
                  aspect={cropperState.aspect}
                  onCropChange={(crop) => setCropperState(prev => ({ ...prev, crop }))}
                  onZoomChange={(zoom) => setCropperState(prev => ({ ...prev, zoom }))}
                  onCropComplete={onCropComplete}
                  showGrid={true}
                />
              </div>

              {/* Zoom Control */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zoom: {Math.round(cropperState.zoom * 100)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={cropperState.zoom}
                  onChange={(e) => setCropperState(prev => ({ ...prev, zoom: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            
            {/* Aspect Ratio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="h-4 w-4 mr-2" /> Aspect Ratio
              </h3>
              <div className="space-y-2">
                {aspectRatioOptions.map(option => (
                  <div
                    key={option.key}
                    className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                      aspectRatio === option.key
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => handleAspectRatioChange(option.key)}
                  >
                    <div className="flex items-center mb-1">
                      <input
                        type="radio"
                        checked={aspectRatio === option.key}
                        onChange={() => handleAspectRatioChange(option.key)}
                        className="mr-2 flex-shrink-0"
                        id={`aspect-${option.key}`}
                        name="aspect-ratio"
                      />
                      <label htmlFor={`aspect-${option.key}`} className="font-medium text-sm cursor-pointer text-gray-900 dark:text-white">
                        {option.name}
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Palette className="h-4 w-4 mr-2" /> Output Format
              </h3>
              <div className="space-y-2">
                {formatOptions.map(option => (
                  <div
                    key={option.format}
                    className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                      outputFormat === option.format
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setOutputFormat(option.format)}
                  >
                    <div className="flex items-center mb-1">
                      <input
                        type="radio"
                        checked={outputFormat === option.format}
                        onChange={() => setOutputFormat(option.format)}
                        className="mr-2 flex-shrink-0"
                        id={`format-${option.format}`}
                        name="output-format"
                      />
                      <label htmlFor={`format-${option.format}`} className="font-medium text-sm cursor-pointer text-gray-900 dark:text-white">
                        {option.name}
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quality Slider (for JPEG/WebP) */}
              {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Quality: {quality}%
                  </h4>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Lower quality</span>
                    <span>Higher quality</span>
                  </div>
                </div>
              )}
            </div>

            {/* Crop Button */}
            <button
              onClick={handleCrop}
              disabled={isProcessing || !cropperState.croppedAreaPixels}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cropping...
                </>
              ) : (
                <>
                  <Crop className="h-4 w-4 mr-2" />
                  Crop Images ({uploadedFiles.length})
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {processedFiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Download className="h-4 w-4 mr-2" /> Cropped Images
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
                        <span>Cropped: {file.croppedDimensions.width}×{file.croppedDimensions.height}</span>
                        <span>Size: {formatFileSize(file.originalSize)} → {formatFileSize(file.croppedSize)}</span>
                        <span className={file.sizeChange.isReduction ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                          ({file.sizeChange.isReduction ? '-' : '+'}{file.sizeChange.percentage}%)
                        </span>
                        <span className="text-green-600 dark:text-green-400">{file.format.toUpperCase()}</span>
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
                await downloadFilesAsZip(files, 'cropped-images.zip')
              }}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
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
            <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Scissors className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Precise Cropping</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Crop images with pixel-perfect precision using React Easy Crop</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Aspect Ratios</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Support for common aspect ratios including square, 16:9, 4:3, and free crop</p>
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
