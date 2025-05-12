import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { SITE_VERSION_COOKIE, DEFAULT_VERSION } from "@/lib/version-utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Tezos Liquidity Management",
  description: "Sign in to your account",
}

export default function LoginPage() {
  // This is a server component that will redirect to the appropriate version's login page
  const cookieStore = cookies()
  const version = cookieStore.get(SITE_VERSION_COOKIE)?.value || DEFAULT_VERSION

  // Redirect to the appropriate version's login page
  if (version === "corporate") {
    redirect("/corporate/login")
  } else {
    redirect("/standard/login")
  }

  // This return is never reached but needed for TypeScript
  return null
}
