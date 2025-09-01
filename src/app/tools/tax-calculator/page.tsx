'use client'

import { useState } from 'react'
import { Calculator, DollarSign, FileText, TrendingUp, Settings, AlertCircle, Info } from 'lucide-react'
import { RelatedArticles } from '@/components/RelatedArticles'
import { toast } from 'sonner'
import { track } from '@/lib/analytics/client'

interface TaxCalculation {
  grossIncome: number
  taxableIncome: number
  totalTax: number
  netIncome: number
  effectiveRate: number
  marginalRate: number
  breakdown: {
    slab: string
    rate: number
    taxableAmount: number
    tax: number
  }[]
}

// Indian Tax Slabs for AY 2025-26 (Old Regime)
const oldRegimeTaxSlabs = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
]

// Indian Tax Slabs for FY 2025-26 (AY 2026-27) - New Regime (Default)
const newRegimeTaxSlabs = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 5 },
  { min: 800000, max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: Infinity, rate: 30 }
]

export default function TaxCalculatorPage() {
  const [grossIncome, setGrossIncome] = useState<string>('')
  const [deductions, setDeductions] = useState<string>('')
  const [regime, setRegime] = useState<'old' | 'new'>('new')
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateTax = (income: number, taxSlabs: typeof oldRegimeTaxSlabs) => {
    let totalTax = 0
    let marginalRate = 0
    const breakdown: TaxCalculation['breakdown'] = []

    for (const slab of taxSlabs) {
      if (income > slab.min) {
        const taxableInThisSlab = Math.min(income, slab.max) - slab.min
        const taxInThisSlab = (taxableInThisSlab * slab.rate) / 100
        
        if (taxableInThisSlab > 0) {
          totalTax += taxInThisSlab
          marginalRate = slab.rate
          
          breakdown.push({
            slab: slab.max === Infinity 
              ? `₹${slab.min.toLocaleString('en-IN')}+`
              : `₹${slab.min.toLocaleString('en-IN')} - ₹${slab.max.toLocaleString('en-IN')}`,
            rate: slab.rate,
            taxableAmount: taxableInThisSlab,
            tax: taxInThisSlab
          })
        }
      }
    }

    return { totalTax, marginalRate, breakdown }
  }

  const handleCalculate = () => {
    const income = parseFloat(grossIncome)
    const deductionAmount = parseFloat(deductions) || 0

    if (!income || income <= 0) {
      toast.error('Please enter a valid gross income')
      return
    }

    setIsCalculating(true)

    try {
      const taxableIncome = Math.max(0, income - deductionAmount)
      const taxSlabs = regime === 'old' ? oldRegimeTaxSlabs : newRegimeTaxSlabs
      
      const { totalTax, marginalRate, breakdown } = calculateTax(taxableIncome, taxSlabs)
      
      // Add cess (4% on total tax)
      const cessAmount = totalTax * 0.04
      const finalTax = totalTax + cessAmount
      
      const result: TaxCalculation = {
        grossIncome: income,
        taxableIncome,
        totalTax: finalTax,
        netIncome: income - finalTax,
        effectiveRate: income > 0 ? (finalTax / income) * 100 : 0,
        marginalRate,
        breakdown
      }

      setCalculation(result)
      
      track('tax_calculation', {
        regime,
        income_range: income < 500000 ? 'low' : income < 1000000 ? 'medium' : 'high',
        has_deductions: deductionAmount > 0
      })

      toast.success('Tax calculation completed!')
    } catch (error) {
      console.error('Tax calculation error:', error)
      toast.error('Failed to calculate tax. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Income Tax Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Calculate your income tax liability for FY 2025-26 (AY 2026-27). Compare old vs new tax regime with latest updated tax slabs.
            </p>
          </div>

          {/* Tax Regime Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Tax Regime
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div
                className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                  regime === 'new'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setRegime('new')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={regime === 'new'}
                    onChange={() => setRegime('new')}
                    className="mr-2 flex-shrink-0"
                    id="new-regime"
                    name="tax-regime"
                  />
                  <label htmlFor="new-regime" className="font-medium text-sm sm:text-base cursor-pointer text-gray-900 dark:text-white">
                    New Tax Regime (Default)
                  </label>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Lower tax rates but limited deductions
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  <div>0% up to ₹4L</div>
                  <div>5% on ₹4L-₹8L</div>
                  <div>10% on ₹8L-₹12L</div>
                  <div>15% on ₹12L-₹16L</div>
                  <div>20% on ₹16L-₹20L</div>
                  <div>25% on ₹20L-₹24L</div>
                  <div>30% above ₹24L</div>
                </div>
              </div>
              
              <div
                className={`border-2 rounded-lg p-3 sm:p-4 transition-all cursor-pointer ${
                  regime === 'old'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setRegime('old')}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={regime === 'old'}
                    onChange={() => setRegime('old')}
                    className="mr-2 flex-shrink-0"
                    id="old-regime"
                    name="tax-regime"
                  />
                  <label htmlFor="old-regime" className="font-medium text-sm sm:text-base cursor-pointer text-gray-900 dark:text-white">
                    Old Tax Regime
                  </label>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Higher rates but more deductions available
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  <div>0% up to ₹2.5L</div>
                  <div>5% on ₹2.5L-₹5L</div>
                  <div>20% on ₹5L-₹10L</div>
                  <div>30% above ₹10L</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Income Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="gross-income" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gross Annual Income (₹) *
                </label>
                <input
                  type="number"
                  id="gross-income"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  placeholder="e.g., 1200000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500/50 bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Deductions (₹)
                </label>
                <input
                  type="number"
                  id="deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                  placeholder={regime === 'old' ? "e.g., 150000" : "Limited in new regime"}
                  disabled={regime === 'new'}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500/50 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                />
                {regime === 'new' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    New regime has limited deductions
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating || !grossIncome}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Tax
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {calculation && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> Tax Calculation Results
              </h3>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Gross Income</div>
                  <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    {formatCurrency(calculation.grossIncome)}
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">Taxable Income</div>
                  <div className="text-xl font-bold text-green-900 dark:text-green-100">
                    {formatCurrency(calculation.taxableIncome)}
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="text-sm text-red-600 dark:text-red-400 font-medium">Total Tax</div>
                  <div className="text-xl font-bold text-red-900 dark:text-red-100">
                    {formatCurrency(calculation.totalTax)}
                  </div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Net Income</div>
                  <div className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                    {formatCurrency(calculation.netIncome)}
                  </div>
                </div>
              </div>

              {/* Tax Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Effective Tax Rate</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {calculation.effectiveRate.toFixed(2)}%
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Marginal Tax Rate</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {calculation.marginalRate}%
                  </div>
                </div>
              </div>

              {/* Tax Breakdown */}
              {calculation.breakdown.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tax Breakdown by Slab</h4>
                  <div className="space-y-2">
                    {calculation.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.slab}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {item.rate}% on {formatCurrency(item.taxableAmount)}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {formatCurrency(item.tax)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accurate Calculations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Based on latest FY 2024-25 tax slabs and rates</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Regime Comparison</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compare old vs new tax regime benefits</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Detailed Breakdown</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">See tax calculation for each income slab</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tax Planning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plan your investments and deductions effectively</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Which tax regime should I choose?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The new regime offers lower tax rates but limited deductions. Choose the old regime if you have significant deductions like home loan interest, insurance premiums, or investments under Section 80C.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is the difference between effective and marginal tax rate?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Effective tax rate is the percentage of total income paid as tax. Marginal tax rate is the rate applied to your last rupee of income, indicating the tax on additional income.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Are there any additional taxes or cess?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes, a 4% Health and Education Cess is applicable on the total tax amount. This calculator includes the cess in the final tax calculation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I switch between tax regimes?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Salaried individuals can switch between regimes every year. However, business owners who opt for the new regime cannot switch back to the old regime.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What deductions are available in the old regime?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Common deductions include Section 80C (₹1.5L), 80D (health insurance), home loan interest, HRA, LTA, and various other investment-linked deductions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is this calculator accurate for all cases?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  This calculator provides estimates based on standard tax slabs. For complex cases involving capital gains, business income, or special deductions, consult a tax professional.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="tax-calculator" />
        </div>
      </div>
    </div>
  )
}
