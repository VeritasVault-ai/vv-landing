"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, AlertTriangle, PieChart, BarChart3, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getBrowserClient } from "@/lib/supabase"
import { useAnalytics } from "@/hooks/use-analytics"
import { FeatureUsageTracker } from "@/components/analytics/feature-usage-tracker"

interface StrategyRecommendation {
  name: string
  description: string
  risk_level: string
  target_apy: number
  stable_pairs_percentage: number
  medium_volatility_percentage: number
  high_volatility_percentage: number
  recommended_pools: {
    name: string
    protocol: string
    allocation_percentage: number
  }[]
  rebalancing_frequency: string
}

export function AIStrategyRecommendation() {
  const [userPreferences, setUserPreferences] = useState({
    riskTolerance: "Medium",
    investmentHorizon: "6 months",
    targetApy: "15",
    preferredProtocols: ["Any"],
  })

  const [generating, setGenerating] = useState(false)
  const [strategy, setStrategy] = useState<StrategyRecommendation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const supabase = getBrowserClient()
  const { trackEvent } = useAnalytics()

  const generateStrategy = async () => {
    try {
      setGenerating(true)
      setError(null)
      setSaved(false)

      // Track strategy generation request
      trackEvent({
        action: "generate_ai_strategy",
        category: "ai_features",
        label: "request",
        risk_tolerance: userPreferences.riskTolerance,
        investment_horizon: userPreferences.investmentHorizon,
        target_apy: userPreferences.targetApy,
      })

      const response = await fetch("/api/ai/generate-strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPreferences }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate strategy")
      }

      const data = await response.json()
      setStrategy(data)

      // Track successful strategy generation
      trackEvent({
        action: "generate_ai_strategy",
        category: "ai_features",
        label: "success",
        strategy_name: data.name,
        risk_level: data.risk_level,
        target_apy: data.target_apy,
      })
    } catch (err) {
      console.error("Error generating strategy:", err)
      setError("Failed to generate strategy. Please try again.")

      // Track error in strategy generation
      trackEvent({
        action: "generate_ai_strategy",
        category: "ai_features",
        label: "error",
        error_message: err instanceof Error ? err.message : "Unknown error",
      })
    } finally {
      setGenerating(false)
    }
  }

  const saveStrategy = async () => {
    if (!strategy) return

    try {
      setSaved(false)

      // Track strategy save attempt
      trackEvent({
        action: "save_ai_strategy",
        category: "ai_features",
        label: "attempt",
        strategy_name: strategy.name,
      })

      // Insert strategy into database
      const { data: strategyData, error: strategyError } = await supabase
        .from("strategies")
        .insert({
          name: strategy.name,
          description: strategy.description,
          risk_level: strategy.risk_level,
          target_apy: strategy.target_apy,
          stable_pairs_percentage: strategy.stable_pairs_percentage,
          medium_volatility_percentage: strategy.medium_volatility_percentage,
          high_volatility_percentage: strategy.high_volatility_percentage,
          status: "active",
        })
        .select()

      if (strategyError) throw strategyError

      if (strategyData && strategyData[0]) {
        const strategyId = strategyData[0].id

        // Insert strategy pools
        const strategyPoolsPromises = strategy.recommended_pools.map((pool) => {
          return supabase.from("strategy_pools").insert({
            strategy_id: strategyId,
            // We would need to get the actual pool_id here
            // For now, we'll just use a placeholder
            pool_id: null,
            allocation_percentage: pool.allocation_percentage,
          })
        })

        await Promise.all(strategyPoolsPromises)
        setSaved(true)

        // Track successful strategy save
        trackEvent({
          action: "save_ai_strategy",
          category: "ai_features",
          label: "success",
          strategy_id: strategyId,
          strategy_name: strategy.name,
        })
      }
    } catch (err) {
      console.error("Error saving strategy:", err)
      setError("Failed to save strategy. Please try again.")

      // Track error in strategy save
      trackEvent({
        action: "save_ai_strategy",
        category: "ai_features",
        label: "error",
        error_message: err instanceof Error ? err.message : "Unknown error",
      })
    }
  }

  const handlePreferenceChange = (key: keyof typeof userPreferences, value: string) => {
    setUserPreferences((prev) => ({ ...prev, [key]: value }))

    // Track preference change
    trackEvent({
      action: "update_ai_preference",
      category: "ai_features",
      label: key,
      value: value,
    })
  }

  return (
    <>
      {/* Track feature usage */}
      <FeatureUsageTracker featureName="ai_strategy_recommendation" category="ai_features" />

      <Card>
        <CardHeader>
          <CardTitle>AI Strategy Recommendation</CardTitle>
          <CardDescription>
            Get personalized liquidity strategy recommendations based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                <Select
                  value={userPreferences.riskTolerance}
                  onValueChange={(value) => handlePreferenceChange("riskTolerance", value)}
                >
                  <SelectTrigger id="risk-tolerance">
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment-horizon">Investment Horizon</Label>
                <Select
                  value={userPreferences.investmentHorizon}
                  onValueChange={(value) => handlePreferenceChange("investmentHorizon", value)}
                >
                  <SelectTrigger id="investment-horizon">
                    <SelectValue placeholder="Select investment horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                    <SelectItem value="Long term">Long term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-apy">Target APY (%)</Label>
                <Input
                  id="target-apy"
                  type="number"
                  min="1"
                  max="100"
                  value={userPreferences.targetApy}
                  onChange={(e) => handlePreferenceChange("targetApy", e.target.value)}
                />
              </div>

              <Button onClick={generateStrategy} disabled={generating} className="w-full">
                {generating ? (
                  <>Generating Strategy...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Strategy
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

            <div className="border rounded-lg p-4">
              {generating ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </div>
              ) : strategy ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{strategy.name}</h3>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                      <div className="font-medium">{strategy.risk_level}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Target APY</div>
                      <div className="font-medium">{strategy.target_apy}%</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Rebalancing</div>
                      <div className="font-medium">{strategy.rebalancing_frequency}</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Allocation Strategy</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="text-sm">Stable Pairs: {strategy.stable_pairs_percentage}%</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="text-sm">Medium Volatility: {strategy.medium_volatility_percentage}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="text-sm">High Volatility: {strategy.high_volatility_percentage}%</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Recommended Pools</h4>
                    <div className="space-y-2">
                      {strategy.recommended_pools.map((pool, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">{pool.name}</span>
                            <span className="text-muted-foreground ml-2">({pool.protocol})</span>
                          </div>
                          <div>{pool.allocation_percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <div className="flex gap-4 mb-4">
                    <PieChart className="h-12 w-12" />
                    <BarChart3 className="h-12 w-12" />
                  </div>
                  <p className="text-center">
                    Fill in your preferences and click "Generate Strategy" to get AI-powered recommendations
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        {strategy && (
          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setStrategy(null)
                trackEvent({
                  action: "reset_ai_strategy",
                  category: "ai_features",
                })
              }}
            >
              Reset
            </Button>
            <Button onClick={saveStrategy} disabled={saved} className="flex items-center gap-2">
              {saved ? "Strategy Saved" : "Save Strategy"}
              {!saved && <ArrowRight className="h-4 w-4" />}
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  )
}
