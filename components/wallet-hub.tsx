'use client'

import { useState } from 'react'
import { ChevronDown, Search, Wallet } from 'lucide-react'
import { networks, walletHoldings, type Network } from '@/lib/crypto-data'
import { DonutChart } from '@/components/donut-chart'
import { AffiliateWidget } from '@/components/affiliate-widget'
import { AiPremium } from '@/components/ai-premium'

export function WalletHub() {
  const [network, setNetwork] = useState<Network>('Ethereum')
  const [address, setAddress] = useState('0x7a25...F49b')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const holdings = walletHoldings[network]
  const total = holdings.reduce((sum, h) => sum + h.value, 0)

  return (
    <aside className="flex flex-col gap-4">
      {/* Wallet input card */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/40">
            <Wallet className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Wallet Insights Hub</h2>
            <p className="text-xs text-muted-foreground">Track any public address across chains</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Network dropdown */}
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

          {/* Address input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste public wallet address..."
              aria-label="Wallet address"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>

          <button
            type="button"
            className="rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_18px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Scan Wallet
          </button>
        </div>

        {/* Balance breakdown */}
        <div className="mt-5 border-t border-border pt-5">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Token Balance
            </p>
            <p className="font-mono text-xl font-bold text-foreground">
              ${total.toLocaleString('en-US')}
            </p>
          </div>
          <DonutChart holdings={holdings} />
        </div>
      </section>

      {/* Affiliate / ad widget */}
      <AffiliateWidget />

      {/* AI premium button + modal */}
      <AiPremium />
    </aside>
  )
}
