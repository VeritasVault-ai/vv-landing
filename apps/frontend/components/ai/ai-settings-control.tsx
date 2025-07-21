"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, Sparkles } from "lucide-react"
import { useAISettings } from "./ai-settings-provider"
import { AISettingsGeneral } from "./ai-settings-general"
import { AISettingsFeatures } from "./ai-settings-features"
import { AISettingsPrivacy } from "./ai-settings-privacy"
import { AISettingsPersonalization } from "./ai-settings-personalization"
import { AISettingsDisplay } from "./ai-settings-display"
import { AISettings, DEFAULT_AI_SETTINGS } from "./ai-settings-types"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { ErrorBoundary } from "@/components/error-boundary-secure"

interface AISettingsControlProps {
  defaultEnabled?: boolean
  className?: string
  compact?: boolean
  buttonVariant?: "default" | "outline" | "secondary" | "ghost"
}

/**
 * Renders a dialog interface for viewing and editing AI-related settings with tabbed navigation.
 *
 * The dialog allows users to modify AI settings across multiple categories, reset to default values, or cancel changes. Changes are staged in a temporary state and only applied when saved. The interface supports both compact and standard trigger button modes and ensures accessibility with focus trapping and error boundaries.
 *
 * @param defaultEnabled - Whether the AI settings dialog is enabled by default.
 * @param className - Optional CSS class for custom styling of the trigger button.
 * @param compact - If true, renders a compact icon-only trigger button.
 * @param buttonVariant - Visual style of the trigger button.
 *
 * @returns A React element that provides a modal dialog for managing AI settings.
 */
export function AISettingsControl({
  defaultEnabled = true,
  className,
  compact = false,
  buttonVariant = "outline"
}: AISettingsControlProps) {
  const { settings, updateSettings, resetToDefaults } = useAISettings()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [tempSettings, setTempSettings] = useState<AISettings>(settings)
  
  // Focus trap for dialog
  const dialogRef = useFocusTrap(isOpen)

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Initialize temp settings with current settings
      setTempSettings(settings)
    }
    setIsOpen(open)
  }

  // Save changes
  const handleSave = () => {
    updateSettings(tempSettings)
    setIsOpen(false)
  }

  // Reset to defaults
  const handleReset = () => {
    setTempSettings(DEFAULT_AI_SETTINGS)
  }

  // Cancel changes
  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {compact ? (
          <Button
            variant={buttonVariant}
            size="sm"
            className={className}
            aria-label="AI Settings"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant={buttonVariant}
            size="sm"
            className={className}
            aria-label="AI Settings"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI Settings</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto"
        ref={dialogRef as any}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span>AI Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure how AI features work throughout the dashboard
          </DialogDescription>
        </DialogHeader>

        <ErrorBoundary>
          <Tabs 
            defaultValue="general" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="personalization">Personalization</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 space-y-4">
              <TabsContent value="general" className="space-y-4 mt-0">
                <AISettingsGeneral />
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4 mt-0">
                <AISettingsFeatures />
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-4 mt-0">
                <AISettingsPrivacy />
              </TabsContent>
              
              <TabsContent value="personalization" className="space-y-4 mt-0">
                <AISettingsPersonalization />
              </TabsContent>
              
              <TabsContent value="display" className="space-y-4 mt-0">
                <AISettingsDisplay />
              </TabsContent>
            </div>
          </Tabs>
        </ErrorBoundary>

        <DialogFooter className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="mr-auto"
          >
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}