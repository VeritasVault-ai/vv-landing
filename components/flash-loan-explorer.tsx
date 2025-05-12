"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Sparkles } from "lucide-react"

const opportunities = [
  {
    id: 1,
    type: "Arbitrage",
    sourceChain: "Tezos",
    targetChain: "Ethereum",
    sourceDex: "QuipuSwap",
    targetDex: "Uniswap V3",
    assetPair: "XTZ/ETH",
    profitPotential: 0.82,
    complexity: "Medium",
    risk: "Low",
  },
  {
    id: 2,
    type: "Liquidation",
    sourceChain: "Tezos",
    targetChain: "Tezos",
    sourceDex: "Plenty",
    targetDex: "Youves",
    assetPair: "USDtz/USDT",
    profitPotential: 1.45,
    complexity: "High",
    risk: "Medium",
  },
  {
    id: 3,
    type: "Arbitrage",
    sourceChain: "Ethereum",
    targetChain: "Tezos",
    sourceDex: "SushiSwap",
    targetDex: "QuipuSwap",
    assetPair: "ETH/wXTZ",
    profitPotential: 0.65,
    complexity: "Medium",
    risk: "Low",
  },
  {
    id: 4,
    type: "Collateral Swap",
    sourceChain: "Tezos",
    targetChain: "Ethereum",
    sourceDex: "Youves",
    targetDex: "Aave",
    assetPair: "XTZ/DAI",
    profitPotential: 1.12,
    complexity: "High",
    risk: "Medium",
  },
  {
    id: 5,
    type: "Arbitrage",
    sourceChain: "Ethereum",
    targetChain: "Ethereum",
    sourceDex: "Uniswap V3",
    targetDex: "SushiSwap",
    assetPair: "ETH/USDC",
    profitPotential: 0.58,
    complexity: "Low",
    risk: "Low",
  },
  {
    id: 6,
    type: "Arbitrage",
    sourceChain: "Solana",
    targetChain: "Ethereum",
    sourceDex: "Raydium",
    targetDex: "Uniswap V3",
    assetPair: "SOL/ETH",
    profitPotential: 0.94,
    complexity: "Medium",
    risk: "Medium",
  },
  {
    id: 7,
    type: "Liquidation",
    sourceChain: "Ethereum",
    targetChain: "Ethereum",
    sourceDex: "Gnosis",
    targetDex: "Uniswap V3",
    assetPair: "GNO/ETH",
    profitPotential: 1.28,
    complexity: "High",
    risk: "Medium",
  },
  {
    id: 8,
    type: "Arbitrage",
    sourceChain: "Ethereum",
    targetChain: "Solana",
    sourceDex: "SushiSwap",
    targetDex: "Raydium",
    assetPair: "USDC/SOL",
    profitPotential: 0.76,
    complexity: "Medium",
    risk: "Medium",
  },
]

export default function FlashLoanExplorer() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  const showDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setDetailsOpen(true)
  }

  const showComingSoon = () => {
    setComingSoonOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flash Loan Opportunities</CardTitle>
          <CardDescription>
            Current cross-chain opportunities detected by our AI for flash loan strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Source Chain</TableHead>
                  <TableHead>Target Chain</TableHead>
                  <TableHead>Asset Pair</TableHead>
                  <TableHead>Profit Potential</TableHead>
                  <TableHead>Complexity</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opportunity) => (
                  <TableRow key={opportunity.id}>
                    <TableCell>{opportunity.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{opportunity.sourceChain}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{opportunity.targetChain}</Badge>
                    </TableCell>
                    <TableCell>{opportunity.assetPair}</TableCell>
                    <TableCell className="text-emerald-600 font-medium">{opportunity.profitPotential}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          opportunity.complexity === "Low"
                            ? "outline"
                            : opportunity.complexity === "Medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {opportunity.complexity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          opportunity.risk === "Low"
                            ? "outline"
                            : opportunity.risk === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {opportunity.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => showDetails(opportunity)}>
                          Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={showComingSoon}>
                          Execute
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Flash Loan Opportunity Details</DialogTitle>
            <DialogDescription>
              Detailed information about this flash loan opportunity and execution strategy
            </DialogDescription>
          </DialogHeader>

          {selectedOpportunity && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedOpportunity.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Asset Pair</p>
                  <p className="font-medium">{selectedOpportunity.assetPair}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Source</p>
                  <p className="font-medium">
                    {selectedOpportunity.sourceChain} ({selectedOpportunity.sourceDex})
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="font-medium">
                    {selectedOpportunity.targetChain} ({selectedOpportunity.targetDex})
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Execution Strategy</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Initiate flash loan on {selectedOpportunity.sourceChain} for{" "}
                    {selectedOpportunity.assetPair.split("/")[0]}
                  </li>
                  {selectedOpportunity.sourceChain !== selectedOpportunity.targetChain && (
                    <li>
                      Bridge assets from {selectedOpportunity.sourceChain} to {selectedOpportunity.targetChain} using
                      LiquidAI Bridge
                    </li>
                  )}
                  <li>
                    Execute {selectedOpportunity.type.toLowerCase()} between {selectedOpportunity.sourceDex} and{" "}
                    {selectedOpportunity.targetDex}
                  </li>
                  {selectedOpportunity.sourceChain !== selectedOpportunity.targetChain && (
                    <li>Bridge profits back to {selectedOpportunity.sourceChain}</li>
                  )}
                  <li>Repay flash loan with profit</li>
                </ol>
              </div>

              <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-950/20">
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <p className="text-sm">
                  Our AI predicts a {selectedOpportunity.profitPotential}% profit potential with{" "}
                  {selectedOpportunity.risk.toLowerCase()} risk. This opportunity has been verified across both chains
                  with a 94% confidence score.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button onClick={showComingSoon}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Auto-Execute
                </Button>
                <Button variant="outline" onClick={showComingSoon}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              Flash loan execution is currently under development and will be available in a future update.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setComingSoonOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
