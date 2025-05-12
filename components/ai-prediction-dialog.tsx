"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AIPredictionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  poolName: string
}

export function AIPredictionDialog({ open, onOpenChange, poolName }: AIPredictionDialogProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<any>(null)

  useEffect(() => {
    if (open && poolName) {
      setLoading(true)
      setError(null)

      // Simulate API call to get AI prediction
      setTimeout(() => {
        try {
          // Generate mock prediction data
          const today = new Date()
          const data = Array.from({ length: 30 }, (_, i) => {
            const date = new Date()
            date.setDate(today.getDate() + i)

            // Base APY with some randomness and trend
            let baseApy
            if (poolName.includes("Stable")) {
              baseApy = 8 + (Math.random() * 1 - 0.5) + i * 0.05
            } else if (poolName.includes("Farm") || poolName.includes("High")) {
              baseApy = 20 + (Math.random() * 4 - 2) + i * 0.2
            } else {
              baseApy = 15 + (Math.random() * 2 - 1) + i * 0.1
            }

            return {
              date: date.toISOString().split("T")[0],
              apy: Number.parseFloat(baseApy.toFixed(2)),
            }
          })

          const currentApy = data[0].apy
          const lastApy = data[data.length - 1].apy
          const change = Number.parseFloat((((lastApy - currentApy) / currentApy) * 100).toFixed(2))

          setPrediction({
            data,
            currentApy,
            projectedApy: lastApy,
            change,
            trend: change > 1 ? "Increasing" : change < -1 ? "Decreasing" : "Stable",
            confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
            factors: [
              "Market volatility trends",
              "Historical pool performance",
              "Token correlation analysis",
              "Protocol TVL growth patterns",
              "Seasonal DeFi trends",
            ],
          })

          setLoading(false)
        } catch (err) {
          console.error("Error generating prediction:", err)
          setError("Failed to generate prediction. Please try again.")
          setLoading(false)
        }
      }, 2000)
    }
  }, [open, poolName])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Prediction for {poolName}</DialogTitle>
          <DialogDescription>30-day APY forecast based on historical data and market trends</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Analyzing market data and generating prediction...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
            <p className="text-sm text-destructive">{error}</p>
            <Button onClick={() => onOpenChange(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">Current APY</p>
                <p className="text-2xl font-bold">{prediction.currentApy}%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">Projected APY</p>
                <p className="text-2xl font-bold">{prediction.projectedApy}%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">30-Day Change</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{prediction.change}%</p>
                  {prediction.change > 0 ? (
                    <TrendingUp className="ml-2 h-5 w-5 text-emerald-500" />
                  ) : prediction.change < 0 ? (
                    <TrendingDown className="ml-2 h-5 w-5 text-red-500" />
                  ) : (
                    <Minus className="ml-2 h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-medium mb-3">30-Day APY Forecast</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prediction.data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getDate()}/${date.getMonth() + 1}`
                      }}
                      tick={{ fontSize: 12 }}
                      tickCount={6}
                    />
                    <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "APY"]}
                      labelFormatter={(label) => {
                        const date = new Date(label)
                        return date.toLocaleDateString()
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="apy"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-2">Prediction Summary</h4>
                <p className="text-sm mb-2">
                  Based on our analysis, the APY for {poolName} is expected to
                  {prediction.trend === "Increasing"
                    ? " increase over the next 30 days."
                    : prediction.trend === "Decreasing"
                      ? " decrease over the next 30 days."
                      : " remain relatively stable over the next 30 days."}
                </p>
                <div className="flex items-center mt-3">
                  <p className="text-sm text-muted-foreground mr-2">Confidence:</p>
                  <p className="text-sm font-medium">{prediction.confidence}%</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-2">Key Factors</h4>
                <ul className="text-sm space-y-1">
                  {prediction.factors.map((factor: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
