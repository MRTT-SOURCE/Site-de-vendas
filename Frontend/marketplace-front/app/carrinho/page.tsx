"use client"

import Link from "next/link"
import { useCart } from "@/hooks/useCart"

export default function CarrinhoPage() {
  const {
    items,
    totalItems,
    totalPrice,
    increase,
    decrease,
    removeItem,
  } = useCart()

  return (
    <main className="min-h-screen">

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="app-surface app-border rounded-lg border px-4 py-2 hover:opacity-90"
          >
            ← Voltar para início
          </Link>

          <Link
            href="/"
            className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
          >
            Continuar comprando
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Seu carrinho</h1>

        {items.length === 0 ? (
          <div className="app-surface app-border rounded-2xl border p-6">
            <p className="app-muted mb-4">Seu carrinho está vazio.</p>

            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Ir para a loja
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="app-surface app-border rounded-2xl border p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{item.nome}</h2>
                      <p className="app-muted mt-1">
                        Preço unitário: R$ {item.preco.toFixed(2)}
                      </p>
                      <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">
                        Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="app-surface app-border rounded-lg border px-4 py-2"
                      >
                        -
                      </button>

                      <span className="min-w-[40px] text-center font-semibold">
                        {item.quantidade}
                      </span>

                      <button
                        onClick={() => increase(item.id)}
                        className="app-surface app-border rounded-lg border px-4 py-2"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="app-surface app-border h-fit rounded-2xl border p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Resumo</h2>

              <p className="app-muted mt-4">
                Itens no carrinho: <strong>{totalItems}</strong>
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-600 dark:text-blue-400">
                R$ {totalPrice.toFixed(2)}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/"
                  className="app-surface app-border rounded-lg border px-4 py-3 text-center hover:opacity-90"
                >
                  Voltar para início
                </Link>

                <Link
                  href="/checkout"
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
                >
                  Ir para checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>

    </main>
  )
}