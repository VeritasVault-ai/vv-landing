"use client"

import { getCookie, setCookie } from "@/lib/cookies"
import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"
import {
  COLOR_MODES,
  EXPERIENCE_TYPES,
  ExperienceType,
  ThemeVariant
} from "@/src/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CorporateVersionCard } from "./components/version-selection/CorporateVersionCard"
import { StandardVersionCard } from "./components/version-selection/StandardVersionCard"
import { ThemeSelectionModal } from "./components/version-selection/ThemeSelectionModal"
import { VersionBackground } from "./components/version-selection/VersionBackground"
import { VersionFooter } from "./components/version-selection/VersionFooter"
import { VersionHeader } from "./components/version-selection/VersionHeader"
import styles from "./VersionSelectionPage.module.css"

/**
 * Displays a version selection interface allowing users to choose between standard and corporate experiences, with optional theme customization and persistent preferences.
 *
 * Presents selectable cards for each experience type, enables theme customization through a modal, and saves user choices in cookies. Integrates with the unified theme system to apply selected theme variants and color modes globally, and navigates to the chosen experience.
 *
 * @returns The React element for the enhanced version selection page.
 */
export function EnhancedVersionSelectionPage() {
  const router = useRouter()
  const { setThemeVariant, setTheme } = useUnifiedTheme()
  const [selectedVersion, setSelectedVersion] = useState<ExperienceType | null>(null)
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  
  // Initialize theme based on stored preferences when component loads
  useEffect(() => {
    const preferredVersion = getCookie("preferred-version") as ExperienceType | undefined
    const preferredTheme = getCookie("preferred-theme") as string | undefined
    
    if (preferredVersion) {
      setSelectedVersion(preferredVersion)
      setThemeVariant(preferredVersion as ThemeVariant)
    }
    
    if (preferredTheme) {
      // Extract color mode from theme string (e.g., "standard-dark" -> "dark")
      const colorMode = preferredTheme.split('-')[1]
      setTheme(colorMode || (preferredTheme.includes("dark") ? COLOR_MODES.DARK : COLOR_MODES.LIGHT))
    }
  }, [setTheme, setThemeVariant])
  
  // Handle version selection
  const handleVersionSelect = (version: ExperienceType) => {
    setSelectedVersion(version)
  }

  // Navigate to selected version with default theme
  const navigateToVersion = (version: ExperienceType) => {
    // Save user preference
    setCookie("preferred-version", version, 30)
    
    // Update theme variant in the unified theme system
    setThemeVariant(version as ThemeVariant)
    
    // Navigate to the selected version's main page
    router.push(`/${version}-version`)
  }
  
  // Open theme selection modal
  const openThemeModal = () => {
    setIsThemeModalOpen(true)
  }
  
  // Handle theme selection and navigation
  const handleThemeSelect = (version: ExperienceType, themeId: string) => {
    // Save user preferences
    setCookie("preferred-version", version, 30)
    setCookie("preferred-theme", themeId, 30)
    
    // Extract variant and color mode from theme ID (e.g., "standard-dark")
    const [variant, colorMode] = themeId.split('-') as [ThemeVariant, string]
    
    // Update theme settings in the unified theme system
    setThemeVariant(variant)
    setTheme(colorMode || (themeId.includes("dark") ? COLOR_MODES.DARK : COLOR_MODES.LIGHT))
    
    // Close modal
    setIsThemeModalOpen(false)
    
    // Navigate to the selected version with theme parameter
    router.push(`/${version}-version?theme=${themeId}`)
  }

  return (
    <div className={styles.contentWrapper}>
      {/* Background */}
      <VersionBackground />
      
      {/* Header */}
      <VersionHeader />
      
      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.versionContainer}>
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>
              Choose Your Experience
            </h1>
            <p className={styles.pageDescription}>
              Select the interface that best suits your needs for managing Tezos liquidity with our AI-powered platform
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {/* Standard Version Card */}
            <StandardVersionCard 
              isSelected={selectedVersion === EXPERIENCE_TYPES.STANDARD}
              onSelect={() => handleVersionSelect(EXPERIENCE_TYPES.STANDARD)}
              onContinue={() => navigateToVersion(EXPERIENCE_TYPES.STANDARD)}
            />

            {/* Corporate Version Card */}
            <CorporateVersionCard 
              isSelected={selectedVersion === EXPERIENCE_TYPES.CORPORATE}
              onSelect={() => handleVersionSelect(EXPERIENCE_TYPES.CORPORATE)}
              onContinue={() => navigateToVersion(EXPERIENCE_TYPES.CORPORATE)}
            />
          </div>

          {/* Continue Button */}
          <div className={styles.actionsSection}>
            {selectedVersion && (
              <div className={styles.actionsContainer}>
                <button
                  onClick={openThemeModal}
                  className={styles.customizeButton}
                >
                  Customize Theme Options
                </button>
                
                <button
                  onClick={() => navigateToVersion(selectedVersion)}
                  className={styles.continueButton}
                >
                  Continue to {selectedVersion === EXPERIENCE_TYPES.STANDARD ? "Standard" : "Corporate"} Experience
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