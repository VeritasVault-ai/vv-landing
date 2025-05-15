"use client"

/**
 * Hero section for the Pricing page
 */
export function PricingHero() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 border-b border-slate-200 dark:border-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white mb-6">
            Transparent <span className="text-blue-700 dark:text-blue-400">Pricing</span> for Institutions
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Flexible plans designed to scale with your organization's needs and growth
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              All plans include a 14-day free trial
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}