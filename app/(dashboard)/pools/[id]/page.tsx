import { Suspense } from "react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { RiskAssessment } from "@/components/risk-assessment"

interface PoolDetailsPageProps {
  params: {
    id: string
  }
}

export default async function PoolDetailsPage({ params }: PoolDetailsPageProps) {
  const supabase = createClient()

  // Fetch pool data
  const { data: pool, error } = await supabase.from("liquidity_pools").select("*").eq("id", params.id).single()

  if (error || !pool) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{pool.name}</h1>
        <p className="text-muted-foreground">
          {pool.protocol} • {pool.pair}
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">APY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pool.apy}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">TVL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${pool.tvl.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{pool.risk_level}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pool.protocol}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pool Details</CardTitle>
              <CardDescription>Detailed information about this liquidity pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Pair</h3>
                    <p>{pool.pair}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Protocol</h3>
                    <p>{pool.protocol}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Risk Level</h3>
                    <p className="capitalize">{pool.risk_level}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                    <p>{new Date(pool.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Historical performance data for this pool</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Performance chart will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <RiskAssessment
              poolId={params.id}
              title={`${pool.name} Risk Assessment`}
              description={`Comprehensive risk analysis for the ${pool.pair} liquidity pool on ${pool.protocol}`}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
