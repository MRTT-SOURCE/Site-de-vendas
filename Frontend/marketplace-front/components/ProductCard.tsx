"use client"

import Link from "next/link"
import { Produto } from "@/types/produto"
import { useRouter } from "next/navigation"
import { useTheme } from "@/hooks/useTheme"

type ProductCardProps = {
  produto: Produto
  onAddToCart: (produto: { id: number; nome: string; preco: number }) => void
}

export default function ProductCard({
  produto,
  onAddToCart,
}: ProductCardProps) {
  const { theme, mounted } = useTheme()
  const router = useRouter()

  const iconSrc =
    !mounted || theme === "light"
      ? "/branding/icon-light.svg"
      : "/branding/icon-dark.svg"

  function handleComprarAgora() {
    onAddToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    })

    router.push("/carrinho")
  }

  return (
    <div className="app-surface app-border rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="app-surface-2 mb-4 flex h-52 items-center justify-center overflow-hidden rounded-xl">
        {produto.imagemUrl ? (
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img src={iconSrc} alt="Ícone MarketNova" className="h-12 w-12" />
            <span className="app-muted text-sm">Sem imagem</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold">{produto.nome}</h3>

      <p className="app-muted mt-2 min-h-[48px] text-sm">
        {produto.descricao || "Produto sem descrição."}
      </p>

      <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
        R$ {produto.preco.toFixed(2)}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <Link
          href={`/produtos/${produto.id}`}
          className="app-surface app-border rounded-lg border px-4 py-2 text-center hover:opacity-90"
        >
          Ver
        </Link>

        <button
          onClick={() =>
            onAddToCart({
              id: produto.id,
              nome: produto.nome,
              preco: produto.preco,
            })
          }
          className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
        >
          Adicionar ao carrinho
        </button>

        <button
          onClick={handleComprarAgora}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Comprar agora
        </button>
      </div>
    </div>
  )
}