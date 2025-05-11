"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Building } from "lucide-react"
import { cn } from "@/lib/utils"

export function VersionSelectorEnhanced() {
  const router = useRouter()
  const [activeVersion, setActiveVersion] = useState<"standard" | "corporate">("standard")
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVersionChange = (version: "standard" | "corporate") => {
    setActiveVersion(version)
    // In a real app, you might want to store this preference and redirect
    // router.push(`/${version}`)
  }

  if (!mounted) return null

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md py-2 px-4 rounded-full border border-slate-200 dark:border-slate-700/30 shadow-lg">
      <div className="flex items-center">
        <div className="bg-slate-100 dark:bg-slate-900/80 rounded-full p-1 flex shadow-inner">
          <button
            onClick={() => handleVersionChange("standard")}
            className={cn(
              "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeVersion === "standard"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
            )}
          >
            <User size={18} className="mr-2" />
            Standard
          </button>
          <button
            onClick={() => handleVersionChange("corporate")}
            className={cn(
              "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeVersion === "corporate"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
            )}
          >
            <Building size={18} className="mr-2" />
            Corporate
          </button>
        </div>
      </div>
    </div>
  )
}
