"use client"

import { DashboardSettings } from "@/contexts/dashboard-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface VisibleMetricsSettingsProps {
  settings: DashboardSettings
  onChange: (settings: Partial<DashboardSettings>) => void
}

/**
 * Renders a settings card that allows users to toggle the visibility of specific dashboard metrics.
 *
 * Displays checkboxes for "Portfolio Value," "Active Strategies," and "Risk Score," reflecting and updating their visibility state in the dashboard settings.
 *
 * @param settings - The current dashboard settings, including visible metrics.
 * @param onChange - Callback invoked with updated settings when a metric's visibility is toggled.
 */
export function VisibleMetricsSettings({ settings, onChange }: VisibleMetricsSettingsProps) {
  const handleMetricToggle = (metric: keyof DashboardSettings["visibleMetrics"], checked: boolean) => {
    onChange({
      visibleMetrics: {
        ...settings.visibleMetrics,
        [metric]: checked
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visible Metrics</CardTitle>
        <CardDescription>
          Choose which metrics to display on your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="portfolioValue" 
            checked={settings.visibleMetrics.portfolioValue}
            onCheckedChange={(checked) => handleMetricToggle("portfolioValue", checked as boolean)}
          />
          <Label htmlFor="portfolioValue">Portfolio Value</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="activeStrategies" 
            checked={settings.visibleMetrics.activeStrategies}
            onCheckedChange={(checked) => handleMetricToggle("activeStrategies", checked as boolean)}
          />
          <Label htmlFor="activeStrategies">Active Strategies</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="riskScore" 
            checked={settings.visibleMetrics.riskScore}
            onCheckedChange={(checked) => handleMetricToggle("riskScore", checked as boolean)}
          />
          <Label htmlFor="riskScore">Risk Score</Label>
        </div>
      </CardContent>
    </Card>
  )
}