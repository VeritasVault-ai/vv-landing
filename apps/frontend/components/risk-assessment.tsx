"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RiskAssessmentProps {
  overallRisk?: number
  marketVolatility?: string
  impermanentLoss?: string
  compact?: boolean
  title?: string
  description?: string
}

// Define the component with a named export
export function RiskAssessment({
  overallRisk = 62,
  marketVolatility = "Moderate",
  impermanentLoss = "Medium",
  compact = false,
  title = "Risk Assessment",
  description = "AI-powered risk analysis and mitigation strategies",
}: RiskAssessmentProps) {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500"
    if (risk < 60) return "bg-yellow-500"
    if (risk < 80) return "bg-orange-500"
    return "bg-red-500"
  }

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return "Low"
    if (risk < 60) return "Moderate"
    if (risk < 80) return "High"
    return "Critical"
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Overall Risk Assessment</h3>
          <Badge variant="secondary">{getRiskLabel(overallRisk)} Risk</Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Risk Score</span>
            <span className="font-medium">{overallRisk}/100</span>
          </div>
          <Progress value={overallRisk} className={`h-2 ${getRiskColor(overallRisk)}`} />
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Overall Risk Assessment</h3>
            <p className="text-sm text-muted-foreground">Based on current market conditions</p>
          </div>
          <Badge variant="secondary">{getRiskLabel(overallRisk)} Risk</Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Risk Score</span>
            <span className="font-medium">{overallRisk}/100</span>
          </div>
          <Progress value={overallRisk} className={`h-2 ${getRiskColor(overallRisk)}`} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border p-2">
            <div className="text-xs text-muted-foreground">Market Volatility</div>
            <div className="text-sm font-medium">{marketVolatility}</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="text-xs text-muted-foreground">Impermanent Loss</div>
            <div className="text-sm font-medium">{impermanentLoss}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Also export as default for components that import it that way
export default RiskAssessment
