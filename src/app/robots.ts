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
          // 🚫 Block unnecessary chunks (save crawl budget)
          '/_next/static/chunks/vendor-*',
          '/_next/static/chunks/webpack-*',
          '/_next/static/chunks/framework-*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/_next/static/chunks/app/tools/', // ✅ allow tool chunks
          '/tools/',                         // ✅ allow tool pages
          '/og/',                            // ✅ allow OG images
          '/_next/static/*.js',
          '/public/*.js',
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