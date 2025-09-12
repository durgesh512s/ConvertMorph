import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Clock, Zap, Settings, FileImage } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Convert Image Formats Online: Complete Guide to Image Format Conversion',
  excerpt: 'Convert images between JPEG, PNG, and WebP formats online for free. High-quality image format conversion with preview and batch processing.',
  slug: 'convert-image-formats-online',
  focusKeyword: 'convert image formats online',
  secondaryKeywords: [
    'image converter',
    'jpeg to png',
    'png to webp',
    'webp converter',
    'image format conversion',
    'online image converter',
    'convert images online',
    'image format changer',
    'batch image converter',
    'free image converter'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-03-10T10:00:00.000Z',
  dateModified: '2025-03-10T10:00:00.000Z',
  readingTime: '9 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-convert-image-formats', text: 'Why Convert Image Formats Online?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'understanding-image-formats', text: 'Understanding Image Formats', level: 2 },
  { id: 'jpeg-format', text: 'JPEG Format', level: 3 },
  { id: 'png-format', text: 'PNG Format', level: 3 },
  { id: 'webp-format', text: 'WebP Format', level: 3 },
  { id: 'quality-settings', text: 'Quality Settings and Optimization', level: 2 },
  { id: 'use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'What image formats can I convert between?',
    answer: 'You can convert between JPEG, PNG, and WebP formats. Upload images in JPEG, PNG, WebP, GIF, or BMP format and convert them to your desired output format.'
  },
  {
    question: 'Which image format should I choose for my needs?',
    answer: 'Choose JPEG for photos with smaller file sizes, PNG for graphics with transparency or when you need lossless quality, and WebP for modern web applications that need excellent compression with high quality.'
  },
  {
    question: 'Will converting between formats affect image quality?',
    answer: 'PNG conversion is completely lossless. JPEG and WebP conversions offer quality controls - higher quality settings preserve more detail but create larger files. You can adjust quality from 10% to 100%.'
  },
  {
    question: 'Can I convert multiple images at once?',
    answer: 'Yes! You can upload and convert up to 20 images simultaneously. The tool supports batch processing and provides a convenient "Download All as ZIP" option for multiple files.'
  },
  {
    question: 'What\'s the maximum file size for image conversion?',
    answer: 'Each image can be up to 50MB in size. This accommodates high-resolution photos and graphics while ensuring optimal browser performance during conversion.'
  },
  {
    question: 'Is my data secure during the conversion process?',
    answer: 'Absolutely! All image conversion happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device, ensuring complete privacy and security.'
  }
];


