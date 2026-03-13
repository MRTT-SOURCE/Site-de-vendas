"use client"

import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import { useTheme } from "@/hooks/useTheme"
import { useCart } from "@/hooks/useCart"

export default function Header() {
  const { theme, mounted } = useTheme()
  const { totalItems, loaded } = useCart()

  const logoSrc =
    !mounted || theme === "light"
      ? "/branding/logo-light.svg"
      : "/branding/logo-dark.svg"

  return (
    <header className="app-surface app-border border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <img src={logoSrc} alt="MarketNova" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/carrinho"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Carrinho ({loaded ? totalItems : 0})
          </Link>
        </div>
      </div>
    </header>
  )
}