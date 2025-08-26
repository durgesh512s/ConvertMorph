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
  ArrowRight,
  Move3D,
  Type,
  Hash,
  PenTool
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Tools',
  description: 'Professional PDF tools for compression, merging, splitting, and conversion. All tools work locally in your browser for maximum privacy.',
};

const tools = [
  {
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality. Choose from light, medium, or strong compression levels.',
    icon: Archive,
    href: '/tools/pdf-compress',
    color: 'text-blue-600',
    features: ['Multiple compression levels', 'Maintains quality', 'Batch processing'],
  },
  {
    title: 'PDF Merge',
    description: 'Combine multiple PDF files into a single document. Preserve page order and bookmarks.',
    icon: GitMerge,
    href: '/tools/pdf-merge',
    color: 'text-green-600',
    features: ['Combine multiple PDFs', 'Preserve formatting', 'Custom page order'],
  },
  {
    title: 'PDF Split',
    description: 'Split PDF pages into separate documents using page ranges like 1-3,5,7-9.',
    icon: Scissors,
    href: '/tools/pdf-split',
    color: 'text-purple-600',
    features: ['Flexible page ranges', 'Multiple output files', 'Batch download'],
  },
  {
    title: 'Images to PDF',
    description: 'Convert JPG, PNG images to PDF format. Create single or multiple PDF files.',
    icon: ImageIcon,
    href: '/tools/images-to-pdf',
    color: 'text-orange-600',
    features: ['Multiple image formats', 'Single or multi-page', 'Custom page sizes'],
  },
  {
    title: 'PDF to Images',
    description: 'Extract pages from PDF as high-quality PNG or JPG image files.',
    icon: Download,
    href: '/tools/pdf-to-images',
    color: 'text-red-600',
    features: ['High-quality output', 'Multiple formats', 'Custom DPI settings'],
  },
  {
    title: 'PDF Organize',
    description: 'Reorder and rotate PDF pages with visual drag-and-drop interface.',
    icon: Move3D,
    href: '/tools/pdf-organize',
    color: 'text-indigo-600',
    features: ['Visual page thumbnails', 'Drag & drop reorder', 'Rotate pages 90°'],
  },
  {
    title: 'PDF Watermark',
    description: 'Add text watermarks to PDF documents with customizable position and style.',
    icon: Type,
    href: '/tools/pdf-watermark',
    color: 'text-cyan-600',
    features: ['Custom text watermarks', 'Position control', 'Opacity & rotation'],
  },
  {
    title: 'PDF Page Numbers',
    description: 'Add page numbers to PDF documents with multiple formats and positions.',
    icon: Hash,
    href: '/tools/pdf-pagenum',
    color: 'text-emerald-600',
    features: ['Multiple number formats', 'Header/footer placement', 'Custom starting number'],
  },
  {
    title: 'PDF Fill & Sign',
    description: 'Add signatures and text to PDF documents. Draw or type signatures.',
    icon: PenTool,
    href: '/tools/pdf-sign',
    color: 'text-rose-600',
    features: ['Draw signatures', 'Add text fields', 'Multiple elements'],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade PDF tools that work entirely in your browser. 
            Your files stay private and secure on your device.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.title} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className={`h-8 w-8 ${tool.color}`} />
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <ArrowRight className="h-4 w-4 text-gray-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href={tool.href}>Use Tool</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our PDF Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Archive className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                100% Private
              </h3>
              <p className="text-gray-600">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GitMerge className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                No uploads or downloads. Process files instantly without waiting.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Scissors className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Quality
              </h3>
              <p className="text-gray-600">
                Enterprise-grade tools with advanced features and high-quality output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
