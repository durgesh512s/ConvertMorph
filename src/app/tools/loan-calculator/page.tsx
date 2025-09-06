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
