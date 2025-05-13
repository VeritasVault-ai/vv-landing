"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAISettings } from "./ai-settings-provider"
import { Lightbulb, TrendingUp, FileText, BarChart3, ShieldAlert } from "lucide-react"

interface FeatureToggleProps {
  id: string
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  icon: React.ReactNode
}

/**
 * Renders a labeled toggle switch for enabling or disabling a specific feature.
 *
 * Displays a title, description, and icon alongside a switch that reflects the current state and can be toggled by the user.
 *
 * @param id - Unique identifier for the toggle control.
 * @param title - Display name of the feature.
 * @param description - Brief explanation of the feature.
 * @param checked - Whether the feature is currently enabled.
 * @param onChange - Callback invoked when the toggle state changes.
 * @param disabled - If true, the toggle is non-interactive.
 * @param icon - Icon representing the feature.
 */
function FeatureToggle({
  id,
  title,
  description,
  checked,
  onChange,
  disabled = false,
  icon
}: FeatureToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className="font-medium">{title}</Label>
          {icon}
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={`Enable ${title}`}
      />
    </div>
  )
}

/**
 * Displays a card interface for toggling individual AI feature settings within the dashboard.
 *
 * Renders switches for enabling or disabling specific AI features, reflecting the current settings and disabling controls if AI is globally turned off.
 */
export function AISettingsFeatures() {
  const { settings, updateFeature } = useAISettings()
  const disabled = !settings.enabled

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Features</CardTitle>
        <CardDescription>
          Control which AI features are enabled in the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FeatureToggle
          id="ai-recommendations"
          title="AI Recommendations"
          description="Get personalized recommendations based on your portfolio and market conditions"
          checked={settings.features.recommendations}
          onChange={(checked) => updateFeature('recommendations', checked)}
          disabled={disabled}
          icon={<Lightbulb className="h-4 w-4 text-yellow-500" />}
        />

        <FeatureToggle
          id="ai-predictions"
          title="AI Predictions"
          description="View AI-generated forecasts and trend predictions"
          checked={settings.features.predictions}
          onChange={(checked) => updateFeature('predictions', checked)}
          disabled={disabled}
          icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
        />

        <FeatureToggle
          id="ai-content-generation"
          title="AI Content Generation"
          description="Generate reports, summaries, and other content using AI"
          checked={settings.features.contentGeneration}
          onChange={(checked) => updateFeature('contentGeneration', checked)}
          disabled={disabled}
          icon={<FileText className="h-4 w-4 text-green-500" />}
        />

        <FeatureToggle
          id="ai-data-analysis"
          title="AI Data Analysis"
          description="Use AI to analyze complex data sets and identify patterns"
          checked={settings.features.dataAnalysis}
          onChange={(checked) => updateFeature('dataAnalysis', checked)}
          disabled={disabled}
          icon={<BarChart3 className="h-4 w-4 text-purple-500" />}
        />

        <FeatureToggle
          id="ai-risk-assessment"
          title="AI Risk Assessment"
          description="Get AI-powered risk analysis and mitigation suggestions"
          checked={settings.features.riskAssessment}
          onChange={(checked) => updateFeature('riskAssessment', checked)}
          disabled={disabled}
          icon={<ShieldAlert className="h-4 w-4 text-red-500" />}
        />
      </CardContent>
    </Card>
  )
}