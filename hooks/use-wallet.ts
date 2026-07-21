'use client'

import { useState } from 'react'
import { scanWallet, type WalletAsset } from '@/lib/blockchain'
import { cacheGet, cacheSet } from '@/lib/cache'
import type { Network } from '@/lib/crypto-data'

export function useWallet() {
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function scan(network: Network, address: string) {
    setLoading(true)
    setError(null)
    setAssets([])

    const cacheKey = `wallet_${network}_${address.toLowerCase()}`
    const cached = cacheGet<WalletAsset[]>(cacheKey)
    if (cached) {
      setAssets(cached)
    }

    try {
      const result = await scanWallet(network, address)
      if (result.length > 0 || !cached) {
        setAssets(result)
        cacheSet(cacheKey, result, 120_000)
      }
    } catch (e) {
      if (!cached) {
        setError(e instanceof Error ? e.message : 'Failed to scan wallet')
      }
    } finally {
      setLoading(false)
    }
  }

  function clearAssets() {
    setAssets([])
    setError(null)
  }

  return { assets, loading, error, scan, clearAssets }
}
