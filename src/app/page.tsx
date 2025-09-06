'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LazyContentAd } from '@/components/LazyAdSense';
import { CSSFadeIn, CSSSlideUp, LazyFadeIn, LazySlideUp } from '@/components/LazyMotion';
import { formatDate } from '@/lib/date-utils';
import {
  Archive,
  GitMerge,
  Scissors,
  Image as ImageIcon,
  Download,
  Shield,
  ShieldCheck,
  Zap,
  Globe,
  FolderOpen,
  FileSignature,
  Hash,
  Droplets,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart,
  FileText,
  Calculator,
  Crop,
  Eraser,
  Minimize,
  CheckCircle,
  Copy,
  Search,
  BarChart3,
  PiggyBank,
  CreditCard,
  BookOpen,
  Clock,
  Calendar
} from 'lucide-react';

const toolCategories = [
  {
    title: 'PDF Tools',
    description: 'Complete PDF manipulation suite',
    icon: FileSignature,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    tools: [
      { name: 'PDF Compress', href: '/tools/pdf-compress', available: true },
      { name: 'PDF Merge', href: '/tools/pdf-merge', available: true },
      { name: 'PDF Split', href: '/tools/pdf-split', available: true },
      { name: 'Images to PDF', href: '/tools/images-to-pdf', available: true },
      { name: 'PDF to Images', href: '/tools/pdf-to-images', available: true },
      { name: 'PDF Organize', href: '/tools/pdf-organize', available: true },
      { name: 'PDF Watermark', href: '/tools/pdf-watermark', available: true },
      { name: 'PDF Sign', href: '/tools/pdf-sign', available: true },
      { name: 'PDF Page Numbers', href: '/tools/pdf-pagenum', available: true }
    ]
  },
  {
    title: 'Image Tools',
    description: 'Professional image editing and optimization',
    icon: ImageIcon,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    tools: [
      { name: 'Background Remover', href: '#', available: false },
      { name: 'Image Compress', href: '/tools/image-compress', available: true },
      { name: 'Image Resize', href: '/tools/image-resize', available: true },
      { name: 'Image Converter', href: '/tools/image-convert', available: true },
      { name: 'Image Crop', href: '/tools/image-crop', available: true }
    ]
  },
  {
    title: 'Text Tools',
    description: 'Advanced text processing and analysis',
    icon: FileText,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    tools: [
      { name: 'Grammar Checker', href: '#', available: false },
      { name: 'Paraphraser', href: '#', available: false },
      { name: 'Plagiarism Checker', href: '#', available: false },
      { name: 'Text Comparison', href: '/tools/text-compare', available: true },
      { name: 'Word Counter', href: '/tools/word-counter', available: true }
    ]
  },
  {
    title: 'Finance Tools',
    description: 'Financial calculators and planning tools',
    icon: Calculator,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    tools: [
      { name: 'Tax Calculator', href: '/tools/tax-calculator', available: true },
      { name: 'EMI Calculator', href: '/tools/emi-calculator', available: true },
      { name: 'SIP Calculator', href: '/tools/sip-calculator', available: true },
      { name: 'HRA Calculator', href: '/tools/hra-calculator', available: true },
      { name: 'Loan Calculator', href: '/tools/loan-calculator', available: true }
    ]
  }
];

const features = [
  {
    title: 'Privacy First',
    description: 'Your files are processed locally in your browser. Nothing is uploaded to our servers.',
    icon: ShieldCheck,
    color: 'text-blue-600'
  },
  {
    title: 'Lightning Fast',
    description: 'Instant processing with no waiting times. Get your results immediately.',
    icon: Zap,
    color: 'text-yellow-600'
  },
  {
    title: 'Works Everywhere',
    description: 'Use on any device with a web browser. No downloads or installations required.',
    icon: Globe,
    color: 'text-green-600'
  },
  {
    title: 'Always Free',
    description: 'All tools are completely free to use with no hidden charges or subscriptions.',
    icon: Heart,
    color: 'text-red-600'
  }
];

const benefits = [
  {
    title: "Complete Privacy",
    description: "All processing happens locally in your browser. Your files never leave your device.",
    icon: ShieldCheck,
    color: "text-blue-600"
  },
  {
    title: "No Registration Required",
    description: "Start using tools immediately without creating accounts or providing personal information.",
    icon: Zap,
    color: "text-green-600"
  },
  {
    title: "Cross-Platform Compatible",
    description: "Works on Windows, Mac, Linux, iOS, and Android. Any device with a modern browser.",
    icon: Globe,
    color: "text-purple-600"
  }
];

const stats = [
  { label: "Tools Available", value: "15+", icon: Zap },
  { label: "Tool Categories", value: "4", icon: FolderOpen },
  { label: "Always Free", value: "100%", icon: Heart },
  { label: "Privacy First", value: "Local", icon: Shield }
];

