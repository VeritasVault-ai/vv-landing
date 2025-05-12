import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/auth/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://neuralliquid.ai"}/sitemap.xml`,
  }
}
