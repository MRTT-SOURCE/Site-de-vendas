"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BottomBanner from "@/components/BottomBanner"
import { obterProdutoPorId } from "@/services/produtos-service"
import { Produto } from "@/types/produto"
import { useCart } from "@/hooks/useCart"

export default function ProdutoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const { addItem, totalItems } = useCart()

  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarProduto() {
      try {
        const id = Number(params.id)
        const data = await obterProdutoPorId(id)
        setProduto(data)
      } catch {
        setErro("Não foi possível carregar o produto.")
      } finally {
        setLoading(false)
      }
    }

    carregarProduto()
  }, [params.id])

  function handleAdicionarAoCarrinho() {
    if (!produto) return

    addItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    })
  }

  function handleComprarAgora() {
    if (!produto) return

    addItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    })

    router.push("/carrinho")
  }

  return (
    <main className="min-h-screen">

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="app-surface app-border rounded-lg border px-4 py-2 hover:opacity-90"
          >
            ← Início
          </Link>

          <Link
            href="/carrinho"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Ir para carrinho
          </Link>
        </div>

        {loading && (
          <div className="app-surface app-border rounded-2xl border p-6">
            Carregando produto...
          </div>
        )}

        {erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {erro}
          </div>
        )}

        {!loading && !erro && produto && (
          <div className="app-surface app-border grid gap-8 rounded-3xl border p-6 shadow-sm md:grid-cols-2">
            <div className="app-surface-2 flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl">
              {produto.imagemUrl ? (
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="app-muted">Sem imagem</span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-500">
                Produto
              </p>

              <h1 className="text-4xl font-bold">{produto.nome}</h1>

              <p className="app-muted mt-4 text-lg">
                {produto.descricao || "Produto sem descrição."}
              </p>

              <p className="mt-6 text-4xl font-bold text-blue-600 dark:text-blue-400">
                R$ {produto.preco.toFixed(2)}
              </p>

              <p className="app-muted mt-3">
                Estoque disponível: {produto.estoque}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleAdicionarAoCarrinho}
                  className="rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
                >
                  Adicionar ao carrinho
                </button>

                <button
                  onClick={handleComprarAgora}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                  Comprar agora
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <BottomBanner />
    </main>
  )
}