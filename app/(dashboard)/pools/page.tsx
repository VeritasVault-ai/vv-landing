import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PoolsTable from "@/components/pools-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PoolsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Liquidity Pools</h1>
          <p className="text-muted-foreground">Manage your liquidity positions across protocols</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Position
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Liquidity Pools</CardTitle>
            <CardDescription>Your current positions and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <PoolsTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Pools</CardTitle>
            <CardDescription>Explore new opportunities for liquidity provision</CardDescription>
          </CardHeader>
          <CardContent>
            <PoolsTable showAll />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
