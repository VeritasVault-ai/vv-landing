import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import type { ProtocolData } from "@/types/market-data"
import styles from "./protocol-table.module.css"

export interface ProtocolTableProps {
  protocols: ProtocolData[]
}

export const ProtocolTable = ({ protocols }: ProtocolTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.rankColumn}>#</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead className={styles.tvlColumn}>TVL</TableHead>
            <TableHead className={styles.changeColumn}>24h Change</TableHead>
            <TableHead className={styles.actionColumn}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {protocols.map((protocol, index) => (
            <TableRow key={protocol.id}>
              <TableCell className={styles.rankColumn}>{index + 1}</TableCell>
              <TableCell>
                <div className={styles.protocolCell}>
                  <div className={styles.protocolIcon}>
                    {protocol.logo ? (
                      <Image src={protocol.logo || "/placeholder.svg"} alt={protocol.name} width={24} height={24} />
                    ) : (
                      <div className={styles.placeholderIcon} />
                    )}
                  </div>
                  <span className={styles.protocolName}>{protocol.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className={styles.chainBadges}>
                  {protocol.chains.slice(0, 3).map((chain) => (
                    <span key={chain} className={styles.chainBadge}>
                      {chain}
                    </span>
                  ))}
                  {protocol.chains.length > 3 && (
                    <span className={styles.moreBadge}>+{protocol.chains.length - 3}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className={styles.tvlColumn}>{formatCurrency(protocol.tvl)}</TableCell>
              <TableCell className={styles.changeColumn}>
                <div className={protocol.change24h >= 0 ? styles.positive : styles.negative}>
                  {protocol.change24h >= 0 ? (
                    <ArrowUp className={styles.changeIcon} />
                  ) : (
                    <ArrowDown className={styles.changeIcon} />
                  )}
                  {formatPercentage(Math.abs(protocol.change24h))}
                </div>
              </TableCell>
              <TableCell className={styles.actionColumn}>
                {protocol.url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={protocol.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className={styles.linkIcon} />
                      <span className="sr-only">Visit {protocol.name}</span>
                    </a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}