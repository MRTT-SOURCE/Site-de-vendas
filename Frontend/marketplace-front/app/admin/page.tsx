"use client"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          Painel administrativo
        </p>
        <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
        <p className="app-muted mt-2">
          Visão geral do sistema e indicadores principais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <p className="app-muted text-sm">Produtos cadastrados</p>
          <h2 className="mt-3 text-3xl font-bold">10</h2>
        </div>

        <div className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <p className="app-muted text-sm">Clientes cadastrados</p>
          <h2 className="mt-3 text-3xl font-bold">2</h2>
        </div>

        <div className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <p className="app-muted text-sm">Pedidos realizados</p>
          <h2 className="mt-3 text-3xl font-bold">0</h2>
        </div>

        <div className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <p className="app-muted text-sm">Faturamento</p>
          <h2 className="mt-3 text-3xl font-bold">R$ 0,00</h2>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Resumo do sistema</h2>
          <p className="app-muted mt-3">
            Este painel permite acompanhar produtos, clientes e pedidos do
            marketplace.
          </p>
        </section>

        <section className="app-surface app-border rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Ações rápidas</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/admin/produtos"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Gerenciar produtos
            </a>

            <a
              href="/admin/clientes"
              className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
            >
              Ver clientes
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}