"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
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
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
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

      // Otherwise, use the default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
            An error occurred while rendering this component. Please try refreshing the page or contact support if the issue persists.
          </p>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6 max-w-full overflow-auto text-left">
              <p className="font-mono text-sm text-red-800 dark:text-red-300 mb-2">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="text-sm font-medium cursor-pointer">
                    Component Stack
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-red-50 dark:bg-red-900/50 rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      );
          <Button 
            variant="outline" 
            onClick={this.handleReset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        </div>
      )
    }

    // When there's no error, render children normally
    return this.props.children
  }
}

/**
 * A simpler error fallback component for use with the ErrorBoundary
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