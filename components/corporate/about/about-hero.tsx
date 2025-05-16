"use client"

import Image from "next/image"

/**
 * Hero section for the About page
 */
export function AboutHero() {
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
              About <span className="text-blue-700 dark:text-blue-400">VeritasVault</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-xl">
              Revolutionizing institutional liquidity management with cutting-edge technology and unparalleled security.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">
              Founded in May 2025, VeritasVault will become the trusted partner for institutions seeking advanced treasury management solutions in the digital asset space. Our vision is to transform how institutions manage digital asset liquidity with innovative technology.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg blur-xl"></div>
              <Image
                src="/about_us.png"
                alt="VeritasVault team"
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