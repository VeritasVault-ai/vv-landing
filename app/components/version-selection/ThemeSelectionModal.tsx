"use client"

import { useUnifiedTheme } from "@/src/hooks/use-unified-theme"
import {
  COLOR_MODES,
  CORPORATE_VARIANTS,
  ExperienceType,
  STANDARD_VARIANTS,
  ThemeOption
} from "@/src/types"
import styles from "./ThemeSelectionModal.module.css"

interface ThemeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedVersion: ExperienceType
  onThemeSelect: (version: ExperienceType, theme: string) => void
}

/**
 * Displays a modal dialog for selecting a UI theme based on the chosen experience type.
 *
 * Renders a grid of available themes tailored to the selected experience version. When a theme is selected, the modal immediately invokes the provided callback with the selected version and theme ID. The modal only appears when {@link isOpen} is true and can be dismissed with the cancel button.
 *
 * @param isOpen - Whether the modal is visible.
 * @param onClose - Callback to close the modal.
 * @param selectedVersion - The current experience type for which to select a theme.
 * @param onThemeSelect - Callback invoked with the selected version and theme ID when a theme is chosen.
 *
 * @returns The modal component, or null if not open.
 */
export function ThemeSelectionModal({
  isOpen,
  onClose,
  selectedVersion,
  onThemeSelect,
}: ThemeSelectionModalProps) {
  const { theme: currentTheme } = useUnifiedTheme()
  
  // Don't render if modal is not open
  if (!isOpen) return null
  
  // Get available themes based on selected version
  const availableThemes: ThemeOption[] = selectedVersion === "standard" 
    ? [
        { 
          id: `${STANDARD_VARIANTS.STANDARD}-${COLOR_MODES.LIGHT}`, 
          name: "Standard Light", 
          description: "Clean, bright interface with blue accents" 
        },
        { 
          id: `${STANDARD_VARIANTS.STANDARD}-${COLOR_MODES.DARK}`, 
          name: "Standard Dark", 
          description: "Dark mode with reduced eye strain" 
        },
        { 
          id: `${STANDARD_VARIANTS.NEURALLIQUID}-${COLOR_MODES.LIGHT}`, 
          name: "Neural Light", 
          description: "Modern light theme with neural network visuals" 
        },
        { 
          id: `${STANDARD_VARIANTS.NEURALLIQUID}-${COLOR_MODES.DARK}`, 
          name: "Neural Dark", 
          description: "Immersive dark theme with neural network patterns" 
        },
      ]
    : [
        { 
          id: `${CORPORATE_VARIANTS.CORPORATE}-${COLOR_MODES.LIGHT}`, 
          name: "Corporate Light", 
          description: "Professional light interface for enterprise users" 
        },
        { 
          id: `${CORPORATE_VARIANTS.CORPORATE}-${COLOR_MODES.DARK}`, 
          name: "Corporate Dark", 
          description: "Sophisticated dark mode for enterprise users" 
        },
        { 
          id: `${CORPORATE_VARIANTS.VERITASVAULT}-${COLOR_MODES.LIGHT}`, 
          name: "Veritas Light", 
          description: "Premium light theme with vault security visuals" 
        },
        { 
          id: `${CORPORATE_VARIANTS.VERITASVAULT}-${COLOR_MODES.DARK}`, 
          name: "Veritas Dark", 
          description: "Premium dark theme with vault security visuals" 
        },
      ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Customize Your Experience
          </h2>
          <p className={styles.modalDescription}>
            Select a theme that suits your preferences for the {selectedVersion} experience
          </p>
          
          <div className={styles.themeGrid}>
            {availableThemes.map((theme) => {
              const [variant, colorMode] = theme.id.split('-');
              const isCurrentTheme = 
                variant === currentTheme || 
                colorMode === currentTheme;
              const isDarkTheme = theme.id.includes("dark");
                
              return (
                <div
                  key={theme.id}
                  onClick={() => onThemeSelect(selectedVersion, theme.id)}
                  className={`
                    ${styles.themeCard}
                    ${isDarkTheme ? styles.darkThemeCard : styles.lightThemeCard}
                    ${isCurrentTheme ? styles.selectedThemeCard : ''}
                  `}
                >
                  <div className={styles.themeCardHeader}>
                    <h3 className={styles.themeName}>{theme.name}</h3>
                    {isCurrentTheme && (
                      <span className={styles.currentBadge}>Current</span>
                    )}
                  </div>
                  <p className={styles.themeDescription}>{theme.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}