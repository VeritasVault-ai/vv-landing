"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, AlertTriangle, ImageIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface StrategyVisualizationProps {
  initialStrategy?: {
    name?: string
    target_apy?: number
    stable_pairs_percentage?: number
    medium_volatility_percentage?: number
    high_volatility_percentage?: number
  }
}

export function StrategyVisualization({ initialStrategy }: StrategyVisualizationProps) {
  const [strategy, setStrategy] = useState({
    name: initialStrategy?.name || "Custom Strategy",
    target_apy: initialStrategy?.target_apy || 15,
    stable_pairs_percentage: initialStrategy?.stable_pairs_percentage || 30,
    medium_volatility_percentage: initialStrategy?.medium_volatility_percentage || 50,
    high_volatility_percentage: initialStrategy?.high_volatility_percentage || 20,
  })

  const [generating, setGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSliderChange = (type: string, value: number[]) => {
    const newValue = value[0]

    // Calculate other percentages to ensure they sum to 100%
    if (type === "stable_pairs_percentage") {
      const remaining = 100 - newValue
      const mediumRatio =
        strategy.medium_volatility_percentage /
        (strategy.medium_volatility_percentage + strategy.high_volatility_percentage)

      setStrategy({
        ...strategy,
        stable_pairs_percentage: newValue,
        medium_volatility_percentage: Math.round(remaining * mediumRatio),
        high_volatility_percentage: Math.round(remaining * (1 - mediumRatio)),
      })
    } else if (type === "medium_volatility_percentage") {
      const remaining = 100 - newValue - strategy.stable_pairs_percentage

      setStrategy({
        ...strategy,
        medium_volatility_percentage: newValue,
        high_volatility_percentage: Math.max(0, remaining),
      })
    } else if (type === "high_volatility_percentage") {
      const remaining = 100 - newValue - strategy.stable_pairs_percentage

      setStrategy({
        ...strategy,
        high_volatility_percentage: newValue,
        medium_volatility_percentage: Math.max(0, remaining),
      })
    }
  }

  const generateVisualization = async () => {
    try {
      setGenerating(true)
      setError(null)

      const response = await fetch("/api/ai/generate-visualization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strategy }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate visualization")
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (err) {
      console.error("Error generating visualization:", err)
      setError("Failed to generate visualization. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Visualization</CardTitle>
        <CardDescription>Adjust your strategy parameters and generate a visual representation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="strategy-name">Strategy Name</Label>
              <Input
                id="strategy-name"
                value={strategy.name}
                onChange={(e) => setStrategy({ ...strategy, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-apy">Target APY (%)</Label>
              <Input
                id="target-apy"
                type="number"
                min="1"
                max="100"
                value={strategy.target_apy}
                onChange={(e) => setStrategy({ ...strategy, target_apy: Number.parseFloat(e.target.value) })}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stable-pairs">Stable Pairs (Low Risk)</Label>
                  <span className="text-sm">{strategy.stable_pairs_percentage}%</span>
                </div>
                <Slider
                  id="stable-pairs"
                  min={0}
                  max={100}
                  step={1}
                  value={[strategy.stable_pairs_percentage]}
                  onValueChange={(value) => handleSliderChange("stable_pairs_percentage", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="medium-volatility">Medium Volatility</Label>
                  <span className="text-sm">{strategy.medium_volatility_percentage}%</span>
                </div>
                <Slider
                  id="medium-volatility"
                  min={0}
                  max={100}
                  step={1}
                  value={[strategy.medium_volatility_percentage]}
                  onValueChange={(value) => handleSliderChange("medium_volatility_percentage", value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="high-volatility">High Volatility</Label>
                  <span className="text-sm">{strategy.high_volatility_percentage}%</span>
                </div>
                <Slider
                  id="high-volatility"
                  min={0}
                  max={100}
                  step={1}
                  value={[strategy.high_volatility_percentage]}
                  onValueChange={(value) => handleSliderChange("high_volatility_percentage", value)}
                />
              </div>
            </div>

            <Button onClick={generateVisualization} disabled={generating} className="w-full">
              {generating ? (
                <>Generating Visualization...</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Visualization
                </>
              )}
            </Button>

            {error && (
              <div className="p-3 bg-red-50 text-red-800 rounded-md flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center border rounded-lg p-4 min-h-[300px]">
            {generating ? (
              <div className="space-y-4 w-full">
                <Skeleton className="h-[250px] w-full" />
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ) : imageUrl ? (
              <div className="space-y-4 w-full">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Strategy Visualization"
                  className="rounded-md w-full h-auto object-contain"
                />
                <p className="text-xs text-center text-muted-foreground">
                  AI-generated visualization of your strategy allocation
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-4" />
                <p className="text-center">
                  Adjust your strategy parameters and click "Generate Visualization" to create an AI-powered visual
                  representation
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
