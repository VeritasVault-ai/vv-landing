"use client"
import { LogoWithText } from "@/components/ui/logo-with-text"
import Link from "next/link"

interface SimpleFooterProps {
  version?: "standard" | "corporate"
}

export function SimpleFooter({ version = "standard" }: SimpleFooterProps) {
  return (
    <footer className="w-full py-12 px-4 md:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <LogoWithText className="h-8 w-auto" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Advanced liquidity management solutions for DeFi protocols and investors.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Use Cases", "Roadmap"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "API", "Guides", "Help Center"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm hover:underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Tezos Liquidity Management. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm hover:underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
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
