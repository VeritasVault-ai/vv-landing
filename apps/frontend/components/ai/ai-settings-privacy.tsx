"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAISettings } from "./ai-settings-provider"
import { Lock, MessageSquareShare, UserX } from "lucide-react"
import { Separator } from "@/components/ui/separator"

/**
 * Renders a user interface for managing AI-related privacy settings.
 *
 * Displays toggle switches for data collection, improvement feedback, and anonymizing interactions, allowing users to control how their data is used with AI features. All controls are disabled if AI features are turned off.
 */
export function AISettingsPrivacy() {
  const { settings, updatePrivacy } = useAISettings()
  const disabled = !settings.enabled

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <span>Privacy Settings</span>
        </CardTitle>
        <CardDescription>
          Control how your data is used with AI features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-data-collection">Data Collection</Label>
            <p className="text-sm text-muted-foreground">
              Allow collection of usage data to improve AI features
            </p>
          </div>
          <Switch
            id="ai-data-collection"
            checked={settings.privacy.allowDataCollection}
            onCheckedChange={(checked) => updatePrivacy('allowDataCollection', checked)}
            disabled={disabled}
            aria-label="Allow AI data collection"
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-improvement-feedback">Improvement Feedback</Label>
              <MessageSquareShare className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Share feedback about AI features to help improve them
            </p>
          </div>
          <Switch
            id="ai-improvement-feedback"
            checked={settings.privacy.allowImprovementFeedback}
            onCheckedChange={(checked) => updatePrivacy('allowImprovementFeedback', checked)}
            disabled={disabled}
            aria-label="Allow AI improvement feedback"
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-anonymize-interactions">Anonymize Interactions</Label>
              <UserX className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Remove personally identifiable information from AI interactions
            </p>
          </div>
          <Switch
            id="ai-anonymize-interactions"
            checked={settings.privacy.anonymizeInteractions}
            onCheckedChange={(checked) => updatePrivacy('anonymizeInteractions', checked)}
            disabled={disabled}
            aria-label="Anonymize AI interactions"
          />
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-1">Privacy Notice</p>
          <p>
            Your data privacy is important to us. We only use your data as described in our 
            <a href="/privacy-policy" className="underline ml-1">Privacy Policy</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}