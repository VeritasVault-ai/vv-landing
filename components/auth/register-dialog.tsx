"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VersionAwareRegisterForm } from "./version-aware-register-form"

interface RegisterDialogProps {
  isOpen: boolean
  onClose: () => void
  version: "standard" | "corporate"
  redirectTo?: string
}

/**
 * Displays a modal dialog for user registration with a version-specific form.
 *
 * Renders a registration dialog that can be toggled open or closed, displaying a form variant based on the provided {@link version}. Optionally redirects after registration if {@link redirectTo} is specified.
 *
 * @param isOpen - Whether the dialog is open.
 * @param onClose - Callback invoked when the dialog is closed.
 * @param version - Determines which registration form variant to display.
 * @param redirectTo - Optional URL to redirect to after successful registration.
 *
 * @returns The registration dialog component.
 */
export function RegisterDialog({ isOpen, onClose, version, redirectTo }: RegisterDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <VersionAwareRegisterForm version={version} redirectTo={redirectTo} />
      </DialogContent>
    </Dialog>
  )
}