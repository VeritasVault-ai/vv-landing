"use client"

import { clsx } from "clsx"
import { forwardRef } from "react"
import styles from "./card.module.css"
import type { 
  CardProps, 
  CardHeaderProps, 
  CardTitleProps, 
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps
} from "./card.types"

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", variant = "default", ...props }, ref) => {
    const cardClasses = clsx(
      styles.card, 
      styles[`card--${variant}`], 
      className
    )
    
    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    const headerClasses = clsx(styles.cardHeader, className)
    
    return (
      <div ref={ref} className={headerClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    const titleClasses = clsx(styles.cardTitle, className)
    
    return (
      <h3 ref={ref} className={titleClasses} {...props}>
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = "CardTitle"

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    const descriptionClasses = clsx(styles.cardDescription, className)
    
    return (
      <p ref={ref} className={descriptionClasses} {...props}>
        {children}
      </p>
    )
  }
)

CardDescription.displayName = "CardDescription"

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", ...props }, ref) => {
    const contentClasses = clsx(styles.cardContent, className)
    
    return (
      <div ref={ref} className={contentClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = "CardContent"

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    const footerClasses = clsx(styles.cardFooter, className)
    
    return (
      <div ref={ref} className={footerClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = "CardFooter"