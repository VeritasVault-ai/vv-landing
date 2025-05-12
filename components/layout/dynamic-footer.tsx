"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { navigationService } from "@/lib/services/navigation-service"
import { settingsService } from "@/lib/services/settings-service"
import type { NavigationItem } from "@/lib/models/types"

interface FooterGroup {
  name: string
  items: NavigationItem[]
}

export function DynamicFooter() {
  const [footerGroups, setFooterGroups] = useState<FooterGroup[]>([])
  const [contactInfo, setContactInfo] = useState({
    email: "info@phoenixvc.tech",
    address: "Phoenix Venture Capital\nInnovation Hub\nCape Town, South Africa",
    companyName: "NeuralLiquid",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch navigation items
        const navItems = await navigationService.getAll()

        // Group navigation items for footer
        const groups: Record<string, NavigationItem[]> = {}
        navItems.forEach((item) => {
          if (!item.group) return

          if (!groups[item.group]) {
            groups[item.group] = []
          }
          groups[item.group].push(item)
        })

        // Convert to array of FooterGroup
        const footerGroupsArray = Object.entries(groups).map(([name, items]) => ({
          name,
          items: items.slice(0, 4), // Limit to 4 items per group for footer
        }))

        setFooterGroups(footerGroupsArray)

        // Fetch contact settings
        try {
          const email = await settingsService.getByKey("contact_email")
          const address = await settingsService.getByKey("contact_address")
          const companyName = await settingsService.getByKey("company_name")

          setContactInfo({
            email: email?.value || contactInfo.email,
            address: address?.value || contactInfo.address,
            companyName: companyName?.value || contactInfo.companyName,
          })
        } catch (error) {
          console.error("Failed to fetch contact settings:", error)
          // Keep default values
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error)
        // Fallback to hardcoded groups
        setFooterGroups([
          {
            name: "Quick Links",
            items: [
              { id: 1, label: "Home", href: "/", order: 1, group: "Quick Links" },
              { id: 2, label: "Dashboard", href: "/dashboard", order: 2, group: "Quick Links" },
              { id: 3, label: "Analytics", href: "/analytics", order: 3, group: "Quick Links" },
              { id: 4, label: "How It Works", href: "/how-it-works", order: 4, group: "Quick Links" },
            ],
          },
          {
            name: "Resources",
            items: [
              { id: 5, label: "Brand Guidelines", href: "/brand", order: 1, group: "Resources" },
              { id: 6, label: "Hero Components", href: "/hero-showcase", order: 2, group: "Resources" },
              { id: 7, label: "Contact Us", href: "/contact", order: 3, group: "Resources" },
            ],
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 w-24 bg-muted/50 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <div className="h-4 w-64 mx-auto bg-muted/30 animate-pulse rounded"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{contactInfo.companyName}</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered liquidity management for DeFi protocols and liquidity providers.
            </p>
          </div>

          {footerGroups.slice(0, 2).map((group) => (
            <div key={group.name}>
              <h3 className="mb-4 text-lg font-semibold">{group.name}</h3>
              <ul className="space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-foreground">
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="text-muted-foreground">
                  {contactInfo.address.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < contactInfo.address.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {contactInfo.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
