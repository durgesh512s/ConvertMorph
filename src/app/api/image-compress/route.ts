import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'

interface CompressionOptions {
  quality: number
  format: 'jpeg' | 'png' | 'webp'
  maxWidth?: number
  maxHeight?: number
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const quality = parseInt(formData.get('quality') as string) || 80
    const format = (formData.get('format') as string) || 'jpeg'
    const maxWidth = formData.get('maxWidth') ? parseInt(formData.get('maxWidth') as string) : undefined
    const maxHeight = formData.get('maxHeight') ? parseInt(formData.get('maxHeight') as string) : undefined

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are supported.' }, { status: 400 })
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalSize = buffer.length

    // Process image with Sharp
    let sharpInstance = sharp(buffer)

    // Resize if dimensions provided
    if (maxWidth || maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }

    // Apply compression based on format
    let processedBuffer: Buffer
    let mimeType: string

    switch (format) {
      case 'jpeg':
        processedBuffer = await sharpInstance
          .jpeg({ quality, progressive: true, mozjpeg: true })
          .toBuffer()
        mimeType = 'image/jpeg'
        break
      case 'png':
        processedBuffer = await sharpInstance
          .png({ quality, progressive: true, compressionLevel: 9 })
          .toBuffer()
        mimeType = 'image/png'
        break
      case 'webp':
        processedBuffer = await sharpInstance
          .webp({ quality, effort: 6 })
          .toBuffer()
        mimeType = 'image/webp'
        break
      default:
        processedBuffer = await sharpInstance
          .jpeg({ quality, progressive: true })
          .toBuffer()
        mimeType = 'image/jpeg'
    }

    const compressedSize = processedBuffer.length
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)

    // Generate filename
    const originalName = file.name.replace(/\.[^/.]+$/, '')
    const extension = format === 'jpeg' ? 'jpg' : format
    const filename = `${originalName}_compressed.${extension}`

    return new Response(new Uint8Array(processedBuffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Original-Size': originalSize.toString(),
        'X-Compressed-Size': compressedSize.toString(),
        'X-Compression-Ratio': compressionRatio,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('Image compression error:', error)
    return NextResponse.json(
      { error: 'Failed to compress image. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image compression API is running',
    supportedFormats: ['jpeg', 'png', 'webp'],
    maxFileSize: '50MB'
  })
}
