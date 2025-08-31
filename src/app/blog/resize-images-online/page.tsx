import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Clock, Zap, Settings, FileImage } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Resize Images Online: Complete Guide to Image Resizing',
  excerpt: 'Learn how to resize images online while maintaining quality. Complete guide to changing image dimensions, aspect ratios, and formats with free tools and best practices.',
  slug: 'resize-images-online',
  focusKeyword: 'resize images online',
  secondaryKeywords: [
    'image resizer',
    'resize photos online',
    'change image size',
    'image dimension changer',
    'resize pictures online',
    'photo resizer tool',
    'image scaling online',
    'resize image dimensions',
    'bulk image resizer',
    'maintain aspect ratio'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-03-05T10:00:00.000Z',
  dateModified: '2025-03-05T10:00:00.000Z',
  readingTime: '8 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-resize-images', text: 'Why Resize Images Online?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'resize-modes', text: 'Image Resize Modes', level: 2 },
  { id: 'aspect-ratio-mode', text: 'Aspect Ratio Mode', level: 3 },
  { id: 'exact-resize-mode', text: 'Exact Resize Mode', level: 3 },
  { id: 'output-formats', text: 'Output Formats and Quality', level: 2 },
  { id: 'use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How do I resize images without losing quality?',
    answer: 'Use the aspect ratio mode to maintain proportions and choose high-quality output formats like PNG for graphics or high-quality JPEG (90%+) for photos. Avoid upscaling images beyond their original dimensions.'
  },
  {
    question: 'What\'s the difference between aspect ratio and exact resize modes?',
    answer: 'Aspect ratio mode maintains the original proportions of your image, preventing distortion. Exact resize mode allows you to set specific width and height dimensions, which may stretch or compress the image.'
  },
  {
    question: 'Can I resize multiple images at once?',
    answer: 'Yes! ConvertMorph supports batch resizing of up to 20 images simultaneously. All images will be resized using the same settings and can be downloaded as a ZIP archive.'
  },
  {
    question: 'What image formats are supported for resizing?',
    answer: 'ConvertMorph supports JPEG, PNG, WebP, GIF, and BMP formats up to 50MB each. You can also convert between formats during the resize process.'
  },
  {
    question: 'How do I maintain image quality when resizing?',
    answer: 'Use PNG format for graphics and logos, JPEG with 90%+ quality for photos, or WebP for the best compression. Always resize down rather than up, and maintain aspect ratios when possible.'
  },
  {
    question: 'What\'s the maximum image size I can resize?',
    answer: 'ConvertMorph supports images up to 50MB each. For very large images, consider using desktop software or reducing the file size first through compression.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Resize Images Online', url: '/blog/resize-images-online' }
];

