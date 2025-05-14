import type { HTMLAttributes } from "react"

export type CardVariant = "default" | "elevated" | "interactive" | "flat"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}