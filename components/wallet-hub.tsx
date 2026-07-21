'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Search, Wallet, AlertCircle, RefreshCw, Star, CheckCircle, X } from 'lucide-react'
import { networks, type Network } from '@/lib/crypto-data'
import { DonutChart } from '@/components/donut-chart'
import { AffiliateWidget } from '@/components/affiliate-widget'
import { AiPremium } from '@/components/ai-premium'
import { useWallet } from '@/hooks/use-wallet'
import type { WalletAsset } from '@/lib/blockchain'

type WalletOption = {
  id: string
  name: string
  icon: string
}

const WALLET_OPTIONS: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'trustwallet', name: 'Trust Wallet', icon: '🔵' },
  { id: 'tonkeeper', name: 'TON Keeper', icon: '💎' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔷' },
]

const SAMPLE_WALLETS = [
  { label: 'ConsenSys (MetaMask)', address: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836', network: 'Ethereum' as Network },
  { label: 'Binance Reserve', address: '0xBE0eB53F46cd790Cd13851d5EFf43D12404dC33C', network: 'Ethereum' as Network },
  { label: 'TON Bridge', address: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1', network: 'Ethereum' as Network },
  { label: 'Ethereum Foundation', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', network: 'Ethereum' as Network },
  { label: 'Coinbase Hot Wallet', address: '0x6262998Ced04141b6b0cF4b2B308cA8CE8F2b6e6', network: 'Ethereum' as Network },
]

const CHAIN_NETWORK: Record<string, Network> = {
  '0x1': 'Ethereum', '0x89': 'Polygon',
}

function truncateAddress(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export function WalletHub() {
  const [network, setNetwork] = useState<Network>('Ethereum')
  const [address, setAddress] = useState('')
  const [walletDropdown, setWalletDropdown] = useState(false)
  const [netDropdown, setNetDropdown] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<WalletOption | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)
  const { assets, loading, error, scan } = useWallet()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0 && connectedWallet) {
          setAddress(accounts[0])
          handleConnectScan(accounts[0])
        } else {
          setConnectedWallet(null)
          setAddress('')
        }
      })
    }
  }, [connectedWallet])

  async function handleConnectScan(addr: string) {
    try {
      const chainId = await window.ethereum!.request({ method: 'eth_chainId' }) as string
      const net = CHAIN_NETWORK[chainId] || 'Ethereum'
      setNetwork(net)
      scan(net, addr)
    } catch {
      scan('Ethereum', addr)
    }
  }

  async function connectWallet(wallet: WalletOption) {
    setConnectError(null)
    if (wallet.id === 'tonkeeper') {
      setConnectError('TON Keeper is for TON blockchain — not supported yet. Select another wallet.')
      return
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      setConnectError('No wallet detected. Install ' + wallet.name + ' extension and refresh.')
      setWalletDropdown(false)
      return
    }
    if (wallet.id === 'metamask' && !window.ethereum.isMetaMask) {
      setConnectError('MetaMask not detected. Install MetaMask extension and refresh.')
      setWalletDropdown(false)
      return
    }
    if (wallet.id === 'trustwallet' && !('isTrust' in window.ethereum!)) {
      setConnectError('Trust Wallet not detected. Install Trust Wallet extension and refresh.')
      setWalletDropdown(false)
      return
    }
    if (wallet.id === 'coinbase' && !('isCoinbaseWallet' in window.ethereum!)) {
      setConnectError('Coinbase Wallet not detected. Install Coinbase Wallet extension and refresh.')
      setWalletDropdown(false)
      return
    }
    setConnecting(true)
    setConnectedWallet(null)
    setAddress('')
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        const addr = accounts[0] as string
        setConnectedWallet(wallet)
        setAddress(addr)
        await handleConnectScan(addr)
      }
    } catch {
      setConnectError('Connection rejected by user.')
    } finally {
      setConnecting(false)
      setWalletDropdown(false)
    }
  }

  function disconnect() {
    setConnectedWallet(null)
    setAddress('')
    setConnectError(null)
  }

  function handleScan() {
    if (!address.trim()) return
    setConnectedWallet(null)
    scan(network, address.trim())
  }

  const total = assets.reduce((sum, h) => sum + h.value, 0)
  const holdings = assets

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
          {connectedWallet ? (
            <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-green-500" />
                  <span className="text-sm font-bold text-foreground">{connectedWallet.icon} {connectedWallet.name}</span>
                </div>
                <button type="button" onClick={disconnect} className="text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{truncateAddress(address)}</p>
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setWalletDropdown((v) => !v)}
                disabled={connecting}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Wallet className="size-4" />
                {connecting ? 'Connecting...' : 'Select Wallet'}
                <ChevronDown className={`size-4 transition-transform ${walletDropdown ? 'rotate-180' : ''}`} />
              </button>
              {walletDropdown && (
                <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
                  {WALLET_OPTIONS.map((w) => (
                    <li key={w.id}>
                      <button
                        type="button"
                        onClick={() => connectWallet(w)}
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
          )}

          {connectError && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{connectError}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setNetDropdown((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                {network}
              </span>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${netDropdown ? 'rotate-180' : ''}`}
              />
            </button>
            {netDropdown && (
              <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
                {networks.map((n) => (
                  <li key={n}>
                    <button
                      type="button"
                      onClick={() => { setNetwork(n); setNetDropdown(false) }}
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
              placeholder="Or paste any wallet address..."
              aria-label="Wallet address"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>

          <button
            type="button"
            onClick={handleScan}
            disabled={loading || !address.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_18px rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_28px rgba(249,115,22,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
          >
            {loading ? (
              <><RefreshCw className="size-4 animate-spin" /> Scanning...</>
            ) : (
              'Scan Wallet'
            )}
          </button>

          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mr-1">
              <Star className="size-3" /> Sample:
            </span>
            {SAMPLE_WALLETS.map((w) => (
              <button
                key={w.label}
                type="button"
                onClick={() => {
                  setNetwork(w.network)
                  setAddress(w.address)
                  setConnectedWallet(null)
                  scan(w.network, w.address)
                }}
                className="rounded-md border border-border/60 bg-secondary/40 px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

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
            <DonutChart holdings={holdings} />
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {address
                ? 'Address scanned — no tokens found'
                : 'Select a wallet or paste an address to start'}
            </p>
          )}
        </div>
      </section>

      <AffiliateWidget />
      <AiPremium />
    </aside>
  )
}
