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
import ToolsNavigation from '@/components/ToolsNavigation';
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

      {/* How to Use Section */}
      <div className="mt-8 mb-8">
        <div className="bg-gradient-to-br from-gray-700 via-gray-600 to-slate-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete SIP Investment Guide</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Master systematic investment planning with our comprehensive guide for wealth creation and financial goal achievement
            </p>
          </div>

          {/* SIP Investment Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">💰 SIP Investment Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Set Financial Goals</h4>
                <p className="text-gray-200 text-sm">
                  Define your financial objectives like retirement, child education, or home purchase with specific target amounts and timelines.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Choose Investment Amount</h4>
                <p className="text-gray-200 text-sm">
                  Start with an amount you can comfortably invest monthly. Even ₹1,000 per month can create significant wealth over time.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Select Time Horizon</h4>
                <p className="text-gray-200 text-sm">
                  Choose investment duration based on your goals. Longer periods (10+ years) help maximize compounding benefits.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Track & Review</h4>
                <p className="text-gray-200 text-sm">
                  Monitor your SIP performance regularly and adjust investment amounts as your income grows.
                </p>
              </div>
            </div>
          </div>

          {/* SIP Fund Types */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">📈 SIP Fund Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/30 rounded-lg p-2 mr-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Equity Funds</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Expected Returns:</strong> 10-15% annually (long-term)</li>
                  <li>• <strong>Risk Level:</strong> High volatility, high growth potential</li>
                  <li>• <strong>Investment Horizon:</strong> Minimum 5-7 years</li>
                  <li>• <strong>Best For:</strong> Long-term wealth creation</li>
                  <li>• <strong>Tax Benefits:</strong> LTCG tax after 1 year</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500/30 rounded-lg p-2 mr-3">
                    <PiggyBank className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Debt Funds</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Expected Returns:</strong> 6-9% annually</li>
                  <li>• <strong>Risk Level:</strong> Low to moderate risk</li>
                  <li>• <strong>Investment Horizon:</strong> 1-3 years</li>
                  <li>• <strong>Best For:</strong> Capital preservation, steady income</li>
                  <li>• <strong>Stability:</strong> Less volatile than equity funds</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/30 rounded-lg p-2 mr-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">Hybrid Funds</h4>
                </div>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Expected Returns:</strong> 8-12% annually</li>
                  <li>• <strong>Risk Level:</strong> Moderate risk, balanced approach</li>
                  <li>• <strong>Investment Horizon:</strong> 3-5 years</li>
                  <li>• <strong>Best For:</strong> Balanced growth and stability</li>
                  <li>• <strong>Allocation:</strong> Mix of equity and debt instruments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SIP Investment Strategies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">🎯 SIP Investment Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-yellow-500/30 rounded-lg p-2 mr-3 text-sm">SMART</span>
                  Strategic SIP Planning
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Start Early:</strong> Begin investing as soon as possible to maximize compounding</li>
                  <li><strong>Increase Gradually:</strong> Step up SIP amount by 10-15% annually</li>
                  <li><strong>Diversify Portfolio:</strong> Invest across different fund categories</li>
                  <li><strong>Stay Disciplined:</strong> Continue SIP even during market downturns</li>
                  <li><strong>Review Regularly:</strong> Assess performance and rebalance if needed</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-green-500/30 rounded-lg p-2 mr-3 text-sm">GOALS</span>
                  Goal-Based Investing
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Emergency Fund:</strong> 6-12 months expenses in liquid funds</li>
                  <li><strong>Short-term Goals:</strong> 1-3 years - debt/liquid funds</li>
                  <li><strong>Medium-term Goals:</strong> 3-7 years - hybrid funds</li>
                  <li><strong>Long-term Goals:</strong> 7+ years - equity funds</li>
                  <li><strong>Retirement Planning:</strong> Mix of equity and debt funds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SIP Benefits & Formula */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">🧮 SIP Calculation Formula</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="bg-white/20 rounded-lg p-6 inline-block">
                  <div className="text-2xl font-bold mb-2">M = P × ((1 + i)ⁿ - 1) / i × (1 + i)</div>
                  <div className="text-sm text-gray-200">Standard SIP Calculation Formula</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-500/30 rounded-lg p-4 mb-3">
                    <div className="text-xl font-bold">M</div>
                  </div>
                  <h5 className="font-semibold mb-2">Maturity Amount</h5>
                  <p className="text-gray-200 text-sm">Total corpus at the end of investment period</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/30 rounded-lg p-4 mb-3">
                    <div className="text-xl font-bold">P</div>
                  </div>
                  <h5 className="font-semibold mb-2">Monthly Investment</h5>
                  <p className="text-gray-200 text-sm">Fixed amount invested every month</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/30 rounded-lg p-4 mb-3">
                    <div className="text-xl font-bold">i & n</div>
                  </div>
                  <h5 className="font-semibold mb-2">Rate & Tenure</h5>
                  <p className="text-gray-200 text-sm">Monthly return rate and total months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional SIP Tips */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">💡 Professional SIP Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-blue-500/30 rounded-lg p-2 mr-3 text-sm">DO</span>
                  Best Practices
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Automate Investments:</strong> Set up auto-debit for consistent investing</li>
                  <li><strong>Start Small:</strong> Begin with affordable amounts and increase gradually</li>
                  <li><strong>Stay Invested:</strong> Continue SIP during market volatility</li>
                  <li><strong>Diversify Wisely:</strong> Spread investments across fund categories</li>
                  <li><strong>Monitor Performance:</strong> Review portfolio annually</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <span className="bg-red-500/30 rounded-lg p-2 mr-3 text-sm">AVOID</span>
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><strong>Stopping During Downturns:</strong> Missing out on rupee cost averaging</li>
                  <li><strong>Frequent Switching:</strong> Changing funds too often</li>
                  <li><strong>Timing the Market:</strong> Trying to predict market movements</li>
                  <li><strong>Ignoring Goals:</strong> Investing without clear objectives</li>
                  <li><strong>Emotional Decisions:</strong> Making investment choices based on fear/greed</li>
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

      {/* Tools Navigation */}
      <ToolsNavigation currentTool="sip-calculator" className="mt-8" />
    </div>
  );
}
