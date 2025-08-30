import { PDFDocument } from "pdf-lib"
import * as pdfjsLib from "pdfjs-dist"
import imageCompression from "browser-image-compression"

// ✅ Configure pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

export type CompressionLevel = "light" | "medium"

interface CompressedResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  ratio: number
}

export async function compressPDF(file: File, level: CompressionLevel = "medium"): Promise<CompressedResult> {
  const originalSize = file.size

  // Load PDF with pdf.js
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  // Create new PDF
  const pdfDoc = await PDFDocument.create()

  // Compression settings
  const quality = level === "light" ? 0.8 : 0.6
  const maxWidth = level === "light" ? 1400 : 1000

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1)

    // Render to canvas
    const viewport = page.getViewport({ scale: 2.0 })
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvasContext: ctx, viewport, canvas }).promise

    // Convert canvas -> Blob
    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b)      // ✅ Blob found
        else reject(new Error("Canvas toBlob returned null")) // ✅ null case handled
      }, "image/jpeg", quality)
    })

    // Compress image using browser-image-compression
    const compressedFile = new File([blob], `page-${i + 1}.jpg`, { type: "image/jpeg" })
    const compressedBlob = await imageCompression(compressedFile, {
      maxWidthOrHeight: maxWidth,
      initialQuality: quality,
      useWebWorker: true,
    })

    const compressedArrayBuffer: ArrayBuffer = await compressedBlob.arrayBuffer()
    const compressedUint8 = new Uint8Array(compressedArrayBuffer)

    // Pass directly to pdf-lib
    const img = await pdfDoc.embedJpg(compressedUint8)

    // Add page
    const pageAdded = pdfDoc.addPage([canvas.width, canvas.height])
    pageAdded.drawImage(img, {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    })
  }

  // Save compressed PDF
  const compressedBytes = await pdfDoc.save()
  const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })
  const compressedSize = compressedBlob.size

  return {
    blob: compressedBlob,
    originalSize,
    compressedSize,
    ratio: Math.round(((originalSize - compressedSize) / originalSize) * 100),
  }
}
