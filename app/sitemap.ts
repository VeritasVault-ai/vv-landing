import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neuralliquid.ai"

  // Common pages that exist in both versions
  const commonPages = [
    "",
    "dashboard",
    "analytics",
    "strategies",
    "pools",
    "flash-loans",
    "contact",
    "how-it-works",
    "marketing",
  ]

  // Standard-specific pages
  const standardPages = [...commonPages, "pricing", "features", "community"]

  // Corporate-specific pages
  const corporatePages = [
    ...commonPages,
    "institutional-treasury",
    "black-litterman-model",
    "case-studies",
    "white-papers",
    "compliance",
  ]

  // Generate standard version URLs
  const standardUrls = standardPages.map((page) => ({
    url: `${baseUrl}/standard-version${page ? `/${page}` : ""}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : ("weekly" as "daily" | "weekly"),
    priority: page === "" ? 1.0 : 0.8,
  }))

  // Generate corporate version URLs
  const corporateUrls = corporatePages.map((page) => ({
    url: `${baseUrl}/corporate-version${page ? `/${page}` : ""}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : ("weekly" as "daily" | "weekly"),
    priority: page === "" ? 1.0 : 0.8,
  }))

  return [...standardUrls, ...corporateUrls]
}
