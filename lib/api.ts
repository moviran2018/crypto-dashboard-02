const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

export type CoinData = {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  const res = await fetch(url, { signal: ctrl.signal })
  clearTimeout(id)
  return res
}

async function fetchCoinGecko(perPage = 100): Promise<CoinData[]> {
  const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage_24h`
  const res = await fetchWithTimeout(url)
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`)
  return res.json()
}

type BinanceTicker = { symbol: string; lastPrice: string; priceChangePercent: string; quoteVolume: string }

async function fetchBinance(limit = 100): Promise<CoinData[]> {
  const res = await fetch('https://api.binance.com/api/v3/ticker/24hr')
  if (!res.ok) throw new Error(`Binance error: ${res.status}`)
  const all: BinanceTicker[] = await res.json()
  const usdt = all.filter((t) => t.symbol.endsWith('USDT')).slice(0, limit)
  return usdt.map((t, i) => ({
    id: t.symbol.toLowerCase(),
    symbol: t.symbol.replace('USDT', '').toLowerCase(),
    name: t.symbol.replace('USDT', ''),
    current_price: Number(t.lastPrice),
    market_cap: Number(t.quoteVolume) * 1,
    market_cap_rank: i + 1,
    price_change_percentage_24h: Number(t.priceChangePercent),
  }))
}

export async function fetchTopCoins(perPage = 100): Promise<CoinData[]> {
  try {
    return await fetchCoinGecko(perPage)
  } catch {
    const fallback = await fetchBinance(perPage)
    if (fallback.length > 0) return fallback
    throw new Error('All price APIs failed')
  }
}

export async function fetchPrices(symbols: string[]): Promise<Record<string, { usd: number; usd_24h_change?: number }>> {
  const ids = symbols.map((s) => s.toLowerCase()).join(',')
  const url = `${COINGECKO_BASE}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`)
  return res.json()
}

export function symbolToCoinGeckoId(symbol: string): string {
  const map: Record<string, string> = {
    btc: 'bitcoin', eth: 'ethereum', usdt: 'tether', bnb: 'binancecoin',
    sol: 'solana', xrp: 'ripple', usdc: 'usd-coin', ada: 'cardano',
    doge: 'dogecoin', avax: 'avalanche-2', shib: 'shiba-inu', dot: 'polkadot',
    trx: 'tron', link: 'chainlink', matic: 'polygon', ton: 'the-open-network',
    bch: 'bitcoin-cash', ltc: 'litecoin', icp: 'internet-computer', uni: 'uniswap',
    dai: 'dai', etc: 'ethereum-classic', xlm: 'stellar', apt: 'aptos',
    cro: 'cronos', fil: 'filecoin', hbar: 'hedera-hashgraph', arb: 'arbitrum',
    near: 'near', vet: 'vechain', op: 'optimism', mk: 'maker', inj: 'injective',
    grt: 'the-graph', imx: 'immutable-x', aave: 'aave', rndr: 'render-token',
    sui: 'sui', algo: 'algorand', ftm: 'fantom', qnt: 'quant-network',
    stx: 'stacks', rune: 'thorchain', flow: 'flow', sei: 'sei-network',
    theta: 'theta-token', axs: 'axie-infinity', xtz: 'tezos', tao: 'bittensor',
    kas: 'kaspa', egld: 'elrond-erd-2', chz: 'chiliz', fet: 'fetch-ai',
    sand: 'the-sandbox', mana: 'decentraland', xec: 'ecash', neo: 'neo',
    klay: 'klaytn', mina: 'mina-protocol', rpl: 'rocket-pool', gt: 'gatechain-token',
    btt: 'bittorrent', gala: 'gala', dydx: 'dydx', pepe: 'pepe',
    cfx: 'conflux-network', kava: 'kava', crv: 'curve-dao-token', zec: 'zcash',
    cake: 'pancakeswap', ckb: 'nervos-network', '1inch': '1inch', rvn: 'ravencoin',
    ordi: 'ordinals', tia: 'celestia', ondo: 'ondo-finance', wld: 'worldcoin-wld',
    jup: 'jupiter-exchange', bonk: 'bonk', w: 'wormhole', ena: 'ethena',
    strk: 'starknet', wif: 'dogwifcoin', blur: 'blur', pyth: 'pyth-network',
    jto: 'jito', mnt: 'mantle', frax: 'frax', comp: 'compound-governance-token',
    enj: 'enjincoin', bat: 'basic-attention-token', zil: 'zilliqa', lrc: 'loopring',
    snx: 'synthetix-network-token', gno: 'gnosis', hnt: 'helium', ar: 'arweave',
    metis: 'metis-token', astr: 'astar',
  }
  return map[symbol.toLowerCase()] || symbol.toLowerCase()
}
