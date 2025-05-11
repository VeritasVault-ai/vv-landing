"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "@/lib/cookies"
import { VersionHeader } from "./components/version-selection/VersionHeader"
import { VersionFooter } from "./components/version-selection/VersionFooter"
import { StandardVersionCard } from "./components/version-selection/StandardVersionCard"
import { CorporateVersionCard } from "./components/version-selection/CorporateVersionCard"
import { ThemeSelectionModal } from "./components/version-selection/ThemeSelectionModal"
import { VersionBackground } from "./components/version-selection/VersionBackground"

export type VersionType = "standard" | "corporate"
export type ThemeVariant = "standard" | "neuralliquid" | "corporate" | "veritasvault"

export function EnhancedVersionSelectionPage() {
  const router = useRouter()
  const [selectedVersion, setSelectedVersion] = useState<VersionType | null>(null)
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  
  // Handle version selection
  const handleVersionSelect = (version: VersionType) => {
    setSelectedVersion(version)
  }

  // Navigate to selected version with default theme
  const navigateToVersion = (version: VersionType) => {
    // Save user preference
    setCookie("preferred-version", version, 30)
    
    // Navigate to the selected version
    router.push(`/${version}`)
  }
  
  // Open theme selection modal
  const openThemeModal = () => {
    setIsThemeModalOpen(true)
  }
  
  // Handle theme selection and navigation
  const handleThemeSelect = (version: VersionType, theme: ThemeVariant) => {
    // Save user preferences
    setCookie("preferred-version", version, 30)
    setCookie("preferred-theme", theme, 30)
    
    // Close modal
    setIsThemeModalOpen(false)
    
    // Navigate to the selected version with theme parameter
    router.push(`/${version}?theme=${theme}`)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a1025] text-white">
      {/* Background */}
      <VersionBackground />
      
      {/* Header */}
      <VersionHeader />
      
      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Choose Your Experience
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Select the interface that best suits your needs for managing Tezos liquidity with our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Version Card */}
            <StandardVersionCard 
              isSelected={selectedVersion === "standard"}
              onSelect={() => handleVersionSelect("standard")}
              onContinue={() => navigateToVersion("standard")}
            />

            {/* Corporate Version Card */}
            <CorporateVersionCard 
              isSelected={selectedVersion === "corporate"}
              onSelect={() => handleVersionSelect("corporate")}
              onContinue={() => navigateToVersion("corporate")}
            />
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            {selectedVersion && (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={openThemeModal}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Customize Theme Options
                </button>
                
                <button
                  onClick={() => navigateToVersion(selectedVersion)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Continue to {selectedVersion === "standard" ? "Standard" : "Corporate"} Experience
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <VersionFooter />
      
      {/* Theme Selection Modal */}
      {selectedVersion && (
        <ThemeSelectionModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
          selectedVersion={selectedVersion}
          onThemeSelect={handleThemeSelect}
        />
      )}
    </div>
  )
}