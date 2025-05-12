import { CustomDimensionsGuide } from "@/components/analytics/custom-dimensions-guide"

export const metadata = {
  title: "Custom Dimensions Guide | VeritasVault Analytics",
  description: "Register and manage custom dimensions for enhanced analytics tracking",
}

export default function CustomDimensionsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Custom Dimensions Registration</h1>
      <p className="text-lg mb-8">
        This guide will help you register custom dimensions in your Google Analytics 4 property to enhance your
        analytics reporting capabilities.
      </p>
      <CustomDimensionsGuide />
    </div>
  )
}
