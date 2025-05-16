export const API_ENDPOINTS = {
  COINGECKO: "https://api.coingecko.com/api/v3",
  DEFILLAMA: "https://api.llama.fi",
  GOLDSKY_ETH: "https://api.goldsky.com/api/public/project/your-project-id/subgraphs/ethereum/graphql",
  GOLDSKY_ETHERLINK: "https://api.goldsky.com/api/public/project/your-project-id/subgraphs/etherlink/graphql",
  GOLDSKY_TEZOS: "https://api.goldsky.com/api/public/project/your-project-id/subgraphs/tezos/graphql",
}

export const SUPPORTED_CHAINS = [
  {
    id: "ethereum",
    name: "Ethereum",
    color: "#627EEA",
  },
  {
    id: "binance",
    name: "BNB Chain",
    color: "#F3BA2F",
  },
  {
    id: "polygon",
    name: "Polygon",
    color: "#8247E5",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    color: "#E84142",
  },
  {
    id: "solana",
    name: "Solana",
    color: "#00FFA3",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    color: "#28A0F0",
  },
  {
    id: "optimism",
    name: "Optimism",
    color: "#FF0420",
  },
  {
    id: "tezos",
    name: "Tezos",
    color: "#2C7DF7",
  },
  {
    id: "etherlink",
    name: "Etherlink",
    color: "#FF4A8D",
  },
]

export const SUPPORTED_SUBGRAPH_CHAINS = ["ethereum", "tezos", "etherlink"]