import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useStore } from "@nanostores/react"

import { fetchSingleQuote, type FinnhubQuote } from "~/lib/finnhub"
import { TOP_CRYPTOS } from "~/lib/assets"
import { $savedAssets, guardarActivo, eliminarActivo } from "~/stores/savedAssets"
import { Button } from "~/components/ui/button"

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  )
}

export default function CryptoDetail() {
  const { ticker } = useParams<{ ticker: string }>()
  const asset = TOP_CRYPTOS.find((c) => c.ticker === ticker)
  const saved = useStore($savedAssets)
  const guardado = saved.some((a) => a.ticker === ticker)

  const [quote, setQuote] = useState<FinnhubQuote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!asset) return
    fetchSingleQuote(asset.symbol)
      .then(setQuote)
      .catch(() => setError("Error al obtener datos de Finnhub."))
      .finally(() => setLoading(false))
  }, [asset?.symbol])

  if (!asset) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-destructive">Activo no encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          ← Volver
        </Link>
      </div>
    )
  }

  const changePositive = (quote?.dp ?? 0) >= 0

  const toggleGuardar = () => {
    if (guardado) {
      eliminarActivo(asset.ticker)
    } else {
      guardarActivo({
        symbol: asset.symbol,
        ticker: asset.ticker,
        name: asset.name,
        type: "crypto",
      })
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← Volver
      </Link>

      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{asset.name}</h1>
          <p className="text-muted-foreground">{asset.ticker} · Criptomoneda</p>
        </div>
        <Button
          variant={guardado ? "outline" : "default"}
          onClick={toggleGuardar}
        >
          {guardado ? "Guardado ✓" : "Guardar"}
        </Button>
      </div>

      {loading && <p className="text-muted-foreground">Cargando...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {quote && (
        <>
          <div className="mb-6 flex items-end gap-3">
            <span className="text-4xl font-bold">${quote.c.toFixed(2)}</span>
            <span
              className={[
                "mb-1 text-lg font-medium",
                changePositive ? "text-green-500" : "text-red-500",
              ].join(" ")}
            >
              {changePositive ? "+" : ""}
              {quote.dp.toFixed(2)}% hoy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatCard label="Precio Actual" value={`$${quote.c.toFixed(2)}`} />
            <StatCard label="Apertura" value={`$${quote.o.toFixed(2)}`} />
            <StatCard label="Cierre Anterior" value={`$${quote.pc.toFixed(2)}`} />
            <StatCard label="Máximo del Día" value={`$${quote.h.toFixed(2)}`} />
            <StatCard label="Mínimo del Día" value={`$${quote.l.toFixed(2)}`} />
            <StatCard
              label="Cambio"
              value={`${changePositive ? "+" : ""}$${quote.d.toFixed(2)}`}
            />
          </div>
        </>
      )}
    </div>
  )
}
