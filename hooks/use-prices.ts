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
  const hasData = useRef(false)

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
        () => fetchTopCoins(130),
        (fresh) => {
          if (!mounted.current || fresh.length === 0) return
          setCoins(fresh)
          hasData.current = true
          setSource('live')
          setError(null)
          setLoading(false)
        },
      )
      if (data && data.length > 0 && mounted.current) {
        setCoins(data)
        hasData.current = true
        setSource('cache')
        setError(null)
      }
    } catch {
      // never clear existing data on error
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  return { coins, loading, error, source }
}
