import { api } from "@/services/api"
import {
  AdicionarItemVendaRequest,
  CriarVendaRequest,
  VendaResponse,
} from "@/types/venda"

export async function criarVenda(
  payload: CriarVendaRequest
): Promise<VendaResponse> {
  const response = await api.post("/vendas", payload)
  return response.data
}

export async function adicionarItemVenda(
  vendaId: number,
  payload: AdicionarItemVendaRequest
): Promise<void> {
  await api.post(`/vendas/${vendaId}/itens`, payload)
}

export async function finalizarVenda(vendaId: number): Promise<void> {
  await api.put(`/vendas/${vendaId}/finalizar`)
}