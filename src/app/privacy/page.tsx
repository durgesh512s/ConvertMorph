import { Metadata } from 'next'
import { getCurrentDate } from '@/lib/date-utils'
import { absoluteUrl } from '@/lib/url'
import { Shield, Lock, Trash2, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | ConvertMorph - PDF Tools',
  description: 'Learn how ConvertMorph protects your privacy. We process files locally in your browser and never store your documents on our servers. GDPR compliant.',
  keywords: 'privacy policy, GDPR, data protection, file privacy, PDF tools privacy',
  openGraph: {
    title: 'Privacy Policy | ConvertMorph',
    description: 'Your privacy is our priority. All file processing happens locally in your browser. GDPR compliant.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/privacy'),
  },
}

export default function PrivacyPage() {
  const today = getCurrentDate()

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://convertmorph.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": "https://convertmorph.com/privacy"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Contact Information:</strong> When you contact us via our contact form, we collect your name, email address, and message content.</li>
                  <li><strong>File Processing:</strong> We do not store your files on our servers after processing completes. Temporary files are auto-deleted within 1 hour for security.</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Analytics Data:</strong> We collect basic analytics including page views, device type, browser information, and approximate location to improve our service.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our tools, including tool usage frequency and error reports.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, operating system, and referring website for security and optimization purposes.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service Provision:</strong> To provide, maintain, and improve our PDF processing tools</li>
                  <li><strong>Customer Support:</strong> To respond to your inquiries and provide technical support</li>
                  <li><strong>Analytics:</strong> To understand usage patterns and improve user experience</li>
                  <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We use cookies and similar tracking technologies to enhance your experience:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant advertisements</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. For personalized ads, visit <a href="https://adssettings.google.com" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a> to manage your preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Google AdSense and Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We use Google AdSense to display advertisements on our website. Google may use cookies and other tracking technologies to serve ads based on your interests and previous visits to our site and other websites.
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet</li>
                  <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                  <li>You can also opt out of third-party vendor use of cookies by visiting the <a href="http://www.networkadvertising.org/managing/opt_out.asp" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a></li>
                </ul>
                <p>
                  Third-party links on our site have their own privacy policies. We are not responsible for the privacy practices of external websites.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Retention and Security
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Retention</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Processed Files:</strong> Automatically deleted within 1 hour of processing</li>
                  <li><strong>Contact Information:</strong> Retained for 2 years or until you request deletion</li>
                  <li><strong>Analytics Data:</strong> Retained for up to 26 months as per Google Analytics standards</li>
                  <li><strong>Error Logs:</strong> Retained for up to 12 months for debugging purposes</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Measures</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Secure file processing with automatic deletion</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and monitoring systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights Under GDPR
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>If you are a resident of the European Union, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of processing your personal data</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at <a href="mailto:support@convertmorph.com" className="text-blue-600 hover:text-blue-700 underline">support@convertmorph.com</a>. We will respond within 30 days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal data in accordance with applicable data protection laws.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Children's Privacy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:support@convertmorph.com" className="text-blue-600 hover:text-blue-700 underline">support@convertmorph.com</a></li>
                  <li><strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">Available on our website</a></li>
                  <li><strong>Response Time:</strong> We aim to respond within 24-48 hours</li>
                </ul>
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
    </>
  )
}
