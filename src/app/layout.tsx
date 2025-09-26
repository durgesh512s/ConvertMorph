import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LazyFooter } from "@/components/LazyFooter";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { LazyHeaderAd } from "@/components/LazyAdSense";
import { DeferredScripts } from '@/components/DeferredScripts';
import { ProgressBar } from '@/components/ProgressBar';
import JsonLd from '@/components/JsonLd';
import CacheBuster from '../CacheBuster';
import HydrationErrorSuppressor from '@/components/HydrationErrorSuppressor';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import { absoluteUrl } from '@/lib/url';
import { getCacheBustId, addCacheBust } from '@/lib/cache-bust';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

// Get cache bust ID for consistent versioning
const cacheBustId = getCacheBustId();

export const metadata: Metadata = {
  title: "ConvertMorph - Professional PDF, Image, Text & Finance Tools | Free Online Toolkit",
  description: "Transform documents instantly with ConvertMorph's comprehensive digital toolkit. Free PDF tools, image editors, text processors, and financial calculators. 100% browser-based, completely private, always free. No registration required.",
  keywords: [
    "PDF tools", "PDF compress", "PDF merge", "PDF split", "PDF converter",
    "image tools", "image compress", "image resize", "background remover",
    "text tools", "grammar checker", "paraphraser", "plagiarism checker",
    "finance tools", "tax calculator", "EMI calculator", "SIP calculator",
    "free online tools", "privacy first", "browser based", "no registration",
    "document processing", "file conversion", "digital toolkit"
  ],
  authors: [{ name: "ConvertMorph Team", url: "https://convertmorph.com/about" }],
  creator: "ConvertMorph",
  publisher: "ConvertMorph",
  generator: "Next.js",
  applicationName: "ConvertMorph",
  category: "Productivity Tools",
  classification: "Business & Productivity",
  metadataBase: new URL(absoluteUrl('/')),
  alternates: {
    languages: {
      'en-US': 'https://convertmorph.com/',
      'en': 'https://convertmorph.com/',
      'x-default': 'https://convertmorph.com/',
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: addCacheBust('/favicon.ico', cacheBustId), type: 'image/x-icon' },
      { url: addCacheBust('/favicon-16x16.png', cacheBustId), sizes: '16x16', type: 'image/png' },
      { url: addCacheBust('/favicon-32x32.png', cacheBustId), sizes: '32x32', type: 'image/png' },
      { url: addCacheBust('/favicon.svg', cacheBustId), type: 'image/svg+xml' },
      { url: addCacheBust('/android-chrome-192x192.png', cacheBustId), sizes: '192x192', type: 'image/png' },
      { url: addCacheBust('/android-chrome-512x512.png', cacheBustId), sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: addCacheBust('/apple-touch-icon.png', cacheBustId), sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ConvertMorph - Digital Tools',
    startupImage: [
      {
        url: '/apple-touch-icon.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://convertmorph.com",
    title: "ConvertMorph - Professional PDF, Image, Text & Finance Tools",
    description: "Transform documents instantly with our comprehensive digital toolkit. Free PDF tools, image editors, text processors, and financial calculators. 100% private, browser-based processing.",
    siteName: "ConvertMorph",
    images: [
      {
        url: 'https://convertmorph.com/og/homepage.png',
        width: 1200,
        height: 630,
        alt: 'ConvertMorph - Transform Documents Instantly & Securely',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@convertmorph",
    creator: "@convertmorph",
    title: "ConvertMorph - Professional Digital Tools | Free Online Toolkit",
    description: "Transform documents instantly with our comprehensive digital toolkit. PDF tools, image editors, text processors, and financial calculators. 100% private & free.",
    images: [
      {
        url: 'https://convertmorph.com/og/homepage.png',
        alt: 'ConvertMorph - Transform Documents Instantly & Securely',
        width: 1200,
        height: 630,
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  other: {
    'color-scheme': 'light dark',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#0052CC',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Enhanced JSON-LD structured data for rich snippets
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://convertmorph.com/#organization",
  "name": "ConvertMorph",
  "alternateName": "ConvertMorph Document Tools",
  "description": "Fast, private file tools for everyone. Convert, compress, and organize PDFs and images right in your browser.",
  "url": "https://convertmorph.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://convertmorph.com/logo/logo-full.svg",
    "width": 200,
    "height": 60,
    "caption": "ConvertMorph Logo"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://convertmorph.com/logo/logo-full.svg",
    "width": 200,
    "height": 60
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "url": "https://convertmorph.com/contact",
      "contactType": "customer service",
      "email": "support@convertmorph.com",
      "availableLanguage": ["English"]
    }
  ],
  "sameAs": ["https://convertmorph.com"],
  "foundingDate": "2025",
  "slogan": "Fast, private file tools for everyone",
  "knowsAbout": [
    "PDF compression",
    "PDF merging",
    "PDF splitting",
    "Image to PDF conversion",
    "PDF to image conversion",
    "Document processing",
    "File conversion",
    "PDF optimization",
    "Document security",
    "File privacy"
  ],
  "serviceType": [
    "PDF Tools",
    "Document Processing",
    "File Conversion",
    "Image Processing"
  ],
  "offers": {
    "@type": "Offer",
    "name": "PDF Processing Tools",
    "description": "Free online PDF tools for compression, merging, splitting, and conversion",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "category": "Software Application"
  },
  "applicationCategory": "Productivity Software",
  "operatingSystem": "Web Browser",
  "softwareVersion": "1.0"
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://convertmorph.com/#website",
  "url": "https://convertmorph.com",
  "name": "ConvertMorph",
  "description": "Professional digital toolkit offering free PDF tools, image editors, text processors, and financial calculators",
  "publisher": {
    "@id": "https://convertmorph.com/#organization"
  },
  "inLanguage": "en-US",
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://convertmorph.com/tools?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Enhanced JSON-LD structured data */}
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        
        {/* Favicon and Icons - Optimized for Google Search */}
        <link rel="icon" href={addCacheBust('/favicon.ico', cacheBustId)} type="image/x-icon" />
        <link rel="shortcut icon" href={addCacheBust('/favicon.ico', cacheBustId)} type="image/x-icon" />
        <link rel="icon" href={addCacheBust('/favicon-16x16.png', cacheBustId)} sizes="16x16" type="image/png" />
        <link rel="icon" href={addCacheBust('/favicon-32x32.png', cacheBustId)} sizes="32x32" type="image/png" />
        <link rel="icon" href={addCacheBust('/favicon.svg', cacheBustId)} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={addCacheBust('/apple-touch-icon.png', cacheBustId)} />
        <link rel="icon" href={addCacheBust('/android-chrome-192x192.png', cacheBustId)} sizes="192x192" type="image/png" />
        <link rel="icon" href={addCacheBust('/android-chrome-512x512.png', cacheBustId)} sizes="512x512" type="image/png" />
        
        {/* Meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ConvertMorph" />
        <meta name="application-name" content="ConvertMorph" />
        <meta name="msapplication-TileColor" content="#0052CC" />
        <meta name="theme-color" content="#0052CC" />
        
        {/* Critical resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        
        {/* Google Tag Manager */}
        <GoogleTagManager />
        
        {/* Google AdSense Script - Direct HTML script tag to avoid Next.js preload conversion */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1811205442467517" 
          crossOrigin="anonymous"
        />
        
        {/* Font preloading handled by Next.js font optimization */}
        
        {/* CSS is automatically handled by Next.js through ES6 imports */}
        {/* Removed hardcoded preload links that cause 404 errors in production */}
        
        {/* Critical inline CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            .hero-section{min-height:600px;display:flex;align-items:center}
            .mobile-container{width:100%;max-width:100vw;overflow-x:hidden}
            .mobile-content{min-height:calc(100vh-64px)}
            .mobile-nav{position:sticky;top:0;z-index:50;min-height:64px;max-height:64px}
            .font-display-swap{font-display:swap}
            .stable-animation{transform:translateZ(0);backface-visibility:hidden;perspective:1000px}
            /* Prevent layout shifts */
            *{box-sizing:border-box}
            body{margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            .loading-skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
            @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
          `
        }} />
        
      </head>
      <body className={`min-h-screen bg-background font-sans antialiased ${poppins.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />
        
        <HydrationErrorSuppressor>
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          
          {/* Modern layout structure with improved accessibility */}
          <div className="flex min-h-screen flex-col">
            <header>
              <Navbar />
              {/* LazyHeaderAd temporarily removed for AdSense verification - add back after approval */}
            </header>
            
            <main className="flex-1 relative min-h-[calc(100vh-200px)]">
              {children}
            </main>
            
            <footer>
              <LazyFooter />
            </footer>
          </div>
          
          {/* Global UI Components */}
          <Toaster />
          <KeyboardShortcuts />
          
          {/* Analytics and Performance - Deferred to prevent blocking */}
          <DeferredScripts />
          <CacheBuster debug={process.env.NODE_ENV === 'development'} />
        </HydrationErrorSuppressor>
      </body>
    </html>
  );
}
