import { ETH_TOKENS, POLYGON_TOKENS, SOLANA_TOKENS, type ChainToken } from './tokens'

const RPC: Record<string, string> = {
  Ethereum: 'https://cloudflare-eth.com',
  Bitcoin: 'https://blockchain.info',
  Polygon: 'https://polygon-rpc.com',
  Solana: 'https://api.mainnet-beta.solana.com',
}

function encodeBalanceOf(holder: string): string {
  const addr = holder.replace('0x', '').toLowerCase().padStart(64, '0')
  return `0x70a08231000000000000000000000000${addr}`
}

function decodeUint(hex: string): bigint {
  return BigInt(hex)
}

async function rpcCall(url: string, method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  if (!res.ok) throw new Error(`RPC error: ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(`RPC error: ${json.error.message}`)
  return json.result
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
  const url = RPC.Ethereum
  const assets: WalletAsset[] = []

  const balanceHex = await rpcCall(url, 'eth_getBalance', [address, 'latest']) as string
  const ethBalance = Number(decodeUint(balanceHex)) / 1e18
  if (ethBalance > 0) {
    assets.push({ symbol: 'ETH', name: 'Ethereum', amount: ethBalance.toFixed(4) + ' ETH', value: 0, color: COLORS[0] })
  }

  const tokenCalls = ETH_TOKENS.map((t) => ({
    to: t.address,
    data: encodeBalanceOf(address),
  }))

  const results = await Promise.allSettled(
    tokenCalls.map((call) =>
      rpcCall(url, 'eth_call', [call, 'latest']).then((r) => ({ token: call, result: r as string }))
    )
  )

  const prices = await fetchTokenPrices(ETH_TOKENS)

  let ci = 1
  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    if (r.status === 'fulfilled') {
      const balance = Number(decodeUint(r.value.result)) / 10 ** ETH_TOKENS[i].decimals
      if (balance > 0) {
        const token = ETH_TOKENS[i]
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
    }
  }

  return assets
}

export async function scanPolygon(address: string): Promise<WalletAsset[]> {
  const url = RPC.Polygon
  const assets: WalletAsset[] = []

  const balanceHex = await rpcCall(url, 'eth_getBalance', [address, 'latest']) as string
  const maticBalance = Number(decodeUint(balanceHex)) / 1e18
  if (maticBalance > 0) {
    assets.push({ symbol: 'MATIC', name: 'Polygon', amount: maticBalance.toFixed(4) + ' MATIC', value: 0, color: COLORS[0] })
  }

  const tokenCalls = POLYGON_TOKENS.map((t) => ({
    to: t.address,
    data: encodeBalanceOf(address),
  }))

  const results = await Promise.allSettled(
    tokenCalls.map((call) =>
      rpcCall(url, 'eth_call', [call, 'latest']).then((r) => ({ token: call, result: r as string }))
    )
  )

  const prices = await fetchTokenPrices(POLYGON_TOKENS)

  let ci = 1
  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    if (r.status === 'fulfilled') {
      const balance = Number(decodeUint(r.value.result)) / 10 ** POLYGON_TOKENS[i].decimals
      if (balance > 0) {
        const token = POLYGON_TOKENS[i]
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
    }
  }

  return assets
}

export async function scanSolana(address: string): Promise<WalletAsset[]> {
  const url = RPC.Solana
  const assets: WalletAsset[] = []

  const balanceResult = await rpcCall(url, 'getBalance', [address]) as { value: number }
  const solBalance = balanceResult.value / 1e9
  if (solBalance > 0) {
    assets.push({ symbol: 'SOL', name: 'Solana', amount: solBalance.toFixed(4) + ' SOL', value: 0, color: COLORS[0] })
  }

  let tokenAccounts: { account: { data: { parsed: { info: { mint: string; tokenAmount: { uiAmount: number } } } } } }[] = []
  try {
    const result = await rpcCall(url, 'getTokenAccountsByOwner', [
      address,
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
