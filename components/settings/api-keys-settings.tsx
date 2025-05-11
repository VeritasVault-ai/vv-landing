"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Loader2, Save, Eye, EyeOff } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"

const apiKeySchema = z.object({
  googleApiKey: z.string().min(1, "Google API Key is required"),
  googleAnalyticsId: z.string().optional(),
})

type ApiKeyFormValues = z.infer<typeof apiKeySchema>

export function ApiKeysSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const supabase = createBrowserClient()

  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      googleApiKey: "",
      googleAnalyticsId: "",
    },
  })

  // Load existing API keys if available
  useEffect(() => {
    const loadApiKeys = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session) return

        const { data, error } = await supabase
          .from("user_settings")
          .select("google_api_key, google_analytics_id")
          .eq("user_id", session.user.id)
          .single()

        if (error) {
          console.error("Error loading API keys:", error)
          return
        }

        if (data) {
          if (data.google_api_key) {
            form.setValue("googleApiKey", data.google_api_key)
          }
          if (data.google_analytics_id) {
            form.setValue("googleAnalyticsId", data.google_analytics_id)
          }
        }
      } catch (error) {
        console.error("Error loading API keys:", error)
      }
    }

    loadApiKeys()
  }, [form, supabase])

  async function onSubmit(data: ApiKeyFormValues) {
    setIsLoading(true)
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to save settings",
          variant: "destructive",
        })
        return
      }

      // Check if user settings exist
      const { data: existingSettings } = await supabase
        .from("user_settings")
        .select("id")
        .eq("user_id", session.user.id)
        .single()

      let result

      if (existingSettings) {
        // Update existing settings
        result = await supabase
          .from("user_settings")
          .update({
            google_api_key: data.googleApiKey,
            google_analytics_id: data.googleAnalyticsId || null,
          })
          .eq("user_id", session.user.id)
      } else {
        // Create new settings
        result = await supabase.from("user_settings").insert({
          user_id: session.user.id,
          google_api_key: data.googleApiKey,
          google_analytics_id: data.googleAnalyticsId || null,
        })
      }

      if (result.error) {
        throw result.error
      }

      toast({
        title: "Settings Saved",
        description: "Your API keys have been saved successfully",
      })
    } catch (error: any) {
      console.error("Error saving API keys:", error)
      toast({
        title: "Error Saving Settings",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage your API keys for external services</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="googleApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google API Key</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        placeholder="Enter your Google API key"
                        {...field}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="ml-2"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Used for Google services integration.{" "}
                    <a
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Get your API key
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Analytics Measurement ID</FormLabel>
                  <FormControl>
                    <Input placeholder="G-XXXXXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Google Analytics 4 measurement ID (starts with G-).{" "}
                    <a
                      href="https://analytics.google.com/analytics/web/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Get your measurement ID
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>Your API keys are stored securely and never shared with third parties.</p>
        <p className="mt-2">
          <strong>Note:</strong> You may need to enable specific APIs in your Google Cloud Console for these keys.
        </p>
      </CardFooter>
    </Card>
  )
}
