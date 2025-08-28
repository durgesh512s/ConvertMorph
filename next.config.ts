import type { NextConfig } from "next";

// Extend NextConfig to include allowedDevOrigins for newer Next.js versions
interface ExtendedNextConfig extends NextConfig {
  allowedDevOrigins?: string[];
}

const nextConfig: ExtendedNextConfig = {
  // Allow cross-origin requests from specific IP addresses during development
  allowedDevOrigins: ['192.168.29.150'],
  
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
