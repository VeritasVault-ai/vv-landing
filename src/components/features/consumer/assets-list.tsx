"use client"
import Image from "next/image"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/src/lib/formatters"
import styles from "./assets-list.module.css"

interface Asset {
  name: string
  symbol: string
  amount: number
  value: number
  price: number
  priceChange24h: number
  allocation: number
  logo?: string
}

export interface AssetsListProps {
  assets: Asset[]
}

export const AssetsList = ({ assets }: AssetsListProps) => {
  return (
    <div className={styles.assetsList}>
      {assets.map((asset) => (
        <div key={asset.symbol} className={styles.assetItem}>
          <div className={styles.assetInfo}>
            <div className={styles.assetLogo}>
              {asset.logo ? (
                <Image
                  src={asset.logo || "/placeholder.svg"}
                  alt={asset.name}
                  width={32}
                  height={32}
                  className={styles.logoImage}
                />
              ) : (
                <div className={styles.logoPlaceholder}>{asset.symbol.substring(0, 2)}</div>
              )}
            </div>
            <div className={styles.assetDetails}>
              <div className={styles.assetName}>{asset.name}</div>
              <div className={styles.assetSymbol}>{asset.symbol}</div>
            </div>
          </div>
          <div className={styles.assetHolding}>
            <div className={styles.assetAmount}>
              {asset.amount} {asset.symbol}
            </div>
            <div className={styles.assetAllocation}>{formatPercentage(asset.allocation)} of portfolio</div>
          </div>
          <div className={styles.assetPrice}>
            <div className={styles.currentPrice}>{formatCurrency(asset.price)}</div>
            <div className={`${styles.priceChange} ${asset.priceChange24h >= 0 ? styles.positive : styles.negative}`}>
              {asset.priceChange24h >= 0 ? (
                <ArrowUp className={styles.changeIcon} />
              ) : (
                <ArrowDown className={styles.changeIcon} />
              )}
              {formatPercentage(Math.abs(asset.priceChange24h))}
            </div>
          </div>
          <div className={styles.assetValue}>
            <div className={styles.totalValue}>{formatCurrency(asset.value)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}