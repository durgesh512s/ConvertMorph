import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '500 - Internal Server Error',
  description: 'We encountered an internal server error. Our team has been notified and is working to resolve the issue.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function InternalServerError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 dark:from-gray-900 dark:to-red-900/20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">500</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Internal Server Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We encountered an internal server error. Our team has been notified and is working to resolve the issue.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full">
            <Link href="/contact" className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Error occurred at: {new Date().toLocaleString()}</p>
          <p className="mt-2">
            If this problem persists, please <Link href="/contact" className="text-red-600 dark:text-red-400 hover:underline">contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
