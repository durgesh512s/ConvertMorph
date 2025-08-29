import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Shield, AlertTriangle, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | ConvertMorph - PDF Tools',
  description: 'Terms of Service for ConvertMorph. Learn about our service terms, user responsibilities, and legal agreements for using our PDF tools.',
  openGraph: {
    title: 'Terms of Service | ConvertMorph',
    description: 'Terms of Service and user agreements for ConvertMorph PDF tools.',
    type: 'website',
  },
}

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using ConvertMorph services.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last Updated: {today}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                File Ownership
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                You must own or have rights to all files you process through our service.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Acceptable Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Use our service responsibly and in compliance with all applicable laws.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <AlertTriangle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Service Availability
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Service is provided "as is" with no guarantee of uninterrupted availability.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <Scale className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Limited Liability
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Our liability is limited to the maximum extent permitted by law.
              </p>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  By accessing and using ConvertMorph ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service may be updated from time to time without notice. Your continued use of the Service constitutes acceptance of any changes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  ConvertMorph provides online PDF processing tools including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>PDF compression and optimization</li>
                  <li>PDF merging and splitting</li>
                  <li>PDF to image conversion</li>
                  <li>Image to PDF conversion</li>
                  <li>PDF page organization</li>
                  <li>PDF watermarking and signing</li>
                  <li>PDF page numbering</li>
                </ul>
                <p>
                  All file processing is performed locally in your browser using client-side JavaScript. We do not store your files on our servers beyond temporary processing requirements.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>By using our service, you agree that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You own or have the legal right to process all files you upload</li>
                  <li>You will not use the service to process copyrighted material without permission</li>
                  <li>You will not upload malicious files, viruses, or harmful content</li>
                  <li>You will not attempt to reverse engineer or exploit the service</li>
                  <li>You will not use the service for illegal activities</li>
                  <li>You will not abuse the service through excessive automated requests</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Privacy and Data Handling
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link> to understand how we collect, use, and protect your information.
                </p>
                <p>Key points regarding your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Files are processed locally in your browser when possible</li>
                  <li>Temporary files on our servers are automatically deleted within 1 hour</li>
                  <li>We do not access, view, or store the content of your files</li>
                  <li>We collect basic analytics to improve our service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Service Availability and Limitations
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  ConvertMorph is provided "as is" without warranty of any kind. We make no guarantees about:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Continuous availability of the service</li>
                  <li>Error-free operation</li>
                  <li>Compatibility with all file types or browsers</li>
                  <li>Processing speed or performance</li>
                </ul>
                <p>
                  We reserve the right to limit usage, implement rate limiting, or temporarily suspend service for maintenance or abuse prevention.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  The ConvertMorph service, including its design, code, and functionality, is owned by us and protected by copyright and other intellectual property laws.
                </p>
                <p>
                  You retain all rights to your files and content. We claim no ownership over files you process through our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  To the maximum extent permitted by law, ConvertMorph and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use or inability to use the service</li>
                  <li>Loss of data or files</li>
                  <li>Service interruptions or errors</li>
                  <li>Unauthorized access to your files</li>
                  <li>Any other matter relating to the service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Indemnification
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  You agree to indemnify and hold harmless ConvertMorph and its operators from any claims, damages, or expenses arising from your use of the service or violation of these terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Termination
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason, including breach of these Terms of Service.
                </p>
                <p>
                  You may discontinue use of the service at any time.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Governing Law
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or use of the service shall be resolved through appropriate legal channels.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p>
                  <a href="mailto:support@convertmorph.com" className="text-blue-600 hover:text-blue-700 underline">
                    support@convertmorph.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
                </p>
                <p>
                  We encourage you to review these terms periodically for any updates.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
