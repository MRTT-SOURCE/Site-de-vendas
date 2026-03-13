"use client"

import AdminSidebar from "@/components/AdminSidebar"
import ThemeToggle from "@/components/ThemeToggle"

export default function AdminLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <AdminSidebar />

        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5 dark:border-slate-800 dark:bg-slate-950">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>

            <ThemeToggle />
          </header>

          <div className="p-8">{children}</div>
        </section>
      </div>
    </main>
  )
}