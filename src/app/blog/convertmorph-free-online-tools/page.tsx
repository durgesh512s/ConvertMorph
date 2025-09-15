import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Zap, Clock, Calendar, Shield, Star, Users, ArrowRight, Calculator, FileText, Image, Archive } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'ConvertMorph - Free Online Tools for PDF, Image, Text & Finance',
  excerpt: 'Discover ConvertMorph\'s comprehensive suite of free online tools. Process PDFs, edit images, analyze text, and calculate finances securely with our browser-based tools.',
  slug: 'convertmorph-free-online-tools',
  focusKeyword: 'ConvertMorph free online tools',
  secondaryKeywords: [
    'free PDF tools online',
    'image editing tools',
    'text analysis tools',
    'finance calculators',
    'online document tools',
    'browser-based tools',
    'secure file processing'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-08-01T10:00:00.000Z',
  dateModified: '2025-09-01T10:00:00.000Z',
  readingTime: '12 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'what-is-convertmorph', text: 'What is ConvertMorph?', level: 2 },
  { id: 'pdf-tools', text: 'PDF Processing Tools', level: 2 },
  { id: 'image-tools', text: 'Image Editing Tools', level: 2 },
  { id: 'text-tools', text: 'Text Analysis Tools', level: 2 },
  { id: 'finance-tools', text: 'Finance Calculators', level: 2 },
  { id: 'security-privacy', text: 'Security and Privacy', level: 2 },
  { id: 'how-it-works', text: 'How ConvertMorph Works', level: 2 },
  { id: 'why-choose-convertmorph', text: 'Why Choose ConvertMorph?', level: 2 },
  { id: 'getting-started', text: 'Getting Started Guide', level: 2 },
  { id: 'technical-features', text: 'Technical Features', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'Is ConvertMorph really free to use?',
    answer: 'Yes, ConvertMorph is completely free to use. All our tools including PDF processing, image editing, text analysis, and finance calculators are available without any cost, registration, or hidden fees.'
  },
  {
    question: 'Do I need to create an account to use ConvertMorph?',
    answer: 'No account creation is required. You can use all ConvertMorph tools immediately without signing up, providing email addresses, or any registration process.'
  },
  {
    question: 'How secure is my data on ConvertMorph?',
    answer: 'Your data is completely secure. All processing happens locally in your browser using client-side technology. Your files never leave your device and are not uploaded to our servers.'
  },
  {
    question: 'What types of tools does ConvertMorph offer?',
    answer: 'ConvertMorph offers four main categories: PDF tools (compress, merge, split, convert), Image tools (resize, compress, convert, crop), Text tools (word counter, comparison), and Finance tools (EMI, SIP, tax, loan calculators).'
  },
  {
    question: 'Can I use ConvertMorph on mobile devices?',
    answer: 'Yes, ConvertMorph is fully responsive and works on smartphones, tablets, and desktop computers. The interface adapts to your screen size for optimal usability across all tools.'
  },
  {
    question: 'Does ConvertMorph work offline?',
    answer: 'ConvertMorph requires an internet connection to load the application, but once loaded, most processing happens locally in your browser. Some features may work offline after initial loading.'
  }
];


