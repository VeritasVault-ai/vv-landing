"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import styles from "./tabs.module.css"
import type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps, TabsContextType } from "./tabs.types"
import { cn } from "@/lib/utils"

// Create context for tabs state management
const TabsContext = createContext<TabsContextType | undefined>(undefined)

// Hook to use tabs context
const useTabs = () => {
  const context = useContext(TabsContext)
  if (context === undefined) {
    throw new Error("useTabs must be used within a Tabs component")
  }
  return context
}

// Main Tabs component
export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  defaultValue,
  value,
  onValueChange,
  variant = "default",
  ...props
}) => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>(value || defaultValue)
  
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedTab(newValue)
    }
    onValueChange?.(newValue)
  }
  
  const contextValue = {
    selectedTab: selectedTab,
    setSelectedTab: handleValueChange,
    variant,
  }
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn(styles.tabs, styles[`variant-${variant}`], className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// TabsList component
export const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => {
  const { variant } = useTabs()
  
  return (
    <div className={cn(styles.tabsList, styles[`list-${variant}`], className)} role="tablist" {...props}>
      {children}
    </div>
  )
}

// TabsTrigger component
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, className, value, disabled = false, ...props }) => {
  const { selectedTab, setSelectedTab, variant } = useTabs()
  const isSelected = selectedTab === value
  
  const handleClick = () => {
    if (!disabled) {
      setSelectedTab(value)
    }
  }
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      disabled={disabled}
      className={cn(
        styles.tabsTrigger,
        styles[`trigger-${variant}`],
        isSelected && styles.selected,
        disabled && styles.disabled,
        className,
      )}
      onClick={handleClick}
      tabIndex={isSelected ? 0 : -1}
      {...props}
    >
      {children}
      {variant === "underline" && isSelected && <div className={styles.underlineIndicator} />}
    </button>
  )
}

// TabsContent component
export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  className,
  value,
  forceMount = false,
  ...props
}) => {
  const { selectedTab } = useTabs()
  const isSelected = selectedTab === value
  
  if (!isSelected && !forceMount) {
    return null
  }
  
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isSelected}
      className={cn(styles.tabsContent, isSelected && styles.visible, className)}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  )
}