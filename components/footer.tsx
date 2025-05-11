"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
  const handleContactClick = () => {
    // Construct mailto URL with CC
    const mailtoUrl = `mailto:jurie@phoenixvc.tech?cc=smit.jurie@gmail.com&subject=${encodeURIComponent("Inquiry from LiquidAI")}`
    window.location.href = mailtoUrl
  }

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">LiquidAI</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI-Enhanced Liquidity Management for Tezos blockchain. Optimize your liquidity with advanced AI
              strategies.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pools"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Liquidity Pools
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Strategies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">phoenixvc.tech</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">jurie@phoenixvc.tech</p>
              <button
                onClick={handleContactClick}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              href="/privacy"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/whitepaper"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Whitepaper
            </Link>
            <a
              href="https://github.com/neuralliquid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>
          <p className="text-sm text-center text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} LiquidAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
