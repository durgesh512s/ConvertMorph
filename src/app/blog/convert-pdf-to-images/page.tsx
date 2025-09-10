import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Image } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Convert PDF to Images: Extract Pages as JPG/PNG Online',
  excerpt: 'Convert PDF pages to high-quality JPG or PNG images online. Extract all pages or specific pages from PDF documents. Complete guide with step-by-step instructions.',
  slug: 'convert-pdf-to-images',
  focusKeyword: 'PDF to images',
  secondaryKeywords: [
    'pdf to jpg',
    'export pdf pages as images',
    'convert pdf to png',
    'save pdf as images',
    'PDF to image converter',
    'extract images from PDF'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-02-05T10:00:00.000Z',
  dateModified: '2025-02-05T10:00:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-convert-pdf-to-images', text: 'Why Convert PDF to Images?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'output-formats', text: 'Output Format Options', level: 2 },
  { id: 'quality-settings', text: 'Quality Settings Guide', level: 2 },
  { id: 'common-use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'optimization-tips', text: 'Optimization Tips', level: 2 },
  { id: 'troubleshooting', text: 'Troubleshooting Common Issues', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'Can I convert specific pages from PDF to images?',
    answer: 'Yes! ConvertMorph allows you to select specific pages or convert all pages from your PDF to images. You can choose individual pages or page ranges to extract exactly what you need.'
  },
  {
    question: 'What image formats can I convert PDF to?',
    answer: 'ConvertMorph supports conversion to JPG and PNG formats. JPG is best for photos and complex images with smaller file sizes, while PNG is ideal for text, diagrams, and images requiring transparency.'
  },
  {
    question: 'What resolution should I choose for PDF to image conversion?',
    answer: 'Choose 72-150 DPI for web use and digital display, 300 DPI for standard printing, and 600+ DPI for high-quality printing or detailed work. Higher DPI creates larger files but better quality.'
  },
  {
    question: 'Will converting PDF to images maintain the original quality?',
    answer: 'Yes, when using appropriate settings. PNG format maintains perfect quality with lossless compression, while JPG offers adjustable quality levels. Choose higher DPI settings for better quality.'
  },
  {
    question: 'Can I convert password-protected PDFs to images?',
    answer: 'You\'ll need to enter the password first to unlock the PDF before conversion. ConvertMorph processes files securely in your browser without storing passwords or documents.'
  },
  {
    question: 'Is there a limit on PDF file size for conversion?',
    answer: 'ConvertMorph can handle PDF files up to 100MB. For larger files, consider splitting the PDF first or converting specific pages rather than the entire document.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Convert PDF to Images', url: '/blog/convert-pdf-to-images' }
];

export default function PDFToImagesGuide() {
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
                    Convert PDF to Images: Extract Pages as JPG/PNG Online
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>February 5, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to <strong>convert PDF to images</strong> for web use, presentations, or editing? Whether you want to 
                    <strong> PDF to JPG</strong>, <strong>convert PDF to PNG</strong>, or <strong>save PDF as images</strong>, 
                    this comprehensive guide shows you how to <strong>export PDF pages as images</strong> with professional quality.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Image className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          PDF to Images
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Convert PDF pages to high-quality JPG or PNG images with customizable settings.
                        </p>
                        <Link
                          href="/tools/pdf-to-images"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-convert-pdf-to-images">Why Convert PDF to Images?</h2>
                  <p>
                    A <strong>PDF to image converter</strong> is essential for modern digital workflows. Here's why you need to <strong>convert PDF to images</strong>:
                  </p>
                  <ul>
                    <li><strong>Web publishing:</strong> Display PDF content on websites and blogs without plugins</li>
                    <li><strong>Social media sharing:</strong> Share document pages on platforms that don't support PDFs</li>
                    <li><strong>Presentations:</strong> Include PDF pages in PowerPoint, Keynote, or Google Slides</li>
                    <li><strong>Image editing:</strong> Edit PDF content in Photoshop, GIMP, or other image editors</li>
                    <li><strong>Thumbnails:</strong> Create preview images for document libraries and galleries</li>
                    <li><strong>Compatibility:</strong> Use PDF content in applications that only support image formats</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>PDF to image converter</strong> makes it simple to <strong>export PDF pages as images</strong>. 
                    Here's the straightforward process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your PDF</h4>
                        <p>Drag and drop your PDF file or click to browse. Support for multi-page documents with instant preview.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Choose Format & Quality</h4>
                        <p>Select JPG or PNG format and set your preferred DPI (72-600). Preview quality settings before conversion.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Images</h4>
                        <p>Get individual image files or a convenient ZIP archive. All processing happens securely in your browser.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph PDF to Images Converter</h4>
                    <p>
                      Transform your PDF pages into high-quality images now. Free, fast, and secure conversion 
                      with no registration required.
                    </p>
                    <Link 
                      href="/tools/pdf-to-images" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Convert PDF to Images Now
                    </Link>
                  </div>

                  <h2 id="output-formats">Output Format Options</h2>
                  <p>
                    Choose the right format when you <strong>convert PDF to images</strong> based on your specific needs:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Best For</th>
                        <th>File Size</th>
                        <th>Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>JPG</td>
                        <td>Photos, complex images, web use</td>
                        <td>Smaller</td>
                        <td>Good (lossy compression)</td>
                      </tr>
                      <tr>
                        <td>PNG</td>
                        <td>Text, diagrams, transparency needed</td>
                        <td>Larger</td>
                        <td>Perfect (lossless compression)</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="callout callout-info">
                    <h4>Format Selection Guide</h4>
                    <ul>
                      <li><strong>PDF to JPG:</strong> Perfect for photographs, complex graphics, and when file size matters</li>
                      <li><strong>Convert PDF to PNG:</strong> Ideal for text documents, diagrams, and when quality is paramount</li>
                      <li><strong>Transparency needs:</strong> Only PNG supports transparent backgrounds</li>
                    </ul>
                  </div>

                  <h2 id="quality-settings">Quality Settings Guide</h2>
                  
                  <h3>Resolution (DPI) Options</h3>
                  <p>Choose the right DPI when you <strong>save PDF as images</strong>:</p>
                  <ul>
                    <li><strong>72 DPI:</strong> Web display, email sharing, quick previews, social media</li>
                    <li><strong>150 DPI:</strong> Standard quality, balanced size and clarity, presentations</li>
                    <li><strong>300 DPI:</strong> High quality, professional printing, detailed work</li>
                    <li><strong>600 DPI:</strong> Maximum quality, large format printing, archival purposes</li>
                  </ul>

                  <h3>Quality vs. File Size Trade-off</h3>
                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">For Web Use</h4>
                      <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                        <li>Use 72-150 DPI for optimal loading speed</li>
                        <li>Choose JPG for faster page loads</li>
                        <li>Consider image compression after conversion</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">For Print Use</h4>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>Use 300+ DPI for professional printing</li>
                        <li>Choose PNG for text-heavy documents</li>
                        <li>Test print quality with sample pages</li>
                      </ul>
                    </div>
                  </div>

                  <h2 id="common-use-cases">Common Use Cases</h2>
                  <p>
                    Here are the most popular scenarios where you need to <strong>convert PDF to images</strong>:
                  </p>
                  
                  <h3>Web Development & Design</h3>
                  <ul>
                    <li><strong>Website galleries:</strong> Display document previews without requiring PDF viewers</li>
                    <li><strong>Blog illustrations:</strong> Use PDF pages as visual content in articles</li>
                    <li><strong>Portfolio showcases:</strong> Present design work or documents as image galleries</li>
                    <li><strong>E-commerce:</strong> Show product catalogs, manuals, or certificates as images</li>
                  </ul>

                  <h3>Social Media & Marketing</h3>
                  <ul>
                    <li><strong>Instagram posts:</strong> Share infographics, quotes, or document snippets</li>
                    <li><strong>LinkedIn articles:</strong> Include charts, reports, or presentation slides</li>
                    <li><strong>Email campaigns:</strong> Embed document previews in newsletters</li>
                    <li><strong>Social proof:</strong> Share certificates, testimonials, or case studies</li>
                  </ul>

                  <h3>Educational & Professional</h3>
                  <ul>
                    <li><strong>Online courses:</strong> Create lesson materials from PDF textbooks</li>
                    <li><strong>Presentations:</strong> Include PDF content in PowerPoint or Google Slides</li>
                    <li><strong>Research papers:</strong> Extract figures, charts, or diagrams for analysis</li>
                    <li><strong>Documentation:</strong> Create visual guides from technical manuals</li>
                  </ul>

                  <h2 id="optimization-tips">Optimization Tips</h2>
                  <p>
                    Get the best results when you <strong>extract images from PDF</strong> with these professional tips:
                  </p>

                  <h3>Choose the Right Settings</h3>
                  <div className="callout callout-warning">
                    <h4>Quality vs. Performance Balance</h4>
                    <ul>
                      <li><strong>Web use:</strong> 72-150 DPI, JPG format for faster loading</li>
                      <li><strong>Print use:</strong> 300+ DPI, PNG format for crisp text</li>
                      <li><strong>Archive use:</strong> 600 DPI, PNG format for maximum quality</li>
                      <li><strong>Social media:</strong> 150 DPI, JPG format, optimized dimensions</li>
                    </ul>
                  </div>

                  <h3>File Management Best Practices</h3>
                  <ul>
                    <li><strong>Naming convention:</strong> Use descriptive filenames like "report-page-1.jpg"</li>
                    <li><strong>Batch processing:</strong> Convert multiple PDFs at once for efficiency</li>
                    <li><strong>Organization:</strong> Create folders by project or document type</li>
                    <li><strong>Backup:</strong> Keep original PDFs alongside converted images</li>
                  </ul>

                  <h3>Quality Enhancement Tips</h3>
                  <ul>
                    <li><strong>Source quality:</strong> Start with high-resolution PDFs for best results</li>
                    <li><strong>Color mode:</strong> Use RGB for digital, CMYK for print applications</li>
                    <li><strong>Compression:</strong> Adjust JPG quality based on content complexity</li>
                    <li><strong>Post-processing:</strong> Consider image editing for specific requirements</li>
                  </ul>

                  <h2 id="troubleshooting">Troubleshooting Common Issues</h2>
                  <p>
                    Solve common problems when you <strong>save PDF as images</strong>:
                  </p>

                  <h3>Image Quality Issues</h3>
                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                      <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">Problem: Blurry Images</h4>
                      <ul className="text-red-800 dark:text-red-200 text-sm space-y-1">
                        <li>Increase DPI setting (try 300+)</li>
                        <li>Use PNG format for text documents</li>
                        <li>Check source PDF quality</li>
                        <li>Avoid upscaling small PDFs</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">Problem: Large File Sizes</h4>
                      <ul className="text-orange-800 dark:text-orange-200 text-sm space-y-1">
                        <li>Reduce DPI for web use (72-150)</li>
                        <li>Use JPG format with compression</li>
                        <li>Convert specific pages only</li>
                        <li>Optimize images after conversion</li>
                      </ul>
                    </div>
                  </div>

                  <h3>Conversion Failures</h3>
                  <ul>
                    <li><strong>Password protection:</strong> Unlock PDF before conversion</li>
                    <li><strong>Corrupted files:</strong> Try repairing PDF or use different source</li>
                    <li><strong>Large files:</strong> Split PDF into smaller sections first</li>
                    <li><strong>Browser issues:</strong> Clear cache, try different browser, or restart</li>
                  </ul>

                  <h3>Format-Specific Issues</h3>
                  <ul>
                    <li><strong>JPG artifacts:</strong> Increase quality setting or switch to PNG</li>
                    <li><strong>PNG file size:</strong> Use JPG for photos, PNG only for text/diagrams</li>
                    <li><strong>Color accuracy:</strong> Check color profile settings in source PDF</li>
                    <li><strong>Transparency loss:</strong> Only PNG supports transparent backgrounds</li>
                  </ul>

                  {/* Tool CTA - Mid-content */}
                  <div className="my-8">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-lg">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
                            <Image className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">PDF to Images</h3>
                            <p className="text-white/90">Convert PDF pages to high-quality JPG or PNG images with customizable settings.</p>
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-sm text-white font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 shadow-sm" />
                          High-resolution output
                        </li>
                        <li className="flex items-center text-sm text-white font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 shadow-sm" />
                          Multiple image formats
                        </li>
                        <li className="flex items-center text-sm text-white font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 shadow-sm" />
                          Page selection
                        </li>
                        <li className="flex items-center text-sm text-white font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 shadow-sm" />
                          Quality control
                        </li>
                      </ul>

                      <Link
                        href="/tools/pdf-to-images"
                        className="inline-flex items-center px-6 py-3 bg-white/90 hover:bg-white text-blue-600 hover:text-blue-700 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <span className="text-blue-600 hover:text-blue-700 font-semibold">Get Started Free</span>
                        <Image className="w-4 h-4 ml-2 text-blue-600 hover:text-blue-700" />
                      </Link>
                    </div>
                  </div>

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

                  <div className="callout callout-success">
                    <h4>Ready to Convert Your PDFs?</h4>
                    <p>
                      Transform your PDF documents into high-quality images with ConvertMorph's free online converter. 
                      No registration required, secure processing, and professional results every time.
                    </p>
                    <Link 
                      href="/tools/pdf-to-images" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
                    >
                      <Image className="w-5 h-5 mr-2" />
                      Start Converting Now
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
                    currentSlug="convert-pdf-to-images" 
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
                  currentSlug="convert-pdf-to-images" 
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
