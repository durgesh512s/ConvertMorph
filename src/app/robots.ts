import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://convertmorph.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/samples/',
          '/og-debug/',
          '/og/',
          '/logo/',
          '/scripts/',
          '/docs/',
          '/*.ts$',
          '/*.map$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/', // Allow HTML pages
          '/tools/*', // Allow tool pages
          '/blog/*', // Allow blog pages
          '/about',
          '/contact',
          '/privacy',
          '/terms',
          '/_next/static/css/*', // CRITICAL: Allow CSS for proper rendering
          '/_next/static/chunks/framework*', // CRITICAL: Allow React framework
          '/_next/static/chunks/main*', // CRITICAL: Allow main app bundle
          '/_next/static/chunks/pages*', // CRITICAL: Allow page-specific bundles
          '/favicon.ico', // Allow favicon
          '/manifest.webmanifest', // Allow PWA manifest for mobile
        ],
        disallow: [
          '/_next/static/chunks/webpack*', // Block webpack runtime (non-critical)
          '/_next/static/chunks/vendor*', // Block large vendor chunks (non-critical for rendering)
          '/_next/static/media/*', // Block media assets (images, fonts)
          '/public/samples/*', // Block sample files
          '/public/og/*', // Block OG images from crawling
          '/public/logo/*', // Block logo assets (except favicon)
          '/sw.js', // Block service worker
          '/service-worker.js', // Block service worker
          '/pdf.worker.min.js', // Block PDF worker (loaded dynamically)
          '/cypress/*', // Block test files
          '/tests/*', // Block test files
          '/scripts/*', // Block build scripts
          '/docs/*', // Block documentation
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
