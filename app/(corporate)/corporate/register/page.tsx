// src/app/corporate/register/page.tsx

import type { Metadata } from 'next'
import { VersionAwareRegisterFormWrapper } from '@/components/auth/version-aware-register-form-wrapper'

export const metadata: Metadata = {
  title: 'Register for Corporate Account | VeritasVault',
  description: 'Create your corporate account to access advanced features and enterprise solutions.',
}

/**
 * Renders the corporate account registration page with a version-aware registration form.
 *
 * Displays a centered registration form tailored for corporate users, redirecting to the corporate dashboard upon successful registration.
 */
export default function CorporateRegisterPage() {
  return (
      <div className="container flex flex-col items-center justify-center py-10 md:py-16">
        <div className="mx-auto w-full max-w-md">
          <VersionAwareRegisterFormWrapper
            version="corporate"
            redirectTo="/corporate/dashboard"
          />
        </div>
      </div>
  )
}
