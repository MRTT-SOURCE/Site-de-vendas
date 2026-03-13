import { api } from "@/services/api"
import { Produto } from "@/types/produto"

export async function listarProdutos(): Promise<Produto[]> {
  const response = await api.get("/produtos")
  return response.data
}

export async function obterProdutoPorId(id: number | string): Promise<Produto> {
  const response = await api.get(`/produtos/${id}`)
  return response.data
}