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
          className="flex w-full items-center justify-between rounded-lg border border-primary/20 bg-black/40 px-3 py-2.5 text-sm text-foreground transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            {network}
          </span>
          <ChevronDown className={`size-4 text-muted-foreground transition-transform ${netOpen ? 'rotate-180' : ''}`} />
        </button>
        {netOpen && (
          <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-primary/20 bg-popover/95 backdrop-blur-sm shadow-[0_0_30px_rgba(249,115,22,0.15)]">
            {networks.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => { onNetworkChange(n); setNetOpen(false) }}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-primary/[0.06] ${
                    n === network ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
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
          className="w-full rounded-lg border border-primary/20 bg-black/40 py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all"
        />
      </div>

      <button
        type="button"
        onClick={onScan}
        disabled={loading || !address.trim()}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_18px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.7)] hover:brightness-110 disabled:opacity-50"
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
