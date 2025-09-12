import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Pass pathname to request headers for server-side breadcrumb generation
  const pathname = req.nextUrl.pathname;
  
  // Clone the request headers and add our custom header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-request-url', req.url);
  
  // Debug logging - always log in production to diagnose the issue
  console.log('Middleware - setting x-pathname header:', pathname);
  console.log('Middleware - full URL:', req.url);
  
  // Create response with modified request headers
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Also set response headers for debugging
  res.headers.set('x-pathname', pathname);
  
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
  // Only set X-Robots-Tag for non-production environments
  if (process.env.NODE_ENV !== 'production') {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
