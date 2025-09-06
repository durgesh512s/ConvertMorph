'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Home, Receipt, Building, MapPin, IndianRupee, FileText } from 'lucide-react';
import { RelatedArticles } from '@/components/RelatedArticles';
import ToolsNavigation from '@/components/ToolsNavigation';
import { toast } from 'sonner';

interface HRAResult {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  exemptHRA: number;
  taxableHRA: number;
  city: string;
}

export default function HRACalculatorPage() {
  const [basicSalary, setBasicSalary] = useState<string>('50000');
  const [hraReceived, setHraReceived] = useState<string>('20000');
  const [rentPaid, setRentPaid] = useState<string>('15000');
  const [city, setCity] = useState<string>('metro');
  const [result, setResult] = useState<HRAResult | null>(null);

  const calculateHRA = () => {
    try {
      const basic = parseFloat(basicSalary);
      const hra = parseFloat(hraReceived);
      const rent = parseFloat(rentPaid);

      if (basic <= 0 || isNaN(basic)) {
        toast.error('Please enter a valid basic salary');
        return;
      }

      if (hra < 0 || isNaN(hra)) {
        toast.error('Please enter a valid HRA received amount');
        return;
      }

      if (rent < 0 || isNaN(rent)) {
        toast.error('Please enter a valid rent paid amount');
        return;
      }

      // HRA Exemption Calculation
      // 1. Actual HRA received
      const actualHRA = hra;

      // 2. 50% of basic salary for metro cities, 40% for non-metro
      const percentageOfBasic = city === 'metro' ? basic * 0.5 : basic * 0.4;

      // 3. Rent paid minus 10% of basic salary (if positive)
      const rentMinus10Percent = Math.max(0, rent - (basic * 0.1));

      // HRA exemption is the minimum of the three
      const exemptHRA = Math.min(actualHRA, percentageOfBasic, rentMinus10Percent);
      const taxableHRA = Math.max(0, actualHRA - exemptHRA);

      const hraResult: HRAResult = {
        basicSalary: basic,
        hraReceived: hra,
        rentPaid: rent,
        exemptHRA,
        taxableHRA,
        city
      };

      setResult(hraResult);
      toast.success('HRA calculation completed successfully!');
    } catch (error) {
      toast.error('Error calculating HRA. Please check your inputs.');
      console.error('HRA calculation error:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Home className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            HRA Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate your House Rent Allowance (HRA) exemption and taxable amount as per Indian Income Tax rules
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Receipt className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Tax Exemption</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate HRA exemption</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">City-wise Rates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Metro vs non-metro rates</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold">Location Based</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Different rates for cities</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <IndianRupee className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Tax Savings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maximize your savings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              HRA Calculator
            </CardTitle>
            <CardDescription>
              Enter your salary and rent details to calculate HRA exemption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="basicSalary">Basic Salary (Monthly) (₹)</Label>
              <Input
                id="basicSalary"
                type="number"
                placeholder="50000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                min="0"
                step="1000"
              />
              <p className="text-sm text-gray-500">Your basic salary per month</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hraReceived">HRA Received (Monthly) (₹)</Label>
              <Input
                id="hraReceived"
                type="number"
                placeholder="20000"
                value={hraReceived}
                onChange={(e) => setHraReceived(e.target.value)}
                min="0"
                step="1000"
              />
              <p className="text-sm text-gray-500">HRA amount received from employer</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentPaid">Rent Paid (Monthly) (₹)</Label>
              <Input
                id="rentPaid"
                type="number"
                placeholder="15000"
                value={rentPaid}
                onChange={(e) => setRentPaid(e.target.value)}
                min="0"
                step="1000"
              />
              <p className="text-sm text-gray-500">Actual rent paid for accommodation</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City Type</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="metro">Metro City (Mumbai, Delhi, Kolkata, Chennai)</option>
                <option value="non-metro">Non-Metro City</option>
              </select>
              <p className="text-sm text-gray-500">
                Metro cities have 50% exemption, non-metro have 40%
              </p>
            </div>

            <Button onClick={calculateHRA} className="w-full" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate HRA Exemption
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              HRA Calculation Results
            </CardTitle>
            <CardDescription>
              Your HRA exemption breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Basic Salary</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(result.basicSalary)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">City Type</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {result.city === 'metro' ? 'Metro' : 'Non-Metro'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">HRA Received:</span>
                    <span className="font-semibold">{formatCurrency(result.hraReceived)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Rent Paid:</span>
                    <span className="font-semibold">{formatCurrency(result.rentPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">HRA Exempt:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(result.exemptHRA)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Taxable HRA:</span>
                    <span className="font-bold text-xl text-red-600 dark:text-red-400">
                      {formatCurrency(result.taxableHRA)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Tax Savings</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(result.exemptHRA * 12)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Exempt from income tax (yearly)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-2">Calculation Method</Badge>
                    <div className="space-y-1 text-gray-600 dark:text-gray-400">
                      <p>• Actual HRA: {formatCurrency(result.hraReceived)}</p>
                      <p>• {result.city === 'metro' ? '50%' : '40%'} of Basic: {formatCurrency(result.city === 'metro' ? result.basicSalary * 0.5 : result.basicSalary * 0.4)}</p>
                      <p>• Rent - 10% of Basic: {formatCurrency(Math.max(0, result.rentPaid - (result.basicSalary * 0.1)))}</p>
                      <p className="font-semibold text-green-600">Exemption = Minimum of above three</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter your salary and rent details to calculate HRA exemption</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about HRA exemption</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is HRA exemption?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              HRA (House Rent Allowance) exemption is a tax benefit available to salaried employees who receive HRA from their employer and pay rent for accommodation. The exemption reduces your taxable income.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">How is HRA exemption calculated?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of basic salary for metro cities or 40% for non-metro cities, (3) Rent paid minus 10% of basic salary.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Which cities are considered metro cities?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Mumbai, Delhi, Kolkata, and Chennai are considered metro cities for HRA calculation purposes. All other cities are treated as non-metro cities.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I claim HRA if I live in my own house?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No, you cannot claim HRA exemption if you live in your own house. HRA exemption is only available when you pay rent for accommodation.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What documents are required for HRA exemption?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You need rent receipts, rental agreement, and landlord's PAN card (if annual rent exceeds ₹1 lakh). Some employers may also require a declaration form.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I claim both HRA and home loan interest deduction?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, you can claim both if you live in a rented house and have a home loan for a different property. However, you cannot claim HRA for the same property where you claim home loan benefits.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      <RelatedArticles toolName="hra-calculator" />

      {/* Tools Navigation */}
      <ToolsNavigation currentTool="hra-calculator" className="mt-8" />
    </div>
  );
}
