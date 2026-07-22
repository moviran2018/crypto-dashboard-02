import { cacheGet, cacheSet } from './cache'

export type CoinData = {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

async function fetchWithTimeout(url: string, ms = 15000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

async function tryFetch<T>(
  label: string,
  fn: () => Promise<T>,
): Promise<T | null> {
  try { return await fn() } catch { return null }
}

// ── Binance ────────────────────────────────────────────────
type BinanceTicker = { symbol: string; lastPrice: string; priceChangePercent: string; quoteVolume: string }

async function fetchBinance(limit = 100): Promise<CoinData[]> {
  const res = await fetchWithTimeout('https://api.binance.com/api/v3/ticker/24hr')
  if (!res.ok) return []
  const all: BinanceTicker[] = await res.json()
  const usdt = all.filter((t) => t.symbol.endsWith('USDT'))
    .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
    .slice(0, limit)
  return usdt.map((t, i) => {
    const sym = t.symbol.replace('USDT', '')
    return {
      id: sym.toLowerCase(),
      symbol: sym.toLowerCase(),
      name: COIN_NAMES[sym] || sym,
      current_price: Number(t.lastPrice),
      market_cap: Number(t.lastPrice) * Number(t.quoteVolume) / Number(t.lastPrice) || 0,
      market_cap_rank: i + 1,
      price_change_percentage_24h: Number(t.priceChangePercent),
    }
  })
}

// ── KuCoin ─────────────────────────────────────────────────
type KuTicker = { symbol: string; last: string; changeRate: string; volValue: string }

async function fetchKuCoin(limit = 100): Promise<CoinData[]> {
  const res = await fetchWithTimeout('https://api.kucoin.com/api/v1/market/allTickers')
  if (!res.ok) return []
  const json = await res.json()
  const all: KuTicker[] = json?.data?.ticker || []
  const usdt = all.filter((t) => t.symbol.endsWith('-USDT'))
    .sort((a, b) => Number(b.volValue) - Number(a.volValue))
    .slice(0, limit)
  return usdt.map((t, i) => {
    const sym = t.symbol.replace('-USDT', '')
    return {
      id: sym.toLowerCase(),
      symbol: sym.toLowerCase(),
      name: COIN_NAMES[sym] || sym,
      current_price: Number(t.last),
      market_cap: 0,
      market_cap_rank: i + 1,
      price_change_percentage_24h: Number(t.changeRate) * 100,
    }
  })
}

// ── CoinGecko ──────────────────────────────────────────────
async function fetchCoinGecko(perPage = 100): Promise<CoinData[]> {
  const res = await fetchWithTimeout('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=' + perPage + '&page=1&sparkline=false&price_change_percentage_24h')
  if (!res.ok) return []
  return res.json()
}

// ── Aggregator ─────────────────────────────────────────────
const CACHE_KEY = 'prices'
const CACHE_TTL = 60_000

export async function fetchTopCoins(perPage = 100): Promise<CoinData[]> {
  // 1. Try cache first
  const cached = cacheGet<CoinData[]>(CACHE_KEY)
  if (cached) {
    // Refresh in background
    refreshCoinsInBackground(perPage)
    return cached
  }

  // 2. Try sources in order
  const data = await tryFetch('coingecko', () => fetchCoinGecko(perPage))
    || await tryFetch('binance', () => fetchBinance(perPage))
    || await tryFetch('kucoin', () => fetchKuCoin(perPage))

  if (data && data.length > 0) {
    cacheSet(CACHE_KEY, data, CACHE_TTL)
    return data
  }

  // 3. Ultimate fallback: anything still in cache (even expired)
  const stale = localStorage.getItem('nc_' + CACHE_KEY)
  if (stale) {
    try { return JSON.parse(stale).data as CoinData[] } catch {}
  }

  return []
}

let refreshing = false

async function refreshCoinsInBackground(perPage: number) {
  if (refreshing) return
  refreshing = true
  try {
    const data = await tryFetch('binance-bg', () => fetchBinance(perPage))
      || await tryFetch('kucoin-bg', () => fetchKuCoin(perPage))
    if (data && data.length > 0) {
      cacheSet(CACHE_KEY, data, CACHE_TTL)
    }
  } finally { refreshing = false }
}

// ── Coin name map ──────────────────────────────────────────
const COIN_NAMES: Record<string, string> = {
  BTC: 'Bitcoin', ETH: 'Ethereum', USDT: 'Tether', BNB: 'BNB', SOL: 'Solana',
  XRP: 'XRP', USDC: 'USD Coin', ADA: 'Cardano', DOGE: 'Dogecoin', AVAX: 'Avalanche',
  SHIB: 'Shiba Inu', DOT: 'Polkadot', TRX: 'TRON', LINK: 'Chainlink', MATIC: 'Polygon',
  TON: 'Toncoin', BCH: 'Bitcoin Cash', LTC: 'Litecoin', ICP: 'Internet Computer',
  UNI: 'Uniswap', DAI: 'Dai', ETC: 'Ethereum Classic', XLM: 'Stellar', APT: 'Aptos',
  CRO: 'Cronos', FIL: 'Filecoin', HBAR: 'Hedera', ARB: 'Arbitrum', NEAR: 'NEAR Protocol',
  VET: 'VeChain', OP: 'Optimism', AAVE: 'Aave', SUI: 'Sui', ALGO: 'Algorand',
  FTM: 'Fantom', STX: 'Stacks', SAND: 'The Sandbox', MANA: 'Decentraland',
  PEPE: 'Pepe', WIF: 'dogwifhat', BONK: 'Bonk',
}
