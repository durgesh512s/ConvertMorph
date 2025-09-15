import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const targetFormat = (formData.get('format') as string)?.toLowerCase()
    const quality = parseInt(formData.get('quality') as string) || 90

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are supported.' }, { status: 400 })
    }

    // Validate target format
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff']
    if (!targetFormat || !supportedFormats.includes(targetFormat)) {
      return NextResponse.json({ 
        error: `Invalid target format. Supported formats: ${supportedFormats.join(', ')}` 
      }, { status: 400 })
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalSize = buffer.length

    // Get original image metadata
    const metadata = await sharp(buffer).metadata()
    const originalFormat = metadata.format
    const originalWidth = metadata.width || 0
    const originalHeight = metadata.height || 0

    // Check if conversion is needed
    if (originalFormat === targetFormat || (originalFormat === 'jpeg' && targetFormat === 'jpg')) {
      return NextResponse.json({ 
        error: 'Image is already in the target format' 
      }, { status: 400 })
    }

    // Process image with Sharp
    const sharpInstance = sharp(buffer)

    // Apply format conversion
    let processedBuffer: Buffer
    let mimeType: string
    let extension: string

    switch (targetFormat) {
      case 'jpeg':
      case 'jpg':
        processedBuffer = await sharpInstance
          .jpeg({ 
            quality, 
            progressive: true, 
            mozjpeg: true,
            optimiseScans: true
          })
          .toBuffer()
        mimeType = 'image/jpeg'
        extension = 'jpg'
        break
      
      case 'png':
        processedBuffer = await sharpInstance
          .png({ 
            quality, 
            progressive: true, 
            compressionLevel: 6,
            adaptiveFiltering: true
          })
          .toBuffer()
        mimeType = 'image/png'
        extension = 'png'
        break
      
      case 'webp':
        processedBuffer = await sharpInstance
          .webp({ 
            quality, 
            effort: 4,
            smartSubsample: true
          })
          .toBuffer()
        mimeType = 'image/webp'
        extension = 'webp'
        break
      
      case 'avif':
        processedBuffer = await sharpInstance
          .avif({ 
            quality, 
            effort: 4
          })
          .toBuffer()
        mimeType = 'image/avif'
        extension = 'avif'
        break
      
      case 'tiff':
        processedBuffer = await sharpInstance
          .tiff({ 
            quality,
            compression: 'lzw'
          })
          .toBuffer()
        mimeType = 'image/tiff'
        extension = 'tiff'
        break
      
      default:
        processedBuffer = await sharpInstance
          .jpeg({ quality, progressive: true })
          .toBuffer()
        mimeType = 'image/jpeg'
        extension = 'jpg'
    }

    const convertedSize = processedBuffer.length
    const sizeChange = ((convertedSize - originalSize) / originalSize * 100).toFixed(1)

    // Generate filename
    const originalName = file.name.replace(/\.[^/.]+$/, '')
    const filename = `${originalName}_converted.${extension}`

    return new Response(new Uint8Array(processedBuffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Original-Size': originalSize.toString(),
        'X-Converted-Size': convertedSize.toString(),
        'X-Size-Change': sizeChange,
        'X-Original-Format': originalFormat || 'unknown',
        'X-Target-Format': targetFormat,
        'X-Dimensions': `${originalWidth}x${originalHeight}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('Image conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert image. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image conversion API is running',
    supportedFormats: ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'],
    maxFileSize: '50MB'
  })
}
