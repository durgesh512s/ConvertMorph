'use client'

import { useState, useEffect } from 'react'
import { Type, Download, FileText, BarChart3, Clock, BookOpen, TrendingUp, Hash, Eye, Shield, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import { toast } from 'sonner'
import { track } from '@/lib/analytics/client'
import { analyzeText, getReadabilityLevel, exportTextAnalysis, type TextStats, type TextAnalysisResult } from '@/lib/textAnalyzer'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState<TextAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Real-time analysis with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text.trim()) {
        setIsAnalyzing(true)
        try {
          const stats = analyzeText(text)
          setAnalysis({
            text,
            stats,
            timestamp: Date.now()
          })
        } catch (error) {
          console.error('Analysis error:', error)
          toast.error('Failed to analyze text')
        } finally {
          setIsAnalyzing(false)
        }
      } else {
        setAnalysis(null)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [text])

  const handleTextChange = (value: string) => {
    setText(value)
    if (value.length > 0) {
      track('text_input', {
        tool: 'word-counter',
        length: value.length
      })
    }
  }

  const handleClearText = () => {
    setText('')
    setAnalysis(null)
    toast.success('Text cleared')
  }

  const handleExport = async (format: 'txt' | 'json' | 'csv') => {
    if (!analysis) {
      toast.error('No analysis to export')
      return
    }

    try {
      const blob = exportTextAnalysis(analysis, format)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `text-analysis.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      track('export_analysis', {
        tool: 'word-counter',
        format,
        wordCount: analysis.stats.words
      })
      
      toast.success(`Analysis exported as ${format.toUpperCase()}`)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export analysis')
    }
  }

  const formatNumber = (num: number) => num.toLocaleString()

  const stats = analysis?.stats

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Type className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Word Counter</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Analyze your text with detailed statistics including word count, reading time, and readability score.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Text Input Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Text Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      value={text}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder="Type or paste your text here to analyze..."
                      className="w-full h-64 sm:h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                      aria-label="Text to analyze"
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <Button
                        onClick={handleClearText}
                        variant="outline"
                        disabled={!text}
                        className="flex-1"
                      >
                        Clear Text
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleExport('txt')}
                          variant="outline"
                          size="sm"
                          disabled={!analysis}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          TXT
                        </Button>
                        <Button
                          onClick={() => handleExport('json')}
                          variant="outline"
                          size="sm"
                          disabled={!analysis}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => handleExport('csv')}
                          variant="outline"
                          size="sm"
                          disabled={!analysis}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results Section */}
            <div className="space-y-6">
              
              {/* Basic Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Basic Statistics
                    {isAnalyzing && (
                      <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stats ? formatNumber(stats.characters) : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Including spaces</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stats ? formatNumber(stats.charactersNoSpaces) : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Excluding spaces</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats ? formatNumber(stats.words) : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {stats ? formatNumber(stats.sentences) : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {stats ? formatNumber(stats.paragraphs) : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {stats ? stats.readingTime : '0'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Min Read</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reading Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Reading Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Words per sentence</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {stats ? stats.averageWordsPerSentence : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentences per paragraph</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {stats ? stats.averageSentencesPerParagraph : '0'}
                      </span>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Readability Score</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {stats ? stats.readabilityScore : '0'}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stats ? stats.readabilityScore : 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {stats ? getReadabilityLevel(stats.readabilityScore) : 'No text to analyze'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Most Common Words */}
              {stats && stats.mostCommonWords.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Most Common Words
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stats.mostCommonWords.slice(0, 5).map((item, index) => (
                        <div key={item.word} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {index + 1}. {item.word}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Hash className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get instant statistics as you type or paste text</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reading Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimate reading time based on average reading speed</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Readability Score</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Analyze text complexity and reading difficulty</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/40 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">All analysis happens in your browser - text never leaves your device</p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-16 sm:mt-20">
            <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Type className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Advanced Text Analysis Guide</h2>
                <p className="text-xl text-slate-200 max-w-3xl mx-auto">
                  Master comprehensive text analysis with real-time statistics, readability scoring, and professional writing insights
                </p>
              </div>

              {/* Analysis Workflow */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">📝 Analysis Workflow</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Input Text</h4>
                    <p className="text-slate-200 text-sm">
                      Type directly or paste your content into the text area. Analysis begins automatically as you type.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Real-time Stats</h4>
                    <p className="text-slate-200 text-sm">
                      View instant statistics including word count, characters, sentences, and paragraph counts.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Readability Analysis</h4>
                    <p className="text-slate-200 text-sm">
                      Get readability scores, reading time estimates, and text complexity analysis for better writing.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Download className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Export Results</h4>
                    <p className="text-slate-200 text-sm">
                      Download your analysis in TXT, JSON, or CSV formats for documentation and reporting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Writing Metrics Guide */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">📊 Understanding Your Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500/30 rounded-lg p-2 mr-3">
                        <Hash className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Character Counts</h4>
                    </div>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li>• <strong>With spaces:</strong> Total character count including spaces</li>
                      <li>• <strong>Without spaces:</strong> Letters, numbers, and punctuation only</li>
                      <li>• <strong>Use case:</strong> Social media limits, form validation</li>
                      <li>• <strong>Twitter:</strong> 280 character limit</li>
                      <li>• <strong>Meta descriptions:</strong> 150-160 characters</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-500/30 rounded-lg p-2 mr-3">
                        <Type className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Word Analysis</h4>
                    </div>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li>• <strong>Word count:</strong> Total words in your text</li>
                      <li>• <strong>Common words:</strong> Most frequently used terms</li>
                      <li>• <strong>Blog posts:</strong> 1,500-2,500 words ideal</li>
                      <li>• <strong>Essays:</strong> Follow assignment requirements</li>
                      <li>• <strong>Articles:</strong> 800-1,200 words for SEO</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-500/30 rounded-lg p-2 mr-3">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg">Readability</h4>
                    </div>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li>• <strong>90-100:</strong> Very easy (5th grade)</li>
                      <li>• <strong>80-89:</strong> Easy (6th grade)</li>
                      <li>• <strong>70-79:</strong> Fairly easy (7th grade)</li>
                      <li>• <strong>60-69:</strong> Standard (8th-9th grade)</li>
                      <li>• <strong>50-59:</strong> Fairly difficult (10th-12th grade)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Professional Use Cases */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-white">🎯 Professional Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-yellow-500/30 rounded-lg p-2 mr-3 text-sm">SEO</span>
                      Content Optimization
                    </h4>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li><strong>Blog Posts:</strong> Target 1,500+ words for better rankings</li>
                      <li><strong>Meta Descriptions:</strong> Keep under 160 characters</li>
                      <li><strong>Title Tags:</strong> 50-60 characters optimal</li>
                      <li><strong>Readability:</strong> Aim for 60-70 score for web content</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-green-500/30 rounded-lg p-2 mr-3 text-sm">EDU</span>
                      Academic Writing
                    </h4>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li><strong>Essays:</strong> Follow word count requirements precisely</li>
                      <li><strong>Research Papers:</strong> 3,000-8,000 words typical</li>
                      <li><strong>Abstracts:</strong> 150-300 words maximum</li>
                      <li><strong>Readability:</strong> Match audience education level</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-blue-500/30 rounded-lg p-2 mr-3 text-sm">BIZ</span>
                      Business Communication
                    </h4>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li><strong>Emails:</strong> Keep under 200 words for best response</li>
                      <li><strong>Reports:</strong> Executive summaries 1-2 pages</li>
                      <li><strong>Proposals:</strong> 2,000-5,000 words typical</li>
                      <li><strong>Presentations:</strong> 6-8 words per slide maximum</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <span className="bg-purple-500/30 rounded-lg p-2 mr-3 text-sm">SOCIAL</span>
                      Social Media
                    </h4>
                    <ul className="space-y-2 text-slate-200 text-sm">
                      <li><strong>Twitter:</strong> 280 characters maximum</li>
                      <li><strong>LinkedIn:</strong> 1,300 characters for posts</li>
                      <li><strong>Facebook:</strong> 40-80 characters for best engagement</li>
                      <li><strong>Instagram:</strong> 125 characters for captions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's the difference between character counts?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  "Characters" includes all characters including spaces, punctuation, and line breaks. "Characters (excluding spaces)" counts only letters, numbers, and punctuation without spaces.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How accurate is the word count?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our word counter uses advanced text parsing to accurately count words, excluding extra spaces and handling various text formats correctly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is the readability score based on?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The readability score uses the Flesch Reading Ease formula, considering sentence length and syllable count to determine text difficulty.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I export my analysis results?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Yes! You can export your text analysis in TXT, JSON, or CSV formats for further use or record keeping.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a character limit?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  There's no hard limit, but very large texts may take longer to analyze. The tool works best with documents up to 100,000 words.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How is reading time calculated?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Reading time is estimated based on an average reading speed of 200 words per minute, which is typical for adult readers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my text data secure?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Absolutely! All text analysis happens entirely in your browser. Your text is never uploaded to our servers or stored anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 sm:mt-16">
            <RelatedArticles toolName="word-counter" />
          </div>

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="word-counter" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
