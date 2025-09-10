import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Crop, Clock, Zap, Settings, Scissors } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Crop Images Online: Complete Guide to Image Cropping',
  excerpt: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion with free online image cropper.',
  slug: 'crop-images-online',
  focusKeyword: 'crop images online',
  secondaryKeywords: [
    'image cropper',
    'crop photos online',
    'image crop tool',
    'photo cropper online',
    'crop pictures online',
    'online image cropping',
    'crop image to size',
    'aspect ratio crop',
    'batch image cropper',
    'free image cropper'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-03-15T10:00:00.000Z',
  dateModified: '2025-03-15T10:00:00.000Z',
  readingTime: '9 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-crop-images', text: 'Why Crop Images Online?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'aspect-ratios', text: 'Understanding Aspect Ratios', level: 2 },
  { id: 'common-aspect-ratios', text: 'Common Aspect Ratios', level: 3 },
  { id: 'free-crop-mode', text: 'Free Crop Mode', level: 3 },
  { id: 'output-formats', text: 'Output Formats and Quality', level: 2 },
  { id: 'use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How do I crop images without losing quality?',
    answer: 'Use PNG format for graphics or high-quality JPEG (90%+) for photos. Cropping itself doesn\'t reduce quality since you\'re selecting a portion of the original image. Quality settings only apply when converting to lossy formats like JPEG or WebP.'
  },
  {
    question: 'What aspect ratios are available for cropping?',
    answer: 'ConvertMorph supports square (1:1), standard photo (4:3), portrait (3:4), widescreen (16:9), mobile/story (9:16), and free crop mode for custom aspect ratios. Each ratio is optimized for specific use cases.'
  },
  {
    question: 'Can I crop multiple images at once?',
    answer: 'Yes! Upload up to 20 images and set crop areas for each individually using the navigation controls. All images can be processed with the same settings and downloaded as a ZIP archive.'
  },
  {
    question: 'What image formats are supported for cropping?',
    answer: 'ConvertMorph supports JPEG, PNG, WebP, GIF, and BMP formats up to 50MB each. You can also convert between formats during the cropping process.'
  },
  {
    question: 'How does the zoom feature work?',
    answer: 'The zoom slider allows you to magnify the image from 100% to 300% for precise crop selection. This is especially useful for detailed cropping or when working with high-resolution images.'
  },
  {
    question: 'Is my data secure during cropping?',
    answer: 'Absolutely! All image processing happens entirely in your browser using Canvas API and React Easy Crop. Your images are never uploaded to our servers, ensuring complete privacy and security.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Crop Images Online', url: '/blog/crop-images-online' }
];

