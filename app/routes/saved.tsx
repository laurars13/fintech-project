import { useStore } from "@nanostores/react"
import { Link } from "react-router"

import { $savedAssets, eliminarActivo } from "~/stores/savedAssets"
import { Button } from "~/components/ui/button"

export default function Saved() {
  const saved = useStore($savedAssets)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Activos Guardados</h1>

      {saved.length === 0 ? (
        <div className="rounded-lg border border-border px-6 py-12 text-center">
          <p className="text-muted-foreground">
            No has guardado ningún activo todavía.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-sm underline hover:text-foreground"
          >
            Ver mercados
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {saved.map((asset) => (
            <div
              key={asset.ticker}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span
                  className={[
                    "rounded px-2 py-0.5 text-xs font-medium",
                    asset.type === "crypto"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                  ].join(" ")}
                >
                  {asset.type === "crypto" ? "Cripto" : "Acción"}
                </span>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.ticker}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    to={`/${asset.type === "crypto" ? "crypto" : "stock"}/${asset.ticker}`}
                  >
                    Ver detalles
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => eliminarActivo(asset.ticker)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
