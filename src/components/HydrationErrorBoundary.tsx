'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class HydrationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a hydration error
    const isHydrationError = 
      error.message?.includes('Hydration failed') ||
      error.message?.includes('Text content does not match') ||
      error.message?.includes('server rendered text') ||
      error.stack?.includes('hydration');

    if (isHydrationError) {
      console.warn('Hydration error caught by boundary:', error.message);
      return { hasError: true, error };
    }

    // Re-throw non-hydration errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log hydration errors for debugging
    console.warn('Hydration Error Boundary caught an error:', {
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      // Return fallback UI or null to suppress hydration errors
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export { HydrationErrorBoundary };
export default HydrationErrorBoundary;
