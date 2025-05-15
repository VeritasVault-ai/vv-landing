"use client"

import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

/**
 * Footer component for the corporate version of the site
 * Includes navigation links, social media links, and legal information
 * Uses the robust theme provider to ensure theme context is always available
 */
export function CorporateFooter() {
  const { isDark } = useRobustTheme()
  
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/corporate-version" className="flex items-center gap-2 mb-4">
              <Image 
                src={isDark ? "/logo-white.svg" : "/logo.png"} 
                alt="VeritasVault Logo" 
                width={32} 
                height={32} 
              />
              <span className="font-semibold text-lg text-slate-900 dark:text-white">VeritasVault<span className="text-blue-600">.net</span></span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Enterprise-grade digital asset management and treasury solutions for institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/corporate-version/solutions/treasury" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Treasury Management
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/solutions/portfolio" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Portfolio Optimization
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/solutions/risk" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Risk Management
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/solutions/compliance" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/corporate-version/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/careers" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/corporate-version/terms" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/privacy" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/security" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/corporate-version/compliance" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} VeritasVault. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/corporate-version/terms" className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
              Terms
            </Link>
            <Link href="/corporate-version/privacy" className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
              Privacy
            </Link>
            <Link href="/corporate-version/cookies" className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}