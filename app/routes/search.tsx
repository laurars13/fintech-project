import { Form, Link, useLoaderData } from "react-router"
import { Search } from "lucide-react"

import type { Route } from "./+types/search"
import { fetchSymbolSearch, type SearchResult } from "~/lib/finnhub"
import { TOP_CRYPTOS } from "~/lib/assets"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q") ?? ""
  if (!q.trim()) return { results: [] as SearchResult[], query: "" }
  const results = await fetchSymbolSearch(q)
  return { results: results.slice(0, 15), query: q }
}

function getDetailPath(result: SearchResult): string | null {
  if (result.type === "Crypto") {
    const known = TOP_CRYPTOS.find(
      (c) =>
        c.ticker === result.displaySymbol ||
        result.displaySymbol.startsWith(c.ticker + "/")
    )
    return known ? `/crypto/${known.ticker}` : null
  }
  return `/stock/${result.displaySymbol}`
}

const TYPE_LABELS: Record<string, string> = {
  "Common Stock": "Acción",
  ETP: "ETF",
  Crypto: "Criptomoneda",
}

export default function SearchPage() {
  const { results, query } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Form method="get" action="/search" className="mb-8 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={query}
            placeholder="Buscar por nombre o símbolo..."
            autoFocus
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Buscar
        </button>
      </Form>

      {query && (
        <>
          <h1 className="mb-6 text-2xl font-semibold">
            Resultados para &ldquo;{query}&rdquo;
          </h1>

          {results.length === 0 ? (
            <p className="text-muted-foreground">No se encontraron resultados.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Símbolo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const path = getDetailPath(result)
                  return (
                    <TableRow key={result.symbol}>
                      <TableCell className="font-mono font-medium">
                        {result.displaySymbol}
                      </TableCell>
                      <TableCell>{result.description}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {TYPE_LABELS[result.type] ?? result.type}
                      </TableCell>
                      <TableCell className="text-right">
                        {path && (
                          <Link
                            to={path}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Ver detalle →
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  )
}
