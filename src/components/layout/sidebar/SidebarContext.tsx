'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * Sidebar context state and methods
 */
interface SidebarContextType {
  collapsed: boolean
  mobileOpen: boolean
  toggleCollapsed: () => void
  setMobileOpen: (open: boolean) => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode
  defaultCollapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

/**
 * Provides sidebar state and control methods to descendant components.
 *
 * Manages sidebar collapsed and mobile open states, automatically updating them based on window size and invoking an optional callback when the collapsed state changes.
 *
 * @param children - React nodes to render within the provider.
 * @param defaultCollapsed - Optional initial collapsed state; defaults to `false`.
 * @param onToggle - Optional callback invoked when the collapsed state changes.
 *
 * @remark
 * Automatically collapses the sidebar and closes the mobile sidebar when the window width is less than 768 pixels.
 */
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

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        mobileOpen,
        toggleCollapsed,
        setMobileOpen,
        closeMobile
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

/**
 * Provides access to the sidebar context, including state and control methods.
 *
 * @returns The current sidebar context object.
 *
 * @throws {Error} If called outside of a {@link SidebarProvider}.
 */
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}