import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f2c] to-black text-white">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12">
          <Button variant="ghost" className="text-white hover:text-white/80 -ml-4" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Logo width={48} height={48} />
          <h1 className="text-3xl md:text-4xl font-semibold">How NeuralLiquid Works</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            NeuralLiquid uses advanced AI to optimize your DeFi liquidity across multiple protocols and chains. Here's
            how our platform works:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-medium mb-4 flex items-center">
                <span className="flex h-10 w-10 rounded-full bg-[#2d7fff]/20 items-center justify-center mr-3 text-lg">
                  1
                </span>
                Data Collection & Analysis
              </h2>
              <p className="text-gray-300">
                Our neural networks continuously analyze market data, pool performance, and on-chain metrics to identify
                optimal liquidity opportunities. We process terabytes of blockchain data to identify patterns and
                predict market movements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 flex items-center">
                <span className="flex h-10 w-10 rounded-full bg-[#00d1b2]/20 items-center justify-center mr-3 text-lg">
                  2
                </span>
                Strategy Generation
              </h2>
              <p className="text-gray-300">
                Based on your risk profile and goals, our AI generates personalized liquidity strategies across multiple
                protocols and chains. These strategies are designed to maximize returns while minimizing risks like
                impermanent loss.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 flex items-center">
                <span className="flex h-10 w-10 rounded-full bg-[#7b61ff]/20 items-center justify-center mr-3 text-lg">
                  3
                </span>
                Automated Execution
              </h2>
              <p className="text-gray-300">
                Our platform automatically executes trades, manages positions, and rebalances your portfolio to maximize
                returns while minimizing risks. You maintain full control and can set parameters for how aggressive or
                conservative the automation should be.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 flex items-center">
                <span className="flex h-10 w-10 rounded-full bg-[#2d7fff]/20 items-center justify-center mr-3 text-lg">
                  4
                </span>
                Continuous Optimization
              </h2>
              <p className="text-gray-300">
                As market conditions change, our AI adapts your strategy in real-time, ensuring your capital is always
                optimally deployed. The system learns from each transaction and continuously improves its prediction
                models.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Technical Architecture</h2>
          <p className="text-gray-300 mb-6">
            NeuralLiquid is built on a robust technical foundation that ensures security, performance, and reliability:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
            <li>
              <strong>Multi-Chain Support:</strong> Native integration with Tezos, Ethereum, and other leading
              blockchains
            </li>
            <li>
              <strong>Advanced Neural Networks:</strong> Proprietary AI models trained on historical and real-time DeFi
              data
            </li>
            <li>
              <strong>Non-Custodial Design:</strong> You always maintain control of your assets through secure wallet
              connections
            </li>
            <li>
              <strong>Gas Optimization:</strong> Intelligent transaction batching and timing to minimize gas costs
            </li>
            <li>
              <strong>Security First:</strong> Multiple security audits and continuous monitoring for potential
              vulnerabilities
            </li>
          </ul>

          <div className="bg-white/5 rounded-lg p-8 border border-white/10 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6">
              Join the growing community of DeFi users maximizing their returns with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#00d1b2] hover:bg-[#00a191] text-white" asChild>
                <Link href="/dashboard">Explore Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/demo">View Investor Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
