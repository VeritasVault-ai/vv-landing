"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ApiErrorFallbackProps {
  error: Error
  resetErrorBoundary?: () => void
}

export function ApiErrorFallback({ error, resetErrorBoundary }: ApiErrorFallbackProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        <p className="mb-2">We encountered an error while fetching data:</p>
        <p className="font-mono text-sm mb-4">{error.message}</p>
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} size="sm" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
