import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | VeritasVault.ai",
  description: "Enterprise liquidity management dashboard for institutional investors.",
}

export default function CorporateDashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 ml-6">
              <a
                href="/corporate/dashboard"
                className="text-sm font-medium text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1"
              >
                Dashboard
              </a>
              <a
                href="/corporate/portfolio"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/corporate/strategies"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Strategies
              </a>
              <a
                href="/corporate/analytics"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Analytics
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-700 dark:text-blue-300 font-medium">IT</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Corporate Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Portfolio Value</h2>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">$12.4M</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">+2.4% from last week</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Active Strategies</h2>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">7</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">3 optimized this week</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Risk Score</h2>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">Low</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Within institutional parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Performance Overview</h2>
            <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Performance Chart</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Asset Allocation</h2>
            <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Allocation Chart</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; 2023 VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
