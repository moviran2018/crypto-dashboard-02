'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { formatMarketCap } from '@/lib/crypto-data'

function CoinBadge({ symbol }: { symbol: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[10px] font-bold uppercase text-primary ring-1 ring-border">
      {symbol.slice(0, 3)}
    </span>
  )
}

export function CryptoRow({ coin }: {
  coin: {
    id: string
    symbol: string
    name: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
  }
}) {
  const up = (coin.price_change_percentage_24h ?? 0) >= 0
  return (
    <div className="group grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border/60 px-4 py-3 transition-all hover:bg-primary/[0.06] hover:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.5)] md:grid-cols-[3rem_1fr_9rem_7rem] md:px-5">
      <span className="font-mono text-xs text-muted-foreground">{coin.market_cap_rank}</span>
      <div className="flex min-w-0 items-center gap-3">
        <CoinBadge symbol={coin.symbol} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{coin.name}</p>
          <p className="font-mono text-[11px] uppercase text-muted-foreground">
            {coin.symbol} · {formatMarketCap(coin.market_cap)}
          </p>
        </div>
      </div>
      <span className="text-right font-mono text-sm font-medium text-foreground">
        ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
      </span>
      <span
        className={`flex items-center justify-end gap-1 text-right font-mono text-sm font-semibold ${
          up ? 'text-success' : 'text-destructive'
        }`}
      >
        {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
        {up ? '+' : ''}
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </span>
    </div>
  )
}
