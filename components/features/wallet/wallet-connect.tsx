'use client'

import { useState } from 'react'
import { ChevronDown, Wallet, CheckCircle, X } from 'lucide-react'

export type WalletOption = {
  id: string
  name: string
  icon: string
}

export const WALLET_OPTIONS: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'trustwallet', name: 'Trust Wallet', icon: '🔵' },
  { id: 'tonkeeper', name: 'TON Keeper', icon: '💎' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔷' },
]

export function truncateAddress(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

type Props = {
  connectedWallet: WalletOption | null
  connecting: boolean
  onConnect: (wallet: WalletOption) => void
  onDisconnect: () => void
  address: string
}

export function WalletConnect({ connectedWallet, connecting, onConnect, onDisconnect, address }: Props) {
  const [open, setOpen] = useState(false)

  if (connectedWallet) {
    return (
      <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span className="text-sm font-bold text-foreground">{connectedWallet.icon} {connectedWallet.name}</span>
          </div>
          <button type="button" onClick={onDisconnect} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{truncateAddress(address)}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={connecting}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/20"
      >
        <Wallet className="size-4" />
        {connecting ? 'Connecting...' : 'Select Wallet'}
        <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
          {WALLET_OPTIONS.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                onClick={() => { onConnect(w); setOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
              >
                <span className="text-lg">{w.icon}</span>
                <div>
                  <p className="font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {w.id === 'tonkeeper' ? 'TON blockchain' : 'Browser extension'}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
