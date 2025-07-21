"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DemoModeExitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DemoModeExitModal({ isOpen, onClose, onConfirm }: DemoModeExitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ready to Manage Real Assets?</DialogTitle>
          <DialogDescription>
            Exit Demo Mode and connect your wallet to start optimizing real liquidity.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">When you exit Demo Mode, you'll be able to:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Connect your wallet and manage real assets</li>
            <li>Access personalized AI insights for your portfolio</li>
            <li>Execute real transactions and earn actual returns</li>
            <li>Track your performance with detailed analytics</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Stay in Demo Mode
          </Button>
          <Button onClick={onConfirm}>Exit and Connect Wallet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
