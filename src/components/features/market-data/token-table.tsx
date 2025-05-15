import { ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import type { TokenData } from "@/types/market-data"
import styles from "./token-table.module.css"

export interface TokenTableProps {
  tokens: TokenData[]
}

export const TokenTable = ({ tokens }: TokenTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.rankColumn}>#</TableHead>
            <TableHead>Token</TableHead>
            <TableHead className={styles.priceColumn}>Price</TableHead>
            <TableHead className={styles.changeColumn}>24h Change</TableHead>
            <TableHead className={styles.marketCapColumn}>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell className={styles.rankColumn}>{token.rank}</TableCell>
              <TableCell>
                <div className={styles.tokenCell}>
                  <div className={styles.tokenIcon}>
                    {token.image ? (
                      <Image src={token.image || "/placeholder.svg"} alt={token.name} width={24} height={24} />
                    ) : (
                      <div className={styles.placeholderIcon} />
                    )}
                  </div>
                  <div className={styles.tokenInfo}>
                    <span className={styles.tokenName}>{token.name}</span>
                    <span className={styles.tokenSymbol}>{token.symbol.toUpperCase()}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className={styles.priceColumn}>{formatCurrency(token.currentPrice)}</TableCell>
              <TableCell className={styles.changeColumn}>
                <div className={token.priceChangePercentage24h >= 0 ? styles.positive : styles.negative}>
                  {token.priceChangePercentage24h >= 0 ? (
                    <ArrowUp className={styles.changeIcon} />
                  ) : (
                    <ArrowDown className={styles.changeIcon} />
                  )}
                  {formatPercentage(Math.abs(token.priceChangePercentage24h))}
                </div>
              </TableCell>
              <TableCell className={styles.marketCapColumn}>{formatCurrency(token.marketCap)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}