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
  { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', name: 'Dai', decimals: 18, coingeckoId: 'dai' },
  { address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8, coingeckoId: 'wrapped-bitcoin' },
  { address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', symbol: 'LINK', name: 'Chainlink', decimals: 18, coingeckoId: 'chainlink' },
  { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', symbol: 'UNI', name: 'Uniswap', decimals: 18, coingeckoId: 'uniswap' },
  { address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', symbol: 'AAVE', name: 'Aave', decimals: 18, coingeckoId: 'aave' },
  { address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', symbol: 'SHIB', name: 'Shiba Inu', decimals: 18, coingeckoId: 'shiba-inu' },
  { address: '0xD533a949740bb3306d119CC777fa900bA034cd52', symbol: 'CRV', name: 'Curve DAO', decimals: 18, coingeckoId: 'curve-dao-token' },
  { address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', symbol: 'BUSD', name: 'Binance USD', decimals: 18, coingeckoId: 'binance-usd' },
  { address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0', symbol: 'SAND', name: 'The Sandbox', decimals: 18, coingeckoId: 'the-sandbox' },
  { address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', symbol: 'MATIC', name: 'Polygon', decimals: 18, coingeckoId: 'matic-network' },
  { address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', symbol: 'MKR', name: 'Maker', decimals: 18, coingeckoId: 'maker' },
  { address: '0xba100000625a3754423978a60c9317c58a424e3D', symbol: 'BAL', name: 'Balancer', decimals: 18, coingeckoId: 'balancer' },
  { address: '0xc00e94Cb662C3520282E6f5717214004A7f26888', symbol: 'COMP', name: 'Compound', decimals: 18, coingeckoId: 'compound' },
  { address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF', symbol: 'BAT', name: 'Basic Attention Token', decimals: 18, coingeckoId: 'basic-attention-token' },
  { address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C', symbol: 'BNT', name: 'Bancor', decimals: 18, coingeckoId: 'bancor' },
  { address: '0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b', symbol: 'AXS', name: 'Axie Infinity', decimals: 18, coingeckoId: 'axie-infinity' },
  { address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', symbol: 'MANA', name: 'Decentraland', decimals: 18, coingeckoId: 'decentraland' },
  { address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381', symbol: 'APE', name: 'ApeCoin', decimals: 18, coingeckoId: 'apecoin' },
  { address: '0x5283D291DBCF85356A21bA090E6db59121208b44', symbol: 'BLUR', name: 'Blur', decimals: 18, coingeckoId: 'blur' },
  { address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7', symbol: 'GRT', name: 'The Graph', decimals: 18, coingeckoId: 'the-graph' },
  { address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c', symbol: 'ENJ', name: 'Enjin', decimals: 18, coingeckoId: 'enjincoin' },
  { address: '0xC18360217d8F7Ab5e7c516566761Ea12Ce7F9D72', symbol: 'ENS', name: 'Ethereum Name Service', decimals: 18, coingeckoId: 'ethereum-name-service' },
  { address: '0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4', symbol: 'ANKR', name: 'Ankr', decimals: 18, coingeckoId: 'ankr' },
  { address: '0x3506424F91fD33084466F402d5D97f05F8e3b4AF', symbol: 'CHZ', name: 'Chiliz', decimals: 18, coingeckoId: 'chiliz' },
  { address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704', symbol: 'cbETH', name: 'Coinbase Wrapped Staked ETH', decimals: 18, coingeckoId: 'coinbase-wrapped-staked-eth' },
  { address: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', symbol: 'ARB', name: 'Arbitrum', decimals: 18, coingeckoId: 'arbitrum' },
  { address: '0x6982508145454Ce325dDBe47a25d4ec3d2311933', symbol: 'PEPE', name: 'Pepe', decimals: 18, coingeckoId: 'pepe' },
  { address: '0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b', symbol: 'CRO', name: 'Cronos', decimals: 8, coingeckoId: 'crypto-com-chain' },
  { address: '0x4E15361FD6b4BB609Fa63C81A2be19d8737170D0', symbol: 'FTM', name: 'Fantom', decimals: 18, coingeckoId: 'fantom' },
  { address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', symbol: 'LDO', name: 'Lido DAO', decimals: 18, coingeckoId: 'lido-dao' },
  { address: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e', symbol: 'ANT', name: 'Aragon', decimals: 18, coingeckoId: 'aragon' },
]

export const POLYGON_TOKENS: ChainToken[] = [
  { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC', name: 'USD Coin', decimals: 6, coingeckoId: 'usd-coin' },
  { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT', name: 'Tether', decimals: 6, coingeckoId: 'tether' },
  { address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', symbol: 'WETH', name: 'Wrapped Ether', decimals: 18, coingeckoId: 'ethereum' },
  { address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', symbol: 'WMATIC', name: 'Wrapped Matic', decimals: 18, coingeckoId: 'matic-network' },
  { address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17', symbol: 'QUICK', name: 'Quickswap', decimals: 18, coingeckoId: 'quickswap' },
  { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', symbol: 'DAI', name: 'Dai', decimals: 18, coingeckoId: 'dai' },
  { address: '0x1BFd67037B42Cf73acF2047067bd4F2C47D9BfD6', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8, coingeckoId: 'wrapped-bitcoin' },
  { address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39', symbol: 'LINK', name: 'Chainlink', decimals: 18, coingeckoId: 'chainlink' },
  { address: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', symbol: 'UNI', name: 'Uniswap', decimals: 18, coingeckoId: 'uniswap' },
  { address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', symbol: 'AAVE', name: 'Aave', decimals: 18, coingeckoId: 'aave' },
  { address: '0x9a71012B13CA4d3D0FdcA43dA112f8C3A5F3b1a', symbol: 'CRV', name: 'Curve DAO', decimals: 18, coingeckoId: 'curve-dao-token' },

]

export const SOLANA_TOKENS: { mint: string; symbol: string; name: string; decimals: number; coingeckoId: string }[] = [
  { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', decimals: 6, coingeckoId: 'usd-coin' },
  { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether', decimals: 6, coingeckoId: 'tether' },
  { mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', symbol: 'mSOL', name: 'Marinade staked SOL', decimals: 9, coingeckoId: 'msol' },
  { mint: '7vf84XTn6DV6EnNfBmcbK2BcYZNUwNR8wzJbCMmEhZ2D', symbol: 'RAY', name: 'Raydium', decimals: 6, coingeckoId: 'raydium' },
  { mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', symbol: 'BONK', name: 'Bonk', decimals: 5, coingeckoId: 'bonk' },
  { mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', symbol: 'WIF', name: 'dogwifhat', decimals: 6, coingeckoId: 'dogwifcoin' },
  { mint: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5', symbol: 'MEW', name: 'cat in a dogs world', decimals: 5, coingeckoId: 'mew' },
  { mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', symbol: 'SAMO', name: 'Samoyed Coin', decimals: 9, coingeckoId: 'samoyed-coin' },
]
