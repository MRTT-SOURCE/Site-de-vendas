import { api } from "@/services/api"
import { Pedido, StatusPedido } from "@/types/pedido"

type VendaApiResponse = {
  id: number
  clienteNome: string
  dataVenda: string
  status: string
  valorTotal: number
}

function normalizarStatus(status: string): StatusPedido {
  switch (status) {
    case "Finalizado":
      return "Finalizado"
    case "Cancelado":
      return "Cancelado"
    case "Em processamento":
      return "Em processamento"
    default:
      return "Pendente"
  }
}

export async function listarPedidos(): Promise<Pedido[]> {
  const response = await api.get<VendaApiResponse[]>("/vendas")

  return response.data.map((item) => ({
    id: item.id,
    cliente: item.clienteNome,
    data: item.dataVenda,
    status: normalizarStatus(item.status),
    total: item.valorTotal,
  }))
}

export async function atualizarStatusPedido(
  id: number,
  status: StatusPedido
): Promise<void> {
  await api.put(`/vendas/${id}/status`, { status })
}