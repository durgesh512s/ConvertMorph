import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LazyFooter } from "@/components/LazyFooter";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { LazyHeaderAd } from "@/components/LazyAdSense";
import { VercelAnalytics } from '@/components/VercelAnalytics';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { ProgressBar } from '@/components/ProgressBar';
import { CacheBuster } from '@/components/CacheBuster';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Add font-display: swap for better performance
  preload: true, // Preload the font
});

export const metadata: Metadata = {
  title: {
    default: "ConvertMorph - Fast, Private PDF Tools",
    template: "%s | ConvertMorph",
  },
  description: "Fast, private PDF tools — free forever. Convert, compress, and organize PDFs in your browser. Your files stay on your device.",
  keywords: ["PDF", "compress", "merge", "split", "convert", "images", "tools", "free", "privacy"],
  authors: [{ name: "ConvertMorph" }],
  creator: "ConvertMorph",
  publisher: "ConvertMorph",
  metadataBase: new URL(process.env.SITE_URL || 'https://convertmorph.com'),
  alternates: {
    canonical: 'https://convertmorph.com/',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ConvertMorph',
    startupImage: [
      '/apple-touch-icon.png',
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://convertmorph.com",
    title: "ConvertMorph - Fast, Private PDF Tools",
    description: "Fast, private PDF tools — free forever. Convert, compress, and organize PDFs in your browser.",
    siteName: "ConvertMorph",
    images: [
      {
        url: 'https://convertmorph.com/og/pdf-compress.png',
        width: 1200,
        height: 630,
        alt: 'ConvertMorph - Fast, Private PDF Tools',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvertMorph - Fast, Private PDF Tools",
    description: "Fast, private PDF tools — free forever. Convert, compress, and organize PDFs in your browser.",
    images: ['https://convertmorph.com/og/pdf-compress.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    'theme-color': '#0052CC',
    'color-scheme': 'light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google AdSense - Load with lower priority */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <LazyHeaderAd />
          <main className="flex-1">{children}</main>
          <LazyFooter />
        </div>
        <Toaster />
        <KeyboardShortcuts />
        <VercelAnalytics />
        <PerformanceMonitor />
        <CacheBuster debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}
