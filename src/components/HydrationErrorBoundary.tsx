'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  suppressHydrationWarning?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  isHydrationError: boolean;
}

class HydrationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isHydrationError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a hydration error (React error #418 or similar)
    const isHydrationError = 
      error.message?.includes('Hydration failed') ||
      error.message?.includes('Text content does not match') ||
      error.message?.includes('server rendered text') ||
      error.message?.includes('Minified React error #418') ||
      error.message?.includes('server rendered HTML didn\'t match the client') ||
      error.stack?.includes('hydration') ||
      error.stack?.includes('418');

    if (isHydrationError) {
      // Suppress hydration errors in production
      if (process.env.NODE_ENV === 'production') {
        console.warn('Hydration mismatch detected and suppressed:', error.message);
      } else {
        console.warn('Hydration error caught by boundary:', error.message);
      }
      return { hasError: true, error, isHydrationError: true };
    }

    // Re-throw non-hydration errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log hydration errors for debugging
    if (this.state.isHydrationError) {
      console.warn('Hydration Error Boundary caught an error:', {
        error: error.message,
        componentStack: errorInfo.componentStack,
        isProduction: process.env.NODE_ENV === 'production',
      });
      
      // In development, provide more detailed information
      if (process.env.NODE_ENV === 'development') {
        console.group('Hydration Error Details');
        console.log('Error:', error);
        console.log('Component Stack:', errorInfo.componentStack);
        console.log('Error Stack:', error.stack);
        console.groupEnd();
      }
    }
  }

  componentDidMount() {
    // Reset error state after mount to allow re-rendering
    if (this.state.hasError && this.state.isHydrationError) {
      setTimeout(() => {
        this.setState({ hasError: false, isHydrationError: false });
      }, 0);
    }
  }

  render() {
    if (this.state.hasError && this.state.isHydrationError) {
      // Return fallback UI or null to suppress hydration errors
      return this.props.fallback || null;
    }

    return (
      <div suppressHydrationWarning={this.props.suppressHydrationWarning}>
        {this.props.children}
      </div>
    );
  }
}

export { HydrationErrorBoundary };
export default HydrationErrorBoundary;
