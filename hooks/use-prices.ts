'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'
import { cacheGet } from '@/lib/cache'

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState('cache')
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    loadOnce()
    return () => { mounted.current = false }
  }, [])

  async function loadOnce() {
    try {
      const cached = cacheGet<CoinData[]>('prices')
      if (cached && cached.length > 0) {
        setCoins(cached)
        setSource('cache')
        setLoading(false)
      }

      const fresh = await fetchTopCoins(130)
      if (!mounted.current) return
      setCoins(fresh)
      setSource('live')
      setError(null)
    } catch {
      if (coins.length === 0) setError('Unable to load prices.')
    } finally {
      if (mounted.current) setLoading(false)
    }
  }

  return { coins, loading, error, source }
}
