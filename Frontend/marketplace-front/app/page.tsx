"use client"

import { useEffect, useState } from "react"
import { listarProdutos } from "@/services/produtos-service"
import { Produto } from "@/types/produto"
import { useCart } from "@/hooks/useCart"
import ProductCard from "@/components/ProductCard"
import BottomBanner from "@/components/BottomBanner"

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  const { addItem, totalItems } = useCart()

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos()
        setProdutos(data)
      } catch {
        setErro("Não foi possível carregar os produtos.")
      } finally {
        setLoading(false)
      }
    }

    carregarProdutos()
  }, [])

  return (
    <main className="min-h-screen">

      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Produtos em destaque</h2>
        </div>

        {loading && (
          <div className="app-surface app-border rounded-2xl border p-6">
            Carregando produtos...
          </div>
        )}

        {erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {erro}
          </div>
        )}

        {!loading && !erro && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {produtos.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </section>

      <BottomBanner />
    </main>
  )
}