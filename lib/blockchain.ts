import { ETH_TOKENS, POLYGON_TOKENS, SOLANA_TOKENS } from './tokens'

const RPC: Record<string, string[]> = {
  Ethereum: ['https://ethereum-rpc.publicnode.com', 'https://cloudflare-eth.com', 'https://rpc.ankr.com/eth'],
  Bitcoin: ['https://blockchain.info'],
  Polygon: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
  Solana: ['https://api.mainnet-beta.solana.com'],
}

function encodeBalanceOf(holder: string): string {
  const addr = holder.replace('0x', '').toLowerCase().padStart(64, '0')
  return `0x70a08231000000000000000000000000${addr}`
}

function decodeUint(hex: string): bigint {
  return BigInt(hex)
}

async function rpcCall(urls: string[], method: string, params: unknown[]): Promise<unknown> {
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      })
      if (!res.ok) continue
      const json = await res.json()
      if (json.error) continue
      return json.result
    } catch { continue }
  }
  throw new Error('All RPC endpoints failed for ' + method)
}

function isValidEthAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr.trim())
}

export type WalletAsset = {
  symbol: string
  name: string
  amount: string
  value: number
  color: string
}

const COLORS = ['#f97316', '#fbbf24', '#22d3ee', '#a855f7', '#34d399', '#f472b6', '#64748b', '#06b6d4']

export async function scanEthereum(address: string): Promise<WalletAsset[]> {
  const addr = address.trim()
  if (!isValidEthAddress(addr)) {
    throw new Error('Invalid Ethereum address. Must start with 0x and be 42 characters.')
  }

  const urls = RPC.Ethereum
  const assets: WalletAsset[] = []

  const balanceHex = await rpcCall(urls, 'eth_getBalance', [addr, 'latest']) as string
  const ethBalance = Number(decodeUint(balanceHex)) / 1e18
  assets.push({ symbol: 'ETH', name: 'Ethereum', amount: ethBalance.toFixed(4) + ' ETH', value: 0, color: COLORS[0] })

  const prices = await fetchTokenPrices(ETH_TOKENS)

  let ci = 1
  for (const token of ETH_TOKENS) {
    try {
      const result = await rpcCall(urls, 'eth_call', [{ to: token.address, data: encodeBalanceOf(addr) }, 'latest']) as string
      const balance = Number(decodeUint(result)) / 10 ** token.decimals
      if (balance > 0.001) {
        const price = prices[token.coingeckoId]?.usd || 0
        assets.push({
          symbol: token.symbol,
          name: token.name,
          amount: balance.toLocaleString(undefined, { maximumFractionDigits: 4 }) + ' ' + token.symbol,
          value: balance * price,
          color: COLORS[ci % COLORS.length],
        })
        ci++
      }
    } catch { continue }
  }

  return assets
}

export async function scanPolygon(address: string): Promise<WalletAsset[]> {
  const addr = address.trim()
  if (!isValidEthAddress(addr)) {
    throw new Error('Invalid Polygon address. Must start with 0x and be 42 characters.')
  }

  const urls = RPC.Polygon
  const assets: WalletAsset[] = []

  const balanceHex = await rpcCall(urls, 'eth_getBalance', [addr, 'latest']) as string
  const maticBalance = Number(decodeUint(balanceHex)) / 1e18
  if (maticBalance > 0.001) {
    assets.push({ symbol: 'MATIC', name: 'Polygon', amount: maticBalance.toFixed(4) + ' MATIC', value: 0, color: COLORS[0] })
  }

  const prices = await fetchTokenPrices(POLYGON_TOKENS)

  let ci = 1
  for (const token of POLYGON_TOKENS) {
    try {
      const result = await rpcCall(urls, 'eth_call', [{ to: token.address, data: encodeBalanceOf(addr) }, 'latest']) as string
      const balance = Number(decodeUint(result)) / 10 ** token.decimals
      if (balance > 0.001) {
        const price = prices[token.coingeckoId]?.usd || 0
        assets.push({
          symbol: token.symbol,
          name: token.name,
          amount: balance.toLocaleString(undefined, { maximumFractionDigits: 4 }) + ' ' + token.symbol,
          value: balance * price,
          color: COLORS[ci % COLORS.length],
        })
        ci++
      }
    } catch { continue }
  }

  return assets
}

export async function scanSolana(address: string): Promise<WalletAsset[]> {
  const addr = address.trim()
  const urls = RPC.Solana
  const assets: WalletAsset[] = []

  const balanceResult = await rpcCall(urls, 'getBalance', [addr]) as { value: number }
  const solBalance = balanceResult.value / 1e9
  if (solBalance > 0.001) {
    assets.push({ symbol: 'SOL', name: 'Solana', amount: solBalance.toFixed(4) + ' SOL', value: 0, color: COLORS[0] })
  }

  let tokenAccounts: { account: { data: { parsed: { info: { mint: string; tokenAmount: { uiAmount: number } } } } } }[] = []
  try {
    const result = await rpcCall(urls, 'getTokenAccountsByOwner', [
      addr,
      { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
      { encoding: 'jsonParsed' },
    ]) as { value: typeof tokenAccounts }
    tokenAccounts = result.value || []
  } catch { }

  const prices = await fetchTokenPrices(SOLANA_TOKENS.map((t) => ({ ...t, address: t.mint, coingeckoId: t.coingeckoId })))

  let ci = 1
  for (const acc of tokenAccounts) {
    const mint = acc.account.data.parsed.info.mint
    const amount = acc.account.data.parsed.info.tokenAmount.uiAmount
    if (amount <= 0) continue
    const token = SOLANA_TOKENS.find((t) => t.mint === mint)
    if (token) {
      const price = prices[token.coingeckoId]?.usd || 0
      assets.push({
        symbol: token.symbol,
        name: token.name,
        amount: amount.toLocaleString(undefined, { maximumFractionDigits: 4 }) + ' ' + token.symbol,
        value: amount * price,
        color: COLORS[ci % COLORS.length],
      })
      ci++
    }
  }

  return assets
}

export async function scanBitcoin(address: string): Promise<WalletAsset[]> {
  const url = `${RPC.Bitcoin}/balance?active=${address}`
  try {
    const res = await fetch(url)
    const data = await res.json() as Record<string, { final_balance: number }>
    const btcBalance = (data[address]?.final_balance || 0) / 1e8
    if (btcBalance > 0) {
      return [{ symbol: 'BTC', name: 'Bitcoin', amount: btcBalance.toFixed(6) + ' BTC', value: 0, color: COLORS[0] }]
    }
  } catch { }
  return []
}

async function fetchTokenPrices(tokens: { coingeckoId: string }[]): Promise<Record<string, { usd: number }>> {
  const ids = [...new Set(tokens.map((t) => t.coingeckoId))].filter(Boolean)
  if (ids.length === 0) return {}
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`
    const res = await fetch(url)
    if (res.ok) return res.json()
  } catch { }
  return {}
}

export async function scanWallet(network: string, address: string): Promise<WalletAsset[]> {
  switch (network) {
    case 'Ethereum': return scanEthereum(address)
    case 'Polygon': return scanPolygon(address)
    case 'Solana': return scanSolana(address)
    case 'Bitcoin': return scanBitcoin(address)
    default: throw new Error(`Unsupported network: ${network}`)
  }
}
