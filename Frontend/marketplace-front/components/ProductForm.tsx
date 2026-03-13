"use client"

import { FormEvent, useState } from "react"

type ProductFormValues = {
  nome: string
  descricao: string
  preco: string
  estoque: string
  imagemUrl: string
}

type ProductFormProps = {
  title: string
  submitLabel: string
  initialValues?: ProductFormValues
  error?: string
  loading?: boolean
  onSubmit: (values: ProductFormValues) => Promise<void> | void
  backHref?: string
}

export default function ProductForm({
  title,
  submitLabel,
  initialValues,
  error,
  loading,
  onSubmit,
  backHref = "/admin/produtos",
}: ProductFormProps) {
  const [nome, setNome] = useState(initialValues?.nome ?? "")
  const [descricao, setDescricao] = useState(initialValues?.descricao ?? "")
  const [preco, setPreco] = useState(initialValues?.preco ?? "")
  const [estoque, setEstoque] = useState(initialValues?.estoque ?? "")
  const [imagemUrl, setImagemUrl] = useState(initialValues?.imagemUrl ?? "")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    await onSubmit({
      nome,
      descricao,
      preco,
      estoque,
      imagemUrl,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
            Administração
          </p>
          <h1 className="mt-2 text-3xl font-bold">{title}</h1>
          <p className="app-muted mt-2">
            Preencha os dados do produto abaixo.
          </p>
        </div>

        <a
          href={backHref}
          className="app-surface app-border rounded-lg border px-4 py-3 text-center hover:opacity-90"
        >
          Voltar
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="app-surface app-border space-y-6 rounded-3xl border p-6 shadow-sm"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="app-surface app-border w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="app-surface app-border w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            rows={5}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Preço</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="app-surface app-border w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Estoque</label>
            <input
              type="number"
              min="0"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              className="app-surface app-border w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">URL da imagem</label>
          <input
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            className="app-surface app-border w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Salvando..." : submitLabel}
        </button>
      </form>
    </div>
  )
}