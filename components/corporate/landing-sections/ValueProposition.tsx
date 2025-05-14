"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lock, TrendingUp, Globe } from "lucide-react"

export function ValueProposition() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Institutional-Grade Digital Asset Management
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            VeritasVault.ai combines traditional finance principles with blockchain technology to deliver secure,
            compliant, and optimized treasury management solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Security & Compliance</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Enterprise-grade security with formal verification, multi-signature controls, and comprehensive audit
                trails.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Optimized Returns</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Advanced portfolio theory and Black-Litterman model to maximize risk-adjusted returns across digital
                assets.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Global Compliance</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Built to meet regulatory requirements across jurisdictions with comprehensive reporting and controls.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}