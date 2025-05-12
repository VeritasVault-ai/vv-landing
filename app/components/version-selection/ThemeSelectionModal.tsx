"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { VersionType } from "../../VersionSelectionPage"

// All available themes
export type ThemeVariant = "light" | "dark" | "neuralliquid" | "corporate" | "veritasvault" | "cosmic"

interface ThemeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedVersion: VersionType
  onThemeSelect: (version: VersionType, theme: ThemeVariant) => void
}

export function ThemeSelectionModal({ isOpen, onClose, selectedVersion, onThemeSelect }: ThemeSelectionModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariant | null>(null)
  
  // Define all available themes
  const availableThemes = [
    { id: "light", name: "Light", description: "Clean, bright interface for daytime use" },
    { id: "dark", name: "Dark", description: "Reduced eye strain for nighttime viewing" },
        { id: "standard", name: "Standard", description: "Clean, modern interface with a focus on usability" },
    { id: "neuralliquid", name: "NeuralLiquid", description: "Futuristic design with AI-inspired visuals" },
        { id: "corporate", name: "Corporate", description: "Professional interface designed for institutional use" },
    { id: "veritasvault", name: "VeritasVault", description: "Security-focused theme with enterprise aesthetics" },
    { id: "cosmic", name: "Cosmic", description: "Space-inspired theme with stellar visuals" }
      ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Select Your Theme</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a theme for your {selectedVersion} experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {availableThemes.map((theme) => (
            <div 
              key={theme.id} 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedTheme === theme.id 
                  ? "bg-blue-900/50 border border-blue-500" 
                  : "bg-gray-800 border border-gray-700 hover:border-gray-600"
              }`}
              onClick={() => setSelectedTheme(theme.id as ThemeVariant)}
            >
              <h3 className="font-medium text-white">{theme.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{theme.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-800">
            Cancel
          </Button>
          <Button 
            onClick={() => selectedTheme && onThemeSelect(selectedVersion, selectedTheme)}
            disabled={!selectedTheme}
            className={`${
              selectedVersion === "standard" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            Apply Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}