export default function ConvertImageFormatsGuide() {
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
                    Convert Image Formats Online: Complete Guide to Image Format Conversion
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>March 10, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      Image Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to convert images between different formats? Learn how to <strong>convert image formats online</strong> 
                    efficiently while maintaining quality using professional tools and proven techniques.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <RefreshCw className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Image Format Converter
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Convert images between JPEG, PNG, and WebP formats with quality control and preview.
                        </p>
                        <Link
                          href="/tools/image-convert"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-convert-image-formats">Why Convert Image Formats Online?</h2>
                  <p>
                    Different image formats serve different purposes in digital media. Converting between formats allows you to optimize images for specific use cases, reduce file sizes, improve compatibility, and enhance web performance.
                  </p>
                  <p>
                    Online image converters provide instant access to professional-grade conversion tools without requiring software installation. They're perfect for quick conversions, batch processing, and maintaining image quality across different formats.
                  </p>
                  
                  <div className="callout callout-info">
                    <h4>Key Benefits of Format Conversion</h4>
                    <ul>
                      <li><strong>Optimize file sizes</strong> for faster web loading</li>
                      <li><strong>Improve compatibility</strong> across different platforms</li>
                      <li><strong>Maintain quality</strong> while reducing storage requirements</li>
                      <li><strong>Support modern formats</strong> like WebP for better compression</li>
                    </ul>
                  </div>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>image format converter</strong> uses the HTML5 Canvas API to provide high-quality conversions entirely in your browser. 
                    Here's how to <strong>convert images online</strong> step by step:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Choose Output Format</h4>
                        <p>Select your desired output format: JPEG for photos, PNG for graphics with transparency, or WebP for modern web applications.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Adjust Quality Settings</h4>
                        <p>For JPEG and WebP formats, adjust the quality slider from 10% to 100% to balance file size and image quality.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Upload Your Images</h4>
                        <p>Drag and drop up to 20 images (max 50MB each) in JPEG, PNG, WebP, GIF, or BMP format.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Convert and Preview</h4>
                        <p>Click "Convert Images" to process your files. Preview each converted image before downloading to ensure quality meets your needs.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>Download Results</h4>
                        <p>Download individual images or use "Download All as ZIP" for batch downloads. All conversions happen securely in your browser.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image Converter</h4>
                    <p>
                      <strong>Convert image formats online</strong> now with our free tool. No registration required, 
                      and your files are processed securely in your browser.
                    </p>
                    <Link 
                      href="/tools/image-convert" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Convert Images Now
                    </Link>
                  </div>

                  <h2 id="understanding-image-formats">Understanding Image Formats</h2>
                  <p>
                    Each image format has unique characteristics that make it suitable for different applications. Understanding these differences helps you choose the right format for your needs.
                  </p>

                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Best For</th>
                        <th>Compression</th>
                        <th>Transparency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>JPEG</td>
                        <td>Photos, complex images</td>
                        <td>Lossy, small files</td>
                        <td>No</td>
                      </tr>
                      <tr>
                        <td>PNG</td>
                        <td>Graphics, logos, screenshots</td>
                        <td>Lossless, larger files</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>WebP</td>
                        <td>Modern web applications</td>
                        <td>Lossy/Lossless, excellent compression</td>
                        <td>Yes</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 id="jpeg-format">JPEG Format</h3>
                  <p>
                    JPEG is ideal for photographs and complex images with many colors. It uses lossy compression to achieve small file sizes, making it perfect for web use where loading speed matters.
                  </p>
                  <ul>
                    <li><strong>Best for:</strong> Photos, complex images, web graphics</li>
                    <li><strong>Pros:</strong> Small file sizes, universal support, adjustable quality</li>
                    <li><strong>Cons:</strong> No transparency, lossy compression, quality degradation</li>
                  </ul>

                  <h3 id="png-format">PNG Format</h3>
                  <p>
                    PNG provides lossless compression and supports transparency, making it perfect for graphics, logos, and images that need crisp edges and transparent backgrounds.
                  </p>
                  <ul>
                    <li><strong>Best for:</strong> Graphics, logos, screenshots, images with transparency</li>
                    <li><strong>Pros:</strong> Lossless quality, transparency support, sharp edges</li>
                    <li><strong>Cons:</strong> Larger file sizes, not ideal for photos</li>
                  </ul>

                  <h3 id="webp-format">WebP Format</h3>
                  <p>
                    WebP is a modern format developed by Google that provides excellent compression while maintaining high quality. It supports both lossy and lossless compression plus transparency.
                  </p>
                  <ul>
                    <li><strong>Best for:</strong> Modern web applications, responsive images</li>
                    <li><strong>Pros:</strong> Excellent compression, transparency support, modern features</li>
                    <li><strong>Cons:</strong> Limited support in older browsers</li>
                  </ul>

                  <h2 id="quality-settings">Quality Settings and Optimization</h2>
                  <p>
                    Understanding quality settings helps you achieve the perfect balance between file size and visual quality:
                  </p>
                  <ul>
                    <li><strong>90-100% quality:</strong> Excellent quality, larger files, ideal for professional work</li>
                    <li><strong>70-90% quality:</strong> Good quality, moderate file sizes, perfect for web use</li>
                    <li><strong>50-70% quality:</strong> Acceptable quality, small files, suitable for thumbnails</li>
                    <li><strong>10-50% quality:</strong> Lower quality, very small files, use sparingly</li>
                  </ul>

                  <h2 id="use-cases">Common Use Cases</h2>
                  
                  <h3>Web Development</h3>
                  <p>
                    <strong>Convert images online</strong> to optimize for different web scenarios:
                  </p>
                  <ul>
                    <li><strong>Hero images:</strong> Convert to WebP for modern browsers, JPEG fallback</li>
                    <li><strong>Product photos:</strong> JPEG with 80-90% quality for fast loading</li>
                    <li><strong>Icons and logos:</strong> PNG for crisp edges and transparency</li>
                    <li><strong>Thumbnails:</strong> JPEG with 60-70% quality for quick previews</li>
                  </ul>

                  <h3>Social Media</h3>
                  <p>
                    Different platforms prefer different formats for optimal display:
                  </p>
                  <ul>
                    <li><strong>Instagram:</strong> JPEG for photos, PNG for graphics with text</li>
                    <li><strong>Facebook:</strong> JPEG for most content, PNG for logos</li>
                    <li><strong>Twitter:</strong> JPEG for photos, PNG for graphics and screenshots</li>
                    <li><strong>LinkedIn:</strong> PNG for professional graphics, JPEG for photos</li>
                  </ul>

                  <h3>Email Marketing</h3>
                  <p>
                    Optimize images for email campaigns and newsletters:
                  </p>
                  <ul>
                    <li><strong>Header images:</strong> JPEG with 70-80% quality</li>
                    <li><strong>Product images:</strong> JPEG optimized for fast loading</li>
                    <li><strong>Logos:</strong> PNG for transparency and crisp appearance</li>
                    <li><strong>Icons:</strong> PNG for sharp, professional look</li>
                  </ul>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize the quality and efficiency of your image format conversion with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Choose the right format:</strong> JPEG for photos, PNG for graphics, WebP for modern web</li>
                    <li><strong>Start with high-quality originals:</strong> Always convert from the best available source</li>
                    <li><strong>Test quality settings:</strong> Find the optimal balance between size and quality</li>
                    <li><strong>Consider your audience:</strong> Use WebP for modern browsers, provide fallbacks for older ones</li>
                    <li><strong>Batch process similar images:</strong> Apply consistent settings to related images</li>
                    <li><strong>Preview before downloading:</strong> Check quality and file size before finalizing</li>
                    <li><strong>Keep originals:</strong> Always maintain high-quality source files</li>
                    <li><strong>Use appropriate quality:</strong> Higher for print, moderate for web, lower for thumbnails</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Format Selection Guide</h4>
                    <p>
                      When in doubt, use this simple guide: <strong>JPEG for photos</strong> (smaller files), 
                      <strong>PNG for graphics</strong> (transparency support), and <strong>WebP for modern web</strong> (best compression).
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
                    Learning how to <strong>convert image formats online</strong> is essential for modern digital content creation and web development. 
                    Whether you need to <strong>convert images online</strong> for web optimization, social media, or professional projects, 
                    choosing the right format and quality settings makes all the difference.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution with quality control, preview functionality, and batch processing 
                    capabilities that work directly in your browser. With support for JPEG, PNG, and WebP formats plus secure file handling, 
                    it's the perfect tool to <strong>convert image formats online</strong> and achieve professional results every time.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Ready to Convert Your Images?</h4>
                    <p>
                      Transform your images to the perfect format with ConvertMorph's free online converter. 
                      Quality control, preview functionality, and batch processing for professional results.
                    </p>
                    <Link 
                      href="/tools/image-convert" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
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
                    currentSlug="convert-image-formats-online" 
                    count={2} 
                    variant="list" 
                  />
                </div>
              </div>
            </div>

            {/* Mobile Related Posts - Shown only on mobile, after main content */}
            <div className="lg:hidden order-3 col-span-full w-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-6">
                <RelatedPosts 
                  currentSlug="convert-image-formats-online" 
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
