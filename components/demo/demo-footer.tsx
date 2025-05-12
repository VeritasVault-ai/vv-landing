"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DemoFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} NeuralLiquid. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#">Documentation</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#">GitHub</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#">Contact</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
