"use client"

import { DashboardSettings } from "@/contexts/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface RefreshRateSettingsProps {
  settings: DashboardSettings
  onChange: (settings: Partial<DashboardSettings>) => void
}

export function RefreshRateSettings({ settings, onChange }: RefreshRateSettingsProps) {
  const handleRefreshRateChange = (metric: keyof DashboardSettings["refreshRates"], value: number[]) => {
    onChange({
      refreshRates: {
        ...settings.refreshRates,
        [metric]: value[0]
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refresh Rates</CardTitle>
        <CardDescription>
          Set how frequently each section of the dashboard updates (in seconds)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="portfolioValue">Portfolio Value</Label>
            <span className="text-sm text-slate-500">{settings.refreshRates.portfolioValue} seconds</span>
          </div>
          <Slider
            id="portfolioValue"
            min={5}
            max={120}
            step={5}
            value={[settings.refreshRates.portfolioValue]}
            onValueChange={(value) => handleRefreshRateChange("portfolioValue", value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="riskScore">Risk Score</Label>
            <span className="text-sm text-slate-500">{settings.refreshRates.riskScore} seconds</span>
          </div>
          <Slider
            id="riskScore"
            min={10}
            max={300}
            step={10}
            value={[settings.refreshRates.riskScore]}
            onValueChange={(value) => handleRefreshRateChange("riskScore", value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="performance">Performance Data</Label>
            <span className="text-sm text-slate-500">{settings.refreshRates.performance} seconds</span>
          </div>
          <Slider
            id="performance"
            min={15}
            max={300}
            step={15}
            value={[settings.refreshRates.performance]}
            onValueChange={(value) => handleRefreshRateChange("performance", value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="modelResults">Model Results</Label>
            <span className="text-sm text-slate-500">{settings.refreshRates.modelResults} seconds</span>
          </div>
          <Slider
            id="modelResults"
            min={15}
            max={300}
            step={15}
            value={[settings.refreshRates.modelResults]}
            onValueChange={(value) => handleRefreshRateChange("modelResults", value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="voting">Voting & Governance</Label>
            <span className="text-sm text-slate-500">{settings.refreshRates.voting} seconds</span>
          </div>
          <Slider
            id="voting"
            min={10}
            max={300}
            step={10}
            value={[settings.refreshRates.voting]}
            onValueChange={(value) => handleRefreshRateChange("voting", value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}