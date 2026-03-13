"use client"

import Link from "next/link"
import { useTheme } from "@/hooks/useTheme"

export default function BottomBanner() {
  const { theme, mounted } = useTheme()

  const logoSrc =
    !mounted || theme === "light"
      ? "/branding/brand-light.svg"
      : "/branding/brand-dark.svg"

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6">
      <div className="app-surface app-border rounded-3xl border p-10 shadow-sm">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-500">
              Destaque
            </p>

            <h2 className="text-3xl font-bold">
              Uma identidade visual forte para o seu marketplace
            </h2>

            <p className="app-muted mt-4 max-w-lg">
              O sistema usa a marca MarketNova nos blocos principais,
              reforçando o visual do catálogo e da área administrativa.
            </p>

            <div className="mt-6">
              <Link
                href="/admin/produtos"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
              >
                Gerenciar produtos
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={logoSrc}
              alt="MarketNova"
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}