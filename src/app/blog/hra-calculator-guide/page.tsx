import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, Clock } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'HRA Calculator: Calculate Your HRA Exemption Online - Complete Guide 2025',
  excerpt: 'Calculate your HRA tax exemption instantly with our free online HRA calculator. Maximize your tax savings with detailed HRA exemption calculation as per Indian tax rules.',
  slug: 'hra-calculator-guide',
  focusKeyword: 'HRA calculator',
  secondaryKeywords: [
    'HRA exemption calculator',
    'house rent allowance',
    'calculate HRA exemption',
    'HRA tax benefit',
    'HRA calculation online',
    'HRA tax savings'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-08-01T10:00:00.000Z',
  dateModified: '2025-08-01T10:00:00.000Z',
  readingTime: '7 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'what-is-hra', text: 'What is HRA?', level: 2 },
  { id: 'how-it-works-on-convertmorph', text: 'How it Works on ConvertMorph', level: 2 },
  { id: 'hra-calculation-rules', text: 'HRA Calculation Rules', level: 2 },
  { id: 'metro-vs-non-metro', text: 'Metro vs Non-Metro Cities', level: 2 },
  { id: 'required-documents', text: 'Required Documents for HRA', level: 2 },
  { id: 'best-practices', text: 'Tips to Get Best Results', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'What is HRA exemption?',
    answer: 'HRA (House Rent Allowance) exemption is a tax benefit available to salaried employees who receive HRA from their employer and pay rent for accommodation. The exemption reduces your taxable income.'
  },
  {
    question: 'How is HRA exemption calculated?',
    answer: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of basic salary for metro cities or 40% for non-metro cities, (3) Rent paid minus 10% of basic salary.'
  },
  {
    question: 'Which cities are considered metro cities?',
    answer: 'Mumbai, Delhi, Kolkata, and Chennai are considered metro cities for HRA calculation purposes. All other cities are treated as non-metro cities.'
  },
  {
    question: 'Can I claim HRA if I live in my own house?',
    answer: 'No, you cannot claim HRA exemption if you live in your own house. HRA exemption is only available when you pay rent for accommodation.'
  },
  {
    question: 'What documents are required for HRA exemption?',
    answer: 'You need rent receipts, rental agreement, and landlord\'s PAN card (if annual rent exceeds ₹1 lakh). Some employers may also require a declaration form.'
  },
  {
    question: 'Can I claim both HRA and home loan interest deduction?',
    answer: 'Yes, you can claim both if you live in a rented house and have a home loan for a different property. However, you cannot claim HRA for the same property where you claim home loan benefits.'
  }
];


