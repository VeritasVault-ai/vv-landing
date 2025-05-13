"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { DefaultErrorFallback } from "./error-boundary/default-error-fallback"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error boundary component to catch JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    // Sanitize error information before logging
    const sanitizedError = {
      name: error.name,
      message: error.message,
      // Avoid logging potentially sensitive stack information in production
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    }
    console.error(
      "Error caught by ErrorBoundary:",
      sanitizedError,
      process.env.NODE_ENV !== 'production'
        ? errorInfo
        : { componentStack: 'hidden in production' }
    )
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    })
    
    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  // Reset the error boundary state
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Otherwise, use the default error fallback
      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          resetErrorBoundary={this.handleReset}
        />
      )
    }

    // When there's no error, render children normally
    return this.props.children
  }
}

/**
 * Displays a minimal error message and a retry button for use as a fallback UI in error boundaries.
 *
 * @param error - The error object to display.
 * @param resetErrorBoundary - Callback to reset the error boundary and attempt to re-render children.
 */
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-medium text-red-700 dark:text-red-400">
          Something went wrong
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={resetErrorBoundary}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Try Again</span>
      </Button>
    </div>
  )
}