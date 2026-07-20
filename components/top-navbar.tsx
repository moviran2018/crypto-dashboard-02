'use client'

import { useEffect, useState } from 'react'
import { Hexagon, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { fetchTopCoins, type CoinData } from '@/lib/api'

function TickerItem({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  const up = change >= 0
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-5">
      <span className="font-mono text-sm font-semibold text-foreground">{symbol}</span>
      <span className="font-mono text-sm text-muted-foreground">
        ${price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span
        className={`flex items-center gap-0.5 font-mono text-xs font-medium ${
          up ? 'text-success' : 'text-destructive'
        }`}
      >
        {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {up ? '+' : ''}
        {change?.toFixed(2)}%
      </span>
    </div>
  )
}

export function TopNavbar() {
  const [tickers, setTickers] = useState<CoinData[]>([])

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTopCoins(6)
        setTickers(data)
      } catch { }
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => clearInterval(interval)
  }, [])

  const loop = [...tickers, ...tickers, ...tickers, ...tickers]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/40">
            <Hexagon className="size-5 text-primary" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-bold tracking-tight text-foreground">NeonChain</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Multi-Chain Hub
            </p>
          </div>
        </div>

        <div
          className="relative hidden flex-1 overflow-hidden md:block"
          aria-label="Live market prices"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
          {tickers.length > 0 && (
            <div className="flex w-max animate-ticker items-center divide-x divide-border">
              {loop.map((c, i) => (
                <TickerItem key={`${c.id}-${i}`} symbol={c.symbol.toUpperCase()} price={c.current_price} change={c.price_change_percentage_24h} />
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="ml-auto flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.45)] transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Wallet className="size-4" />
          Connect Hub
        </button>
      </div>
    </header>
  )
}
