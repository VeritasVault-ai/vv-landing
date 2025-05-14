import type React from "react"

export interface TabsContextType {
  selectedTab: string | undefined
  setSelectedTab: (value: string) => void
  variant: TabsVariant
}

export type TabsVariant = "default" | "underline" | "enclosed" | "pills"

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  value: string
  disabled?: boolean
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  value: string
  forceMount?: boolean
}