import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Move } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Organize PDF Pages: Reorder, Rearrange & Sort PDF Online',
  excerpt: 'Learn how to organize PDF pages by reordering, rearranging, and sorting pages online. Complete guide with drag-and-drop tools and best practices.',
  slug: 'organize-pdf-pages',
  focusKeyword: 'organize PDF pages',
  secondaryKeywords: [
    'reorder PDF pages',
    'rearrange PDF pages',
    'sort PDF pages',
    'reorganize PDF online',
    'PDF page organizer',
    'move PDF pages'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-02-15T10:00:00.000Z',
  dateModified: '2025-02-15T10:00:00.000Z',
  readingTime: '6 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-organize-pdf-pages', text: 'Why Organize PDF Pages?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'organization-methods', text: 'PDF Organization Methods', level: 2 },
  { id: 'common-use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Organization Best Practices', level: 2 },
  { id: 'troubleshooting', text: 'Troubleshooting Common Issues', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'Can I organize pages in large PDF documents?',
    answer: 'Yes! ConvertMorph can handle PDF documents with hundreds of pages. The drag-and-drop interface makes it easy to reorder even large documents efficiently.'
  },
  {
    question: 'Will organizing pages affect PDF quality?',
    answer: 'No, organizing PDF pages is a lossless operation. The content, images, and text quality remain exactly the same - only the page order changes.'
  },
  {
    question: 'Can I undo changes while organizing pages?',
    answer: 'Yes, you can easily undo changes by dragging pages back to their original positions or refreshing the page to start over with the original document.'
  },
  {
    question: 'Is there a limit on how many pages I can organize?',
    answer: 'ConvertMorph supports PDF files up to 100MB, which typically includes documents with several hundred pages. For larger documents, consider splitting them first.'
  },
  {
    question: 'Can I organize password-protected PDFs?',
    answer: 'You\'ll need to remove the password protection first before organizing pages. Most PDF organizers cannot access encrypted documents for security reasons.'
  },
  {
    question: 'How long does it take to reorganize PDF pages?',
    answer: 'The reorganization process is instant once you\'ve arranged the pages. The actual processing time depends on the document size, typically taking 5-30 seconds.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Organize PDF Pages', url: '/blog/organize-pdf-pages' }
];

