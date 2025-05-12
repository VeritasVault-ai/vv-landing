import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">NeuralLiquid</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered liquidity management for DeFi protocols and liquidity providers.
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
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <a href="mailto:info@phoenixvc.tech" className="text-muted-foreground hover:text-foreground">
                    info@phoenixvc.tech
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="text-muted-foreground">
                  Phoenix Venture Capital
                  <br />
                  Innovation Hub
                  <br />
                  Cape Town, South Africa
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NeuralLiquid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
