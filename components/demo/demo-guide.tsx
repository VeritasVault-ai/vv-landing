"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DemoGuideProps {
  onDismiss: () => void
}

export function DemoGuide({ onDismiss }: DemoGuideProps) {
  return (
    <Card className="border-dashed bg-muted/20">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Welcome to the Tezos Liquidity Management Demo</CardTitle>
            <CardDescription>Explore our AI-powered platform for optimizing liquidity positions</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            This interactive demo showcases how our platform helps liquidity providers optimize their positions,
            minimize risk, and maximize returns using AI-powered analytics and recommendations.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 rounded-lg border bg-background">
              <h3 className="font-medium mb-1">1. Explore the Dashboard</h3>
              <p className="text-xs text-muted-foreground">
                View your portfolio performance, risk assessment, and strategy metrics at a glance.
              </p>
            </div>

            <div className="p-3 rounded-lg border bg-background">
              <h3 className="font-medium mb-1">2. Analyze Risk Factors</h3>
              <p className="text-xs text-muted-foreground">
                Understand the AI-powered risk assessment and mitigation recommendations.
              </p>
            </div>

            <div className="p-3 rounded-lg border bg-background">
              <h3 className="font-medium mb-1">3. Compare Strategies</h3>
              <p className="text-xs text-muted-foreground">
                Evaluate different liquidity strategies based on risk, return, and market conditions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onDismiss} className="w-full">
          Start Exploring
        </Button>
      </CardFooter>
    </Card>
  )
}
