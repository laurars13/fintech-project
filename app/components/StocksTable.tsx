import { useEffect, useState } from "react"

import { fetchQuotes, type QuoteRow } from "~/lib/finnhub"
import { TOP_STOCKS } from "~/lib/assets"
import { QuoteTable } from "~/components/QuoteTable"

export const StocksTable = () => {
  const [rows, setRows] = useState<QuoteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuotes(TOP_STOCKS)
      .then(setRows)
      .catch(() => setError("Error al obtener datos de Finnhub."))
      .finally(() => setLoading(false))
  }, [])

  return (
    <QuoteTable
      title="Top 5 Acciones"
      rows={rows}
      loading={loading}
      error={error}
      basePath="/stock"
    />
  )
}
