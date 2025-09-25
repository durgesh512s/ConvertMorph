import { Metadata } from 'next'
import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import JsonLd from '@/components/JsonLd'
import { metadata, jsonLd } from './metadata'
import PDFCompressClient from './PDFCompressClient'

export { metadata }

export default function PDFCompressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {jsonLd.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Interactive client component - this contains all the UI */}
          <PDFCompressClient />
          
          {/* Related Articles for internal linking */}
          <RelatedArticles toolName="pdf-compress" />

          {/* Tools Navigation for better discovery */}
          <ToolsNavigation currentTool="pdf-compress" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
