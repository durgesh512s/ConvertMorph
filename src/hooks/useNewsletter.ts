'use client'

import { useState } from 'react'

interface NewsletterState {
  email: string
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  message: string | null
}

interface UseNewsletterReturn {
  state: NewsletterState
  subscribe: (email: string) => Promise<void>
  reset: () => void
  setEmail: (email: string) => void
}

export function useNewsletter(): UseNewsletterReturn {
  const [state, setState] = useState<NewsletterState>({
    email: '',
    isLoading: false,
    isSuccess: false,
    error: null,
    message: null
  })

  const subscribe = async (email: string) => {
    // Reset previous state
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      message: null,
      isSuccess: false
    }))

    try {
      // Client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.trim()) {
        throw new Error('Email is required')
      }
      if (!emailRegex.test(email.trim())) {
        throw new Error('Please enter a valid email address')
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        message: data.message
        // Keep email for easy re-subscription
      }))

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        isSuccess: false
      }))
    }
  }

  const reset = () => {
    setState({
      email: '',
      isLoading: false,
      isSuccess: false,
      error: null,
      message: null
    })
  }

  const setEmail = (email: string) => {
    setState(prev => ({
      ...prev,
      email,
      error: null // Clear error when user types
    }))
  }

  return {
    state,
    subscribe,
    reset,
    setEmail
  }
}
