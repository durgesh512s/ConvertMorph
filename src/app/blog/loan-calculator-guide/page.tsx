import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, TrendingUp, DollarSign, Clock, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount | ConvertMorph',
  description: 'Use our free loan calculator to calculate EMI, total interest, and repayment amount for home loans, personal loans, car loans, and more. Get instant results with detailed breakdown.',
  keywords: ['loan calculator', 'EMI calculator', 'home loan calculator', 'personal loan calculator', 'car loan calculator', 'loan EMI', 'interest calculator', 'loan repayment'],
  authors: [{ name: 'ConvertMorph Team' }],
  creator: 'ConvertMorph',
  publisher: 'ConvertMorph',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://convertmorph.com'),
  alternates: {
    canonical: '/blog/loan-calculator-guide',
  },
  openGraph: {
    title: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount',
    description: 'Use our free loan calculator to calculate EMI, total interest, and repayment amount for home loans, personal loans, car loans, and more. Get instant results with detailed breakdown.',
    url: '/blog/loan-calculator-guide',
    siteName: 'ConvertMorph',
    images: [
      {
        url: '/og/blog/loan-calculator-guide.png',
        width: 1200,
        height: 630,
        alt: 'Loan Calculator Guide - ConvertMorph',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount',
    description: 'Use our free loan calculator to calculate EMI, total interest, and repayment amount for home loans, personal loans, car loans, and more.',
    images: ['/og/blog/loan-calculator-guide.png'],
    creator: '@convertmorph',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Loan Calculator Guide: Calculate EMI, Interest & Total Amount',
  description: 'Comprehensive guide on using loan calculators to calculate EMI, interest rates, and total repayment amounts for different types of loans.',
  image: 'https://convertmorph.com/og/blog/loan-calculator-guide.png',
  author: {
    '@type': 'Organization',
    name: 'ConvertMorph Team',
    url: 'https://convertmorph.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ConvertMorph',
    logo: {
      '@type': 'ImageObject',
      url: 'https://convertmorph.com/logo/logo-mark.svg',
    },
  },
  datePublished: '2025-08-01T10:00:00.000Z',
  dateModified: '2025-08-01T10:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://convertmorph.com/blog/loan-calculator-guide',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does a loan calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A loan calculator uses the loan amount, interest rate, and tenure to calculate your EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of loans can I calculate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can calculate EMI for various loan types including home loans, personal loans, car loans, education loans, and business loans. Each loan type may have different interest rates and tenure options.',
      },
    },
    {
      '@type': 'Question',
      name: 'What factors affect my loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your loan EMI is affected by three main factors: loan amount (principal), interest rate, and loan tenure. Higher loan amounts and interest rates increase EMI, while longer tenure reduces EMI but increases total interest paid.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose a longer or shorter loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shorter tenure means higher EMI but lower total interest cost. Longer tenure means lower EMI but higher total interest cost. Choose based on your monthly budget and long-term financial goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I prepay my loan to reduce interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most loans allow prepayment. You can make partial prepayments to reduce principal amount, which decreases future interest burden. Some lenders may charge prepayment penalties, so check terms before prepaying.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between fixed and floating interest rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fixed interest rates remain constant throughout the loan tenure, providing EMI certainty. Floating rates change with market conditions, potentially offering savings when rates fall but increasing EMI when rates rise.',
      },
    },
  ],
}

