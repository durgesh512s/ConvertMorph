import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import crypto from 'crypto'
import which from 'which'

export const runtime = 'nodejs'

type Level = 'light' | 'medium' | 'strong'

function gsArgsFor(level: Level, inPath: string, outPath: string) {
  const base = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.6',
    '-dNOPAUSE','-dQUIET','-dBATCH',
    '-dDetectDuplicateImages=true',
    '-dFastWebView=true', // linearize
    '-dUseFlateCompression=true',
    '-dCompressFonts=true','-dSubsetFonts=true',
    '-dAutoRotatePages=/None',
    '-sOutputFile=' + outPath,
    inPath
  ]

  if (level === 'light') {
    base.unshift(
      '-dDownsampleColorImages=true','-dColorImageResolution=150',
      '-dDownsampleGrayImages=true','-dGrayImageResolution=150',
      '-dDownsampleMonoImages=true','-dMonoImageResolution=300',
      '-dEncodeColorImages=true','-dEncodeGrayImages=true',
      '-dColorImageFilter=/DCTEncode','-dGrayImageFilter=/DCTEncode',
      '-dJPEGQ=85'
    )
  } else if (level === 'medium') {
    base.unshift(
      '-dDownsampleColorImages=true','-dColorImageResolution=120',
      '-dDownsampleGrayImages=true','-dGrayImageResolution=120',
      '-dDownsampleMonoImages=true','-dMonoImageResolution=300',
      '-dEncodeColorImages=true','-dEncodeGrayImages=true',
      '-dColorImageFilter=/DCTEncode','-dGrayImageFilter=/DCTEncode',
      '-dJPEGQ=70'
    )
  } else {
    base.unshift(
      '-dDownsampleColorImages=true','-dColorImageResolution=96',
      '-dDownsampleGrayImages=true','-dGrayImageResolution=96',
      '-dDownsampleMonoImages=true','-dMonoImageResolution=300',
      '-dEncodeColorImages=true','-dEncodeGrayImages=true',
      '-dColorImageFilter=/DCTEncode','-dGrayImageFilter=/DCTEncode',
      '-dJPEGQ=55'
    )
  }

  // Strip extras/metadata (keep fonts but subset/compress)
  base.unshift(
    '-dDiscardFonts=false',
    '-dPreserveEPSInfo=false',
    '-dParseDSCComments=false',
    '-dPrinted=false'
  )

  return base
}

async function resolveGsBinary(): Promise<string> {
  const guess = process.platform === 'win32' ? (process.env.GS_BIN || 'gswin64c') : (process.env.GS_BIN || 'gs')
  try {
    return await which(guess)
  } catch {
    return guess
  }
}

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file = data.get('file') as unknown as File
  const level = (data.get('level') as Level) || 'medium'
  if (!file) return new Response('No file', { status: 400 })

  const buf = Buffer.from(await file.arrayBuffer())
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cm-compress-'))
  const id = crypto.randomBytes(6).toString('hex')
  const inPath = path.join(tmpDir, `${id}-in.pdf`)
  const outPath = path.join(tmpDir, `${id}-out.pdf`)
  await fs.writeFile(inPath, buf)

  const args = gsArgsFor(level, inPath, outPath)
  const bin = await resolveGsBinary()
  const proc = spawn(bin, args)

  let stderr = ''
  proc.stderr.on('data', d => { stderr += d.toString() })
  const code: number = await new Promise(res => proc.on('close', res))
  if (code !== 0) {
    console.error('Ghostscript failed', stderr)
    return new Response('Compression failed', { status: 500 })
  }

  const out = await fs.readFile(outPath)
  const originalSize = buf.byteLength
  const compressedSize = out.byteLength

  // best-effort cleanup
  fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})

  return new Response(new Uint8Array(out), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.name?.replace(/\.pdf$/i,'') || 'compressed'}.compressed.pdf"`,
      'X-Original-Bytes': String(originalSize),
      'X-Compressed-Bytes': String(compressedSize)
    }
  })
}
