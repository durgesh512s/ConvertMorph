import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Hash, Clock } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Add Page Numbers to PDF Online - Free PDF Page Numbering Tool',
  excerpt: 'Learn how to add page numbers to PDF documents online for free. Customize page numbering styles and positions using ConvertMorph\'s easy-to-use PDF tool.',
  slug: 'add-page-numbers-to-pdf',
  focusKeyword: 'add page numbers to PDF',
  secondaryKeywords: [
    'PDF page numbering',
    'number PDF pages',
    'PDF page numbers online',
    'add page numbers free',
    'PDF pagination tool',
    'insert page numbers PDF'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2024-01-17T10:00:00.000Z',
  dateModified: '2024-01-17T10:00:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'what-is-pdf-page-numbering', text: 'What is PDF Page Numbering?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'numbering-styles', text: 'Page Numbering Styles and Formats', level: 2 },
  { id: 'positioning-options', text: 'Page Number Positioning Options', level: 2 },
  { id: 'common-use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Page Numbering Best Practices', level: 2 },
  { id: 'troubleshooting', text: 'Troubleshooting Common Issues', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'Can I start page numbering from a specific number?',
    answer: 'Yes, ConvertMorph allows you to set a custom starting number for your page numbering. This is useful when adding numbers to document sections or continuing from previous documents.'
  },
  {
    question: 'Can I exclude certain pages from numbering?',
    answer: 'While ConvertMorph adds numbers to all pages by default, you can specify page ranges to number only specific sections of your document, effectively excluding unwanted pages.'
  },
  {
    question: 'What numbering formats are supported?',
    answer: 'ConvertMorph supports various formats including Arabic numerals (1, 2, 3), Roman numerals (i, ii, iii or I, II, III), and alphabetical sequences (a, b, c or A, B, C).'
  },
  {
    question: 'Will page numbers affect the original document content?',
    answer: 'Page numbers are added as overlay elements and don\'t modify the original document content. They appear on top of existing content in the margins or designated areas.'
  },
  {
    question: 'Can I customize the appearance of page numbers?',
    answer: 'Yes, you can customize font size, color, style, and positioning of page numbers to match your document\'s design and professional requirements.'
  },
  {
    question: 'Is there a limit to the number of pages I can number?',
    answer: 'ConvertMorph can handle documents with hundreds of pages. The processing time may vary based on document size, but there\'s no strict page limit for numbering.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Add Page Numbers to PDF', url: '/blog/add-page-numbers-to-pdf' }
];

