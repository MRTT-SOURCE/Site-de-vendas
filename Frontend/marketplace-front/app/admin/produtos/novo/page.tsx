"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import ProductForm from "@/components/ProductForm"
import { criarProduto } from "@/services/admin-produtos-service"

export default function NovoProdutoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <ProductForm
      title="Novo produto"
      submitLabel="Cadastrar produto"
      loading={loading}
      error={error}
      onSubmit={async (values) => {
        try {
          setLoading(true)
          setError("")

          await criarProduto({
            nome: values.nome,
            descricao: values.descricao,
            preco: Number(values.preco),
            estoque: Number(values.estoque),
            imagemUrl: values.imagemUrl,
          })

          router.push("/admin/produtos")
        } catch {
          setError("Não foi possível cadastrar o produto.")
        } finally {
          setLoading(false)
        }
      }}
    />
  )
}