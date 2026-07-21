'use client'

import { useState } from 'react'
import { ChevronDown, Search, Wallet, AlertCircle, RefreshCw, Star } from 'lucide-react'
import { networks, type Network } from '@/lib/crypto-data'
import { DonutChart } from '@/components/donut-chart'
import { AffiliateWidget } from '@/components/affiliate-widget'
import { AiPremium } from '@/components/ai-premium'
import { useWallet } from '@/hooks/use-wallet'
import type { WalletAsset } from '@/lib/blockchain'

const FAMOUS_WALLETS = [
  { label: 'MetaMask', address: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836', network: 'Ethereum' as Network },
  { label: 'Trust Wallet', address: '0xBE0eB53F46cd790Cd13851d5EFf43D12404dC33C', network: 'Ethereum' as Network },
  { label: 'Tonkeeper', address: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1', network: 'Ethereum' as Network },
  { label: 'Ethereum Foundation', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', network: 'Ethereum' as Network },
  { label: 'Coinbase Wallet', address: '0x6262998Ced04141b6b0cF4b2B308cA8CE8F2b6e6', network: 'Ethereum' as Network },
]

export function WalletHub() {
  const [network, setNetwork] = useState<Network>('Ethereum')
  const [address, setAddress] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scanned, setScanned] = useState(false)
  const { assets, loading, error, scan } = useWallet()

  function handleScan() {
    if (!address.trim()) return
    setScanned(true)
    scan(network, address.trim())
  }

  const total = assets.reduce((sum, h) => sum + h.value, 0)

  const holdings: WalletAsset[] = assets
  const holdingsTotal = total

  return (
    <aside className="flex flex-col gap-4">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/40">
            <Wallet className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Wallet Insights Hub</h2>
            <p className="text-xs text-muted-foreground">Scan any public address across chains</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                {network}
              </span>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
              >
                {networks.map((n) => (
                  <li key={n}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={n === network}
                      onClick={() => {
                        setNetwork(n)
                        setDropdownOpen(false)
                        setScanned(false)
                      }}
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
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder="Paste public wallet address..."
              aria-label="Wallet address"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mr-1">
              <Star className="size-3" /> Famous:
            </span>
            {FAMOUS_WALLETS.map((w) => (
              <button
                key={w.label}
                type="button"
                onClick={() => {
                  setNetwork(w.network)
                  setAddress(w.address)
                  setScanned(false)
                }}
                className="rounded-md border border-border/60 bg-secondary/40 px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                {w.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleScan}
            disabled={loading || !address.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_18px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
          >
            {loading ? (
              <><RefreshCw className="size-4 animate-spin" /> Scanning...</>
            ) : (
              'Scan Wallet'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-5 border-t border-border pt-5">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Token Balance
            </p>
            <p className="font-mono text-xl font-bold text-foreground">
              {holdings.length > 0 ? `$${holdingsTotal.toLocaleString('en-US')}` : '—'}
            </p>
          </div>
          {holdings.length > 0 ? (
            <DonutChart holdings={holdings} />
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {scanned ? 'No assets found' : 'Enter a wallet address and scan to see holdings'}
            </p>
          )}
        </div>
      </section>

      <AffiliateWidget />
      <AiPremium />
    </aside>
  )
}
