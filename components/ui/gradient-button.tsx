import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function GradientButton({ className, variant = "gradient", size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <div className="relative group">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 rounded-md opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #6366f1, #3b82f6)",
          backgroundSize: "1000% 1000%",
          animation: "gradient-rotate 4s linear infinite",
        }}
      />

      {/* Button with content */}
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative z-10 bg-[#111a35] m-[1px] rounded-[0.33rem]",
        )}
        {...props}
      />
    </div>
  )
}
