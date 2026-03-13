"use client"

import { useEffect, useState } from "react"
import { listarClientes } from "@/services/clientes-service"
import { Cliente } from "@/types/cliente"

export default function AdminClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarClientes() {
      try {
        setErro("")
        const data = await listarClientes()
        setClientes(data)
      } catch (error) {
        console.error("Erro ao carregar clientes:", error)
        setErro("Não foi possível carregar os clientes.")
      } finally {
        setLoading(false)
      }
    }

    carregarClientes()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          Administração
        </p>
        <h1 className="mt-2 text-3xl font-bold">Clientes</h1>
        <p className="app-muted mt-2">
          Visualize os clientes cadastrados no sistema.
        </p>
      </div>

      {erro && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {erro}
        </div>
      )}

      <section className="app-surface app-border rounded-2xl border p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Lista de clientes</h2>

        {loading ? (
          <p className="app-muted">Carregando clientes...</p>
        ) : clientes.length === 0 ? (
          <p className="app-muted">Nenhum cliente encontrado.</p>
        ) : (
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="app-surface-2 app-border rounded-2xl border p-4"
              >
                <h3 className="text-lg font-semibold">{cliente.nome}</h3>

                {cliente.email && (
                  <p className="app-muted mt-1">{cliente.email}</p>
                )}

                {cliente.telefone && (
                  <p className="app-muted">{cliente.telefone}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}