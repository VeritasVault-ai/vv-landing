"use client"

import { ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLiquidityPools } from "@/hooks/use-subgraph-data"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import styles from "./liquidity-pools-table.module.css"

export interface LiquidityPoolsTableProps {
  chain: string
  count?: number
  orderBy?: string
}

export const LiquidityPoolsTable = ({ chain, count = 10, orderBy = "tvlUSD" }: LiquidityPoolsTableProps) => {
  const { data: pools, isLoading, error } = useLiquidityPools(chain, count, orderBy)

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error loading liquidity pools: {error.message}</p>
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pool</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead className={styles.numericCell}>TVL</TableHead>
            <TableHead className={styles.numericCell}>Volume</TableHead>
            <TableHead className={styles.numericCell}>Fee</TableHead>
            <TableHead className={styles.numericCell}>APR</TableHead>
            <TableHead className={styles.actionCell}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: count }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            : pools?.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell>
                    <div className={styles.poolCell}>
                      <span className={styles.poolName}>{pool.name}</span>
                      <span className={styles.poolPair}>
                        {pool.token0.symbol}/{pool.token1.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{pool.protocol}</TableCell>
                  <TableCell className={styles.numericCell}>{formatCurrency(pool.tvl)}</TableCell>
                  <TableCell className={styles.numericCell}>{formatCurrency(pool.volume)}</TableCell>
                  <TableCell className={styles.numericCell}>{formatPercentage(pool.feeTier)}</TableCell>
                  <TableCell className={styles.numericCell}>
                    <span className={styles.aprValue}>{formatPercentage(pool.apr)}</span>
                  </TableCell>
                  <TableCell className={styles.actionCell}>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={`/pool/${chain}/${pool.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View details for ${pool.name}`}
                      >
                        <ExternalLink className={styles.actionIcon} />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}