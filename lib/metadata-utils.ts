import type { Metadata, Viewport } from "next"
import {
  BASE_APP_NAME,
  BASE_CREATOR,
  BASE_PUBLISHER,
  COMPANY_NAME,
  COMPANY_TEAM_NAME,
  COMPANY_URL,
  CORPORATE_OG_IMAGE,
  CORPORATE_PRODUCT_DESCRIPTION,
  CORPORATE_PRODUCT_KEYWORDS,
  CORPORATE_PRODUCT_NAME,
  CORPORATE_PRODUCT_TITLE,
  CORPORATE_PRODUCT_TITLE_TEMPLATE,
  CORPORATE_TWITTER_HANDLE,
  STANDARD_PRODUCT_DESCRIPTION,
  STANDARD_PRODUCT_KEYWORDS,
  STANDARD_PRODUCT_TITLE
} from "./config/product-info"

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
  applicationName: BASE_APP_NAME,
  authors: [{ name: COMPANY_TEAM_NAME }],
  creator: BASE_CREATOR,
  publisher: BASE_PUBLISHER,
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || COMPANY_URL),
  // Removed viewport from here
  robots: {
    index: true,
    follow: true,
  },
}

// Standard version-specific metadata
export const standardMetadata = {
  title: STANDARD_PRODUCT_TITLE,
  description: STANDARD_PRODUCT_DESCRIPTION,
  keywords: STANDARD_PRODUCT_KEYWORDS,
  // Add other metadata as needed
}

// Corporate version-specific metadata
export const corporateMetadata: Metadata = {
  ...baseMetadata,
  title: {
    template: CORPORATE_PRODUCT_TITLE_TEMPLATE,
    default: CORPORATE_PRODUCT_TITLE,
  },
  description: CORPORATE_PRODUCT_DESCRIPTION,
  keywords: CORPORATE_PRODUCT_KEYWORDS,
  openGraph: {
    type: "website",
    siteName: `${CORPORATE_PRODUCT_NAME} by ${COMPANY_NAME}`,
    title: CORPORATE_PRODUCT_TITLE,
    description: CORPORATE_PRODUCT_DESCRIPTION,
    images: [
      {
        url: CORPORATE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: CORPORATE_PRODUCT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CORPORATE_PRODUCT_TITLE,
    description: CORPORATE_PRODUCT_DESCRIPTION,
    images: [CORPORATE_OG_IMAGE],
    creator: CORPORATE_TWITTER_HANDLE,
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