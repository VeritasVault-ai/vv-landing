"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, ArrowRightLeft, Loader2 } from "lucide-react"

export default function MultiChainBridge() {
  const [amount, setAmount] = useState("1000")
  const [sourceChain, setSourceChain] = useState("tezos")
  const [targetChain, setTargetChain] = useState("ethereum")
  const [sourceAsset, setSourceAsset] = useState("xtz")
  const [targetAsset, setTargetAsset] = useState("eth")
  const [bridgeOpen, setBridgeOpen] = useState(false)
  const [isBridging, setIsBridging] = useState(false)
  const [bridgeComplete, setBridgeComplete] = useState(false)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  const handleSwapChains = () => {
    setSourceChain(targetChain)
    setTargetChain(sourceChain)
    setSourceAsset(targetAsset)
    setTargetAsset(sourceAsset)
  }

  const startBridge = () => {
    setBridgeOpen(true)
    setIsBridging(true)
    setBridgeComplete(false)

    // Simulate API call
    setTimeout(() => {
      setIsBridging(false)
      setBridgeComplete(true)
    }, 5000)
  }

  const showComingSoon = () => {
    setComingSoonOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Multi-Chain Bridge</CardTitle>
            <CardDescription>Bridge assets between Tezos and Ethereum for flash loan operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="flex justify-center my-2">
                <Button variant="ghost" size="icon" onClick={handleSwapChains}>
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceAsset">Source Asset</Label>
                  <Select value={sourceAsset} onValueChange={setSourceAsset}>
                    <SelectTrigger id="sourceAsset">
                      <SelectValue placeholder="Select source asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xtz">XTZ (Tezos)</SelectItem>
                      <SelectItem value="eth">ETH (Ethereum)</SelectItem>
                      <SelectItem value="sol">SOL (Solana)</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="gno">GNO (Gnosis)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAsset">Target Asset</Label>
                  <Select value={targetAsset} onValueChange={setTargetAsset}>
                    <SelectTrigger id="targetAsset">
                      <SelectValue placeholder="Select target asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xtz">XTZ (Tezos)</SelectItem>
                      <SelectItem value="eth">ETH (Ethereum)</SelectItem>
                      <SelectItem value="sol">SOL (Solana)</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="gno">GNO (Gnosis)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={startBridge}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Bridge Assets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bridge Technology</CardTitle>
            <CardDescription>How our proprietary bridge enables flash loans across Tezos and Ethereum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/50">
                <h4 className="font-medium mb-2">Flash Loan Bridge Architecture</h4>
                <div className="flex justify-center py-4">
                  <div className="relative h-[200px] w-full">
                    <div className="absolute top-0 left-0 w-1/3 h-full flex flex-col items-center justify-center rounded-lg border bg-background p-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                        <span className="text-emerald-700 font-bold">T</span>
                      </div>
                      <p className="text-sm font-medium">Tezos</p>
                      <p className="text-xs text-muted-foreground">Source Chain</p>
                    </div>
                    <div className="absolute top-0 right-0 w-1/3 h-full flex flex-col items-center justify-center rounded-lg border bg-background p-2">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <span className="text-blue-700 font-bold">E</span>
                      </div>
                      <p className="text-sm font-medium">Ethereum</p>
                      <p className="text-xs text-muted-foreground">Target Chain</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/5 flex flex-col items-center justify-center rounded-lg border bg-background p-2">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <span className="text-purple-700 font-bold">B</span>
                      </div>
                      <p className="text-xs font-medium">LiquidAI Bridge</p>
                      <p className="text-[10px] text-muted-foreground text-center">Atomic Cross-Chain Transactions</p>
                    </div>
                    <div className="absolute top-1/3 left-[38%] w-[10%] h-0 border-t-2 border-dashed border-muted-foreground"></div>
                    <div className="absolute top-1/3 right-[38%] w-[10%] h-0 border-t-2 border-dashed border-muted-foreground"></div>
                    <div className="absolute bottom-1/3 left-[38%] w-[10%] h-0 border-t-2 border-dashed border-muted-foreground"></div>
                    <div className="absolute bottom-1/3 right-[38%] w-[10%] h-0 border-t-2 border-dashed border-muted-foreground"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Atomic cross-chain transactions</li>
                  <li>15-second bridge time</li>
                  <li>Flash loan compatibility</li>
                  <li>Low 0.1% bridge fee</li>
                  <li>Multi-asset support</li>
                </ul>
              </div>

              <Button variant="outline" className="w-full" onClick={showComingSoon}>
                View Technical Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={bridgeOpen} onOpenChange={setBridgeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bridge Transaction</DialogTitle>
            <DialogDescription>
              {isBridging ? "Bridging assets between chains..." : "Your assets have been successfully bridged"}
            </DialogDescription>
          </DialogHeader>

          {isBridging ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
              <p className="text-sm text-muted-foreground">Processing bridge transaction...</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-950/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-700 font-bold text-sm">✓</span>
                  </div>
                  <p className="font-medium">Bridge Successful</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">From</p>
                    <p className="font-medium">{sourceChain === "tezos" ? "Tezos" : "Ethereum"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">To</p>
                    <p className="font-medium">{targetChain === "tezos" ? "Tezos" : "Ethereum"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">
                      {amount} {sourceAsset.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Received</p>
                    <p className="font-medium">
                      {amount} {targetAsset.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fee</p>
                    <p className="font-medium">
                      {(Number.parseFloat(amount) * 0.001).toFixed(2)} {sourceAsset.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Transaction ID</p>
                    <p className="font-medium truncate">0x8f...3e21</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setBridgeOpen(false)}>
                  Close
                </Button>
                <Button onClick={showComingSoon}>View Transaction</Button>
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
              This feature is currently under development and will be available in a future update.
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
