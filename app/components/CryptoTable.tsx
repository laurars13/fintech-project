import { useEffect, useState } from "react"

import { fetchQuotes, type QuoteRow } from "~/lib/finnhub"
import { TOP_CRYPTOS } from "~/lib/assets"
import { QuoteTable } from "~/components/QuoteTable"

export const CryptoTable = () => {
  const [rows, setRows] = useState<QuoteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuotes(TOP_CRYPTOS)
      .then(setRows)
      .catch(() => setError("Error al obtener datos de Finnhub."))
      .finally(() => setLoading(false))
  }, [])

  return (
    <QuoteTable
      title="Top 5 Criptomonedas"
      rows={rows}
      loading={loading}
      error={error}
      basePath="/crypto"
    />
  )
}
