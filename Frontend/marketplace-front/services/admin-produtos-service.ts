import { api } from "@/services/api"
import {
  AtualizarProdutoRequest,
  CriarProdutoRequest,
  Produto,
} from "@/types/produto"

export async function listarProdutosAdmin(): Promise<Produto[]> {
  const response = await api.get("/produtos")
  return response.data
}

export async function obterProdutoAdmin(id: number | string): Promise<Produto> {
  const response = await api.get(`/produtos/${id}`)
  return response.data
}

export async function criarProduto(payload: CriarProdutoRequest): Promise<Produto> {
  const response = await api.post("/produtos", payload)
  return response.data
}

export async function atualizarProduto(
  id: number | string,
  payload: AtualizarProdutoRequest
): Promise<void> {
  await api.put(`/produtos/${id}`, payload)
}

export async function excluirProduto(id: number | string): Promise<void> {
  await api.delete(`/produtos/${id}`)
}