import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function sendFileDownload(filePath: string, downloadName: string) {
  const stat = await fs.promises.stat(filePath);
  const type = getContentType(path.extname(downloadName));
  const file = await fs.promises.readFile(filePath);
  
  const res = new NextResponse(new Uint8Array(file), {
    headers: {
      'Content-Type': type,
      'Content-Length': String(stat.size),
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    }
  });
  
  // best-effort cleanup; ignore errors
  fs.promises.unlink(filePath).catch(() => {});
  return res;
}

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.txt': 'text/plain',
  };
  return types[ext.toLowerCase()] || 'application/octet-stream';
}
