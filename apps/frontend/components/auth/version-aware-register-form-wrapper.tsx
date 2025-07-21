"use client"

import { Suspense } from "react"
import { VersionAwareRegisterForm } from "./version-aware-register-form"

interface VersionAwareRegisterFormWrapperProps {
  version: "standard" | "corporate"
  redirectTo?: string
}

export function VersionAwareRegisterFormWrapper({ version, redirectTo }: VersionAwareRegisterFormWrapperProps) {
  return (
    <Suspense fallback={<div>Loading registration form...</div>}>
      <VersionAwareRegisterForm version={version} redirectTo={redirectTo} />
    </Suspense>
  )
}