export default function ConvertMorphToolsPage() {  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://convertmorph.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "Free Online Tools for PDF, Image, Text & Finance", "item": "https://convertmorph.com/blog/convertmorph-free-online-tools" }
    ]
  };


  return (
    <>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
{/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD added directly to this page */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumbs handled by individual page breadcrumb JSON-LD */}

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
                  <h1 id="main-title" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight break-words hyphens-auto">
                    ConvertMorph: Free Online Tools for PDF, Image, Text & Finance
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 text-sm mb-4 lg:mb-6 gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished} className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                      August 1, 2025
                    </time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium self-start">
                      Platform Overview
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words hyphens-auto">
                    Discover <strong>ConvertMorph's comprehensive suite of free online tools</strong> for PDF processing, image editing, 
                    text analysis, and financial calculations. Process your files <strong>securely in your browser</strong> with 
                    professional-grade tools that prioritize privacy and deliver exceptional results.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Explore All ConvertMorph Tools
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Access our complete suite of free tools for PDF, image, text, and finance tasks.
                        </p>
                        <Link
                          href="/tools"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          View All Tools
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="what-is-convertmorph">What is ConvertMorph?</h2>
                  <p>
                    <strong>ConvertMorph</strong> is a comprehensive online platform that provides <strong>free professional-grade tools</strong> 
                    across four essential categories: PDF processing, image editing, text analysis, and financial calculations. Our mission 
                    is to make powerful digital tools accessible, secure, and efficient without requiring expensive software installations 
                    or subscriptions.
                  </p>
                  <p>
                    Built with modern web technologies, ConvertMorph operates entirely in your browser using client-side processing. 
                    This means your documents, images, and data remain private and secure while you enjoy fast, reliable tools that 
                    work on any device with a web browser.
                  </p>

                  <div className="callout callout-info">
                    <h4>Why ConvertMorph Stands Out</h4>
                    <ul>
                      <li><strong>100% Free:</strong> No hidden costs, premium tiers, or subscription fees</li>
                      <li><strong>Complete Privacy:</strong> All processing happens locally in your browser</li>
                      <li><strong>No Registration:</strong> Start using tools immediately without signing up</li>
                      <li><strong>Professional Quality:</strong> Enterprise-grade results for all users</li>
                      <li><strong>Multi-Category:</strong> PDF, image, text, and finance tools in one platform</li>
                    </ul>
                  </div>

                  <h2 id="pdf-tools">PDF Processing Tools</h2>
                  <p>
                    ConvertMorph offers a complete suite of <strong>PDF tools</strong> to handle all your document processing needs:
                  </p>
                  
                  <h3>File Conversion & Management</h3>
                  <div className="comparison-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Tool</th>
                          <th>Function</th>
                          <th>Best For</th>
                          <th>Key Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>PDF Compress</strong></td>
                          <td>Reduce file size</td>
                          <td>Email sharing, storage</td>
                          <td>Multiple compression levels</td>
                        </tr>
                        <tr>
                          <td><strong>PDF Merge</strong></td>
                          <td>Combine multiple PDFs</td>
                          <td>Document consolidation</td>
                          <td>Custom page ordering</td>
                        </tr>
                        <tr>
                          <td><strong>PDF Split</strong></td>
                          <td>Extract specific pages</td>
                          <td>Document organization</td>
                          <td>Page range selection</td>
                        </tr>
                        <tr>
                          <td><strong>Images to PDF</strong></td>
                          <td>Convert JPG, PNG to PDF</td>
                          <td>Photo albums, presentations</td>
                          <td>Multiple formats, layouts</td>
                        </tr>
                        <tr>
                          <td><strong>PDF to Images</strong></td>
                          <td>Extract pages as images</td>
                          <td>Graphics extraction</td>
                          <td>High resolution output</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3>Document Enhancement Tools</h3>
                  <ul>
                    <li><strong>PDF Organize:</strong> Reorder, rearrange, and organize PDF pages with visual drag-and-drop interface</li>
                    <li><strong>PDF Watermark:</strong> Add text watermarks for branding, copyright protection, and document security</li>
                    <li><strong>PDF Sign:</strong> Add digital signatures to documents securely for legal and business purposes</li>
                    <li><strong>PDF Page Numbers:</strong> Add professional page numbering with customizable styles and positioning</li>
                  </ul>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF Tools</h4>
                    <p>
                      Experience professional PDF processing with our secure, browser-based tools. No uploads required.
                    </p>
                    <Link 
                      href="/tools/pdf-compress" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Start with PDF Compress
                    </Link>
                  </div>

                  <h2 id="image-tools">Image Editing Tools</h2>
                  <p>
                    ConvertMorph provides powerful <strong>image editing tools</strong> for professional image processing and optimization:
                  </p>
                  
                  <h3>Image Processing Tools</h3>
                  <div className="comparison-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Tool</th>
                          <th>Function</th>
                          <th>Best For</th>
                          <th>Key Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Image Compress</strong></td>
                          <td>Reduce file sizes</td>
                          <td>Web optimization, storage</td>
                          <td>Quality control, format support</td>
                        </tr>
                        <tr>
                          <td><strong>Image Resize</strong></td>
                          <td>Change dimensions</td>
                          <td>Social media, web use</td>
                          <td>Aspect ratio control, Canvas API</td>
                        </tr>
                        <tr>
                          <td><strong>Image Convert</strong></td>
                          <td>Format conversion</td>
                          <td>Compatibility, optimization</td>
                          <td>JPEG, PNG, WebP support</td>
                        </tr>
                        <tr>
                          <td><strong>Image Crop</strong></td>
                          <td>Precision cropping</td>
                          <td>Focus areas, composition</td>
                          <td>Multiple aspect ratios</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image Tools</h4>
                    <p>
                      Professional image editing with precision controls and high-quality output.
                    </p>
                    <Link 
                      href="/tools/image-resize" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Start with Image Resize
                    </Link>
                  </div>

                  <h2 id="text-tools">Text Analysis Tools</h2>
                  <p>
                    ConvertMorph offers advanced <strong>text analysis tools</strong> for content creators, writers, and professionals:
                  </p>
                  
                  <h3>Available Text Tools</h3>
                  <ul>
                    <li><strong>Word Counter:</strong> Count words, characters, sentences, and paragraphs with detailed text statistics and readability analysis</li>
                    <li><strong>Text Comparison:</strong> Compare two texts side-by-side with detailed difference analysis and similarity scoring using LCS algorithm</li>
                  </ul>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Text Tools</h4>
                    <p>
                      Analyze your content with professional text processing tools.
                    </p>
                    <Link 
                      href="/tools/word-counter" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Start with Word Counter
                    </Link>
                  </div>

                  <h2 id="finance-tools">Finance Calculators</h2>
                  <p>
                    ConvertMorph provides essential <strong>finance calculators</strong> for personal financial planning and analysis:
                  </p>
                  
                  <h3>Financial Planning Tools</h3>
                  <div className="comparison-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Calculator</th>
                          <th>Purpose</th>
                          <th>Best For</th>
                          <th>Key Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>EMI Calculator</strong></td>
                          <td>Loan EMI calculation</td>
                          <td>Home, car, personal loans</td>
                          <td>Interest rates, tenure options</td>
                        </tr>
                        <tr>
                          <td><strong>SIP Calculator</strong></td>
                          <td>Investment returns</td>
                          <td>Mutual fund planning</td>
                          <td>Systematic investment plans</td>
                        </tr>
                        <tr>
                          <td><strong>Tax Calculator</strong></td>
                          <td>Income tax calculation</td>
                          <td>Tax planning, filing</td>
                          <td>Current tax slabs, deductions</td>
                        </tr>
                        <tr>
                          <td><strong>HRA Calculator</strong></td>
                          <td>House rent allowance</td>
                          <td>Tax exemption planning</td>
                          <td>Salary, rent calculations</td>
                        </tr>
                        <tr>
                          <td><strong>Loan Calculator</strong></td>
                          <td>Comprehensive loan analysis</td>
                          <td>Loan comparison, planning</td>
                          <td>Payment schedules, interest</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Finance Tools</h4>
                    <p>
                      Make informed financial decisions with our comprehensive calculators.
                    </p>
                    <Link 
                      href="/tools/emi-calculator" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Start with EMI Calculator
                    </Link>
                  </div>

                  <h2 id="security-privacy">Security and Privacy</h2>
                  <p>
                    Security and privacy are fundamental principles at ConvertMorph. We've designed our platform to ensure 
                    your documents, images, and data remain completely private and secure throughout the processing workflow.
                  </p>

                  <h3>Client-Side Processing</h3>
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Local Processing</h4>
                        <p>All operations happen in your browser, not on our servers, ensuring complete data privacy.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>No Uploads</h4>
                        <p>Your files never leave your device during processing, maintaining absolute security.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>No Storage</h4>
                        <p>We don't store, cache, or retain any of your documents on our servers.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>No Tracking</h4>
                        <p>We don't track your document content or processing activities for complete privacy.</p>
                      </div>
                    </div>
                  </div>

                  <h3>Data Protection</h3>
                  <ul>
                    <li><strong>HTTPS encryption:</strong> All communications are encrypted in transit for security</li>
                    <li><strong>No registration:</strong> Use all tools without providing personal information</li>
                    <li><strong>No cookies:</strong> We don't use tracking cookies or store personal data</li>
                    <li><strong>GDPR compliant:</strong> Our privacy practices meet international standards</li>
                  </ul>

                  <h2 id="how-it-works">How ConvertMorph Works</h2>
                  <p>
                    ConvertMorph leverages modern web technologies to provide powerful processing capabilities 
                    directly in your browser without requiring server uploads or installations.
                  </p>

                  <h3>Technology Stack</h3>
                  <div className="comparison-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Technology</th>
                          <th>Purpose</th>
                          <th>Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>WebAssembly (WASM)</strong></td>
                          <td>High-performance processing</td>
                          <td>Near-native speed in browser</td>
                        </tr>
                        <tr>
                          <td><strong>PDF.js</strong></td>
                          <td>PDF rendering and manipulation</td>
                          <td>Mozilla's trusted library</td>
                        </tr>
                        <tr>
                          <td><strong>Canvas API</strong></td>
                          <td>Image processing and rendering</td>
                          <td>High-quality visual output</td>
                        </tr>
                        <tr>
                          <td><strong>File API</strong></td>
                          <td>Secure file handling</td>
                          <td>No server uploads needed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 id="why-choose-convertmorph">Why Choose ConvertMorph?</h2>
                  <p>
                    ConvertMorph stands out from other online tools with its unique combination of features and benefits:
                  </p>

                  <h3>Completely Free</h3>
                  <ul>
                    <li><strong>No hidden costs:</strong> All tools are completely free with no premium tiers or subscriptions</li>
                    <li><strong>No registration:</strong> Start using tools immediately without signing up or providing email</li>
                    <li><strong>No watermarks:</strong> Processed files are clean and professional without branding</li>
                    <li><strong>No file limits:</strong> Process as many files as you need without restrictions</li>
                  </ul>

                  <h3>Superior Privacy</h3>
                  <ul>
                    <li><strong>Client-side processing:</strong> Your files never leave your device during processing</li>
                    <li><strong>No server uploads:</strong> Complete privacy and security for sensitive documents</li>
                    <li><strong>No data collection:</strong> We don't track, store, or analyze your information</li>
                    <li><strong>GDPR compliant:</strong> Meets international privacy standards and regulations</li>
                  </ul>

                  <h3>Professional Quality</h3>
                  <ul>
                    <li><strong>High-quality output:</strong> Maintains document integrity, formatting, and visual quality</li>
                    <li><strong>Fast processing:</strong> Optimized algorithms for quick results and efficient performance</li>
                    <li><strong>Reliable performance:</strong> Consistent results across different file types and sizes</li>
                    <li><strong>Cross-platform:</strong> Works on Windows, Mac, Linux, and mobile devices</li>
                  </ul>

                  <h2 id="getting-started">Getting Started Guide</h2>
                  <p>
                    Getting started with ConvertMorph is simple and straightforward. Follow these steps to begin processing 
                    your files with professional results:
                  </p>

                  <div className="callout callout-info">
                    <h4>Quick Start Process</h4>
                    <ol>
                      <li><strong>Choose Your Tool:</strong> Visit ConvertMorph and select the tool you need</li>
                      <li><strong>Upload Files:</strong> Drag and drop or select your files</li>
                      <li><strong>Configure Settings:</strong> Adjust tool-specific options as needed</li>
                      <li><strong>Process & Download:</strong> Click process and download your results</li>
                    </ol>
                  </div>

                  <h2 id="technical-features">Technical Features</h2>
                  <p>
                    ConvertMorph is built with cutting-edge web technologies to provide a seamless user experience 
                    across all devices and browsers:
                  </p>

                  <h3>Performance Optimizations</h3>
                  <ul>
                    <li><strong>WebAssembly processing:</strong> Near-native performance for complex operations</li>
                    <li><strong>Progressive loading:</strong> Tools load quickly with optimized code splitting</li>
                    <li><strong>Memory management:</strong> Efficient handling of large files without browser crashes</li>
                    <li><strong>Responsive design:</strong> Optimized interface for all screen sizes and devices</li>
                  </ul>

                  <h3>Browser Compatibility</h3>
                  <ul>
                    <li><strong>Modern browsers:</strong> Chrome, Firefox, Safari, Edge (latest versions supported)</li>
                    <li><strong>Mobile support:</strong> iOS Safari, Chrome Mobile, Samsung Internet compatibility</li>
                    <li><strong>Progressive enhancement:</strong> Graceful degradation for older browser versions</li>
                    <li><strong>Accessibility:</strong> WCAG 2.1 compliant for screen readers and assistive technologies</li>
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
                    ConvertMorph provides a comprehensive, secure, and completely free solution for all your 
                    <strong>PDF processing, image editing, text analysis, and financial calculation needs</strong>. 
                    With client-side processing, professional-quality results, and no registration requirements, 
                    it's the ideal choice for individuals and businesses seeking reliable digital tools.
                  </p>
                  <p>
                    Whether you need to process documents, edit images, analyze text, or calculate finances, ConvertMorph 
                    delivers the tools you need with the privacy and security you deserve.
                  </p>

                  <div className="callout callout-success">
                    <h4>Start Using ConvertMorph Today</h4>
                    <p>
                      Experience the difference of truly private, secure processing with our comprehensive 
                      suite of free tools across all categories.
                    </p>
                    <Link 
                      href="/tools" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-3 font-medium"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Explore All Tools
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
                    currentSlug="convertmorph-free-online-tools" 
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
                  currentSlug="convertmorph-free-online-tools" 
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
