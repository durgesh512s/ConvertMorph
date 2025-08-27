import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Droplets
} from 'lucide-react';

const tools = [
  {
    title: 'PDF Compress',
    description: 'Reduce file size while maintaining quality',
    icon: Archive,
    href: '/tools/pdf-compress',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'PDF Merge',
    description: 'Combine multiple PDFs into one',
    icon: GitMerge,
    href: '/tools/pdf-merge',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'PDF Split',
    description: 'Split PDF pages into separate files',
    icon: Scissors,
    href: '/tools/pdf-split',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Images to PDF',
    description: 'Convert JPG, PNG images to PDF',
    icon: ImageIcon,
    href: '/tools/images-to-pdf',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'PDF to Images',
    description: 'Extract pages as image files',
    icon: Download,
    href: '/tools/pdf-to-images',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    title: 'PDF Organize',
    description: 'Reorder and organize PDF pages',
    icon: FolderOpen,
    href: '/tools/pdf-organize',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    title: 'PDF Watermark',
    description: 'Add watermarks to your PDFs',
    icon: Droplets,
    href: '/tools/pdf-watermark',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'PDF Page Numbers',
    description: 'Add page numbers to PDFs',
    icon: Hash,
    href: '/tools/pdf-pagenum',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
  {
    title: 'PDF Sign',
    description: 'Digitally sign your PDF documents',
    icon: FileSignature,
    href: '/tools/pdf-sign',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
];

const features = [
  {
    title: 'Privacy First',
    description: 'Your files are processed locally in your browser. Nothing is uploaded to our servers.',
    icon: ShieldCheck,
    color: 'text-blue-600',
  },
  {
    title: 'Lightning Fast',
    description: 'Instant processing with no waiting times. Get your results immediately.',
    icon: Zap,
    color: 'text-blue-600',
  },
  {
    title: 'Works Everywhere',
    description: 'Use on any device with a web browser. No downloads or installations required.',
    icon: Globe,
    color: 'text-blue-600',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Fast, private file tools —{' '}
                <span className="text-blue-600 dark:text-blue-400">free forever</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Convert, compress, and organize documents in your browser. 
                Your files stay on your device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button asChild size="lg" className="text-lg px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700">
                  <Link href="/tools">Open Tools</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link href="/about">Install App</Link>
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>No uploads (local when possible)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Secure (HTTPS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span>Auto-delete (≤ 1h)</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <svg width="400" height="300" viewBox="0 0 400 300" className="w-full max-w-md">
                  {/* File Stack */}
                  <g transform="translate(50, 50)">
                    {/* Bottom file */}
                    <rect x="0" y="40" width="80" height="100" rx="8" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                    <rect x="10" y="50" width="60" height="4" rx="2" fill="#9ca3af"/>
                    <rect x="10" y="60" width="45" height="4" rx="2" fill="#9ca3af"/>
                    <rect x="10" y="70" width="55" height="4" rx="2" fill="#9ca3af"/>
                    
                    {/* Middle file */}
                    <rect x="20" y="20" width="80" height="100" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                    <rect x="30" y="30" width="60" height="4" rx="2" fill="#6b7280"/>
                    <rect x="30" y="40" width="45" height="4" rx="2" fill="#6b7280"/>
                    <rect x="30" y="50" width="55" height="4" rx="2" fill="#6b7280"/>
                    
                    {/* Top file */}
                    <rect x="40" y="0" width="80" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                    <rect x="50" y="10" width="60" height="4" rx="2" fill="#3b82f6"/>
                    <rect x="50" y="20" width="45" height="4" rx="2" fill="#3b82f6"/>
                    <rect x="50" y="30" width="55" height="4" rx="2" fill="#3b82f6"/>
                  </g>

                  {/* Arrow */}
                  <g transform="translate(200, 100)">
                    <path d="M0 20 L40 20 M30 10 L40 20 L30 30" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>

                  {/* Converted file */}
                  <g transform="translate(270, 75)">
                    <rect x="0" y="0" width="80" height="100" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
                    <circle cx="40" cy="30" r="15" fill="#22c55e"/>
                    <path d="M32 30 L38 36 L48 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="10" y="55" width="60" height="4" rx="2" fill="#22c55e"/>
                    <rect x="10" y="65" width="45" height="4" rx="2" fill="#22c55e"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Tools for Every Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional-grade PDF tools that work entirely in your browser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-8 w-8 ${tool.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 text-center">
                    <CardDescription className="text-base mb-6 flex-1">
                      {tool.description}
                    </CardDescription>
                    <Button asChild className="w-full mt-auto">
                      <Link href={tool.href}>Try Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12 hidden md:block">
            <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/tools">View All Tools →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ConvertMorph?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with privacy, speed, and simplicity in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className={`h-12 w-12 ${feature.color} dark:text-blue-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              From the Blog
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tips, tutorials, and insights to help you get the most out of your PDF tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "How to Compress PDF Files Without Losing Quality",
                excerpt: "Learn the best techniques to reduce PDF file sizes while maintaining document quality and readability.",
                slug: "how-to-compress-pdf-files"
              },
              {
                title: "Merge PDF Files Online: Complete Guide",
                excerpt: "Step-by-step instructions for combining multiple PDF documents into a single file efficiently.",
                slug: "merge-pdf-files-online"
              },
              {
                title: "Convert Images to PDF: Best Practices",
                excerpt: "Discover how to convert JPG, PNG, and other image formats to PDF with optimal results.",
                slug: "convert-images-to-pdf"
              }
            ].map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/blog">View All Blog Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg py-12 px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start using our PDF tools right now. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700">
                <Link href="/tools/pdf-compress">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950">
                <Link href="/tools">See All Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
