import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const x = parseInt(formData.get('x') as string) || 0
    const y = parseInt(formData.get('y') as string) || 0
    const width = parseInt(formData.get('width') as string)
    const height = parseInt(formData.get('height') as string)
    const rotation = parseInt(formData.get('rotation') as string) || 0
    const format = (formData.get('format') as string) || 'original'
    const quality = parseInt(formData.get('quality') as string) || 90

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

    // Validate crop dimensions
    if (!width || !height || width <= 0 || height <= 0) {
      return NextResponse.json({ error: 'Invalid crop dimensions' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalSize = buffer.length

    // Get original image metadata
    const metadata = await sharp(buffer).metadata()
    const originalWidth = metadata.width || 0
    const originalHeight = metadata.height || 0
    const originalFormat = metadata.format

    // Validate crop area is within image bounds
    if (x < 0 || y < 0 || x + width > originalWidth || y + height > originalHeight) {
      return NextResponse.json({ 
        error: 'Crop area exceeds image boundaries',
        imageSize: `${originalWidth}x${originalHeight}`,
        cropArea: `${x},${y} ${width}x${height}`
      }, { status: 400 })
    }

    // Process image with Sharp
    let sharpInstance = sharp(buffer)

    // Apply rotation if specified
    if (rotation !== 0) {
      sharpInstance = sharpInstance.rotate(rotation)
      
      // Recalculate metadata after rotation
      const rotatedMetadata = await sharpInstance.metadata()
      const rotatedWidth = rotatedMetadata.width || originalWidth
      const rotatedHeight = rotatedMetadata.height || originalHeight
      
      // Adjust crop coordinates for rotation if needed
      // Note: This is a simplified approach - complex rotations may need more sophisticated coordinate transformation
    }

    // Apply crop
    sharpInstance = sharpInstance.extract({
      left: Math.max(0, x),
      top: Math.max(0, y),
      width: Math.min(width, originalWidth - x),
      height: Math.min(height, originalHeight - y)
    })

    // Apply format and compression
    let processedBuffer: Buffer
    let mimeType: string
    let extension: string

    const outputFormat = format === 'original' ? (originalFormat || 'jpeg') : format

    switch (outputFormat) {
      case 'jpeg':
      case 'jpg':
        processedBuffer = await sharpInstance
          .jpeg({ quality, progressive: true, mozjpeg: true })
          .toBuffer()
        mimeType = 'image/jpeg'
        extension = 'jpg'
        break
      
      case 'png':
        processedBuffer = await sharpInstance
          .png({ quality, progressive: true, compressionLevel: 6 })
          .toBuffer()
        mimeType = 'image/png'
        extension = 'png'
        break
      
      case 'webp':
        processedBuffer = await sharpInstance
          .webp({ quality, effort: 4 })
          .toBuffer()
        mimeType = 'image/webp'
        extension = 'webp'
        break
      
      default:
        processedBuffer = await sharpInstance
          .jpeg({ quality, progressive: true })
          .toBuffer()
        mimeType = 'image/jpeg'
        extension = 'jpg'
    }

    const croppedSize = processedBuffer.length

    // Get final dimensions
    const finalMetadata = await sharp(processedBuffer).metadata()
    const finalWidth = finalMetadata.width || 0
    const finalHeight = finalMetadata.height || 0

    // Generate filename
    const originalName = file.name.replace(/\.[^/.]+$/, '')
    const filename = `${originalName}_cropped_${finalWidth}x${finalHeight}.${extension}`

    return new Response(new Uint8Array(processedBuffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Original-Size': originalSize.toString(),
        'X-Cropped-Size': croppedSize.toString(),
        'X-Original-Dimensions': `${originalWidth}x${originalHeight}`,
        'X-Cropped-Dimensions': `${finalWidth}x${finalHeight}`,
        'X-Crop-Area': `${x},${y} ${width}x${height}`,
        'X-Rotation': rotation.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('Image crop error:', error)
    return NextResponse.json(
      { error: 'Failed to crop image. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image crop API is running',
    supportedFormats: ['jpeg', 'png', 'webp'],
    maxFileSize: '50MB',
    features: ['crop', 'rotate', 'format conversion']
  })
}
