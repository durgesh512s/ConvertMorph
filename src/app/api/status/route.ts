import { NextResponse } from 'next/server';

export async function GET() {
  const version = process.env.npm_package_version || '0.1.0';
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || 'dev';
  const node = process.version;
  const time = new Date().toISOString();

  return NextResponse.json({
    version,
    commit,
    node,
    time
  });
}
