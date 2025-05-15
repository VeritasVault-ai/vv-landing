"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTokenTransfers } from "@/hooks/use-subgraph-data"
import { formatCurrency, formatAddress } from "@/lib/formatters"
import styles from "./token-transfers-list.module.css"

export interface TokenTransfersListProps {
  chain: string
  tokenAddress: string
  limit?: number
}

export const TokenTransfersList = ({ chain, tokenAddress, limit = 10 }: TokenTransfersListProps) => {
  const { data, isLoading, error } = useTokenTransfers(chain, tokenAddress, limit)

  if (error) {
    return (
      <Card className={styles.errorCard}>
        <CardHeader>
          <CardTitle>Token Transfers</CardTitle>
          <CardDescription>Error loading transfers for {formatAddress(tokenAddress)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.errorMessage}>{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLoading ? <Skeleton className="h-6 w-32" /> : `${data?.symbol || ""} Transfers`}</CardTitle>
        <CardDescription>
          {isLoading ? (
            <Skeleton className="h-4 w-48" />
          ) : (
            `Recent transfers for ${data?.name || ""} (${formatAddress(tokenAddress)})`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.transfersList}>
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <div key={index} className={styles.transferItemSkeleton}>
                  <div className={styles.transferHeader}>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className={styles.transferAddresses}>
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className={styles.transferAmount}>
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))
            : data?.transfers.map((transfer, index) => {
                const date = new Date(transfer.timestamp)
                const formattedDate = date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                const formattedTime = date.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                return (
                  <div key={index} className={styles.transferItem}>
                    <div className={styles.transferHeader}>
                      <span className={styles.transferDate}>{formattedDate}</span>
                      <span className={styles.transferTime}>{formattedTime}</span>
                    </div>
                    <div className={styles.transferAddresses}>
                      <span className={styles.transferFrom}>
                        From: <span className={styles.address}>{formatAddress(transfer.from)}</span>
                      </span>
                      <span className={styles.transferTo}>
                        To: <span className={styles.address}>{formatAddress(transfer.to)}</span>
                      </span>
                    </div>
                    <div className={styles.transferAmount}>
                      <span className={styles.amount}>{formatCurrency(transfer.amountUSD)}</span>
                      <Button variant="ghost" size="icon" asChild className={styles.txButton}>
                        <a
                          href={`/tx/${chain}/${transfer.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View transaction details"
                        >
                          <ExternalLink className={styles.txIcon} />
                        </a>
                      </Button>
                    </div>
                  </div>
                )
              })}
        </div>
      </CardContent>
    </Card>
  )
}