export type StatusPedido =
  | "Pendente"
  | "Em processamento"
  | "Finalizado"
  | "Cancelado"

export type Pedido = {
  id: number
  cliente: string
  data: string
  status: StatusPedido
  total: number
}