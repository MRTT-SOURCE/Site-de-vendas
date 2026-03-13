"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import ProductForm from "@/components/ProductForm"
import {
  atualizarProduto,
  obterProdutoAdmin,
} from "@/services/admin-produtos-service"

export default function EditarProdutoPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loadingPage, setLoadingPage] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [initialValues, setInitialValues] = useState<{
    nome: string
    descricao: string
    preco: string
    estoque: string
    imagemUrl: string
  } | null>(null)

  useEffect(() => {
    async function carregarProduto() {
      try {
        setError("")
        const produto = await obterProdutoAdmin(id)

        setInitialValues({
          nome: produto.nome,
          descricao: produto.descricao || "",
          preco: String(produto.preco),
          estoque: String(produto.estoque),
          imagemUrl: produto.imagemUrl || "",
        })
      } catch {
        setError("Não foi possível carregar o produto.")
      } finally {
        setLoadingPage(false)
      }
    }

    if (id) carregarProduto()
  }, [id])

  if (loadingPage) {
    return (
      <div className="app-surface app-border rounded-2xl border p-6">
        Carregando produto...
      </div>
    )
  }

  if (!initialValues) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        {error || "Produto não encontrado."}
      </div>
    )
  }

  return (
    <ProductForm
      title="Editar produto"
      submitLabel="Salvar alterações"
      initialValues={initialValues}
      loading={saving}
      error={error}
      onSubmit={async (values) => {
        try {
          setSaving(true)
          setError("")

          await atualizarProduto(id, {
            nome: values.nome,
            descricao: values.descricao,
            preco: Number(values.preco),
            estoque: Number(values.estoque),
            imagemUrl: values.imagemUrl,
          })

          router.push("/admin/produtos")
        } catch {
          setError("Não foi possível atualizar o produto.")
        } finally {
          setSaving(false)
        }
      }}
    />
  )
}