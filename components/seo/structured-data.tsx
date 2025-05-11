import Script from "next/script"

interface StructuredDataProps {
  version: "standard" | "corporate"
  pageType?: "website" | "article" | "product" | "service"
  name?: string
  description?: string
  image?: string
  url?: string
}

export function StructuredData({ version, pageType = "website", name, description, image, url }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neuralliquid.ai"

  const standardData = {
    "@context": "https://schema.org",
    "@type": pageType === "website" ? "WebSite" : pageType === "article" ? "Article" : "Product",
    name: name || "NeuralLiquid - AI-Powered Liquidity Management",
    description: description || "Optimize your liquidity with AI-powered tools and strategies for DeFi users.",
    url: url || `${baseUrl}/standard`,
    logo: `${baseUrl}/logo.png`,
    image: image || `${baseUrl}/og-image-standard.png`,
    ...(pageType === "service" && {
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  }

  const corporateData = {
    "@context": "https://schema.org",
    "@type": pageType === "website" ? "WebSite" : pageType === "article" ? "Article" : "Product",
    name: name || "VeritasVault.ai - Institutional-Grade Liquidity Management",
    description:
      description ||
      "Enterprise-grade liquidity management solutions for institutional clients and treasury operations.",
    url: url || `${baseUrl}/corporate`,
    logo: `${baseUrl}/logo-corporate.png`,
    image: image || `${baseUrl}/og-image-corporate.png`,
    ...(pageType === "service" && {
      offers: {
        "@type": "Offer",
        price: "Contact for pricing",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  }

  const structuredData = version === "standard" ? standardData : corporateData

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
