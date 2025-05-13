"use client"

import { DashboardSettings } from "@/contexts/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ViewSettingsProps {
  settings: DashboardSettings
  onChange: (settings: Partial<DashboardSettings>) => void
}

/**
 * Renders UI controls for customizing dashboard view settings, including a toggle for compact layout.
 *
 * Displays a card with options allowing users to enable or disable a compact view. Changes are propagated via the provided callback.
 *
 * @param settings - Current dashboard settings.
 * @param onChange - Callback invoked with updated settings when an option is changed.
 */
export function ViewSettings({ settings, onChange }: ViewSettingsProps) {
  const handleCompactViewChange = (checked: boolean) => {
    onChange({ compactView: checked })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>View Options</CardTitle>
        <CardDescription>
          Customize how information is displayed on your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="compact-view">Compact View</Label>
            <p className="text-sm text-muted-foreground">
              Use a more condensed layout to fit more information on screen
            </p>
          </div>
          <Switch
            id="compact-view"
            checked={settings.compactView}
            onCheckedChange={handleCompactViewChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}