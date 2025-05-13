"use client"

import { useCallback, useEffect, useRef } from "react"

/**
 * Hook to trap focus within a container for accessibility compliance.
 * 
 * This hook ensures keyboard navigation remains within a defined boundary (like modals, dialogs,
 * or dropdown menus), which is essential for:
 * - Screen reader users who navigate via keyboard
 * - Keyboard-only users who cannot use a mouse
 * - Meeting WCAG 2.1 Success Criterion 2.1.2 (No Keyboard Trap)
 * 
 * @param active Whether the focus trap is active
 * @param initialFocusRef Optional ref to element that should receive initial focus
 * @returns Ref to attach to the container element
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   const focusTrapRef = useFocusTrap(isOpen);
 *   
 *   if (!isOpen) return null;
 *   
 *   return (
 *     <div ref={focusTrapRef} role="dialog" aria-modal="true">
 *       <h2>Modal Title</h2>
 *       <button autoFocus>First Button</button>
 *       <button onClick={onClose}>Close</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap(active: boolean = true, initialFocusRef?: React.RefObject<HTMLElement>) {
  const containerRef = useRef<HTMLElement>(null)
  
  // Get all focusable elements within a container
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
      "[contenteditable]"
    ].join(", ")
    
    // Use a more efficient approach to filter hidden elements
    return Array.from(container.querySelectorAll(selector))
      .filter(el => {
        // Only check visibility for elements that are in the DOM
        if (!el.isConnected) return false
        
        // Check if element or any parent is hidden (more efficient than getComputedStyle)
        let element = el as HTMLElement
        while (element) {
          // Check basic visibility properties without forcing reflow
          const style = element.style
          if (style.display === "none" || style.visibility === "hidden") return false
          
          // Check for zero dimensions (a common way to hide elements)
          if (element.offsetWidth === 0 && element.offsetHeight === 0) return false
          
          // Move up the DOM tree
          element = element.parentElement as HTMLElement
          if (!element) break
        }
        return true
      }) as HTMLElement[]
  }, [])
  
  // Focus management effect
  useEffect(() => {
    if (!active) return
    
    const container = containerRef.current
    if (!container) return
    
    // Save the element that had focus before trapping
    const previouslyFocused = document.activeElement as HTMLElement | null
    
    // Focus the initial element or the first focusable element
    const focusInitialElement = () => {
      // Check if initialFocusRef exists and is valid
      if (initialFocusRef?.current && initialFocusRef.current.isConnected) {
        initialFocusRef.current.focus()
        return
      }
      
      // Otherwise focus the first focusable element
      const focusableElements = getFocusableElements(container)
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      } else {
        // If no focusable elements, focus the container itself
        container.setAttribute("tabindex", "-1")
        container.focus()
      }
    }
    
    // Focus the initial element
    focusInitialElement()
    
    // Cleanup function for focus management
    return () => {
      // Restore focus when trap is deactivated, but only if the element still exists
      if (previouslyFocused && previouslyFocused.isConnected && "focus" in previouslyFocused) {
        try {
          previouslyFocused.focus()
        } catch (e) {
          console.warn("Failed to restore focus:", e)
        }
      }
    }
  }, [active, initialFocusRef, getFocusableElements])
  
  // Keyboard navigation effect (separated from focus management)
  useEffect(() => {
    if (!active) return
    
    const container = containerRef.current
    if (!container) return
    
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
    
    document.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [active, getFocusableElements])
  
  // Focus containment effect (separated from keyboard navigation)
  useEffect(() => {
    if (!active) return
    
    const container = containerRef.current
    if (!container) return
    
    // Cross-browser approach to contain focus
    const handleFocusIn = (event: FocusEvent) => {
      // Runtime type check to ensure event.target is an Element
      const target = event.target
      if (!(target instanceof Element)) return
      
      // Check if focus is outside the container
      if (container !== target && !container.contains(target)) {
        // Instead of preventDefault (which doesn't work consistently),
        // immediately move focus back to the container
        const focusableElements = getFocusableElements(container)
        if (focusableElements.length > 0) {
          // Focus the first element if moving out forward, or last if moving backward
          const elementToFocus = event.relatedTarget === container.lastElementChild
            ? focusableElements[0]
            : focusableElements[focusableElements.length - 1]
          elementToFocus.focus()
        } else {
          container.focus()
        }
      }
    }
    
    document.addEventListener("focusin", handleFocusIn)
    
    return () => {
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [active, getFocusableElements])
  
  return containerRef
}