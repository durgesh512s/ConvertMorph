'use client'

import { useState, useEffect } from 'react'
import { GitCompare, Download, FileText, BarChart3, Settings, Eye, Shield, Zap, ArrowLeftRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { toast } from 'sonner'
import { track } from '@/lib/analytics/client'
import { compareTexts, getSimilarityLevel, exportComparison, type ComparisonResult, type ComparisonOptions } from '@/lib/textComparator'

export default function TextComparePage() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [comparison, setComparison] = useState<ComparisonResult | null>(null)
  const [isComparing, setIsComparing] = useState(false)
  const [options, setOptions] = useState<ComparisonOptions>({
    ignoreWhitespace: false,
    ignoreCase: false,
    ignorePunctuation: false,
    compareBy: 'lines'
  })

  // Real-time comparison with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text1.trim() && text2.trim()) {
        setIsComparing(true)
        try {
          const result = compareTexts(text1, text2, options)
          setComparison(result)
          
          track('text_comparison', {
            tool: 'text-compare',
            text1Length: text1.length,
            text2Length: text2.length,
            similarity: result.statistics.similarity,
            compareBy: options.compareBy
          })
        } catch (error) {
          console.error('Comparison error:', error)
          toast.error('Failed to compare texts')
        } finally {
          setIsComparing(false)
        }
      } else {
        setComparison(null)
      }
    }, 500) // 500ms debounce for comparison

    return () => clearTimeout(timeoutId)
  }, [text1, text2, options])

  const handleClearTexts = () => {
    setText1('')
    setText2('')
    setComparison(null)
    toast.success('Texts cleared')
  }

  const handleSwapTexts = () => {
    const temp = text1
    setText1(text2)
    setText2(temp)
    toast.success('Texts swapped')
  }

  const handleExport = async (format: 'txt' | 'json' | 'html') => {
    if (!comparison) {
      toast.error('No comparison to export')
      return
    }

    try {
      const blob = exportComparison(comparison, format)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `text-comparison.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      track('export_comparison', {
        tool: 'text-compare',
        format,
        similarity: comparison.statistics.similarity
      })
      
      toast.success(`Comparison exported as ${format.toUpperCase()}`)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export comparison')
    }
  }

  const formatNumber = (num: number) => num.toLocaleString()

  const stats = comparison?.statistics

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <GitCompare className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Text Comparison</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Compare two texts side-by-side with detailed difference analysis and similarity scoring.
            </p>
          </div>

          {/* Comparison Options */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Comparison Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compare By
                  </label>
                  <select
                    value={options.compareBy}
                    onChange={(e) => setOptions(prev => ({ ...prev, compareBy: e.target.value as 'lines' | 'words' | 'characters' }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="lines">Lines</option>
                    <option value="words">Words</option>
                    <option value="characters">Characters</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ignoreCase"
                    checked={options.ignoreCase}
                    onChange={(e) => setOptions(prev => ({ ...prev, ignoreCase: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="ignoreCase" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ignore Case
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ignoreWhitespace"
                    checked={options.ignoreWhitespace}
                    onChange={(e) => setOptions(prev => ({ ...prev, ignoreWhitespace: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="ignoreWhitespace" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ignore Whitespace
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ignorePunctuation"
                    checked={options.ignorePunctuation}
                    onChange={(e) => setOptions(prev => ({ ...prev, ignorePunctuation: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="ignorePunctuation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ignore Punctuation
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Text Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Text 1 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Original Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      placeholder="Enter or paste the first text here..."
                      className="w-full h-64 sm:h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                      aria-label="First text to compare"
                    />
                  </CardContent>
                </Card>

                {/* Text 2 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Modified Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      placeholder="Enter or paste the second text here..."
                      className="w-full h-64 sm:h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                      aria-label="Second text to compare"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  onClick={handleSwapTexts}
                  variant="outline"
                  disabled={!text1 && !text2}
                  className="flex-1"
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Swap Texts
                </Button>
                
                <Button
                  onClick={handleClearTexts}
                  variant="outline"
                  disabled={!text1 && !text2}
                  className="flex-1"
                >
                  Clear All
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleExport('txt')}
                    variant="outline"
                    size="sm"
                    disabled={!comparison}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    TXT
                  </Button>
                  <Button
                    onClick={() => handleExport('json')}
                    variant="outline"
                    size="sm"
                    disabled={!comparison}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    JSON
                  </Button>
                  <Button
                    onClick={() => handleExport('html')}
                    variant="outline"
                    size="sm"
                    disabled={!comparison}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    HTML
                  </Button>
                </div>
              </div>

              {/* Difference Visualization */}
              {comparison && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Differences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {comparison.differences.map((diff, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded text-sm font-mono ${
                            diff.type === 'added'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : diff.type === 'removed'
                              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          <span className="text-xs opacity-75 mr-2">
                            {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : ' '}
                          </span>
                          {diff.value}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              
              {/* Similarity Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Similarity Score
                    {isComparing && (
                      <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {stats ? stats.similarity : '0'}%
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${stats ? stats.similarity : 0}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stats ? getSimilarityLevel(stats.similarity) : 'No comparison yet'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Added</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {stats ? formatNumber(stats.addedLines + stats.addedWords + stats.addedCharacters) : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Removed</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">
                        {stats ? formatNumber(stats.removedLines + stats.removedWords + stats.removedCharacters) : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Unchanged</span>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                        {stats ? formatNumber(stats.unchangedLines + stats.unchangedWords + stats.unchangedCharacters) : '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Choose Our Text Comparison Tool?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get instant comparison results as you type with intelligent debouncing for optimal performance.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All text processing happens locally in your browser. Your data never leaves your device.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Export your comparison results in multiple formats: TXT, JSON, and HTML.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How accurate is the similarity scoring?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our tool uses the Longest Common Subsequence (LCS) algorithm to calculate similarity scores. 
                  This provides accurate measurements of how similar two texts are based on their common elements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's the difference between comparing by lines, words, and characters?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Line comparison is best for code or structured text, word comparison works well for documents and articles, 
                  while character comparison provides the most granular analysis for detailed text changes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I ignore certain elements during comparison?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes! You can choose to ignore case sensitivity, whitespace, and punctuation to focus on the 
                  actual content differences that matter most to your use case.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a limit to the text size I can compare?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The tool can handle large texts, but performance may vary based on your device's capabilities. 
                  For very large documents, consider breaking them into smaller sections for optimal performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How does the real-time comparison work?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The tool uses intelligent debouncing to analyze your text as you type, providing instant feedback 
                  without overwhelming your browser with constant calculations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my text data secure?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Absolutely! All text comparison happens entirely in your browser. Your text is never uploaded to our servers or stored anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 sm:mt-16">
            <RelatedArticles toolName="text-compare" />
          </div>

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="text-compare" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
