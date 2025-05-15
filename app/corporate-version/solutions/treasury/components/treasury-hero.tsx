import { Button } from "@/components/ui/button"
import { LineChart, Wallet, ArrowDownUp } from "lucide-react"

export function TreasuryHero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Treasury Management for Digital Assets
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Optimize your institutional treasury operations with our comprehensive digital asset management platform.
              Designed specifically for corporate treasuries and financial institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <a href="/corporate-version/demo">Request Demo</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="/corporate-version/solutions/treasury/whitepaper">Download Whitepaper</a>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="p-6 h-full flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Total Holdings</span>
                      <LineChart className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-bold">$247,892,560</div>
                    <div className="text-green-300 text-sm">+2.4% (24h)</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Liquidity</span>
                        <Wallet className="h-4 w-4" />
                      </div>
                      <div className="text-lg font-bold">$84.2M</div>
                      <div className="text-xs">Available now</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Yield</span>
                        <ArrowDownUp className="h-4 w-4" />
                      </div>
                      <div className="text-lg font-bold">5.8%</div>
                      <div className="text-xs">Avg. APY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}