import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Scissors } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'How to Split PDF Pages: Extract & Separate PDF Files Online',
  excerpt: 'Learn how to split PDF files by pages, extract specific pages, or separate large PDFs into smaller documents. Complete guide with step-by-step instructions.',
  slug: 'split-pdf-pages',
  focusKeyword: 'split PDF pages',
  secondaryKeywords: [
    'extract pages from PDF',
    'split large PDF',
    'save selected pages as PDF',
    'PDF page splitter',
    'separate PDF documents',
    'divide PDF by pages'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-01-30T10:00:00.000Z',
  dateModified: '2025-01-30T10:00:00.000Z',
  readingTime: '8 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-split-pdf-files', text: 'Why Split PDF Files?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'page-range-formats', text: 'Page Range Formats and Examples', level: 2 },
  { id: 'splitting-scenarios', text: 'Common PDF Splitting Scenarios', level: 2 },
  { id: 'advanced-techniques', text: 'Advanced Splitting Techniques', level: 2 },
  { id: 'best-practices', text: 'Best Practices for PDF Splitting', level: 2 },
  { id: 'troubleshooting', text: 'Troubleshooting Common Issues', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How do I split PDF pages without losing quality?',
    answer: 'Use ConvertMorph\'s PDF splitter which preserves original formatting, fonts, and image quality. The tool extracts pages without recompression, maintaining the exact quality of your original document.'
  },
  {
    question: 'Can I split password-protected PDF files?',
    answer: 'Yes, but you\'ll need to enter the password first to unlock the PDF before splitting. ConvertMorph processes files securely in your browser without storing passwords or documents on servers.'
  },
  {
    question: 'What\'s the maximum file size for splitting PDFs?',
    answer: 'ConvertMorph can handle large PDF files up to 100MB. For larger files, consider splitting them into smaller chunks first or using the batch processing feature for multiple documents.'
  },
  {
    question: 'How do I extract specific pages from a PDF?',
    answer: 'Enter the page numbers you want to extract using formats like \'1,3,5\' for individual pages or \'1-5,10-15\' for ranges. The tool will create separate PDF files for each selection.'
  },
  {
    question: 'Is it free to split PDF pages online?',
    answer: 'Yes, ConvertMorph\'s PDF splitter is completely free with no registration required. You can split unlimited PDF files without watermarks or restrictions.'
  },
  {
    question: 'Can I split PDF files on mobile devices?',
    answer: 'Absolutely! ConvertMorph works on all devices including smartphones and tablets. The responsive interface makes it easy to split PDF pages on any screen size.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Split PDF Pages', url: '/blog/split-pdf-pages' }
];

