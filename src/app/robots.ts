// src/app/robots.ts (or public/robots.txt)
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
        // Optimize Googlebot crawling - allow essential JS for SSR/CSR hybrid
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/tools/',
          '/blog/',
          '/about',
          '/contact',
          '/privacy',
          '/terms',
          '/_next/static/css/*', // Essential for rendering
          '/_next/static/chunks/*', // Allow JS chunks for proper rendering
          '/favicon.ico',
          '/manifest.webmanifest',
          '/apple-app-site-association',
          '/.well-known/apple-app-site-association',
        ],
        disallow: [
          '/_next/static/media/*.png',
          '/_next/static/media/*.jpg',
          '/_next/static/media/*.jpeg',
          '/_next/static/media/*.gif',
          '/_next/static/media/*.svg',
          '/_next/static/media/*.ico',
          '/public/samples/*',
          '/public/og/*',
          '/sw.js',
          '/service-worker.js',
          '/pdf.worker.min.js',
          '/workers/*',
          '/scripts/*',
        ],
        crawlDelay: 0.5, // Faster crawling for better response times
      },
      {
        // Mobile Googlebot - ensure mobile-first indexing works properly
        userAgent: 'Googlebot-Mobile',
        allow: [
          '/',
          '/tools/',
          '/blog/',
          '/_next/static/css/*',
          '/_next/static/chunks/*', // Allow JS for mobile rendering
          '/favicon.ico',
          '/manifest.webmanifest',
        ],
        disallow: [
          '/_next/static/media/*.png',
          '/_next/static/media/*.jpg',
          '/_next/static/media/*.jpeg',
          '/_next/static/media/*.gif',
          '/_next/static/media/*.svg',
          '/_next/static/media/*.ico',
          '/public/samples/*',
          '/workers/*',
        ],
        crawlDelay: 0.3, // Even faster for mobile-first indexing
      },
      // Block unwanted bots
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
