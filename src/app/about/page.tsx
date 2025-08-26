import { Metadata } from 'next'
import { Zap, Shield, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About DocMorph | Fast, Private PDF Tools',
  description: 'Learn about DocMorph - fast, private file tools for everyone. Convert, compress, and organize PDFs and images right in your browser.',
  openGraph: {
    title: 'About DocMorph | Fast, Private PDF Tools',
    description: 'Fast, private file tools for everyone. Many tasks run locally on your device.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Fast, private file tools for everyone.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              DocMorph helps you convert, compress, and organize PDFs and images right in your browser. Many tasks run locally on your device — so your files don&apos;t need to leave your computer.
            </p>
          </div>

          {/* Why DocMorph Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why DocMorph?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Speed
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized pipelines and local processing deliver results instantly without waiting for uploads or downloads.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Temporary files auto-delete. Your sensitive documents never leave your device when using local processing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Free forever
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Core tools remain free with no hidden costs or limitations. Professional-grade features for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              We believe that powerful file processing tools should be accessible to everyone without compromising privacy or requiring expensive software. DocMorph brings professional-grade PDF and image tools directly to your browser, ensuring your files stay secure while delivering the performance you need.
            </p>
          </div>

          {/* Technology Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Local Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Many of our tools run entirely in your browser using modern web technologies like WebAssembly and JavaScript libraries. This means faster processing and complete privacy.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>No file uploads required</li>
                  <li>Instant processing</li>
                  <li>Works offline</li>
                  <li>Complete privacy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Cloud Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  For complex operations that require more computational power, we use secure cloud processing with automatic file deletion.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Advanced compression algorithms</li>
                  <li>Large file support</li>
                  <li>Auto-delete within 1 hour</li>
                  <li>Encrypted transmission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="h-6 w-6 text-blue-600 mr-3" />
                Universal Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our tools work on any device with a modern web browser. No downloads, installations, or platform restrictions. Whether you&apos;re on Windows, Mac, Linux, or mobile, DocMorph works for you.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                Privacy by Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We built DocMorph with privacy as a core principle, not an afterthought. Local processing, automatic file deletion, and minimal data collection ensure your documents remain private.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Built for You
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              DocMorph is built by a team of developers who understand the importance of privacy and efficiency in file processing. We use DocMorph ourselves every day and continuously improve it based on real-world needs.
            </p>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-300">
                Have questions or feedback? We&apos;d love to hear from you.
              </p>
              <a 
                href="/contact" 
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
