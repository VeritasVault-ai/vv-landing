import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { HTMLAttributes } from "react"

interface EnhancedDarkCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "outline" | "glass"
  className?: string
  children: React.ReactNode
  interactive?: boolean
}

export function EnhancedDarkCard({
  variant = "default",
  className,
  children,
  interactive = false,
  ...props
}: EnhancedDarkCardProps) {
  const getCardStyle = () => {
    const baseStyle = "rounded-xl transition-all duration-300"
    const interactiveStyle = interactive ? "hover:translate-y-[-4px] hover:shadow-lg cursor-pointer" : ""

    switch (variant) {
      case "gradient":
        return cn(
          baseStyle,
          "bg-gradient-to-br from-[#141b2d] to-[#0f1525] border border-[#2a3245]",
          interactiveStyle,
          interactive && "hover:border-[#4e90ff]/30",
        )
      case "outline":
        return cn(
          baseStyle,
          "bg-[#0a0e1a]/50 border border-[#2a3245]",
          interactiveStyle,
          interactive && "hover:border-[#4e90ff]/30",
        )
      case "glass":
        return cn(
          baseStyle,
          "bg-[#141b2d]/70 backdrop-blur-md border border-white/5",
          interactiveStyle,
          interactive && "hover:border-white/10",
        )
      default:
        return cn(
          baseStyle,
          "bg-[#141b2d] border border-[#2a3245]",
          interactiveStyle,
          interactive && "hover:border-[#4e90ff]/30",
        )
    }
  }

  return (
    <Card className={cn(getCardStyle(), className)} {...props}>
      {children}
    </Card>
  )
}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
