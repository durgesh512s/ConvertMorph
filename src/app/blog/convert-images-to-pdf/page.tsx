import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Image, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Convert Images to PDF: JPG, PNG to PDF Online Free | ConvertMorph',
  description: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF or create separate PDFs. No software required.',
  keywords: 'convert images to PDF, JPG to PDF, PNG to PDF, image to PDF converter, photos to PDF',
  openGraph: {
    title: 'Convert Images to PDF: JPG, PNG to PDF Online Free',
    description: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF or create separate PDFs. No software required.',
    images: ['/og/blog/convert-images-to-pdf.png'],
    type: 'article',
    publishedTime: '2024-01-25T10:00:00.000Z',
    authors: ['ConvertMorph Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Images to PDF: JPG, PNG to PDF Online Free',
    description: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF or create separate PDFs. No software required.',
    images: ['/og/blog/convert-images-to-pdf.png'],
  },
  alternates: {
    canonical: '/blog/convert-images-to-pdf',
  },
};

export default function ImagesToPDFGuide() {
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
              Convert Images to PDF: JPG, PNG to PDF Online Free
            </h1>
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <time dateTime="2024-01-25">January 25, 2024</time>
              <span className="mx-2">•</span>
              <span>7 min read</span>
              <span className="mx-2">•</span>
              <span>PDF Tools</span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Transform your images into professional PDF documents instantly. Learn how to convert 
              JPG, PNG, and other image formats to PDF with our comprehensive guide.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2>Why Convert Images to PDF?</h2>
            <p>
              Converting images to PDF format offers numerous advantages:
            </p>
            <ul>
              <li><strong>Universal compatibility:</strong> PDFs open on any device or platform</li>
              <li><strong>Professional presentation:</strong> Create polished documents from photos</li>
              <li><strong>Easy sharing:</strong> Send multiple images as a single file</li>
              <li><strong>Print optimization:</strong> Maintain image quality for printing</li>
              <li><strong>Document archiving:</strong> Preserve images in a standard format</li>
              <li><strong>Size management:</strong> Combine multiple images efficiently</li>
            </ul>

            <h2>How to Convert Images to PDF with ConvertMorph</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <div className="flex items-start space-x-3">
                <Image className="w-6 h-6 text-blue-600 mt-1" aria-label="Image icon" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Simple Conversion Process:</h4>
                  <ol className="text-blue-800 space-y-2">
                    <li>1. Visit ConvertMorph Images to PDF tool</li>
                    <li>2. Upload your image files (JPG, PNG, JPEG supported)</li>
                    <li>3. Choose conversion option: single PDF or multiple PDFs</li>
                    <li>4. Arrange images in your preferred order</li>
                    <li>5. Click &quot;Convert to PDF&quot; and download your files</li>
                  </ol>
                </div>
              </div>
            </div>

            <h2>Supported Image Formats</h2>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">JPEG/JPG</h4>
                <p className="text-green-800 text-sm">
                  Most common format for photos and digital images. Excellent compression with good quality.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">PNG</h4>
                <p className="text-blue-800 text-sm">
                  Perfect for images with transparency, logos, and graphics with sharp edges.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 mb-2">More Formats</h4>
                <p className="text-purple-800 text-sm">
                  Support for additional formats coming soon, including TIFF, BMP, and WebP.
                </p>
              </div>
            </div>

            <h2>Conversion Options</h2>
            
            <h3>Single PDF with Multiple Pages</h3>
            <p>
              Combine all your images into one PDF document where each image becomes a separate page. 
              This is ideal for:
            </p>
            <ul>
              <li>Photo albums and portfolios</li>
              <li>Document scanning (receipts, contracts)</li>
              <li>Presentation materials</li>
              <li>Recipe collections</li>
            </ul>

            <h3>Individual PDFs</h3>
            <p>
              Convert each image to its own PDF file. Perfect for:
            </p>
            <ul>
              <li>Individual document archiving</li>
              <li>Separate file requirements</li>
              <li>Different distribution needs</li>
              <li>Organized file management</li>
            </ul>

            <h2>Common Use Cases</h2>
            
            <h3>Business Applications</h3>
            <ul>
              <li><strong>Invoice scanning:</strong> Convert receipt photos to PDF for accounting</li>
              <li><strong>Document digitization:</strong> Transform paper documents to digital format</li>
              <li><strong>Product catalogs:</strong> Create professional product documentation</li>
              <li><strong>Presentation materials:</strong> Convert slides and charts to PDF</li>
            </ul>

            <h3>Personal Projects</h3>
            <ul>
              <li><strong>Photo albums:</strong> Create digital photo books from your pictures</li>
              <li><strong>Recipe collections:</strong> Digitize handwritten or printed recipes</li>
              <li><strong>Travel documentation:</strong> Combine travel photos and documents</li>
              <li><strong>Art portfolios:</strong> Showcase artwork in professional format</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
              <div className="flex items-start space-x-3">
                <Smartphone className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Mobile-Friendly Tip:</h4>
                  <p className="text-yellow-800 text-sm">
                    ConvertMorph works perfectly on mobile devices. Take photos with your phone 
                    and convert them to PDF instantly without needing a computer.
                  </p>
                </div>
              </div>
            </div>

            <h2>Quality Optimization Tips</h2>
            <ul>
              <li><strong>Image resolution:</strong> Use high-resolution images for better PDF quality</li>
              <li><strong>File size balance:</strong> Consider compression vs. quality trade-offs</li>
              <li><strong>Consistent orientation:</strong> Rotate images before conversion if needed</li>
              <li><strong>Proper lighting:</strong> Ensure good lighting when photographing documents</li>
              <li><strong>Clean backgrounds:</strong> Remove clutter for professional appearance</li>
            </ul>

            <h2>Alternative Methods</h2>
            
            <h3>Desktop Software</h3>
            <p>
              Professional image editing software offers advanced conversion features:
            </p>
            <ul>
              <li><strong>Adobe Photoshop:</strong> Advanced editing before conversion</li>
              <li><strong>GIMP:</strong> Free alternative with PDF export</li>
              <li><strong>Microsoft Office:</strong> Insert images into Word, then save as PDF</li>
            </ul>

            <h3>Mobile Apps</h3>
            <p>
              Smartphone apps provide convenient on-the-go conversion:
            </p>
            <ul>
              <li>Built-in camera apps with PDF scanning</li>
              <li>Dedicated document scanner apps</li>
              <li>Cloud storage apps with conversion features</li>
            </ul>

            <h2>Security and Privacy</h2>
            <p>
              When converting sensitive images, consider these security aspects:
            </p>
            <ul>
              <li>Use tools that process files locally (like ConvertMorph)</li>
              <li>Avoid uploading personal photos to unknown servers</li>
              <li>Check if converted PDFs maintain original metadata</li>
              <li>Consider password protection for sensitive documents</li>
            </ul>

            <h2>Troubleshooting Common Issues</h2>
            
            <h3>Large File Sizes</h3>
            <p>
              If your PDF becomes too large:
            </p>
            <ul>
              <li>Compress images before conversion</li>
              <li>Reduce image resolution if print quality allows</li>
              <li>Convert to separate PDFs instead of one large file</li>
              <li>Use PDF compression tools after conversion</li>
            </ul>

            <h3>Quality Issues</h3>
            <p>
              To maintain image quality:
            </p>
            <ul>
              <li>Start with high-quality source images</li>
              <li>Avoid multiple format conversions</li>
              <li>Check PDF settings for quality preferences</li>
              <li>Test different conversion tools if needed</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              Converting images to PDF is an essential skill in our digital world. Whether you need 
              to create professional documents, archive important photos, or share multiple images 
              efficiently, ConvertMorph provides a secure and user-friendly solution that works 
              directly in your browser.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-primary mb-2">Ready to convert your images?</h4>
              <p className="text-gray-700 mb-4">
                Transform your JPG and PNG images into professional PDF documents with ConvertMorph.
              </p>
              <Link 
                href="/tools/images-to-pdf" 
                className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Convert Images to PDF
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
