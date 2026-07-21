'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type WalletOption = {
  id: string
  name: string
  icon: string
}

type WalletContextType = {
  connectedWallet: WalletOption | null
  address: string
  setConnectedWallet: (w: WalletOption | null) => void
  setAddress: (a: string) => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connectedWallet: null,
  address: '',
  setConnectedWallet: () => {},
  setAddress: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connectedWallet, setConnectedWallet] = useState<WalletOption | null>(null)
  const [address, setAddress] = useState('')
  const disconnect = () => { setConnectedWallet(null); setAddress('') }
  return (
    <WalletContext.Provider value={{ connectedWallet, address, setConnectedWallet, setAddress, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}
