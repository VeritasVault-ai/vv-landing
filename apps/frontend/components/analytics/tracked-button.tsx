"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { trackGAEvent } from "@/lib/analytics/track-ga-event"
import type { ButtonProps } from "@/components/ui/button"
import type { ReactNode } from "react"

interface TrackedButtonProps extends ButtonProps {
  eventName: string
  eventCategory?: string
  eventLabel?: string
  eventValue?: number
  eventProperties?: Record<string, any>
  children: ReactNode
}

export function TrackedButton({
  eventName,
  eventCategory = "User Interaction",
  eventLabel,
  eventValue,
  eventProperties = {},
  children,
  onClick,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event
    trackGAEvent({
      action: eventName,
      category: eventCategory,
      label: eventLabel,
      value: eventValue,
      ...eventProperties,
    })

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
