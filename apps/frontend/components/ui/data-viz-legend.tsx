import { colors } from "@/lib/color-system"

interface DataVizLegendProps {
  items: Array<{
    label: string
    color: keyof typeof colors.dataViz
  }>
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function DataVizLegend({ items, orientation = "horizontal", className = "" }: DataVizLegendProps) {
  return (
    <div
      className={`flex ${orientation === "vertical" ? "flex-col space-y-2" : "flex-row flex-wrap gap-4"} ${className}`}
      aria-label="Chart legend"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: colors.dataViz[item.color] }}
            aria-hidden="true"
          ></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