export default function AddPageNumbersToPDFGuide() {
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
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.url} className="flex items-center">
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
                    Add Page Numbers to PDF: Complete Guide to PDF Pagination
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>January 17, 2024</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Learn how to <strong>add page numbers to PDF</strong> documents online for free. Customize 
                    <strong> PDF page numbering</strong> styles and positions using our professional 
                    <strong> PDF pagination tool</strong> that works directly in your browser.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Hash className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          PDF Page Numbers
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Add professional page numbers to your PDF documents with customizable styles.
                        </p>
                        <Link
                          href="/tools/pdf-pagenum"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="what-is-pdf-page-numbering">What is PDF Page Numbering?</h2>
                  <p>
                    PDF page numbering is the process of adding sequential numbers to the pages of a PDF document to help 
                    readers navigate and reference specific content. When you <strong>add page numbers to PDF</strong> files, 
                    you create essential navigation aids that are crucial for professional documents, academic papers, reports, 
                    and any multi-page document requiring easy reference.
                  </p>
                  <p>
                    Page numbers can be displayed in various formats and positions, from simple numeric sequences to complex 
                    numbering schemes that include prefixes, suffixes, or different numbering styles for different document 
                    sections. They serve as visual anchors that help readers track their progress and quickly locate specific information.
                  </p>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>PDF pagination tool</strong> makes it simple to <strong>add page numbers to PDF</strong> 
                    documents with professional results and complete customization. Here's the straightforward process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your PDF</h4>
                        <p>Drag and drop your PDF file or click to browse. Your document is processed securely in your browser.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Choose Position</h4>
                        <p>Select where you want the page numbers to appear: top, bottom, left, right, or center of each page.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Select Format</h4>
                        <p>Choose your preferred numbering format: Arabic numerals, Roman numerals, or alphabetical sequences.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Customize Style</h4>
                        <p>Set starting number, adjust font size, color, and style to match your document's design.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>Apply and Download</h4>
                        <p>Preview the results, apply the page numbers, and download your professionally numbered PDF.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Page Numbers Tool</h4>
                    <p>
                      Number your PDF pages now with our free online tool. Professional formatting with customizable 
                      styles and instant preview for perfect results.
                    </p>
                    <Link 
                      href="/tools/pdf-pagenum" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      Add Page Numbers Now
                    </Link>
                  </div>

                  <h2 id="numbering-styles">Page Numbering Styles and Formats</h2>
                  <p>
                    ConvertMorph supports various <strong>PDF page numbering</strong> styles to meet different document 
                    requirements and professional standards:
                  </p>
                  
                  <h3>Numeric Formats</h3>
                  <p>Standard numbering options for most documents:</p>
                  <ul>
                    <li><strong>Arabic numerals:</strong> Standard 1, 2, 3, 4, 5... format for most professional documents</li>
                    <li><strong>Zero-padded:</strong> 01, 02, 03, 04, 05... for consistent alignment and sorting</li>
                    <li><strong>With prefixes:</strong> Page 1, Page 2, Page 3... for enhanced clarity and identification</li>
                    <li><strong>With separators:</strong> 1-1, 1-2, 1-3... for chapter-based or section-based numbering</li>
                    <li><strong>Custom formats:</strong> P.1, Pg 1, [1]... for specific style requirements</li>
                  </ul>

                  <h3>Roman Numerals</h3>
                  <p>Classical numbering for formal documents:</p>
                  <ul>
                    <li><strong>Lowercase:</strong> i, ii, iii, iv, v... commonly used for prefaces, introductions, and front matter</li>
                    <li><strong>Uppercase:</strong> I, II, III, IV, V... for formal chapters, appendices, and main sections</li>
                    <li><strong>Mixed usage:</strong> Combine with Arabic numerals for complex document structures</li>
                  </ul>

                  <h3>Alphabetical Sequences</h3>
                  <p>Letter-based numbering for specialized documents:</p>
                  <ul>
                    <li><strong>Lowercase letters:</strong> a, b, c, d, e... for subsections and appendices</li>
                    <li><strong>Uppercase letters:</strong> A, B, C, D, E... for major sections and divisions</li>
                    <li><strong>Double letters:</strong> aa, bb, cc... for extended sequences beyond 26 items</li>
                  </ul>

                  <h2 id="positioning-options">Page Number Positioning Options</h2>
                  <p>
                    Strategic placement of page numbers affects both functionality and document aesthetics. 
                    ConvertMorph offers flexible positioning options:
                  </p>

                  <div className="comparison-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Best For</th>
                          <th>Professional Use</th>
                          <th>Readability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Bottom Center</strong></td>
                          <td>Books, reports, academic papers</td>
                          <td>High</td>
                          <td>Excellent</td>
                        </tr>
                        <tr>
                          <td><strong>Top Right</strong></td>
                          <td>Business documents, manuals</td>
                          <td>High</td>
                          <td>Very Good</td>
                        </tr>
                        <tr>
                          <td><strong>Bottom Right</strong></td>
                          <td>Technical documents, guides</td>
                          <td>Medium-High</td>
                          <td>Good</td>
                        </tr>
                        <tr>
                          <td><strong>Top Center</strong></td>
                          <td>Headers, formal documents</td>
                          <td>Medium</td>
                          <td>Good</td>
                        </tr>
                        <tr>
                          <td><strong>Side Margins</strong></td>
                          <td>Bound documents, booklets</td>
                          <td>Medium</td>
                          <td>Fair</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 id="common-use-cases">Common Use Cases</h2>
                  <p>
                    Understanding when and how to <strong>add page numbers to PDF</strong> documents helps ensure 
                    professional presentation and improved usability:
                  </p>

                  <h3>Academic and Research Documents</h3>
                  <ul>
                    <li><strong>Thesis and dissertations:</strong> Roman numerals for front matter, Arabic for main content</li>
                    <li><strong>Research papers:</strong> Continuous numbering for easy citation and reference</li>
                    <li><strong>Conference proceedings:</strong> Sequential numbering across multiple papers</li>
                    <li><strong>Course materials:</strong> Chapter-based numbering for organized learning</li>
                  </ul>

                  <h3>Business and Professional Documents</h3>
                  <ul>
                    <li><strong>Annual reports:</strong> Section-based numbering with prefixes for different chapters</li>
                    <li><strong>Proposals and contracts:</strong> Legal-style numbering for precise referencing</li>
                    <li><strong>Training manuals:</strong> Module-based numbering for structured learning paths</li>
                    <li><strong>Policy documents:</strong> Hierarchical numbering for complex organizational structures</li>
                  </ul>

                  <h3>Publishing and Editorial</h3>
                  <ul>
                    <li><strong>Books and manuscripts:</strong> Traditional book numbering with front matter considerations</li>
                    <li><strong>Magazines and journals:</strong> Issue-based numbering for publication tracking</li>
                    <li><strong>Catalogs and brochures:</strong> Product-focused numbering for easy navigation</li>
                    <li><strong>Technical documentation:</strong> Version-controlled numbering for update tracking</li>
                  </ul>

                  <h2 id="best-practices">Page Numbering Best Practices</h2>
                  <p>
                    Follow these professional guidelines to ensure your <strong>PDF page numbering</strong> enhances 
                    document usability and maintains professional standards:
                  </p>

                  <div className="callout callout-info">
                    <h4>Professional Numbering Guidelines</h4>
                    <ul>
                      <li><strong>Consistency:</strong> Use the same format throughout similar document sections</li>
                      <li><strong>Visibility:</strong> Ensure numbers are clearly readable without overwhelming content</li>
                      <li><strong>Positioning:</strong> Place numbers where they won't interfere with binding or content</li>
                      <li><strong>Starting points:</strong> Consider whether to start from page 1 or account for cover pages</li>
                    </ul>
                  </div>

                  <h3>Font and Style Considerations</h3>
                  <ul>
                    <li><strong>Font size:</strong> 10-12pt for optimal readability without distraction</li>
                    <li><strong>Font family:</strong> Match document font or use clean, professional typefaces</li>
                    <li><strong>Color:</strong> Use dark colors for print, consider contrast for digital viewing</li>
                    <li><strong>Weight:</strong> Regular or medium weight for balance between visibility and subtlety</li>
                  </ul>

                  <h3>Document Structure Planning</h3>
                  <ul>
                    <li><strong>Front matter:</strong> Use Roman numerals for title pages, table of contents, prefaces</li>
                    <li><strong>Main content:</strong> Switch to Arabic numerals for body text and primary content</li>
                    <li><strong>Appendices:</strong> Consider separate numbering or continuation of main sequence</li>
                    <li><strong>Multi-volume works:</strong> Plan numbering schemes that work across volumes</li>
                  </ul>

                  <h2 id="troubleshooting">Troubleshooting Common Issues</h2>
                  <p>
                    Resolve typical challenges when adding page numbers to ensure professional results:
                  </p>

                  <h3>Alignment and Positioning Problems</h3>
                  <div className="callout callout-warning">
                    <h4>Common Issue: Numbers appear cut off or misaligned</h4>
                    <p><strong>Solution:</strong> Adjust margin settings and ensure adequate space around page numbers. 
                    Test with different page sizes and orientations to verify consistent placement.</p>
                  </div>

                  <h3>Formatting Inconsistencies</h3>
                  <ul>
                    <li><strong>Mixed formats:</strong> Establish clear numbering rules before starting</li>
                    <li><strong>Font variations:</strong> Use consistent typography throughout the document</li>
                    <li><strong>Size discrepancies:</strong> Maintain uniform sizing across all pages</li>
                    <li><strong>Color variations:</strong> Ensure consistent color scheme for professional appearance</li>
                  </ul>

                  <h3>Technical Challenges</h3>
                  <ul>
                    <li><strong>Large file processing:</strong> Break large documents into sections if needed</li>
                    <li><strong>Complex layouts:</strong> Test numbering with various page orientations and sizes</li>
                    <li><strong>Existing content conflicts:</strong> Adjust positioning to avoid overlapping with text or images</li>
                    <li><strong>Print compatibility:</strong> Verify numbers appear correctly in both digital and print formats</li>
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
                    Adding page numbers to PDF documents is essential for creating professional, navigable documents 
                    that meet academic, business, and publishing standards. ConvertMorph's <strong>PDF pagination tool</strong> 
                    provides the flexibility and customization options needed to <strong>add page numbers to PDF</strong> 
                    files with professional results.
                  </p>
                  <p>
                    Whether you need simple sequential numbering or complex multi-format schemes, our tool handles 
                    all requirements while maintaining document quality and ensuring compatibility across devices and platforms.
                  </p>

                  <div className="callout callout-success">
                    <h4>Ready to Number Your PDF Pages?</h4>
                    <p>
                      Start adding professional page numbers to your PDF documents now. Free, fast, and secure 
                      processing with instant results.
                    </p>
                    <Link 
                      href="/tools/pdf-pagenum" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-3 font-medium"
                    >
                      <Hash className="w-5 h-5 mr-2" />
                      Add Page Numbers Now
                    </Link>
                  </div>
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
                    currentSlug="add-page-numbers-to-pdf" 
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
                  currentSlug="add-page-numbers-to-pdf" 
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
