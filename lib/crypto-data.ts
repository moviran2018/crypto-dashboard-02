export type Coin = {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
}

// Deterministic pseudo-random so server/client render match.
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const NAMES: [string, string, number][] = [
  ['Bitcoin', 'BTC', 65000], ['Ethereum', 'ETH', 3500], ['Tether', 'USDT', 1.0],
  ['BNB', 'BNB', 585], ['Solana', 'SOL', 150], ['XRP', 'XRP', 0.62],
  ['USD Coin', 'USDC', 1.0], ['Cardano', 'ADA', 0.45], ['Dogecoin', 'DOGE', 0.16],
  ['Avalanche', 'AVAX', 38], ['Shiba Inu', 'SHIB', 0.000025], ['Polkadot', 'DOT', 7.2],
  ['TRON', 'TRX', 0.13], ['Chainlink', 'LINK', 17.4], ['Polygon', 'MATIC', 0.7],
  ['Toncoin', 'TON', 6.9], ['Bitcoin Cash', 'BCH', 480], ['Litecoin', 'LTC', 84],
  ['Internet Computer', 'ICP', 12.6], ['Uniswap', 'UNI', 9.8], ['Dai', 'DAI', 1.0],
  ['Ethereum Classic', 'ETC', 27], ['Stellar', 'XLM', 0.11], ['Aptos', 'APT', 8.4],
  ['Cronos', 'CRO', 0.093], ['Filecoin', 'FIL', 5.6], ['Hedera', 'HBAR', 0.078],
  ['Arbitrum', 'ARB', 1.05], ['NEAR Protocol', 'NEAR', 5.2], ['VeChain', 'VET', 0.032],
  ['Optimism', 'OP', 2.3], ['Maker', 'MKR', 2450], ['Injective', 'INJ', 26],
  ['The Graph', 'GRT', 0.24], ['Immutable', 'IMX', 1.9], ['Aave', 'AAVE', 96],
  ['Render', 'RNDR', 7.4], ['Sui', 'SUI', 1.15], ['Algorand', 'ALGO', 0.16],
  ['Fantom', 'FTM', 0.63], ['Quant', 'QNT', 108], ['Stacks', 'STX', 1.85],
  ['THORChain', 'RUNE', 4.6], ['Flow', 'FLOW', 0.78], ['Sei', 'SEI', 0.52],
  ['Theta Network', 'THETA', 1.42], ['Axie Infinity', 'AXS', 6.8], ['Tezos', 'XTZ', 0.87],
  ['Bittensor', 'TAO', 420], ['Kaspa', 'KAS', 0.13], ['MultiversX', 'EGLD', 34],
  ['Chiliz', 'CHZ', 0.09], ['Fetch.ai', 'FET', 1.35], ['The Sandbox', 'SAND', 0.42],
  ['Decentraland', 'MANA', 0.41], ['eCash', 'XEC', 0.00004], ['NEO', 'NEO', 12.5],
  ['Klaytn', 'KLAY', 0.15], ['Mina', 'MINA', 0.61], ['Rocket Pool', 'RPL', 18.6],
  ['GateToken', 'GT', 8.9], ['BitTorrent', 'BTT', 0.0000009], ['Gala', 'GALA', 0.028],
  ['dYdX', 'DYDX', 1.55], ['Pepe', 'PEPE', 0.0000082], ['Conflux', 'CFX', 0.17],
  ['Kava', 'KAVA', 0.58], ['Curve DAO', 'CRV', 0.42], ['Zcash', 'ZEC', 24],
  ['PancakeSwap', 'CAKE', 2.3], ['Nervos', 'CKB', 0.011], ['1inch', '1INCH', 0.36],
  ['Ravencoin', 'RVN', 0.019], ['Ordinals', 'ORDI', 34], ['Celestia', 'TIA', 8.1],
  ['Ondo', 'ONDO', 0.85], ['Worldcoin', 'WLD', 4.3], ['Jupiter', 'JUP', 0.92],
  ['Bonk', 'BONK', 0.000021], ['Wormhole', 'W', 0.44], ['Ethena', 'ENA', 0.78],
  ['Starknet', 'STRK', 0.68], ['Dogwifhat', 'WIF', 2.1], ['Blur', 'BLUR', 0.24],
  ['Pyth Network', 'PYTH', 0.41], ['Jito', 'JTO', 2.7], ['Mantle', 'MNT', 0.66],
  ['Frax', 'FRAX', 1.0], ['Compound', 'COMP', 52], ['Enjin Coin', 'ENJ', 0.21],
  ['Basic Attention', 'BAT', 0.24], ['Zilliqa', 'ZIL', 0.019], ['Loopring', 'LRC', 0.19],
  ['Synthetix', 'SNX', 2.4], ['Gnosis', 'GNO', 245], ['Helium', 'HNT', 5.9],
  ['Arweave', 'AR', 24], ['Metis', 'METIS', 42], ['Astar', 'ASTR', 0.075],
]

