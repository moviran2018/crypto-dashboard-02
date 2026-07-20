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

export async function fetchTopCoins(perPage = 100): Promise<CoinData[]> {
  const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`)
  return res.json()
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
