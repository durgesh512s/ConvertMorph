import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, TrendingUp, DollarSign, Clock, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Tax Calculator Guide: Calculate Income Tax Old vs New Regime | ConvertMorph',
  description: 'Use our free tax calculator to calculate income tax under old and new regime. Compare tax liability, get detailed breakdown, and choose the best tax regime for maximum savings.',
  keywords: ['tax calculator', 'income tax calculator', 'old vs new regime', 'tax calculation', 'income tax', 'tax planning', 'tax savings', 'tax regime comparison'],
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
    canonical: '/blog/tax-calculator-guide',
  },
  openGraph: {
    title: 'Tax Calculator Guide: Calculate Income Tax Old vs New Regime',
    description: 'Use our free tax calculator to calculate income tax under old and new regime. Compare tax liability, get detailed breakdown, and choose the best tax regime for maximum savings.',
    url: '/blog/tax-calculator-guide',
    siteName: 'ConvertMorph',
    images: [
      {
        url: '/og/blog/tax-calculator-guide.png',
        width: 1200,
        height: 630,
        alt: 'Tax Calculator Guide - ConvertMorph',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Calculator Guide: Calculate Income Tax Old vs New Regime',
    description: 'Use our free tax calculator to calculate income tax under old and new regime. Compare tax liability and choose the best regime.',
    images: ['/og/blog/tax-calculator-guide.png'],
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
  headline: 'Tax Calculator Guide: Calculate Income Tax Old vs New Regime',
  description: 'Comprehensive guide on using tax calculators to calculate income tax under old and new regime, compare tax liability, and optimize tax planning.',
  image: 'https://convertmorph.com/og/blog/tax-calculator-guide.png',
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
    '@id': 'https://convertmorph.com/blog/tax-calculator-guide',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the tax calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tax calculator computes your income tax liability based on current tax slabs for both old and new regime. It considers your income, deductions, and applicable tax rates to provide accurate tax calculations and regime comparison.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between old and new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The old regime allows various deductions under sections 80C, 80D, etc., with higher tax rates. The new regime offers lower tax rates but with limited deductions. Choose based on your deduction eligibility and income level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which tax regime should I choose?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose the old regime if you have significant deductions (>₹1.5 lakh annually). Choose the new regime if you have minimal deductions and want to benefit from lower tax rates. Use our calculator to compare both options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch between tax regimes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, salaried individuals can switch between regimes every year while filing ITR. Business owners who once opt for new regime cannot switch back to old regime. Choose carefully based on your financial situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What deductions are available in the old regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Old regime allows deductions under 80C (₹1.5L), 80D (health insurance), 80E (education loan), 80G (donations), HRA, LTA, and many others. These can significantly reduce your taxable income.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any deductions in the new regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new regime has limited deductions including standard deduction for salaried (₹50,000), employer contribution to NPS, and interest on home loan for self-occupied property (up to ₹2 lakh).',
      },
    },
  ],
}

