import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Image, Clock, Zap, Settings, FileImage } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Compress Images Online: Reduce Image Size Without Quality Loss',
  excerpt: 'Learn how to compress images online effectively while maintaining quality. Complete guide to reducing JPEG, PNG, WebP file sizes with free tools and best practices.',
  slug: 'compress-images-online',
  focusKeyword: 'compress images online',
  secondaryKeywords: [
    'reduce image size',
    'image compression tool',
    'compress JPEG online',
    'compress PNG online',
    'image file size reducer',
    'optimize images for web',
    'shrink image file size',
    'image compressor free',
    'reduce photo size',
    'compress pictures online'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-03-01T10:00:00.000Z',
  dateModified: '2025-03-01T10:00:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-compress-images', text: 'Why Compress Images Online?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'compression-formats', text: 'Image Compression Formats', level: 2 },
  { id: 'jpeg-compression', text: 'JPEG Compression', level: 3 },
  { id: 'png-compression', text: 'PNG Compression', level: 3 },
  { id: 'webp-compression', text: 'WebP Compression', level: 3 },
  { id: 'compression-levels', text: 'Understanding Compression Levels', level: 2 },
  { id: 'use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How much can I compress an image without losing quality?',
    answer: 'With light compression, you can typically reduce image size by 20-40% with minimal quality loss. JPEG images can be compressed more aggressively than PNG files while maintaining acceptable quality.'
  },
  {
    question: 'What\'s the difference between lossy and lossless compression?',
    answer: 'Lossy compression (like JPEG) removes some image data to achieve smaller file sizes, while lossless compression (like PNG) preserves all original data. Lossy compression offers better size reduction but may affect quality.'
  },
  {
    question: 'Which image format is best for web use?',
    answer: 'WebP offers the best compression for web use, followed by JPEG for photos and PNG for graphics with transparency. Choose based on your specific needs and browser support requirements.'
  },
  {
    question: 'Can I compress images in bulk?',
    answer: 'Yes! ConvertMorph supports batch compression of up to 20 images at once. You can apply the same compression settings to multiple files and download them as a ZIP archive.'
  },
  {
    question: 'Is it safe to compress images online?',
    answer: 'Yes, when using reputable tools like ConvertMorph that process images locally in your browser and automatically delete files after processing. Always check the privacy policy of any online tool.'
  },
  {
    question: 'What\'s the maximum image size I can compress?',
    answer: 'ConvertMorph supports image files up to 50MB each. For larger files, consider resizing the image dimensions first or using desktop software for processing.'
  }
];


export default function CompressImagesGuide() {  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://convertmorph.com/blog/compress-images-online#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://convertmorph.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "Compress Images Online: Reduce Image Size Without Quality Loss", "item": "https://convertmorph.com/blog/compress-images-online" }
    ]
  };


  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={breadcrumbJsonLd} />{/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD added directly to this page */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumbs handled by individual page breadcrumb JSON-LD */}

