"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { TourStep } from "./tour-steps"

interface TourContextType {
  isTourOpen: boolean
  currentStep: number
  tourCompleted: boolean
  tourSteps: TourStep[]
  openTour: () => void
  closeTour: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  completeTour: () => void
  resetTour: () => void
  setTourSteps: (steps: TourStep[]) => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

interface TourProviderProps {
  children: ReactNode
  initialSteps?: TourStep[]
  autoStartForNewUsers?: boolean
}

export function TourProvider({ children, initialSteps = [], autoStartForNewUsers = true }: TourProviderProps) {
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tourCompleted, setTourCompleted] = useState(false)
  const [tourSteps, setTourSteps] = useState<TourStep[]>(initialSteps)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  // Load tour state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tourState = localStorage.getItem("tourState")
      if (tourState) {
        const { completed, currentStepIndex } = JSON.parse(tourState)
        setTourCompleted(completed)
        setCurrentStep(currentStepIndex || 0)
        setIsFirstVisit(false)
      } else if (autoStartForNewUsers) {
        // Auto-start tour for new users after a short delay
        const timer = setTimeout(() => {
          setIsTourOpen(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [autoStartForNewUsers])

  // Save tour state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tourState",
        JSON.stringify({
          completed: tourCompleted,
          currentStepIndex: currentStep,
        }),
      )
    }
  }, [tourCompleted, currentStep])

  const openTour = () => {
    setIsTourOpen(true)
  }

  const closeTour = () => {
    setIsTourOpen(false)
  }

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < tourSteps.length) {
      setCurrentStep(step)
    }
  }

  const completeTour = () => {
    setTourCompleted(true)
    setIsTourOpen(false)
  }

  const resetTour = () => {
    setCurrentStep(0)
    setTourCompleted(false)
  }

  return (
    <TourContext.Provider
      value={{
        isTourOpen,
        currentStep,
        tourCompleted,
        tourSteps,
        openTour,
        closeTour,
        nextStep,
        prevStep,
        goToStep,
        completeTour,
        resetTour,
        setTourSteps,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}
