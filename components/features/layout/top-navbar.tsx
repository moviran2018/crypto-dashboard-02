'use client'

import { useEffect, useRef, useState } from 'react'
import { Hexagon, Wallet } from 'lucide-react'
import { fetchTopCoins, type CoinData } from '@/lib/api'
import { TickerItem } from './ticker-item'

export function TopNavbar() {
  const [tickers, setTickers] = useState<CoinData[]>([])
  const dataRef = useRef<CoinData[]>([])
  const rafRef = useRef<number>(0)
  const posRef = useRef(0)
  const paused = useRef(false)
  const tickerEl = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTopCoins(6)
        dataRef.current = data
        setTickers(data)
        setReady(true)
      } catch { }
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!ready) return
    const el = tickerEl.current
    if (!el || tickers.length === 0) return

    paused.current = false

    function animate() {
      if (!paused.current) {
        posRef.current -= 0.35
        const halfW = el.scrollWidth / 2
        if (posRef.current <= -halfW) posRef.current += halfW
        el.style.transform = `translate3d(${posRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [ready])

  const loop = [...tickers, ...tickers, ...tickers, ...tickers]

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-black/70 backdrop-blur-2xl safe-top">
      <div className="flex h-14 items-center gap-3 px-3 md:h-16 md:gap-4 md:px-6">
        <div className="flex shrink-0 items-center gap-2 card-3d">
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/50 md:size-9">
            <Hexagon className="size-4 text-primary md:size-5" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-bold tracking-tight text-foreground">Neon<span className="text-glow-gold text-accent">Chain</span></p>
            <p className="hidden text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:block">
              Multi-Chain Hub
            </p>
          </div>
        </div>

        <div className="relative hidden flex-1 overflow-hidden md:block" aria-label="Live market prices">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
          {tickers.length > 0 && (
            <div
              ref={tickerEl}
              onMouseEnter={() => { paused.current = true }}
              onMouseLeave={() => { paused.current = false }}
              className="flex w-max items-center divide-x divide-border will-change-transform"
            >
              {loop.map((c, i) => (
                <TickerItem key={i} symbol={c.symbol.toUpperCase()} price={c.current_price} change={c.price_change_percentage_24h} />
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground shadow-[0_0_20px_rgba(251,191,36,0.45)] transition-all hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] hover:brightness-110 md:gap-2 md:px-4 md:py-2.5 md:text-sm"
        >
          <Wallet className="size-3.5 md:size-4" />
          <span className="hidden sm:inline">Connect</span> Hub
        </button>
      </div>
    </header>
  )
}
