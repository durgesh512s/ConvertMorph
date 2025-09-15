import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined
    const maintainAspectRatio = formData.get('maintainAspectRatio') === 'true'
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

    if (!width && !height) {
      return NextResponse.json({ error: 'Width or height must be provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalSize = buffer.length

    // Get original image metadata
    const metadata = await sharp(buffer).metadata()
    const originalWidth = metadata.width || 0
    const originalHeight = metadata.height || 0

    // Process image with Sharp
    let sharpInstance = sharp(buffer)

    // Apply resize
    const resizeOptions: any = {
      withoutEnlargement: false
    }

    if (maintainAspectRatio) {
      resizeOptions.fit = 'inside'
    } else {
      resizeOptions.fit = 'fill'
    }

    sharpInstance = sharpInstance.resize(width, height, resizeOptions)

    // Apply format and compression
    let processedBuffer: Buffer
    let mimeType: string
    let extension: string

    const outputFormat = format === 'original' ? (metadata.format || 'jpeg') : format

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

    const resizedSize = processedBuffer.length

    // Get final dimensions
    const finalMetadata = await sharp(processedBuffer).metadata()
    const finalWidth = finalMetadata.width || 0
    const finalHeight = finalMetadata.height || 0

    // Generate filename
    const originalName = file.name.replace(/\.[^/.]+$/, '')
    const filename = `${originalName}_${finalWidth}x${finalHeight}.${extension}`

    return new Response(new Uint8Array(processedBuffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Original-Size': originalSize.toString(),
        'X-Resized-Size': resizedSize.toString(),
        'X-Original-Dimensions': `${originalWidth}x${originalHeight}`,
        'X-Final-Dimensions': `${finalWidth}x${finalHeight}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('Image resize error:', error)
    return NextResponse.json(
      { error: 'Failed to resize image. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image resize API is running',
    supportedFormats: ['jpeg', 'png', 'webp'],
    maxFileSize: '50MB'
  })
}
