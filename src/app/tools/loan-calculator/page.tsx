'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, CreditCard, Percent, Calendar, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { RelatedArticles } from '@/components/RelatedArticles';
import ToolsNavigation from '@/components/ToolsNavigation';
import { toast } from 'sonner';

interface LoanResult {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  loanType: string;
}

interface PaymentSchedule {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('1000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [tenureType, setTenureType] = useState<string>('years');
  const [loanType, setLoanType] = useState<string>('home');
  const [result, setResult] = useState<LoanResult | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const calculateLoan = () => {
    try {
      const P = parseFloat(loanAmount);
      const annualRate = parseFloat(interestRate);
      const tenure = parseFloat(loanTenure);

      if (P <= 0 || isNaN(P)) {
        toast.error('Please enter a valid loan amount');
        return;
      }

      if (annualRate <= 0 || isNaN(annualRate)) {
        toast.error('Please enter a valid interest rate');
        return;
      }

      if (tenure <= 0 || isNaN(tenure)) {
        toast.error('Please enter a valid loan tenure');
        return;
      }

      const r = annualRate / 100 / 12; // Monthly interest rate
      const n = tenureType === 'years' ? tenure * 12 : tenure; // Total months

      // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
      const monthlyEMI = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const totalAmount = monthlyEMI * n;
      const totalInterest = totalAmount - P;

      const loanResult: LoanResult = {
        loanAmount: P,
        interestRate: annualRate,
        loanTenure: tenure,
        monthlyEMI,
        totalInterest,
        totalAmount,
        loanType
      };

      setResult(loanResult);

      // Generate payment schedule for first 12 months
      const schedule: PaymentSchedule[] = [];
      let remainingBalance = P;

      for (let month = 1; month <= Math.min(12, n); month++) {
        const interestPayment = remainingBalance * r;
        const principalPayment = monthlyEMI - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
          month,
          emi: monthlyEMI,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance)
        });
      }

