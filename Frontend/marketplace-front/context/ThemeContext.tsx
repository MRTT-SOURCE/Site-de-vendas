"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react"

type ThemeMode = "light" | "dark"

type ThemeContextType = {
  theme: ThemeMode
  mounted: boolean
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null
    const initialTheme: ThemeMode = savedTheme === "dark" ? "dark" : "light"

    setThemeState(initialTheme)

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    setMounted(true)
  }, [])

  function setTheme(nextTheme: ThemeMode) {
    setThemeState(nextTheme)
    localStorage.setItem("theme", nextTheme)

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const value = useMemo(
    () => ({
      theme,
      mounted,
      toggleTheme,
      setTheme,
    }),
    [theme, mounted]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider")
  }

  return context
}