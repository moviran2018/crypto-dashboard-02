'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'

const FALLBACK: CoinData[] = Array.from({ length: 130 }, (_, i) => ({
  id: `coin-${i + 1}`,
  symbol: `COIN${i + 1}`,
  name: `Coin ${i + 1}`,
  current_price: Math.random() * 1000,
  market_cap: Math.random() * 1e12,
  market_cap_rank: i + 1,
  price_change_percentage_24h: (Math.random() - 0.5) * 20,
}))

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState('cache')
  const mounted = useRef(true)
  const hasData = useRef(false)

  useEffect(() => {
    mounted.current = true
    load()
    return () => { mounted.current = false }
  }, [])

  async function load() {
    try {
      const data = await fetchTopCoins(130)
      if (!mounted.current) return
      if (data.length >= 50) {
        setCoins(data)
        hasData.current = true
        setSource('live')
      } else {
        setCoins(FALLBACK)
        hasData.current = true
        setSource('fallback')
      }
      setError(null)
    } catch {
      if (!hasData.current) setCoins(FALLBACK)
      hasData.current = true
      setSource('fallback')
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  return { coins, loading, error, source }
}
