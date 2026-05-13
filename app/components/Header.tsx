import { Moon, Sun } from "lucide-react"
import { NavLink } from "react-router"

import { Switch } from "~/components/ui/switch"
import { useTheme } from "~/context/ThemeContext"

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/saved", label: "Guardados" },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="text-lg font-semibold tracking-tight">FinTrack</span>

        <nav className="flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Cambiar modo oscuro"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </nav>
      </div>
    </header>
  )
}
