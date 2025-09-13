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
        // Googlebot must see vendor, webpack, ui, fonts to render correctly
        userAgent: 'Googlebot',
        allow: [
          '/tools/',
          '/_next/static/chunks/app/tools/',
          '/_next/static/chunks/pages*',
          '/_next/static/chunks/framework*',
          '/_next/static/chunks/vendor-*',
          '/_next/static/chunks/webpack-*',
          '/_next/static/chunks/ui-*',
          '/_next/static/css/*',
          '/_next/static/media/*',
          '/favicon.ico',
          '/manifest.webmanifest',
        ],
        disallow: [
          '/public/samples/*',
          '/public/og/*',
          '/sw.js',
          '/service-worker.js',
          '/pdf.worker.min.js',
        ],
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