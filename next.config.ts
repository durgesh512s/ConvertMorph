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
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-slot', 
      'framer-motion',
      'react-dropzone',
      'browser-image-compression',
      'pdf-lib',
      'pdfjs-dist',
      'jszip',
      'archiver',
      'uuid',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
      'sonner',
      'zod'
    ],
    optimizeCss: true,
    webpackBuildWorker: true,
    gzipSize: true,
    esmExternals: true,
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

      // Enhanced dead code elimination - rely on Next.js built-in optimization
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;
    }

    // Optimize bundle splitting for better performance and unused code elimination
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000, // Smaller chunks for better granularity
        maxSize: 100000, // Smaller max size for better loading and tree shaking
        maxInitialRequests: 50,
        maxAsyncRequests: 50,
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Critical framework chunk - highest priority, minimal size
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 60,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 80000,
          },
          
          // Critical UI libraries - load early, tree-shaken
          criticalUI: {
            name: 'critical-ui',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/](@radix-ui\/react-slot|clsx|class-variance-authority|tailwind-merge)[\\/]/,
            priority: 55,
            enforce: true,
            maxSize: 50000,
          },
          
          // Icons - async loaded, tree-shaken for used icons only
          icons: {
            name: 'icons',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 45,
            maxSize: 30000,
          },
          
          // Animation libraries - async load, tree-shaken
          animations: {
            name: 'animations',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 40,
            maxSize: 60000,
          },
          
          // PDF libraries - async load only when needed, highly optimized
          pdfLibs: {
            name: 'pdf-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](pdf-lib|pdfjs-dist)[\\/]/,
            priority: 35,
            maxSize: 80000,
          },
          
          // Image processing - async load, tree-shaken
          imageLibs: {
            name: 'image-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](browser-image-compression|react-easy-crop)[\\/]/,
            priority: 35,
            maxSize: 40000,
          },
          
          // DnD libraries - async load when needed
          dndLibs: {
            name: 'dnd-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]@dnd-kit[\\/]/,
            priority: 30,
            maxSize: 30000,
          },
          
          // Utility libraries - tree-shaken, shared
          utils: {
            name: 'utils',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](uuid|jszip|archiver|zod|sonner)[\\/]/,
            priority: 25,
            minChunks: 1,
            maxSize: 40000,
          },
          
          // Analytics and tracking - defer loading, minimal
          analytics: {
            name: 'analytics',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](@vercel\/analytics|@vercel\/speed-insights)[\\/]/,
            priority: 20,
            maxSize: 20000,
          },
          
          // Dropzone - async load when needed
          dropzone: {
            name: 'dropzone',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]react-dropzone[\\/]/,
            priority: 25,
            maxSize: 25000,
          },
          
          // Common vendor chunk for remaining libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            minChunks: 1,
            reuseExistingChunk: true,
            maxSize: 60000,
          },
          
          // App-specific common code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: false,
            maxSize: 40000,
          },
        },
      };

      // Advanced optimizations - let Next.js handle usedExports
      config.optimization.concatenateModules = true;
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
