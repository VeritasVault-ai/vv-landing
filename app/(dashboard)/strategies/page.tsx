import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cog, Plus, Sliders } from "lucide-react"
import Link from "next/link"
import { AIStrategyRecommendation } from "@/components/ai-strategy-recommendation"

const strategies = [
  {
    id: 1,
    name: "Balanced Yield",
    description: "Optimized for steady returns with moderate risk",
    status: "Active",
    apy: "15.8%",
    risk: "Medium",
    pools: 4,
    lastRebalanced: "2 days ago",
  },
  {
    id: 2,
    name: "Stable Income",
    description: "Focus on stable pools with minimal impermanent loss",
    status: "Inactive",
    apy: "8.2%",
    risk: "Low",
    pools: 3,
    lastRebalanced: "7 days ago",
  },
  {
    id: 3,
    name: "Growth Maximizer",
    description: "Aggressive strategy targeting highest yields",
    status: "Inactive",
    apy: "24.5%",
    risk: "High",
    pools: 5,
    lastRebalanced: "14 days ago",
  },
  {
    id: 4,
    name: "Custom Strategy",
    description: "Your personalized liquidity allocation strategy",
    status: "Draft",
    apy: "-",
    risk: "-",
    pools: 0,
    lastRebalanced: "-",
  },
]

export default function StrategiesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategies</h1>
          <p className="text-muted-foreground">Create and manage your liquidity allocation strategies</p>
        </div>
        <Button asChild>
          <Link href="/strategies/manage">
            <Plus className="mr-2 h-4 w-4" />
            New Strategy
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Your Strategies</TabsTrigger>
          <TabsTrigger value="presets">Strategy Presets</TabsTrigger>
          <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{strategy.name}</CardTitle>
                    <Badge
                      variant={
                        strategy.status === "Active"
                          ? "default"
                          : strategy.status === "Inactive"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {strategy.status}
                    </Badge>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Target APY</p>
                      <p className="font-medium">{strategy.apy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Risk Level</p>
                      <p className="font-medium">{strategy.risk}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Pools</p>
                      <p className="font-medium">{strategy.pools}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Last Rebalanced</p>
                      <p className="font-medium">{strategy.lastRebalanced}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/strategies/configure">
                      <Cog className="mr-2 h-4 w-4" />
                      Configure
                    </Link>
                  </Button>
                  {strategy.status === "Active" ? (
                    <Button size="sm">
                      <Sliders className="mr-2 h-4 w-4" />
                      Rebalance
                    </Button>
                  ) : (
                    <Button size="sm">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Activate
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conservative</CardTitle>
                <CardDescription>Prioritizes capital preservation with stable returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected APY</p>
                      <p className="text-lg font-medium">7-10%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-lg font-medium">Low</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Allocation Strategy</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Stable Pairs</span>
                        <span className="font-medium">70%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Medium Volatility</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>High Volatility</span>
                        <span className="font-medium">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use This Preset</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balanced</CardTitle>
                <CardDescription>Optimized balance between yield and risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected APY</p>
                      <p className="text-lg font-medium">12-18%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-lg font-medium">Medium</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Allocation Strategy</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Stable Pairs</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Medium Volatility</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>High Volatility</span>
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use This Preset</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aggressive</CardTitle>
                <CardDescription>Maximizes yield potential with higher risk tolerance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected APY</p>
                      <p className="text-lg font-medium">20-30%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-lg font-medium">High</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Allocation Strategy</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Stable Pairs</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Medium Volatility</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>High Volatility</span>
                        <span className="font-medium">50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use This Preset</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI-Optimized</CardTitle>
                <CardDescription>Dynamically adjusted based on market conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected APY</p>
                      <p className="text-lg font-medium">15-25%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-lg font-medium">Medium-High</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Allocation Strategy</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Stable Pairs</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Medium Volatility</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>High Volatility</span>
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use This Preset</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIStrategyRecommendation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
