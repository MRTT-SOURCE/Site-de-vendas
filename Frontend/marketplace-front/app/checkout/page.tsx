"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/hooks/useCart"
import { Cliente } from "@/types/cliente"
import { listarClientes } from "@/services/clientes-service"
import {
  adicionarItemVenda,
  criarVenda,
  finalizarVenda,
} from "@/services/vendas-service"

export default function CheckoutPage() {
  const { items, loaded, totalItems, totalPrice, clearCart } = useCart()

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteId, setClienteId] = useState("")
  const [loadingClientes, setLoadingClientes] = useState(true)
  const [finalizando, setFinalizando] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await listarClientes()
        setClientes(data)
      } catch {
        setErro("Não foi possível carregar os clientes.")
      } finally {
        setLoadingClientes(false)
      }
    }

    carregarClientes()
  }, [])

  async function finalizarCompra() {
    if (items.length === 0) {
      alert("Seu carrinho está vazio.")
      return
    }

    if (!clienteId) {
      alert("Selecione um cliente.")
      return
    }

    try {
      setFinalizando(true)
      setErro("")

      const venda = await criarVenda({
        clienteId: Number(clienteId),
      })

      for (const item of items) {
        await adicionarItemVenda(venda.id, {
          produtoId: item.id,
          quantidade: item.quantidade,
        })
      }

      await finalizarVenda(venda.id)

      clearCart()
      alert("Venda finalizada com sucesso!")
    } catch {
      setErro("Não foi possível finalizar a venda.")
    } finally {
      setFinalizando(false)
    }
  }

  if (!loaded) {
    return <main className="p-6">Carregando checkout...</main>
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <Link
          href="/carrinho"
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Voltar ao carrinho
        </Link>
      </div>

      {erro && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {erro}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-600">Não há itens para finalizar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Cliente</h2>

              {loadingClientes ? (
                <p>Carregando clientes...</p>
              ) : (
                <select
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="">Selecione um cliente</option>

                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Resumo do pedido</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantidade} x R$ {item.preco.toFixed(2)}
                      </p>
                    </div>

                    <p className="font-semibold">
                      R$ {(item.quantidade * item.preco).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Totais</h2>

            <p>
              Itens: <strong>{totalItems}</strong>
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              R$ {totalPrice.toFixed(2)}
            </p>

            <button
              onClick={finalizarCompra}
              disabled={finalizando || loadingClientes}
              className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {finalizando ? "Finalizando..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}