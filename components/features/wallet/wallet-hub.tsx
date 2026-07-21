'use client'

import { useState, useEffect } from 'react'
import { Wallet } from 'lucide-react'
import { type Network } from '@/lib/crypto-data'
import { useWallet } from '@/hooks/use-wallet'
import { AffiliateWidget } from '@/components/features/affiliate/affiliate-widget'
import { AiPremium } from '@/components/features/affiliate/ai-premium'
import { WalletConnect, type WalletOption } from './wallet-connect'
import { WalletScanner } from './wallet-scanner'
import { WalletDisplay } from './wallet-display'
import { WalletError } from './wallet-error'

const CHAIN_NETWORK: Record<string, Network> = {
  '0x1': 'Ethereum', '0x89': 'Polygon',
}

export function WalletHub() {
  const [network, setNetwork] = useState<Network>('Ethereum')
  const [address, setAddress] = useState('')
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
      setConnectError('TON Keeper is for TON blockchain — not supported yet.')
      return
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      setConnectError('No wallet detected. Install ' + wallet.name + ' extension and refresh.')
      return
    }
    if (wallet.id === 'metamask' && !window.ethereum.isMetaMask) {
      setConnectError('MetaMask not detected. Install MetaMask extension and refresh.')
      return
    }
    if (wallet.id === 'trustwallet' && !('isTrust' in window.ethereum!)) {
      setConnectError('Trust Wallet not detected. Install Trust Wallet extension and refresh.')
      return
    }
    if (wallet.id === 'coinbase' && !('isCoinbaseWallet' in window.ethereum!)) {
      setConnectError('Coinbase Wallet not detected. Install Coinbase Wallet extension and refresh.')
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
    }
  }

  return (
    <aside className="flex flex-col gap-4">
      <section className="rounded-2xl border border-primary/25 bg-card/90 backdrop-blur-sm p-4 md:p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/50 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Wallet className="size-4 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Wallet <span className="text-glow-gold text-accent">Insights Hub</span></h2>
            <p className="text-xs text-muted-foreground">Scan any public address across chains</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <WalletConnect
            connectedWallet={connectedWallet}
            connecting={connecting}
            address={address}
            onConnect={connectWallet}
            onDisconnect={() => { setConnectedWallet(null); setAddress(''); setConnectError(null) }}
          />

          <WalletError message={connectError} />
          <WalletError message={error} />

          <WalletScanner
            network={network}
            address={address}
            loading={loading}
            onNetworkChange={setNetwork}
            onAddressChange={(a) => { setAddress(a); setConnectedWallet(null) }}
            onScan={() => { if (address.trim()) { setConnectedWallet(null); scan(network, address.trim()) } }}
          />
        </div>

        <WalletDisplay assets={assets} address={address} connected={!!connectedWallet} />
      </section>

      <AffiliateWidget />
      <AiPremium />
    </aside>
  )
}
