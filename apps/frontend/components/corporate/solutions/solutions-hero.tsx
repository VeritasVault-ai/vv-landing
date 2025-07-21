"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

/**
 * Hero section for the Solutions page
 */
export function SolutionsHero() {
  const router = useRouter()
  
  return (
    <section className="relative py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 border-b border-slate-200 dark:border-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              Enterprise Treasury <span className="text-blue-700 dark:text-blue-400">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-xl">
              Comprehensive liquidity management solutions designed for institutional investors and treasury operations.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">
              Our suite of enterprise-grade tools provides unparalleled visibility, control, and optimization for your digital asset treasury operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                onClick={() => router.push('/corporate-version/demo')}
              >
                Request Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => router.push('/corporate-version/solutions/portfolio')}
              >
                Explore Solutions
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg blur-xl"></div>
              <Image
                src="/liquidity-management-dashboard.png"
                alt="Enterprise treasury dashboard"
                width={600}
                height={400}
                className="relative rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}