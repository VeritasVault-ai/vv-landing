"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAISettings } from "./ai-settings-provider"
import { Sparkles, History } from "lucide-react"

/**
 * Component for controlling general AI settings
 */
export function AISettingsGeneral() {
  const { settings, updateSettings } = useAISettings()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span>General AI Settings</span>
        </CardTitle>
        <CardDescription>
          Control how AI features work throughout the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-enabled">Enable AI Features</Label>
            <p className="text-sm text-muted-foreground">
              Turn on AI-powered features across the dashboard
            </p>
          </div>
          <Switch
            id="ai-enabled"
            checked={settings.enabled}
            onCheckedChange={(checked) => updateSettings({ enabled: checked })}
            aria-label="Enable AI features"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-history-tracking">History Tracking</Label>
              <History className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Record AI interactions for transparency and improvement
            </p>
          </div>
          <Switch
            id="ai-history-tracking"
            checked={settings.historyTracking}
            onCheckedChange={(checked) => updateSettings({ historyTracking: checked })}
            disabled={!settings.enabled}
            aria-label="Enable AI history tracking"
          />
        </div>
      </CardContent>
    </Card>
  )
}