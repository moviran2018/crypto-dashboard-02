'use client'

import { useState } from 'react'
import { scanWallet, type WalletAsset } from '@/lib/blockchain'
import type { Network } from '@/lib/crypto-data'

export function useWallet() {
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function scan(network: Network, address: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await scanWallet(network, address)
      setAssets(result)
      if (result.length === 0) {
        setError('No assets found for this address on ' + network)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to scan wallet')
      setAssets([])
    } finally {
      setLoading(false)
    }
  }

  return { assets, loading, error, scan }
}
