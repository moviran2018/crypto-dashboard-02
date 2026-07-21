'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'
import { staleWhileRevalidate } from '@/lib/cache'

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState('cache')
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    load()

    const interval = setInterval(load, 30_000)
    return () => { mounted.current = false; clearInterval(interval) }
  }, [])

  async function load() {
    try {
      const data = await staleWhileRevalidate<CoinData[]>(
        'prices', 60_000,
        () => fetchTopCoins(100),
        (fresh) => { if (mounted.current) { setCoins(fresh); setSource('live'); setLoading(false); setError(null) } },
      )
      if (data && mounted.current) {
        setCoins(data)
        setSource('cache')
        setLoading(false)
        setError(null)
      } else if (!data && mounted.current && coins.length === 0) {
        // Try a direct fetch if staleWhileRevalidate returned null
        try {
          const fresh = await fetchTopCoins(100)
          if (mounted.current && fresh.length > 0) {
            setCoins(fresh)
            setSource('live')
            setError(null)
          }
        } catch {
          if (mounted.current) setError('Unable to load prices. Check your connection.')
        }
      }
    } catch {
      if (mounted.current && coins.length === 0) {
        setError('Unable to load prices.')
      }
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  return { coins, loading, error, source }
}
