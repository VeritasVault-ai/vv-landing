'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SidebarContextType {
  collapsed: boolean
  mobileOpen: boolean
  toggleCollapsed: () => void
  setMobileOpen: (open: boolean) => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode | ((context: SidebarContextType) => ReactNode)
  defaultCollapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

export function SidebarProvider({ 
  children, 
  defaultCollapsed = false,
  onToggle 
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed)
    }
  }, [collapsed, onToggle])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const closeMobile = () => {
    setMobileOpen(false)
  }

  const contextValue = {
    collapsed,
    mobileOpen,
    toggleCollapsed,
    setMobileOpen,
    closeMobile
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}