import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neuralliquid.net"

  // Public Standard pages
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

  // Generate standard version URLs
  const standardUrls = standardPages.map((page) => ({
    url: `${baseUrl}/standard-version${page ? `/${page}` : ""}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : ("weekly" as "daily" | "weekly"),
    priority: page === "" ? 1.0 : 0.8,
  }))

  return standardUrls
}
