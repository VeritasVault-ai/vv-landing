"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SUPPORTED_CHAINS } from "@/lib/constants"
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
  
  const currentChainData = SUPPORTED_CHAINS.find((chain) => chain.id === currentChain) || SUPPORTED_CHAINS[0]
  
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