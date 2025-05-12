import { FunnelVisualizationGuide } from "@/components/analytics/funnel-visualization-guide"

export const metadata = {
  title: "Funnel Visualization Guide - NeuralLiquid",
  description: "Learn how to create and interpret funnel visualizations in Google Analytics",
}

export default function FunnelGuidePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Funnel Visualization Guide</h1>
      <FunnelVisualizationGuide />
    </div>
  )
}