export default function LoanCalculatorGuidePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span>Loan Calculator Guide</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Financial Tools</Badge>
            <Badge variant="outline">Loan Planning</Badge>
            <Badge variant="outline">EMI Calculator</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Loan Calculator Guide: Calculate EMI, Interest & Total Amount
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            Master loan calculations with our comprehensive guide. Learn how to calculate EMI, compare loan options, and make informed borrowing decisions for home loans, personal loans, and more.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Published on August 1, 2025</span>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span>By ConvertMorph Team</span>
          </div>
        </div>

        <div className="mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Try Our Loan Calculator</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Calculate your loan EMI instantly with our free online loan calculator. Get detailed breakdown of principal, interest, and total amount.
              </p>
              <Link 
                href="/tools/loan-calculator"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 font-medium transition-colors"
              >
                Calculate Loan EMI Now
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>What is a Loan Calculator?</h2>
          <p>
            A loan calculator is a financial tool that helps you determine your Equated Monthly Installment (EMI), 
            total interest payable, and total repayment amount for any loan. Whether you're planning to buy a home, 
            car, or need personal financing, a loan calculator provides instant calculations to help you make 
            informed financial decisions.
          </p>

          <h2>How Does Loan Calculation Work?</h2>
          <p>
            Loan EMI calculation uses a standard mathematical formula that considers three key factors:
          </p>
          <ul>
            <li><strong>Principal Amount (P):</strong> The loan amount you borrow</li>
            <li><strong>Interest Rate (r):</strong> Annual interest rate divided by 12 for monthly rate</li>
            <li><strong>Tenure (n):</strong> Loan duration in months</li>
          </ul>
          
          <p>
            The EMI formula is: <strong>EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong>
          </p>

          <h2>Types of Loans You Can Calculate</h2>
          
          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Home Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate EMI for home loans with tenure up to 30 years. Compare different loan amounts and interest rates.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Personal Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate EMI for personal loans with flexible tenure options. Ideal for immediate financial needs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  Car Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate auto loan EMI with competitive interest rates. Plan your vehicle purchase effectively.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Education Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate education loan EMI with moratorium period consideration. Plan your educational expenses.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>How to Use ConvertMorph Loan Calculator</h2>
          <ol>
            <li><strong>Enter Loan Amount:</strong> Input the principal amount you want to borrow</li>
            <li><strong>Set Interest Rate:</strong> Enter the annual interest rate offered by your lender</li>
            <li><strong>Choose Tenure:</strong> Select loan duration in years or months</li>
            <li><strong>Select Loan Type:</strong> Choose from home, personal, car, education, or business loan</li>
            <li><strong>Get Results:</strong> View EMI, total interest, and repayment amount instantly</li>
            <li><strong>Analyze Breakdown:</strong> Review detailed payment schedule and interest breakdown</li>
          </ol>

          <h2>Factors Affecting Your Loan EMI</h2>
          
          <h3>1. Loan Amount (Principal)</h3>
          <p>
            Higher loan amounts result in higher EMIs. Consider borrowing only what you need and can comfortably repay.
          </p>

          <h3>2. Interest Rate</h3>
          <p>
            Interest rates vary based on loan type, lender, credit score, and market conditions. Even a 0.5% difference 
            can significantly impact your total interest cost.
          </p>

          <h3>3. Loan Tenure</h3>
          <p>
            Longer tenure reduces EMI but increases total interest cost. Shorter tenure means higher EMI but lower 
            overall interest burden.
          </p>

          <h3>4. Credit Score</h3>
          <p>
            Higher credit scores (750+) typically qualify for better interest rates, reducing your EMI and total cost.
          </p>

          <h2>Tips for Smart Loan Planning</h2>
          
          <h3>Compare Multiple Lenders</h3>
          <p>
            Use the loan calculator to compare offers from different lenders. Small differences in interest rates 
            can save thousands over the loan tenure.
          </p>

          <h3>Consider Total Cost, Not Just EMI</h3>
          <p>
            While longer tenure reduces EMI, it increases total interest cost. Balance affordability with cost efficiency.
          </p>

          <h3>Plan for Prepayments</h3>
          <p>
            If possible, make partial prepayments to reduce principal amount. This significantly reduces future 
            interest burden.
          </p>

          <h3>Maintain Good Credit Score</h3>
          <p>
            A good credit score helps you negotiate better interest rates, reducing your EMI and total loan cost.
          </p>

          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6 not-prose">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does a loan calculator work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A loan calculator uses the loan amount, interest rate, and tenure to calculate your EMI using the formula: 
                  EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What types of loans can I calculate?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can calculate EMI for various loan types including home loans, personal loans, car loans, education loans, 
                  and business loans. Each loan type may have different interest rates and tenure options.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What factors affect my loan EMI?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your loan EMI is affected by three main factors: loan amount (principal), interest rate, and loan tenure. 
                  Higher loan amounts and interest rates increase EMI, while longer tenure reduces EMI but increases total interest paid.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Should I choose a longer or shorter loan tenure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Shorter tenure means higher EMI but lower total interest cost. Longer tenure means lower EMI but higher total interest cost. 
                  Choose based on your monthly budget and long-term financial goals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I prepay my loan to reduce interest?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, most loans allow prepayment. You can make partial prepayments to reduce principal amount, which decreases future 
                  interest burden. Some lenders may charge prepayment penalties, so check terms before prepaying.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the difference between fixed and floating interest rates?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fixed interest rates remain constant throughout the loan tenure, providing EMI certainty. Floating rates change with 
                  market conditions, potentially offering savings when rates fall but increasing EMI when rates rise.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Conclusion</h2>
          <p>
            A loan calculator is an essential tool for making informed borrowing decisions. By understanding how EMI calculations work 
            and comparing different loan options, you can choose the most suitable loan for your financial situation. Use ConvertMorph's 
            free loan calculator to plan your finances effectively and achieve your goals with confidence.
          </p>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Calculate Your Loan EMI?</h3>
          <p className="text-muted-foreground mb-6">
            Use our free loan calculator to get instant EMI calculations and plan your finances better.
          </p>
          <Link 
            href="/tools/loan-calculator"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 font-medium transition-colors"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Loan EMI
          </Link>
        </div>
      </div>
    </>
  )
}
