"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FooterNavigationItem,
  getFooterNavigationByExperience
} from "@/lib/navigation"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function StandardFooter() {
  const currentYear = new Date().getFullYear()
  const footerNav = getFooterNavigationByExperience('standard')
  
  // Helper function to render the icon based on the icon name
  const renderIcon = (icon: string | undefined) => {
    if (!icon) return null
    
    switch (icon) {
      case 'github':
        return <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      case 'twitter':
        return <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      default:
        return null
    }
  }
  
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container py-8 md:py-12">
        {/* Top section with logo, description, and newsletter */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="space-y-4 max-w-sm">
            <h3 className="font-bold">NeuralLiquid</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered liquidity management platform for Tezos. Optimize your yields with advanced machine learning algorithms.
            </p>
          </div>
          <div className="space-y-4 max-w-sm">
            <h3 className="font-bold">Subscribe to our newsletter</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" className="max-w-xs" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        
        {/* Main footer links section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          {/* Platform links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              {footerNav.platform?.map((item: FooterNavigationItem, index: number) => (
                <li key={index}>
                  <Link href={item.href || '#'} className="text-muted-foreground hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              {footerNav.resources?.map((item: FooterNavigationItem, index: number) => (
                <li key={index}>
                  <Link href={item.href || '#'} className="text-muted-foreground hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerNav.company?.map((item: FooterNavigationItem, index: number) => (
                <li key={index}>
                  <Link href={item.href || '#'} className="text-muted-foreground hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              {footerNav.legal?.map((item: FooterNavigationItem, index: number) => (
                <li key={index}>
                  <Link href={item.href || '#'} className="text-muted-foreground hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © {currentYear} NeuralLiquid. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerNav.social?.map((item: FooterNavigationItem, index: number) => (
              <Link 
                key={index}
                href={item.href || '#'} 
                target={item.isExternal ? "_blank" : undefined} 
                rel={item.isExternal ? "noopener noreferrer" : undefined}
              >
                {renderIcon(item.icon)}
                <span className="sr-only">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}