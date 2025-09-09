import { NextRequest, NextResponse } from 'next/server';
import { getCrawlHeaders, getPreloadHints } from '@/lib/crawl-optimization';

export function crawlOptimizationMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Get crawl optimization headers for this path
  const crawlHeaders = getCrawlHeaders(pathname);
  
  // Apply crawl headers
  Object.entries(crawlHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add preload hints for critical resources
  const preloadHints = getPreloadHints(pathname);
  if (preloadHints.length > 0) {
    response.headers.set('Link', preloadHints.join(', '));
  }

  // Add crawl budget optimization headers
  if (pathname.startsWith('/tools/')) {
    // High priority tool pages
    response.headers.set('X-Crawl-Priority', 'high');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
  } else if (pathname === '/' || pathname === '/tools' || pathname === '/blog') {
    // Hub pages - highest priority
    response.headers.set('X-Crawl-Priority', 'highest');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
  } else if (pathname.startsWith('/blog/')) {
    // Blog posts - medium priority
    response.headers.set('X-Crawl-Priority', 'medium');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:160, max-image-preview:standard');
  }

  // Block crawling of development/debug paths - BUT ALLOW CRITICAL RESOURCES
  if (pathname.includes('/api/') ||
      pathname.includes('/samples/') ||
      pathname.includes('/og-debug/') ||
      pathname.includes('/_next/static/chunks/vendor') ||
      pathname.includes('/_next/static/chunks/webpack') ||
      pathname.includes('/_next/static/media/') ||
      pathname.includes('/sw.js') ||
      pathname.includes('/service-worker.js') ||
      pathname.includes('/pdf.worker.min.js')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  return response;
}
