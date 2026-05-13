# FinTrack

A financial tracking web app that lets you follow real-time prices for stocks and cryptocurrencies, search any asset, and save a personal watchlist.

## Features

- **Home** — live price tables for top stocks (AAPL, NVDA, MSFT, AMZN, GOOGL) and top cryptos (BTC, ETH, BNB, SOL, XRP)
- **Search** (`/search`) — find any stock or crypto by name or symbol using the Finnhub API
- **Asset detail** — dedicated pages for each stock (`/stock/:ticker`) and crypto (`/crypto/:ticker`) with price, daily change, highs/lows, and company profile
- **Saved** (`/saved`) — persistent watchlist stored in the browser; add or remove assets from any detail page
- **Dark mode** — toggle in the header, preference is remembered

## Tech stack

- [React Router v7](https://reactrouter.com/) — routing and SSR-ready loaders
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components (Table, Button, Switch)
- [Nanostores](https://github.com/nanostores/nanostores) — lightweight global state for the watchlist
- [Finnhub API](https://finnhub.io/) — real-time stock and crypto data
- [Axios](https://axios-http.com/) — HTTP client

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run start
```

### Type checking

```bash
npm run typecheck
```

## Project structure

```
app/
  components/       # Shared UI components (Header, tables)
  context/          # React context (theme)
  lib/              # API client (Finnhub) and asset definitions
  routes/           # One file per route
    home.tsx        # / — market overview
    search.tsx      # /search — asset search
    saved.tsx       # /saved — watchlist
    stock.$ticker.tsx   # /stock/:ticker
    crypto.$ticker.tsx  # /crypto/:ticker
  stores/           # Nanostores (saved assets)
```

## API key

The app uses the [Finnhub](https://finnhub.io/) API. The key is configured in `app/lib/finnhub.ts`. You can register for a free key at [finnhub.io](https://finnhub.io/) and replace the value of `FINNHUB_API_KEY`.
