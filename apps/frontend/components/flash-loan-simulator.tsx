"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Loader2, Play } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function FlashLoanSimulator() {
  const [loanAmount, setLoanAmount] = useState("10000")
  const [sourceChain, setSourceChain] = useState("tezos")
  const [targetChain, setTargetChain] = useState("ethereum")
  const [asset, setAsset] = useState("xtz")
  const [strategy, setStrategy] = useState("arbitrage")
  const [simulationOpen, setSimulationOpen] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [simulationResults, setSimulationResults] = useState<any>(null)

  const runSimulation = () => {
    setSimulationOpen(true)
    setIsSimulating(true)
    setSimulationComplete(false)

    // Simulate API call
    setTimeout(() => {
      setIsSimulating(false)
      setSimulationComplete(true)

      // Mock simulation results
      setSimulationResults({
        success: true,
        profitAmount: (Number.parseFloat(loanAmount) * 0.012).toFixed(2),
        profitPercentage: "1.2%",
        gasUsed: "0.05 ETH",
        bridgeFee: "0.02 ETH",
        netProfit: (Number.parseFloat(loanAmount) * 0.012 - (0.07 * Number.parseFloat(loanAmount)) / 1000).toFixed(2),
        steps: [
          { name: "Loan Initiation", status: "success", time: "0.5s" },
          { name: "Bridge to Target Chain", status: "success", time: "15s" },
          { name: strategy === "arbitrage" ? "Execute Arbitrage" : "Execute Strategy", status: "success", time: "2s" },
          { name: "Bridge Back to Source", status: "success", time: "15s" },
          { name: "Loan Repayment", status: "success", time: "0.5s" },
        ],
        profitByStep: [
          { name: "Initial", value: 0 },
          { name: "After Loan", value: 0 },
          { name: "After Bridge", value: -0.02 },
          { name: "After Trade", value: Number.parseFloat((Number.parseFloat(loanAmount) * 0.015).toFixed(2)) },
          {
            name: "After Bridge Back",
            value: Number.parseFloat((Number.parseFloat(loanAmount) * 0.015 - 0.02).toFixed(2)),
          },
          {
            name: "After Repayment",
            value: Number.parseFloat((Number.parseFloat(loanAmount) * 0.012 - 0.07).toFixed(2)),
          },
        ],
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flash Loan Simulator</CardTitle>
          <CardDescription>
            Simulate flash loan strategies across Tezos and Ethereum to estimate potential profits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset">Asset</Label>
                  <Select value={asset} onValueChange={setAsset}>
                    <SelectTrigger id="asset">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xtz">XTZ (Tezos)</SelectItem>
                      <SelectItem value="eth">ETH (Ethereum)</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceChain">Source Chain</Label>
                  <Select value={sourceChain} onValueChange={setSourceChain}>
                    <SelectTrigger id="sourceChain">
                      <SelectValue placeholder="Select source chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tezos">Tezos</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetChain">Target Chain</Label>
                  <Select value={targetChain} onValueChange={setTargetChain}>
                    <SelectTrigger id="targetChain">
                      <SelectValue placeholder="Select target chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tezos">Tezos</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceDex">Source DEX</Label>
                  <Select defaultValue="uniswap">
                    <SelectTrigger id="sourceDex">
                      <SelectValue placeholder="Select source DEX" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uniswap">Uniswap</SelectItem>
                      <SelectItem value="sushiswap">SushiSwap</SelectItem>
                      <SelectItem value="raydium">Raydium</SelectItem>
                      <SelectItem value="gnosis">Gnosis</SelectItem>
                      <SelectItem value="quipuswap">QuipuSwap</SelectItem>
                      <SelectItem value="plenty">Plenty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDex">Target DEX</Label>
                  <Select defaultValue="sushiswap">
                    <SelectTrigger id="targetDex">
                      <SelectValue placeholder="Select target DEX" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uniswap">Uniswap</SelectItem>
                      <SelectItem value="sushiswap">SushiSwap</SelectItem>
                      <SelectItem value="raydium">Raydium</SelectItem>
                      <SelectItem value="gnosis">Gnosis</SelectItem>
                      <SelectItem value="quipuswap">QuipuSwap</SelectItem>
                      <SelectItem value="plenty">Plenty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger id="strategy">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arbitrage">Arbitrage</SelectItem>
                      <SelectItem value="liquidation">Liquidation</SelectItem>
                      <SelectItem value="collateralSwap">Collateral Swap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={runSimulation}>
                  <Play className="mr-2 h-4 w-4" />
                  Run Simulation
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="pt-4">
              <div className="rounded-lg border p-6 flex items-center justify-center">
                <p className="text-muted-foreground">Advanced simulation options coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={simulationOpen} onOpenChange={setSimulationOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Flash Loan Simulation</DialogTitle>
            <DialogDescription>
              {isSimulating
                ? "Simulating flash loan execution across chains..."
                : "Simulation results for your flash loan strategy"}
            </DialogDescription>
          </DialogHeader>

          {isSimulating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
              <p className="text-sm text-muted-foreground">Running simulation...</p>
            </div>
          ) : (
            simulationResults && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">Profit Amount</p>
                    <p className="text-2xl font-bold text-emerald-600">${simulationResults.profitAmount}</p>
                    <p className="text-xs text-muted-foreground">({simulationResults.profitPercentage})</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">Gas Used</p>
                    <p className="text-2xl font-bold">{simulationResults.gasUsed}</p>
                    <p className="text-xs text-muted-foreground">($70.00)</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold text-emerald-600">${simulationResults.netProfit}</p>
                    <p className="text-xs text-muted-foreground">After fees</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-4">Execution Steps</h4>
                  <div className="space-y-3">
                    {simulationResults.steps.map((step: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`rounded-full w-6 h-6 flex items-center justify-center text-xs ${
                            step.status === "success"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{step.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{step.time}</p>
                        </div>
                        <div>
                          <Badge
                            variant={step.status === "success" ? "outline" : "secondary"}
                            className={step.status === "success" ? "text-emerald-600" : ""}
                          >
                            {step.status === "success" ? "Success" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-4">Profit Breakdown</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={simulationResults.profitByStep}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Profit ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSimulationOpen(false)}>
                    Close
                  </Button>
                  <Button>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Execute Real Transaction
                  </Button>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
