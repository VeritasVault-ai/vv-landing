"use client"

import { useTheme as useNextTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { LogoWithText } from "@/components/ui/logo-with-text"
import Link from "next/link"
import { useState, useEffect } from "react"

export function VersionAwareFooter({ version = "standard" }: { version?: "standard" | "corporate" }) {
  const { theme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  // Determine if we're in dark mode
  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark")

  return (
    <footer
      className={cn(
        "w-full py-12 px-4 md:px-8",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800 border-t border-gray-200",
      )}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <LogoWithText className="h-8 w-auto" />
            <p className={cn("mt-4 text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>
              Advanced liquidity management solutions for DeFi protocols and investors.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className={cn("text-sm font-semibold mb-4", isDarkMode ? "text-gray-100" : "text-gray-900")}>
              Product
            </h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Use Cases", "Roadmap"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={cn(
                      "text-sm hover:underline",
                      isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={cn("text-sm font-semibold mb-4", isDarkMode ? "text-gray-100" : "text-gray-900")}>
              Resources
            </h3>
            <ul className="space-y-2">
              {["Documentation", "API", "Guides", "Help Center"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={cn(
                      "text-sm hover:underline",
                      isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={cn("text-sm font-semibold mb-4", isDarkMode ? "text-gray-100" : "text-gray-900")}>
              Company
            </h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={cn(
                      "text-sm hover:underline",
                      isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center",
            isDarkMode ? "border-gray-800" : "border-gray-200",
          )}
        >
          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>
            © {new Date().getFullYear()} Tezos Liquidity Management. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map((item) => (
              <Link
                key={item}
                href="#"
                className={cn(
                  "text-sm hover:underline",
                  isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
