import { ThemeImagePreloader } from "@/components/ui/theme-image-preloader"

export function CommonImagePreloader() {
  // List of common images that should be preloaded for both themes
  const commonImages = [
    "/dashboard-preview",
    "/analytics-preview",
    "/strategy-preview",
    "/AI-Insights-Visualized",
    "/abstract-neural-network",
    "/liquidity-management-dashboard",
    "/strategy-builder-flowchart",
    "/advanced-analytics-predictive-dashboard",
    "/trusted-institutions",
  ]

  return <ThemeImagePreloader imagePaths={commonImages} />
}
