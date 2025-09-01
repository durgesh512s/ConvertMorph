'use client'

import React, { useEffect } from 'react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterProps {
  className?: string
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
}

export default function Newsletter({
  className = '',
  title = 'Stay Updated',
  description = 'Get the latest PDF tips, tutorials, and tool updates delivered to your inbox. Join thousands of users who trust ConvertMorph for their document needs.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe'
}: NewsletterProps) {
  const { state, subscribe, reset, setEmail } = useNewsletter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state.email && !state.isLoading) {
      await subscribe(state.email)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // Auto-reset success/error messages after 3 seconds
  useEffect(() => {
    if (state.isSuccess || state.error) {
      const timer = setTimeout(() => {
        // Only clear success/error states, keep email
        setEmail(state.email) // This will clear error and success states
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.isSuccess, state.error, state.email, setEmail])

  return (
    <div className={`bg-gradient-to-r from-blue-50/50 to-blue-50 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30 rounded-lg p-8 ${className}`}>
      <div className="text-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          {description}
        </p>

        {/* Success State */}
        {state.isSuccess && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in fade-in duration-300">
            <div className="flex items-center justify-center text-green-800 dark:text-green-300">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">{state.message}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-in fade-in duration-300">
            <div className="flex items-center justify-center text-red-800 dark:text-red-300">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">{state.error}</span>
            </div>
          </div>
        )}

        {/* Form - Always visible */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="email"
              value={state.email}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={state.isLoading}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                state.error 
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10' 
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              } dark:text-white dark:placeholder-gray-400`}
              required
            />
            {state.isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={state.isLoading || !state.email.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              state.isLoading
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {state.isLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subscribing...
              </div>
            ) : (
              buttonText
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}
