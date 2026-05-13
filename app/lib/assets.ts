export interface Asset {
  symbol: string
  ticker: string
  name: string
}

export const TOP_CRYPTOS: Asset[] = [
  { symbol: "BINANCE:BTCUSDT", ticker: "BTC", name: "Bitcoin" },
  { symbol: "BINANCE:ETHUSDT", ticker: "ETH", name: "Ethereum" },
  { symbol: "BINANCE:BNBUSDT", ticker: "BNB", name: "BNB" },
  { symbol: "BINANCE:SOLUSDT", ticker: "SOL", name: "Solana" },
  { symbol: "BINANCE:XRPUSDT", ticker: "XRP", name: "XRP" },
]

export const TOP_STOCKS: Asset[] = [
  { symbol: "AAPL", ticker: "AAPL", name: "Apple" },
  { symbol: "NVDA", ticker: "NVDA", name: "NVIDIA" },
  { symbol: "MSFT", ticker: "MSFT", name: "Microsoft" },
  { symbol: "AMZN", ticker: "AMZN", name: "Amazon" },
  { symbol: "GOOGL", ticker: "GOOGL", name: "Alphabet" }
]
