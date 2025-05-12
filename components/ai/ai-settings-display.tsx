"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAISettings } from "./ai-settings-provider"
import { BarChart, Highlighter, MessageSquare } from "lucide-react"

/**
 * Component for controlling AI display settings
 */
export function AISettingsDisplay() {
  const { settings, updateDisplay } = useAISettings()
  const disabled = !settings.enabled

  return (
    <Card>
      <CardHeader>
        <CardTitle>Display Settings</CardTitle>
        <CardDescription>
          Control how AI features are displayed in the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-confidence-scores">Confidence Scores</Label>
              <BarChart className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Show confidence scores for AI-generated content
            </p>
          </div>
          <Switch
            id="ai-confidence-scores"
            checked={settings.display.showConfidenceScores}
            onCheckedChange={(checked) => updateDisplay('showConfidenceScores', checked)}
            disabled={disabled}
            aria-label="Show AI confidence scores"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-highlight-content">Highlight AI Content</Label>
              <Highlighter className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Visually highlight content that is AI-generated
            </p>
          </div>
          <Switch
            id="ai-highlight-content"
            checked={settings.display.highlightAIContent}
            onCheckedChange={(checked) => updateDisplay('highlightAIContent', checked)}
            disabled={disabled}
            aria-label="Highlight AI content"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-feedback-prompts">Feedback Prompts</Label>
              <MessageSquare className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Show prompts to provide feedback on AI-generated content
            </p>
          </div>
          <Switch
            id="ai-feedback-prompts"
            checked={settings.display.showFeedbackPrompts}
            onCheckedChange={(checked) => updateDisplay('showFeedbackPrompts', checked)}
            disabled={disabled}
            aria-label="Show AI feedback prompts"
          />
        </div>
      </CardContent>
    </Card>
  )
}