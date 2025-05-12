"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TourStep {
  target: string
  title: string
  content: ReactNode
  position?: "top" | "right" | "bottom" | "left"
}

interface GuidedTourProps {
  steps: TourStep[]
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function GuidedTour({ steps, isOpen, onClose, onComplete }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [tooltipDimensions, setTooltipDimensions] = useState({ width: 0, height: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const positionTooltip = () => {
      const targetElement = document.querySelector(steps[currentStep].target)
      const tooltipElement = tooltipRef.current

      if (!targetElement || !tooltipElement) return

      const targetRect = targetElement.getBoundingClientRect()
      const tooltipRect = tooltipElement.getBoundingClientRect()

      setTooltipDimensions({
        width: tooltipRect.width,
        height: tooltipRect.height,
      })

      const position = steps[currentStep].position || "bottom"

      let top = 0
      let left = 0

      switch (position) {
        case "top":
          top = targetRect.top - tooltipRect.height - 10
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
          break
        case "right":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
          left = targetRect.right + 10
          break
        case "bottom":
          top = targetRect.bottom + 10
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
          break
        case "left":
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
          left = targetRect.left - tooltipRect.width - 10
          break
      }

      // Ensure tooltip stays within viewport
      if (left < 10) left = 10
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10
      }
      if (top < 10) top = 10
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipRect.height - 10
      }

      setTooltipPosition({ top, left })

      // Highlight the target element
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" })

      // Add a temporary highlight class to the target element
      targetElement.classList.add("tour-highlight")

      return () => {
        targetElement.classList.remove("tour-highlight")
      }
    }

    positionTooltip()

    const handleResize = () => {
      positionTooltip()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      const targetElement = document.querySelector(steps[currentStep].target)
      if (targetElement) {
        targetElement.classList.remove("tour-highlight")
      }
    }
  }, [currentStep, isOpen, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isOpen || !mounted) return null

  // Create a backdrop overlay
  const backdrop = <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

  // Create the tooltip
  const tooltip = (
    <div
      ref={tooltipRef}
      className="fixed z-50 w-80"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
    >
      <Card className="border-primary shadow-lg">
        <div className="absolute right-2 top-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
            <span className="sr-only">Close tour</span>
          </Button>
        </div>
        <CardContent className="pt-6 pb-2">
          <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
          <div className="text-sm text-muted-foreground">{steps[currentStep].content}</div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-2">
          <div className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button size="sm" onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep === steps.length - 1 ? null : <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )

  return createPortal(
    <>
      {backdrop}
      {tooltip}
    </>,
    document.body,
  )
}

export function TourButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className={cn("flex items-center gap-1", className)}>
      <HelpCircle className="h-4 w-4" />
      Guided Tour
    </Button>
  )
}
