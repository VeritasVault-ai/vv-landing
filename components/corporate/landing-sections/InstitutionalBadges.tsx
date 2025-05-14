"use client"

import { Building2, Shield } from "lucide-react"

export function InstitutionalBadges() {
  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">European Investment Bank</span>
          </div>
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">French Treasury</span>
          </div>
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Swiss National Bank</span>
          </div>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-slate-400 dark:text-slate-500 mr-2" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}