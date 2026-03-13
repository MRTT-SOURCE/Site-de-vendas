"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { listarProdutosAdmin, excluirProduto } from "@/services/admin-produtos-service"
import { Produto } from "@/types/produto"

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  async function carregarProdutos() {
    try {
      setErro("")
      const data = await listarProdutosAdmin()
      setProdutos(data)
    } catch {
      setErro("Não foi possível carregar os produtos.")
    } finally {
      setLoading(false)
    }
  }

  async function handleExcluir(id: number) {
    const confirmou = window.confirm("Deseja realmente excluir este produto?")

    if (!confirmou) return

    try {
      await excluirProduto(id)
      setProdutos((prev) => prev.filter((produto) => produto.id !== id))
    } catch {
      alert("Não foi possível excluir o produto.")
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
            Administração
          </p>
          <h1 className="mt-2 text-3xl font-bold">Produtos</h1>
          <p className="app-muted mt-2">
            Gerencie os produtos cadastrados no marketplace.
          </p>
        </div>

        <Link
          href="/admin/produtos/novo"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Novo produto
        </Link>
      </div>

      {erro && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {erro}
        </div>
      )}

      <section className="app-surface app-border overflow-hidden rounded-2xl border shadow-sm">
        {loading ? (
          <div className="p-6">Carregando produtos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="app-surface-2">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Preço</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estoque</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-4 py-4">{produto.id}</td>
                    <td className="px-4 py-4">{produto.nome}</td>
                    <td className="px-4 py-4">R$ {produto.preco.toFixed(2)}</td>
                    <td className="px-4 py-4">{produto.estoque}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/produtos/editar/${produto.id}`}
                          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleExcluir(produto.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {produtos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center app-muted">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}