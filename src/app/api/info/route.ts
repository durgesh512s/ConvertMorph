import { NextResponse } from 'next/server';
import { getAppConfig } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cfg = getAppConfig();
  return NextResponse.json({
    siteUrl: cfg.siteUrl,
    maxFileMb: cfg.maxFileSizeMb,
    maxPages: cfg.maxPages,
    allowedMimes: cfg.allowedMimes,
    jobTimeoutMs: cfg.jobTimeoutMs,
  }, { headers: { 'Cache-Control': 'no-store' }});
}
