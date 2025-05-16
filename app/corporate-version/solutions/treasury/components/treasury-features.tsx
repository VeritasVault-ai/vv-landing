import { Wallet, LineChart, Clock, ArrowDownUp, Shield, BarChart4 } from "lucide-react"

export function TreasuryFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Treasury Management Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <Wallet className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Asset Management</h3>
            <p className="text-gray-600">
              Manage fiat and digital assets in one unified platform, with real-time visibility across all holdings.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <LineChart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Yield Optimization</h3>
            <p className="text-gray-600">
              Access institutional-grade yield opportunities with automated allocation strategies based on your risk profile.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Liquidity Management</h3>
            <p className="text-gray-600">
              Ensure optimal liquidity with customizable thresholds, forecasting tools, and automated rebalancing.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <ArrowDownUp className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">FX & Settlement</h3>
            <p className="text-gray-600">
              Streamlined foreign exchange and settlement processes with competitive rates and minimal slippage.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <Shield className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Risk Controls</h3>
            <p className="text-gray-600">
              Comprehensive risk management with customizable limits, approval workflows, and real-time monitoring.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="text-blue-700 mb-4">
              <BarChart4 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Reporting & Analytics</h3>
            <p className="text-gray-600">
              Detailed reporting and analytics for treasury operations, with customizable dashboards and export options.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}