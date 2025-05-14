import Link from "next/link"
import { Shield, FileText, HelpCircle } from "lucide-react"
import { CORPORATE_PRODUCT_NAME } from "@/lib/config/product-info"

export function CorporateDemoFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Demo Information</h3>
            <p className="text-sm text-slate-600 mb-4">
              This is a demonstration environment of {CORPORATE_PRODUCT_NAME}. No real assets are at risk, and all data is
              simulated.
            </p>
            <div className="flex items-center text-sm text-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              <span>Enterprise-grade security in production</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/corporate/demo/guide" className="text-slate-600 hover:text-blue-600 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span>Demo Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate/resources/white-papers"
                  className="text-slate-600 hover:text-blue-600 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span>White Papers</span>
                </Link>
              </li>
              <li>
                <Link href="/corporate/case-studies" className="text-slate-600 hover:text-blue-600 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Case Studies</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Ready to Get Started?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Schedule a consultation with our institutional team to discuss your specific needs.
            </p>
            <Link
              href="/corporate/contact"
              className="inline-block px-4 py-2 bg-blue-800 text-white rounded-md text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {CORPORATE_PRODUCT_NAME}. All rights reserved. Demo Version.</p>
        </div>
      </div>
    </footer>
  )
}
