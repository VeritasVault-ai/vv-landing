"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

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
 * Sanitize error messages to prevent leaking sensitive information
 */
function sanitizeErrorMessage(message: string): string {
  if (!message) return message;
  
  // Remove potential API keys, tokens, or credentials from error messages
  return message.replace(
    /(api[_-]?key|token|key|secret|password|credential|auth)[=:]\s*["']?\w+["']?/gi,
    '$1=[REDACTED]'
  );
}

/**
 * Sanitize stack traces to prevent leaking sensitive information
 */
function sanitizeStackTrace(stack: string | undefined): string | undefined {
  if (!stack) return stack;
  
  // Remove potential API keys, tokens, or credentials from stack traces
  return stack.replace(
    /(api[_-]?key|token|key|secret|password|credential|auth)[=:]\s*["']?\w+["']?/gi,
    '$1=[REDACTED]'
  );
}

/**
 * Security-enhanced error boundary component to catch JavaScript errors
 * with proper sanitization of sensitive information
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
    // Create sanitized versions for logging
    const sanitizedError = {
      name: error.name,
      message: sanitizeErrorMessage(error.message),
      stack: sanitizeStackTrace(error.stack),
    };
    
    const sanitizedErrorInfo = {
      ...errorInfo,
      componentStack: sanitizeStackTrace(errorInfo.componentStack)
    };
    
    // Log sanitized error
    console.error("Error caught by ErrorBoundary:", sanitizedError, sanitizedErrorInfo);
    
    // Call onError prop if provided
    if (this.props.onError) {
      // Pass original error to handler (which should implement its own sanitization)
      this.props.onError(error, errorInfo);
    }
    
    this.setState({
      error,
      errorInfo
    });
    
    // Optional: Send error to monitoring service
    // this.logErrorToService(sanitizedError, sanitizedErrorInfo);
  }
  
  /**
   * Log error to monitoring service like Sentry, LogRocket, etc.
   * Ensure sensitive data is sanitized before sending
   */
  private logErrorToService(error: any, errorInfo: any) {
    // Implementation would depend on your monitoring service
    // Example with Sentry:
    // Sentry.captureException(error, { extra: { errorInfo } });
  }

  // Reset the error boundary state
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, use the default error UI with sanitized information
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-center" role="alert" aria-live="assertive">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
            An error occurred while rendering this component. Please try refreshing the page or contact support if the issue persists.
          </p>
          {this.state.error && (
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6 max-w-full overflow-auto text-left">
              <p className="font-mono text-sm text-red-800 dark:text-red-300 mb-2">
                {sanitizeErrorMessage(this.state.error.toString())}
              </p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="text-sm font-medium cursor-pointer">
                    Component Stack
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-red-50 dark:bg-red-900/50 rounded">
                    {sanitizeStackTrace(this.state.errorInfo.componentStack)}
                  </pre>
                </details>
              )}
            </div>
          )}
          <Button 
            variant="outline" 
            onClick={this.handleReset}
            className="flex items-center gap-2"
            aria-label="Try again"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>Try Again</span>
          </Button>
        </div>
      );
    }

    // When there's no error, render children normally
    return this.props.children;
  }
}

/**
 * A simpler error fallback component for use with the ErrorBoundary
 * with security enhancements
 */
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error
  resetErrorBoundary: () => void
}) {
  // Sanitize error message before rendering
  const sanitizedMessage = sanitizeErrorMessage(error.message || "An unexpected error occurred");
  
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg" role="alert">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
        <h3 className="text-lg font-medium text-red-700 dark:text-red-400">
          Something went wrong
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        {sanitizedMessage}
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={resetErrorBoundary}
        className="flex items-center gap-2"
        aria-label="Try again"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}