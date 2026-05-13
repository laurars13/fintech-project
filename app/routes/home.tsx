import { Form } from "react-router"
import { Search } from "lucide-react"

import { CryptoTable } from "~/components/CryptoTable"
import { StocksTable } from "~/components/StocksTable"

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Form method="get" action="/search" className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              placeholder="Buscar acciones, ETFs o criptomonedas..."
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
      </div>
      <CryptoTable />
      <StocksTable />
    </>
  )
}
