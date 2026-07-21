'use client'

import { Star } from 'lucide-react'
import { type Network } from '@/lib/crypto-data'

export type SampleWallet = {
  label: string
  address: string
  network: Network
}

export const SAMPLE_WALLETS: SampleWallet[] = [
  { label: 'ConsenSys (MetaMask)', address: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836', network: 'Ethereum' as Network },
  { label: 'Binance Reserve', address: '0xBE0eB53F46cd790Cd13851d5EFf43D12404dC33C', network: 'Ethereum' as Network },
  { label: 'TON Bridge', address: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1', network: 'Ethereum' as Network },
  { label: 'Ethereum Foundation', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', network: 'Ethereum' as Network },
  { label: 'Coinbase Hot Wallet', address: '0x6262998Ced04141b6b0cF4b2B308cA8CE8F2b6e6', network: 'Ethereum' as Network },
]

type Props = {
  onSelect: (sample: SampleWallet) => void
}

export function WalletSample({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mr-1">
        <Star className="size-3" /> Sample:
      </span>
      {SAMPLE_WALLETS.map((w) => (
        <button
          key={w.label}
          type="button"
          onClick={() => onSelect(w)}
          className="rounded-md border border-border/60 bg-secondary/40 px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          {w.label}
        </button>
      ))}
    </div>
  )
}
