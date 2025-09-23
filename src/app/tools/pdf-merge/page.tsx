import { Metadata } from 'next'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import JsonLd from '@/components/JsonLd'
import { metadata, jsonLd } from './metadata'
import PDFMergeClient from './PDFMergeClient'

export { metadata }

export default function PDFMergePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Interactive client component - this contains all the UI */}
          <PDFMergeClient />
          
          {/* Related Articles for internal linking */}
          <RelatedArticles toolName="pdf-merge" />

          {/* Tools Navigation for better discovery */}
          <ToolsNavigation currentTool="pdf-merge" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
