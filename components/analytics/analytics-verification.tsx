"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { trackGAEvent } from "@/lib/analytics/track-ga-event"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { useEffect, useState } from "react"

export function AnalyticsVerification() {
  const [gaLoaded, setGaLoaded] = useState<boolean | null>(null)
  const [eventSent, setEventSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if GA is loaded
    if (typeof window !== "undefined") {
      try {
        const isGaLoaded = window.gtag && typeof window.gtag === "function"
        setGaLoaded(isGaLoaded)
        if (!isGaLoaded) {
          setError("Google Analytics (gtag) is not loaded properly")
        }
      } catch (err) {
        setGaLoaded(false)
        setError("Error checking Google Analytics: " + (err instanceof Error ? err.message : String(err)))
      }
    }
  }, [])

  const sendTestEvent = () => {
    try {
      trackGAEvent({
        action: "test_event",
        category: "Testing",
        label: "GA Verification",
        value: 1,
      })
      setEventSent(true)
    } catch (err) {
      setError("Error sending test event: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Google Analytics Verification</CardTitle>
        <CardDescription>Check if Google Analytics is properly configured for VeritasVault.net</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={gaLoaded === null ? "default" : gaLoaded ? "default" : "destructive"}>
          <div className="flex items-center gap-2">
            {gaLoaded === null ? (
              <Info className="h-5 w-5" />
            ) : gaLoaded ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <AlertTitle>
              {gaLoaded === null
                ? "Checking..."
                : gaLoaded
                  ? "Google Analytics Detected"
                  : "Google Analytics Not Detected"}
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            {gaLoaded === null
              ? "Checking if Google Analytics is properly loaded..."
              : gaLoaded
                ? "Google Analytics (gtag.js) is properly loaded with Measurement ID: " +
                  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                : "Google Analytics is not properly configured. Please check your implementation."}
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {eventSent && (
          <Alert>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <AlertTitle>Test Event Sent</AlertTitle>
            <AlertDescription>
              A test event has been sent to Google Analytics. Check your GA4 DebugView to confirm it was received.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={sendTestEvent} disabled={!gaLoaded || eventSent} className="w-full">
          {eventSent ? "Test Event Sent" : "Send Test Event"}
        </Button>
      </CardFooter>
    </Card>
  )
}
