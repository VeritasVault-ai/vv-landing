"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SUPPORTED_CHAINS } from "@/src/lib/constants"
import { Check, ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styles from "./chain-selector.module.css"

export interface ChainSelectorProps {
  defaultChain?: string
}

export const ChainSelector = ({ defaultChain = "ethereum" }: ChainSelectorProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentChain = searchParams.get("chain") || defaultChain
  
  const handleChainChange = (chain: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("chain", chain)
    router.push(`${pathname}?${params.toString()}`)
  }
  
  // Create a safe fallback for when SUPPORTED_CHAINS is empty
  const defaultChainData = { id: defaultChain, name: defaultChain, color: "#cccccc" }
  
  // Find the current chain data with a safe fallback
  const currentChainData = SUPPORTED_CHAINS.find((chain) => chain.id === currentChain) || 
    (SUPPORTED_CHAINS.length > 0 ? SUPPORTED_CHAINS[0] : defaultChainData)
  
  // If there are no supported chains, render a disabled button
  if (SUPPORTED_CHAINS.length === 0) {
    return (
      <Button variant="outline" className={styles.chainButton} disabled>
        <div className={styles.chainIcon} style={{ backgroundColor: defaultChainData.color }} />
        {defaultChainData.name}
      </Button>
    )
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={styles.chainButton}>
          <div className={styles.chainIcon} style={{ backgroundColor: currentChainData.color }} />
          {currentChainData.name}
          <ChevronDown className={styles.dropdownIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_CHAINS.map((chain) => (
          <DropdownMenuItem key={chain.id} onClick={() => handleChainChange(chain.id)} className={styles.chainMenuItem}>
            <div className={styles.chainIcon} style={{ backgroundColor: chain.color }} />
            {chain.name}
            {currentChain === chain.id && <Check className={styles.checkIcon} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}