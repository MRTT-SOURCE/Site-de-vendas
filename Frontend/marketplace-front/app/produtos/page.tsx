"use client"

import { useEffect, useState } from "react"
import { listarProdutos } from "@/services/produtos-service"
import { Produto } from "@/types/produto"
import { useCart } from "@/hooks/useCart"
import ProductCard from "@/components/ProductCard"

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  const { addItem } = useCart()

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
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">Produtos</h1>

        {loading && (
          <div className="app-surface app-border rounded-2xl border p-6">
            Carregando produtos...
          </div>
        )}

        {erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
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
    </main>
  )
}