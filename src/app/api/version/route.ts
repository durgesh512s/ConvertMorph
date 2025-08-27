import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: process.env.npm_package_version || '0.0.0'
  }, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
