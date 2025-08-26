import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Compress PDF Files: Complete Guide 2024 | ConvertMorph',
  description: 'Learn how to compress PDF files effectively. Reduce file size while maintaining quality with our step-by-step guide and free online tools.',
  keywords: 'compress PDF, reduce PDF size, PDF compression, optimize PDF, shrink PDF files',
  openGraph: {
    title: 'How to Compress PDF Files: Complete Guide 2024',
    description: 'Learn how to compress PDF files effectively. Reduce file size while maintaining quality with our step-by-step guide and free online tools.',
    type: 'article',
    publishedTime: '2024-01-15T10:00:00.000Z',
    authors: ['ConvertMorph Team'],
  },
  alternates: {
    canonical: '/blog/how-to-compress-pdf-files',
  },
};

export default function CompressPDFGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-xl shadow-sm border p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How to Compress PDF Files: Complete Guide 2024
            </h1>
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <time dateTime="2024-01-15">January 15, 2024</time>
              <span className="mx-2">•</span>
              <span>8 min read</span>
              <span className="mx-2">•</span>
              <span>PDF Tools</span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Large PDF files can be a hassle to share and store. Learn how to compress PDF files 
              effectively while maintaining quality using various methods and tools.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2>Why Compress PDF Files?</h2>
            <p>
              PDF compression is essential for several reasons:
            </p>
            <ul>
              <li><strong>Faster sharing:</strong> Smaller files upload and download quicker</li>
              <li><strong>Storage savings:</strong> Reduce storage space requirements</li>
              <li><strong>Email compatibility:</strong> Most email providers have attachment size limits</li>
              <li><strong>Better performance:</strong> Compressed PDFs load faster in browsers</li>
            </ul>

            <h2>Methods to Compress PDF Files</h2>
            
            <h3>1. Online PDF Compressors</h3>
            <p>
              Online tools like ConvertMorph offer convenient PDF compression without software installation:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Steps:</h4>
                  <ol className="text-blue-800 space-y-1">
                    <li>1. Visit ConvertMorph PDF Compress tool</li>
                    <li>2. Upload your PDF file</li>
                    <li>3. Choose compression level (Light, Medium, Strong)</li>
                    <li>4. Download the compressed file</li>
                  </ol>
                </div>
              </div>
            </div>

            <h3>2. Desktop Software</h3>
            <p>
              Professional software like Adobe Acrobat Pro offers advanced compression options:
            </p>
            <ul>
              <li>Batch processing capabilities</li>
              <li>Custom compression settings</li>
              <li>OCR and optimization features</li>
            </ul>

            <h3>3. Built-in OS Tools</h3>
            <p>
              Both Windows and macOS include basic PDF compression:
            </p>
            <ul>
              <li><strong>Windows:</strong> Print to PDF with reduced quality</li>
              <li><strong>macOS:</strong> Preview app with Quartz Filter</li>
            </ul>

            <h2>Compression Levels Explained</h2>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">Light Compression</h4>
                <p className="text-green-800 text-sm">
                  Minimal size reduction with highest quality retention. Best for documents with important visual details.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-900 mb-2">Medium Compression</h4>
                <p className="text-yellow-800 text-sm">
                  Balanced approach between file size and quality. Suitable for most business documents.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-900 mb-2">Strong Compression</h4>
                <p className="text-red-800 text-sm">
                  Maximum size reduction with some quality loss. Ideal for text-heavy documents.
                </p>
              </div>
            </div>

            <h2>Best Practices for PDF Compression</h2>
            <ul>
              <li><strong>Choose the right level:</strong> Balance between file size and quality</li>
              <li><strong>Optimize images:</strong> Reduce image resolution and quality</li>
              <li><strong>Remove unnecessary elements:</strong> Delete unused fonts and objects</li>
              <li><strong>Test different tools:</strong> Results may vary between compressors</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy & Security</h4>
                  <p className="text-gray-700 text-sm">
                    When using online tools, ensure they don't store your files permanently. 
                    ConvertMorph processes files locally and automatically deletes them after compression.
                  </p>
                </div>
              </div>
            </div>

            <h2>Conclusion</h2>
            <p>
              PDF compression is a valuable skill for anyone working with digital documents. 
              Whether you choose online tools, desktop software, or built-in OS features, 
              the key is finding the right balance between file size and quality for your specific needs.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-primary mb-2">Ready to compress your PDFs?</h4>
              <p className="text-gray-700 mb-4">
                Try ConvertMorph's free PDF compression tool with multiple quality options.
              </p>
              <Link 
                href="/tools/pdf-compress" 
                className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Compress PDF Now
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
