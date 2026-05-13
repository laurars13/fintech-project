import { useNavigate } from "react-router"

import type { QuoteRow } from "~/lib/finnhub"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface Props {
  title: string
  rows: QuoteRow[]
  loading: boolean
  error: string | null
  basePath?: string
}

export function QuoteTable({ title, rows, loading, error, basePath }: Props) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">{title}</h1>

      {loading && <p className="text-muted-foreground">Cargando...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Cambio 24h</TableHead>
              <TableHead className="text-right">Máximo</TableHead>
              <TableHead className="text-right">Mínimo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.symbol}
                onClick={() =>
                  basePath && navigate(`${basePath}/${row.ticker}`)
                }
                className={basePath ? "cursor-pointer" : ""}
              >
                <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{row.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {row.ticker}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${row.price.toFixed(2)}
                </TableCell>
                <TableCell
                  className={[
                    "text-right font-medium",
                    row.changePercent >= 0 ? "text-green-500" : "text-red-500",
                  ].join(" ")}
                >
                  {row.changePercent >= 0 ? "+" : ""}
                  {row.changePercent.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  ${row.high.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  ${row.low.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
