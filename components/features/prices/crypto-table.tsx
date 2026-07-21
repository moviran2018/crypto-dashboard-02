'use client'

import { useMemo, useState } from 'react'
import { ArrowDownUp, Search } from 'lucide-react'
import { usePrices } from '@/hooks/use-prices'
import { CryptoRow } from './crypto-row'

type SortKey = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h'

export function CryptoTable() {
  const { coins, loading, error, source } = usePrices()
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('market_cap_rank')
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => {
    const filtered = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase()),
    )
    const sorted = [...filtered].sort((a, b) => {
      const dir = asc ? 1 : -1
      const aVal = a[sortKey] ?? 0
      const bVal = b[sortKey] ?? 0
      return (aVal - bVal) * dir
    })
    return sorted
  }, [coins, query, sortKey, asc])

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAsc((v) => !v)
    else { setSortKey(key); setAsc(true) }
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/15 bg-card/90 backdrop-blur-sm">
      <div className="flex flex-col gap-3 border-b border-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground text-glow-orange">Top 100 Assets</h2>
          <p className="text-xs text-muted-foreground">Live market cap rankings via {source}</p>
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            aria-label="Search assets"
            className="w-full rounded-lg border border-primary/20 bg-black/40 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-[2rem_1fr_auto_auto] items-center gap-2 border-b border-primary/10 bg-primary/[0.04] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-primary/80 md:grid-cols-[3rem_1fr_9rem_7rem] md:gap-3 md:px-5">
        <button type="button" onClick={() => toggleSort('market_cap_rank')} className="flex items-center gap-0.5 text-left transition-colors hover:text-primary md:gap-1">
          # <ArrowDownUp className="size-3" />
        </button>
        <span>Name</span>
        <button type="button" onClick={() => toggleSort('current_price')} className="flex items-center gap-0.5 transition-colors hover:text-primary md:gap-1">
          Price <ArrowDownUp className="size-3" />
        </button>
        <button type="button" onClick={() => toggleSort('price_change_percentage_24h')} className="flex items-center gap-0.5 transition-colors hover:text-primary md:gap-1">
          24h <ArrowDownUp className="size-3" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center p-12">
            <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
          </div>
        )}
        {error && <p className="p-8 text-center text-sm text-destructive">{error}</p>}
        {!loading && !error && rows.length > 0 && rows.map((coin) => (
          <CryptoRow key={coin.id} coin={coin} />
        ))}
        {!loading && !error && rows.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">No assets match your search.</p>
        )}
      </div>
    </section>
  )
}
