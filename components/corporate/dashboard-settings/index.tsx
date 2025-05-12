"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"
import { VisibleMetricsSettings } from "./visible-metrics-settings"
import { RefreshRateSettings } from "./refresh-rate-settings"
import { ThemeSettings } from "./theme-settings"
import { ViewSettings } from "./view-settings"

export function DashboardSettings() {
  const { settings, updateSettings } = useDashboard()
  const [localSettings, setLocalSettings] = useState(settings)
  const [activeTab, setActiveTab] = useState("metrics")
  const [isOpen, setIsOpen] = useState(false)

  // Reset local settings when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalSettings(settings)
    }
    setIsOpen(open)
  }

  // Update local settings
  const handleSettingsChange = (newSettings: Partial<typeof localSettings>) => {
    setLocalSettings(prev => ({
      ...prev,
      ...newSettings,
      // Handle nested objects
      visibleMetrics: {
        ...prev.visibleMetrics,
        ...(newSettings.visibleMetrics || {}),
      },
      refreshRates: {
        ...prev.refreshRates,
        ...(newSettings.refreshRates || {}),
      },
    }))
  }

  // Save settings
  const handleSave = () => {
    updateSettings(localSettings)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>
            Customize your dashboard experience. Changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="refresh">Refresh Rates</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="view">View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <VisibleMetricsSettings 
              settings={localSettings} 
              onChange={handleSettingsChange} 
            />
          </TabsContent>
          
          <TabsContent value="refresh" className="space-y-4">
            <RefreshRateSettings 
              settings={localSettings} 
              onChange={handleSettingsChange} 
            />
          </TabsContent>
          
          <TabsContent value="theme" className="space-y-4">
            <ThemeSettings 
              settings={localSettings} 
              onChange={handleSettingsChange} 
            />
          </TabsContent>
          
          <TabsContent value="view" className="space-y-4">
            <ViewSettings 
              settings={localSettings} 
              onChange={handleSettingsChange} 
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}