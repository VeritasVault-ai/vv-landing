"use client"

import * as React from "react"
import { Paintbrush } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSelector() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("default")}>
          Standard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("neuralliquid")}>
          NeuralLiquid
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("corporate")}>
          Corporate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("veritasvault")}>
          VeritasVault
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cosmic")}>
          Cosmic
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}