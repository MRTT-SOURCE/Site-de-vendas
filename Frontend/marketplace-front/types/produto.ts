export type Produto = {
  id: number
  nome: string
  descricao?: string
  preco: number
  estoque: number
  imagemUrl?: string
  dataCadastro?: string
}

export type CriarProdutoRequest = {
  nome: string
  descricao?: string
  preco: number
  estoque: number
  imagemUrl?: string
}

export type AtualizarProdutoRequest = {
  nome: string
  descricao?: string
  preco: number
  estoque: number
  imagemUrl?: string
}