import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface EnhancedDarkButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow"
  gradientDirection?: "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" | "to-t" | "to-tr"
}

export const EnhancedDarkButton = forwardRef<HTMLButtonElement, EnhancedDarkButtonProps>(
  ({ className, variant = "default", gradientDirection = "to-r", ...props }, ref) => {
    if (variant === "gradient") {
      return (
        <Button
          className={cn(
            "relative overflow-hidden border-0",
            "bg-gradient-to-r from-[#4e90ff] to-[#7c5cff]",
            "hover:from-[#3a7dff] hover:to-[#6a4dff]",
            "text-white font-medium shadow-md",
            "transition-all duration-300 ease-out",
            "hover:shadow-lg hover:shadow-[#4e90ff]/20",
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

    if (variant === "glow") {
      return (
        <Button
          className={cn(
            "relative overflow-hidden border-0",
            "bg-[#4e90ff]",
            "hover:bg-[#3a7dff]",
            "text-white font-medium",
            "transition-all duration-300 ease-out",
            "shadow-[0_0_15px_rgba(78,144,255,0.5)]",
            "hover:shadow-[0_0_25px_rgba(78,144,255,0.7)]",
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

    // For other variants, use the standard Button component
    return <Button className={className} variant={variant} ref={ref} {...props} />
  },
)

EnhancedDarkButton.displayName = "EnhancedDarkButton"
