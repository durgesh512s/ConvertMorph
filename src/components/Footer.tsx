import React from 'react';
import Link from 'next/link';
import { getCurrentYear } from '@/lib/date-utils';
import Logo from './Logo';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-4">
              Professional tools for PDF, Image, Text, and Finance tasks that work entirely in your browser. Fast, secure, and completely free.
            </p>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              <Link href="/tools?category=pdf" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                PDF Tools
              </Link>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/pdf-compress" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF Compress
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merge" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF Merge
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-split" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF Split
                </Link>
              </li>
              <li>
                <Link href="/tools/images-to-pdf" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Images to PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-images" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  PDF to Images
                </Link>
              </li>
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              <Link href="/tools?category=image" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Image Tools
              </Link>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/image-compress" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Compress
                </Link>
              </li>
              <li>
                <Link href="/tools/image-resize" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Resize
                </Link>
              </li>
              <li>
                <Link href="/tools/image-convert" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/image-crop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Crop
                </Link>
              </li>
            </ul>
          </div>

          {/* Text & Finance Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              <Link href="/tools?category=text" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Text Tools
              </Link>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/word-counter" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/text-compare" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Text Compare
                </Link>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 mt-6">
              <Link href="/tools?category=finance" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Finance Tools
              </Link>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/tax-calculator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/emi-calculator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/sip-calculator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SIP Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {getCurrentYear()} ConvertMorph. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
