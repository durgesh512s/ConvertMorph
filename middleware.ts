import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { crawlOptimizationMiddleware } from './src/middleware/crawl-optimization';

export function middleware(req: NextRequest) {
  // Apply crawl optimization middleware first
  const res = crawlOptimizationMiddleware(req);
  
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // allow inline JSON-LD; consider nonce later
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Only set X-Robots-Tag for non-production environments (override crawl optimization for dev)
  if (process.env.NODE_ENV !== 'production') {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
