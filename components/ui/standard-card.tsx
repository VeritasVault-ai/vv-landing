import React from "react"
import { cn } from "@/lib/utils"
import styles from "@/styles/standard-card.module.css"

interface StandardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "success" | "warning" | "danger" | "accent"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  hoverable?: boolean
  children: React.ReactNode
}

export const StandardCardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.cardHeader, className)} {...props} />
)

export const StandardCardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn(styles.cardTitle, className)} {...props} />
)

export const StandardCardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(styles.cardDescription, className)} {...props} />
)

export const StandardCardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.cardContent, className)} {...props} />
)

export const StandardCardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.cardFooter, className)} {...props} />
)

export const StandardCard = React.forwardRef<HTMLDivElement, StandardCardProps>(
  ({ className, variant = "default", size = "full", hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.card,
          styles[size],
          {
            [styles.cardHoverable]: hoverable,
            [styles.standardCard]: variant === "default",
            [styles.gradientCard]: variant === "gradient",
            [styles.successCard]: variant === "success",
            [styles.warningCard]: variant === "warning",
            [styles.dangerCard]: variant === "danger",
            [styles.standardCardAccent]: variant === "accent",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

StandardCard.displayName = "StandardCard"
