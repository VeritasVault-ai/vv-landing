/**
 * Product information constants
 * 
 * This file contains centralized product names, descriptions, and other metadata
 * that can be reused throughout the application. Centralizing these values
 * improves maintainability by ensuring consistent branding and making it
 * easier to update product information across the application.
 */

// Company information
export const COMPANY_NAME = "VeritasVault"
export const COMPANY_TEAM_NAME = "VeritasVault Team"
export const COMPANY_DOMAIN = "veritasvault.net"
export const COMPANY_URL = `https://${COMPANY_DOMAIN}`  
export const COMPANY_EMAIL = "info@veritasvault.net"
export const COMPANY_GITHUB = "https://github.com/veritasvault-ai"
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/veritasvault"
export const COMPANY_TWITTER = "https://twitter.com/veritasvault"
export const COMPANY_ADDRESS = "769 Andringa Street, Stellenbosch, South Africa"

// Base product information
export const BASE_APP_NAME = "VeritasVault"
export const BASE_CREATOR = "VeritasVault"
export const BASE_PUBLISHER = "VeritasVault"

// Standard version information
export const STANDARD_PRODUCT_NAME = "Neural Liquidity"
export const STANDARD_PRODUCT_TITLE = `${STANDARD_PRODUCT_NAME} | Standard`
export const STANDARD_PRODUCT_DESCRIPTION = "Optimize your Tezos liquidity management with AI-powered tools."
export const STANDARD_PRODUCT_KEYWORDS = ["tezos", "liquidity management", "defi", "standard", "ai", "optimization"]
export const STANDARD_PRODUCT_TAGLINE = "Optimize your liquidity"

// Corporate version information
export const CORPORATE_PRODUCT_NAME = "Veritas Vault"
export const CORPORATE_PRODUCT_TITLE = `${CORPORATE_PRODUCT_NAME} - Institutional-Grade Liquidity Management`
export const CORPORATE_PRODUCT_TITLE_TEMPLATE = `%s | ${CORPORATE_PRODUCT_NAME} by ${COMPANY_NAME}`
export const CORPORATE_PRODUCT_DESCRIPTION = "Enterprise-grade liquidity management solutions for institutional clients and treasury operations."
export const CORPORATE_PRODUCT_KEYWORDS = [
  "institutional liquidity",
  "treasury management",
  "enterprise defi",
  "institutional cryptocurrency",
  "corporate treasury",
  "risk management",
  "institutional trading",
  "black-litterman model",
]
export const CORPORATE_TWITTER_HANDLE = "@veritasvault"
export const CORPORATE_PRODUCT_TAGLINE = "Enterprise-grade liquidity management solutions"

// Social media image paths
export const CORPORATE_OG_IMAGE = "/og-image-corporate.png"

// Combined product title (used in root layout)
export const ROOT_PRODUCT_TITLE = `${CORPORATE_PRODUCT_NAME} - AI-Powered Tezos Liquidity Management`
export const ROOT_PRODUCT_DESCRIPTION = "Manage Tezos liquidity with our AI-powered platform offering standard and corporate experiences"