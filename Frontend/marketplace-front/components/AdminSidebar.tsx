"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "@/hooks/useTheme"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { theme, mounted } = useTheme()

  const logoSrc =
    !mounted || theme === "light"
      ? "/branding/logo-simple-light.svg"
      : "/branding/logo-simple-dark.svg"

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin"
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  function linkClass(href: string) {
    const active = isActive(href)

    return `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      active
        ? "bg-blue-600 text-white"
        : "app-muted hover:bg-slate-100 dark:hover:bg-slate-800"
    }`
  }

  return (
    <aside className="app-surface app-border flex w-72 flex-col border-r p-6">
      <div className="mb-10 flex items-center">
        <Image
          src={logoSrc}
          width={160}
          height={40}
          alt="MarketNova"
          priority
        />
      </div>

      <nav className="space-y-2">
        <Link href="/admin" className={linkClass("/admin")}>
          Dashboard
        </Link>

        <Link href="/admin/produtos" className={linkClass("/admin/produtos")}>
          Produtos
        </Link>

        <Link href="/admin/pedidos" className={linkClass("/admin/pedidos")}>
          Pedidos
        </Link>

        <Link href="/admin/clientes" className={linkClass("/admin/clientes")}>
          Clientes
        </Link>
      </nav>
    </aside>
  )
}