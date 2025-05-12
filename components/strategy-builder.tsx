"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Sparkles } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

const COLORS = ["#10b981", "#3b82f6", "#6366f1"]

export default function StrategyBuilder() {
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [stablePairs, setStablePairs] = useState(40)
  const [mediumVolatility, setMediumVolatility] = useState(40)
  const [highVolatility, setHighVolatility] = useState(20)
  const [aiOptimizeOpen, setAiOptimizeOpen] = useState(false)
  const [aiOptimizing, setAiOptimizing] = useState(false)
  const [aiOptimized, setAiOptimized] = useState(false)
  const { trackEvent } = useAnalytics()

  const handleRiskToleranceChange = (value: number[]) => {
    const newValue = value[0]
    setRiskTolerance(newValue)

    // Track risk tolerance change
    trackEvent({
      action: "adjust_risk_tolerance",
      category: "strategy_builder",
      label: getRiskLevel(newValue),
      value: newValue,
    })

    // Adjust allocation based on risk tolerance
    if (newValue <= 25) {
      // Conservative
      setStablePairs(70)
      setMediumVolatility(30)
      setHighVolatility(0)
    } else if (newValue <= 50) {
      // Balanced
      setStablePairs(40)
      setMediumVolatility(40)
      setHighVolatility(20)
    } else if (newValue <= 75) {
      // Growth
      setStablePairs(20)
      setMediumVolatility(50)
      setHighVolatility(30)
    } else {
      // Aggressive
      setStablePairs(10)
      setMediumVolatility(40)
      setHighVolatility(50)
    }
  }

  const handleStablePairsChange = (value: number[]) => {
    const newStablePairs = value[0]
    const remaining = 100 - newStablePairs
    const mediumRatio = mediumVolatility / (mediumVolatility + highVolatility) || 0.5

    setStablePairs(newStablePairs)
    setMediumVolatility(Math.round(remaining * mediumRatio))
    setHighVolatility(Math.round(remaining * (1 - mediumRatio)))

    // Track stable pairs adjustment
    trackEvent({
      action: "adjust_allocation",
      category: "strategy_builder",
      label: "stable_pairs",
      value: newStablePairs,
    })
  }

  const handleMediumVolatilityChange = (value: number[]) => {
    const newMediumVolatility = value[0]
    const newHighVolatility = 100 - stablePairs - newMediumVolatility

    setMediumVolatility(newMediumVolatility)
    setHighVolatility(newHighVolatility)

    // Track medium volatility adjustment
    trackEvent({
      action: "adjust_allocation",
      category: "strategy_builder",
      label: "medium_volatility",
      value: newMediumVolatility,
    })
  }

  const handleAiOptimize = () => {
    setAiOptimizeOpen(true)
    setAiOptimizing(true)

    // Track AI optimization request
    trackEvent({
      action: "ai_optimize",
      category: "strategy_builder",
      label: "request",
      risk_level: riskLevel(),
      current_apy: expectedApy(),
    })

    // Simulate AI optimization
    setTimeout(() => {
      setAiOptimizing(false)
      setAiOptimized(true)

      // Set optimized values
      setStablePairs(35)
      setMediumVolatility(45)
      setHighVolatility(20)
      setRiskTolerance(55)

      // Track AI optimization completion
      trackEvent({
        action: "ai_optimize",
        category: "strategy_builder",
        label: "complete",
        new_risk_level: "Medium-High",
        new_apy: "17.2",
      })
    }, 3000)
  }

  const handleSaveStrategy = () => {
    // Track strategy save
    trackEvent({
      action: "save_strategy",
      category: "strategy_builder",
      label: riskLevel(),
      risk_tolerance: riskTolerance,
      stable_pairs: stablePairs,
      medium_volatility: mediumVolatility,
      high_volatility: highVolatility,
      expected_apy: expectedApy(),
    })
  }

  const pieData = [
    { name: "Stable Pairs", value: stablePairs },
    { name: "Medium Volatility", value: mediumVolatility },
    { name: "High Volatility", value: highVolatility },
  ]

  const expectedApy = () => {
    // Simple calculation based on allocation
    const stableApy = 8
    const mediumApy = 15
    const highApy = 25

    return ((stablePairs * stableApy + mediumVolatility * mediumApy + highVolatility * highApy) / 100).toFixed(1)
  }

  const riskLevel = () => {
    return getRiskLevel(riskTolerance)
  }

  const getRiskLevel = (value: number) => {
    if (value <= 25) return "Low"
    if (value <= 50) return "Medium"
    if (value <= 75) return "Medium-High"
    return "High"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Strategy Builder</CardTitle>
          <CardDescription>Create a personalized liquidity allocation strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Risk Tolerance</Label>
                  <span className="text-sm font-medium">{riskLevel()}</span>
                </div>
                <Slider
                  defaultValue={[riskTolerance]}
                  max={100}
                  step={1}
                  onValueChange={handleRiskToleranceChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Balanced</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Stable Pairs</Label>
                    <span className="text-sm font-medium">{stablePairs}%</span>
                  </div>
                  <Slider defaultValue={[stablePairs]} max={100} step={1} onValueChange={handleStablePairsChange} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Medium Volatility</Label>
                    <span className="text-sm font-medium">{mediumVolatility}%</span>
                  </div>
                  <Slider
                    defaultValue={[mediumVolatility]}
                    max={100 - stablePairs}
                    step={1}
                    onValueChange={handleMediumVolatilityChange}
                    disabled={stablePairs === 100}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>High Volatility</Label>
                    <span className="text-sm font-medium">{highVolatility}%</span>
                  </div>
                  <div className="h-5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-slate-200 dark:bg-slate-700"
                      style={{ width: `${highVolatility}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">Expected APY</p>
                  <p className="text-2xl font-bold">{expectedApy()}%</p>
                  <p className="text-xs text-muted-foreground">Based on current market conditions</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <p className="text-2xl font-bold">{riskLevel()}</p>
                  <p className="text-xs text-muted-foreground">Volatility exposure</p>
                </div>
              </div>

              <Button className="w-full" onClick={handleAiOptimize}>
                <Sparkles className="mr-2 h-4 w-4" />
                AI Optimize Strategy
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Advanced Options</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="impermanent-loss" className="rounded" defaultChecked />
                <Label htmlFor="impermanent-loss" className="text-sm">
                  Minimize impermanent loss
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="gas-optimization" className="rounded" defaultChecked />
                <Label htmlFor="gas-optimization" className="text-sm">
                  Optimize for gas efficiency
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="protocol-diversification" className="rounded" defaultChecked />
                <Label htmlFor="protocol-diversification" className="text-sm">
                  Protocol diversification
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-compound" className="rounded" />
                <Label htmlFor="auto-compound" className="text-sm">
                  Auto-compound rewards
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                // Reset form and track event
                setRiskTolerance(50)
                setStablePairs(40)
                setMediumVolatility(40)
                setHighVolatility(20)
                trackEvent({
                  action: "reset_strategy",
                  category: "strategy_builder",
                })
              }}
            >
              Reset
            </Button>
            <Button onClick={handleSaveStrategy}>Save Strategy</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={aiOptimizeOpen} onOpenChange={setAiOptimizeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Strategy Optimization</DialogTitle>
            <DialogDescription>
              {aiOptimizing
                ? "Our AI is analyzing market conditions and optimizing your strategy..."
                : "AI has optimized your strategy based on current market conditions and historical performance."}
            </DialogDescription>
          </DialogHeader>

          {aiOptimizing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing market data and optimizing allocation...</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-950/20">
                <h4 className="font-medium mb-2">AI Recommendation</h4>
                <p className="text-sm">
                  Based on current market conditions and historical performance, we recommend adjusting your allocation
                  to 35% stable pairs, 45% medium volatility, and 20% high volatility to optimize for risk-adjusted
                  returns.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">Optimized APY</p>
                  <p className="text-2xl font-bold">17.2%</p>
                  <p className="text-xs text-emerald-500">+1.7% improvement</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">Risk-Adjusted Return</p>
                  <p className="text-2xl font-bold">2.1</p>
                  <p className="text-xs text-emerald-500">+0.3 improvement</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setAiOptimizeOpen(false)
                trackEvent({
                  action: "ai_optimize",
                  category: "strategy_builder",
                  label: "cancel",
                })
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={aiOptimizing}
              onClick={() => {
                setAiOptimizeOpen(false)
                trackEvent({
                  action: "ai_optimize",
                  category: "strategy_builder",
                  label: "apply",
                  new_risk_level: "Medium-High",
                  new_apy: "17.2",
                })
              }}
            >
              Apply Optimization
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
