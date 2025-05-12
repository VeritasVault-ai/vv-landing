"use client"

import { useRef, useEffect } from "react"

/**
 * Hook to trap focus within a container (for modals, dialogs, etc.)
 * @param active Whether the focus trap is active
 * @param initialFocusRef Optional ref to element that should receive initial focus
 * @returns Ref to attach to the container element
 */
export function useFocusTrap(active: boolean = true, initialFocusRef?: React.RefObject<HTMLElement>) {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (!active) return
    
    const container = containerRef.current
    if (!container) return
    
    // Save the element that had focus before trapping
    const previouslyFocused = document.activeElement as HTMLElement
    
    // Focus the initial element or the first focusable element
    const focusInitialElement = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else {
        const focusableElements = getFocusableElements(container)
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        } else {
          // If no focusable elements, focus the container itself
          container.setAttribute("tabindex", "-1")
          container.focus()
        }
      }
    }
    
    // Focus the initial element
    focusInitialElement()
    
    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      
      const focusableElements = getFocusableElements(container)
      if (focusableElements.length === 0) return
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      
      // Shift+Tab on first element should focus the last element
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } 
      // Tab on last element should focus the first element
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
    
    // Prevent focus from leaving the container
    const handleFocusIn = (event: FocusEvent) => {
      if (
        container !== event.target &&
        !container.contains(event.target as Node)
      ) {
        event.preventDefault()
        focusInitialElement()
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("focusin", handleFocusIn)
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("focusin", handleFocusIn)
      
      // Restore focus when trap is deactivated
      if (previouslyFocused && "focus" in previouslyFocused) {
        previouslyFocused.focus()
      }
    }
  }, [active, initialFocusRef])
  
  return containerRef
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
    "[contenteditable]"
  ].join(", ")
  
  return Array.from(container.querySelectorAll(selector))
    .filter(el => {
      // Filter out hidden elements
      const style = window.getComputedStyle(el)
      return style.display !== "none" && style.visibility !== "hidden"
    }) as HTMLElement[]
}