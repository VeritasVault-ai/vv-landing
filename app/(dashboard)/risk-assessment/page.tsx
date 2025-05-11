import type { Metadata } from "next"
import { RiskAssessment } from "@/components/risk-assessment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Risk Assessment | Tezos Liquidity Management",
  description: "AI-powered risk assessment for Tezos liquidity pools and strategies",
}

export default function RiskAssessmentPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
      <p className="text-muted-foreground">
        AI-powered risk analysis and mitigation strategies for your liquidity pools and strategies.
      </p>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>About Risk Assessment</AlertTitle>
        <AlertDescription>
          Our AI analyzes your liquidity pools and strategies to identify potential risks and provide mitigation
          strategies. Risk assessments are updated regularly to reflect current market conditions.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="pool" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pool">Pool Risk Assessment</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="pool" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pool Selection</CardTitle>
              <CardDescription>Select a liquidity pool to assess its risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For demonstration purposes, we're showing the risk assessment for a sample pool. In a production
                environment, you would select from your available pools.
              </p>
            </CardContent>
          </Card>

          <RiskAssessment
            poolId="1"
            title="Tezos AMM 1 (XTZ/USDT) Risk Assessment"
            description="Comprehensive risk analysis for the XTZ/USDT liquidity pool on QuipuSwap"
          />
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Selection</CardTitle>
              <CardDescription>Select a strategy to assess its risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For demonstration purposes, we're showing the risk assessment for a sample strategy. In a production
                environment, you would select from your saved strategies.
              </p>
            </CardContent>
          </Card>

          <RiskAssessment
            strategyId="1"
            title="Balanced Tezos Strategy Risk Assessment"
            description="Comprehensive risk analysis for your balanced Tezos liquidity strategy"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
