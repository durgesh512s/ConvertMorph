import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Archive, 
  GitMerge, 
  Scissors, 
  Image as ImageIcon, 
  Download,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

const tools = [
  {
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality',
    icon: Archive,
    href: '/tools/pdf-compress',
    color: 'text-blue-600',
  },
  {
    title: 'PDF Merge',
    description: 'Combine multiple PDFs into a single document',
    icon: GitMerge,
    href: '/tools/pdf-merge',
    color: 'text-green-600',
  },
  {
    title: 'PDF Split',
    description: 'Split PDF pages into separate documents',
    icon: Scissors,
    href: '/tools/pdf-split',
    color: 'text-purple-600',
  },
  {
    title: 'Images to PDF',
    description: 'Convert JPG, PNG images to PDF format',
    icon: ImageIcon,
    href: '/tools/images-to-pdf',
    color: 'text-orange-600',
  },
  {
    title: 'PDF to Images',
    description: 'Extract pages from PDF as image files',
    icon: Download,
    href: '/tools/pdf-to-images',
    color: 'text-red-600',
  },
];

const features = [
  {
    title: 'Privacy First',
    description: 'Your files are processed locally in your browser. Nothing is uploaded to our servers.',
    icon: Shield,
  },
  {
    title: 'Lightning Fast',
    description: 'Instant processing with no waiting times. Get your results immediately.',
    icon: Zap,
  },
  {
    title: 'Works Everywhere',
    description: 'Use on any device with a web browser. No downloads or installations required.',
    icon: Globe,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Fast, private file tools —{' '}
              <span className="text-blue-600">free forever</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Convert, compress, and organize documents in your browser. 
              Your files stay on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link href="/tools">Open Tools</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link href="/about">Install App</Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>No uploads (local when possible)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>Secure (HTTPS)</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <span>Auto-delete (≤ 1h)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PDF Tools for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade PDF tools that work entirely in your browser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-8 w-8 ${tool.color}`} />
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {tool.description}
                    </CardDescription>
                    <Button asChild className="w-full">
                      <Link href={tool.href}>Try Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ConvertMorph?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with privacy, speed, and simplicity in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start using our PDF tools right now. No sign-up required.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/tools">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
