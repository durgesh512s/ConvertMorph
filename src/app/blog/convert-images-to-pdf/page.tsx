import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Image } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, breadcrumbsJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Convert Images to PDF: JPG, PNG to PDF Online Free',
  excerpt: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF or create separate PDFs. Complete guide with step-by-step instructions.',
  slug: 'convert-images-to-pdf',
  focusKeyword: 'convert images to PDF',
  secondaryKeywords: [
    'jpg to pdf',
    'png to pdf',
    'multiple images to one pdf',
    'convert photos to pdf online',
    'image to PDF converter',
    'pictures to PDF'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2024-01-25T10:00:00.000Z',
  dateModified: '2024-01-25T10:00:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'why-convert-images-to-pdf', text: 'Why Convert Images to PDF?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'supported-formats', text: 'Supported Image Formats', level: 2 },
  { id: 'conversion-options', text: 'Conversion Options', level: 2 },
  { id: 'common-use-cases', text: 'Common Use Cases', level: 2 },
  { id: 'quality-optimization', text: 'Quality Optimization Tips', level: 2 },
  { id: 'troubleshooting', text: 'Troubleshooting Common Issues', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'Can I convert multiple images to one PDF?',
    answer: 'Yes! ConvertMorph allows you to combine multiple JPG, PNG, and other image files into a single PDF document. Each image becomes a separate page in the PDF, and you can arrange them in any order you prefer.'
  },
  {
    question: 'What image formats can I convert to PDF?',
    answer: 'ConvertMorph supports the most common image formats including JPG/JPEG, PNG, and more. The tool automatically detects your image format and converts it to high-quality PDF while preserving the original resolution.'
  },
  {
    question: 'Is there a limit on image file size?',
    answer: 'You can convert images up to 10MB each, with support for multiple images in a single conversion. For larger images, consider compressing them first or contact us for enterprise solutions.'
  },
  {
    question: 'Will converting images to PDF reduce quality?',
    answer: 'No, ConvertMorph preserves the original image quality during conversion. The PDF will maintain the same resolution and clarity as your source images, ensuring professional results.'
  },
  {
    question: 'Can I convert images to PDF on mobile devices?',
    answer: 'Absolutely! ConvertMorph works perfectly on smartphones and tablets. You can take photos with your mobile device and convert them to PDF instantly without needing a computer.'
  },
  {
    question: 'Is it free to convert images to PDF?',
    answer: 'Yes, ConvertMorph\'s image to PDF converter is completely free with no registration required. You can convert unlimited images without watermarks or restrictions.'
  }
];

// Breadcrumbs data
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Convert Images to PDF', url: '/blog/convert-images-to-pdf' }
];

