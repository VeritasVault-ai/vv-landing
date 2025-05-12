"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@/lib/supabase"
import { AlertCircle, Info } from "lucide-react"

interface Analysis {
  id: string
  title: string
  description: string
  created_at: string
  prediction: string
  confidence: number
}

export function PredictiveAnalytics() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingSimulatedData, setUsingSimulatedData] = useState(false)

  useEffect(() => {
    loadSavedAnalyses()
  }, [])

  const loadSavedAnalyses = async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to get user session
      const supabase = createClient()
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session error:", sessionError)
        throw new Error("Authentication error")
      }

      if (!session) {
        // No session, use simulated data
        console.log("No session, using simulated data")
        setUsingSimulatedData(true)
        setAnalyses(getSimulatedAnalyses())
        setLoading(false)
        return
      }

      // We have a session, try to fetch real data
      const { data, error: fetchError } = await supabase
        .from("ai_analyses")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) {
        console.error("Fetch error:", fetchError)
        throw new Error("Failed to fetch analyses")
      }

      if (data && data.length > 0) {
        setAnalyses(data as Analysis[])
        setUsingSimulatedData(false)
      } else {
        // No data, use simulated data
        console.log("No data found, using simulated data")
        setUsingSimulatedData(true)
        setAnalyses(getSimulatedAnalyses())
      }
    } catch (err) {
      console.error("Error loading analyses:", err)
      setUsingSimulatedData(true)
      setAnalyses(getSimulatedAnalyses())
      setError("Failed to load saved analyses. Using simulated data instead.")
    } finally {
      setLoading(false)
    }
  }

  const getSimulatedAnalyses = (): Analysis[] => {
    return [
      {
        id: "1",
        title: "Market Volatility Prediction",
        description: "AI analysis of market conditions and volatility prediction for the next 24 hours",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        prediction:
          "Low volatility expected with a 78% confidence level. Market conditions appear stable with minor fluctuations predicted.",
        confidence: 78,
      },
      {
        id: "2",
        title: "Liquidity Pool Performance",
        description: "Analysis of top-performing liquidity pools based on historical data",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        prediction:
          "USDT/ETH pool showing highest stability and returns. XTZ/ETH pool demonstrates promising growth patterns.",
        confidence: 85,
      },
      {
        id: "3",
        title: "Strategy Optimization",
        description: "Recommendations for optimizing current liquidity provision strategies",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        prediction:
          "Rebalancing towards stablecoin pairs recommended. Consider increasing allocation to XTZ/USDC by 15%.",
        confidence: 92,
      },
    ]
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {usingSimulatedData && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Using Simulated Data</AlertTitle>
          <AlertDescription>
            You're viewing simulated data. Sign in or connect your account to see your actual analyses.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
          <CardDescription>AI-powered analysis and predictions based on market data and your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="saved">
            <TabsList className="mb-4">
              <TabsTrigger value="saved">Saved Analyses</TabsTrigger>
              <TabsTrigger value="new">New Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-4">
              {analyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{analysis.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">Confidence: {analysis.confidence}%</div>
                    </div>
                    <CardDescription>{analysis.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{analysis.prediction}</p>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Created: {new Date(analysis.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {analyses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No saved analyses found</p>
                  <Button variant="outline">Create your first analysis</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="new">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Analysis</CardTitle>
                  <CardDescription>Use AI to analyze your portfolio and market conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button>Market Volatility Analysis</Button>
                      <Button>Portfolio Performance Prediction</Button>
                      <Button>Liquidity Pool Recommendations</Button>
                      <Button>Strategy Optimization</Button>
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                      Select an analysis type to get started. Analysis may take a few moments to complete.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
