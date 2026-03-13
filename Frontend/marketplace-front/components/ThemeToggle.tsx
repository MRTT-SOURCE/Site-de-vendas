"use client"

import { useTheme } from "@/hooks/useTheme"

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme()

  if (!mounted) {
    return (
      <button className="rounded-lg bg-black px-4 py-2 font-medium text-white">
        Tema
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
        theme === "light"
          ? "bg-black text-white hover:bg-gray-900"
          : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
}