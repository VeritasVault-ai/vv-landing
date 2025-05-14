import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Send } from "lucide-react"
import { 
  STANDARD_PRODUCT_NAME, 
  STANDARD_PRODUCT_DESCRIPTION,
  COMPANY_TWITTER,
  COMPANY_GITHUB,
  COMPANY_LINKEDIN
} from "@/lib/config/product-info"

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/20 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
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

        {/* Bottom section with links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-muted">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {currentYear} {STANDARD_PRODUCT_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
