import { StrategyForm } from "@/components/strategy-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIStrategyRecommendation } from "@/components/ai-strategy-recommendation"

export default function ManageStrategyPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Strategy</h1>
        <p className="text-muted-foreground">Create a new liquidity allocation strategy</p>
      </div>

      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="manual">Manual Setup</TabsTrigger>
          <TabsTrigger value="ai">AI Assisted</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <div className="bg-card rounded-lg border p-6">
            <StrategyForm />
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <AIStrategyRecommendation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