// Featured blog posts for the blog preview section
const featuredBlogPosts = [
  {
    title: "ConvertMorph: Free Online Tools for PDF, Image, Text & Finance",
    excerpt: "Discover ConvertMorph's comprehensive suite of free online tools. Process PDFs, edit images, analyze text, and calculate finances securely with our browser-based tools.",
    date: "2025-08-01",
    readTime: "12 min read",
    slug: "convertmorph-free-online-tools",
    category: "Platform Overview"
  },
  {
    title: "How to Compress PDF Files: Complete Guide 2025",
    excerpt: "Learn professional PDF compression techniques to reduce file size while maintaining quality.",
    date: "2025-01-15",
    readTime: "8 min read",
    slug: "how-to-compress-pdf-files",
    category: "PDF Tools"
  },
  {
    title: "Convert Images to PDF: Complete Tutorial",
    excerpt: "Transform JPG, PNG, and other images into professional PDF documents instantly.",
    date: "2025-01-25",
    readTime: "7 min read",
    slug: "convert-images-to-pdf",
    category: "PDF Tools"
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0);

  const scrollToToolkit = (categoryIndex: number) => {
    setActiveCategory(categoryIndex);
    // Scroll to the Professional Digital Toolkit section
    const toolkitSection = document.getElementById('professional-toolkit');
    if (toolkitSection) {
      toolkitSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <CSSFadeIn className="text-center lg:text-left">
              <CSSSlideUp
                delay={1}
                className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4" />
                Free & Privacy-First Digital Tools
              </CSSSlideUp>

              <CSSSlideUp 
                delay={2}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Transform Documents{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Instantly & Securely
                </span>
              </CSSSlideUp>

              <CSSSlideUp 
                delay={3}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
              >
                Professional PDF tools, image editors, text processors, and financial calculators. 
                <br className="hidden sm:block" />
                <span className="text-blue-600 dark:text-blue-400 font-semibold">100% browser-based, completely private, always free.</span>
              </CSSSlideUp>

              <CSSSlideUp 
                delay={4}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/tools" className="flex items-center gap-2">
                    Start Using Tools Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300">
                  <Link href="/about">
                    Learn More About ConvertMorph
                  </Link>
                </Button>
              </CSSSlideUp>

              {/* Trust Indicators */}
              <CSSFadeIn 
                delay={5}
                className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400"
              >
                {[
                  { icon: Shield, text: "100% Private" },
                  { icon: Zap, text: "Instant Results" },
                  { icon: Heart, text: "Always Free" },
                  { icon: CheckCircle, text: "No Registration" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </CSSFadeIn>
            </CSSFadeIn>

            {/* Right Illustration */}
            <CSSFadeIn 
              delay={3}
              className="flex justify-center lg:justify-end mt-8 lg:mt-0"
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {toolCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={category.title}
                        className={`p-6 rounded-2xl ${category.bgColor} shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer`}
                        onClick={() => scrollToToolkit(index)}
                      >
                        <Icon className={`h-8 w-8 ${category.color} mb-2`} />
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {category.tools.length} tools
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CSSFadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <LazySlideUp 
                  key={stat.label}
                  delay={index * 0.1}
                  className="text-center"
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </LazySlideUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section id="professional-toolkit" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyFadeIn className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Digital Toolkit
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From PDF manipulation to financial calculations, we've got all your digital needs covered
            </p>
          </LazyFadeIn>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {toolCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardHeader className={`${toolCategories[activeCategory]?.bgColor} text-center py-8`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${toolCategories[activeCategory]?.gradient} shadow-lg`}>
                    {(() => {
                      const IconComponent = toolCategories[activeCategory]?.icon;
                      return IconComponent ? <IconComponent className="h-12 w-12 text-white" /> : null;
                    })()}
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {toolCategories[activeCategory]?.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                  {toolCategories[activeCategory]?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {toolCategories[activeCategory]?.tools.map((tool, index) => (
                    <div key={tool.name} className="relative">
                      {tool.available ? (
                        <Link
                          href={tool.href}
                          className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {tool.name}
                          </span>
                        </Link>
                      ) : (
                        <div className="block p-4 rounded-lg bg-gray-100 dark:bg-gray-700 opacity-60 cursor-not-allowed relative">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-500 dark:text-gray-400 pr-2">
                              {tool.name}
                            </span>
                            <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                              Coming Soon
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/tools">
                      View All {toolCategories[activeCategory]?.title}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyFadeIn className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Expert Tips & Tutorials
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Learn professional techniques and best practices for PDF, image, text, and finance tools
            </p>
          </LazyFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredBlogPosts.map((post, index) => (
              <LazySlideUp
                key={post.slug}
                delay={index * 0.1}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </LazySlideUp>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="text-base px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300">
              <Link href="/blog" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyFadeIn className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ConvertMorph?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Built with privacy, speed, and simplicity in mind
            </p>
          </LazyFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <LazySlideUp 
                  key={feature.title}
                  delay={index * 0.1}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </LazySlideUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyFadeIn className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Modern Users
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Experience the future of digital tools with privacy and performance in mind
            </p>
          </LazyFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <LazySlideUp
                  key={benefit.title}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
                          <Icon className={`h-8 w-8 ${benefit.color}`} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </LazySlideUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Ad */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyContentAd />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LazyFadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust ConvertMorph for fast, private, and professional document processing. 
              Start using our comprehensive digital toolkit today - completely free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/tools" className="flex items-center gap-2">
                  Start Using Tools Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 hover:border-white transition-all duration-300">
                <Link href="/about">
                  Learn About ConvertMorph
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-blue-100">
              {[
                { icon: Shield, text: "100% Private" },
                { icon: Zap, text: "Instant Results" },
                { icon: Heart, text: "Always Free" },
                { icon: CheckCircle, text: "No Registration" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </LazyFadeIn>
        </div>
      </section>
    </div>
  );
}
