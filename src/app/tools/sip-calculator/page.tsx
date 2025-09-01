'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Target, PiggyBank, BarChart3, Calendar, DollarSign } from 'lucide-react';
import { RelatedArticles } from '@/components/RelatedArticles';
import { toast } from 'sonner';

interface SIPResult {
  monthlyInvestment: number;
  totalInvestment: number;
  expectedReturns: number;
  maturityAmount: number;
  wealthGain: number;
}

export default function SIPCalculatorPage() {
  const [monthlyAmount, setMonthlyAmount] = useState<string>('5000');
  const [annualReturn, setAnnualReturn] = useState<string>('12');
  const [timePeriod, setTimePeriod] = useState<string>('10');
  const [result, setResult] = useState<SIPResult | null>(null);

  const calculateSIP = () => {
    try {
      const P = parseFloat(monthlyAmount);
      const r = parseFloat(annualReturn) / 100 / 12; // Monthly rate
      const n = parseFloat(timePeriod) * 12; // Total months

      if (P <= 0 || isNaN(P)) {
        toast.error('Please enter a valid monthly investment amount');
        return;
      }

      if (parseFloat(annualReturn) <= 0 || isNaN(parseFloat(annualReturn))) {
        toast.error('Please enter a valid expected annual return');
        return;
      }

      if (parseFloat(timePeriod) <= 0 || isNaN(parseFloat(timePeriod))) {
        toast.error('Please enter a valid time period');
        return;
      }

      // SIP Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
      const maturityAmount = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const totalInvestment = P * n;
      const wealthGain = maturityAmount - totalInvestment;

      const sipResult: SIPResult = {
        monthlyInvestment: P,
        totalInvestment,
        expectedReturns: wealthGain,
        maturityAmount,
        wealthGain
      };

      setResult(sipResult);
      toast.success('SIP calculation completed successfully!');
    } catch (error) {
      toast.error('Error calculating SIP. Please check your inputs.');
      console.error('SIP calculation error:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            SIP Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate the future value of your Systematic Investment Plan (SIP) and plan your wealth creation journey
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Goal Planning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Plan for your financial goals</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Wealth Growth</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track your wealth accumulation</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">Long-term Planning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Plan for years ahead</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold">Compound Returns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Benefit from compounding</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              SIP Calculator
            </CardTitle>
            <CardDescription>
              Enter your investment details to calculate SIP returns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyAmount">Monthly Investment Amount (₹)</Label>
              <Input
                id="monthlyAmount"
                type="number"
                placeholder="5000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                min="100"
                step="100"
              />
              <p className="text-sm text-gray-500">Minimum: ₹100</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                placeholder="12"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                min="1"
                max="30"
                step="0.1"
              />
              <p className="text-sm text-gray-500">Typical range: 8% - 15% for equity funds</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timePeriod">Investment Period (Years)</Label>
              <Input
                id="timePeriod"
                type="number"
                placeholder="10"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                min="1"
                max="50"
                step="1"
              />
              <p className="text-sm text-gray-500">Recommended: At least 5 years for equity</p>
            </div>

            <Button onClick={calculateSIP} className="w-full" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate SIP Returns
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              SIP Calculation Results
            </CardTitle>
            <CardDescription>
              Your investment growth projection
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Investment</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(result.monthlyInvestment)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Investment Period</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {timePeriod} Years
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Investment:</span>
                    <span className="font-semibold">{formatCurrency(result.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Expected Returns:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(result.expectedReturns)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Maturity Amount:</span>
                    <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                      {formatCurrency(result.maturityAmount)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wealth Gain</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(result.wealthGain)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {((result.wealthGain / result.totalInvestment) * 100).toFixed(1)}% total return
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-2">Investment Breakdown</Badge>
                    <p>Monthly: {formatCurrency(result.monthlyInvestment)}</p>
                    <p>Yearly: {formatCurrency(result.monthlyInvestment * 12)}</p>
                    <p>Total: {formatCurrency(result.totalInvestment)}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Growth Analysis</Badge>
                    <p>Return Rate: {annualReturn}% p.a.</p>
                    <p>Time Period: {timePeriod} years</p>
                    <p>Total Months: {parseFloat(timePeriod) * 12}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter your investment details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about SIP investments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is SIP?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount regularly (monthly/quarterly) instead of a lump sum. It helps in rupee cost averaging and disciplined investing.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What is the minimum SIP amount?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Most mutual funds allow SIP starting from ₹100-500 per month. However, for meaningful wealth creation, it's recommended to start with at least ₹1,000-2,000 per month.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What returns can I expect from SIP?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Returns depend on the type of fund and market conditions. Historically, equity funds have given 10-15% annual returns over long periods (10+ years), while debt funds give 6-9% returns.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I stop or modify my SIP?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, SIPs are flexible. You can pause, stop, increase, or decrease your SIP amount anytime. You can also switch between funds within the same fund house without any charges.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What is rupee cost averaging?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rupee cost averaging means buying more units when prices are low and fewer units when prices are high. This helps reduce the average cost per unit over time and minimizes the impact of market volatility.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">How is SIP different from lump sum investment?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              SIP involves regular small investments, reducing timing risk and enabling rupee cost averaging. Lump sum requires a large amount upfront and is subject to market timing risk, but may give higher returns in consistently rising markets.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      <RelatedArticles toolName="sip-calculator" />
    </div>
  );
}
