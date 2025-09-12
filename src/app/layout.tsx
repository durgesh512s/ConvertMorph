import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LazyFooter } from "@/components/LazyFooter";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { LazyHeaderAd } from "@/components/LazyAdSense";
import { VercelAnalytics } from '@/components/VercelAnalytics';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { ProgressBar } from '@/components/ProgressBar';
import JsonLd from '@/components/JsonLd';
import CacheBuster from '../CacheBuster';
import { ServerBreadcrumb } from '@/components/ServerBreadcrumb';
import { absoluteUrl } from '@/lib/url';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "ConvertMorph - Professional PDF, Image, Text & Finance Tools | Free Online Toolkit",
    template: "%s | ConvertMorph - Free Digital Tools",
  },
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
      { url: '/favicon.svg?v=mffc5l8y', type: 'image/svg+xml' },
      { url: '/android-chrome-192x192.png?v=mffc5l8y', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=mffc5l8y', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=mffc5l8y', sizes: '180x180', type: 'image/png' },
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
    'theme-color': '#0052CC',
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
  "alternateName": ["Convert Morph", "ConvertMorph Tools"],
  "url": "https://convertmorph.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://convertmorph.com/logo/logo-full.svg",
    "width": 300,
    "height": 100,
    "caption": "ConvertMorph Logo"
  },
  "description": "Professional digital toolkit offering free PDF tools, image editors, text processors, and financial calculators. 100% browser-based, completely private, always free.",
  "foundingDate": "2024",
  "slogan": "Transform Documents Instantly & Securely",
  "knowsAbout": [
    "PDF Processing",
    "Image Editing",
    "Text Analysis",
    "Financial Calculations",
    "Document Conversion",
    "Privacy-First Tools"
  ],
  "areaServed": "Worldwide",
  "serviceType": "Digital Tools and Document Processing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ConvertMorph Digital Tools",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PDF Tools",
          "description": "Comprehensive PDF manipulation suite including compress, merge, split, and conversion tools"
        },
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Image Tools",
          "description": "Professional image editing and optimization tools including background removal and compression"
        },
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Text Tools",
          "description": "Advanced text processing and analysis tools including grammar checking and plagiarism detection"
        },
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Finance Tools",
          "description": "Financial calculators and planning tools including tax, EMI, and SIP calculators"
        },
        "price": "0",
        "priceCurrency": "USD"
      }
    ]
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://convertmorph.com/contact",
      "availableLanguage": "English",
      "areaServed": "Worldwide"
    },
    {
      "@type": "ContactPoint",
      "contactType": "Technical Support",
      "email": "support@convertmorph.com",
      "availableLanguage": "English",
      "areaServed": "Worldwide"
    }
  ],
  "sameAs": [
    "https://twitter.com/convertmorph",
    "https://github.com/convertmorph"
  ]
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
    },
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://convertmorph.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "mainEntity": {
    "@type": "ItemList",
    "name": "ConvertMorph Tools",
    "description": "Comprehensive digital toolkit with PDF, image, text, and finance tools",
    "numberOfItems": 20,
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "name": "PDF Compress",
        "url": "https://convertmorph.com/tools/pdf-compress",
        "applicationCategory": "Productivity",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "PDF Merge",
        "url": "https://convertmorph.com/tools/pdf-merge",
        "applicationCategory": "Productivity",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Background Remover",
        "url": "https://convertmorph.com/tools/background-remover",
        "applicationCategory": "Graphics & Design",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Enhanced JSON-LD structured data */}
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <ServerBreadcrumb />
        
        {/* Favicon and Icons - Only favicon.svg and essential files */}
        <link rel="icon" href="/favicon.svg?v=mffc5l8y" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=mffc5l8y" />
        <link rel="icon" href="/android-chrome-192x192.png?v=mffc5l8y" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png?v=mffc5l8y" sizes="512x512" type="image/png" />
        
        {/* Meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ConvertMorph" />
        <meta name="application-name" content="ConvertMorph" />
        <meta name="msapplication-TileColor" content="#0052CC" />
        <meta name="theme-color" content="#0052CC" />
        
        {/* Preconnect to external domains for performance */}
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
      <body className={`min-h-screen bg-background font-sans antialiased ${poppins.variable}`}>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        
        {/* Modern layout structure with improved accessibility */}
        <div className="flex min-h-screen flex-col">
          <header>
            <Navbar />
            <LazyHeaderAd />
          </header>
          
          <main className="flex-1 relative">
            {children}
          </main>
          
          <footer>
            <LazyFooter />
          </footer>
        </div>
        
        {/* Global UI Components */}
        <Toaster />
        <KeyboardShortcuts />
        
        {/* Analytics and Performance */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <VercelAnalytics />
        <PerformanceMonitor />
        <CacheBuster debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}
