import { api } from "@/services/api"
import { Cliente } from "@/types/cliente"

export async function listarClientes(): Promise<Cliente[]> {
  const response = await api.get("/clientes")
  return response.data
}