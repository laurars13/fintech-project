import axios from "axios"

export const FINNHUB_API_KEY = "d7uttj1r01qp7l70adjgd7uttj1r01qp7l70adk0"
const BASE_URL = "https://finnhub.io/api/v1"

export interface QuoteItem {
  symbol: string
  ticker: string
  name: string
}

export interface QuoteRow extends QuoteItem {
  price: number
  change: number
  changePercent: number
  high: number
  low: number
}

export interface FinnhubQuote {
  c: number | null
  d: number | null
  dp: number | null
  h: number | null
  l: number | null
  o: number | null
  pc: number | null
}

export interface StockProfile {
  name: string
  ticker: string
  exchange: string
  logo: string
  weburl: string
  finnhubIndustry: string
  marketCapitalization: number
  ipo: string
  country: string
  currency: string
}

export async function fetchQuotes(items: QuoteItem[]): Promise<QuoteRow[]> {
  return Promise.all(
    items.map(({ symbol, ticker, name }) =>
      axios
        .get<FinnhubQuote>(`${BASE_URL}/quote`, {
          params: { symbol, token: FINNHUB_API_KEY },
        })
        .then((res) => ({
          symbol,
          ticker,
          name,
          price: res.data.c,
          change: res.data.d,
          changePercent: res.data.dp,
          high: res.data.h,
          low: res.data.l,
        }))
    )
  )
}

export async function fetchSingleQuote(symbol: string): Promise<FinnhubQuote | null> {
  const res = await axios.get<FinnhubQuote>(`${BASE_URL}/quote`, {
    params: { symbol, token: FINNHUB_API_KEY },
  })
  return res.data.c == null ? null : res.data
}

export async function fetchStockProfile(
  ticker: string
): Promise<StockProfile | null> {
  try {
    const res = await axios.get<StockProfile>(`${BASE_URL}/stock/profile2`, {
      params: { symbol: ticker, token: FINNHUB_API_KEY },
    })
    return res.data
  } catch {
    return null
  }
}

export interface SearchResult {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

export async function fetchSymbolSearch(query: string): Promise<SearchResult[]> {
  const res = await axios.get<{ count: number; result: SearchResult[] }>(
    `${BASE_URL}/search`,
    { params: { q: query, token: FINNHUB_API_KEY } }
  )
  return res.data.result ?? []
}
