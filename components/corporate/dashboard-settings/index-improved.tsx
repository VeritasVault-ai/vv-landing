"use client"

import { useState, useRef, useCallback } from "react"
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
import { useDashboard } from "@/contexts/dashboard-context-improved"
import { VisibleMetricsSettings } from "./visible-metrics-settings"
import { ThemeSettings } from "./theme-settings-improved"
import { RefreshRateSettings } from "./refresh-rate-settings"
import { ViewSettings } from "./view-settings"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { ErrorBoundary } from "@/components/error-boundary"
import { makeKeyboardAccessible, expandedState } from "@/utils/accessibility"

export function DashboardSettings() {
  const { settings, updateSettings } = useDashboard()
  const [localSettings, setLocalSettings] = useState(settings)
  const [activeTab, setActiveTab] = useState("metrics")
  const [isOpen, setIsOpen] = useState(false)
  
  // Ref for initial focus
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  
  // Focus trap for dialog
  const dialogRef = useFocusTrap(isOpen, initialFocusRef)

  // Reset local settings when dialog opens
  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      setLocalSettings(settings)
    }
    setIsOpen(open)
  }, [settings])

  // Update local settings
  const handleSettingsChange = useCallback((newSettings: Partial<typeof localSettings>) => {
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
  }, [])

  // Save settings
  const handleSave = useCallback(() => {
    updateSettings(localSettings)
    setIsOpen(false)
    
    // Announce to screen readers that settings were saved
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = 'Dashboard settings saved successfully'
    document.body.appendChild(announcement)
    
    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 3000)
  }, [localSettings, updateSettings])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          {...makeKeyboardAccessible(() => setIsOpen(true))}
          aria-label="Dashboard settings"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[600px]"
        ref={dialogRef as any}
        aria-labelledby="settings-title"
        aria-describedby="settings-description"
        {...expandedState(isOpen)}
      >
        <DialogHeader>
          <DialogTitle id="settings-title">Dashboard Settings</DialogTitle>
          <DialogDescription id="settings-description">
            Customize your dashboard experience. Changes will be saved when you click Save.
          </DialogDescription>
        </DialogHeader>
        
        <ErrorBoundary>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="mt-4"
            aria-label="Settings categories"
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="metrics" aria-controls="metrics-tab">Metrics</TabsTrigger>
              <TabsTrigger value="refresh" aria-controls="refresh-tab">Refresh Rates</TabsTrigger>
              <TabsTrigger value="theme" aria-controls="theme-tab">Theme</TabsTrigger>
              <TabsTrigger value="view" aria-controls="view-tab">View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics" id="metrics-tab" role="tabpanel" tabIndex={0}>
              <VisibleMetricsSettings 
                settings={localSettings} 
                onChange={handleSettingsChange} 
              />
            </TabsContent>
            
            <TabsContent value="refresh" id="refresh-tab" role="tabpanel" tabIndex={0}>
              <RefreshRateSettings 
                settings={localSettings} 
                onChange={handleSettingsChange} 
              />
            </TabsContent>
            
            <TabsContent value="theme" id="theme-tab" role="tabpanel" tabIndex={0}>
              <ThemeSettings 
                settings={localSettings} 
                onChange={handleSettingsChange} 
              />
            </TabsContent>
            
            <TabsContent value="view" id="view-tab" role="tabpanel" tabIndex={0}>
              <ViewSettings 
                settings={localSettings} 
                onChange={handleSettingsChange} 
              />
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            aria-label="Cancel changes and close settings"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            ref={initialFocusRef}
            aria-label="Save settings changes"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}