import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scissors, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Split PDF Pages: Extract & Separate PDF Files Online | ConvertMorph',
  description: 'Learn how to split PDF files by pages, extract specific pages, or separate large PDFs into smaller documents. Free online PDF splitter tool.',
  keywords: 'split PDF, extract PDF pages, separate PDF, PDF splitter, divide PDF pages',
  openGraph: {
    title: 'How to Split PDF Pages: Extract & Separate PDF Files Online',
    description: 'Learn how to split PDF files by pages, extract specific pages, or separate large PDFs into smaller documents. Free online PDF splitter tool.',
    type: 'article',
    publishedTime: '2024-01-30T10:00:00.000Z',
    authors: ['ConvertMorph Team'],
  },
  alternates: {
    canonical: '/blog/split-pdf-pages',
  },
};

export default function SplitPDFGuide() {
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
              How to Split PDF Pages: Extract & Separate PDF Files Online
            </h1>
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <time dateTime="2024-01-30">January 30, 2024</time>
              <span className="mx-2">•</span>
              <span>6 min read</span>
              <span className="mx-2">•</span>
              <span>PDF Tools</span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Need to extract specific pages from a PDF or split a large document into smaller files? 
              Learn how to split PDF pages efficiently with our comprehensive guide.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2>Why Split PDF Files?</h2>
            <p>
              Splitting PDF files is useful in many situations:
            </p>
            <ul>
              <li><strong>Extract important pages:</strong> Pull out specific pages you need</li>
              <li><strong>Reduce file size:</strong> Create smaller, more manageable documents</li>
              <li><strong>Share selectively:</strong> Send only relevant pages to recipients</li>
              <li><strong>Organize content:</strong> Separate chapters or sections into individual files</li>
              <li><strong>Email limitations:</strong> Break large files to meet attachment size limits</li>
              <li><strong>Storage efficiency:</strong> Archive only necessary pages</li>
            </ul>

            <h2>How to Split PDFs with ConvertMorph</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <div className="flex items-start space-x-3">
                <Scissors className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Easy Splitting Process:</h4>
                  <ol className="text-blue-800 space-y-2">
                    <li>1. Visit ConvertMorph PDF Split tool</li>
                    <li>2. Upload your PDF file</li>
                    <li>3. Specify page ranges (e.g., 1-3, 5, 7-9)</li>
                    <li>4. Preview your selections</li>
                    <li>5. Download individual PDF files or ZIP archive</li>
                  </ol>
                </div>
              </div>
            </div>

            <h2>Page Range Formats</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">Single Pages</h4>
                <div className="space-y-2 text-green-800 text-sm">
                  <p><code className="bg-green-100 px-2 py-1 rounded">1</code> - Extract page 1 only</p>
                  <p><code className="bg-green-100 px-2 py-1 rounded">5</code> - Extract page 5 only</p>
                  <p><code className="bg-green-100 px-2 py-1 rounded">1,3,5</code> - Extract pages 1, 3, and 5</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Page Ranges</h4>
                <div className="space-y-2 text-blue-800 text-sm">
                  <p><code className="bg-blue-100 px-2 py-1 rounded">1-5</code> - Extract pages 1 through 5</p>
                  <p><code className="bg-blue-100 px-2 py-1 rounded">10-15</code> - Extract pages 10 through 15</p>
                  <p><code className="bg-blue-100 px-2 py-1 rounded">1-3,7-9</code> - Extract pages 1-3 and 7-9</p>
                </div>
              </div>
            </div>

            <h2>Common Splitting Scenarios</h2>
            
            <h3>Extract Specific Chapters</h3>
            <p>
              For books, reports, or manuals with distinct chapters:
            </p>
            <ul>
              <li>Identify chapter start and end pages</li>
              <li>Use range format: &quot;1-10, 11-25, 26-40&quot;</li>
              <li>Create separate files for each chapter</li>
              <li>Maintain logical document structure</li>
            </ul>

            <h3>Remove Unwanted Pages</h3>
            <p>
              To exclude specific pages from a document:
            </p>
            <ul>
              <li>Identify pages to keep (not remove)</li>
              <li>Specify ranges excluding unwanted pages</li>
              <li>Example: For 20-page doc, remove pages 5-8: &quot;1-4, 9-20&quot;</li>
            </ul>

            <h3>Create Document Excerpts</h3>
            <p>
              Extract key pages for presentations or summaries:
            </p>
            <ul>
              <li>Select most important pages</li>
              <li>Maintain logical flow</li>
              <li>Consider page dependencies</li>
              <li>Add cover page if needed</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
              <div className="flex items-start space-x-3">
                <Download className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Download Options:</h4>
                  <p className="text-yellow-800 text-sm">
                    ConvertMorph provides multiple download options: individual PDF files for each 
                    range or a convenient ZIP archive containing all split documents.
                  </p>
                </div>
              </div>
            </div>

            <h2>Best Practices for PDF Splitting</h2>
            <ul>
              <li><strong>Plan your splits:</strong> Identify logical break points before starting</li>
              <li><strong>Check page numbers:</strong> Verify page ranges match your intentions</li>
              <li><strong>Maintain context:</strong> Ensure split documents make sense independently</li>
              <li><strong>Name files clearly:</strong> Use descriptive names for split documents</li>
              <li><strong>Test results:</strong> Open and review split files before sharing</li>
              <li><strong>Keep originals:</strong> Always maintain a copy of the original document</li>
            </ul>

            <h2>Advanced Splitting Techniques</h2>
            
            <h3>Batch Processing</h3>
            <p>
              For multiple documents with similar structures:
            </p>
            <ul>
              <li>Identify common page patterns</li>
              <li>Use consistent naming conventions</li>
              <li>Process similar documents together</li>
              <li>Automate repetitive splits when possible</li>
            </ul>

            <h3>Quality Preservation</h3>
            <p>
              Maintain document quality during splitting:
            </p>
            <ul>
              <li>Use tools that preserve original formatting</li>
              <li>Check for font and image integrity</li>
              <li>Verify hyperlinks still work</li>
              <li>Ensure bookmarks are preserved when relevant</li>
            </ul>

            <h2>Alternative Splitting Methods</h2>
            
            <h3>Desktop Software</h3>
            <p>
              Professional PDF editors offer advanced splitting features:
            </p>
            <ul>
              <li><strong>Adobe Acrobat Pro:</strong> Advanced page extraction and organization</li>
              <li><strong>PDFtk:</strong> Command-line tool for batch operations</li>
              <li><strong>PDF-XChange Editor:</strong> Visual page selection interface</li>
            </ul>

            <h3>Online Alternatives</h3>
            <p>
              Other web-based PDF splitters:
            </p>
            <ul>
              <li>Browser-based tools with drag-and-drop interfaces</li>
              <li>Cloud-based services with storage integration</li>
              <li>Mobile-optimized splitting applications</li>
            </ul>

            <h2>Security Considerations</h2>
            <p>
              When splitting sensitive documents:
            </p>
            <ul>
              <li>Use tools that process files locally (like ConvertMorph)</li>
              <li>Avoid uploading confidential documents to unknown servers</li>
              <li>Check if split PDFs maintain original security settings</li>
              <li>Consider password protection for sensitive split documents</li>
              <li>Verify that unwanted pages are completely removed</li>
            </ul>

            <h2>Troubleshooting Common Issues</h2>
            
            <h3>Invalid Page Ranges</h3>
            <p>
              If you encounter page range errors:
            </p>
            <ul>
              <li>Check that page numbers exist in the document</li>
              <li>Verify range format (use hyphens for ranges, commas for lists)</li>
              <li>Ensure no overlapping ranges</li>
              <li>Count pages accurately (some PDFs have different numbering)</li>
            </ul>

            <h3>Large File Handling</h3>
            <p>
              For very large PDF files:
            </p>
            <ul>
              <li>Split into smaller chunks first</li>
              <li>Use tools designed for large file processing</li>
              <li>Consider file size limits of your chosen tool</li>
              <li>Allow extra time for processing</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              PDF splitting is an essential skill for document management and organization. 
              Whether you need to extract specific pages, create smaller files, or organize 
              content more effectively, ConvertMorph provides a secure and efficient solution 
              that works directly in your browser.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-primary mb-2">Ready to split your PDF?</h4>
              <p className="text-gray-700 mb-4">
                Extract specific pages or split large PDFs into manageable documents with ConvertMorph.
              </p>
              <Link 
                href="/tools/pdf-split" 
                className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Split PDF Now
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