export default function CropImagesGuide() {
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
                    Crop Images Online: Complete Guide to Image Cropping
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>March 15, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      Image Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to remove unwanted parts from your images or focus on specific areas? Learn how to <strong>crop images online</strong> 
                    with precision using professional tools and proven techniques for perfect results every time.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Crop className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Image Crop
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Crop images with precision using React Easy Crop. Support for multiple aspect ratios and formats with quality control.
                        </p>
                        <Link
                          href="/tools/image-crop"
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-crop-images">Why Crop Images Online?</h2>
                  <p>
                    Image cropping is essential for creating focused, professional-looking visuals. Here's why you need to <strong>crop images online</strong>:
                  </p>
                  <ul>
                    <li><strong>Remove distractions:</strong> Eliminate unwanted elements and focus on the main subject</li>
                    <li><strong>Improve composition:</strong> Apply rule of thirds and other composition techniques</li>
                    <li><strong>Meet platform requirements:</strong> Fit specific aspect ratios for social media and websites</li>
                    <li><strong>Create thumbnails:</strong> Extract key portions for preview images</li>
                    <li><strong>Enhance storytelling:</strong> Direct viewer attention to important details</li>
                    <li><strong>Optimize layouts:</strong> Create consistent dimensions for galleries and grids</li>
                    <li><strong>Save storage space:</strong> Reduce file sizes by removing unnecessary image areas</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>image cropper</strong> uses React Easy Crop technology to provide precise, professional-grade cropping capabilities. 
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
                        <h4>Set Crop Area and Options</h4>
                        <p>Select aspect ratio, position the crop area, adjust zoom level, choose output format, and set quality preferences.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Cropped Images</h4>
                        <p>Get your perfectly cropped images with detailed dimension and size information. Download individually or as a ZIP archive.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image Cropper</h4>
                    <p>
                      <strong>Crop photos online</strong> now with our free tool. No registration required, 
                      and your files are processed securely in your browser.
                    </p>
                    <Link 
                      href="/tools/image-crop" 
                      className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Crop Images Now
                    </Link>
                  </div>

                  <h2 id="aspect-ratios">Understanding Aspect Ratios</h2>
                  <p>
                    Aspect ratios determine the proportional relationship between width and height. Choosing the right aspect ratio is crucial for your <strong>image crop tool</strong> results:
                  </p>
                  
                  <h3 id="common-aspect-ratios">Common Aspect Ratios</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Aspect Ratio</th>
                        <th>Description</th>
                        <th>Best For</th>
                        <th>Common Uses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1:1 (Square)</td>
                        <td>Equal width and height</td>
                        <td>Social media posts</td>
                        <td>Instagram posts, profile pictures, thumbnails</td>
                      </tr>
                      <tr>
                        <td>4:3 (Standard)</td>
                        <td>Traditional photo format</td>
                        <td>General photography</td>
                        <td>Digital cameras, presentations, prints</td>
                      </tr>
                      <tr>
                        <td>3:4 (Portrait)</td>
                        <td>Vertical orientation</td>
                        <td>Portrait photography</td>
                        <td>People photos, mobile displays, stories</td>
                      </tr>
                      <tr>
                        <td>16:9 (Widescreen)</td>
                        <td>Cinematic format</td>
                        <td>Video content</td>
                        <td>YouTube thumbnails, banners, presentations</td>
                      </tr>
                      <tr>
                        <td>9:16 (Mobile/Story)</td>
                        <td>Vertical mobile format</td>
                        <td>Mobile content</td>
                        <td>Instagram stories, TikTok, mobile apps</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 id="free-crop-mode">Free Crop Mode</h3>
                  <p>
                    Free crop mode allows complete flexibility in selecting any custom aspect ratio:
                  </p>
                  <ul>
                    <li><strong>Custom dimensions:</strong> Create any width-to-height ratio you need</li>
                    <li><strong>Artistic freedom:</strong> Perfect for creative projects and unique layouts</li>
                    <li><strong>Precise selection:</strong> Focus on specific image areas without constraints</li>
                    <li><strong>Flexible cropping:</strong> Adapt to any platform or design requirement</li>
                  </ul>

                  <h2 id="output-formats">Output Formats and Quality</h2>
                  <p>
                    Choose the right output format and quality settings for your cropped images:
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
                    <strong>Crop pictures online</strong> to meet platform-specific requirements:
                  </p>
                  <ul>
                    <li><strong>Instagram posts:</strong> 1:1 square for feed posts, 9:16 for stories</li>
                    <li><strong>Facebook cover photos:</strong> 16:9 aspect ratio for optimal display</li>
                    <li><strong>Twitter headers:</strong> Custom crop to 3:1 ratio for professional appearance</li>
                    <li><strong>LinkedIn banners:</strong> 4:1 ratio for business profiles</li>
                    <li><strong>YouTube thumbnails:</strong> 16:9 widescreen format</li>
                  </ul>

                  <h3>Photography and Art</h3>
                  <p>
                    Enhance your visual storytelling with strategic cropping:
                  </p>
                  <ul>
                    <li><strong>Portrait photography:</strong> Focus on facial expressions and remove distractions</li>
                    <li><strong>Landscape photos:</strong> Emphasize key elements and improve composition</li>
                    <li><strong>Product photography:</strong> Create clean, focused product shots</li>
                    <li><strong>Artistic compositions:</strong> Apply rule of thirds and golden ratio principles</li>
                  </ul>

                  <h3>Web Development and Design</h3>
                  <p>
                    Optimize images for different web contexts:
                  </p>
                  <ul>
                    <li><strong>Hero images:</strong> Crop to specific banner dimensions</li>
                    <li><strong>Thumbnails:</strong> Create consistent preview images</li>
                    <li><strong>Gallery images:</strong> Standardize dimensions for uniform layouts</li>
                    <li><strong>Blog featured images:</strong> Optimize for SEO and visual appeal</li>
                  </ul>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize the quality and impact of your image cropping with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Plan your composition:</strong> Consider the rule of thirds and leading lines before cropping</li>
                    <li><strong>Maintain subject focus:</strong> Ensure the main subject remains prominent after cropping</li>
                    <li><strong>Use appropriate aspect ratios:</strong> Match the crop to your intended use case</li>
                    <li><strong>Preserve image quality:</strong> Start with high-resolution originals when possible</li>
                    <li><strong>Consider the viewing context:</strong> Optimize for mobile, desktop, or print viewing</li>
                    <li><strong>Test different crops:</strong> Try multiple crop areas to find the most effective composition</li>
                    <li><strong>Maintain visual balance:</strong> Ensure the cropped image feels balanced and complete</li>
                    <li><strong>Use zoom for precision:</strong> Leverage the zoom feature for detailed crop selection</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Batch Cropping Workflow</h4>
                    <p>
                      For consistent results across multiple images, set your aspect ratio and quality settings first, 
                      then navigate through each image to set individual crop areas. This ensures uniform output 
                      while allowing customization for each image's unique composition.
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
                    Learning how to <strong>crop images online</strong> is essential for creating professional, engaging visual content. 
                    Whether you need to <strong>crop photos online</strong> for social media, create thumbnails for your website, 
                    or improve the composition of your photography, the right <strong>image cropper</strong> makes all the difference.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution with React Easy Crop technology, multiple aspect ratios, 
                    format conversion, and batch processing capabilities that work directly in your browser. With support for 
                    up to 20 images and secure file handling, it's the perfect tool to <strong>crop pictures online</strong> 
                    and achieve professional results every time.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Ready to Crop Your Images?</h4>
                    <p>
                      Transform your images with precision cropping using ConvertMorph's free online tool. 
                      Multiple aspect ratios, format conversion, and batch processing for professional results.
                    </p>
                    <Link 
                      href="/tools/image-crop" 
                      className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mt-4 font-medium"
                    >
                      <Crop className="w-5 h-5 mr-2" />
                      Start Cropping Now
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
                    currentSlug="crop-images-online" 
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
                  currentSlug="crop-images-online" 
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
