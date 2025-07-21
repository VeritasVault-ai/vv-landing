import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorStyles } from "./styles";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * A simpler error fallback component for use with the ErrorBoundary
 */
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: ErrorFallbackProps) {
  return (
    <div className={errorStyles.container.compact}>
      <div className={errorStyles.header.compact}>
        <AlertCircle className={errorStyles.icon.small} />
        <h3 className={errorStyles.heading.small}>
          Something went wrong
        </h3>
      </div>
      <p className={errorStyles.text.compact}>
        {error.message || "An unexpected error occurred"}
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={resetErrorBoundary}
        className={errorStyles.button.default}
      >
        <RefreshCw className={errorStyles.button.icon} />
        <span>Try Again</span>
      </Button>
    </div>
  );
}