<Link 
            href="/blog" 
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 sm:mb-8 transition-colors"
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
                    Compress Images Online: Complete Guide to Reducing File Size
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>March 1, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
                      Image Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Large image files slow down websites and consume storage space. Learn how to <strong>compress images online</strong> 
                    effectively while maintaining visual quality using professional tools and proven techniques.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <div className="mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Image className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Image Compress
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Reduce image file size while maintaining quality with multiple compression levels and format options.
                        </p>
                        <Link
                          href="/tools/image-compress"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Try Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-prose">
                  <h2 id="why-compress-images">Why Compress Images Online?</h2>
                  <p>
                    Image compression is essential for modern web development and digital content management. Here's why you need to <strong>compress images online</strong>:
                  </p>
                  <ul>
                    <li><strong>Faster website loading:</strong> Compressed images load 3-5x faster, improving user experience and SEO rankings</li>
                    <li><strong>Storage optimization:</strong> Reduce storage costs by up to 80% with smart compression techniques</li>
                    <li><strong>Bandwidth savings:</strong> Lower data usage for mobile users and slower internet connections</li>
                    <li><strong>Email compatibility:</strong> Smaller images fit within email attachment limits</li>
                    <li><strong>Social media optimization:</strong> Meet platform size requirements while maintaining quality</li>
                    <li><strong>CDN efficiency:</strong> Reduce content delivery costs and improve global performance</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>image compression tool</strong> uses advanced algorithms to <strong>reduce image size</strong> while preserving visual quality. 
                    Here's the straightforward process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your Images</h4>
                        <p>Drag and drop up to 20 images or click to browse. Supports JPEG, PNG, WebP, GIF, BMP, and TIFF formats up to 50MB each.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Choose Compression Settings</h4>
                        <p>Select compression level (Light, Medium, Strong) and output format. Preview shows estimated size reduction before processing.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Compressed Images</h4>
                        <p>Get your optimized images instantly. Download individually or as a ZIP archive for batch processing.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image Compressor</h4>
                    <p>
                      <strong>Compress images online</strong> now with our free tool. No registration required, 
                      and your files are processed securely in your browser.
                    </p>
                    <Link 
                      href="/tools/image-compress" 
                      className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Compress Images Now
                    </Link>
                  </div>

                  <h2 id="compression-formats">Image Compression Formats</h2>
                  
                  <h3 id="jpeg-compression">JPEG Compression</h3>
                  <p>
                    JPEG is ideal for photographs and images with many colors. When you <strong>compress JPEG online</strong>, you can achieve:
                  </p>
                  <ul>
                    <li><strong>High compression ratios:</strong> Reduce file size by 60-90% with acceptable quality loss</li>
                    <li><strong>Universal compatibility:</strong> Supported by all browsers and devices</li>
                    <li><strong>Adjustable quality:</strong> Fine-tune compression level based on use case</li>
                    <li><strong>Small file sizes:</strong> Perfect for web galleries and email attachments</li>
                  </ul>

                  <h3 id="png-compression">PNG Compression</h3>
                  <p>
                    PNG compression works well for graphics, logos, and images requiring transparency. <strong>Compress PNG online</strong> benefits include:
                  </p>
                  <ul>
                    <li><strong>Lossless compression:</strong> Maintain perfect image quality while reducing size</li>
                    <li><strong>Transparency support:</strong> Preserve alpha channels for overlays and graphics</li>
                    <li><strong>Sharp edges:</strong> Ideal for text, logos, and line art</li>
                    <li><strong>Moderate compression:</strong> Typically 20-50% size reduction</li>
                  </ul>

                  <h3 id="webp-compression">WebP Compression</h3>
                  <p>
                    WebP offers superior compression for modern web applications:
                  </p>
                  <ul>
                    <li><strong>Advanced compression:</strong> 25-35% smaller than JPEG with similar quality</li>
                    <li><strong>Transparency support:</strong> Combines PNG transparency with JPEG compression efficiency</li>
                    <li><strong>Animation support:</strong> Replace GIF animations with smaller WebP files</li>
                    <li><strong>Modern browsers:</strong> Supported by Chrome, Firefox, Safari, and Edge</li>
                  </ul>

                  <h2 id="compression-levels">Understanding Compression Levels</h2>
                  <p>
                    Choose the right compression level based on your image type and quality requirements:
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
                        <td>Professional photos, print materials</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>40-60%</td>
                        <td>Slight</td>
                        <td>Web images, social media posts</td>
                      </tr>
                      <tr>
                        <td>Strong</td>
                        <td>60-80%</td>
                        <td>Noticeable</td>
                        <td>Thumbnails, email attachments</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 id="use-cases">Common Use Cases</h2>
                  
                  <h3>Web Development</h3>
                  <p>
                    <strong>Optimize images for web</strong> to improve site performance and user experience:
                  </p>
                  <ul>
                    <li><strong>Hero images:</strong> Compress large banner images while maintaining visual impact</li>
                    <li><strong>Product galleries:</strong> Balance quality and loading speed for e-commerce sites</li>
                    <li><strong>Blog thumbnails:</strong> Create consistent, fast-loading preview images</li>
                    <li><strong>Background images:</strong> Reduce file sizes for decorative elements</li>
                  </ul>

                  <h3>Social Media & Marketing</h3>
                  <p>
                    Meet platform requirements while maintaining professional quality:
                  </p>
                  <ul>
                    <li><strong>Instagram posts:</strong> Optimize images for mobile viewing and fast loading</li>
                    <li><strong>Facebook ads:</strong> Reduce file sizes while meeting quality standards</li>
                    <li><strong>Email campaigns:</strong> Ensure images load quickly in email clients</li>
                    <li><strong>Digital presentations:</strong> Balance file size with visual clarity</li>
                  </ul>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize compression efficiency while maintaining image quality with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Choose the right format:</strong> Use JPEG for photos, PNG for graphics, WebP for modern web applications</li>
                    <li><strong>Resize before compressing:</strong> Reduce dimensions to target size before applying compression</li>
                    <li><strong>Test different levels:</strong> Compare results to find the optimal balance for your needs</li>
                    <li><strong>Consider viewing context:</strong> Use stronger compression for thumbnails, lighter for hero images</li>
                    <li><strong>Batch similar images:</strong> Apply consistent settings to related images for uniformity</li>
                    <li><strong>Monitor file sizes:</strong> Aim for under 100KB for web images, under 1MB for high-quality photos</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Progressive JPEG</h4>
                    <p>
                      Enable progressive JPEG encoding for large images. This allows images to load gradually, 
                      improving perceived performance even with larger file sizes.
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
                    Learning how to <strong>compress images online</strong> is essential for modern web development and digital content management. 
                    Whether you need to <strong>reduce image size</strong> for faster websites, <strong>compress JPEG online</strong> for email attachments, 
                    or <strong>optimize images for web</strong> performance, the right <strong>image compression tool</strong> makes all the difference.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution with multiple compression levels and format options that work directly 
                    in your browser. With support for batch processing and secure file handling, it's the perfect tool to 
                    <strong>compress pictures online</strong> and achieve professional results every time.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Ready to Compress Your Images?</h4>
                    <p>
                      Transform your large image files into optimized, web-ready assets with ConvertMorph's free online compressor. 
                      Multiple compression levels, batch processing, and secure handling.
                    </p>
                    <Link 
                      href="/tools/image-compress" 
                      className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors mt-4 font-medium"
                    >
                      <Image className="w-5 h-5 mr-2" />
                      Start Compressing Now
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
                    currentSlug="compress-images-online" 
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
                  currentSlug="compress-images-online" 
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
