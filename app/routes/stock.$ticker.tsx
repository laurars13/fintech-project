import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useStore } from "@nanostores/react"

import {
  fetchSingleQuote,
  fetchStockProfile,
  type FinnhubQuote,
  type StockProfile,
} from "~/lib/finnhub"
import { TOP_STOCKS } from "~/lib/assets"
import { $savedAssets, guardarActivo, eliminarActivo } from "~/stores/savedAssets"
import { Button } from "~/components/ui/button"

function fmt(value: number | null, prefix = ""): string {
  return value == null ? "N/A" : `${prefix}${value.toFixed(2)}`
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  )
}

export default function StockDetail() {
  const { ticker } = useParams<{ ticker: string }>()
  const asset =
    TOP_STOCKS.find((s) => s.ticker === ticker) ??
    (ticker ? { symbol: ticker, ticker, name: ticker } : null)
  const saved = useStore($savedAssets)
  const guardado = saved.some((a) => a.ticker === ticker)

  const [quote, setQuote] = useState<FinnhubQuote | null>(null)
  const [profile, setProfile] = useState<StockProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!asset) return
    Promise.all([
      fetchSingleQuote(asset.symbol),
      fetchStockProfile(asset.symbol),
    ])
      .then(([q, p]) => {
        setQuote(q)
        setProfile(p)
      })
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
        type: "accion",
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
        <div className="flex items-center gap-4">
          {profile?.logo && (
            <img
              src={profile.logo}
              alt={asset.name}
              className="h-12 w-12 rounded-lg object-contain"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{profile?.name ?? asset.name}</h1>
            <p className="text-muted-foreground">
              {asset.ticker}
              {profile?.exchange && ` · ${profile.exchange}`}
              {profile?.finnhubIndustry && ` · ${profile.finnhubIndustry}`}
            </p>
          </div>
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
      {!loading && !error && quote === null && (
        <p className="text-muted-foreground">No hay datos de cotización disponibles para este activo.</p>
      )}

      {quote && (
        <>
          <div className="mb-6 flex items-end gap-3">
            <span className="text-4xl font-bold">{fmt(quote.c, "$")}</span>
            <span
              className={[
                "mb-1 text-lg font-medium",
                changePositive ? "text-green-500" : "text-red-500",
              ].join(" ")}
            >
              {quote.dp != null ? `${changePositive ? "+" : ""}${quote.dp.toFixed(2)}% hoy` : "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatCard label="Precio Actual" value={fmt(quote.c, "$")} />
            <StatCard label="Apertura" value={fmt(quote.o, "$")} />
            <StatCard label="Cierre Anterior" value={fmt(quote.pc, "$")} />
            <StatCard label="Máximo del Día" value={fmt(quote.h, "$")} />
            <StatCard label="Mínimo del Día" value={fmt(quote.l, "$")} />
            <StatCard
              label="Cambio"
              value={quote.d == null ? "N/A" : `${changePositive ? "+" : ""}${fmt(quote.d, "$")}`}
            />
            {profile?.marketCapitalization && (
              <StatCard
                label="Capitalización"
                value={`$${(profile.marketCapitalization / 1000).toFixed(2)}B`}
              />
            )}
            {profile?.ipo && (
              <StatCard label="Fecha OPI" value={profile.ipo} />
            )}
            {profile?.country && (
              <StatCard label="País" value={profile.country} />
            )}
          </div>

          {profile?.weburl && (
            <a
              href={profile.weburl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-muted-foreground underline hover:text-foreground"
            >
              {profile.weburl} ↗
            </a>
          )}
        </>
      )}
    </div>
  )
}
