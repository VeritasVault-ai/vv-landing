"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

interface DashboardSettingsProps {
  compact?: boolean;
}
/**
 * Renders a dialog for customizing dashboard settings, allowing users to toggle preferences such as compact view, real-time updates, and simulation indicators.
 *
 * @param compact - If true, displays a compact icon-only settings button; otherwise, shows a button with icon and label.
 */
export function DashboardSettings({ compact = false }: DashboardSettingsProps) {
  const { settings, updateSettings } = useDashboard()

  const handleCompactViewChange = (checked: boolean) => {
    updateSettings({ ...settings, compactView: checked })
  }

  const handleRealTimeUpdatesChange = (checked: boolean) => {
    updateSettings({ ...settings, realTimeUpdates: checked })
  }

  const handleShowSimulationIndicatorsChange = (checked: boolean) => {
    updateSettings({ ...settings, showSimulationIndicators: checked })
  }

  const handleResetDefaults = () => {
    updateSettings({
      compactView: false,
      realTimeUpdates: true,
      showSimulationIndicators: true
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {compact ? (
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>
            Customize your dashboard experience with these settings.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-view">Compact View</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Reduce spacing between dashboard elements
              </p>
            </div>
            <Switch
              id="compact-view"
              checked={settings?.compactView || false}
              onCheckedChange={handleCompactViewChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="real-time">Real-time Updates</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Automatically update data in real-time
              </p>
            </div>
            <Switch
              id="real-time"
              checked={settings?.realTimeUpdates || false}
              onCheckedChange={handleRealTimeUpdatesChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="simulation-indicators">Show Simulation Indicators</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Display indicators when data is simulated
              </p>
            </div>
            <Switch
              id="simulation-indicators"
              checked={settings?.showSimulationIndicators || false}
              onCheckedChange={handleShowSimulationIndicatorsChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" className="w-full" onClick={handleResetDefaults}>
            Reset to Defaults
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}