import type { MetadataRoute } from 'next';
import { getCacheBustId, addCacheBust } from '@/lib/cache-bust';

export default function manifest(): MetadataRoute.Manifest {
  const cacheBustId = getCacheBustId();

  return {
    name: "ConvertMorph - Professional PDF, Image, Text & Finance Tools",
    short_name: "ConvertMorph",
    description: "Transform documents instantly with ConvertMorph's comprehensive digital toolkit. Free PDF tools, image editors, text processors, and financial calculators. 100% browser-based, completely private, always free.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0052CC",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: [
      "productivity",
      "utilities",
      "business",
      "finance",
      "graphics"
    ],
    icons: [
      {
        src: addCacheBust("/favicon.svg", cacheBustId),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: addCacheBust("/android-chrome-512x512.png", cacheBustId),
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: addCacheBust("/apple-touch-icon.png", cacheBustId),
        sizes: "180x180",
        type: "image/png"
      }
    ],
    shortcuts: [
      {
        name: "PDF Compress",
        short_name: "Compress",
        description: "Reduce PDF file size",
        url: "/tools/pdf-compress",
        icons: [
          {
            src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
            sizes: "192x192"
          }
        ]
      },
      {
        name: "PDF Merge",
        short_name: "Merge",
        description: "Combine multiple PDFs",
        url: "/tools/pdf-merge",
        icons: [
          {
            src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
            sizes: "192x192"
          }
        ]
      },
      {
        name: "Image Compress",
        short_name: "Img Compress",
        description: "Compress images online",
        url: "/tools/image-compress",
        icons: [
          {
            src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
            sizes: "192x192"
          }
        ]
      },
      {
        name: "Text Compare",
        short_name: "Compare",
        description: "Compare text differences",
        url: "/tools/text-compare",
        icons: [
          {
            src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
            sizes: "192x192"
          }
        ]
      },
      {
        name: "Tax Calculator",
        short_name: "Tax Calc",
        description: "Calculate taxes",
        url: "/tools/tax-calculator",
        icons: [
          {
            src: addCacheBust("/android-chrome-192x192.png", cacheBustId),
            sizes: "192x192"
          }
        ]
      }
    ],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "ConvertMorph Digital Tools Dashboard"
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "640x1136",
        type: "image/png",
        form_factor: "narrow",
        label: "ConvertMorph Mobile Interface"
      }
    ]
  };
}
