import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add the pathname to headers for server components
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  requestHeaders.set('x-url', request.url);
  
  // Add search params if they exist
  if (request.nextUrl.search) {
    requestHeaders.set('x-search-params', request.nextUrl.search);
  }
  
  // Create response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Optimize caching for different request types
  const { pathname, search } = request.nextUrl;
  const isRSCRequest = search.includes('_rsc=');
  const isStaticAsset = pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot)$/);
  const isManifest = pathname.includes('manifest');

  // Set appropriate cache headers based on request type
  if (isRSCRequest) {
    // RSC requests should be cached but revalidated
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    response.headers.set('Vary', 'RSC, Next-Router-State-Tree, Next-Router-Prefetch');
  } else if (isManifest) {
    // Manifest should be cached but allow revalidation
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  } else if (isStaticAsset) {
    // Static assets can be cached longer
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // Regular pages - short cache with revalidation
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (but include manifest)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|android-chrome|apple-touch-icon\\.png|.*\\.(?:png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)',
    '/manifest.webmanifest',
    '/manifest',
  ],
};
