import type { Metadata, Viewport } from "next"

// Base viewport configuration that applies to all pages
export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
}

// Base metadata that applies to both versions
export const baseMetadata: Metadata = {
  applicationName: "NeuralLiquid",
  authors: [{ name: "NeuralLiquid Team" }],
  creator: "NeuralLiquid",
  publisher: "NeuralLiquid",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://neuralliquid.ai"),
  // Removed viewport from here
  robots: {
    index: true,
    follow: true,
  },
}

// Standard version-specific metadata
export const standardMetadata = {
  title: "Tezos LM | Standard",
  description: "Optimize your Tezos liquidity management with AI-powered tools.",
  keywords: ["tezos", "liquidity management", "defi", "standard", "ai", "optimization"],
  // Add other metadata as needed
}

// Corporate version-specific metadata
export const corporateMetadata: Metadata = {
  ...baseMetadata,
  title: {
    template: "%s | VeritasVault.ai by NeuralLiquid",
    default: "VeritasVault.ai - Institutional-Grade Liquidity Management",
  },
  description: "Enterprise-grade liquidity management solutions for institutional clients and treasury operations.",
  keywords: [
    "institutional liquidity",
    "treasury management",
    "enterprise defi",
    "institutional cryptocurrency",
    "corporate treasury",
    "risk management",
    "institutional trading",
    "black-litterman model",
  ],
  openGraph: {
    type: "website",
    siteName: "VeritasVault.ai by NeuralLiquid",
    title: "VeritasVault.ai - Institutional-Grade Liquidity Management",
    description: "Enterprise-grade liquidity management solutions for institutional clients and treasury operations.",
    images: [
      {
        url: "/og-image-corporate.png",
        width: 1200,
        height: 630,
        alt: "VeritasVault.ai - Institutional-Grade Liquidity Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VeritasVault.ai - Institutional-Grade Liquidity Management",
    description: "Enterprise-grade liquidity management solutions for institutional clients and treasury operations.",
    images: ["/og-image-corporate.png"],
    creator: "@veritasvault",
  },
  alternates: {
    canonical: "/corporate",
    types: {
      "application/rss+xml": "/corporate/rss.xml",
    },
  },
}

// Helper function to generate page-specific metadata for standard version
export function generateStandardMetadata(
  pageTitle: string,
  pageDescription?: string,
  pageImage?: string,
  pagePath?: string,
): Metadata {
  const path = pagePath ? `/standard/${pagePath}` : "/standard"

  return {
    ...standardMetadata,
    title: pageTitle,
    description: pageDescription || standardMetadata.description,
    alternates: {
      canonical: path,
      languages: {
        "x-default": path,
        "en-US": path,
      },
    },
    openGraph: {
      ...standardMetadata.openGraph,
      title: pageTitle,
      description: pageDescription || standardMetadata.openGraph?.description,
      url: path,
      images: pageImage
        ? [
            {
              url: pageImage,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ]
        : standardMetadata.openGraph?.images,
    },
    twitter: {
      ...standardMetadata.twitter,
      title: pageTitle,
      description: pageDescription || standardMetadata.twitter?.description,
      images: pageImage ? [pageImage] : standardMetadata.twitter?.images,
    },
  }
}

/**
 * Generates page-specific metadata for the corporate version of the application.
 *
 * Merges corporate-level metadata with overrides for title, description, canonical path, Open Graph, and Twitter metadata based on the provided page details.
 *
 * @param pageTitle - The title of the page.
 * @param pageDescription - Optional description for the page. Defaults to the corporate description if not provided.
 * @param pageImage - Optional image URL for social previews. Defaults to the corporate image if not provided.
 * @param pagePath - Optional path segment for the page, appended to the `/corporate` base path.
 * @returns Metadata object customized for the specified corporate page.
 */
export function generateCorporateMetadata(
  pageTitle: string,
  pageDescription?: string,
  pageImage?: string,
  pagePath?: string,
): Metadata {
  const path = pagePath ? `/corporate/${pagePath}` : "/corporate"

  return {
    ...corporateMetadata,
    title: pageTitle,
    description: pageDescription || corporateMetadata.description,
    alternates: {
      canonical: path,
      languages: {
        "x-default": path,
        "en-US": path,
      },
    },
    openGraph: {
      ...corporateMetadata.openGraph,
      title: pageTitle,
      description: pageDescription || corporateMetadata.openGraph?.description,
      url: path,
      images: pageImage
        ? [
            {
              url: pageImage,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ]
        : corporateMetadata.openGraph?.images,
    },
    twitter: {
      ...corporateMetadata.twitter,
      title: pageTitle,
      description: pageDescription || corporateMetadata.twitter?.description,
      images: pageImage ? [pageImage] : corporateMetadata.twitter?.images,
    },
  }
}