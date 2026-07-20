export type ChainToken = {
  address: string
  symbol: string
  name: string
  decimals: number
  coingeckoId: string
}

export const ETH_TOKENS: ChainToken[] = [
  { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT', name: 'Tether', decimals: 6, coingeckoId: 'tether' },
  { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC', name: 'USD Coin', decimals: 6, coingeckoId: 'usd-coin' },
  { address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', symbol: 'LINK', name: 'Chainlink', decimals: 18, coingeckoId: 'chainlink' },
  { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', symbol: 'UNI', name: 'Uniswap', decimals: 18, coingeckoId: 'uniswap' },
  { address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', symbol: 'AAVE', name: 'Aave', decimals: 18, coingeckoId: 'aave' },
  { address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', symbol: 'MATIC', name: 'Polygon', decimals: 18, coingeckoId: 'matic-network' },
  { address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', symbol: 'SHIB', name: 'Shiba Inu', decimals: 18, coingeckoId: 'shiba-inu' },
  { address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0', symbol: 'SAND', name: 'The Sandbox', decimals: 18, coingeckoId: 'the-sandbox' },
  { address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', symbol: 'BUSD', name: 'Binance USD', decimals: 18, coingeckoId: 'binance-usd' },
  { address: '0xD533a949740bb3306d119CC777fa900bA034cd52', symbol: 'CRV', name: 'Curve DAO', decimals: 18, coingeckoId: 'curve-dao-token' },
]

export const POLYGON_TOKENS: ChainToken[] = [
  { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC', name: 'USD Coin', decimals: 6, coingeckoId: 'usd-coin' },
  { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT', name: 'Tether', decimals: 6, coingeckoId: 'tether' },
  { address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', symbol: 'WETH', name: 'Wrapped Ether', decimals: 18, coingeckoId: 'ethereum' },
  { address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', symbol: 'WMATIC', name: 'Wrapped Matic', decimals: 18, coingeckoId: 'matic-network' },
  { address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17', symbol: 'QUICK', name: 'Quickswap', decimals: 18, coingeckoId: 'quickswap' },
]

export const SOLANA_TOKENS: { mint: string; symbol: string; name: string; decimals: number; coingeckoId: string }[] = [
  { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', decimals: 6, coingeckoId: 'usd-coin' },
  { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether', decimals: 6, coingeckoId: 'tether' },
  { mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', symbol: 'SAMO', name: 'Samoyed Coin', decimals: 9, coingeckoId: 'samoyed-coin' },
  { mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', symbol: 'mSOL', name: 'Marinade staked SOL', decimals: 9, coingeckoId: 'msol' },
  { mint: '7vf84XTn6DV6EnNfBmcbK2BcYZNUwNR8wzJbCMmEhZ2D', symbol: 'RAY', name: 'Raydium', decimals: 6, coingeckoId: 'raydium' },
]
