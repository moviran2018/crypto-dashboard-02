'use client'

import { useState } from 'react'
import { ChevronDown, Search, RefreshCw } from 'lucide-react'
import { networks, type Network } from '@/lib/crypto-data'

type Props = {
  network: Network
  address: string
  loading: boolean
  onNetworkChange: (n: Network) => void
  onAddressChange: (a: string) => void
  onScan: () => void
}

export function WalletScanner({ network, address, loading, onNetworkChange, onAddressChange, onScan }: Props) {
  const [netOpen, setNetOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative">
        <button
          type="button"
          onClick={() => setNetOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50"
        >
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            {network}
          </span>
          <ChevronDown className={`size-4 text-muted-foreground transition-transform ${netOpen ? 'rotate-180' : ''}`} />
        </button>
        {netOpen && (
          <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
            {networks.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => { onNetworkChange(n); setNetOpen(false) }}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary ${
                    n === network ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="size-2 rounded-full bg-primary" />
                  {n}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onScan()}
          placeholder="Or paste any wallet address..."
          aria-label="Wallet address"
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
        />
      </div>

      <button
        type="button"
        onClick={onScan}
        disabled={loading || !address.trim()}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_18px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.65)] disabled:opacity-50"
      >
        {loading ? (
          <><RefreshCw className="size-4 animate-spin" /> Scanning...</>
        ) : (
          'Scan Wallet'
        )}
      </button>
    </div>
  )
}
