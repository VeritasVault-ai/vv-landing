"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAISettings } from "./ai-settings-provider"
import { UserCircle, Clock } from "lucide-react"

/**
 * Renders a user interface for managing AI personalization settings, allowing users to select a personalization level and choose whether to include historical activity data.
 *
 * The component disables controls if AI features are turned off and provides contextual information about the impact of personalization choices.
 */
export function AISettingsPersonalization() {
  const { settings, updatePersonalization } = useAISettings()
  const disabled = !settings.enabled

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <span>Personalization</span>
        </CardTitle>
        <CardDescription>
          Control how AI features are personalized to your preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base mb-3 block">Personalization Level</Label>
          <RadioGroup
            value={settings.personalization.level}
            onValueChange={(value) => 
              updatePersonalization('level', value as 'none' | 'low' | 'medium' | 'high')
            }
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="personalization-none" />
              <Label htmlFor="personalization-none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="personalization-low" />
              <Label htmlFor="personalization-low">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="personalization-medium" />
              <Label htmlFor="personalization-medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="personalization-high" />
              <Label htmlFor="personalization-high">High</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground mt-2">
            Higher levels of personalization provide more tailored experiences but use more of your data.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-historical-data">Include Historical Data</Label>
              <Clock className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Use your historical activity data to improve personalization
            </p>
          </div>
          <Switch
            id="ai-historical-data"
            checked={settings.personalization.includeHistoricalData}
            onCheckedChange={(checked) => updatePersonalization('includeHistoricalData', checked)}
            disabled={disabled || settings.personalization.level === 'none'}
            aria-label="Include historical data for personalization"
          />
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md text-sm text-yellow-800 dark:text-yellow-200 mt-4">
          <p className="font-medium">About Personalization</p>
          <p className="mt-1">
            Higher personalization levels may improve AI recommendations but require more data processing.
            You can change these settings at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}