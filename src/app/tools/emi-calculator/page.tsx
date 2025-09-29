'use client'

import { useState } from 'react'
import { Calculator, Home, DollarSign, FileText, TrendingUp, Settings, AlertCircle, Info } from 'lucide-react'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { toast } from 'sonner'
import { gtm } from '@/components/GoogleTagManager'

interface EMICalculation {
  loanAmount: number
  interestRate: number
  tenure: number
  emi: number
  totalAmount: number
  totalInterest: number
  monthlyBreakdown: {
    month: number
    emi: number
    principal: number
    interest: number
    balance: number
  }[]
}

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [tenure, setTenure] = useState<string>('')
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years')
  const [calculation, setCalculation] = useState<EMICalculation | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate)
    const time = parseFloat(tenure)

    if (!principal || !rate || !time || principal <= 0 || rate <= 0 || time <= 0) {
      toast.error('Please enter valid loan details')
      return
    }

    setIsCalculating(true)

    try {
      // Convert tenure to months if needed
      const tenureInMonths = tenureType === 'years' ? time * 12 : time
      
      // Monthly interest rate
      const monthlyRate = rate / (12 * 100)
      
      // EMI calculation using formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) / 
                  (Math.pow(1 + monthlyRate, tenureInMonths) - 1)
      
      const totalAmount = emi * tenureInMonths
      const totalInterest = totalAmount - principal

      // Generate monthly breakdown
      const monthlyBreakdown: EMICalculation['monthlyBreakdown'] = []
      let remainingBalance = principal

      for (let month = 1; month <= tenureInMonths; month++) {
        const interestComponent = remainingBalance * monthlyRate
        const principalComponent = emi - interestComponent
        remainingBalance -= principalComponent

        monthlyBreakdown.push({
          month,
          emi: emi,
          principal: principalComponent,
          interest: interestComponent,
          balance: Math.max(0, remainingBalance)
        })
      }

      const result: EMICalculation = {
        loanAmount: principal,
        interestRate: rate,
        tenure: tenureInMonths,
        emi,
        totalAmount,
        totalInterest,
        monthlyBreakdown
      }

      setCalculation(result)
      
      // Track EMI calculation with GTM
      gtm.push({
        event: 'tool_usage',
        tool_name: 'emi-calculator',
        action: 'calculate',
        loan_amount: principal,
        interest_rate: rate,
        tenure_months: tenureInMonths,
        loan_type: principal > 5000000 ? 'high_value' : principal > 1000000 ? 'medium' : 'low',
        emi_amount: emi,
        total_interest: totalInterest
      })

      toast.success('EMI calculation completed!')
    } catch (error) {
      console.error('EMI calculation error:', error)
      toast.error('Failed to calculate EMI. Please try again.')
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
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2
    }).format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Home className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              EMI Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans. Plan your finances effectively.
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Loan Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount (₹) *
                </label>
                <input
                  type="number"
                  id="loan-amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="e.g., 2500000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (% per annum) *
                </label>
                <input
                  type="number"
                  id="interest-rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g., 8.5"
                  step="0.1"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Tenure *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="tenure"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g., 20"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
                    className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-gray-700 dark:text-white"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={calculateEMI}
                  disabled={isCalculating || !loanAmount || !interestRate || !tenure}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate EMI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {calculation && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> EMI Calculation Results
              </h3>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Monthly EMI</div>
                  <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    {formatCurrency(calculation.emi)}
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">Principal Amount</div>
                  <div className="text-xl font-bold text-green-900 dark:text-green-100">
                    {formatCurrency(calculation.loanAmount)}
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="text-sm text-red-600 dark:text-red-400 font-medium">Total Interest</div>
                  <div className="text-xl font-bold text-red-900 dark:text-red-100">
                    {formatCurrency(calculation.totalInterest)}
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Amount</div>
                  <div className="text-xl font-bold text-purple-900 dark:text-purple-100">
                    {formatCurrency(calculation.totalAmount)}
                  </div>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Interest Rate</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {calculation.interestRate}% p.a.
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loan Tenure</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {calculation.tenure} months
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Interest vs Principal</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {((calculation.totalInterest / calculation.loanAmount) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown Toggle */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {showBreakdown ? 'Hide' : 'Show'} Monthly Breakdown
                </button>
              </div>

              {/* Monthly Breakdown Table */}
              {showBreakdown && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly Payment Breakdown</h4>
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-600">
                        <tr>
                          <th className="text-left p-2 font-medium text-gray-900 dark:text-white">Month</th>
                          <th className="text-left p-2 font-medium text-gray-900 dark:text-white">EMI</th>
                          <th className="text-left p-2 font-medium text-gray-900 dark:text-white">Principal</th>
                          <th className="text-left p-2 font-medium text-gray-900 dark:text-white">Interest</th>
                          <th className="text-left p-2 font-medium text-gray-900 dark:text-white">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculation.monthlyBreakdown.map((item) => (
                          <tr key={item.month} className="border-b border-gray-200 dark:border-gray-600">
                            <td className="p-2 text-gray-900 dark:text-white">{item.month}</td>
                            <td className="p-2 text-gray-900 dark:text-white">{formatCurrency(item.emi)}</td>
                            <td className="p-2 text-gray-900 dark:text-white">{formatCurrency(item.principal)}</td>
                            <td className="p-2 text-gray-900 dark:text-white">{formatCurrency(item.interest)}</td>
                            <td className="p-2 text-gray-900 dark:text-white">{formatCurrency(item.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accurate EMI Calculation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Precise EMI calculations using standard banking formulas</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monthly Breakdown</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Detailed month-wise principal and interest breakdown</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Home className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">All Loan Types</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Works for home loans, car loans, and personal loans</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Financial Planning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plan your budget and loan affordability effectively</p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8 sm:mt-12 mb-8">
            <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-slate-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete EMI Calculation Guide</h2>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Master loan planning with our comprehensive EMI calculator for home loans, car loans, and personal loans
                </p>
              </div>

              {/* EMI Calculation Process */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🏠 EMI Calculation Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Enter Loan Amount</h4>
                    <p className="text-gray-200 text-sm">
                      Input the total loan amount you need. Consider down payment for home/car loans to get accurate EMI.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Set Interest Rate</h4>
                    <p className="text-gray-200 text-sm">
                      Enter the annual interest rate offered by your bank. Check current market rates for better comparison.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Choose Tenure</h4>
                    <p className="text-gray-200 text-sm">
                      Select loan duration in years or months. Longer tenure reduces EMI but increases total interest paid.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Get EMI Details</h4>
                    <p className="text-gray-200 text-sm">
                      View monthly EMI, total interest, and detailed payment breakdown for informed financial planning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Types and Rates */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🏦 Loan Types & Current Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-500/30 rounded-lg p-2 mr-3">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Home Loans</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• <strong>Interest Rate:</strong> 8.5% - 11.5% per annum</li>
                      <li>• <strong>Tenure:</strong> Up to 30 years</li>
                      <li>• <strong>Loan Amount:</strong> Up to ₹10 crores</li>
                      <li>• <strong>Processing Fee:</strong> 0.5% - 1% of loan amount</li>
                      <li>• <strong>Tax Benefits:</strong> Section 80C & 24(b) deductions</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500/30 rounded-lg p-2 mr-3">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Car Loans</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• <strong>Interest Rate:</strong> 7.5% - 14% per annum</li>
                      <li>• <strong>Tenure:</strong> Up to 7 years</li>
                      <li>• <strong>Loan Amount:</strong> Up to ₹1 crore</li>
                      <li>• <strong>Down Payment:</strong> 10% - 20% of car value</li>
                      <li>• <strong>Processing Fee:</strong> ₹3,000 - ₹10,000</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-500/30 rounded-lg p-2 mr-3">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Personal Loans</h4>
                    </div>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li>• <strong>Interest Rate:</strong> 10% - 24% per annum</li>
                      <li>• <strong>Tenure:</strong> Up to 5 years</li>
                      <li>• <strong>Loan Amount:</strong> Up to ₹40 lakhs</li>
                      <li>• <strong>No Collateral:</strong> Unsecured loan</li>
                      <li>• <strong>Quick Approval:</strong> 24-48 hours processing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* EMI Planning Strategies */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">📊 EMI Planning Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-yellow-500/30 rounded-lg p-2 mr-3 text-sm">PLAN</span>
                      Smart EMI Planning
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>40-50% Rule:</strong> Keep total EMIs under 50% of income</li>
                      <li><strong>Emergency Fund:</strong> Maintain 6-month EMI reserve</li>
                      <li><strong>Rate Comparison:</strong> Compare rates across banks</li>
                      <li><strong>Prepayment Strategy:</strong> Plan for early loan closure</li>
                      <li><strong>Credit Score:</strong> Maintain 750+ for better rates</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-green-500/30 rounded-lg p-2 mr-3 text-sm">SAVE</span>
                      Interest Saving Tips
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>Higher Down Payment:</strong> Reduces loan amount & EMI</li>
                      <li><strong>Shorter Tenure:</strong> Higher EMI but lower total interest</li>
                      <li><strong>Prepayment:</strong> Use bonuses for principal reduction</li>
                      <li><strong>Balance Transfer:</strong> Switch to lower rate banks</li>
                      <li><strong>Step-up EMI:</strong> Increase EMI with salary hikes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* EMI Calculation Formula */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🧮 EMI Calculation Formula</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="bg-white/20 rounded-lg p-6 inline-block">
                      <div className="text-2xl font-bold mb-2">EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)</div>
                      <div className="text-sm text-gray-200">Standard Banking Formula</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-500/30 rounded-lg p-4 mb-3">
                        <div className="text-xl font-bold">P</div>
                      </div>
                      <h5 className="font-semibold mb-2">Principal Amount</h5>
                      <p className="text-gray-200 text-sm">Total loan amount borrowed from the bank</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-500/30 rounded-lg p-4 mb-3">
                        <div className="text-xl font-bold">r</div>
                      </div>
                      <h5 className="font-semibold mb-2">Monthly Interest Rate</h5>
                      <p className="text-gray-200 text-sm">Annual rate ÷ 12 months ÷ 100</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-500/30 rounded-lg p-4 mb-3">
                        <div className="text-xl font-bold">n</div>
                      </div>
                      <h5 className="font-semibold mb-2">Number of Months</h5>
                      <p className="text-gray-200 text-sm">Total loan tenure in months</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Loan Tips */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">💡 Professional Loan Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-blue-500/30 rounded-lg p-2 mr-3 text-sm">DO</span>
                      Best Practices
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>Research Thoroughly:</strong> Compare multiple lenders</li>
                      <li><strong>Read Fine Print:</strong> Understand all terms & conditions</li>
                      <li><strong>Negotiate Rates:</strong> Use your credit score as leverage</li>
                      <li><strong>Plan Prepayments:</strong> Use windfalls to reduce principal</li>
                      <li><strong>Track Payments:</strong> Monitor EMI deductions regularly</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-red-500/30 rounded-lg p-2 mr-3 text-sm">AVOID</span>
                      Common Mistakes
                    </h4>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      <li><strong>Overextending Budget:</strong> EMI beyond 50% of income</li>
                      <li><strong>Ignoring Hidden Costs:</strong> Processing fees, insurance</li>
                      <li><strong>Missing EMI Payments:</strong> Damages credit score</li>
                      <li><strong>Not Reading Terms:</strong> Prepayment penalties</li>
                      <li><strong>Choosing Longest Tenure:</strong> Without considering total interest cost</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How is EMI calculated?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  EMI is calculated using the formula: P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure in months.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What factors affect my EMI amount?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  EMI depends on three main factors: loan amount (principal), interest rate, and loan tenure. Higher principal or interest rate increases EMI, while longer tenure reduces it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Should I choose a longer or shorter tenure?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. Choose based on your monthly budget and financial goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I prepay my loan to reduce EMI?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes, prepayment reduces the principal amount. You can either reduce EMI amount or tenure. Most banks allow prepayment with minimal or no charges for home loans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is the difference between fixed and floating rates?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Fixed rates remain constant throughout the loan tenure, while floating rates change with market conditions. Fixed rates offer certainty, floating rates may offer savings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How much EMI can I afford?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Financial experts recommend that your EMI should not exceed 40-50% of your monthly income. This ensures you have enough for other expenses and emergencies.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <RelatedArticles toolName="emi-calculator" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="emi-calculator" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
