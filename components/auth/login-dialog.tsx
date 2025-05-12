"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { VersionAwareLoginForm } from "./version-aware-login-form"

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
  version: "standard" | "corporate"
  redirectTo?: string
}

export function LoginDialog({ isOpen, onClose, version, redirectTo }: LoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <VersionAwareLoginForm version={version} redirectTo={redirectTo} />
      </DialogContent>
    </Dialog>
  )
}