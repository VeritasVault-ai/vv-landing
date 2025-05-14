import type { HTMLAttributes, MouseEvent, ReactNode } from "react"

export interface DropdownMenuContextType {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export type DropdownMenuAlign = "top" | "bottom" | "left" | "right"

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: DropdownMenuAlign
  sideOffset?: number
}

export type DropdownMenuItemVariant = "default" | "destructive" | "muted"

export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  variant?: DropdownMenuItemVariant
  onSelect?: (event: MouseEvent) => void
}

export interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuHeaderProps extends HTMLAttributes<HTMLDivElement> {}