export const coins: Coin[] = NAMES.map(([name, symbol, price], i) => {
  const rand = seeded(i + 1)
  const change24h = Number((rand() * 16 - 6).toFixed(2))
  const marketCap = Math.round(price * (rand() * 900_000_000 + 40_000_000))
  return { rank: i + 1, name, symbol, price, change24h, marketCap }
})

export const tickerCoins = [
  { symbol: 'BTC', price: 65000, change24h: 2.3 },
  { symbol: 'ETH', price: 3500, change24h: -1.2 },
  { symbol: 'SOL', price: 150, change24h: 5.4 },
  { symbol: 'MATIC', price: 0.7, change24h: 0.5 },
]

export const networks = ['Bitcoin', 'Ethereum', 'Polygon', 'Solana'] as const
export type Network = (typeof networks)[number]

export type TokenHolding = {
  name: string
  symbol: string
  value: number
  amount: string
  color: string
}

export const walletHoldings: Record<Network, TokenHolding[]> = {
  Ethereum: [
    { name: 'Ethereum', symbol: 'ETH', value: 18420, amount: '5.26 ETH', color: '#f97316' },
    { name: 'USD Coin', symbol: 'USDC', value: 9200, amount: '9,200 USDC', color: '#fbbf24' },
    { name: 'Chainlink', symbol: 'LINK', value: 4180, amount: '240 LINK', color: '#22d3ee' },
    { name: 'Uniswap', symbol: 'UNI', value: 2450, amount: '250 UNI', color: '#a855f7' },
    { name: 'Others', symbol: '—', value: 1350, amount: '12 tokens', color: '#64748b' },
  ],
  Bitcoin: [
    { name: 'Bitcoin', symbol: 'BTC', value: 42250, amount: '0.65 BTC', color: '#f97316' },
    { name: 'Wrapped BTC', symbol: 'WBTC', value: 6500, amount: '0.10 WBTC', color: '#fbbf24' },
    { name: 'Ordinals', symbol: 'ORDI', value: 1700, amount: '50 ORDI', color: '#22d3ee' },
  ],
  Polygon: [
    { name: 'Polygon', symbol: 'MATIC', value: 3500, amount: '5,000 MATIC', color: '#f97316' },
    { name: 'USD Coin', symbol: 'USDC', value: 2800, amount: '2,800 USDC', color: '#fbbf24' },
    { name: 'Aave', symbol: 'AAVE', value: 1440, amount: '15 AAVE', color: '#22d3ee' },
    { name: 'Others', symbol: '—', value: 760, amount: '8 tokens', color: '#64748b' },
  ],
  Solana: [
    { name: 'Solana', symbol: 'SOL', value: 12000, amount: '80 SOL', color: '#f97316' },
    { name: 'Jupiter', symbol: 'JUP', value: 3680, amount: '4,000 JUP', color: '#fbbf24' },
    { name: 'Jito', symbol: 'JTO', value: 2160, amount: '800 JTO', color: '#22d3ee' },
    { name: 'Bonk', symbol: 'BONK', value: 1260, amount: '60M BONK', color: '#a855f7' },
    { name: 'Others', symbol: '—', value: 900, amount: '20 tokens', color: '#64748b' },
  ],
}

export function formatPrice(price: number): string {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (price >= 0.01) return price.toFixed(4)
  return price.toFixed(8).replace(/0+$/, '')
}

export function formatMarketCap(cap: number): string {
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
  if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`
  return `$${cap.toLocaleString('en-US')}`
}
