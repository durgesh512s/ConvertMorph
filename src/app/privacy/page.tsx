import { Metadata } from 'next'
import { Shield, Lock, Trash2, Eye, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | ConvertMorph - PDF Tools',
  description: 'Learn how ConvertMorph protects your privacy. We process files locally in your browser and never store your documents on our servers.',
  openGraph: {
    title: 'Privacy Policy | ConvertMorph',
    description: 'Your privacy is our priority. All file processing happens locally in your browser.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We built ConvertMorph to process your files quickly and privately.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last Updated: {today}
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Local Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All file processing happens in your browser. Your files never leave your device.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <Trash2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Auto-Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Temporary files are automatically deleted within 1 hour.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We collect basic analytics to improve the product.
              </p>
            </div>
          </div>

          {/* Detailed Policy */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                What we collect
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>We do not store your files on our servers after processing completes. Temporary files are auto-deleted within 1 hour.</li>
                  <li>We collect basic analytics (page views, device type, approximate location) to improve the product.</li>
                  <li>If you contact us, we keep your email to reply.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookies
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We may use cookies to remember preferences and measure traffic. For personalized ads (if enabled), our partners (e.g., Google) may use cookies. You can manage ad settings in your browser or at <a href="https://adssettings.google.com" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Ads & third parties
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We follow platform policies and do not allow illegal content. Some pages may include links to third-party sites; their privacy practices are their own.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data retention
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Job files:</strong> auto-delete within 1 hour.</li>
                  <li><strong>Error logs/analytics:</strong> up to 12 months.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  For questions or deletion requests: <a href="mailto:support@convertmorph.com" className="text-blue-600 hover:text-blue-700 underline">support@convertmorph.com</a>
                </p>
              </div>
            </section>

            {/* Terms of Use Section */}
            <section className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Terms of Use
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>By using ConvertMorph, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You own or have rights to the files you process.</li>
                  <li>You won&apos;t use the service to infringe copyright, share malware, or violate laws.</li>
                  <li>Service is provided &quot;as is,&quot; with no warranty of uninterrupted availability.</li>
                  <li>We may rate-limit or block abusive usage.</li>
                  <li>Liability is limited to the maximum extent permitted by law.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
