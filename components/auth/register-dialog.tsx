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

export function RegisterDialog({ isOpen, onClose, version, redirectTo }: RegisterDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <VersionAwareRegisterForm version={version} redirectTo={redirectTo} />
      </DialogContent>
    </Dialog>
  )
}