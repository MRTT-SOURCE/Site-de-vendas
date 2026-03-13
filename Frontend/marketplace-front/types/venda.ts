export type CriarVendaRequest = {
  clienteId: number
}

export type AdicionarItemVendaRequest = {
  produtoId: number
  quantidade: number
}

export type VendaResponse = {
  id: number
  clienteId: number
  dataVenda?: string
  status?: string
  valorTotal?: number
}