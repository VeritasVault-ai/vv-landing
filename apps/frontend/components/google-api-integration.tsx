"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import Link from "next/link"

interface GoogleApiIntegrationProps {
  service: "maps" | "analytics" | "youtube" | "custom"
  customService?: string
}

export function GoogleApiIntegration({ service, customService }: GoogleApiIntegrationProps) {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserClient()

  const serviceName = service === "custom" ? customService : service

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setError("You must be logged in to use this feature")
          return
        }

        const { data, error } = await supabase
          .from("user_settings")
          .select("google_api_key")
          .eq("user_id", session.user.id)
          .single()

        if (error) {
          throw error
        }

        setApiKey(data?.google_api_key || null)
      } catch (err: any) {
        console.error("Error fetching Google API key:", err)
        setError(err.message || "Failed to load Google API key")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!apiKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Google {serviceName} Integration</CardTitle>
          <CardDescription>You need to add your Google API key to use this feature</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Key Required</AlertTitle>
            <AlertDescription>
              To use Google {serviceName}, you need to add your Google API key in settings.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/settings?tab=api-keys">Add Google API Key</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google {serviceName} Integration</CardTitle>
        <CardDescription>Your Google API key is configured and ready to use</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content that uses the Google API would go here */}
        <p>Google {serviceName} integration is active and ready to use.</p>
      </CardContent>
    </Card>
  )
}
