"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import Image from "next/image"
import styles from "./top-assets-table.module.css"

interface AssetData {
  id: string
  rank: number
  name: string
  symbol: string
  chain: string
  price: number
  priceChange24h: number
  volume: number
  marketCap?: number
  logo?: string
}

interface TopAssetsTableProps {
  data: AssetData[] | undefined
  isLoading: boolean
}

export function TopAssetsTable({ data, isLoading }: TopAssetsTableProps) {
  if (isLoading) {
    return <TopAssetsTableSkeleton />
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No assets data available</div>
  }

  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.rankColumn}>#</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead className={styles.priceColumn}>Price</TableHead>
            <TableHead className={styles.changeColumn}>24h</TableHead>
            <TableHead className={styles.volumeColumn}>Volume</TableHead>
            <TableHead className={styles.marketCapColumn}>Market Cap</TableHead>
            <TableHead className={styles.actionColumn}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className={styles.rankColumn}>{asset.rank}</TableCell>
              <TableCell>
                <div className={styles.assetCell}>
                  {asset.logo ? (
                    <div className={styles.assetIcon}>
                      <Image src={asset.logo} alt={asset.name} width={24} height={24} />
                    </div>
                  ) : (
                    <div className={styles.assetIcon} />
                  )}
                  <div className={styles.assetInfo}>
                    <div className={styles.assetName}>{asset.name}</div>
                    <div className={styles.assetSymbol}>{asset.symbol}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={styles.chainBadge}>{asset.chain}</div>
              </TableCell>
              <TableCell className={styles.priceColumn}>{formatCurrency(asset.price)}</TableCell>
              <TableCell className={styles.changeColumn}>
                <span className={asset.priceChange24h >= 0 ? styles.positive : styles.negative}>
                  {formatPercentage(asset.priceChange24h)}
                </span>
              </TableCell>
              <TableCell className={styles.volumeColumn}>{formatCurrency(asset.volume)}</TableCell>
              <TableCell className={styles.marketCapColumn}>
                {asset.marketCap ? formatCurrency(asset.marketCap) : "-"}
              </TableCell>
              <TableCell className={styles.actionColumn}>
                <button className={styles.viewButton}>
                  <ExternalLink className={styles.viewIcon} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TopAssetsTableSkeleton() {
  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.rankColumn}>#</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead className={styles.priceColumn}>Price</TableHead>
            <TableHead className={styles.changeColumn}>24h</TableHead>
            <TableHead className={styles.volumeColumn}>Volume</TableHead>
            <TableHead className={styles.marketCapColumn}>Market Cap</TableHead>
            <TableHead className={styles.actionColumn}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className={styles.rankColumn}>
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <div className={styles.assetCell}>
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className={styles.assetInfo}>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell className={styles.priceColumn}>
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell className={styles.changeColumn}>
                <Skeleton className="h-4 w-12 ml-auto" />
              </TableCell>
              <TableCell className={styles.volumeColumn}>
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell className={styles.marketCapColumn}>
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell className={styles.actionColumn}>
                <Skeleton className="h-6 w-6 mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}