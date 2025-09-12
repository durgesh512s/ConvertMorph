import { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Shield, Globe, Heart, ArrowRight, CheckCircle, Users, Award, Sparkles, Code, Lock, Rocket } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: 'About ConvertMorph | Fast, Private PDF Tools',
  description: 'Learn about ConvertMorph - fast, private file tools for everyone. Convert, compress, and organize PDFs and images right in your browser.',
  alternates: {
    canonical: `${config.siteUrl}/about`,
  },
  openGraph: {
    title: 'About ConvertMorph | Fast, Private PDF Tools',
    description: 'Fast, private file tools for everyone. Many tasks run locally on your device.',
    type: 'website',
    url: `${config.siteUrl}/about`,
    images: [`${config.siteUrl}/og/default.png?v=1`],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${config.siteUrl}/og/default.png?v=1`],
  },
}

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://convertmorph.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://convertmorph.com/about"
      }
    ]
  }

  // Organization Schema Markup
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ConvertMorph",
    "alternateName": "ConvertMorph Document Tools",
    "description": "Fast, private file tools for everyone. Convert, compress, and organize PDFs and images right in your browser.",
    "url": config.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${config.siteUrl}/logo/logo-full.svg`,
      "width": 200,
      "height": 60,
      "caption": "ConvertMorph Logo"
    },
    "image": {
      "@type": "ImageObject",
      "url": `${config.siteUrl}/logo/logo-full.svg`,
      "width": 200,
      "height": 60
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "url": `${config.siteUrl}/contact`,
        "contactType": "customer service",
        "email": "support@convertmorph.com",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [config.siteUrl],
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
    "softwareVersion": "1.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ConvertMorph",
    "url": config.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${config.siteUrl}/search?q={query}`,
      "query-input": "required name=query"
    }
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Sparkles className="h-4 w-4" />
              Fast, Private & Free Forever
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Professional Document Tools
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Right in Your Browser
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              ConvertMorph helps you{' '}
              <Link 
                href="/tools/pdf-compress" 
                className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 relative z-10"
              >
                compress
              </Link>
              ,{' '}
              <Link 
                href="/tools/pdf-merge" 
                className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 relative z-10"
              >
                merge
              </Link>
              , and{' '}
              <Link 
                href="/tools/pdf-organize" 
                className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 relative z-10"
              >
                organize PDFs
              </Link>
              {' '}with complete privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <Link 
                href="/tools" 
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10"
              >
                Try Our Tools
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">No signup required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">


          {/* Why ConvertMorph Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose ConvertMorph?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the perfect blend of speed, privacy, and accessibility in PDF processing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Optimized pipelines and local processing deliver results instantly. No waiting for uploads or downloads.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Instant processing</span>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  100% Private
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your files never leave your device with local processing. Temporary files auto-delete for cloud operations.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Zero data collection</span>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Always Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Core tools remain free forever with no hidden costs, limitations, or premium tiers. Professional-grade for everyone.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>No signup required</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 text-center px-4">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto px-4">
              We believe that powerful file processing tools should be accessible to everyone without compromising privacy or requiring expensive software. ConvertMorph brings professional-grade <Link href="/tools/pdf-compress" className="text-blue-600 hover:text-blue-700 underline">PDF compression</Link>, <Link href="/tools/pdf-split" className="text-blue-600 hover:text-blue-700 underline">splitting</Link>, and <Link href="/tools/pdf-to-images" className="text-blue-600 hover:text-blue-700 underline">image conversion tools</Link> directly to your browser, ensuring your files stay secure while delivering the performance you need.
            </p>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Cutting-edge technology meets user-friendly design for seamless PDF processing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-xl mr-4">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Local Processing
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Many tools run entirely in your browser using modern web technologies like WebAssembly and JavaScript libraries. This means faster processing and complete privacy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">No file uploads required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Instant processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Works offline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Complete privacy</span>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-purple-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600 p-3 rounded-xl mr-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Cloud Processing
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Some complex operations use secure cloud processing with automatic file deletion for advanced features and large file support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Advanced compression algorithms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Large file support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Auto-delete within 1 hour</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Encrypted transmission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                Universal Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our tools work on any device with a modern web browser. No downloads, installations, or platform restrictions. Whether you&apos;re on Windows, Mac, Linux, or mobile, ConvertMorph works for you.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                Privacy by Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We built ConvertMorph with privacy as a core principle, not an afterthought. Local processing, automatic file deletion, and minimal data collection ensure your documents remain private.
              </p>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center px-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto px-4">
              Started in 2025 by Software Engineer Durgesh Sharma obsessed with speed and privacy, ConvertMorph makes professional-grade PDF tools accessible to everyone—right in the browser.
            </p>
          </div>

          {/* Available Tools Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our PDF Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore our comprehensive suite of{' '}
                <Link 
                  href="/tools" 
                  className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 relative z-10"
                >
                  free PDF tools
                </Link>
                {' '}designed for all your document processing needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/tools/pdf-compress" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    PDF Compress
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reduce file size while maintaining quality with advanced compression algorithms.
                </p>
              </Link>
              
              <Link href="/tools/pdf-merge" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    PDF Merge
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Combine multiple PDFs into one document with drag-and-drop simplicity.
                </p>
              </Link>
              
              <Link href="/tools/pdf-split" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    PDF Split
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Extract pages or split into multiple files with precise control.
                </p>
              </Link>
              
              <Link href="/tools/images-to-pdf" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg mr-3">
                    <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    Images to PDF
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Convert JPG, PNG images to PDF format with custom layouts.
                </p>
              </Link>
              
              <Link href="/tools/pdf-to-images" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg mr-3">
                    <Award className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    PDF to Images
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Extract high-quality images from PDF documents instantly.
                </p>
              </Link>
              
              <Link href="/tools/pdf-organize" className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg mr-3">
                    <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    PDF Organize
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reorder and rearrange PDF pages with intuitive drag-and-drop.
                </p>
              </Link>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/tools" 
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10"
              >
                Explore All Tools
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Learn More Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Link href="/blog" className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-3 rounded-xl mr-4">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  PDF Tips & Tutorials
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Expert guides and best practices for PDF processing. Learn advanced techniques and discover new ways to optimize your workflow.
              </p>
              <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <span className="text-sm font-medium">Read our blog</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link href="/privacy" className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-green-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-3 rounded-xl mr-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Privacy Policy
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn how we protect your data and privacy. Understand our commitment to keeping your documents secure and confidential.
              </p>
              <div className="mt-6 flex items-center gap-2 text-green-600 dark:text-green-400">
                <span className="text-sm font-medium">View privacy policy</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Final CTA Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your PDFs?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust ConvertMorph for fast, private, and professional PDF processing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/tools" 
                  className="group inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Using Our Tools
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Free forever • No registration required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