export default function SplitPDFGuide() {
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
                    Split PDF Pages Online: Complete Guide 2025
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>January 30, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to <strong>split PDF pages</strong> or extract specific sections from large documents? 
                    Whether you want to <strong>extract pages from PDF</strong> files, <strong>split large PDF</strong> documents 
                    into manageable chunks, or <strong>save selected pages as PDF</strong> files, this comprehensive guide 
                    covers everything you need to know about PDF page splitting.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <ToolCTA toolSlug="pdf-split" variant="compact" className="mb-6 lg:mb-8" />

                <div className="blog-prose">
                  <h2 id="why-split-pdf-files">Why Split PDF Files?</h2>
                  <p>
                    <strong>PDF page splitter</strong> tools are essential for document management. Here's when you need to <strong>divide PDF by pages</strong>:
                  </p>
                  <ul>
                    <li><strong>Extract important sections:</strong> Pull out specific chapters, pages, or content from lengthy reports</li>
                    <li><strong>Reduce file size:</strong> Create smaller, more manageable documents for easier sharing</li>
                    <li><strong>Share selectively:</strong> Send only relevant pages to recipients without exposing entire documents</li>
                    <li><strong>Organize content:</strong> Separate chapters, sections, or topics into individual files</li>
                    <li><strong>Email limitations:</strong> Break large files to meet attachment size limits (typically 25MB)</li>
                    <li><strong>Storage efficiency:</strong> Archive only necessary pages to save storage space</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>PDF page splitter</strong> makes it easy to <strong>extract pages from PDF</strong> files with precision. 
                    Here's the simple process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your PDF</h4>
                        <p>Drag and drop your PDF file or click to browse. Files are processed securely in your browser with no registration required.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Select Pages to Extract</h4>
                        <p>Specify which pages to extract using individual numbers (1,3,5) or ranges (1-5,10-15). Preview your selections before processing.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Split PDFs</h4>
                        <p>Get your extracted pages as individual PDF files or a convenient ZIP archive. All files maintain original quality.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Splitter</h4>
                    <p>
                      Split your PDFs now with our free online tool. Extract specific pages or separate large documents 
                      into smaller files instantly.
                    </p>
                    <Link 
                      href="/tools/pdf-split" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Scissors className="w-4 h-4 mr-2" />
                      Split PDF Pages Now
                    </Link>
                  </div>

                  <h2 id="page-range-formats">Page Range Formats and Examples</h2>
                  <p>
                    Master these formats to <strong>split PDF pages</strong> efficiently:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Result</th>
                        <th>Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>1</code></td>
                        <td>Page 1 only</td>
                        <td>Single page extraction</td>
                      </tr>
                      <tr>
                        <td><code>1-5</code></td>
                        <td>Pages 1 through 5</td>
                        <td>Continuous sections</td>
                      </tr>
                      <tr>
                        <td><code>1,3,5</code></td>
                        <td>Pages 1, 3, and 5</td>
                        <td>Scattered pages</td>
                      </tr>
                      <tr>
                        <td><code>1-3,7-9</code></td>
                        <td>Pages 1-3 and 7-9</td>
                        <td>Multiple sections</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="callout callout-info">
                    <h4>Advanced Examples</h4>
                    <ul>
                      <li><strong>Extract chapters:</strong> <code>1-10, 11-25, 26-40, 41-55</code></li>
                      <li><strong>Remove middle pages:</strong> <code>1-5, 15-20</code> (excludes pages 6-14)</li>
                      <li><strong>Get summary pages:</strong> <code>1, 5, 10, 15, 20</code> (every 5th page)</li>
                      <li><strong>Split by sections:</strong> <code>1-2, 3-8, 9-12, 13-20</code></li>
                    </ul>
                  </div>

                  <h2 id="splitting-scenarios">Common PDF Splitting Scenarios</h2>
                  
                  <h3>Academic and Research Documents</h3>
                  <p><strong>Split large PDF</strong> research papers or textbooks:</p>
                  <ul>
                    <li>Extract specific chapters for focused study sessions</li>
                    <li><strong>Save selected pages as PDF</strong> for citations and references</li>
                    <li>Create reading assignments from larger textbooks</li>
                    <li>Separate methodology from results sections for analysis</li>
                  </ul>

                  <h3>Business and Professional Use</h3>
                  <p><strong>Divide PDF by pages</strong> for business efficiency:</p>
                  <ul>
                    <li>Extract executive summaries from lengthy reports</li>
                    <li><strong>Separate PDF documents</strong> by department or team</li>
                    <li>Create client-specific document packages</li>
                    <li>Split contracts into individual sections for review</li>
                  </ul>

                  <h3>Legal and Compliance</h3>
                  <p><strong>Extract pages from PDF</strong> legal documents:</p>
                  <ul>
                    <li>Separate exhibits from main legal documents</li>
                    <li>Create redacted versions by excluding sensitive pages</li>
                    <li><strong>Split PDF pages</strong> for different case files</li>
                    <li>Extract signature pages for processing workflows</li>
                  </ul>

                  <h2 id="advanced-techniques">Advanced Splitting Techniques</h2>
                  
                  <h3>Batch Processing Multiple PDFs</h3>
                  <p>When you need to <strong>split PDF pages</strong> from multiple documents:</p>
                  <ul>
                    <li><strong>Identify patterns:</strong> Look for common page structures across documents</li>
                    <li><strong>Use consistent naming:</strong> Apply logical file naming conventions</li>
                    <li><strong>Process similar documents together:</strong> Group by type or structure</li>
                    <li><strong>Verify results:</strong> Check each split document for completeness</li>
                  </ul>

                  <h3>Quality Preservation Tips</h3>
                  <p>Ensure your <strong>PDF page splitter</strong> maintains document integrity:</p>
                  <ul>
                    <li><strong>Preserve formatting:</strong> Choose tools that maintain original layout</li>
                    <li><strong>Check fonts and images:</strong> Verify visual elements remain intact</li>
                    <li><strong>Test hyperlinks:</strong> Ensure internal links still function</li>
                    <li><strong>Maintain bookmarks:</strong> Keep navigation elements when relevant</li>
                  </ul>

                  <h2 id="best-practices">Best Practices for PDF Splitting</h2>
                  
                  <h3>Planning Your Splits</h3>
                  <p>Before you <strong>divide PDF by pages</strong>:</p>
                  <ul>
                    <li><strong>Review the entire document:</strong> Understand content structure and flow</li>
                    <li><strong>Identify logical break points:</strong> Find natural section divisions</li>
                    <li><strong>Consider page dependencies:</strong> Ensure split documents make sense independently</li>
                    <li><strong>Plan file naming:</strong> Use descriptive, consistent names for organization</li>
                  </ul>

                  <h3>Maintaining Document Integrity</h3>
                  <p>When you <strong>save selected pages as PDF</strong>:</p>
                  <ul>
                    <li><strong>Include context pages:</strong> Add relevant introductory or summary pages</li>
                    <li><strong>Preserve page numbering:</strong> Consider how splits affect navigation</li>
                    <li><strong>Maintain visual consistency:</strong> Ensure split documents look professional</li>
                    <li><strong>Test readability:</strong> Verify split documents are self-contained</li>
                  </ul>

                  <h2 id="troubleshooting">Troubleshooting Common Issues</h2>
                  
                  <h3>Invalid Page Range Errors</h3>
                  <p>If your <strong>PDF page splitter</strong> shows errors:</p>
                  <ul>
                    <li><strong>Check page numbers exist:</strong> Count total pages in your document</li>
                    <li><strong>Verify format syntax:</strong> Use hyphens for ranges (1-5), commas for lists (1,3,5)</li>
                    <li><strong>Avoid overlapping ranges:</strong> Don't duplicate pages in selections</li>
                    <li><strong>Consider page numbering:</strong> Some PDFs have different numbering systems</li>
                  </ul>

                  <h3>Large File Processing</h3>
                  <p>When you <strong>split large PDF</strong> files:</p>
                  <ul>
                    <li><strong>Check file size limits:</strong> Most tools handle up to 100MB</li>
                    <li><strong>Split in chunks first:</strong> Break very large files into sections</li>
                    <li><strong>Allow processing time:</strong> Large files take longer to process</li>
                    <li><strong>Ensure stable connection:</strong> Avoid interruptions during processing</li>
                  </ul>

                  <h2 id="faq">Frequently Asked Questions</h2>
                  <div className="faq-section" data-testid="faq">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <h3 className="faq-question">
                          {faq.question}
                        </h3>
                        <p className="faq-answer">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    <strong>Splitting PDF pages</strong> is an essential skill for efficient document management. Whether you need to 
                    <strong>extract pages from PDF</strong> files for specific purposes, <strong>split large PDF</strong> documents 
                    into manageable sections, or <strong>save selected pages as PDF</strong> files for sharing, the right 
                    <strong>PDF page splitter</strong> makes the process simple and secure.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution that works directly in your browser, ensuring your documents 
                    remain private while delivering professional results. With support for complex page ranges, batch processing, 
                    and mobile devices, it's the perfect tool for all your PDF splitting needs.
                  </p>

                  {/* Final CTA */}
                  <ToolCTA toolSlug="pdf-split" variant="featured" className="mt-6 lg:mt-8" />
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
                    currentSlug="split-pdf-pages" 
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
                  currentSlug="split-pdf-pages" 
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
