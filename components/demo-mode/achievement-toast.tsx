"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { ToastClose } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

interface AchievementToastProps {
  show: boolean
  onClose: () => void
  title: string
  description: string
}

export function AchievementToast({ show, onClose, title, description }: AchievementToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (show) {
      const { dismiss } = toast({
        title,
        description,
        action: (
          <ToastClose asChild>
            <button className="rounded-full p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </ToastClose>
        ),
      })

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        dismiss()
        onClose()
      }, 5000)

      return () => {
        clearTimeout(timer)
        dismiss()
      }
    }

    return () => {}
  }, [show, title, description, toast, onClose])

  return null
}
