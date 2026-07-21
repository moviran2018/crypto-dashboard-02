interface Window {
  ethereum?: {
    isMetaMask?: boolean
    isTrust?: boolean
    isCoinbaseWallet?: boolean
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    on?: (event: string, cb: (...args: unknown[]) => void) => void
  }
}
