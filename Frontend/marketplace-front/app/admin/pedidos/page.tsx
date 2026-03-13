"use client"

import { useEffect, useState } from "react"
import { listarPedidos, atualizarStatusPedido } from "@/services/pedidos-service"
import { Pedido, StatusPedido } from "@/types/pedido"

function getStatusBadgeClass(status: StatusPedido) {
  switch (status) {
    case "Finalizado":
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
    case "Pendente":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
    case "Em processamento":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
    case "Cancelado":
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
  }
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarPedidos() {
      try {
        setErro("")
        const data = await listarPedidos()
        setPedidos(data)
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error)
        setErro("Não foi possível carregar os pedidos.")
      } finally {
        setLoading(false)
      }
    }

    carregarPedidos()
  }, [])

  async function handleStatusChange(id: number, novoStatus: StatusPedido) {
    try {
      setSavingId(id)

      await atualizarStatusPedido(id, novoStatus)

      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === id ? { ...pedido, status: novoStatus } : pedido
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      alert("Não foi possível atualizar o status do pedido.")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          Administração
        </p>
        <h1 className="mt-2 text-3xl font-bold">Pedidos</h1>
        <p className="app-muted mt-2">
          Acompanhe e altere o status dos pedidos do sistema.
        </p>
      </div>

      {erro && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {erro}
        </div>
      )}

      <section className="app-surface app-border overflow-hidden rounded-2xl border shadow-sm">
        {loading ? (
          <div className="p-6">Carregando pedidos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="app-surface-2">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Pedido</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Data</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status atual</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Alterar status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => (
                  <tr
                    key={pedido.id}
                    className="border-t border-slate-200 dark:border-slate-800"
                  >
                    <td className="px-4 py-4">#{pedido.id}</td>
                    <td className="px-4 py-4">{pedido.cliente}</td>
                    <td className="px-4 py-4">
                      {new Date(pedido.data).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          pedido.status
                        )}`}
                      >
                        {pedido.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={pedido.status}
                        disabled={savingId === pedido.id}
                        onChange={(e) =>
                          handleStatusChange(
                            pedido.id,
                            e.target.value as StatusPedido
                          )
                        }
                        className="app-surface app-border rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-60"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em processamento">Em processamento</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      R$ {pedido.total.toFixed(2)}
                    </td>
                  </tr>
                ))}

                {pedidos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center app-muted">
                      Nenhum pedido encontrado.
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