export default function ResizeImagesGuide() {
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
                    Resize Images Online: Complete Guide to Image Resizing
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>March 5, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      Image Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to change image dimensions for web, print, or social media? Learn how to <strong>resize images online</strong> 
                    effectively while maintaining quality using professional tools and proven techniques.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Image Resize
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Resize images to specific dimensions using Canvas API. Support for PNG, JPG, WebP with aspect ratio control.
                        </p>
                        <Link
                          href="/tools/image-resize"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-resize-images">Why Resize Images Online?</h2>
                  <p>
                    Image resizing is crucial for optimizing images across different platforms and use cases. Here's why you need to <strong>resize images online</strong>:
                  </p>
                  <ul>
                    <li><strong>Platform requirements:</strong> Meet specific dimension requirements for social media, websites, and applications</li>
                    <li><strong>Performance optimization:</strong> Reduce file sizes by scaling down oversized images</li>
                    <li><strong>Consistent layouts:</strong> Create uniform image sizes for galleries and grids</li>
                    <li><strong>Print preparation:</strong> Adjust dimensions and resolution for physical printing</li>
                    <li><strong>Storage efficiency:</strong> Save space by resizing images to appropriate sizes</li>
                    <li><strong>Responsive design:</strong> Create multiple sizes for different screen resolutions</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>image resizer</strong> uses Canvas API technology to <strong>change image size</strong> with precision and quality control. 
                    Here's the simple process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your Images</h4>
                        <p>Drag and drop up to 20 images or click to browse. Supports JPEG, PNG, WebP, GIF, and BMP formats up to 50MB each.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Set Dimensions and Options</h4>
                        <p>Enter target width and height, choose resize mode (aspect ratio or exact), select output format, and adjust quality settings.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Resized Images</h4>
                        <p>Get your resized images instantly with detailed size and dimension information. Download individually or as a ZIP archive.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image Resizer</h4>
                    <p>
                      <strong>Resize photos online</strong> now with our free tool. No registration required, 
                      and your files are processed securely in your browser.
                    </p>
                    <Link 
                      href="/tools/image-resize" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Resize Images Now
                    </Link>
                  </div>

                  <h2 id="resize-modes">Image Resize Modes</h2>
                  
                  <h3 id="aspect-ratio-mode">Aspect Ratio Mode</h3>
                  <p>
                    Aspect ratio mode <strong>maintains the original proportions</strong> of your image, preventing distortion:
                  </p>
                  <ul>
                    <li><strong>Proportional scaling:</strong> Images maintain their natural width-to-height ratio</li>
                    <li><strong>No distortion:</strong> Prevents stretching or squashing of image content</li>
                    <li><strong>Smart calculation:</strong> Automatically calculates missing dimension based on the provided one</li>
                    <li><strong>Professional results:</strong> Ideal for photos, artwork, and professional content</li>
                  </ul>

                  <h3 id="exact-resize-mode">Exact Resize Mode</h3>
                  <p>
                    Exact resize mode allows you to set specific dimensions regardless of original proportions:
                  </p>
                  <ul>
                    <li><strong>Precise control:</strong> Set exact width and height dimensions</li>
                    <li><strong>Platform compliance:</strong> Meet strict size requirements for specific platforms</li>
                    <li><strong>Creative flexibility:</strong> Create artistic effects through intentional distortion</li>
                    <li><strong>Uniform sizing:</strong> Make all images exactly the same dimensions</li>
                  </ul>

                  <h2 id="output-formats">Output Formats and Quality</h2>
                  <p>
                    Choose the right output format and quality settings for your resized images:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Best For</th>
                        <th>Quality Control</th>
                        <th>File Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Original</td>
                        <td>Maintaining current format</td>
                        <td>Format-dependent</td>
                        <td>Varies</td>
                      </tr>
                      <tr>
                        <td>JPEG</td>
                        <td>Photos, complex images</td>
                        <td>10-100% quality slider</td>
                        <td>Small to medium</td>
                      </tr>
                      <tr>
                        <td>PNG</td>
                        <td>Graphics, logos, transparency</td>
                        <td>Lossless compression</td>
                        <td>Medium to large</td>
                      </tr>
                      <tr>
                        <td>WebP</td>
                        <td>Modern web applications</td>
                        <td>10-100% quality slider</td>
                        <td>Small</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 id="use-cases">Common Use Cases</h2>
                  
                  <h3>Social Media Optimization</h3>
                  <p>
                    <strong>Resize pictures online</strong> to meet platform-specific requirements:
                  </p>
                  <ul>
                    <li><strong>Instagram posts:</strong> 1080×1080px for square posts, 1080×1350px for portrait</li>
                    <li><strong>Facebook cover photos:</strong> 820×312px for optimal display</li>
                    <li><strong>Twitter headers:</strong> 1500×500px for professional appearance</li>
                    <li><strong>LinkedIn banners:</strong> 1584×396px for business profiles</li>
                  </ul>

                  <h3>Web Development</h3>
                  <p>
                    Optimize images for different screen sizes and use cases:
                  </p>
                  <ul>
                    <li><strong>Hero images:</strong> Create multiple sizes for responsive design</li>
                    <li><strong>Thumbnails:</strong> Generate consistent preview images</li>
                    <li><strong>Product galleries:</strong> Standardize dimensions for uniform layouts</li>
                    <li><strong>Blog images:</strong> Optimize for fast loading and SEO</li>
                  </ul>

                  <h3>Print and Professional Use</h3>
                  <p>
                    Prepare images for physical printing and professional applications:
                  </p>
                  <ul>
                    <li><strong>Business cards:</strong> 3.5×2 inches at 300 DPI</li>
                    <li><strong>Flyers and posters:</strong> Custom dimensions with high resolution</li>
                    <li><strong>Portfolio images:</strong> Consistent sizing for professional presentation</li>
                    <li><strong>Document images:</strong> Optimize for embedding in reports and presentations</li>
                  </ul>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize the quality and efficiency of your image resizing with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Start with high-quality originals:</strong> Always resize from the highest quality source available</li>
                    <li><strong>Resize down, not up:</strong> Avoid upscaling images beyond their original dimensions to prevent quality loss</li>
                    <li><strong>Maintain aspect ratios:</strong> Use aspect ratio mode unless you specifically need exact dimensions</li>
                    <li><strong>Choose appropriate formats:</strong> Use JPEG for photos, PNG for graphics, WebP for modern web</li>
                    <li><strong>Test different quality settings:</strong> Find the optimal balance between file size and visual quality</li>
                    <li><strong>Batch process similar images:</strong> Apply consistent settings to related images for uniformity</li>
                    <li><strong>Consider the viewing context:</strong> Optimize differently for web, print, and mobile viewing</li>
                    <li><strong>Preview before downloading:</strong> Check dimensions and quality before finalizing</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Responsive Image Sets</h4>
                    <p>
                      Create multiple sizes of the same image for responsive web design. Use our <strong>bulk image resizer</strong> 
                      to generate 320px, 768px, 1024px, and 1920px versions for optimal performance across devices.
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
                    Learning how to <strong>resize images online</strong> is essential for modern digital content creation and web development. 
                    Whether you need to <strong>change image size</strong> for social media, <strong>resize photos online</strong> for web optimization, 
                    or create consistent dimensions for professional projects, the right <strong>image resizer</strong> makes all the difference.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution with aspect ratio control, multiple output formats, and batch processing 
                    capabilities that work directly in your browser. With support for up to 20 images and secure file handling, it's the 
                    perfect tool to <strong>resize pictures online</strong> and achieve professional results every time.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Ready to Resize Your Images?</h4>
                    <p>
                      Transform your images to the perfect dimensions with ConvertMorph's free online resizer. 
                      Aspect ratio control, multiple formats, and batch processing for professional results.
                    </p>
                    <Link 
                      href="/tools/image-resize" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
                    >
                      <Maximize2 className="w-5 h-5 mr-2" />
                      Start Resizing Now
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
                    currentSlug="resize-images-online" 
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
                  currentSlug="resize-images-online" 
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
