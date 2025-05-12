"use client"

import { ThemeAwareImage } from "./theme-aware-image"

export function DashboardPreview({ className = "" }) {
  return (
    <ThemeAwareImage
      lightSrc="/dashboard-preview-light.png"
      darkSrc="/dashboard-preview.png"
      alt="Dashboard Preview"
      width={800}
      height={450}
      className={className}
    />
  )
}

export function AnalyticsPreview({ className = "" }) {
  return (
    <ThemeAwareImage
      lightSrc="/analytics-preview-light.png"
      darkSrc="/analytics-preview.png"
      alt="Analytics Preview"
      width={800}
      height={450}
      className={className}
    />
  )
}

export function StrategyPreview({ className = "" }) {
  return (
    <ThemeAwareImage
      lightSrc="/strategy-preview-light.png"
      darkSrc="/strategy-preview.png"
      alt="Strategy Preview"
      width={800}
      height={450}
      className={className}
    />
  )
}

export function AIInsightsVisualized({ className = "" }) {
  return (
    <ThemeAwareImage
      lightSrc="/AI-Insights-Visualized-light.png"
      darkSrc="/AI-Insights-Visualized.png"
      alt="AI Insights Visualized"
      width={800}
      height={450}
      className={className}
    />
  )
}

export function LogoImage({ className = "", size = 40 }) {
  return (
    <ThemeAwareImage
      lightSrc="/logo-light.png"
      darkSrc="/logo.png"
      alt="NeuralLiquid Logo"
      width={size}
      height={size}
      className={className}
    />
  )
}
