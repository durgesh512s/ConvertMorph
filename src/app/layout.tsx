import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <KeyboardShortcuts />
      </body>
    </html>
  );
}
