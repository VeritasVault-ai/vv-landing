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

interface DemoModeEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DemoModeEntryModal({ isOpen, onClose, onConfirm }: DemoModeEntryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Experience NeuralLiquid in Demo Mode</DialogTitle>
          <DialogDescription>
            Explore how NeuralLiquid predicts, rebalances, and optimizes without connecting real assets.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">In Demo Mode, you'll have access to:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Simulated portfolio with $100,000 in virtual assets</li>
            <li>AI-powered analytics and recommendations</li>
            <li>Portfolio rebalancing and optimization tools</li>
            <li>Flash loan and cross-chain bridge simulations</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
          >
            Enter Demo Mode
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
