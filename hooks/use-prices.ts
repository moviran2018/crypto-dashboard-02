'use client'

import { useEffect, useState } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTopCoins(100)
        if (mounted) setCoins(data)
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Failed to load prices')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => { mounted = false; clearInterval(interval) }
  }, [])

  return { coins, loading, error }
}
