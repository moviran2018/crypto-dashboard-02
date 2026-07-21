'use client'

import { DonutChart } from '@/components/features/charts/donut-chart'
import type { WalletAsset } from '@/lib/blockchain'

type Props = {
  assets: WalletAsset[]
  address: string
  connected: boolean
}

export function WalletDisplay({ assets, address, connected }: Props) {
  const total = assets.reduce((sum, h) => sum + h.value, 0)

  return (
    <div className="mt-5 border-t border-border pt-5">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Token Balance
        </p>
        <p className="font-mono text-xl font-bold text-foreground">
          {assets.length > 0 ? `$${total.toLocaleString('en-US')}` : address ? '$0.00' : '—'}
        </p>
      </div>
      {assets.length > 0 ? (
        <DonutChart holdings={assets} />
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {address
            ? 'Address scanned — no tokens found'
            : 'Select a wallet or paste an address to start'}
        </p>
      )}
    </div>
  )
}
