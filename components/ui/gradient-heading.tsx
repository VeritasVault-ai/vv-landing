import type React from "react"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface GradientHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  gradient?: "primary" | "secondary" | "accent" | "custom"
  customGradient?: string
  className?: string
  children: React.ReactNode
}

export function GradientHeading({
  as: Component = "h1",
  gradient = "primary",
  customGradient,
  className,
  children,
  ...props
}: GradientHeadingProps) {
  const getGradientStyle = () => {
    switch (gradient) {
      case "primary":
        return "from-[#4e90ff] to-[#7c5cff]"
      case "secondary":
        return "from-[#7c5cff] to-[#a56eff]"
      case "accent":
        return "from-[#4e90ff] via-[#7c5cff] to-[#a56eff]"
      case "custom":
        return ""
      default:
        return "from-[#4e90ff] to-[#7c5cff]"
    }
  }

  const gradientStyle = customGradient || getGradientStyle()

  return (
    <Component
      className={cn("bg-gradient-to-r bg-clip-text text-transparent font-bold", gradientStyle, className)}
      {...props}
    >
      {children}
    </Component>
  )
}
