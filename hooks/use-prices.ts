'use client'

import { useEffect, useState } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'
import { coins as mockCoins } from '@/lib/crypto-data'

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>(() =>
    mockCoins.map((c) => ({
      id: c.symbol.toLowerCase(),
      symbol: c.symbol.toLowerCase(),
      name: c.name,
      current_price: c.price,
      market_cap: c.marketCap,
      market_cap_rank: c.rank,
      price_change_percentage_24h: c.change24h,
    }))
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await fetchTopCoins(100)
        if (mounted) {
          setCoins(data)
          setLoading(false)
          setError(null)
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : 'Failed to load prices')
          setLoading(false)
        }
      }
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => { mounted = false; clearInterval(interval) }
  }, [])

  return { coins, loading, error }
}
