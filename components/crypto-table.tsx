'use client'

import { useMemo, useState } from 'react'
import { ArrowDownUp, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { coins, formatMarketCap, formatPrice, type Coin } from '@/lib/crypto-data'

type SortKey = 'rank' | 'price' | 'change24h'

function CoinBadge({ symbol }: { symbol: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[10px] font-bold uppercase text-primary ring-1 ring-border">
      {symbol.slice(0, 3)}
    </span>
  )
}

export function CryptoTable() {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => {
    const filtered = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase()),
    )
    const sorted = [...filtered].sort((a, b) => {
      const dir = asc ? 1 : -1
      return (a[sortKey] - b[sortKey]) * dir
    })
    return sorted
  }, [query, sortKey, asc])

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Top 100 Assets</h2>
          <p className="text-xs text-muted-foreground">Live market cap rankings</p>
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            aria-label="Search assets"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border bg-secondary/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid-cols-[3rem_1fr_9rem_7rem] md:px-5">
        <button
          type="button"
          onClick={() => toggleSort('rank')}
          className="flex items-center gap-1 text-left transition-colors hover:text-primary"
        >
          # <ArrowDownUp className="size-3" />
        </button>
        <span>Name</span>
        <button
          type="button"
          onClick={() => toggleSort('price')}
          className="flex items-center justify-end gap-1 transition-colors hover:text-primary"
        >
          Price <ArrowDownUp className="size-3" />
        </button>
        <button
          type="button"
          onClick={() => toggleSort('change24h')}
          className="flex items-center justify-end gap-1 transition-colors hover:text-primary"
        >
          24h <ArrowDownUp className="size-3" />
        </button>
      </div>

      {/* Rows */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {rows.map((coin) => (
          <CryptoRow key={coin.symbol} coin={coin} />
        ))}
        {rows.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">No assets match your search.</p>
        )}
      </div>
    </section>
  )
}

function CryptoRow({ coin }: { coin: Coin }) {
  const up = coin.change24h >= 0
  return (
    <div className="group grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border/60 px-4 py-3 transition-all hover:bg-primary/[0.06] hover:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.5)] md:grid-cols-[3rem_1fr_9rem_7rem] md:px-5">
      <span className="font-mono text-xs text-muted-foreground">{coin.rank}</span>
      <div className="flex min-w-0 items-center gap-3">
        <CoinBadge symbol={coin.symbol} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{coin.name}</p>
          <p className="font-mono text-[11px] uppercase text-muted-foreground">
            {coin.symbol} · {formatMarketCap(coin.marketCap)}
          </p>
        </div>
      </div>
      <span className="text-right font-mono text-sm font-medium text-foreground">
        ${formatPrice(coin.price)}
      </span>
      <span
        className={`flex items-center justify-end gap-1 text-right font-mono text-sm font-semibold ${
          up ? 'text-success' : 'text-destructive'
        }`}
      >
        {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
        {up ? '+' : ''}
        {coin.change24h}%
      </span>
    </div>
  )
}
