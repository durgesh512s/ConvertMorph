import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'How to Compress PDF Files Online: Complete Guide 2025',
  excerpt: 'Learn how to compress PDF files effectively while maintaining quality. Step-by-step guide with free online tools, compression levels, and best practices.',
  slug: 'how-to-compress-pdf-files',
  focusKeyword: 'compress PDF online',
  secondaryKeywords: [
    'reduce PDF size',
    'shrink PDF',
    'compress PDF without losing quality',
    'make PDF smaller',
    'online PDF compressor',
    'PDF file size reducer'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-01-15T10:00:00.000Z',
  dateModified: '2025-01-20T15:30:00.000Z',
  readingTime: '8 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-compress-pdf-files', text: 'Why Compress PDF Files?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'compression-methods', text: 'PDF Compression Methods', level: 2 },
  { id: 'online-pdf-compressors', text: 'Online PDF Compressors', level: 3 },
  { id: 'desktop-software', text: 'Desktop Software', level: 3 },
  { id: 'compression-levels', text: 'Understanding Compression Levels', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How much can I compress a PDF file?',
    answer: 'PDF compression typically reduces file size by 30-70% depending on the content and compression level. Documents with many images can be compressed more than text-only files.'
  },
  {
    question: 'Does compressing a PDF reduce quality?',
    answer: 'Light compression maintains original quality, while medium and strong compression may slightly reduce image quality. Text remains crisp at all compression levels.'
  },
  {
    question: 'Is it safe to compress PDFs online?',
    answer: 'Yes, when using reputable tools like ConvertMorph that process files locally and automatically delete them after compression. Always check the privacy policy.'
  },
  {
    question: 'Can I compress password-protected PDFs?',
    answer: 'Most online tools cannot compress password-protected PDFs for security reasons. You&apos;ll need to remove the password first or use desktop software.'
  },
  {
    question: 'What&apos;s the maximum file size I can compress?',
    answer: 'ConvertMorph supports PDF files up to 100MB. For larger files, consider splitting them first or using desktop software for batch processing.'
  },
  {
    question: 'How long does PDF compression take?',
    answer: 'Online compression typically takes 10-60 seconds depending on file size and complexity. Larger files with many images take longer to process.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'How to Compress PDF Files', url: '/blog/how-to-compress-pdf-files' }
];

export default function CompressPDFGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD removed - handled by DynamicBreadcrumb component in layout */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumbs */}
          <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.url} className="flex items-center whitespace-nowrap">
                  {index > 0 && <span className="mx-2">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 dark:text-white font-medium">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.url} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 sm:mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 order-2 lg:order-1 w-full min-w-0">
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 w-full overflow-hidden">
                <header className="mb-6 lg:mb-8">
                  <h1 id="main-title" className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4 leading-tight break-words">
                    How to Compress PDF Files Online: Complete Guide 2025
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>January 15, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Large PDF files slow down sharing and consume storage space. Learn how to compress PDF files online 
                    while maintaining quality using our step-by-step guide and professional tools.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <ToolCTA toolSlug="pdf-compress" variant="compact" className="mb-6 lg:mb-8" />

                <div className="blog-prose">
                  <h2 id="why-compress-pdf-files">Why Compress PDF Files?</h2>
                  <p>
                    PDF compression solves common document management challenges that affect productivity and user experience:
                  </p>
                  <ul>
                    <li><strong>Faster file sharing:</strong> Compressed PDFs upload and download 3-5x quicker</li>
                    <li><strong>Storage optimization:</strong> Reduce storage costs by up to 70% with smart compression</li>
                    <li><strong>Email compatibility:</strong> Most email providers limit attachments to 25MB</li>
                    <li><strong>Improved performance:</strong> Smaller PDFs load faster in browsers and mobile devices</li>
                    <li><strong>Bandwidth savings:</strong> Essential for teams with limited internet connectivity</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our online PDF compressor uses advanced algorithms to reduce file size without compromising readability. 
                    Here&apos;s the simple process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your PDF</h4>
                        <p>Drag and drop your PDF file or click to browse. Files are processed securely in your browser.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Choose Compression Level</h4>
                        <p>Select Light (minimal compression), Medium (balanced), or Strong (maximum compression) based on your needs.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Compressed File</h4>
                        <p>Get your optimized PDF instantly. Original files are automatically deleted for privacy.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Compressor</h4>
                    <p>
                      Compress your PDFs now with our free online tool. No registration required, 
                      and your files are processed securely.
                    </p>
                    <Link 
                      href="/tools/pdf-compress" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Compress PDF Now
                    </Link>
                  </div>

                  <h2 id="compression-methods">PDF Compression Methods</h2>
                  
                  <h3 id="online-pdf-compressors">Online PDF Compressors</h3>
                  <p>
                    Web-based tools offer convenience and accessibility without software installation. 
                    ConvertMorph provides enterprise-grade compression with these advantages:
                  </p>
                  <ul>
                    <li>No software installation required</li>
                    <li>Works on any device with internet access</li>
                    <li>Multiple compression levels available</li>
                    <li>Batch processing for multiple files</li>
                    <li>Privacy-focused with automatic file deletion</li>
                  </ul>

                  <h3 id="desktop-software">Desktop Software</h3>
                  <p>
                    Professional applications like Adobe Acrobat Pro offer advanced features for power users:
                  </p>
                  <ul>
                    <li>Granular control over compression settings</li>
                    <li>Batch processing for large document collections</li>
                    <li>OCR and text optimization capabilities</li>
                    <li>Integration with document management systems</li>
                  </ul>

                  <h2 id="compression-levels">Understanding Compression Levels</h2>
                  <p>
                    Choose the right compression level based on your document type and quality requirements:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Compression Level</th>
                        <th>Size Reduction</th>
                        <th>Quality Impact</th>
                        <th>Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Light</td>
                        <td>20-40%</td>
                        <td>Minimal</td>
                        <td>High-quality documents, presentations</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>40-60%</td>
                        <td>Slight</td>
                        <td>Business documents, reports</td>
                      </tr>
                      <tr>
                        <td>Strong</td>
                        <td>60-80%</td>
                        <td>Noticeable</td>
                        <td>Text-heavy documents, archives</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize compression efficiency while maintaining document quality with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Optimize before compression:</strong> Remove unnecessary pages, annotations, and metadata</li>
                    <li><strong>Choose appropriate levels:</strong> Use light compression for final documents, strong for archives</li>
                    <li><strong>Test different settings:</strong> Compare results to find the optimal balance for your needs</li>
                    <li><strong>Consider image content:</strong> Documents with many images compress more than text-only files</li>
                    <li><strong>Batch similar documents:</strong> Use consistent settings for document collections</li>
                    <li><strong>Verify compatibility:</strong> Test compressed files with your intended software and devices</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Image Optimization</h4>
                    <p>
                      For PDFs with many images, consider optimizing images separately before creating the PDF. 
                      This can result in better compression ratios and quality.
                    </p>
                  </div>

                  <h2 id="faq">Frequently Asked Questions</h2>
                  <div className="faq-section" data-testid="faq">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <div className="faq-question">
                          {faq.question}
                        </div>
                        <div className="faq-answer">
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    Compressing PDF files online is essential for efficient document management in today&apos;s digital workplace. 
                    ConvertMorph&apos;s free PDF compressor provides the perfect balance of convenience, quality, and security for all your compression needs.
                  </p>

                  {/* Final CTA */}
                  <ToolCTA toolSlug="pdf-compress" variant="featured" className="mt-6 lg:mt-8" />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2 w-full min-w-0">
              <div className="space-y-4 lg:space-y-8">
                {/* Table of Contents - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <BlogTOC headings={headings} className="sticky top-24" />
                </div>
                
                {/* Related Posts - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <RelatedPosts 
                    currentSlug="how-to-compress-pdf-files" 
                    count={2} 
                    variant="list" 
                  />
                </div>
              </div>
            </div>

            {/* Mobile Related Posts - Shown only on mobile, after main content */}
            <div className="lg:hidden order-3 w-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-6 w-full overflow-hidden">
                <RelatedPosts 
                  currentSlug="how-to-compress-pdf-files" 
                  count={2} 
                  variant="grid" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