export default function ImagesToPDFGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbsJsonLd(breadcrumbs)} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
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
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="grid lg:grid-cols-4 gap-4 lg:gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
                <header className="mb-6 lg:mb-8">
                  <h1 id="main-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4 leading-tight">
                    Convert Images to PDF: Complete Guide 2024
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>January 25, 2024</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      PDF Tools
                    </span>
                  </div>
                  
                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Need to <strong>convert images to PDF</strong> quickly and easily? Whether you want to transform 
                    <strong>JPG to PDF</strong>, <strong>PNG to PDF</strong>, or combine <strong>multiple images to one PDF</strong>, 
                    this comprehensive guide shows you how to <strong>convert photos to PDF online</strong> with professional results.
                  </p>
                </header>

                {/* Tool CTA - Early placement */}
                <ToolCTA toolSlug="images-to-pdf" variant="compact" className="mb-6 lg:mb-8" />

                <div className="blog-prose">
                  <h2 id="why-convert-images-to-pdf">Why Convert Images to PDF?</h2>
                  <p>
                    An <strong>image to PDF converter</strong> is essential for modern document management. Here's why you need to <strong>convert pictures to PDF</strong>:
                  </p>
                  <ul>
                    <li><strong>Universal compatibility:</strong> PDFs open on any device, platform, or operating system</li>
                    <li><strong>Professional presentation:</strong> Create polished documents from photos and images</li>
                    <li><strong>Easy sharing:</strong> Send multiple images as a single, organized file</li>
                    <li><strong>Print optimization:</strong> Maintain image quality and layout for professional printing</li>
                    <li><strong>Document archiving:</strong> Preserve images in a standardized, long-term format</li>
                    <li><strong>Size management:</strong> Combine multiple images efficiently without quality loss</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our <strong>image to PDF converter</strong> makes it simple to <strong>convert photos to PDF online</strong>. 
                    Here's the straightforward process:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Upload Your Images</h4>
                        <p>Drag and drop your JPG, PNG, or other image files. Support for multiple images with instant preview.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Choose Conversion Options</h4>
                        <p>Select single PDF with multiple pages or individual PDFs. Arrange images in your preferred order.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Download Your PDF</h4>
                        <p>Get your converted PDF files instantly. All processing happens securely in your browser.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Image to PDF Converter</h4>
                    <p>
                      Transform your images into professional PDF documents now. Free, fast, and secure conversion 
                      with no registration required.
                    </p>
                    <Link 
                      href="/tools/images-to-pdf" 
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Convert Images to PDF Now
                    </Link>
                  </div>

                  <h2 id="supported-formats">Supported Image Formats</h2>
                  <p>
                    Our <strong>image to PDF converter</strong> supports all popular image formats for maximum flexibility:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Extension</th>
                        <th>Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>JPEG/JPG</td>
                        <td>.jpg, .jpeg</td>
                        <td>Photos, digital images, web graphics</td>
                      </tr>
                      <tr>
                        <td>PNG</td>
                        <td>.png</td>
                        <td>Images with transparency, logos, screenshots</td>
                      </tr>
                      <tr>
                        <td>WEBP</td>
                        <td>.webp</td>
                        <td>Modern web images, optimized graphics</td>
                      </tr>
                      <tr>
                        <td>BMP</td>
                        <td>.bmp</td>
                        <td>Uncompressed images, Windows graphics</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="callout callout-info">
                    <h4>Format Recommendations</h4>
                    <ul>
                      <li><strong>JPG to PDF:</strong> Perfect for photographs and complex images with many colors</li>
                      <li><strong>PNG to PDF:</strong> Ideal for images with text, logos, or transparent backgrounds</li>
                      <li><strong>Multiple formats:</strong> Mix different image types in a single PDF conversion</li>
                    </ul>
                  </div>

                  <h2 id="conversion-options">Conversion Options</h2>
                  
                  <h3>Single PDF with Multiple Pages</h3>
                  <p>Combine <strong>multiple images to one PDF</strong> where each image becomes a separate page. Perfect for:</p>
                  <ul>
                    <li><strong>Photo albums:</strong> Create digital photo books from your pictures</li>
                    <li><strong>Document scanning:</strong> Combine receipt photos, contracts, and forms</li>
                    <li><strong>Presentation materials:</strong> Merge slides, charts, and graphics</li>
                    <li><strong>Recipe collections:</strong> Digitize handwritten or printed recipes</li>
                    <li><strong>Art portfolios:</strong> Showcase artwork in professional format</li>
                  </ul>

                  <h3>Individual PDFs</h3>
                  <p>Convert each image to its own PDF file. Ideal for:</p>
                  <ul>
                    <li><strong>Individual document archiving:</strong> Separate files for different purposes</li>
                    <li><strong>Organized file management:</strong> Keep related images in separate PDFs</li>
                    <li><strong>Different distribution needs:</strong> Send specific images to different recipients</li>
                    <li><strong>Quality control:</strong> Process images with different settings individually</li>
                  </ul>

                  <h2 id="common-use-cases">Common Use Cases</h2>
                  
                  <h3>Business Applications</h3>
                  <p>Professional uses for <strong>image to PDF converter</strong> tools:</p>
                  <ul>
                    <li><strong>Invoice and receipt management:</strong> <strong>Convert photos to PDF online</strong> for accounting</li>
                    <li><strong>Document digitization:</strong> Transform paper documents to digital format</li>
                    <li><strong>Product catalogs:</strong> Create professional product documentation</li>
                    <li><strong>Marketing materials:</strong> Convert design mockups and promotional images</li>
                    <li><strong>Legal documentation:</strong> Digitize contracts, agreements, and evidence</li>
                  </ul>

                  <h3>Personal Projects</h3>
                  <p>Creative uses for <strong>pictures to PDF</strong> conversion:</p>
                  <ul>
                    <li><strong>Travel documentation:</strong> Combine travel photos and itineraries</li>
                    <li><strong>Family memories:</strong> Create digital photo albums and scrapbooks</li>
                    <li><strong>Educational materials:</strong> Convert study notes and reference images</li>
                    <li><strong>Hobby projects:</strong> Document crafts, recipes, and DIY projects</li>
                    <li><strong>Real estate:</strong> Create property portfolios with photos and details</li>
                  </ul>

                  <h3>Mobile Photography</h3>
                  <p>Perfect for smartphone users who want to <strong>convert photos to PDF online</strong>:</p>
                  <ul>
                    <li><strong>Document scanning:</strong> Turn phone photos into professional PDFs</li>
                    <li><strong>Social media archiving:</strong> Preserve important posts and images</li>
                    <li><strong>Event documentation:</strong> Create event albums from mobile photos</li>
                    <li><strong>Quick sharing:</strong> Convert and send images instantly</li>
                  </ul>

                  <h2 id="quality-optimization">Quality Optimization Tips</h2>
                  <p>
                    Get the best results when you <strong>convert images to PDF</strong> with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Use high-resolution images:</strong> Start with the highest quality source images available</li>
                    <li><strong>Consistent orientation:</strong> Rotate images before conversion for uniform appearance</li>
                    <li><strong>Proper lighting:</strong> Ensure good lighting when photographing documents</li>
                    <li><strong>Clean backgrounds:</strong> Remove clutter for professional-looking results</li>
                    <li><strong>File size balance:</strong> Consider compression vs. quality trade-offs for your needs</li>
                    <li><strong>Format selection:</strong> Choose the right image format for your content type</li>
                  </ul>

                  <div className="callout callout-warning">
                    <h4>Quality Best Practices</h4>
                    <ul>
                      <li>Avoid converting already compressed images multiple times</li>
                      <li>Use PNG for images with text or sharp edges</li>
                      <li>Choose JPG for photographs and complex color images</li>
                      <li>Test different settings to find the optimal balance</li>
                    </ul>
                  </div>

                  <h2 id="troubleshooting">Troubleshooting Common Issues</h2>
                  
                  <h3>Large File Sizes</h3>
                  <p>If your PDF becomes too large after converting <strong>multiple images to one PDF</strong>:</p>
                  <ul>
                    <li><strong>Compress images first:</strong> Reduce image file sizes before conversion</li>
                    <li><strong>Lower resolution:</strong> Use appropriate resolution for your intended use</li>
                    <li><strong>Separate PDFs:</strong> Create multiple smaller PDFs instead of one large file</li>
                    <li><strong>Optimize format:</strong> Choose JPG for photos, PNG for graphics with text</li>
                  </ul>

                  <h3>Quality Issues</h3>
                  <p>To maintain quality when you <strong>convert photos to PDF online</strong>:</p>
                  <ul>
                    <li><strong>Start with high-quality sources:</strong> Use the best available image files</li>
                    <li><strong>Avoid multiple conversions:</strong> Convert directly from original images</li>
                    <li><strong>Check PDF settings:</strong> Ensure quality preferences are set correctly</li>
                    <li><strong>Test different tools:</strong> Compare results from different converters if needed</li>
                  </ul>

                  <h3>Upload Problems</h3>
                  <p>If you encounter issues uploading images:</p>
                  <ul>
                    <li><strong>Check file size limits:</strong> Ensure images are under the maximum size</li>
                    <li><strong>Verify format support:</strong> Use supported image formats (JPG, PNG, etc.)</li>
                    <li><strong>Clear browser cache:</strong> Refresh the page and try again</li>
                    <li><strong>Check internet connection:</strong> Ensure stable connectivity for uploads</li>
                  </ul>

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
                    Learning how to <strong>convert images to PDF</strong> is an essential skill in our digital world. Whether you need to 
                    transform <strong>JPG to PDF</strong>, <strong>PNG to PDF</strong>, or combine <strong>multiple images to one PDF</strong>, 
                    the right <strong>image to PDF converter</strong> makes the process simple and efficient.
                  </p>
                  <p>
                    ConvertMorph provides a powerful, free solution that works directly in your browser, ensuring your images 
                    remain private while delivering professional results. With support for multiple formats, batch processing, 
                    and mobile devices, it's the perfect tool to <strong>convert photos to PDF online</strong> for any purpose.
                  </p>

                  {/* Final CTA */}
                  <ToolCTA toolSlug="images-to-pdf" variant="featured" className="mt-6 lg:mt-8" />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="space-y-4 lg:space-y-8">
                {/* Table of Contents - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <BlogTOC headings={headings} className="sticky top-24" />
                </div>
                
                {/* Related Posts - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block">
                  <RelatedPosts 
                    currentSlug="convert-images-to-pdf" 
                    count={2} 
                    variant="list" 
                  />
                </div>
              </div>
            </div>

            {/* Mobile Related Posts - Shown only on mobile, after main content */}
            <div className="lg:hidden order-3 col-span-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-6">
                <RelatedPosts 
                  currentSlug="convert-images-to-pdf" 
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
