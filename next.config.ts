/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

// Generate build-time cache busting hash
const buildId = process.env.VERCEL_GIT_COMMIT_SHA || 
                process.env.GITHUB_SHA || 
                Date.now().toString();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: true, // enable source maps

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

  // Custom build ID for cache busting
  generateBuildId: async () => {
    return buildId;
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
      // HTML pages - short cache with revalidation
      {
        source: '/((?!api|_next|static).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://vercel.com https://www.google-analytics.com https://pagead2.googlesyndication.com",
              "connect-src 'self' https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com",
              "frame-src 'self' https://pagead2.googlesyndication.com",
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

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', 'framer-motion'],
    optimizeCss: true,
    webpackBuildWorker: true,
    gzipSize: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['sharp', 'canvas'],
    // Enable aggressive CSS optimization
    cssChunking: 'strict',
    optimizeServerReact: true,
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

    // Add CSS optimization plugins for production
    if (!dev && !isServer) {
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
      
      // Add CSS minimizer to optimization
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                discardUnused: true,
                mergeIdents: true,
                reduceIdents: true,
                discardDuplicates: true,
                discardEmpty: true,
                minifyFontValues: true,
                minifyGradients: true,
                minifyParams: true,
                minifySelectors: true,
                normalizeCharset: true,
                normalizeDisplayValues: true,
                normalizePositions: true,
                normalizeRepeatStyle: true,
                normalizeString: true,
                normalizeTimingFunctions: true,
                normalizeUnicode: true,
                normalizeUrl: true,
                normalizeWhitespace: true,
                orderedValues: true,
                reduceInitial: true,
                reduceTransforms: true,
                svgo: true,
                uniqueSelectors: true,
              },
            ],
          },
        })
      );
    }

    // Optimize bundle splitting for better performance
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000, // Reduced max size for better loading
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Critical framework chunk - highest priority
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 50,
            enforce: true,
            reuseExistingChunk: true,
          },
          
          // Critical UI libraries - load early
          criticalUI: {
            name: 'critical-ui',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/](@radix-ui\/react-slot|clsx|class-variance-authority|tailwind-merge)[\\/]/,
            priority: 45,
            enforce: true,
          },
          
          // Icons - can be async loaded
          icons: {
            name: 'icons',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 35,
          },
          
          // Animation libraries - async load
          animations: {
            name: 'animations',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
          },
          
          // PDF libraries - async load only when needed
          pdfLibs: {
            name: 'pdf-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](pdf-lib|pdfjs-dist)[\\/]/,
            priority: 25,
          },
          
          // Image processing - async load
          imageLibs: {
            name: 'image-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](browser-image-compression|react-easy-crop)[\\/]/,
            priority: 25,
          },
          
          // Utility libraries - can be shared
          utils: {
            name: 'utils',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](uuid|jszip|archiver|zod)[\\/]/,
            priority: 20,
            minChunks: 1,
          },
          
          // Analytics and tracking - defer loading
          analytics: {
            name: 'analytics',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](@vercel\/analytics|@vercel\/speed-insights)[\\/]/,
            priority: 15,
          },
          
          // Common vendor chunk for remaining libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          
          // App-specific common code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: false,
          },
        },
      };

      // Advanced optimizations
      config.optimization.concatenateModules = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      config.optimization.providedExports = true;
      
      // Minimize chunk overhead
      config.optimization.runtimeChunk = {
        name: 'runtime',
      };
      
      // Enable module federation for better caching
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

export default nextConfig;
