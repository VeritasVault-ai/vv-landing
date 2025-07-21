import { COMPANY_URL, CORPORATE_PRODUCT_NAME, CORPORATE_PRODUCT_DESCRIPTION, STANDARD_PRODUCT_NAME, STANDARD_PRODUCT_DESCRIPTION } from "@/lib/config/product-info"

interface StructuredDataProps {
  version: "standard" | "corporate"
  pageType?: "website" | "article" | "product"
  name?: string
  description?: string
  image?: string
  url?: string
}

export function StructuredData({ version, pageType = "website", name, description, image, url }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || COMPANY_URL

  const standardData = {
    "@context": "https://schema.org",
    "@type": pageType === "website" ? "WebSite" : pageType === "article" ? "Article" : "Product",
    name: name || `${STANDARD_PRODUCT_NAME} - AI-Powered Liquidity Management`,
    description: description || STANDARD_PRODUCT_DESCRIPTION,
    url: url || `${baseUrl}/standard`,
    image: image ? `${baseUrl}${image}` : `${baseUrl}/og-image-standard.png`,
  }

  const corporateData = {
    "@context": "https://schema.org",
    "@type": pageType === "website" ? "WebSite" : pageType === "article" ? "Article" : "Product",
    name: name || `${CORPORATE_PRODUCT_NAME} - Institutional-Grade Liquidity Management`,
    description: description || CORPORATE_PRODUCT_DESCRIPTION,
    url: url || `${baseUrl}/corporate`,
    image: image ? `${baseUrl}${image}` : `${baseUrl}/og-image-corporate.png`,
  }

  const jsonLd = version === "corporate" ? corporateData : standardData

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}