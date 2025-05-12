"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { VersionAwareLoginForm } from "./version-aware-login-form"

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
  version: "standard" | "corporate"
  redirectTo?: string
}

/**
 * Displays a modal dialog for user login, rendering a version-specific login form.
 *
 * The dialog's visibility is controlled by the {@link isOpen} prop, and it triggers {@link onClose} when closed. The login form variant is determined by {@link version}, and an optional {@link redirectTo} URL can be provided for post-login redirection.
 *
 * @param isOpen - Whether the dialog is visible.
 * @param onClose - Callback invoked when the dialog is closed.
 * @param version - Specifies the login form variant to display.
 * @param redirectTo - Optional URL to redirect to after successful login.
 *
 * @returns The rendered login dialog component.
 */
export function LoginDialog({ isOpen, onClose, version, redirectTo }: LoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <VersionAwareLoginForm version={version} redirectTo={redirectTo} />
      </DialogContent>
    </Dialog>
  )
}