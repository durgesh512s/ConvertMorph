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
  title: 'How to Merge PDF Files Online: Complete Guide 2025',
  excerpt: 'Learn how to merge multiple PDF files into one document online. Free, secure, and easy-to-use PDF merger tool with step-by-step guide and best practices.',
  slug: 'merge-pdf-files-online',
  focusKeyword: 'merge PDF files',
  secondaryKeywords: [
    'combine PDFs online',
    'join PDF documents',
    'merge multiple PDFs',
    'merge PDFs free',
    'merge PDF pages order',
    'PDF file merger'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-01-20T10:00:00.000Z',
  dateModified: '2025-01-25T14:30:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-merge-pdf-files', text: 'Why Merge PDF Files?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'merge-methods', text: 'PDF Merging Methods', level: 2 },
  { id: 'online-pdf-mergers', text: 'Online PDF Mergers', level: 3 },
  { id: 'desktop-software', text: 'Desktop Software', level: 3 },
  { id: 'merge-strategies', text: 'Merging Strategies', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How many PDF files can I merge at once?',
    answer: 'ConvertMorph supports merging up to 20 PDF files in a single operation. For larger batches, consider merging in groups and then combining the results.'
  },
  {
    question: 'Does merging PDFs affect file quality?',
    answer: 'No, merging PDFs preserves the original quality of all documents. Text, images, and formatting remain unchanged in the merged file.'
  },
  {
    question: 'Can I change the order of pages after merging?',
    answer: 'You should arrange files in the correct order before merging. After merging, you&apos;d need to use a PDF editor to rearrange pages or merge again with the correct order.'
  },
  {
    question: 'Is it safe to merge confidential PDFs online?',
    answer: 'Yes, when using ConvertMorph. All processing happens locally in your browser - files are never uploaded to external servers, ensuring complete privacy.'
  },
  {
    question: 'What&apos;s the maximum file size for merging?',
    answer: 'Each individual PDF can be up to 100MB. The total merged file size depends on your browser&apos;s memory capacity, typically supporting several hundred MB.'
  },
  {
    question: 'Can I merge password-protected PDFs?',
    answer: 'Most online tools cannot merge password-protected PDFs. You&apos;ll need to remove passwords first or use desktop software that supports encrypted files.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'How to Merge PDF Files', url: '/blog/merge-pdf-files-online' }
];

export default function MergePDFGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbsJsonLd(breadcrumbs)} />

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
                    Merge PDF Files Online: Complete Guide 2025
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>January 20, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to combine multiple PDF files into one document? Learn how to merge PDFs online 
                    quickly and securely without installing any software using our comprehensive guide.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <ToolCTA toolSlug="pdf-merge" variant="compact" className="mb-6 lg:mb-8" />

                <div className="blog-prose">
                  <h2 id="why-merge-pdf-files">Why Merge PDF Files?</h2>
                  <p>
                    Merging PDF files streamlines document management and improves workflow efficiency across various scenarios:
                  </p>
                  <ul>
                    <li><strong>Document organization:</strong> Combine related files into comprehensive packages</li>
                    <li><strong>Report compilation:</strong> Merge chapters, appendices, and supporting materials</li>
                    <li><strong>Email efficiency:</strong> Send one attachment instead of multiple files</li>
                    <li><strong>Archive creation:</strong> Consolidate documents for long-term storage and retrieval</li>
                    <li><strong>Presentation preparation:</strong> Combine slides and handouts from different sources</li>
                    <li><strong>Legal documentation:</strong> Merge contracts, exhibits, and supporting evidence</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our online PDF merger combines multiple documents while preserving formatting, bookmarks, and metadata. 
                    Here&apos;s the streamlined process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Multiple PDFs</h4>
                        <p>Select up to 20 PDF files using drag-and-drop or the file browser. Files are processed locally for security.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Arrange File Order</h4>
                        <p>Drag files to reorder them as needed. The final merged PDF will follow this exact sequence.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Merge and Download</h4>
                        <p>Click &quot;Merge PDFs&quot; to combine files instantly. Download your merged document immediately.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Merger</h4>
                    <p>
                      Merge your PDFs now with our free online tool. No registration required, 
                      and your files are processed securely in your browser.
                    </p>
                    <Link 
                      href="/tools/pdf-merge" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Merge PDFs Now
                    </Link>
                  </div>

                  <h2 id="merge-methods">PDF Merging Methods</h2>
                  
                  <h3 id="online-pdf-mergers">Online PDF Mergers</h3>
                  <p>
                    Web-based tools offer convenience and accessibility for most merging needs. 
                    ConvertMorph provides professional-grade merging with these advantages:
                  </p>
                  <ul>
                    <li>No software installation required</li>
                    <li>Cross-platform compatibility (Windows, Mac, Linux, mobile)</li>
                    <li>Local processing ensures document privacy</li>
                    <li>Drag-and-drop interface for easy file management</li>
                    <li>Preserves original document quality and formatting</li>
                    <li>Supports large files up to 100MB each</li>
                  </ul>

                  <h3 id="desktop-software">Desktop Software</h3>
                  <p>
                    Professional applications like Adobe Acrobat Pro offer advanced features for complex merging tasks:
                  </p>
                  <ul>
                    <li>Bookmark and outline preservation</li>
                    <li>Custom page range selection</li>
                    <li>Batch processing for multiple merge operations</li>
                    <li>Advanced security and encryption options</li>
                    <li>Form field management across merged documents</li>
                  </ul>

                  <h2 id="merge-strategies">Merging Strategies</h2>
                  <p>
                    Choose the right approach based on your document types and requirements:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Document Type</th>
                        <th>Best Strategy</th>
                        <th>Key Considerations</th>
                        <th>Recommended Tool</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Business Reports</td>
                        <td>Sequential merge</td>
                        <td>Maintain page numbering</td>
                        <td>Online merger</td>
                      </tr>
                      <tr>
                        <td>Legal Documents</td>
                        <td>Preserve bookmarks</td>
                        <td>Security and authenticity</td>
                        <td>Desktop software</td>
                      </tr>
                      <tr>
                        <td>Academic Papers</td>
                        <td>Chapter-based merge</td>
                        <td>Citation integrity</td>
                        <td>Online merger</td>
                      </tr>
                      <tr>
                        <td>Presentations</td>
                        <td>Slide deck combination</td>
                        <td>Visual consistency</td>
                        <td>Online merger</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize merging efficiency and maintain document quality with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Plan the structure:</strong> Organize files logically before merging to avoid confusion</li>
                    <li><strong>Check file integrity:</strong> Ensure all PDFs open correctly before combining</li>
                    <li><strong>Consider file sizes:</strong> Large merged files may be slow to load or difficult to share</li>
                    <li><strong>Maintain naming conventions:</strong> Use descriptive filenames for merged documents</li>
                    <li><strong>Test the result:</strong> Review the merged PDF thoroughly before distribution</li>
                    <li><strong>Backup originals:</strong> Keep copies of individual files for future reference</li>
                    <li><strong>Optimize for purpose:</strong> Consider your audience and distribution method</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Document Organization</h4>
                    <p>
                      For complex documents, create a table of contents or index page before merging. 
                      This helps readers navigate the combined document more effectively.
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
                    Merging PDF files online has never been easier with modern web-based tools. 
                    ConvertMorph&apos;s free PDF merger provides a secure, efficient solution that processes 
                    files locally in your browser, ensuring your documents remain private while delivering professional results.
                  </p>

                  {/* Final CTA */}
                  <ToolCTA toolSlug="pdf-merge" variant="featured" className="mt-6 lg:mt-8" />
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
                    currentSlug="merge-pdf-files-online" 
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
                  currentSlug="merge-pdf-files-online" 
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