      setPaymentSchedule(schedule);
      toast.success('Loan calculation completed successfully!');
    } catch (error) {
      toast.error('Error calculating loan. Please check your inputs.');
      console.error('Loan calculation error:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLoanTypeDetails = (type: string) => {
    const types = {
      home: { name: 'Home Loan', rate: '8.5-9.5%', tenure: '15-30 years' },
      personal: { name: 'Personal Loan', rate: '10-18%', tenure: '1-5 years' },
      car: { name: 'Car Loan', rate: '7-12%', tenure: '3-7 years' },
      education: { name: 'Education Loan', rate: '8-12%', tenure: '5-15 years' },
      business: { name: 'Business Loan', rate: '10-20%', tenure: '1-10 years' }
    };
    return types[type as keyof typeof types] || types.home;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Loan Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate your loan EMI, total interest, and payment schedule for different types of loans
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">EMI Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate monthly payments</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <PieChart className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Interest Breakdown</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Principal vs interest split</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold">Payment Schedule</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly payment breakdown</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Percent className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold">Multiple Loan Types</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Home, car, personal loans</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Loan Calculator
            </CardTitle>
            <CardDescription>
              Enter your loan details to calculate EMI and payment schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              <select
                id="loanType"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="home">Home Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="car">Car Loan</option>
                <option value="education">Education Loan</option>
                <option value="business">Business Loan</option>
              </select>
              <p className="text-sm text-gray-500">
                Typical rate: {getLoanTypeDetails(loanType).rate}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="1000000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="10000"
                step="10000"
              />
              <p className="text-sm text-gray-500">Principal loan amount</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="8.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="1"
                max="30"
                step="0.1"
              />
              <p className="text-sm text-gray-500">Annual interest rate percentage</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTenure">Loan Tenure</Label>
              <div className="flex gap-2">
                <Input
                  id="loanTenure"
                  type="number"
                  placeholder="20"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  min="1"
                  step="1"
                  className="flex-1"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <p className="text-sm text-gray-500">
                Typical tenure: {getLoanTypeDetails(loanType).tenure}
              </p>
            </div>

            <Button onClick={calculateLoan} className="w-full" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Loan EMI
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Loan Calculation Results
            </CardTitle>
            <CardDescription>
              Your loan EMI and payment breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(result.monthlyEMI)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loan Type</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {getLoanTypeDetails(result.loanType).name.split(' ')[0]}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Loan Amount:</span>
                    <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                    <span className="font-semibold">{result.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Loan Tenure:</span>
                    <span className="font-semibold">
                      {result.loanTenure} {tenureType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                    <span className="font-bold text-xl text-purple-600 dark:text-purple-400">
                      {formatCurrency(result.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest vs Principal</p>
                    <div className="flex justify-between text-sm">
                      <span>Principal: {((result.loanAmount / result.totalAmount) * 100).toFixed(1)}%</span>
                      <span>Interest: {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-2">Loan Details</Badge>
                    <p>Amount: {formatCurrency(result.loanAmount)}</p>
                    <p>Rate: {result.interestRate}% p.a.</p>
                    <p>Tenure: {result.loanTenure} {tenureType}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Payment Summary</Badge>
                    <p>Monthly EMI: {formatCurrency(result.monthlyEMI)}</p>
                    <p>Total Interest: {formatCurrency(result.totalInterest)}</p>
                    <p>Total Payment: {formatCurrency(result.totalAmount)}</p>
                  </div>
                </div>

                {paymentSchedule.length > 0 && (
                  <div>
                    <Button
                      onClick={() => setShowSchedule(!showSchedule)}
                      variant="outline"
                      className="w-full"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      {showSchedule ? 'Hide' : 'Show'} Payment Schedule (First 12 Months)
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter your loan details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      {showSchedule && paymentSchedule.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Payment Schedule (First 12 Months)
            </CardTitle>
            <CardDescription>
              Monthly breakdown of principal and interest payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Month</th>
                    <th className="text-right p-2">EMI</th>
                    <th className="text-right p-2">Principal</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((payment) => (
                    <tr key={payment.month} className="border-b">
                      <td className="p-2">{payment.month}</td>
                      <td className="text-right p-2">{formatCurrency(payment.emi)}</td>
                      <td className="text-right p-2 text-green-600">{formatCurrency(payment.principal)}</td>
                      <td className="text-right p-2 text-red-600">{formatCurrency(payment.interest)}</td>
                      <td className="text-right p-2">{formatCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to Use Section */}
      <div className="mt-8 sm:mt-12 mb-8">
        <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-slate-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete Loan Planning Guide</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Master loan calculations and planning with our comprehensive guide for smart borrowing and financial management
            </p>
          </div>

          {/* Loan Planning Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">💳 Loan Planning Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Calculate Affordability</h4>
                <p className="text-gray-200 text-sm">
                  Determine your loan eligibility based on income, expenses, and desired EMI using our calculator.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Compare Interest Rates</h4>
                <p className="text-gray-200 text-sm">
                  Research and compare interest rates from different lenders to find the best deal for your loan type.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Choose Optimal Tenure</h4>
                <p className="text-gray-200 text-sm">
                  Balance between affordable EMI and total interest cost by selecting the right loan tenure.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Plan Repayment Strategy</h4>
                <p className="text-gray-200 text-sm">
                  Develop a repayment plan including prepayment options to minimize total interest cost.
                </p>
              </div>
            </div>
          </div>

          {/* Loan Types & Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">🏦 Loan Types & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500/30 rounded-lg p-2 mr-3">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Home Loans</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Interest Rate:</strong> 8.5-9.5% per annum</li>
                  <li>• <strong>Tenure:</strong> 15-30 years maximum</li>
                  <li>• <strong>Loan Amount:</strong> Up to 80-90% of property value</li>
                  <li>• <strong>Tax Benefits:</strong> Principal and interest deductions</li>
                  <li>• <strong>Processing Fee:</strong> 0.5-1% of loan amount</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/30 rounded-lg p-2 mr-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Personal Loans</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Interest Rate:</strong> 10-18% per annum</li>
                  <li>• <strong>Tenure:</strong> 1-5 years typically</li>
                  <li>• <strong>Loan Amount:</strong> Based on income and credit score</li>
                  <li>• <strong>No Collateral:</strong> Unsecured loan type</li>
                  <li>• <strong>Quick Approval:</strong> Minimal documentation required</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/30 rounded-lg p-2 mr-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Car Loans</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Interest Rate:</strong> 7-12% per annum</li>
                  <li>• <strong>Tenure:</strong> 3-7 years maximum</li>
                  <li>• <strong>Loan Amount:</strong> Up to 85-90% of car value</li>
                  <li>• <strong>Secured Loan:</strong> Car acts as collateral</li>
                  <li>• <strong>Insurance:</strong> Comprehensive insurance mandatory</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EMI Optimization Strategies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">📊 EMI Optimization Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-green-500/30 rounded-lg p-2 mr-3 text-sm">REDUCE</span>
                  EMI Reduction Techniques
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Longer Tenure:</strong> Extend loan period to reduce monthly EMI</li>
                  <li><strong>Higher Down Payment:</strong> Reduce principal amount borrowed</li>
                  <li><strong>Rate Negotiation:</strong> Negotiate better rates with good credit score</li>
                  <li><strong>Balance Transfer:</strong> Switch to lender with lower interest rates</li>
                  <li><strong>Co-applicant:</strong> Add co-borrower to improve eligibility</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-blue-500/30 rounded-lg p-2 mr-3 text-sm">SAVE</span>
                  Interest Saving Methods
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Prepayment:</strong> Make extra payments towards principal</li>
                  <li><strong>Shorter Tenure:</strong> Choose shorter period despite higher EMI</li>
                  <li><strong>Step-up EMI:</strong> Increase EMI annually with income growth</li>
                  <li><strong>Bi-weekly Payments:</strong> Pay half EMI every two weeks</li>
                  <li><strong>Lump Sum Payments:</strong> Use bonuses for principal reduction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Loan Calculation Formula */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">🧮 EMI Calculation Formula</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="bg-white/20 rounded-lg p-6 inline-block">
                  <div className="text-2xl font-bold mb-2">EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)</div>
                  <div className="text-sm text-gray-200">Standard EMI Calculation Formula</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-500/30 rounded-lg p-4 mb-3">
                    <div className="text-xl font-bold">P</div>
                  </div>
                  <h5 className="font-semibold mb-2">Principal Amount</h5>
                  <p className="text-gray-200 text-sm">The total loan amount borrowed from the lender</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/30 rounded-lg p-4 mb-3">
                    <div className="text-xl font-bold">r</div>
                  </div>
                  <h5 className="font-semibold mb-2">Monthly Interest Rate</h5>
                  <p className="text-gray-200 text-sm">Annual interest rate divided by 12 months</p>
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
                  <span className="bg-blue-500/30 rounded-lg p-2 mr-3 text-sm">SMART</span>
                  Smart Borrowing Practices
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Credit Score:</strong> Maintain 750+ score for best interest rates</li>
                  <li><strong>Income Stability:</strong> Ensure stable income before applying</li>
                  <li><strong>Debt-to-Income:</strong> Keep total EMIs under 40% of income</li>
                  <li><strong>Emergency Fund:</strong> Maintain 6-month EMI as emergency fund</li>
                  <li><strong>Read Fine Print:</strong> Understand all terms and conditions</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-red-500/30 rounded-lg p-2 mr-3 text-sm">AVOID</span>
                  Common Loan Mistakes
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Over-borrowing:</strong> Taking loan amount beyond repayment capacity</li>
                  <li><strong>Ignoring Charges:</strong> Not considering processing fees and charges</li>
                  <li><strong>No Comparison:</strong> Not comparing rates across multiple lenders</li>
                  <li><strong>Missing Payments:</strong> Late EMI payments affecting credit score</li>
                  <li><strong>No Insurance:</strong> Not having adequate life and health insurance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about loan calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How is EMI calculated?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              EMI is calculated using the formula: P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What factors affect my loan EMI?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Three main factors affect EMI: loan amount (higher amount = higher EMI), interest rate (higher rate = higher EMI), and tenure (longer tenure = lower EMI but more total interest).
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Should I choose a longer or shorter loan tenure?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Shorter tenure means higher EMI but less total interest paid. Longer tenure means lower EMI but more total interest. Choose based on your monthly budget and financial goals.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I prepay my loan to reduce interest?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, most loans allow prepayment. Making extra payments towards principal reduces the outstanding balance and total interest paid over the loan term.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What is the difference between fixed and floating interest rates?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fixed rates remain constant throughout the loan term, while floating rates change based on market conditions. Fixed rates offer predictability, floating rates may offer savings if rates decrease.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      <RelatedArticles toolName="loan-calculator" />

      {/* Tools Navigation */}
      <ToolsNavigation currentTool="loan-calculator" className="mt-8" />
    </div>
  );
}
