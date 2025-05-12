import Link from "next/link"
import { useCurrentVersion } from "@/hooks/use-current-version"

export function CorporateFooter() {
  const { version } = useCurrentVersion()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href={`/${version}`} className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enterprise-grade liquidity management platform for institutional investors.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${version}/features`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={`/${version}/solutions`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href={`/${version}/pricing`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={`/${version}/demo`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {currentYear} VeritasVault.ai. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
