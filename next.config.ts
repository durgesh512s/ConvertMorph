/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Generate build-time cache busting hash that works in both local and production
const generateProductionCacheBustId = () => {
  // In production, use git commit SHA or generate deterministic hash
  const gitSha = process.env.VERCEL_GIT_COMMIT_SHA || 
                 process.env.GITHUB_SHA || 
                 process.env.CI_COMMIT_SHA;
  
  if (gitSha) {
    return gitSha.substring(0, 8);
  }
  
  // For production builds without git info, use timestamp
  return Date.now().toString().substring(-8);
};

const buildId = generateProductionCacheBustId();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: true, // enable source maps

  // External packages for server components
  serverExternalPackages: ['sharp', 'canvas'],

  // Enable ETags for better caching
  generateEtags: true,
  poweredByHeader: false,

  // Suppress hydration warnings in production
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // React configuration to handle hydration issues
  env: {
    SUPPRESS_HYDRATION_WARNING: process.env.NODE_ENV === 'production' ? 'true' : 'false',
  },

  // Custom build ID for cache busting - this affects RSC cache parameters
  generateBuildId: async () => {
    // Use the same cache bust ID as favicons for consistency
    const cacheBustId = process.env.NEXT_PUBLIC_CACHE_BUST_ID;
    
    if (cacheBustId) {
      console.log('Next.js Build ID (RSC cache):', cacheBustId);
      console.log('Using consistent cache bust ID for both RSC and static assets');
      return cacheBustId;
    }
    
    // Fallback to git hash or timestamp
    const shortBuildId = buildId.slice(0, 8);
    console.log('Next.js Build ID (RSC cache):', shortBuildId);
    console.log('Available env vars:', {
      VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8),
      GITHUB_SHA: process.env.GITHUB_SHA?.slice(0, 8),
      NEXT_PUBLIC_CACHE_BUST_ID: process.env.NEXT_PUBLIC_CACHE_BUST_ID
    });
    
    return shortBuildId;
  },

  async headers() {
    return [
      // Static assets - long cache with immutable
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js chunks and assets
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Public static files (images, fonts, etc.)
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
  // Images and other assets in public folder
  {
    source: '/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|eot)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  // OG images specific headers
  {
    source: '/og/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
      {
        key: 'Content-Type',
        value: 'image/png',
      },
    ],
  },
  // Apple App Site Association files
  {
    source: '/apple-app-site-association',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/json',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600',
      },
    ],
  },
  {
    source: '/.well-known/apple-app-site-association',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/json',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600',
      },
    ],
  },
      // API routes - no cache
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      // HTML pages - optimized for GSC crawling
      {
        source: '/((?!api|_next|static).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
          },
          // Security headers for all routes
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://www.googletagmanager.com https://www.google-analytics.com",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://vercel.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com",
              "connect-src 'self' https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google",
              "frame-src 'self' https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
          // Cache busting header with build ID
          {
            key: 'X-Build-ID',
            value: buildId,
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.convertmorph.com',
          },
        ],
        destination: 'https://convertmorph.com/:path*',
        permanent: true,
      },
      // Redirect convert-morph.vercel.app to convertmorph.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'convert-morph.vercel.app',
          },
        ],
        destination: 'https://convertmorph.com/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS (for non-www)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'convertmorph.com',
          },
        ],
        destination: 'https://convertmorph.com/:path*',
        permanent: true,
      },
    ];
  },

  // Enable experimental features for better performance and crawling
  experimental: {
    // Package import optimization for faster builds and smaller bundles
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-slot', 
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'uuid',
      'zod',
      'react-dropzone',
      'jspdf'
    ],
    webpackBuildWorker: true,
    gzipSize: true,
    esmExternals: true,
    cssChunking: true,
    optimizeServerReact: true,
    // Improve mobile-first indexing
    optimizeCss: true,
    // Enable partial prerendering for better crawling
    ppr: false, // Keep disabled for now to avoid issues
  },

  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Handle pdf.worker.js from /public and other webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Handle PDF.js worker correctly
    config.module.rules.push({
      test: /pdf\.worker\.min\.js$/,
      type: "asset/resource",
    });

    // Enhanced tree shaking configuration - let Next.js handle usedExports
    config.optimization.sideEffects = false;
    config.optimization.providedExports = true;
    config.optimization.innerGraph = true;
    
    // Mark specific packages as side-effect free for better tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optimize lodash imports to use individual functions
      'lodash': 'lodash-es',
    };

    // Configure module resolution for better tree shaking
    config.resolve.mainFields = ['es2015', 'module', 'main'];
    
    // Let Next.js handle CSS optimization natively
    if (!dev && !isServer) {
      // Enhanced dead code elimination - rely on Next.js built-in optimization
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;
    }

    // Simplified bundle splitting to prevent CSS/JS conflicts
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Framework chunk
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Vendor libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          
          // Common app code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };

      // Basic optimizations
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    return config;
  },

  // Output configuration for better performance
  output: 'standalone',
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withBundleAnalyzer(nextConfig);
