import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorStyles } from "./styles";
import { ErrorInfo } from "react";

interface DefaultErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
}

/**
 * Default error fallback UI for the ErrorBoundary
 */
export function DefaultErrorFallback({ 
  error, 
  errorInfo,
  resetErrorBoundary 
}: DefaultErrorFallbackProps) {
  return (
    <div className={errorStyles.container.default}>
      <AlertCircle className={errorStyles.icon.large} />
      <h2 className={errorStyles.heading.large}>
        Something went wrong
      </h2>
      <p className={errorStyles.text.default}>
        An error occurred while rendering this component. Please try refreshing the page or contact support if the issue persists.
      </p>
      {process.env.NODE_ENV === "development" && error && (
        <div className={errorStyles.errorDetails.container}>
          <p className={errorStyles.errorDetails.message}>
            {/* Only show generic error information in production */}
            {process.env.NODE_ENV === 'production'
              ? 'An unexpected error occurred.'
              : error.toString()}
          </p>
          {errorInfo && process.env.NODE_ENV !== 'production' && (
            <details className={errorStyles.errorDetails.stackContainer}>
              <summary className={errorStyles.errorDetails.stackSummary}>
                Component Stack
              </summary>
              <pre className={errorStyles.errorDetails.stackContent}>
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )}
      <Button 
        variant="outline" 
        onClick={resetErrorBoundary}
        className={errorStyles.button.default}
      >
        <RefreshCw className={errorStyles.button.icon} />
        <span>Try Again</span>
      </Button>
    </div>
  );
}