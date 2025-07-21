'use client'

/**
 * Cross-Chain Comparison Table Component
 * Displays performance metrics across different blockchains
 */
export function CrossChainComparisonTable() {
  // Mock data for cross-chain comparison
  const crossChainComparison = [
    { name: "Ethereum", transactions: 12500000, fees: 4.5, tvl: 48.2 },
    { name: "Solana", transactions: 65000000, fees: 0.001, tvl: 12.7 },
    { name: "Avalanche", transactions: 8500000, fees: 0.25, tvl: 8.3 },
    { name: "Polygon", transactions: 35000000, fees: 0.01, tvl: 6.1 },
    { name: "Tezos", transactions: 3200000, fees: 0.05, tvl: 2.8 }
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Blockchain</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
              Daily Transactions
            </th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
              Avg. Fee (USD)
            </th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
              TVL (Billion USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {crossChainComparison.map((chain, index) => (
            <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4">{chain.name}</td>
              <td className="text-right py-3 px-4">{chain.transactions.toLocaleString()}</td>
              <td className="text-right py-3 px-4">${chain.fees}</td>
              <td className="text-right py-3 px-4">${chain.tvl.toFixed(1)}B</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}