export default function TaxCalculatorGuidePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span>Tax Calculator Guide</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Financial Tools</Badge>
            <Badge variant="outline">Tax Planning</Badge>
            <Badge variant="outline">Income Tax</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Tax Calculator Guide: Calculate Income Tax Old vs New Regime
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            Master income tax calculations with our comprehensive guide. Compare old vs new tax regime, understand tax slabs, and optimize your tax planning for maximum savings.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Published on August 1, 2025</span>
            <span>•</span>
            <span>9 min read</span>
            <span>•</span>
            <span>By ConvertMorph Team</span>
          </div>
        </div>

        <div className="mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Try Our Tax Calculator</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Calculate your income tax instantly with our free tax calculator. Compare old vs new regime and choose the best option for maximum tax savings.
              </p>
              <Link 
                href="/tools/tax-calculator"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 font-medium transition-colors"
              >
                Calculate Income Tax Now
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>What is a Tax Calculator?</h2>
          <p>
            A tax calculator is a financial tool that helps you compute your income tax liability based on current tax laws and slabs. 
            With the introduction of the new tax regime in India, taxpayers can now choose between two different tax structures. 
            Our tax calculator helps you compare both regimes and determine which option saves you more money.
          </p>

          <h2>Understanding Tax Regimes in India</h2>
          
          <h3>Old Tax Regime</h3>
          <p>
            The old tax regime offers numerous deductions and exemptions but has higher tax rates. Key features include:
          </p>
          <ul>
            <li>Multiple deductions under sections 80C, 80D, 80E, etc.</li>
            <li>HRA and LTA exemptions for salaried employees</li>
            <li>Higher tax slabs with rates up to 30%</li>
            <li>Standard deduction of ₹50,000 for salaried individuals</li>
          </ul>

          <h3>New Tax Regime</h3>
          <p>
            The new tax regime offers lower tax rates but with limited deductions. Key features include:
          </p>
          <ul>
            <li>Lower tax rates across all income slabs</li>
            <li>Limited deductions and exemptions</li>
            <li>Simplified tax structure</li>
            <li>No deductions under sections 80C, 80D (except few exceptions)</li>
          </ul>

          <h2>Tax Slabs Comparison (FY 2024-25)</h2>
          
          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Old Tax Regime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Up to ₹2.5L</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹2.5L - ₹5L</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹5L - ₹10L</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above ₹10L</span>
                    <span className="font-medium">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  New Tax Regime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Up to ₹3L</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹3L - ₹6L</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹6L - ₹9L</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹9L - ₹12L</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>₹12L - ₹15L</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above ₹15L</span>
                    <span className="font-medium">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>How to Use ConvertMorph Tax Calculator</h2>
          <ol>
            <li><strong>Enter Annual Income:</strong> Input your total annual income from all sources</li>
            <li><strong>Add Deductions:</strong> Enter applicable deductions for old regime calculation</li>
            <li><strong>Select Age Group:</strong> Choose your age category (below 60, 60-80, above 80)</li>
            <li><strong>View Comparison:</strong> See side-by-side comparison of both tax regimes</li>
            <li><strong>Analyze Results:</strong> Review detailed breakdown including effective tax rate</li>
            <li><strong>Make Decision:</strong> Choose the regime that offers maximum tax savings</li>
          </ol>

          <h2>Key Deductions in Old Tax Regime</h2>
          
          <h3>Section 80C Deductions (Up to ₹1.5 Lakh)</h3>
          <ul>
            <li>Employee Provident Fund (EPF)</li>
            <li>Public Provident Fund (PPF)</li>
            <li>Equity Linked Savings Scheme (ELSS)</li>
            <li>Life Insurance Premium</li>
            <li>Principal repayment of home loan</li>
            <li>Tuition fees for children</li>
            <li>National Savings Certificate (NSC)</li>
          </ul>

          <h3>Other Important Deductions</h3>
          <ul>
            <li><strong>Section 80D:</strong> Health insurance premium (up to ₹25,000)</li>
            <li><strong>Section 80E:</strong> Education loan interest (no limit)</li>
            <li><strong>Section 80G:</strong> Donations to charitable organizations</li>
            <li><strong>HRA:</strong> House Rent Allowance exemption</li>
            <li><strong>LTA:</strong> Leave Travel Allowance exemption</li>
          </ul>

          <h2>Tax Planning Tips</h2>
          
          <h3>Maximize Section 80C Investments</h3>
          <p>
            Invest the full ₹1.5 lakh limit in tax-saving instruments like ELSS, PPF, or EPF to reduce taxable income 
            in the old regime.
          </p>

          <h3>Health Insurance is Essential</h3>
          <p>
            Purchase health insurance for yourself and family to claim deductions under Section 80D while securing 
            financial protection against medical emergencies.
          </p>

          <h3>Plan Your Regime Choice</h3>
          <p>
            Calculate tax liability under both regimes annually. If your deductions exceed ₹1.5 lakh, the old regime 
            might be beneficial. Otherwise, consider the new regime.
          </p>

          <h3>Keep Investment Records</h3>
          <p>
            Maintain proper documentation of all investments and expenses to claim deductions and avoid issues during 
            tax filing or assessment.
          </p>

          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6 not-prose">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does the tax calculator work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The tax calculator computes your income tax liability based on current tax slabs for both old and new regime. 
                  It considers your income, deductions, and applicable tax rates to provide accurate tax calculations and regime comparison.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the difference between old and new tax regime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The old regime allows various deductions under sections 80C, 80D, etc., with higher tax rates. The new regime 
                  offers lower tax rates but with limited deductions. Choose based on your deduction eligibility and income level.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Which tax regime should I choose?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose the old regime if you have significant deductions ({'>'}₹1.5 lakh annually). Choose the new regime if you have 
                  minimal deductions and want to benefit from lower tax rates. Use our calculator to compare both options.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch between tax regimes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, salaried individuals can switch between regimes every year while filing ITR. Business owners who once opt 
                  for new regime cannot switch back to old regime. Choose carefully based on your financial situation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What deductions are available in the old regime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Old regime allows deductions under 80C (₹1.5L), 80D (health insurance), 80E (education loan), 80G (donations), 
                  HRA, LTA, and many others. These can significantly reduce your taxable income.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are there any deductions in the new regime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The new regime has limited deductions including standard deduction for salaried (₹50,000), employer contribution 
                  to NPS, and interest on home loan for self-occupied property (up to ₹2 lakh).
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Conclusion</h2>
          <p>
            Choosing the right tax regime can significantly impact your take-home income. Use our tax calculator to compare both 
            options and make an informed decision. Remember to review your choice annually as your financial situation changes. 
            Proper tax planning not only saves money but also helps you build wealth through tax-efficient investments.
          </p>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Calculate Your Income Tax?</h3>
          <p className="text-muted-foreground mb-6">
            Use our free tax calculator to compare old vs new regime and optimize your tax planning.
          </p>
          <Link 
            href="/tools/tax-calculator"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 font-medium transition-colors"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Income Tax
          </Link>
        </div>
      </div>
    </>
  )
}
