"use client"

import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import styles from "./dropdown-menu.module.css"
import type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuHeaderProps,
  DropdownMenuContextType,
} from "./dropdown-menu.types"
import { cn } from "@/lib/utils"

// Create context for dropdown state management
const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

// Hook to use dropdown context
const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext)
  if (context === undefined) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu component")
  }
  return context
}

// Main DropdownMenu component
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
  defaultOpen = false,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }
  
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setOpen: handleOpenChange }}>
      <div className={cn(styles.dropdownMenu, className)} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

// DropdownMenuTrigger component
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const { isOpen, setOpen } = useDropdownMenu()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!isOpen)
    props.onClick?.(e)
  }
  
  const triggerProps = {
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    ...props,
    onClick: handleClick,
    className: cn(styles.dropdownMenuTrigger, className),
  }
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps)
  }
  
  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  )
}

// DropdownMenuContent component
export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className,
  align = "bottom",
  sideOffset = 5,
  ...props
}) => {
  const { isOpen } = useDropdownMenu()
  const contentRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        const { setOpen } = useDropdownMenu()
        setOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return isMounted ? (
    <div
      ref={contentRef}
      className={cn(styles.dropdownMenuContent, styles[`align-${align}`], className)}
      style={{ "--side-offset": `${sideOffset}px` } as React.CSSProperties}
      role="menu"
      {...props}
    >
      {children}
    </div>
  ) : null
}

// DropdownMenuItem component
export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className,
  variant = "default",
  disabled = false,
  onSelect,
  ...props
}) => {
  const { setOpen } = useDropdownMenu()
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    
    onSelect?.(e)
    setOpen(false)
    props.onClick?.(e)
  }
  
  return (
    <div
      className={cn(styles.dropdownMenuItem, styles[`variant-${variant}`], disabled && styles.disabled, className)}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick(e as unknown as React.MouseEvent)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// DropdownMenuSeparator component
export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({ className, ...props }) => {
  return <div className={cn(styles.dropdownMenuSeparator, className)} role="separator" {...props} />
}

// DropdownMenuHeader component
export const DropdownMenuHeader: React.FC<DropdownMenuHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles.dropdownMenuHeader, className)} {...props}>
      {children}
    </div>
  )
}