export default function HRACalculatorGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD removed - handled by UnifiedBreadcrumb component in layout */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
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
                    HRA Calculator: Calculate Your HRA Exemption Online - Complete Guide 2025
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>August 1, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">
                      Financial Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Maximize your tax savings with HRA exemption. Use our free HRA calculator to determine your 
                    eligible tax exemption amount and optimize your tax planning as per Indian Income Tax rules.
                  </p>
                </header>

                <div className="blog-prose">
                  <h2 id="what-is-hra">What is HRA?</h2>
                  <p>
                    HRA (House Rent Allowance) is a component of salary paid by employers to employees to meet 
                    their accommodation expenses. Under Section 10(13A) of the Income Tax Act, a portion of HRA 
                    received can be claimed as tax exemption, reducing your taxable income and overall tax liability.
                  </p>
                  <p>
                    HRA exemption is beneficial because it:
                  </p>
                  <ul>
                    <li><strong>Reduces taxable income:</strong> Lower tax liability through legitimate exemption</li>
                    <li><strong>Supports housing costs:</strong> Helps offset rental expenses for accommodation</li>
                    <li><strong>Flexible benefit:</strong> Available to all salaried employees receiving HRA</li>
                    <li><strong>No investment required:</strong> Unlike other tax benefits, no additional investment needed</li>
                    <li><strong>Immediate benefit:</strong> Reduces tax deduction at source (TDS) from salary</li>
                  </ul>

                  <h2 id="how-it-works-on-convertmorph">How it Works on ConvertMorph</h2>
                  <p>
                    Our HRA calculator provides instant, accurate calculations based on current tax rules. 
                    Here's how to use it effectively:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Enter Salary Details</h4>
                        <p>Input your basic salary, HRA received, and actual rent paid. Select your city type (metro or non-metro).</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Get Exemption Calculation</h4>
                        <p>View your HRA exemption amount, taxable HRA, and detailed calculation breakdown.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Plan Tax Savings</h4>
                        <p>See your annual tax savings and optimize your rental arrangements for maximum benefit.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph HRA Calculator</h4>
                    <p>
                      Calculate your HRA exemption now with our free online tool. Get instant results 
                      and maximize your tax savings with proper HRA planning.
                    </p>
                    <Link 
                      href="/tools/hra-calculator" 
                      className="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors mt-3"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Calculate HRA Exemption
                    </Link>
                  </div>

                  <h2 id="hra-calculation-rules">HRA Calculation Rules</h2>
                  <p>
                    HRA exemption is calculated as the minimum of three components as per Income Tax rules:
                  </p>
                  
                  <div className="callout callout-info">
                    <h4>HRA Exemption Formula</h4>
                    <p><strong>Exemption = Minimum of:</strong></p>
                    <ul>
                      <li><strong>Component 1:</strong> Actual HRA received from employer</li>
                      <li><strong>Component 2:</strong> 50% of basic salary (metro) or 40% (non-metro)</li>
                      <li><strong>Component 3:</strong> Rent paid minus 10% of basic salary</li>
                    </ul>
                  </div>

                  <p>
                    For example, if you work in Mumbai with basic salary ₹60,000, HRA ₹25,000, and rent ₹20,000:
                  </p>
                  <ul>
                    <li>Component 1: ₹25,000 (actual HRA)</li>
                    <li>Component 2: ₹30,000 (50% of ₹60,000)</li>
                    <li>Component 3: ₹14,000 (₹20,000 - ₹6,000)</li>
                    <li>HRA Exemption: ₹14,000 (minimum of above three)</li>
                    <li>Taxable HRA: ₹11,000 (₹25,000 - ₹14,000)</li>
                  </ul>

                  <h2 id="metro-vs-non-metro">Metro vs Non-Metro Cities</h2>
                  <p>
                    The classification of your city significantly impacts your HRA exemption calculation:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>City Type</th>
                        <th>Cities Included</th>
                        <th>Basic Salary %</th>
                        <th>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Metro Cities</td>
                        <td>Mumbai, Delhi, Kolkata, Chennai</td>
                        <td>50%</td>
                        <td>Higher exemption potential</td>
                      </tr>
                      <tr>
                        <td>Non-Metro Cities</td>
                        <td>All other cities and towns</td>
                        <td>40%</td>
                        <td>Lower exemption potential</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="callout callout-info">
                    <h4>Important Note</h4>
                    <p>
                      The metro/non-metro classification is based on where you work, not where you live. 
                      If you work in Mumbai but live in Navi Mumbai, you're still eligible for metro rates.
                    </p>
                  </div>

                  <h2 id="required-documents">Required Documents for HRA</h2>
                  <p>
                    To claim HRA exemption, you need to provide specific documents to your employer:
                  </p>
                  <ul>
                    <li><strong>Rent Receipts:</strong> Monthly receipts from landlord with revenue stamp (if rent &gt; ₹3,000/month)</li>
                    <li><strong>Rental Agreement:</strong> Copy of registered rental agreement</li>
                    <li><strong>Landlord's PAN:</strong> Required if annual rent exceeds ₹1 lakh</li>
                    <li><strong>Declaration Form:</strong> HRA declaration form provided by employer</li>
                    <li><strong>Address Proof:</strong> Proof of rented accommodation address</li>
                  </ul>

                  <h2 id="best-practices">Tips to Get Best Results</h2>
                  <p>
                    Maximize your HRA tax benefits with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Optimize rent amount:</strong> Ensure rent is more than 10% of basic salary for exemption</li>
                    <li><strong>Choose metro locations:</strong> Work in metro cities for higher exemption rates</li>
                    <li><strong>Maintain proper records:</strong> Keep all rent receipts and agreements organized</li>
                    <li><strong>Plan salary structure:</strong> Negotiate higher basic salary component for better HRA</li>
                    <li><strong>Combine with other benefits:</strong> Use alongside home loan interest for different properties</li>
                    <li><strong>Review annually:</strong> Reassess HRA benefits during salary negotiations</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: HRA Optimization</h4>
                    <p>
                      If your rent is less than 10% of basic salary, consider increasing it slightly 
                      to become eligible for HRA exemption. The tax savings often justify the extra cost.
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
                    HRA exemption is one of the most accessible tax benefits for salaried employees. 
                    Our HRA calculator helps you understand your eligible exemption and plan your 
                    accommodation expenses for maximum tax efficiency.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Calculate Your HRA Exemption</h4>
                    <p>
                      Ready to optimize your tax savings? Use our HRA calculator to determine your 
                      eligible exemption and reduce your tax liability effectively.
                    </p>
                    <Link 
                      href="/tools/hra-calculator" 
                      className="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors mt-3"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Calculate HRA Exemption
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
                    currentSlug="hra-calculator-guide" 
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
                  currentSlug="hra-calculator-guide" 
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
