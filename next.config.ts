import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,

  // Optimize build output
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'same-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
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
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', 'framer-motion'],
    optimizeCss: true,
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

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
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
          },
          // Vendor chunk for large libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            minChunks: 1,
            maxInitialRequests: 25,
            minSize: 20000,
          },
          // Separate chunk for framer-motion (lazy loaded)
          framerMotion: {
            name: 'framer-motion',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
          },
          // Separate chunk for PDF libraries (lazy loaded)
          pdfLibs: {
            name: 'pdf-libs',
            chunks: 'async',
            test: /[\\/]node_modules[\\/](pdf-lib|pdfjs-dist)[\\/]/,
            priority: 30,
          },
          // UI components chunk
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            priority: 25,
          },
          // Common chunk for shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: false,
          },
        },
      };

      // Optimize module concatenation
      config.optimization.concatenateModules = true;
      
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Optimize for production - removed problematic alias
    // framer-motion will be lazy loaded instead

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
