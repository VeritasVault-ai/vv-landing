import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FlashLoanExplorer from "@/components/flash-loan-explorer"
import FlashLoanSimulator from "@/components/flash-loan-simulator"
import MultiChainBridge from "@/components/multi-chain-bridge"
import { ArrowLeftRight, Lightbulb, Zap } from "lucide-react"

export default function FlashLoansPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Flash Loans</h1>
        <p className="text-muted-foreground">
          Execute uncollateralized loans across Tezos and Ethereum for arbitrage, liquidations, and more
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <Zap className="h-5 w-5 text-emerald-500 mb-1" />
            <CardTitle>Instant Liquidity</CardTitle>
            <CardDescription>
              Access large amounts of capital without collateral, repay within the same transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Flash loans allow you to borrow assets without collateral as long as the loan is returned within the same
              transaction block, enabling powerful DeFi strategies across Uniswap, SushiSwap, Raydium, and Gnosis.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <ArrowLeftRight className="h-5 w-5 text-emerald-500 mb-1" />
            <CardTitle>Multi-Chain Bridge</CardTitle>
            <CardDescription>
              Seamlessly execute flash loans across Tezos, Ethereum, and Solana blockchains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our proprietary bridge technology allows flash loans to be initiated on one chain and utilized on another,
              opening up cross-chain arbitrage opportunities between Uniswap, SushiSwap, Raydium, and Gnosis protocols.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <Lightbulb className="h-5 w-5 text-emerald-500 mb-1" />
            <CardTitle>AI-Optimized Strategies</CardTitle>
            <CardDescription>Let our AI identify and execute profitable flash loan opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our AI constantly monitors both Tezos and Ethereum markets to identify price discrepancies and
              automatically execute profitable flash loan strategies.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="explorer" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="explorer">Opportunity Explorer</TabsTrigger>
          <TabsTrigger value="simulator">Flash Loan Simulator</TabsTrigger>
          <TabsTrigger value="bridge">Multi-Chain Bridge</TabsTrigger>
        </TabsList>
        <TabsContent value="explorer" className="mt-6">
          <FlashLoanExplorer />
        </TabsContent>
        <TabsContent value="simulator" className="mt-6">
          <FlashLoanSimulator />
        </TabsContent>
        <TabsContent value="bridge" className="mt-6">
          <MultiChainBridge />
        </TabsContent>
      </Tabs>
    </div>
  )
}
