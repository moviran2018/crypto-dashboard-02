'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchTopCoins, type CoinData } from '@/lib/api'

export function usePrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState('cache')
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    load()
    return () => { mounted.current = false }
  }, [])

  async function load() {
    try {
      const data = await fetchTopCoins(130)
      if (!mounted.current || data.length < 50) return
      setCoins(data)
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
