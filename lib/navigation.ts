import { ExperienceType, IconPosition, IconSize, NavigationItemType, PositionType } from "@/src/types"


// Base navigation item interface
export interface BaseNavigationItem {
  title: string
  href?: string
  experience: ExperienceType
  position: PositionType
  icon?: string
  isExternal?: boolean
  authRequired?: boolean
  featured?: boolean
  badge?: string
  description?: string
  iconPosition?: IconSize
  iconSize?: IconPosition
}

export interface NavigationSubItem {
  title: string
  href: string
  description?: string
  icon?: string
  badge?: string
  authRequired?: boolean
  experience?: ExperienceType
}

export interface NavigationItem extends BaseNavigationItem {
  type: NavigationItemType
  items?: NavigationSubItem[]
  category?: string
}

// Header navigation specific interfaces
export interface HeaderNavigationItem extends BaseNavigationItem {
  type: NavigationItemType
  items?: NavigationSubItem[]
  position: 'header' | 'both'
}

export interface HeaderNavigationSection {
  [key: string]: HeaderNavigationItem[]
}

// Footer navigation specific interfaces
export interface FooterNavigationItem extends BaseNavigationItem {
  position: 'footer' | 'both'
}

export interface FooterNavigationSection {
  [key: string]: FooterNavigationItem[]
}

// Header navigation items
export const headerNavigation: NavigationItem[] = [
  {
    title: "Features",
    type: "link",
    href: "/features",
    experience: "both",
    position: "header",
    featured: true, 
  },
  {
    title: "Pricing",
    type: "link",
    href: "/pricing",
    experience: "both",
    position: "header",
    featured: true, 
  },
  {
    title: "Documentation",
    type: "link",
    href: "/documentation",
    experience: "both",
    position: "header",
  },
  {
    title: "Solutions",
    type: "dropdown",
    experience: "corporate",
    position: "header",
    items: [
      {
        title: "Enterprise",
        href: "/solutions/enterprise",
        description: "Solutions for large organizations",
        experience: "corporate",
      },
      {
        title: "Institutional",
        href: "/solutions/institutional",
        description: "Solutions for financial institutions",
        experience: "corporate",
      },
      {
        title: "Compliance",
        href: "/solutions/compliance",
        description: "Regulatory compliance solutions",
        experience: "corporate",
      },
    ],
  },
  {
    title: "Dashboard",
    type: "link",
    href: "/dashboard",
    authRequired: true,
    experience: "both",
    position: "header",
  },
]

// Footer navigation items
export const footerNavigation = {
  platform: [
    {
      title: "Features",
      href: "/features",
      experience: "both",
      position: "footer",
    },
    {
      title: "Pricing",
      href: "/pricing",
      experience: "both",
      position: "footer",
    },
    {
      title: "Documentation",
      href: "/documentation",
      experience: "both",
      position: "footer",
    },
    {
      title: "API Reference",
      href: "/api-reference",
      experience: "both",
      position: "footer",
    },
  ],
  resources: [
    {
      title: "Blog",
      href: "/blog",
      experience: "both",
      position: "footer",
    },
    {
      title: "Guides",
      href: "/guides",
      experience: "both",
      position: "footer",
    },
    {
      title: "Support",
      href: "/support",
      experience: "both",
      position: "footer",
    },
    {
      title: "Community",
      href: "/community",
      experience: "standard",
      position: "footer",
    },
    {
      title: "Case Studies",
      href: "/case-studies",
      experience: "corporate",
      position: "footer",
    },
  ],
  company: [
    {
      title: "About",
      href: "/about",
      experience: "both",
      position: "footer",
    },
    {
      title: "Careers",
      href: "/careers",
      experience: "both",
      position: "footer",
    },
    {
      title: "Contact",
      href: "/contact",
      experience: "both",
      position: "footer",
    },
    {
      title: "Partners",
      href: "/partners",
      experience: "corporate",
      position: "footer",
    },
  ],
  legal: [
    {
      title: "Privacy Policy",
      href: "/privacy",
      experience: "both",
      position: "footer",
    },
    {
      title: "Terms of Service",
      href: "/terms",
      experience: "both",
      position: "footer",
    },
    {
      title: "Cookie Policy",
      href: "/cookies",
      experience: "both",
      position: "footer",
    },
    {
      title: "Security",
      href: "/security",
      experience: "corporate",
      position: "footer",
    },
  ],
  social: [
    {
      title: "GitHub",
      href: "https://github.com",
      icon: "github",
      isExternal: true,
      experience: "both",
      position: "footer",
    },
    {
      title: "Twitter",
      href: "https://twitter.com",
      icon: "twitter",
      isExternal: true,
      experience: "both",
      position: "footer",
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com",
      icon: "linkedin",
      isExternal: true,
      experience: "both",
      position: "footer",
    },
  ],
}

/**
 * Returns header navigation items filtered by user experience, position, and authentication status.
 *
 * @param experience - The user experience context to filter by ('standard' or 'corporate').
 * @param position - The navigation position to filter by ('header', 'footer', or 'both').
 * @param isAuthenticated - Whether the user is authenticated; used to include items requiring authentication.
 * @returns An array of navigation items matching the specified experience, position, and authentication status.
 */
export function getNavigationByExperience(
  experience: 'standard' | 'corporate',
  position: 'header' | 'footer' | 'both',
  isAuthenticated: boolean = false
) {
  return headerNavigation.filter((item) => {
    // Check if the item should be shown for this experience
    const matchesExperience = item.experience === 'both' || item.experience === experience
    
    // Check if the item should be shown in this position
    const matchesPosition = item.position === 'both' || item.position === position
    
    // Check if the item requires authentication
    const passesAuthCheck = !item.authRequired || (item.authRequired && isAuthenticated)
    
    return matchesExperience && matchesPosition && passesAuthCheck
  })
}

/**
 * Returns footer navigation items filtered by user experience type.
 *
 * Filters the footer navigation sections to include only items matching the specified experience ('standard' or 'corporate') and positioned for the footer.
 *
 * @param experience - The user experience type to filter by.
 * @returns A categorized object containing footer navigation items relevant to the specified experience.
 */
export function getFooterNavigationByExperience(
  experience: 'standard' | 'corporate'
): FooterNavigationSection {
  const result: FooterNavigationSection = {}
  
  Object.entries(footerNavigation).forEach(([category, items]) => {
    result[category] = items.filter((item) => 
      (item.experience === 'both' || item.experience === experience)
      && (item.position === 'footer' || item.position === 'both')
    ) as FooterNavigationItem[]
  })
  
  return result
}

/**
 * Returns header navigation items filtered by user experience and authentication status.
 *
 * @param experience - The user experience context to filter navigation items ('standard' or 'corporate').
 * @param isAuthenticated - Whether the user is authenticated. Defaults to false.
 * @returns An array of header navigation items matching the specified experience and authentication state.
 */
export function getHeaderNavigationByExperience(
  experience: 'standard' | 'corporate',
  isAuthenticated: boolean = false
): HeaderNavigationItem[] {
  return getNavigationByExperience(experience, 'header', isAuthenticated) as HeaderNavigationItem[]
}