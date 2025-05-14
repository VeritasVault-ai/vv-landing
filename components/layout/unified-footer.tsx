import Link from "next/link"
import { Mail, MapPin, Github, Twitter, Linkedin, Send } from 'lucide-react'
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  STANDARD_PRODUCT_NAME, 
  STANDARD_PRODUCT_DESCRIPTION,
  COMPANY_EMAIL,
  COMPANY_TWITTER,
  COMPANY_GITHUB,
  COMPANY_LINKEDIN,
  COMPANY_ADDRESS
} from "@/lib/config/product-info"
import React from "react"

export function UnifiedFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container py-8 md:py-12">
        {/* Top section with logo, description, and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Logo className="h-6 w-auto" />
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] bg-clip-text text-transparent">
                {STANDARD_PRODUCT_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md text-sm">
              {STANDARD_PRODUCT_DESCRIPTION}
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="max-w-xs" required />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Main footer links section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{STANDARD_PRODUCT_NAME}</h3>
            <p className="text-sm text-muted-foreground">
              {STANDARD_PRODUCT_DESCRIPTION}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-foreground">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/brand" className="text-muted-foreground hover:text-foreground">
                  Brand Guidelines
                </Link>
              </li>
              <li>
                <Link href="/hero-showcase" className="text-muted-foreground hover:text-foreground">
                  Hero Components
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-muted-foreground hover:text-foreground">
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="text-muted-foreground">
                  {COMPANY_ADDRESS.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {STANDARD_PRODUCT_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
