"use client"

import { useState, useCallback } from "react"
// Dynamic import for client-side only PDF compression
type CompressionLevel = "light" | "medium"

interface CompressionResult {
  success: boolean
  compressedPdf?: Uint8Array
  originalSize: number
  compressedSize: number
  compressionRatio: number
  error?: string
}

interface CompressionState {
  isProcessing: boolean
  results: Record<string, CompressionResult>
  errors: Record<string, string>
  progress: Record<string, number>
  speed: Record<string, string>
}

export function useClientPDFCompression() {
  const [state, setState] = useState<CompressionState>({
    isProcessing: false,
    results: {},
    errors: {},
    progress: {},
    speed: {},
  })

  const compressFiles = useCallback(async (files: File[], options: {
    level: CompressionLevel,
    removeMetadata?: boolean,
    optimizeImages?: boolean,
    subsetFonts?: boolean
  }) => {
    setState(prev => ({ ...prev, isProcessing: true, results: {}, errors: {}, progress: {}, speed: {} }))

    // Dynamically import the PDF compressor to avoid SSR issues
    const { compressPDF } = await import("@/lib/pdfClientCompressor")

    for (const file of files) {
      const fileId = `${file.name}-${file.size}-${file.lastModified}`

      try {
        // Update progress to 0%
        setState(prev => ({
          ...prev,
          progress: { ...prev.progress, [fileId]: 0 }
        }))

        const result = await compressPDF(file, options.level)

        const arrayBuffer = await result.blob.arrayBuffer()
        setState(prev => ({
          ...prev,
          results: {
            ...prev.results,
            [fileId]: {
              success: true,
              compressedPdf: new Uint8Array(arrayBuffer),
              originalSize: result.originalSize,
              compressedSize: result.compressedSize,
              compressionRatio: result.ratio,
            }
          },
          progress: { ...prev.progress, [fileId]: 100 }
        }))
      } catch (err: any) {
        console.error("Compression failed:", err)
        setState(prev => ({
          ...prev,
          errors: { ...prev.errors, [fileId]: err.message || "Unknown error" },
          progress: { ...prev.progress, [fileId]: 0 }
        }))
      }
    }

    setState(prev => ({ ...prev, isProcessing: false }))
  }, [])

  const cancelCompression = useCallback(() => {
    // Since this is client-side, cancel is limited
    // Future: we can use AbortController for better cancellation
    setState(prev => ({ ...prev, isProcessing: false }))
  }, [])

  const clearResults = useCallback(() => {
    setState({
      isProcessing: false,
      results: {},
      errors: {},
      progress: {},
      speed: {},
    })
  }, [])

  return {
    state,
    compressFiles,
    cancelCompression,
    clearResults,
  }
}
