import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/search", "routes/search.tsx"),
  route("/crypto/:ticker", "routes/crypto.$ticker.tsx"),
  route("/stock/:ticker", "routes/stock.$ticker.tsx"),
  route("/saved", "routes/saved.tsx"),
] satisfies RouteConfig
