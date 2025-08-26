import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ConvertMorph</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Fast, private PDF tools — free forever. Convert, compress, and organize PDFs in your browser. Your files stay on your device.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/pdf-compress" className="text-sm text-gray-600 hover:text-blue-600">
                  PDF Compress
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merge" className="text-sm text-gray-600 hover:text-blue-600">
                  PDF Merge
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-split" className="text-sm text-gray-600 hover:text-blue-600">
                  PDF Split
                </Link>
              </li>
              <li>
                <Link href="/tools/images-to-pdf" className="text-sm text-gray-600 hover:text-blue-600">
                  Images to PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-images" className="text-sm text-gray-600 hover:text-blue-600">
                  PDF to Images
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ConvertMorph. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
