import { RelatedArticles } from '@/components/RelatedArticles'
import ToolsNavigation from '@/components/ToolsNavigation'
import ImagesToPDFClient from './ImagesToPDFClient'
import { metadata } from './metadata'

export { metadata }

export default function ImagesToPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <ImagesToPDFClient />

          {/* Related Articles */}
          <RelatedArticles toolName="images-to-pdf" />

          {/* Tools Navigation */}
          <ToolsNavigation currentTool="images-to-pdf" className="mt-8" />
        </div>
      </div>
    </div>
  )
}
