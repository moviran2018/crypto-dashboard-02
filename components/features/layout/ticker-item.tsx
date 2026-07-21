'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'

export function TickerItem({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  const up = change >= 0
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-5">
      <span className="font-mono text-sm font-semibold text-foreground">{symbol}</span>
      <span className="font-mono text-sm text-muted-foreground">
        ${price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className={`flex items-center gap-0.5 font-mono text-xs font-medium ${up ? 'text-success' : 'text-destructive'}`}>
        {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {up ? '+' : ''}
        {change?.toFixed(2)}%
      </span>
    </div>
  )
}
