import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, Clock } from 'lucide-react';
import { buildPostMetadata, articleJsonLd, faqJsonLd, BlogPostMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { BlogTOC } from '@/components/BlogTOC';
import { ToolCTA } from '@/components/RelatedCTA';
import { RelatedPosts } from '@/components/ReadNext';
import '@/styles/blog.css';

// Blog post metadata
const postData: BlogPostMetadata = {
  title: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount',
  excerpt: 'Master loan calculations with our comprehensive guide. Learn how to calculate EMI, compare loan options, and make informed borrowing decisions for home loans, personal loans, and more.',
  slug: 'loan-calculator-guide',
  focusKeyword: 'loan calculator',
  secondaryKeywords: [
    'EMI calculator',
    'home loan calculator',
    'personal loan calculator',
    'car loan calculator',
    'loan EMI',
    'interest calculator'
  ],
  author: 'ConvertMorph Team',
  datePublished: '2025-08-01T10:00:00.000Z',
  dateModified: '2025-08-01T10:00:00.000Z',
  readingTime: '8 min read'
};

export const metadata: Metadata = buildPostMetadata(postData);

// Table of contents data
const headings = [
  { id: 'what-is-loan-calculator', text: 'What is a Loan Calculator?', level: 2 },
  { id: 'how-loan-calculation-works', text: 'How Does Loan Calculation Work?', level: 2 },
  { id: 'types-of-loans', text: 'Types of Loans You Can Calculate', level: 2 },
  { id: 'how-to-use-calculator', text: 'How to Use ConvertMorph Loan Calculator', level: 2 },
  { id: 'factors-affecting-emi', text: 'Factors Affecting Your Loan EMI', level: 2 },
  { id: 'smart-loan-planning', text: 'Tips for Smart Loan Planning', level: 2 },
  { id: 'faq', text: 'Frequently Asked Questions', level: 2 }
];

// FAQ data
const faqs = [
  {
    question: 'How does a loan calculator work?',
    answer: 'A loan calculator uses the loan amount, interest rate, and tenure to calculate your EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.'
  },
  {
    question: 'What types of loans can I calculate?',
    answer: 'You can calculate EMI for various loan types including home loans, personal loans, car loans, education loans, and business loans. Each loan type may have different interest rates and tenure options.'
  },
  {
    question: 'What factors affect my loan EMI?',
    answer: 'Your loan EMI is affected by three main factors: loan amount (principal), interest rate, and loan tenure. Higher loan amounts and interest rates increase EMI, while longer tenure reduces EMI but increases total interest paid.'
  },
  {
    question: 'Should I choose a longer or shorter loan tenure?',
    answer: 'Shorter tenure means higher EMI but lower total interest cost. Longer tenure means lower EMI but higher total interest cost. Choose based on your monthly budget and long-term financial goals.'
  },
  {
    question: 'Can I prepay my loan to reduce interest?',
    answer: 'Yes, most loans allow prepayment. You can make partial prepayments to reduce principal amount, which decreases future interest burden. Some lenders may charge prepayment penalties, so check terms before prepaying.'
  },
  {
    question: 'What is the difference between fixed and floating interest rates?',
    answer: 'Fixed interest rates remain constant throughout the loan tenure, providing EMI certainty. Floating rates change with market conditions, potentially offering savings when rates fall but increasing EMI when rates rise.'
  }
];


export default function LoanCalculatorGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd(postData)} />
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Breadcrumb JSON-LD removed - handled by UnifiedBreadcrumb component in layout */}

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
                    Loan Calculator Guide: Calculate EMI, Interest & Total Amount
                  </h1>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 lg:mb-6 flex-wrap gap-2 sm:gap-4">
                    <time dateTime={postData.datePublished}>August 1, 2025</time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {postData.readingTime}
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      Financial Tools
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Master loan calculations with our comprehensive guide. Learn how to calculate EMI, compare loan 
                    options, and make informed borrowing decisions for home loans, personal loans, and more.
                  </p>
                </header>

                <div className="blog-prose">
                  <h2 id="what-is-loan-calculator">What is a Loan Calculator?</h2>
                  <p>
                    A loan calculator is a financial tool that helps you determine your Equated Monthly Installment (EMI), 
                    total interest payable, and total repayment amount for any loan. Whether you're planning to buy a home, 
                    car, or need personal financing, a loan calculator provides instant calculations to help you make 
                    informed financial decisions.
                  </p>
                  <p>
                    Understanding loan calculations is crucial for financial planning as it helps you:
                  </p>
                  <ul>
                    <li><strong>Budget effectively:</strong> Know exactly how much you need to pay each month</li>
                    <li><strong>Compare loan options:</strong> Evaluate different lenders and loan terms</li>
                    <li><strong>Plan finances:</strong> Ensure you can afford the monthly payments</li>
                    <li><strong>Calculate total cost:</strong> Understand the total amount you'll pay over the loan term</li>
                    <li><strong>Make informed decisions:</strong> Choose the right loan amount and tenure</li>
                  </ul>

                  <h2 id="how-loan-calculation-works">How Does Loan Calculation Work?</h2>
                  <p>
                    Loan EMI calculation uses a standard mathematical formula that considers three key factors:
                  </p>
                  <ul>
                    <li><strong>Principal Amount (P):</strong> The loan amount you borrow</li>
                    <li><strong>Interest Rate (r):</strong> Annual interest rate divided by 12 for monthly rate</li>
                    <li><strong>Tenure (n):</strong> Loan duration in months</li>
                  </ul>
                  
                  <div className="callout callout-info">
                    <h4>Loan EMI Formula</h4>
                    <p><strong>EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong></p>
                    <p>Where:</p>
                    <ul>
                      <li><strong>P</strong> = Principal loan amount</li>
                      <li><strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                      <li><strong>n</strong> = Number of monthly installments (Years × 12)</li>
                    </ul>
                  </div>

                  <p>
                    For example, if you take a home loan of ₹30 lakhs at 9% annual interest for 20 years:
                  </p>
                  <ul>
                    <li>P = ₹30,00,000</li>
                    <li>r = 9 ÷ 12 ÷ 100 = 0.0075</li>
                    <li>n = 20 × 12 = 240 months</li>
                    <li>EMI = ₹26,992 (approximately)</li>
                  </ul>

                  <h2 id="types-of-loans">Types of Loans You Can Calculate</h2>
                  <p>
                    Different types of loans have varying EMI characteristics and typical terms:
                  </p>
                  <ul>
                    <li><strong>Home Loans:</strong> Longest tenure (15-30 years), lowest interest rates (8-10%)</li>
                    <li><strong>Personal Loans:</strong> Short tenure (1-5 years), higher interest rates (10-18%)</li>
                    <li><strong>Car Loans:</strong> Medium tenure (3-7 years), moderate interest rates (7-12%)</li>
                    <li><strong>Education Loans:</strong> Long tenure (5-15 years), competitive rates (8-12%)</li>
                    <li><strong>Business Loans:</strong> Variable tenure (1-10 years), higher rates (10-20%)</li>
                  </ul>

                  <h2 id="how-to-use-calculator">How to Use ConvertMorph Loan Calculator</h2>
                  <p>
                    Our loan calculator provides instant, accurate calculations with detailed breakdowns. 
                    Here's how to use it effectively:
                  </p>
                  
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Enter Loan Details</h4>
                        <p>Input your loan amount, interest rate, and tenure. The calculator accepts amounts from ₹10,000 to ₹10 crores.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Select Loan Type</h4>
                        <p>Choose from home, personal, car, education, or business loan for accurate calculations.</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Get Instant Results</h4>
                        <p>View your monthly EMI, total interest payable, and total amount with a detailed breakdown.</p>
                      </div>
                    </div>
                  </div>

                  <div className="callout callout-success">
                    <h4>Try ConvertMorph Loan Calculator</h4>
                    <p>
                      Calculate your loan EMI now with our free online tool. Get detailed breakdown 
                      and compare different loan scenarios instantly.
                    </p>
                    <Link 
                      href="/tools/loan-calculator" 
                      className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-3"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Loan EMI Now
                    </Link>
                  </div>

                  <h2 id="factors-affecting-emi">Factors Affecting Your Loan EMI</h2>
                  <p>
                    Several factors influence your EMI amount. Understanding these helps you optimize your loan terms:
                  </p>
                  
                  <table>
                    <thead>
                      <tr>
                        <th>Factor</th>
                        <th>Impact on EMI</th>
                        <th>Impact on Total Interest</th>
                        <th>Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Higher Loan Amount</td>
                        <td>Increases EMI</td>
                        <td>Increases total interest</td>
                        <td>Borrow only what you need</td>
                      </tr>
                      <tr>
                        <td>Higher Interest Rate</td>
                        <td>Increases EMI</td>
                        <td>Significantly increases total interest</td>
                        <td>Shop for best rates, improve credit score</td>
                      </tr>
                      <tr>
                        <td>Longer Tenure</td>
                        <td>Decreases EMI</td>
                        <td>Increases total interest</td>
                        <td>Balance affordability with total cost</td>
                      </tr>
                      <tr>
                        <td>Shorter Tenure</td>
                        <td>Increases EMI</td>
                        <td>Decreases total interest</td>
                        <td>Choose if you can afford higher EMI</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 id="smart-loan-planning">Tips for Smart Loan Planning</h2>
                  <p>
                    Maximize the benefits of loan planning with these proven strategies:
                  </p>
                  <ul>
                    <li><strong>Compare multiple lenders:</strong> Interest rates can vary significantly between banks</li>
                    <li><strong>Improve your credit score:</strong> Higher scores qualify for better interest rates</li>
                    <li><strong>Choose optimal tenure:</strong> Balance monthly affordability with total interest cost</li>
                    <li><strong>Consider prepayments:</strong> Extra payments reduce principal and total interest</li>
                    <li><strong>Factor in processing fees:</strong> Include all charges in your total cost calculation</li>
                    <li><strong>Maintain EMI-to-income ratio:</strong> Keep total EMIs under 40% of monthly income</li>
                  </ul>

                  <div className="callout callout-info">
                    <h4>Pro Tip: Loan Planning</h4>
                    <p>
                      Use our loan calculator to compare different scenarios before applying for a loan. 
                      Small changes in interest rate or tenure can significantly impact your total payment.
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
                    A loan calculator is an essential tool for making informed borrowing decisions. By understanding how EMI calculations work 
                    and comparing different loan options, you can choose the most suitable loan for your financial situation. Use ConvertMorph's 
                    free loan calculator to plan your finances effectively and achieve your goals with confidence.
                  </p>

                  {/* Final CTA */}
                  <div className="callout callout-success">
                    <h4>Start Calculating Your Loan EMI</h4>
                    <p>
                      Ready to plan your loan? Use our loan calculator now to get instant results 
                      and detailed payment schedules for better financial planning.
                    </p>
                    <Link 
                      href="/tools/loan-calculator" 
                      className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-3"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Loan EMI Now
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
                    currentSlug="loan-calculator-guide" 
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
                  currentSlug="loan-calculator-guide" 
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
