"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
  compact?: boolean
}

export function FeatureErrorState({
  title = "Feature Unavailable",
  message = "We're having trouble loading this feature. Please try again later.",
  onRetry,
  className = "",
  compact = false,
}: FeatureErrorStateProps) {
  if (compact) {
    return (
      <div className={`p-4 bg-destructive/10 border border-destructive/20 rounded-md ${className}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-destructive mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground">{message}</p>
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="mt-2 h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className={`border-destructive/50 ${className}`}>
      <CardHeader className="bg-destructive/10 border-b border-destructive/20 py-3">
        <CardTitle className="text-destructive flex items-center gap-2 text-base">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 text-sm text-muted-foreground">{message}</CardContent>
      {onRetry && (
        <CardFooter>
          <Button variant="outline" size="sm" onClick={onRetry} className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
