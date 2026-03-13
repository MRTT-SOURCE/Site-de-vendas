"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const logoSrc = isDark
    ? "/branding/logo-dark.svg"
    : "/branding/logo-light.svg"

  return (
    <footer className="app-surface app-border border-t mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="MarketNova"
            className="h-10 w-auto"
          />
          <span className="font-semibold text-lg">
            MarketNova
          </span>
        </div>

        <p className="app-muted text-sm">
          © 2026 MarketNova. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  )
}