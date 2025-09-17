import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { spawn } from 'child_process'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const compressionLevel = formData.get('compressionLevel') as string || 'medium'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 })
    }

    // Validate file size (max 500MB for server-side)
    const maxSize = 500 * 1024 * 1024 // 500MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 500MB)' }, { status: 400 })
    }

    // Create temporary file paths
    const tempDir = '/tmp'
    const inputPath = join(tempDir, `input-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`)
    const outputPath = join(tempDir, `output-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`)

    try {
      // Save uploaded file to temporary location
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(inputPath, buffer)

      // Compress PDF using Ghostscript
      const compressedBuffer = await compressPDFWithGhostscript(inputPath, outputPath, compressionLevel)
      
      // Calculate compression ratio
      const originalSize = file.size
      const compressedSize = compressedBuffer.length
      const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100)

      // Clean up temporary files
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ])

      // Return compressed PDF
      return new NextResponse(new Uint8Array(compressedBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
          'X-Original-Size': originalSize.toString(),
          'X-Compressed-Size': compressedSize.toString(),
          'X-Compression-Ratio': compressionRatio.toString(),
        },
      })

    } catch (compressionError) {
      // Clean up files on error
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {})
      ])
      
      console.error('PDF compression error:', compressionError)
      return NextResponse.json({ 
        error: 'Failed to compress PDF',
        details: compressionError instanceof Error ? compressionError.message : 'Unknown error'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Server-side compression error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

/**
 * Compress PDF using Ghostscript with different quality settings
 */
async function compressPDFWithGhostscript(
  inputPath: string, 
  outputPath: string, 
  compressionLevel: string
): Promise<Buffer> {
  // Map compression levels to Ghostscript settings
  const settings = {
    light: {
      dPDFSETTINGS: '/ebook',
      dColorImageResolution: 150,
      dGrayImageResolution: 150,
      dMonoImageResolution: 300,
      dColorImageDownsampleThreshold: 1.5,
      dGrayImageDownsampleThreshold: 1.5,
      dMonoImageDownsampleThreshold: 1.5
    },
    medium: {
      dPDFSETTINGS: '/screen',
      dColorImageResolution: 120,
      dGrayImageResolution: 120,
      dMonoImageResolution: 300,
      dColorImageDownsampleThreshold: 1.5,
      dGrayImageDownsampleThreshold: 1.5,
      dMonoImageDownsampleThreshold: 1.5
    },
    strong: {
      dPDFSETTINGS: '/screen',
      dColorImageResolution: 96,
      dGrayImageResolution: 96,
      dMonoImageResolution: 200,
      dColorImageDownsampleThreshold: 1.2,
      dGrayImageDownsampleThreshold: 1.2,
      dMonoImageDownsampleThreshold: 1.2
    }
  }

  const config = settings[compressionLevel as keyof typeof settings] || settings.medium

  // Check if Ghostscript is available
  try {
    await execAsync('gs --version')
  } catch (error) {
    // Fallback to qpdf if Ghostscript is not available
    return await compressPDFWithQPDF(inputPath, outputPath, compressionLevel)
  }

  // Build Ghostscript command
  const gsCommand = [
    'gs',
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    '-dNOPAUSE',
    '-dQUIET',
    '-dBATCH',
    '-dSAFER',
    `-dPDFSETTINGS=${config.dPDFSETTINGS}`,
    '-dEmbedAllFonts=true',
    '-dSubsetFonts=true',
    '-dAutoRotatePages=/None',
    '-dColorImageDownsampleType=/Bicubic',
    '-dGrayImageDownsampleType=/Bicubic',
    '-dMonoImageDownsampleType=/Bicubic',
    `-dColorImageResolution=${config.dColorImageResolution}`,
    `-dGrayImageResolution=${config.dGrayImageResolution}`,
    `-dMonoImageResolution=${config.dMonoImageResolution}`,
    `-dColorImageDownsampleThreshold=${config.dColorImageDownsampleThreshold}`,
    `-dGrayImageDownsampleThreshold=${config.dGrayImageDownsampleThreshold}`,
    `-dMonoImageDownsampleThreshold=${config.dMonoImageDownsampleThreshold}`,
    `-sOutputFile=${outputPath}`,
    inputPath
  ].join(' ')

  try {
    await execAsync(gsCommand)
    
    // Read the compressed file
    const { readFile } = await import('fs/promises')
    return await readFile(outputPath)
    
  } catch (error) {
    console.error('Ghostscript compression failed:', error)
    // Fallback to qpdf
    return await compressPDFWithQPDF(inputPath, outputPath, compressionLevel)
  }
}

/**
 * Fallback compression using qpdf
 */
async function compressPDFWithQPDF(
  inputPath: string, 
  outputPath: string, 
  compressionLevel: string
): Promise<Buffer> {
  try {
    // Check if qpdf is available
    await execAsync('qpdf --version')
    
    // qpdf compression command
    const qpdfCommand = [
      'qpdf',
      '--optimize-images',
      '--compress-streams=y',
      '--recompress-flate',
      '--object-streams=generate',
      inputPath,
      outputPath
    ].join(' ')

    await execAsync(qpdfCommand)
    
    // Read the compressed file
    const { readFile } = await import('fs/promises')
    return await readFile(outputPath)
    
  } catch (error) {
    console.error('qpdf compression failed:', error)
    
    // Final fallback: return original file with minimal processing
    const { readFile } = await import('fs/promises')
    return await readFile(inputPath)
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Check available compression tools
    const tools = {
      ghostscript: false,
      qpdf: false
    }

    try {
      await execAsync('gs --version')
      tools.ghostscript = true
    } catch {}

    try {
      await execAsync('qpdf --version')
      tools.qpdf = true
    } catch {}

    return NextResponse.json({
      status: 'healthy',
      availableTools: tools,
      maxFileSize: '500MB',
      supportedFormats: ['application/pdf']
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