export default function OrganizePDFGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD removed - handled by DynamicBreadcrumb component in layout */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumbs removed - now handled by UnifiedBreadcrumb component in layout */}

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
                    Organize PDF Pages: Complete Guide to Reordering & Rearranging
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>February 15, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to <strong>organize PDF pages</strong> in the right order? Whether you want to <strong>reorder PDF pages</strong>, 
                    <strong>rearrange PDF pages</strong>, or <strong>sort PDF pages</strong>, this comprehensive guide shows you how to 
                    <strong> reorganize PDF online</strong> with professional results.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Move className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          PDF Organize
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Reorder and rearrange PDF pages with intuitive drag-and-drop interface.
                        </p>
                        <Link
                          href="/tools/pdf-organize"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-organize-pdf-pages">Why Organize PDF Pages?</h2>
                  <p>
                    A <strong>PDF page organizer</strong> is essential for creating professional, well-structured documents. Here's why you need to <strong>organize PDF pages</strong>:
                  </p>
                  <ul>
                    <li><strong>Logical flow:</strong> Ensure content follows a natural, easy-to-follow sequence</li>
                    <li><strong>Professional presentation:</strong> Create polished documents for business and academic use</li>
                    <li><strong>Improved readability:</strong> Help readers navigate through content more effectively</li>
                    <li><strong>Document correction:</strong> Fix scanning errors or misplaced pages quickly</li>
                    <li><strong>Custom arrangements:</strong> Tailor document structure for specific audiences</li>
                    <li><strong>Compliance requirements:</strong> Meet specific formatting standards for submissions</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>PDF page organizer</strong> makes it simple to <strong>reorder PDF pages</strong> with an intuitive drag-and-drop interface. 
                    Here's the straightforward process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your PDF</h4>
                        <p>Drag and drop your PDF file or click to browse. All pages are displayed as thumbnails for easy visualization.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Drag and Drop to Reorder</h4>
                        <p>Simply drag pages to new positions. Real-time preview shows exactly how your reorganized document will look.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Organized PDF</h4>
                        <p>Get your perfectly organized PDF instantly. All processing happens securely in your browser.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Organizer</h4>
                    <p>
                      Reorganize your PDF pages now with our free online tool. Intuitive drag-and-drop interface 
                      with instant preview and secure processing.
                    </p>
                    <Link 
                      href="/tools/pdf-organize" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Move className="w-4 h-4 mr-2" />
                      Organize PDF Pages Now
                    </Link>
                  </div>

                  <h2 id="organization-methods">PDF Organization Methods</h2>
                  
                  <h3>Drag-and-Drop Reordering</h3>
                  <p>The most intuitive method to <strong>rearrange PDF pages</strong>:</p>
                  <ul>
                    <li><strong>Visual interface:</strong> See thumbnail previews of all pages</li>
                    <li><strong>Real-time feedback:</strong> Instant preview of changes as you drag</li>
                    <li><strong>Precise positioning:</strong> Drop pages exactly where you want them</li>
                    <li><strong>Undo capability:</strong> Easily reverse changes if needed</li>
                  </ul>

                  <h3>Bulk Page Operations</h3>
                  <p>Efficient methods for organizing large documents:</p>
                  <ul>
                    <li><strong>Multi-select:</strong> Select multiple pages and move them together</li>
                    <li><strong>Range selection:</strong> Choose page ranges for batch operations</li>
                    <li><strong>Reverse order:</strong> Quickly flip entire document order</li>
                    <li><strong>Custom sorting:</strong> Apply specific ordering rules</li>
                  </ul>

                  <h2 id="common-use-cases">Common Use Cases</h2>
                  
                  <h3>Business Documents</h3>
                  <p>Professional applications for <strong>PDF page organizer</strong> tools:</p>
                  <ul>
                    <li><strong>Report compilation:</strong> <strong>Organize PDF pages</strong> from multiple sources into cohesive reports</li>
                    <li><strong>Proposal preparation:</strong> Arrange sections in logical order for maximum impact</li>
                    <li><strong>Contract assembly:</strong> Combine and order legal documents properly</li>
                    <li><strong>Presentation materials:</strong> Sequence slides for optimal flow and engagement</li>
                    <li><strong>Training manuals:</strong> Structure content from basic to advanced topics</li>
                  </ul>

                  <h3>Academic & Research</h3>
                  <p>Educational uses for <strong>reorder PDF pages</strong> functionality:</p>
                  <ul>
                    <li><strong>Thesis organization:</strong> Arrange chapters, appendices, and references correctly</li>
                    <li><strong>Research compilation:</strong> Order findings and supporting materials logically</li>
                    <li><strong>Course materials:</strong> Sequence lessons and assignments appropriately</li>
                    <li><strong>Literature reviews:</strong> Organize sources chronologically or thematically</li>
                  </ul>

                  <h2 id="best-practices">Organization Best Practices</h2>
                  <p>
                    Get the best results when you <strong>organize PDF pages</strong> with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Plan before organizing:</strong> Outline the desired structure before moving pages</li>
                    <li><strong>Use descriptive naming:</strong> Keep track of page purposes during organization</li>
                    <li><strong>Test readability:</strong> Review the flow after reorganization</li>
                    <li><strong>Save incremental versions:</strong> Keep backups during major reorganizations</li>
                    <li><strong>Consider your audience:</strong> Structure content for your intended readers</li>
                    <li><strong>Maintain consistency:</strong> Use similar organization patterns across related documents</li>
                  </ul>

                  <h2 id="troubleshooting">Troubleshooting Common Issues</h2>
                  
                  <h3>Large Document Performance</h3>
                  <p>If you experience slow performance with large PDFs:</p>
                  <ul>
                    <li><strong>Split large documents:</strong> Organize sections separately, then merge</li>
                    <li><strong>Use batch operations:</strong> Move multiple pages at once instead of individually</li>
                    <li><strong>Close other browser tabs:</strong> Free up memory for better performance</li>
                    <li><strong>Try smaller chunks:</strong> Organize documents in smaller sections</li>
                  </ul>

                  <h3>Page Display Issues</h3>
                  <p>If pages don't display correctly:</p>
                  <ul>
                    <li><strong>Refresh the page:</strong> Reload to reset the interface</li>
                    <li><strong>Check PDF integrity:</strong> Ensure the source PDF isn't corrupted</li>
                    <li><strong>Try different browser:</strong> Some browsers handle PDFs better than others</li>
                    <li><strong>Clear browser cache:</strong> Remove cached files that might cause conflicts</li>
                  </ul>

                  <h2 id="faq">Frequently Asked Questions</h2>
                  <div className="faq-section">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <h3 className="faq-question">{faq.question}</h3>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2>Conclusion</h2>
                  <p>
                    Learning how to <strong>organize PDF pages</strong> is essential for creating professional, well-structured documents. 
                    Whether you need to <strong>reorder PDF pages</strong>, <strong>rearrange PDF pages</strong>, or completely 
                    <strong>reorganize PDF online</strong>, the right <strong>PDF page organizer</strong> makes the process simple and efficient.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution with an intuitive drag-and-drop interface that works directly 
                    in your browser. With real-time preview and secure processing, it's the perfect tool to <strong>sort PDF pages</strong> 
                    and create perfectly organized documents for any purpose.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Ready to Organize Your PDF?</h4>
                    <p>
                      Transform your disorganized PDF into a perfectly structured document with ConvertMorph's free online organizer. 
                      Drag-and-drop interface with instant preview and secure processing.
                    </p>
                    <Link 
                      href="/tools/pdf-organize" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
                    >
                      <Move className="w-5 h-5 mr-2" />
                      Start Organizing Now
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2 w-full">
              <div className="space-y-4 lg:space-y-8">
                {/* Table of Contents - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <BlogTOC headings={headings} className="sticky top-24" />
                </div>
                
                {/* Related Posts - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <RelatedPosts 
                    currentSlug="organize-pdf-pages" 
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
                  currentSlug="organize-pdf-pages" 
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
