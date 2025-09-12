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
        // Tell Googlebot: allow pages & tool chunks, block wasteful vendor/webpack
        userAgent: 'Googlebot',
        allow: [
          '/tools/',
          '/_next/static/chunks/app/tools/',
          '/_next/static/chunks/pages*',
          '/_next/static/chunks/framework*',   // keep framework allowed for safety
          '/_next/static/css/*',
          '/favicon.ico',
          '/manifest.webmanifest',
        ],
        disallow: [
          '/_next/static/chunks/vendor-*',    // block large vendor bundles from crawling
          '/_next/static/chunks/webpack-*',   // block webpack runtime
          '/_next/static/chunks/ui-*',        // optional: UI lib chunks
          '/_next/static/media/*',
          '/public/samples/*',
          '/public/og/*',
          '/sw.js',
          '/service-worker.js',
          '/pdf.worker.min.js',
        ],
      },
      // Block other unwanted bots
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}