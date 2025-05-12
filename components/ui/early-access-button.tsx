"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface EarlyAccessButtonProps {
  className?: string
  size?: "default" | "sm" | "lg" | "xl"
  variant?: "default" | "gradient"
  onClick?: () => void
}

export function EarlyAccessButton({
  className,
  size = "default",
  variant = "gradient",
  onClick,
}: EarlyAccessButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Define size styles
  const sizeStyles = {
    default: "py-2 px-4 text-sm",
    sm: "py-1 px-3 text-xs",
    lg: "py-3 px-6 text-base",
    xl: "py-4 px-8 text-lg",
  }

  // Define variant styles
  const variantStyles = {
    default: "bg-brand-blue hover:bg-brand-blue/90 text-white",
    gradient:
      "bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white",
  }

  return (
    <Button
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        "rounded-md font-medium transition-all duration-300 animate-pulse-primary",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span>Get Early Access</span>
      <ArrowRight className={cn("ml-2 h-5 w-5 transition-transform duration-300", isHovered ? "translate-x-1" : "")} />
    </Button>
  )
}
