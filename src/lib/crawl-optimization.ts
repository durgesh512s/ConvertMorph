// Crawl Budget Optimization Configuration
// This file contains strategies to optimize Googlebot crawl budget allocation

export const CRAWL_BUDGET_CONFIG = {
  // Critical pages that should be crawled frequently
  highPriorityPages: [
    '/',
    '/tools',
    '/tools/pdf-compress',
    '/tools/pdf-merge',
    '/tools/pdf-split',
    '/tools/image-compress',
    '/tools/image-convert',
    '/tools/word-counter',
    '/blog',
  ],

  // Pages that should be crawled less frequently
  lowPriorityPages: [
    '/privacy',
    '/terms',
    '/contact',
    '/about',
  ],

  // Resources that should be blocked from crawling
  blockedResources: [
    '/_next/static/chunks/',
    '/_next/static/css/',
    '/_next/static/media/',
    '/public/samples/',
    '/public/og/',
    '/public/logo/',
    '/sw.js',
    '/service-worker.js',
    '/pdf.worker.min.js',
    '/manifest.webmanifest',
  ],

  // Resource hints for critical resources
  criticalResources: [
    '/globals.css',
    '/_next/static/css/app/layout.css',
  ],
};

// Generate X-Robots-Tag headers based on page type
export function getCrawlHeaders(pathname: string) {
  const headers: Record<string, string> = {};

  // Block indexing of certain paths - BUT ALLOW CRITICAL RESOURCES
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/samples/') ||
      pathname.startsWith('/og-debug/') ||
      pathname.includes('/_next/static/chunks/vendor') ||
      pathname.includes('/_next/static/chunks/webpack') ||
      pathname.includes('/_next/static/media/') ||
      pathname.includes('/sw.js') ||
      pathname.includes('/service-worker.js') ||
      pathname.includes('/pdf.worker.min.js')) {
    headers['X-Robots-Tag'] = 'noindex, nofollow, noarchive, nosnippet';
    return headers;
  }

  // High priority pages
  if (CRAWL_BUDGET_CONFIG.highPriorityPages.some(page => 
    pathname === page || pathname.startsWith(page + '/'))) {
    headers['X-Robots-Tag'] = 'index, follow, max-snippet:-1, max-image-preview:large';
    headers['X-Crawl-Priority'] = 'high';
    return headers;
  }

  // Low priority pages
  if (CRAWL_BUDGET_CONFIG.lowPriorityPages.includes(pathname)) {
    headers['X-Robots-Tag'] = 'index, follow, max-snippet:160';
    headers['X-Crawl-Priority'] = 'low';
    return headers;
  }

  // Default for other pages
  headers['X-Robots-Tag'] = 'index, follow, max-snippet:160, max-image-preview:standard';
  return headers;
}

// Generate preload hints for critical resources
export function getPreloadHints(pathname: string): string[] {
  const hints: string[] = [];

  // Critical CSS for all pages
  hints.push('</globals.css>; rel=preload; as=style');

  // Tool-specific preloads
  if (pathname.startsWith('/tools/pdf-')) {
    hints.push('</pdf.worker.min.js>; rel=preload; as=script');
  }

  if (pathname.startsWith('/tools/image-')) {
    hints.push('</_next/static/chunks/image-processing.js>; rel=preload; as=script');
  }

  return hints;
}

// Internal linking optimization
export const INTERNAL_LINKING_STRATEGY = {
  // Hub pages that should link to many other pages
  hubPages: [
    '/',
    '/tools',
    '/blog',
  ],

  // Related tool suggestions
  toolRelations: {
    'pdf-compress': ['pdf-merge', 'pdf-split', 'pdf-organize'],
    'pdf-merge': ['pdf-compress', 'pdf-split', 'pdf-organize'],
    'pdf-split': ['pdf-compress', 'pdf-merge', 'pdf-organize'],
    'image-compress': ['image-convert', 'image-resize', 'image-crop'],
    'image-convert': ['image-compress', 'image-resize', 'images-to-pdf'],
    'image-resize': ['image-compress', 'image-convert', 'image-crop'],
  },

  // Maximum internal links per page to avoid dilution
  maxLinksPerPage: 100,
};

// Crawl delay recommendations
export const CRAWL_DELAY_CONFIG = {
  // Suggested crawl delays for different user agents
  delays: {
    'Googlebot': 0, // No delay for Googlebot
    'Bingbot': 1,   // 1 second delay for Bing
    '*': 2,         // 2 second delay for others
  },
};
