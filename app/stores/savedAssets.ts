import { persistentAtom } from "@nanostores/persistent"

export interface SavedAsset {
  symbol: string
  ticker: string
  name: string
  type: "crypto" | "accion"
}

export const $savedAssets = persistentAtom<SavedAsset[]>(
  "fintrack:guardados",
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
)

export function guardarActivo(asset: SavedAsset) {
  const current = $savedAssets.get()
  if (!current.some((a) => a.ticker === asset.ticker)) {
    $savedAssets.set([...current, asset])
  }
}

export function eliminarActivo(ticker: string) {
  $savedAssets.set($savedAssets.get().filter((a) => a.ticker !== ticker))
}

export function estaGuardado(ticker: string) {
  return $savedAssets.get().some((a) => a.ticker === ticker)
}
